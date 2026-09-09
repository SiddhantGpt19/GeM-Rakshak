"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertOctagon, FileSearch, Fingerprint, ShieldAlert } from "lucide-react";
import { DocumentForensics } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface ExifInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: DocumentForensics | null;
}

export function ExifInspectorModal({ isOpen, onClose, document }: ExifInspectorModalProps) {
  const { language } = useLanguage();
  if (!isOpen || !document) return null;

  const { exif_metadata, file_name, file_hash_sha256 } = document;
  const isSuspicious = exif_metadata.suspicious_flag;

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
          <div className={`p-5 border-b flex items-center justify-between ${
            isSuspicious
              ? "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300"
              : "bg-slate-50 dark:bg-dark-navy/60 border-slate-200/80 dark:border-white/[0.08] text-deep-navy dark:text-crisp-white"
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-xl ${isSuspicious ? "bg-rose-100 dark:bg-rose-900/50 text-rose-600" : "bg-gov-blue-50 dark:bg-gov-blue-950/40 text-gov-blue-600 dark:text-gov-blue-400"}`}>
                {isSuspicious ? <AlertOctagon className="w-6 h-6 text-rose-600" /> : <FileSearch className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="text-base font-bold">
                  {isSuspicious
                    ? (language === "hi" ? "मेटाडेटा चेतावनी: फ़ाइल संशोधित की गई" : "Metadata Alert: File Altered")
                    : (language === "hi" ? "दस्तावेज़ मेटाडेटा और निर्माण विवरण" : "Document Metadata & Creation History")}
                </h3>
                <p className="text-xs text-muted-gray">{language === "hi" ? "फ़ाइल:" : "File:"} {file_name}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
            {isSuspicious && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 space-y-1.5">
                <div className="flex items-center space-x-2 font-bold text-xs">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <span>{language === "hi" ? "सॉफ़्टवेयर विसंगति" : "Software Modification Detected"}</span>
                </div>
                <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-200">
                  {language === "hi"
                    ? "चेतावनी: यह फ़ाइल सरकारी पोर्टल के बजाय Adobe Photoshop में बनाई या संपादित की गई है।"
                    : "Warning: This document was modified using desktop graphics software (Adobe Photoshop) rather than exported directly from official government systems."}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-dark-navy/60">
                <span className="text-muted-gray block text-[10px] uppercase font-bold">
                  {language === "hi" ? "पीडीएफ निर्माता" : "PDF Producer"}
                </span>
                <span className="font-mono font-semibold text-deep-navy dark:text-crisp-white">
                  {exif_metadata.producer}
                </span>
              </div>

              <div className={`p-3 rounded-xl border ${
                isSuspicious
                  ? "border-rose-300 bg-rose-50/50 dark:bg-rose-950/20 font-bold"
                  : "border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-dark-navy/60"
              }`}>
                <span className="text-muted-gray block text-[10px] uppercase font-bold">
                  {language === "hi" ? "सृजन सॉफ़्टवेयर" : "Creator Tool"}
                </span>
                <span className={`font-mono ${isSuspicious ? "text-rose-600 dark:text-rose-400" : "text-deep-navy dark:text-crisp-white font-semibold"}`}>
                  {exif_metadata.creator_tool}
                </span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-dark-navy/60">
                <span className="text-muted-gray block text-[10px] uppercase font-bold">
                  {language === "hi" ? "मूल निर्माण तिथि" : "Original Creation Date"}
                </span>
                <span className="font-mono text-deep-navy dark:text-crisp-white">
                  {exif_metadata.create_date}
                </span>
              </div>

              <div className="p-3 rounded-xl border border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-dark-navy/60">
                <span className="text-muted-gray block text-[10px] uppercase font-bold">
                  {language === "hi" ? "अंतिम संशोधन तिथि" : "Last Modification Date"}
                </span>
                <span className="font-mono text-deep-navy dark:text-crisp-white">
                  {exif_metadata.modify_date}
                </span>
              </div>
            </div>

            {/* Cryptographic SHA-256 Hash */}
            <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-dark-navy/60 space-y-1">
              <div className="flex items-center justify-between text-[11px] text-muted-gray">
                <span className="flex items-center space-x-1.5 font-bold uppercase">
                  <Fingerprint className="w-3.5 h-3.5 text-gov-blue-600 dark:text-gov-blue-400" />
                  <span>{language === "hi" ? "SHA-256 डिजिटल फ़िंगरप्रिंट" : "SHA-256 Hash"}</span>
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  {language === "hi" ? "सत्यापित" : "Logged in Audit Trail"}
                </span>
              </div>
              <p className="font-mono text-[11px] break-all text-deep-navy dark:text-crisp-white bg-white dark:bg-deep-navy p-2 rounded-lg border border-slate-200 dark:border-white/10">
                {file_hash_sha256}
              </p>
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
