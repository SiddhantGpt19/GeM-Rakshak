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
    "False or misleading documentation / Forensic alteration",
    "Active CPSE / Ministry Debarment status",
  ]);

  if (!isOpen) return null;

  const reasonOptions = [
    {
      id: "False or misleading documentation / Forensic alteration",
      label: language === "hi" ? "गलत या भ्रामक दस्तावेज़ / फोरेंसिक हेरफेर" : "False or misleading documentation / Forensic alteration",
    },
    {
      id: "Active CPSE / Ministry Debarment status",
      label: language === "hi" ? "सक्रिय CPSE / मंत्रालय प्रतिबंध स्थिति" : "Active CPSE / Ministry Debarment status",
    },
    {
      id: "Failure to meet minimum financial turnover (₹15.00 Cr threshold)",
      label: language === "hi" ? "न्यूनतम वित्तीय कारोबार में विफलता (₹15.00 करोड़ सीमा)" : "Failure to meet minimum financial turnover (₹15.00 Cr threshold)",
    },
    {
      id: "Non-compliance with Make in India Class-I local content (≥50%)",
      label: language === "hi" ? "मेक इन इंडिया कक्षा-I स्थानीय सामग्री का गैर-अनुपालन (≥50%)" : "Non-compliance with Make in India Class-I local content (≥50%)",
    },
    {
      id: "Udyam registration category mismatch (Services instead of Manufacturing)",
      label: language === "hi" ? "उद्यम पंजीकरण श्रेणी बेमेल (विनिर्माण के बजाय सेवाएं)" : "Udyam registration category mismatch (Services instead of Manufacturing)",
    },
    {
      id: "Cartelization / Proxy bidding ring detected",
      label: language === "hi" ? "कार्टेल मिलीभगत / छद्म बोली सिंडिकेट की पहचान" : "Cartelization / Proxy bidding ring detected",
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
    const fullNotes = `Statutory Grounds:\n${selectedReasons.map((r) => `• ${r}`).join("\n")}\n\nOfficer Remarks:\n${justificationNotes}`;
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
          className="w-full max-w-2xl bg-soft-beige dark:bg-deep-navy border-2 border-coral-orange/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-deep-navy dark:text-crisp-white"
        >
          {/* Header */}
          <div className="p-5 border-b border-coral-orange/20 bg-coral-orange/15 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-coral-orange/20 text-coral-orange">
                <Ban className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-coral-orange">
                  {language === "hi" ? "वैधानिक अयोग्यता और अस्वीकृति" : "Statutory Disqualification & Rejection"}
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
            <div className="p-3.5 rounded-xl bg-coral-orange/10 border border-coral-orange/30 text-deep-navy dark:text-crisp-white space-y-1">
              <div className="flex items-center space-x-1.5 text-coral-orange font-bold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{language === "hi" ? "CVC वैधानिक अनुपालन सूचना" : "CVC Statutory Compliance Notice"}</span>
              </div>
              <p className="text-muted-gray text-[11px] leading-relaxed">
                {language === "hi"
                  ? "GeM सामान्य शर्तों की धारा 34 के तहत अयोग्यता कानूनी रूप से बाध्यकारी है। CVC सतर्कता और संभावित मध्यस्थता ऑडिट के लिए प्रत्येक अस्वीकृति का दर्ज वैधानिक औचित्य आवश्यक है।"
                  : "Disqualification is legally binding under Section 34 of GeM GTC. Every rejection requires recorded statutory justification for CVC vigilance and potential arbitration audit."}
              </p>
            </div>

            {/* Checklist of Reasons */}
            <div className="space-y-2">
              <label className="font-bold text-deep-navy dark:text-crisp-white block">
                {language === "hi" ? "अयोग्यता के वैधानिक आधार चुनें:" : "Select Statutory Grounds for Disqualification:"}
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
                          ? "border-coral-orange bg-coral-orange/15 font-semibold text-deep-navy dark:text-crisp-white"
                          : "border-warm-beige dark:border-warm-beige/20 bg-crisp-white dark:bg-dark-navy hover:bg-warm-beige/20 text-muted-gray"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        readOnly
                        className="rounded text-coral-orange focus:ring-coral-orange"
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
                {language === "hi" ? "खरीद अधिकारी की अंतिम टिप्पणी और औचित्य:" : "Procurement Officer Final Remarks & Justification:"}
              </label>
              <textarea
                value={justificationNotes}
                onChange={(e) => setJustificationNotes(e.target.value)}
                rows={4}
                className="w-full p-3 rounded-xl font-sans text-xs leading-relaxed bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/20 text-deep-navy dark:text-crisp-white focus:outline-none focus:border-coral-orange"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-warm-beige dark:border-warm-beige/20 bg-warm-beige/30 dark:bg-dark-navy/40 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white"
            >
              {language === "hi" ? "रद्द करें" : "Cancel"}
            </button>
            <button
              onClick={handleDisqualify}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-coral-orange hover:bg-coral-orange-600 text-white shadow-md shadow-coral-orange/30 transition-all"
            >
              <Ban className="w-3.5 h-3.5" />
              <span>{language === "hi" ? "वैधानिक अयोग्यता की पुष्टि करें" : "Confirm Statutory Disqualification"}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
