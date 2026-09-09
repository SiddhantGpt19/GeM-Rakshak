"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Ban, AlertTriangle } from "lucide-react";
import { Bidder, TenderMetadata } from "@/types";
import { useTenderData } from "@/context/TenderDataContext";
import { useLanguage } from "@/context/LanguageContext";
import { getBidderLegalName } from "@/lib/translations";

interface DisqualificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  bidder: Bidder;
  tender?: TenderMetadata;
}

export function DisqualificationModal({
  isOpen,
  onClose,
  bidder,
  tender,
}: DisqualificationModalProps) {
  const { disqualifyBidder } = useTenderData();
  const { language } = useLanguage();
  const [justificationNotes, setJustificationNotes] = useState(
    `Disqualified due to statutory non-compliance: Material discrepancies identified in submitted certificates against portal records. Bidder failed to fulfill mandatory criteria under GeM GTC & CPCL Tender Terms.`
  );
  const [selectedReasons, setSelectedReasons] = useState<string[]>([
    "Tampered or forged documents",
    "Blacklisted / debarred vendor",
  ]);

  if (!isOpen) return null;

  const reasonOptions = [
    {
      id: "Tampered or forged documents",
      label: language === "hi" ? "गलत या छेड़छाड़ किए गए दस्तावेज़" : "Tampered or forged documents",
    },
    {
      id: "Blacklisted / debarred vendor",
      label: language === "hi" ? "प्रतिबंधित / ब्लैकलिस्टेड विक्रेता" : "Blacklisted / debarred vendor",
    },
    {
      id: "Turnover below minimum (₹15 Cr)",
      label: language === "hi" ? "न्यूनतम कारोबार में कमी (₹15 करोड़ से कम)" : "Turnover below minimum (₹15 Cr)",
    },
    {
      id: "Make in India below 50%",
      label: language === "hi" ? "मेक इन इंडिया 50% से कम" : "Make in India below 50%",
    },
    {
      id: "Udyam category mismatch (Services instead of Mfg)",
      label: language === "hi" ? "उद्यम श्रेणी बेमेल (विनिर्माण के बजाय सेवाएं)" : "Udyam category mismatch (Services instead of Mfg)",
    },
    {
      id: "Cartel / proxy bidding ring detected",
      label: language === "hi" ? "कार्टेल मिलीभगत / छद्म बोली सिंडिकेट" : "Cartel / proxy bidding ring detected",
    },
  ];

  const toggleReason = (id: string) => {
    if (selectedReasons.includes(id)) {
      setSelectedReasons(selectedReasons.filter((x) => x !== id));
    } else {
      setSelectedReasons([...selectedReasons, id]);
    }
  };

  const handleDisqualify = () => {
    const fullNotes = `Grounds:\n${selectedReasons.map((r) => `• ${r}`).join("\n")}\n\nOfficer Remarks:\n${justificationNotes}`;
    disqualifyBidder(bidder.bidder_id, fullNotes);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-2xl bg-white dark:bg-deep-navy border border-slate-200/80 dark:border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden flex flex-col text-deep-navy dark:text-crisp-white"
        >
          {/* Header */}
          <div className="p-5 border-b border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-900/50 text-rose-600">
                <Ban className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-rose-700 dark:text-rose-300">
                  {language === "hi" ? "बोलीदाता को अयोग्य घोषित करें" : "Disqualify Bidder"}
                </h3>
                <p className="text-xs text-muted-gray">
                  {language === "hi" ? "इकाई: " : "Entity: "} {getBidderLegalName(bidder.legal_name, language)} ({bidder.seller_id}) {tender ? `• ${tender.tender_id}` : ""}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4 overflow-y-auto max-h-[70vh] text-xs">
            <div className="p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-deep-navy dark:text-crisp-white space-y-1">
              <div className="flex items-center space-x-1.5 text-rose-600 dark:text-rose-400 font-bold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{language === "hi" ? "ऑडिट अनुपालन सूचना" : "Audit Compliance Notice"}</span>
              </div>
              <p className="text-muted-gray text-[11px] leading-relaxed">
                {language === "hi"
                  ? "GeM सामान्य शर्तों के तहत अयोग्यता एक औपचारिक निर्णय है। प्रत्येक अस्वीकृति के लिए वैध आधार का दर्ज होना आवश्यक है।"
                  : "Disqualifying a bidder is a formal procurement action. The selected grounds and remarks will be recorded in the official audit trail."}
              </p>
            </div>

            {/* Checklist of Reasons */}
            <div className="space-y-2">
              <label className="font-bold text-deep-navy dark:text-crisp-white block">
                {language === "hi" ? "अयोग्यता के आधार चुनें:" : "Select Grounds for Disqualification:"}
              </label>
              <div className="space-y-1.5">
                {reasonOptions.map((opt) => {
                  const isChecked = selectedReasons.includes(opt.id);
                  return (
                    <label
                      key={opt.id}
                      onClick={() => toggleReason(opt.id)}
                      className={`flex items-center space-x-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? "border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30 font-semibold text-deep-navy dark:text-crisp-white"
                          : "border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-dark-navy hover:bg-slate-100 text-muted-gray"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        readOnly
                        className="rounded text-rose-600 focus:ring-rose-500"
                      />
                      <span>{opt.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Justification Notes */}
            <div className="space-y-1.5">
              <label className="font-bold text-deep-navy dark:text-crisp-white block">
                {language === "hi" ? "खरीद अधिकारी की टिप्पणी:" : "Officer Remarks:"}
              </label>
              <textarea
                value={justificationNotes}
                onChange={(e) => setJustificationNotes(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-xl font-sans text-xs leading-relaxed bg-slate-50 dark:bg-dark-navy border border-slate-200 dark:border-white/10 text-deep-navy dark:text-crisp-white focus:outline-none focus:border-rose-500"
              />
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
              onClick={handleDisqualify}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-all"
            >
              <Ban className="w-3.5 h-3.5" />
              <span>{language === "hi" ? "अयोग्यता की पुष्टि करें" : "Confirm Disqualification"}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
