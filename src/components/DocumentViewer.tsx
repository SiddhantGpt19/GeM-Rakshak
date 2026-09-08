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
  const { t } = useLanguage();
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

  // Trigger laser scan animation when switching document tabs or activating ELA
  useEffect(() => {
    setIsScanning(true);
    const timer = setTimeout(() => {
      setIsScanning(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, [selectedDocIndex, activeForensicMode]);

  if (!currentDoc) {
    return (
      <div className="p-8 text-center text-muted-gray border border-dashed border-warm-beige dark:border-warm-beige/20 rounded-xl">
        No documents uploaded for this bidder.
      </div>
    );
  }

  const hasELA = currentDoc.ela_tamper_detected;

  return (
    <div className="flex flex-col h-full space-y-3">
      {/* 1. Document Tabs */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 border-b border-warm-beige dark:border-warm-beige/20 text-xs">
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
                  ? "bg-lavender text-crisp-white shadow-md shadow-lavender/25 font-bold"
                  : "bg-crisp-white dark:bg-dark-navy text-deep-navy dark:text-crisp-white border border-warm-beige dark:border-warm-beige/20 hover:border-lavender"
              }`}
            >
              <FileText className={`w-3.5 h-3.5 ${isSelected ? "text-crisp-white" : "text-muted-gray"}`} />
              <span>{doc.doc_name}</span>
              {hasTamper && (
                <span className="w-2 h-2 rounded-full bg-coral-orange animate-pulse" title="Tampering Detected" />
              )}
            </button>
          );
        })}
      </div>

      {/* 2. Forensics Action Toolbar */}
      <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/20 overflow-x-auto scrollbar-none">
        <div className="flex items-center space-x-1.5 shrink-0">
          {/* Normal View Button */}
          <button
            onClick={() => setActiveForensicMode("normal")}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 whitespace-nowrap ${
              activeForensicMode === "normal"
                ? "bg-deep-navy text-crisp-white dark:bg-crisp-white dark:text-deep-navy shadow-xs"
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
                ? "bg-coral-orange text-white shadow-md shadow-coral-orange/30 animate-pulse"
                : hasELA
                ? "bg-coral-orange/15 text-coral-orange border border-coral-orange/40 hover:bg-coral-orange/25"
                : "text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white"
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-coral-orange" />
            <span>{t.toolELA}</span>
            {hasELA && <span className="w-1.5 h-1.5 rounded-full bg-coral-orange" />}
          </button>

          {/* Exif Metadata Inspector Button */}
          <button
            onClick={() => setIsExifModalOpen(true)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all shrink-0 whitespace-nowrap ${
              currentDoc.exif_metadata.suspicious_flag
                ? "border-coral-orange bg-coral-orange/10 text-coral-orange font-bold animate-pulse"
                : "border-warm-beige dark:border-warm-beige/20 bg-soft-beige/30 dark:bg-deep-navy text-deep-navy dark:text-crisp-white hover:border-lavender"
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>{t.toolExif}</span>
            {currentDoc.exif_metadata.suspicious_flag && (
              <span className="text-[10px] bg-coral-orange text-white px-1 rounded">Photoshop!</span>
            )}
          </button>

          {/* QR Code Cross-Check Button */}
          <button
            onClick={() => setIsQRModalOpen(true)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all shrink-0 whitespace-nowrap ${
              !currentDoc.qr_code_cross_check.is_match
                ? "border-coral-orange bg-coral-orange/10 text-coral-orange font-bold"
                : "border-warm-beige dark:border-warm-beige/20 bg-soft-beige/30 dark:bg-deep-navy text-deep-navy dark:text-crisp-white hover:border-lavender"
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>{t.toolQR}</span>
            {!currentDoc.qr_code_cross_check.is_match ? (
              <span className="text-[10px] bg-coral-orange text-white px-1 rounded">Mismatch</span>
            ) : (
              <span className="text-[10px] text-mint-green font-bold">✓ Match</span>
            )}
          </button>

          {/* UDIN Verifier (if applicable) */}
          {currentDoc.udin_check && (
            <button
              onClick={() => setIsUDINModalOpen(true)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all shrink-0 whitespace-nowrap ${
                currentDoc.udin_check.status === "FORGED"
                  ? "border-coral-orange bg-coral-orange/10 text-coral-orange font-bold animate-pulse"
                  : "border-mint-green/40 bg-mint-green/10 text-mint-green font-bold"
              }`}
            >
              <Landmark className="w-3.5 h-3.5" />
              <span>{t.toolUDIN}</span>
              <span className="text-[10px] font-mono">
                {currentDoc.udin_check.status === "FORGED" ? "FAKE" : "VALID"}
              </span>
            </button>
          )}
        </div>

        {/* Rescan Trigger */}
        <button
          onClick={() => {
            setIsScanning(true);
            setTimeout(() => setIsScanning(false), 2800);
          }}
          className="flex items-center space-x-1 text-[11px] text-lavender hover:underline font-medium px-2 py-1 shrink-0 whitespace-nowrap"
        >
          <Sparkles className="w-3 h-3" />
          <span>Laser Rescan</span>
        </button>
      </div>

      {/* 3. Interactive Document Canvas with Laser Sweep & OCR Boxes */}
      <div className="relative flex-1 min-h-[520px] rounded-2xl border-2 border-warm-beige dark:border-warm-beige/20 bg-crisp-white dark:bg-dark-navy shadow-inner overflow-hidden p-6 sm:p-8 flex flex-col justify-between select-none">
        {/* Animated Laser Scanning Overlay */}
        <LaserScanOverlay isScanning={isScanning} />

        {/* Forensic ELA Thermal Heatmap Tint Overlay */}
        {activeForensicMode === "ela" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-tr from-purple-950/40 via-transparent to-red-950/30"
          >
            <div className="absolute top-3 right-3 bg-deep-navy/90 border border-coral-orange text-coral-orange px-3 py-1 rounded-full text-[11px] font-mono font-bold flex items-center space-x-1.5 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-coral-orange animate-ping" />
              <span>ELA HEATMAP ACTIVE • 8x8 DCT Compression Delta Analysis</span>
            </div>
          </motion.div>
        )}

        {/* Watermark in background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] dark:opacity-[0.03]">
          <span className="text-7xl font-black rotate-[-25deg] uppercase text-deep-navy dark:text-crisp-white">
            GOVERNMENT OF INDIA
          </span>
        </div>

        {/* Document Header Representation */}
        <div className="border-b-2 border-warm-beige dark:border-warm-beige/30 pb-4 text-center space-y-1 relative px-14 sm:px-20">
          <div className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-lavender/15 text-lavender border border-lavender/30">
            OFFICIAL STATUTORY DOCUMENT
          </div>
          <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-deep-navy dark:text-crisp-white break-words">
            {currentDoc.doc_name}
          </h2>
          <p className="text-xs text-muted-gray truncate">
            Government e-Marketplace (GeM) Submission Record • Tender GEM/2026/B/9823410
          </p>

          {/* QR Code Graphic in top corner */}
          <div
            onClick={() => setIsQRModalOpen(true)}
            className="absolute top-0 right-0 p-1.5 bg-crisp-white dark:bg-deep-navy rounded-lg border border-warm-beige dark:border-warm-beige/30 cursor-pointer hover:border-lavender transition-all shadow-xs"
            title="Click to cross-check QR code"
          >
            <QrCode className="w-9 h-9 text-deep-navy dark:text-crisp-white" />
            <span className="block text-[8px] text-center font-mono font-bold text-lavender">VERIFY</span>
          </div>
        </div>

        {/* Document Body with Interactive OCR Text Bounding Boxes */}
        <div className="my-6 space-y-3 relative z-10">
          {currentDoc.ocr_text_blocks.map((block) => {
            const isHovered = hoveredBlock === block.id;
            const isAnomalous = block.is_anomalous;
            const isELAMode = activeForensicMode === "ela";

            return (
              <div
                key={block.id}
                onMouseEnter={() => setHoveredBlock(block.id)}
                onMouseLeave={() => setHoveredBlock(null)}
                className={`relative p-2.5 rounded-lg font-mono text-xs transition-all cursor-pointer ${
                  isELAMode && isAnomalous
                    ? "ela-tamper-glow bg-coral-orange/20 text-coral-orange font-bold"
                    : isAnomalous
                    ? "border border-coral-orange/50 bg-coral-orange/10 text-coral-orange"
                    : isHovered
                    ? "border border-lavender bg-lavender/15 text-deep-navy dark:text-crisp-white shadow-xs"
                    : "border border-dashed border-warm-beige dark:border-warm-beige/20 bg-soft-beige/20 dark:bg-deep-navy text-deep-navy dark:text-crisp-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{block.text}</span>
                  <div className="flex items-center space-x-1.5 text-[10px] text-muted-gray font-sans">
                    {block.field_mapped && (
                      <span className="px-1.5 py-0.2 rounded bg-lavender/15 text-lavender font-semibold uppercase">
                        {block.field_mapped}
                      </span>
                    )}
                    <span>{(block.confidence * 100).toFixed(0)}% Conf</span>
                  </div>
                </div>

                {/* Anomalous explanation tooltip on hover or in ELA mode */}
                {isAnomalous && (isHovered || isELAMode) && (
                  <motion.div
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1.5 p-2 rounded bg-coral-orange/15 border border-coral-orange/40 text-[11px] font-sans text-coral-orange space-y-0.5"
                  >
                    <div className="flex items-center space-x-1 font-bold">
                      <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                      <span>Forensic Anomaly: Compression Discrepancy & Incongruent Baseline</span>
                    </div>
                    <p className="text-deep-navy dark:text-crisp-white">
                      Field value diverges from Government Portal verified API response or indicates copy-paste raster alteration.
                    </p>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

        {/* Document Footer with Official Seal & Signature */}
        <div className="pt-4 border-t border-dashed border-warm-beige dark:border-warm-beige/20 flex items-end justify-between text-xs text-muted-gray">
          <div>
            <p className="font-mono text-[10px]">Doc ID: {currentDoc.doc_id}</p>
            <p className="font-mono text-[10px] truncate max-w-[220px]">
              SHA256: {currentDoc.file_hash_sha256}
            </p>
          </div>

          <div className="text-right space-y-1">
            <div className="inline-block border-2 border-mint-green/60 text-mint-green font-bold text-[10px] uppercase px-3 py-1 rounded-md rotate-[-6deg]">
              GeM-RAKSHAK VERIFIED
            </div>
            <p className="text-[10px] font-semibold text-deep-navy dark:text-crisp-white">
              AI Ingestion Complete
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
