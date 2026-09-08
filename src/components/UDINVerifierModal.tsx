"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Landmark, ShieldCheck, ShieldAlert } from "lucide-react";
import { DocumentForensics } from "@/types";

interface UDINVerifierModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: DocumentForensics | null;
}

export function UDINVerifierModal({ isOpen, onClose, document }: UDINVerifierModalProps) {
  if (!isOpen || !document || !document.udin_check) return null;

  const { udin, ca_membership_no, ca_name, date_of_issuance, status, reason } = document.udin_check;
  const isAuthentic = status === "AUTHENTIC";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-xl bg-soft-beige dark:bg-deep-navy border border-warm-beige dark:border-warm-beige/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-deep-navy dark:text-crisp-white"
        >
          {/* Header */}
          <div className="p-5 border-b border-warm-beige dark:border-warm-beige/20 bg-warm-beige/40 dark:bg-dark-navy/60 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-lavender/15 text-lavender">
                <Landmark className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-deep-navy dark:text-crisp-white">
                  ICAI UDIN Statutory Registry Verification
                </h3>
                <p className="text-xs text-muted-gray">
                  Institute of Chartered Accountants of India (ICAI) Gazette Mandate
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4 text-xs">
            {/* Verification Status Pill Banner */}
            <div className={`p-4 rounded-xl border flex items-start space-x-3 ${
              isAuthentic
                ? "bg-mint-green/15 border-mint-green/30 text-mint-green"
                : "bg-coral-orange/15 border-coral-orange/40 text-coral-orange"
            }`}>
              {isAuthentic ? (
                <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
              ) : (
                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 animate-pulse" />
              )}
              <div className="space-y-1">
                <p className="font-bold text-sm">
                  {isAuthentic ? "UDIN Status: VERIFIED & AUTHENTIC" : "UDIN Status: FAKE / FORGED"}
                </p>
                <p className="text-deep-navy dark:text-crisp-white leading-relaxed">
                  {isAuthentic
                    ? "The 18-digit Unique Document Identification Number is officially registered on the ICAI UDIN portal by a practicing Chartered Accountant holding a Certificate of Practice (COP)."
                    : reason ||
                      "UDIN failed checksum validation. No entry found in the Institute of Chartered Accountants of India central database for this registration number."}
                </p>
              </div>
            </div>

            {/* UDIN Breakdown details */}
            <div className="space-y-2.5 p-4 rounded-xl border border-warm-beige dark:border-warm-beige/20 bg-crisp-white dark:bg-dark-navy">
              <div className="flex items-center justify-between pb-2 border-b border-warm-beige dark:border-warm-beige/20">
                <span className="text-muted-gray font-medium">18-Digit UDIN</span>
                <span className={`font-mono font-bold text-sm ${isAuthentic ? "text-mint-green" : "text-coral-orange line-through"}`}>
                  {udin}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-muted-gray">CA Membership Number</span>
                <span className="font-mono font-semibold text-deep-navy dark:text-crisp-white">
                  {ca_membership_no}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-muted-gray">Chartered Accountant / Firm</span>
                <span className="font-semibold text-deep-navy dark:text-crisp-white">
                  {ca_name}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-muted-gray">Date of Certificate Issuance</span>
                <span className="font-mono text-deep-navy dark:text-crisp-white">
                  {date_of_issuance}
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-muted-gray">Document Scope</span>
                <span className="font-semibold text-lavender">
                  Make in India / Net Worth Compliance
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-warm-beige dark:border-warm-beige/20 bg-warm-beige/30 dark:bg-dark-navy/40 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-lavender text-crisp-white hover:bg-lavender/90 transition-all shadow-xs"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
