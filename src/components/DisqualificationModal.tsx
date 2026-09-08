"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Ban, AlertTriangle } from "lucide-react";
import { Bidder, TenderMetadata } from "@/types";
import { useTenderData } from "@/context/TenderDataContext";

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
  const [justificationNotes, setJustificationNotes] = useState(
    `Disqualified due to statutory non-compliance: Material discrepancies identified in submitted certificates against portal records. Bidder failed to fulfill mandatory criteria under GeM GTC & CPCL Tender Terms.`
  );
  const [selectedReasons, setSelectedReasons] = useState<string[]>([
    "False or misleading documentation / Forensic alteration",
    "Active CPSE / Ministry Debarment status",
  ]);

  if (!isOpen) return null;

  const reasonOptions = [
    "False or misleading documentation / Forensic alteration",
    "Active CPSE / Ministry Debarment status",
    "Failure to meet minimum financial turnover (₹15.00 Cr threshold)",
    "Non-compliance with Make in India Class-I local content (≥50%)",
    "Udyam registration category mismatch (Services instead of Manufacturing)",
    "Cartelization / Proxy bidding ring detected",
  ];

  const toggleReason = (r: string) => {
    if (selectedReasons.includes(r)) {
      setSelectedReasons(selectedReasons.filter((x) => x !== r));
    } else {
      setSelectedReasons([...selectedReasons, r]);
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
                  Statutory Disqualification & Rejection
                </h3>
                <p className="text-xs text-muted-gray">
                  Entity: {bidder.legal_name} ({bidder.seller_id})
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
                <span>CVC Statutory Compliance Notice</span>
              </div>
              <p className="text-muted-gray text-[11px] leading-relaxed">
                Disqualification is legally binding under Section 34 of GeM GTC. Every rejection requires recorded statutory justification for CVC vigilance and potential arbitration audit.
              </p>
            </div>

            {/* Checklist of Reasons */}
            <div className="space-y-2">
              <label className="font-bold text-deep-navy dark:text-crisp-white block">
                Select Statutory Grounds for Disqualification:
              </label>
              <div className="space-y-1.5">
                {reasonOptions.map((reason) => {
                  const isChecked = selectedReasons.includes(reason);
                  return (
                    <label
                      key={reason}
                      onClick={() => toggleReason(reason)}
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
                      <span>{reason}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Justification Notes */}
            <div className="space-y-1.5">
              <label className="font-bold text-deep-navy dark:text-crisp-white block">
                Procurement Officer Final Remarks & Justification:
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
              Cancel
            </button>
            <button
              onClick={handleDisqualify}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-coral-orange hover:bg-coral-orange-600 text-white shadow-md shadow-coral-orange/30 transition-all"
            >
              <Ban className="w-3.5 h-3.5" />
              <span>Confirm Statutory Disqualification</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
