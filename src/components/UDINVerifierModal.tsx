"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Landmark, ShieldCheck, ShieldAlert } from "lucide-react";
import { DocumentForensics } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface UDINVerifierModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: DocumentForensics | null;
}

export function UDINVerifierModal({ isOpen, onClose, document }: UDINVerifierModalProps) {
  const { language } = useLanguage();
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
          className="w-full max-w-xl bg-white dark:bg-deep-navy border border-slate-200/80 dark:border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden flex flex-col text-deep-navy dark:text-crisp-white"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-200/80 dark:border-white/[0.08] bg-slate-50 dark:bg-dark-navy/60 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-gov-blue-50 dark:bg-gov-blue-950/40 text-gov-blue-600 dark:text-gov-blue-400">
                <Landmark className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-deep-navy dark:text-crisp-white">
                  {language === "hi" ? "सीए प्रमाणपत्र और UDIN सत्यापन" : "CA Certificate & UDIN Check"}
                </h3>
                <p className="text-xs text-muted-gray">
                  {language === "hi"
                    ? "ICAI चार्टर्ड एकाउंटेंट केंद्रीय डेटाबेस जांच"
                    : "ICAI Chartered Accountant Database Verification"}
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
                ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300"
                : "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50 text-rose-800 dark:text-rose-300"
            }`}>
              {isAuthentic ? (
                <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
              ) : (
                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-rose-600" />
              )}
              <div className="space-y-1">
                <p className="font-bold text-sm">
                  {isAuthentic
                    ? (language === "hi" ? "UDIN सत्यापित: प्रामाणिक सीए प्रमाणपत्र" : "UDIN Verified: Authentic CA Certificate")
                    : (language === "hi" ? "UDIN चेतावनी: जाली / असत्यापित प्रमाणपत्र" : "UDIN Alert: Fake / Unregistered CA Certificate")}
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isAuthentic
                    ? (language === "hi"
                        ? "18-अंकीय UDIN आधिकारिक रूप से ICAI पोर्टल पर पंजीकृत है और प्रामाणिक चार्टर्ड एकाउंटेंट द्वारा जारी किया गया है।"
                        : "The 18-digit UDIN is valid and officially registered with ICAI by a verified Chartered Accountant.")
                    : (language === "hi"
                        ? "UDIN संख्या अमान्य है। ICAI केंद्रीय डेटाबेस में इसका कोई रिकॉर्ड नहीं मिला।"
                        : (reason ||
                          "UDIN failed verification. No entry found in the Institute of Chartered Accountants of India registry for this registration number."))}
                </p>
              </div>
            </div>

            {/* UDIN Breakdown details */}
            <div className="space-y-2.5 p-4 rounded-xl border border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-dark-navy/60">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10">
                <span className="text-muted-gray font-medium">
                  {language === "hi" ? "18-अंकीय UDIN" : "18-Digit UDIN"}
                </span>
                <span className={`font-mono font-bold text-sm ${isAuthentic ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400 line-through"}`}>
                  {udin}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-muted-gray">
                  {language === "hi" ? "सीए सदस्यता संख्या" : "CA Membership Number"}
                </span>
                <span className="font-mono font-semibold text-deep-navy dark:text-crisp-white">
                  {ca_membership_no}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-muted-gray">
                  {language === "hi" ? "चार्टर्ड एकाउंटेंट / फर्म" : "Chartered Accountant / Firm"}
                </span>
                <span className="font-semibold text-deep-navy dark:text-crisp-white">
                  {ca_name}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-muted-gray">
                  {language === "hi" ? "जारी करने की तिथि" : "Date of Issuance"}
                </span>
                <span className="font-mono text-deep-navy dark:text-crisp-white">
                  {date_of_issuance}
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-muted-gray">
                  {language === "hi" ? "दायरा" : "Scope"}
                </span>
                <span className="font-semibold text-gov-blue-600 dark:text-gov-blue-400">
                  {language === "hi" ? "मेक इन इंडिया / टर्नओवर प्रमाणपत्र" : "Make in India / Turnover Certificate"}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200/80 dark:border-white/[0.08] bg-slate-50 dark:bg-dark-navy/40 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-gov-blue-600 text-white hover:bg-gov-blue-700 transition-all shadow-xs"
            >
              {language === "hi" ? "बंद करें" : "Close"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
