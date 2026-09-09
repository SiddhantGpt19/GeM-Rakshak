"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileSearch } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface LaserScanOverlayProps {
  isScanning: boolean;
  scanProgress?: number;
  label?: string;
  onScanComplete?: () => void;
}

export function LaserScanOverlay({
  isScanning,
  label,
}: LaserScanOverlayProps) {
  const { language } = useLanguage();
  const displayLabel = label || (language === "hi" ? "दस्तावेज़ संरचना एवं मेटाडेटा विश्लेषण जारी..." : "Analyzing document structure & metadata...");

  if (!isScanning) return null;

  return (
    <AnimatePresence>
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-xl">
        {/* Subtle translucent inspection tint */}
        <div className="absolute inset-0 bg-blue-900/[0.04] dark:bg-blue-950/[0.15] backdrop-brightness-95" />

        {/* Authentic Document Inspection Scanline */}
        <motion.div
          initial={{ top: "0%" }}
          animate={{
            top: ["0%", "96%", "0%"],
          }}
          transition={{
            duration: 2.4,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="absolute left-0 right-0 h-[2px] bg-blue-600 z-30 shadow-[0_2px_10px_rgba(37,99,235,0.4)]"
        >
          {/* Subtle gradient wash below scanning hairline */}
          <div className="w-full h-8 bg-gradient-to-b from-blue-600/15 to-transparent" />
        </motion.div>

        {/* Professional Inspection Status Pill */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-slate-900/90 dark:bg-slate-900/95 border border-slate-700/60 px-4 py-2.5 rounded-lg backdrop-blur-md shadow-enterprise-md text-white">
          <div className="flex items-center space-x-2.5">
            <FileSearch className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-medium tracking-normal text-slate-100">
              {displayLabel}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-[11px] text-slate-300 font-mono">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>{language === "hi" ? "सत्यापन जारी" : "Analyzing"}</span>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
