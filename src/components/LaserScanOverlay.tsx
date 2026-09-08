"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scan, ShieldAlert, CheckCircle2 } from "lucide-react";

interface LaserScanOverlayProps {
  isScanning: boolean;
  scanProgress?: number;
  label?: string;
  onScanComplete?: () => void;
}

export function LaserScanOverlay({
  isScanning,
  label = "AI Forensic Neural OCR Scanning...",
}: LaserScanOverlayProps) {
  if (!isScanning) return null;

  return (
    <AnimatePresence>
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-xl">
        {/* Semi-transparent grid overlay simulating computer vision scanner */}
        <div className="absolute inset-0 bg-lavender/5 dark:bg-lavender/10 backdrop-brightness-95" />

        {/* Animated Laser Line sweeping down and up */}
        <motion.div
          initial={{ top: "0%" }}
          animate={{
            top: ["0%", "96%", "0%"],
          }}
          transition={{
            duration: 2.8,
            ease: "easeInOut",
            repeat: Infinity,
          }}
          className="absolute left-0 right-0 h-[3px] bg-lavender z-30 shadow-[0_0_15px_#6366F1,0_0_25px_#6366F1]"
        >
          {/* Laser beam light head indicator */}
          <div className="absolute right-4 -top-1.5 w-3 h-3 rounded-full bg-white shadow-[0_0_12px_#6366F1] animate-ping" />
          <div className="absolute left-4 -top-1.5 w-3 h-3 rounded-full bg-white shadow-[0_0_12px_#6366F1]" />
          
          {/* Subtle gradient beam below the laser line */}
          <div className="w-full h-12 bg-gradient-to-b from-lavender/20 to-transparent" />
        </motion.div>

        {/* Floating AI Scanning Badge */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-deep-navy/85 dark:bg-deep-navy/95 border border-lavender/40 px-3.5 py-2 rounded-lg backdrop-blur-md shadow-lg text-white">
          <div className="flex items-center space-x-2.5">
            <Scan className="w-4 h-4 text-lavender animate-pulse" />
            <span className="text-xs font-medium tracking-wide">
              {label}
            </span>
          </div>
          <div className="flex items-center space-x-1.5 text-[11px] text-lavender font-mono">
            <span className="inline-block w-2 h-2 rounded-full bg-mint-green animate-ping" />
            <span>OCR + ELA active</span>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}
