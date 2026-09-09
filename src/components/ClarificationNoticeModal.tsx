"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Copy, Check, FileText, AlertCircle } from "lucide-react";
import { Bidder, TenderMetadata } from "@/types";
import { useTenderData } from "@/context/TenderDataContext";
import { useLanguage } from "@/context/LanguageContext";

interface ClarificationNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  bidder: Bidder;
  tender: TenderMetadata;
}

export function ClarificationNoticeModal({
  isOpen,
  onClose,
  bidder,
  tender,
}: ClarificationNoticeModalProps) {
  const { sendClarificationNotice } = useTenderData();
  const { t, language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [noticeText, setNoticeText] = useState("");

  useEffect(() => {
    if (!bidder || !tender) return;

    const discrepancies = bidder.ai_evaluation.discrepancy_flags
      .map((d, i) => `${i + 1}. [${d.category}] ${d.issue}`)
      .join("\n");

    const template = `CHENNAI PETROLEUM CORPORATION LIMITED (CPCL)
(A Government of India Enterprise / MoP&NG)
Manali Refinery, Chennai - 600068, Tamil Nadu

STATUTORY CLARIFICATION NOTICE (GeM GTC Clause 4.1)
Ref: CPCL/PROC/GEM/2026/CLARIF/${bidder.bidder_id}
Date: ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}

To,
Authorized Signatory,
${bidder.legal_name}
GeM Seller ID: ${bidder.seller_id}
GSTIN: ${bidder.submitted_data.gstin}

Subject: Clarification for Tender ${tender.tender_id} ("${tender.title}")

Dear Sir/Madam,

During compliance verification of submitted tender documents, the following discrepancies were identified:

IDENTIFIED ISSUES:
${discrepancies || "1. Discrepancy observed between submitted document parameters and portal records."}

APPLICABLE TENDER RULES:
- GeM General Terms and Conditions (GTC) Clause 4 (Document Verification)
- Rule 144(xi) and Rule 151 of General Financial Rules (GFR) 2017
- CPCL Tender Requirements (Turnover, NIC 28132, Class-I Local Supplier)

Please submit your response with supporting documents via the GeM portal within three (3) working days. If clarification is not received within this period, the bid may be rejected.

Tender Evaluation Committee
Chennai Petroleum Corporation Limited (CPCL)`;

    setNoticeText(template);
  }, [bidder, tender]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(noticeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDispatch = () => {
    sendClarificationNotice(bidder.bidder_id, noticeText);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-3xl bg-white dark:bg-deep-navy border border-slate-200/80 dark:border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-deep-navy dark:text-crisp-white"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-200/80 dark:border-white/[0.08] bg-slate-50 dark:bg-dark-navy/60 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-gov-blue-50 dark:bg-gov-blue-950/40 text-gov-blue-600 dark:text-gov-blue-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-deep-navy dark:text-crisp-white">
                  {t.modalClarificationTitle}
                </h3>
                <p className="text-xs text-muted-gray">
                  {language === "hi"
                    ? "बोलीदाता को भेजने हेतु स्वचालित नोटिस प्रारूप"
                    : "Pre-drafted clarification notice ready to send to bidder"}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body with editable textarea */}
          <div className="p-6 space-y-4 overflow-y-auto flex-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-deep-navy dark:text-crisp-white">
                {language === "hi" ? "नोटिस प्रारूप (संपादन योग्य):" : "Notice Draft (Editable):"}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1.5 px-3 py-1 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-dark-navy hover:border-gov-blue-400 text-xs font-semibold text-deep-navy dark:text-crisp-white transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t.modalCopiedNotice : t.modalCopyNotice}</span>
              </button>
            </div>

            <textarea
              value={noticeText}
              onChange={(e) => setNoticeText(e.target.value)}
              rows={14}
              className="w-full p-4 rounded-xl font-mono text-xs leading-relaxed bg-slate-50 dark:bg-dark-navy border border-slate-200 dark:border-white/10 text-deep-navy dark:text-crisp-white focus:outline-none focus:border-gov-blue-500 resize-y"
            />

            <div className="p-3 rounded-xl bg-gov-blue-50/60 dark:bg-gov-blue-950/20 border border-gov-blue-200 dark:border-gov-blue-900/40 text-xs text-slate-700 dark:text-slate-300 flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-gov-blue-600 dark:text-gov-blue-400 shrink-0 mt-0.5" />
              <span>
                {language === "hi"
                  ? "यह नोटिस भेजने से ऑडिट ट्रेल में प्रविष्टि दर्ज होगी और बोलीदाता को 3 दिन की स्पष्टीकरण विंडो मिलेगी।"
                  : "Sending this notice logs an entry in the audit trail and opens a 3-day clarification window for the bidder."}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200/80 dark:border-white/[0.08] bg-slate-50 dark:bg-dark-navy/40 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white"
            >
              {language === "hi" ? "रद्द करें" : "Cancel"}
            </button>
            <button
              onClick={handleDispatch}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gov-blue-600 hover:bg-gov-blue-700 text-white shadow-xs transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{language === "hi" ? "स्पष्टीकरण नोटिस भेजें" : "Send Clarification Notice"}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
