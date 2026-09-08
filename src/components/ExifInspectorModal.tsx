"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertOctagon, FileSearch, Fingerprint, ShieldAlert } from "lucide-react";
import { DocumentForensics } from "@/types";

interface ExifInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: DocumentForensics | null;
}

export function ExifInspectorModal({ isOpen, onClose, document }: ExifInspectorModalProps) {
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
          className="w-full max-w-2xl bg-soft-beige dark:bg-deep-navy border border-warm-beige dark:border-warm-beige/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-deep-navy dark:text-crisp-white"
        >
          {/* Header */}
          <div className={`p-5 border-b flex items-center justify-between ${
            isSuspicious
              ? "bg-coral-orange/15 border-coral-orange/30 text-coral-orange"
              : "bg-warm-beige/40 dark:bg-dark-navy/60 border-warm-beige dark:border-warm-beige/20 text-deep-navy dark:text-crisp-white"
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-xl ${isSuspicious ? "bg-coral-orange/20" : "bg-lavender/15 text-lavender"}`}>
                {isSuspicious ? <AlertOctagon className="w-6 h-6 animate-pulse text-coral-orange" /> : <FileSearch className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="text-base font-bold">
                  {isSuspicious ? "CRITICAL FORENSIC ALERT: Raster Tampering Detected" : "PDF Binary & Metadata Provenance"}
                </h3>
                <p className="text-xs text-muted-gray">File: {file_name}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
            {isSuspicious && (
              <div className="p-4 rounded-xl bg-coral-orange/15 border border-coral-orange/40 text-coral-orange space-y-2">
                <div className="flex items-center space-x-2 font-bold text-sm">
                  <ShieldAlert className="w-4 h-4" />
                  <span>XMP / EXIF Software Anomaly</span>
                </div>
                <p className="text-xs leading-relaxed text-deep-navy dark:text-crisp-white">
                  {exif_metadata.suspicious_reason ||
                    "Critical Flag: File modified using Adobe Photoshop CC 2024, not government portal renderer. High probability of fabricated numbers and pasted seal."}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-warm-beige dark:border-warm-beige/20 bg-crisp-white dark:bg-dark-navy">
                <span className="text-muted-gray block text-[10px] uppercase font-bold">PDF Producer</span>
                <span className="font-mono font-semibold text-deep-navy dark:text-crisp-white">
                  {exif_metadata.producer}
                </span>
              </div>

              <div className={`p-3 rounded-xl border ${
                isSuspicious
                  ? "border-coral-orange bg-coral-orange/10 font-bold"
                  : "border-warm-beige dark:border-warm-beige/20 bg-crisp-white dark:bg-dark-navy"
              }`}>
                <span className="text-muted-gray block text-[10px] uppercase font-bold">Creator Tool</span>
                <span className={`font-mono ${isSuspicious ? "text-coral-orange" : "text-deep-navy dark:text-crisp-white font-semibold"}`}>
                  {exif_metadata.creator_tool}
                </span>
              </div>

              <div className="p-3 rounded-xl border border-warm-beige dark:border-warm-beige/20 bg-crisp-white dark:bg-dark-navy">
                <span className="text-muted-gray block text-[10px] uppercase font-bold">Original Creation Date</span>
                <span className="font-mono text-deep-navy dark:text-crisp-white">
                  {exif_metadata.create_date}
                </span>
              </div>

              <div className="p-3 rounded-xl border border-warm-beige dark:border-warm-beige/20 bg-crisp-white dark:bg-dark-navy">
                <span className="text-muted-gray block text-[10px] uppercase font-bold">Last Modification Date</span>
                <span className="font-mono text-deep-navy dark:text-crisp-white">
                  {exif_metadata.modify_date}
                </span>
              </div>
            </div>

            {/* Cryptographic SHA-256 Hash */}
            <div className="p-3.5 rounded-xl border border-warm-beige dark:border-warm-beige/20 bg-crisp-white dark:bg-dark-navy space-y-1">
              <div className="flex items-center justify-between text-[11px] text-muted-gray">
                <span className="flex items-center space-x-1.5 font-bold uppercase">
                  <Fingerprint className="w-3.5 h-3.5 text-lavender" />
                  <span>SHA-256 Digital Fingerprint</span>
                </span>
                <span className="text-mint-green font-semibold">Integrity Logged</span>
              </div>
              <p className="font-mono text-[11px] break-all text-deep-navy dark:text-crisp-white bg-soft-beige/40 dark:bg-deep-navy p-2 rounded-lg border border-warm-beige dark:border-warm-beige/20">
                {file_hash_sha256}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-warm-beige dark:border-warm-beige/20 bg-warm-beige/30 dark:bg-dark-navy/40 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-lavender text-crisp-white hover:bg-lavender/90 transition-all shadow-xs"
            >
              Close Inspector
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
