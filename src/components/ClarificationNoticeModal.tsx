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
  const { t } = useLanguage();
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

OFFICIAL STATUTORY CLARIFICATION NOTICE UNDER GeM GTC CLAUSE 4.1
Ref: CPCL/PROC/GEM/2026/CLARIF/${bidder.bidder_id}
Date: ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}

To,
Authorized Signatory,
${bidder.legal_name}
GeM Seller ID: ${bidder.seller_id}
GSTIN: ${bidder.submitted_data.gstin}

Subject: Clarification and Statutory Reconciliation for GeM Tender ${tender.tender_id} ("${tender.title}")

Dear Sir/Madam,

During the technical and statutory scrutiny of documents submitted by your firm against the subject tender on the Government e-Marketplace (GeM), the following material inconsistencies/discrepancies were identified by our automated compliance and cross-portal verification engine:

IDENTIFIED STATUTORY DISCREPANCIES:
${discrepancies || "1. Discrepancy observed between submitted document parameters and portal database records."}

APPLICABLE TENDER CLAUSES & STATUTORY PROVISIONS:
- GeM General Terms and Conditions (GTC) Clause 4 (Verification of Documents)
- Rule 144(xi) and Rule 151 of General Financial Rules (GFR) 2017
- CPCL Special Terms of Tender (Turnover, NIC 28132, Class-I Local Supplier)

You are hereby requested to submit your point-wise legal representation along with supporting documentary evidence through the GeM portal clarification window within three (3) working days (i.e. by 17:00 hrs IST). Failure to submit satisfactory clarification within the stipulated timeline will render your bid technically non-compliant and liable for rejection.

Issued by:
Tender Evaluation Committee
Chennai Petroleum Corporation Limited (CPCL)
GeM Procurement Division`;

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
          className="w-full max-w-3xl bg-soft-beige dark:bg-deep-navy border border-warm-beige dark:border-warm-beige/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-deep-navy dark:text-crisp-white"
        >
          {/* Header */}
          <div className="p-5 border-b border-warm-beige dark:border-warm-beige/20 bg-warm-beige/40 dark:bg-dark-navy/60 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-lavender/15 text-lavender">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-deep-navy dark:text-crisp-white">
                  {t.modalClarificationTitle}
                </h3>
                <p className="text-xs text-muted-gray">
                  Pre-drafted legal representation notice auto-populated with AI discrepancy citations
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
                Notice Draft (Editable for Procurement Officer):
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1.5 px-3 py-1 rounded-xl border border-warm-beige dark:border-warm-beige/20 bg-crisp-white dark:bg-dark-navy hover:border-lavender text-xs font-semibold text-deep-navy dark:text-crisp-white transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-mint-green" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? t.modalCopiedNotice : t.modalCopyNotice}</span>
              </button>
            </div>

            <textarea
              value={noticeText}
              onChange={(e) => setNoticeText(e.target.value)}
              rows={14}
              className="w-full p-4 rounded-xl font-mono text-xs leading-relaxed bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/20 text-deep-navy dark:text-crisp-white focus:outline-none focus:border-lavender resize-y"
            />

            <div className="p-3 rounded-xl bg-lavender/15 border border-lavender/30 text-xs text-deep-navy dark:text-crisp-white flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-lavender shrink-0 mt-0.5" />
              <span>
                Dispatching this notice will log an immutable entry into the CVC audit trail and open a 72-hour clarification submission window on the GeM portal.
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-warm-beige dark:border-warm-beige/20 bg-warm-beige/30 dark:bg-dark-navy/40 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white"
            >
              Cancel
            </button>
            <button
              onClick={handleDispatch}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-lavender hover:bg-lavender/90 text-crisp-white shadow-md shadow-lavender/25 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Dispatch Notice via GeM Gateway</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
