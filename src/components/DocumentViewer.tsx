"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Flame,
  Search,
  QrCode,
  Landmark,
  Eye,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { Bidder } from "@/types";
import { LaserScanOverlay } from "./LaserScanOverlay";
import { ExifInspectorModal } from "./ExifInspectorModal";
import { QRCodeDiffModal } from "./QRCodeDiffModal";
import { UDINVerifierModal } from "./UDINVerifierModal";
import { useLanguage } from "@/context/LanguageContext";

interface DocumentViewerProps {
  bidder: Bidder;
}

export function DocumentViewer({ bidder }: DocumentViewerProps) {
  const { t, language } = useLanguage();
  const [selectedDocIndex, setSelectedDocIndex] = useState(0);
  const [activeForensicMode, setActiveForensicMode] = useState<"normal" | "ela">("normal");
  const [isScanning, setIsScanning] = useState(false);
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null);

  // Modals state
  const [isExifModalOpen, setIsExifModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isUDINModalOpen, setIsUDINModalOpen] = useState(false);

  const docs = bidder.documents;
  const currentDoc = docs[selectedDocIndex] || docs[0];

  // Trigger scan animation when switching document tabs or activating ELA
  useEffect(() => {
    setIsScanning(true);
    const timer = setTimeout(() => {
      setIsScanning(false);
    }, 2400);
    return () => clearTimeout(timer);
  }, [selectedDocIndex, activeForensicMode]);

  if (!currentDoc) {
    return (
      <div className="p-8 text-center text-muted-gray border border-dashed border-slate-200 dark:border-white/10 rounded-xl">
        {language === "hi" ? "इस बोलीदाता के लिए कोई दस्तावेज़ अपलोड नहीं किया गया है।" : "No documents uploaded for this bidder."}
      </div>
    );
  }

  const hasELA = currentDoc.ela_tamper_detected;

  return (
    <div className="flex flex-col h-full space-y-3">
      {/* 1. Document Tabs */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 border-b border-slate-200/80 dark:border-white/[0.08] text-xs">
        {docs.map((doc, idx) => {
          const isSelected = idx === selectedDocIndex;
          const hasTamper = doc.ela_tamper_detected || doc.exif_metadata.suspicious_flag;

          return (
            <button
              key={doc.doc_id}
              onClick={() => {
                setSelectedDocIndex(idx);
                setActiveForensicMode("normal");
              }}
              className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all whitespace-nowrap font-medium text-xs ${
                isSelected
                  ? "bg-gov-blue-600 text-white shadow-xs font-bold"
                  : "bg-white dark:bg-dark-navy text-deep-navy dark:text-crisp-white border border-slate-200/80 dark:border-white/[0.08] hover:border-gov-blue-400"
              }`}
            >
              <FileText className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-muted-gray"}`} />
              <span>{doc.doc_name}</span>
              {hasTamper && (
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" title={language === "hi" ? "छेड़छाड़ की पहचान" : "Tampering Detected"} />
              )}
            </button>
          );
        })}
      </div>

      {/* 2. Forensics Action Toolbar */}
      <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white dark:bg-dark-navy border border-slate-200/80 dark:border-white/[0.08] overflow-x-auto scrollbar-none">
        <div className="flex items-center space-x-1.5 shrink-0">
          {/* Normal View Button */}
          <button
            onClick={() => setActiveForensicMode("normal")}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 whitespace-nowrap ${
              activeForensicMode === "normal"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs"
                : "text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t.toolNormal}</span>
          </button>

          {/* ELA Heatmap Toggle Button */}
          <button
            onClick={() => setActiveForensicMode(activeForensicMode === "ela" ? "normal" : "ela")}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 whitespace-nowrap ${
              activeForensicMode === "ela"
                ? "bg-rose-600 text-white shadow-xs"
                : hasELA
                ? "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50 hover:bg-rose-100"
                : "text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white"
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-rose-600" />
            <span>{t.toolELA}</span>
            {hasELA && <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />}
          </button>

          {/* Exif Metadata Inspector Button */}
          <button
            onClick={() => setIsExifModalOpen(true)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all shrink-0 whitespace-nowrap ${
              currentDoc.exif_metadata.suspicious_flag
                ? "border-rose-300 bg-rose-50 dark:bg-rose-950/20 text-rose-600 font-bold"
                : "border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-deep-navy text-deep-navy dark:text-crisp-white hover:border-gov-blue-300"
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>{t.toolExif}</span>
            {currentDoc.exif_metadata.suspicious_flag && (
              <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded font-bold">
                {language === "hi" ? "फ़ोटोशॉप!" : "Photoshop!"}
              </span>
            )}
          </button>

          {/* QR Code Cross-Check Button */}
          <button
            onClick={() => setIsQRModalOpen(true)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all shrink-0 whitespace-nowrap ${
              !currentDoc.qr_code_cross_check.is_match
                ? "border-rose-300 bg-rose-50 dark:bg-rose-950/20 text-rose-600 font-bold"
                : "border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-deep-navy text-deep-navy dark:text-crisp-white hover:border-gov-blue-300"
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>{t.toolQR}</span>
            {!currentDoc.qr_code_cross_check.is_match ? (
              <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded font-bold">
                {language === "hi" ? "बेमेल" : "Mismatch"}
              </span>
            ) : (
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                {language === "hi" ? "✓ मेल खाया" : "✓ Match"}
              </span>
            )}
          </button>

          {/* UDIN Verifier (if applicable) */}
          {currentDoc.udin_check && (
            <button
              onClick={() => setIsUDINModalOpen(true)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all shrink-0 whitespace-nowrap ${
                currentDoc.udin_check.status === "FORGED"
                  ? "border-rose-300 bg-rose-50 dark:bg-rose-950/20 text-rose-600 font-bold"
                  : "border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 font-bold"
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>{t.toolUDIN}</span>
              <span className="text-[10px] font-mono">
                {currentDoc.udin_check.status === "FORGED"
                  ? (language === "hi" ? "जाली" : "FAKE")
                  : (language === "hi" ? "वैध" : "VALID")}
              </span>
            </button>
          )}
        </div>

        {/* Rescan Trigger */}
        <button
          onClick={() => {
            setIsScanning(true);
            setTimeout(() => setIsScanning(false), 2400);
          }}
          className="flex items-center space-x-1 text-xs text-gov-blue-600 dark:text-gov-blue-400 hover:bg-gov-blue-50 dark:hover:bg-gov-blue-950/30 px-3 py-1.5 rounded-lg transition-all border border-transparent hover:border-gov-blue-200 dark:hover:border-gov-blue-800 shrink-0 whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === "hi" ? "दस्तावेज़ पुनः जांचें" : "Re-scan Document"}</span>
        </button>
      </div>

      {/* 3. Interactive Document Canvas with Scanline & OCR Boxes */}
      <div className="relative flex-1 min-h-[520px] rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-dark-navy/80 shadow-inner overflow-hidden p-6 sm:p-8 flex flex-col justify-between select-none">
        {/* Clean Document Scanline Overlay */}
        <LaserScanOverlay isScanning={isScanning} />

        {/* Forensic ELA Thermal Heatmap Tint Overlay */}
        {activeForensicMode === "ela" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-10 pointer-events-none bg-rose-950/20"
          >
            <div className="absolute top-3 right-3 bg-white dark:bg-deep-navy border border-rose-500 text-rose-600 px-3 py-1 rounded-full text-[11px] font-semibold shadow-md">
              <span>{language === "hi" ? "छवि संशोधन पाया गया (सत्यापित विसंगति)" : "Image Tampering Detected (ELA Inconsistency)"}</span>
            </div>
          </motion.div>
        )}

        {/* Watermark in background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] dark:opacity-[0.02]">
          <span className="text-7xl font-black rotate-[-25deg] uppercase text-deep-navy dark:text-crisp-white">
            {language === "hi" ? "भारत सरकार" : "GOVERNMENT OF INDIA"}
          </span>
        </div>

        {/* Document Header Representation */}
        <div className="border-b border-slate-200 dark:border-white/10 pb-4 text-center space-y-1 relative px-14 sm:px-20">
          <div className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gov-blue-50 dark:bg-gov-blue-950/40 text-gov-blue-700 dark:text-gov-blue-300 border border-gov-blue-200 dark:border-gov-blue-800">
            {language === "hi" ? "आधिकारिक वैधानिक दस्तावेज़" : "OFFICIAL STATUTORY DOCUMENT"}
          </div>
          <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-deep-navy dark:text-crisp-white break-words">
            {currentDoc.doc_name}
          </h2>
          <p className="text-xs text-muted-gray truncate">
            {language === "hi"
              ? "गवर्नमेंट ई-मार्केटप्लेस (GeM) प्रस्तुति रिकॉर्ड • निविदा GEM/2026/B/9823410"
              : "Government e-Marketplace (GeM) Submission Record • Tender GEM/2026/B/9823410"}
          </p>

          {/* QR Code Graphic in top corner */}
          <div
            onClick={() => setIsQRModalOpen(true)}
            className="absolute top-0 right-0 p-1.5 bg-white dark:bg-deep-navy rounded-lg border border-slate-200 dark:border-white/10 cursor-pointer hover:border-gov-blue-500 transition-all shadow-xs"
            title={language === "hi" ? "QR कोड की जांच करने के लिए क्लिक करें" : "Click to cross-check QR code"}
          >
            <QrCode className="w-9 h-9 text-deep-navy dark:text-crisp-white" />
            <span className="block text-[8px] text-center font-mono font-bold text-gov-blue-600 dark:text-gov-blue-400">
              {language === "hi" ? "स्कैन" : "VERIFY"}
            </span>
          </div>
        </div>

        {/* Document Body with Interactive OCR Text Bounding Boxes */}
        <div className="my-6 space-y-2.5 relative z-10">
          {currentDoc.ocr_text_blocks.map((block) => {
            const isHovered = hoveredBlock === block.id;
            const isAnomalous = block.is_anomalous;
            const isELAMode = activeForensicMode === "ela";

            return (
              <div
                key={block.id}
                onMouseEnter={() => setHoveredBlock(block.id)}
                onMouseLeave={() => setHoveredBlock(null)}
                className={`relative p-2.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                  isELAMode && isAnomalous
                    ? "ela-tamper-box bg-rose-500/10 text-rose-700 dark:text-rose-300 font-medium"
                    : isAnomalous
                    ? "border border-rose-500/50 bg-rose-50/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300"
                    : isHovered
                    ? "border border-gov-blue-400 bg-gov-blue-50/20 text-deep-navy dark:text-crisp-white shadow-xs"
                    : "border border-slate-200/70 dark:border-white/10 bg-white/60 dark:bg-deep-navy/40 text-deep-navy dark:text-crisp-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{block.text}</span>
                  <div className="flex items-center space-x-1.5 text-[10px] text-muted-gray font-sans">
                    {block.field_mapped && (
                      <span className="px-1.5 py-0.2 rounded bg-gov-blue-50 dark:bg-gov-blue-950/40 text-gov-blue-700 dark:text-gov-blue-300 font-bold uppercase text-[9px]">
                        {block.field_mapped}
                      </span>
                    )}
                    <span>{(block.confidence * 100).toFixed(0)}% {language === "hi" ? "सटीकता" : "Match"}</span>
                  </div>
                </div>

                {/* Anomalous explanation tooltip on hover or in ELA mode */}
                {isAnomalous && (isHovered || isELAMode) && (
                  <motion.div
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1.5 p-2 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-[11px] font-sans text-rose-700 dark:text-rose-300 space-y-0.5"
                  >
                    <div className="flex items-center space-x-1 font-semibold">
                      <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                      <span>{language === "hi" ? "⚠️ संशोधन चेतावनी" : "⚠️ Alteration Detected"}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300">
                      {language === "hi"
                        ? "दस्तावेज़ में बदला हुआ टेक्स्ट पाया गया है जो सरकारी रिकॉर्ड से मेल नहीं खाता।"
                        : "Altered text detected. Font geometry and pixel layers do not match original government records."}
                    </p>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Document Footer with Official Seal */}
        <div className="pt-4 border-t border-dashed border-slate-200 dark:border-white/10 flex items-end justify-between text-xs text-muted-gray">
          <div>
            <p className="font-mono text-[10px]">{language === "hi" ? "दस्तावेज़ आईडी: " : "Doc ID: "}{currentDoc.doc_id}</p>
            <p className="font-mono text-[10px] truncate max-w-[220px]">
              SHA-256: {currentDoc.file_hash_sha256}
            </p>
          </div>

          <div className="text-right space-y-1">
            <div className="inline-block border border-emerald-500/60 text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 font-bold text-[10px] uppercase px-3 py-1 rounded-md rotate-[-4deg]">
              {language === "hi" ? "GeM-रक्षक सत्यापित" : "GeM-RAKSHAK VERIFIED"}
            </div>
            <p className="text-[10px] font-semibold text-deep-navy dark:text-crisp-white">
              {language === "hi" ? "ऑडिट सील पूर्ण" : "Audit Sealed"}
            </p>
          </div>
        </div>
      </div>

      {/* Forensic Modals */}
      <ExifInspectorModal
        isOpen={isExifModalOpen}
        onClose={() => setIsExifModalOpen(false)}
        document={currentDoc}
      />
      <QRCodeDiffModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        document={currentDoc}
      />
      <UDINVerifierModal
        isOpen={isUDINModalOpen}
        onClose={() => setIsUDINModalOpen(false)}
        document={currentDoc}
      />
    </div>
  );
}
