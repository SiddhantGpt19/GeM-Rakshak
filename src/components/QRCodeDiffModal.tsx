"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  QrCode,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Download,
  Copy,
  Check,
  Sparkles,
  Smartphone,
  RefreshCw,
} from "lucide-react";
import { DocumentForensics } from "@/types";
import { DocumentQRCode } from "./DocumentQRCode";
import QRCode from "qrcode";

interface QRCodeDiffModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: DocumentForensics | null;
}

export function QRCodeDiffModal({ isOpen, onClose, document }: QRCodeDiffModalProps) {
  const [activeTab, setActiveTab] = useState<"cross_check" | "qr_generator">("cross_check");
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Custom QR Generator State
  const [customEntity, setCustomEntity] = useState("CPCL Manali Refinery - Tender Cell");
  const [customId, setCustomId] = useState("GEM/2026/B/9823410");
  const [customValue, setCustomValue] = useState("18,50,00,000");
  const [customGstin, setCustomGstin] = useState("33AAACA1234F1Z5");
  const [customPayload, setCustomPayload] = useState("");

  useEffect(() => {
    if (document) {
      setCustomGstin(document.statutory_entities_detected?.gstin || "33AAACA1234F1Z5");
      setCustomPayload(
        `GEM-VERIFIED|TENDER:${customId}|ORG:${customEntity}|GSTIN:${
          document.statutory_entities_detected?.gstin || "33AAACA1234F1Z5"
        }|HASH:${document.file_hash_sha256.slice(0, 16)}|STATUS:COMPLIANT`
      );
    }
  }, [document, customId, customEntity]);

  if (!isOpen || !document) return null;

  const { qr_code_cross_check, doc_name, file_hash_sha256 } = document;
  const isMatch = qr_code_cross_check.is_match;

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(qr_code_cross_check.scanned_payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = async (payloadToDownload: string, filename: string) => {
    try {
      setDownloading(true);
      const dataUrl = await QRCode.toDataURL(payloadToDownload, {
        width: 600,
        margin: 2,
        color: { dark: "#0C141C", light: "#FFFFFF" },
      });
      const link = window.document.createElement("a");
      link.href = dataUrl;
      link.download = `${filename}.png`;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
    } catch (err) {
      console.error("Failed to download QR code:", err);
    } finally {
      setDownloading(false);
    }
  };

  // Parse payload into structured fields for better readability
  const parsePayloadFields = (rawPayload: string) => {
    if (rawPayload.includes("|")) {
      return rawPayload.split("|").map((token) => {
        const parts = token.split(":");
        if (parts.length >= 2) {
          return { key: parts[0], value: parts.slice(1).join(":") };
        }
        return { key: "Data", value: token };
      });
    }
    return [{ key: "Raw Payload", value: rawPayload }];
  };

  const parsedFields = parsePayloadFields(qr_code_cross_check.scanned_payload);

  const handleGenerateCustomQR = () => {
    const payload = `GEM-VERIFIED|TENDER:${customId}|ORG:${customEntity}|GSTIN:${customGstin}|VAL:INR_${customValue}|HASH:${file_hash_sha256.slice(
      0,
      16
    )}|TIMESTAMP:${new Date().toISOString()}`;
    setCustomPayload(payload);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          className="w-full max-w-3xl bg-soft-beige dark:bg-deep-navy border border-warm-beige dark:border-warm-beige/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-deep-navy dark:text-crisp-white max-h-[90vh]"
        >
          {/* Header */}
          <div
            className={`p-5 border-b flex items-center justify-between ${
              !isMatch && activeTab === "cross_check"
                ? "bg-coral-orange/15 border-coral-orange/30 text-coral-orange"
                : "bg-warm-beige/40 dark:bg-dark-navy/60 border-warm-beige dark:border-warm-beige/20 text-deep-navy dark:text-crisp-white"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`p-2.5 rounded-xl ${
                  !isMatch && activeTab === "cross_check"
                    ? "bg-coral-orange/20 text-coral-orange"
                    : "bg-lavender/20 text-lavender"
                }`}
              >
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black tracking-tight">
                  {activeTab === "cross_check"
                    ? isMatch
                      ? "QR Code Cross-Check: Verified Match"
                      : "CRITICAL ALERT: QR Payload vs Document Text Mismatch"
                    : "Live GeM Statutory QR Generator & Verifier"}
                </h3>
                <p className="text-xs text-muted-gray">{doc_name}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-warm-beige dark:border-warm-beige/20 px-6 pt-3 bg-warm-beige/20 dark:bg-dark-navy/30 gap-4 text-xs font-bold">
            <button
              onClick={() => setActiveTab("cross_check")}
              className={`pb-2.5 border-b-2 transition-all flex items-center space-x-1.5 ${
                activeTab === "cross_check"
                  ? "border-lavender text-lavender"
                  : "border-transparent text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Document QR Inspection</span>
            </button>
            <button
              onClick={() => setActiveTab("qr_generator")}
              className={`pb-2.5 border-b-2 transition-all flex items-center space-x-1.5 ${
                activeTab === "qr_generator"
                  ? "border-lavender text-lavender"
                  : "border-transparent text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Live Verifiable QR Generator</span>
            </button>
          </div>

          {/* Tab 1: Document QR Inspection */}
          {activeTab === "cross_check" && (
            <div className="p-6 space-y-5 overflow-y-auto">
              {/* Status Alert Banner */}
              <div
                className={`p-4 rounded-xl border flex items-start space-x-3 ${
                  isMatch
                    ? "bg-mint-green/15 border-mint-green/30 text-mint-green"
                    : "bg-coral-orange/15 border-coral-orange/40 text-coral-orange"
                }`}
              >
                {isMatch ? (
                  <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
                ) : (
                  <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 animate-pulse" />
                )}
                <div className="text-xs space-y-1">
                  <p className="font-bold text-sm">
                    {isMatch
                      ? "Cryptographic QR Match Confirmed"
                      : "Severe Tampering Indicator: QR Code Re-used / Spoofed"}
                  </p>
                  <p className="text-deep-navy dark:text-crisp-white leading-relaxed">
                    {isMatch
                      ? "The cryptographic payload encoded in this QR barcode aligns 100% with the human-readable text declarations extracted on the certificate face."
                      : qr_code_cross_check.mismatch_details ||
                        "The barcode contains historical transaction data conflicting with the face turnover value of the certificate, indicating that an authentic QR code was copied from an unrelated document."}
                  </p>
                </div>
              </div>

              {/* Main Interactive Inspection Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                {/* Left: Scannable Real QR Matrix */}
                <div className="md:col-span-5 p-4 rounded-2xl border border-warm-beige dark:border-warm-beige/20 bg-crisp-white dark:bg-dark-navy text-center space-y-3 shadow-sm">
                  <div className="flex items-center justify-between text-xs text-muted-gray">
                    <span className="font-bold uppercase tracking-wider text-[10px]">
                      Real Scannable QR
                    </span>
                    <span className="flex items-center space-x-1 text-mint-green font-mono text-[10px]">
                      <Smartphone className="w-3 h-3" />
                      <span>Ready to Scan</span>
                    </span>
                  </div>

                  {/* QR Image */}
                  <div className="relative p-3 bg-white rounded-xl border border-warm-beige/50 inline-block shadow-inner group">
                    <DocumentQRCode
                      payload={qr_code_cross_check.scanned_payload}
                      size={180}
                      className="mx-auto"
                    />
                    <div className="absolute inset-x-0 bottom-1 text-[9px] font-mono text-center text-gray-500 bg-white/90 py-0.5 rounded">
                      Scan with any Phone Camera
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={handleCopyPayload}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-soft-beige/80 dark:bg-deep-navy border border-warm-beige dark:border-warm-beige/30 hover:border-lavender transition-all flex items-center space-x-1.5 shadow-xs"
                      title="Copy encoded payload to clipboard"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-mint-green" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied" : "Copy Data"}</span>
                    </button>
                    <button
                      onClick={() => handleDownloadQR(qr_code_cross_check.scanned_payload, "document_scanned_qr")}
                      disabled={downloading}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-soft-beige/80 dark:bg-deep-navy border border-warm-beige dark:border-warm-beige/30 hover:border-lavender transition-all flex items-center space-x-1.5 shadow-xs"
                      title="Download PNG for official audit report"
                    >
                      <Download className="w-3.5 h-3.5 text-lavender" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>

                {/* Right: Data Discrepancy Breakdown */}
                <div className="md:col-span-7 space-y-3.5">
                  {/* Decoded QR Structured Tokens */}
                  <div className="p-4 rounded-xl border border-warm-beige dark:border-warm-beige/20 bg-crisp-white dark:bg-dark-navy space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1.5 text-lavender font-bold">
                        <QrCode className="w-4 h-4" />
                        <span>Decoded Data Elements in QR</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-lavender/15 text-lavender">
                        Reed-Solomon Decoded
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs">
                      {parsedFields.map((field, i) => (
                        <div
                          key={i}
                          className="p-2 rounded-lg bg-soft-beige/40 dark:bg-deep-navy border border-warm-beige/50 dark:border-warm-beige/10 space-y-0.5"
                        >
                          <span className="text-[9px] uppercase font-bold text-muted-gray block truncate">
                            {field.key}
                          </span>
                          <span className="font-bold text-deep-navy dark:text-crisp-white block break-all text-[11px]">
                            {field.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-dashed border-warm-beige/50 dark:border-warm-beige/10">
                      <span className="text-[10px] text-muted-gray uppercase font-bold block mb-1">
                        Raw Stream:
                      </span>
                      <p className="font-mono text-[10px] p-2 rounded bg-soft-beige/30 dark:bg-deep-navy break-all text-deep-navy/80 dark:text-crisp-white/80">
                        {qr_code_cross_check.scanned_payload}
                      </p>
                    </div>
                  </div>

                  {/* Face Value Comparison */}
                  <div
                    className={`p-4 rounded-xl border space-y-2 ${
                      isMatch
                        ? "border-mint-green/30 bg-mint-green/5"
                        : "border-coral-orange/40 bg-coral-orange/10"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold flex items-center space-x-1.5">
                        <ArrowRight className="w-3.5 h-3.5" />
                        <span>Document Face Value Text</span>
                      </span>
                      <span
                        className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          isMatch ? "bg-mint-green text-white" : "bg-coral-orange text-white animate-pulse"
                        }`}
                      >
                        {isMatch ? "VERIFIED CONSISTENT" : "CONTRADICTION DETECTED"}
                      </span>
                    </div>

                    <p
                      className={`p-2.5 rounded-lg font-mono text-xs font-bold ${
                        isMatch
                          ? "bg-crisp-white dark:bg-dark-navy text-mint-green border border-mint-green/20"
                          : "bg-crisp-white dark:bg-dark-navy text-coral-orange border border-coral-orange/30"
                      }`}
                    >
                      {qr_code_cross_check.ocr_visible_text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Live Verifiable GeM QR Generator */}
          {activeTab === "qr_generator" && (
            <div className="p-6 space-y-5 overflow-y-auto">
              <div className="p-4 rounded-xl bg-lavender/10 border border-lavender/30 text-xs flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-lavender shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-deep-navy dark:text-crisp-white">
                    Tamper-Proof GeM Verification QR Matrix Generator
                  </p>
                  <p className="text-muted-gray leading-relaxed">
                    Generate an official statutory QR code embedded with the document&apos;s cryptographic SHA-256 hash, tender credentials, and GSTIN to affix onto CVC Dossiers and GeM Tender Certificates.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                {/* Form Controls */}
                <div className="md:col-span-7 space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-[11px] text-muted-gray block mb-1">
                      Procuring Organization / Cell
                    </label>
                    <input
                      type="text"
                      value={customEntity}
                      onChange={(e) => setCustomEntity(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/30 font-medium text-deep-navy dark:text-crisp-white focus:outline-none focus:border-lavender"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-bold text-[11px] text-muted-gray block mb-1">
                        Tender Reference ID
                      </label>
                      <input
                        type="text"
                        value={customId}
                        onChange={(e) => setCustomId(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/30 font-mono text-deep-navy dark:text-crisp-white focus:outline-none focus:border-lavender"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[11px] text-muted-gray block mb-1">
                        Statutory GSTIN
                      </label>
                      <input
                        type="text"
                        value={customGstin}
                        onChange={(e) => setCustomGstin(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/30 font-mono text-deep-navy dark:text-crisp-white focus:outline-none focus:border-lavender"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-[11px] text-muted-gray block mb-1">
                      Verified Tender / Turnover Value (INR)
                    </label>
                    <input
                      type="text"
                      value={customValue}
                      onChange={(e) => setCustomValue(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/30 font-mono text-deep-navy dark:text-crisp-white focus:outline-none focus:border-lavender"
                    />
                  </div>

                  <button
                    onClick={handleGenerateCustomQR}
                    className="w-full py-2 rounded-xl bg-lavender hover:bg-lavender/90 text-crisp-white font-bold transition-all shadow-md shadow-lavender/25 flex items-center justify-center space-x-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Encode Live Statutory QR</span>
                  </button>
                </div>

                {/* Generated QR Code View */}
                <div className="md:col-span-5 p-4 rounded-2xl border border-warm-beige dark:border-warm-beige/20 bg-crisp-white dark:bg-dark-navy text-center space-y-3 shadow-sm">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-lavender block">
                    Generated GeM QR Matrix
                  </span>
                  <div className="p-3 bg-white rounded-xl border border-warm-beige/50 inline-block shadow-inner">
                    <DocumentQRCode
                      payload={customPayload || qr_code_cross_check.scanned_payload}
                      size={180}
                      className="mx-auto"
                    />
                  </div>
                  <button
                    onClick={() =>
                      handleDownloadQR(
                        customPayload || qr_code_cross_check.scanned_payload,
                        `GeM_Statutory_QR_${customId.replace(/\//g, "_")}`
                      )
                    }
                    className="w-full py-2 rounded-xl text-xs font-bold bg-mint-green hover:bg-mint-green/90 text-white transition-all shadow-sm flex items-center justify-center space-x-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Stamping QR (.PNG)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="p-4 border-t border-warm-beige dark:border-warm-beige/20 bg-warm-beige/30 dark:bg-dark-navy/40 flex items-center justify-between text-xs">
            <span className="text-muted-gray font-mono text-[11px] truncate max-w-sm">
              SHA-256: {file_hash_sha256.slice(0, 24)}...
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-deep-navy text-crisp-white dark:bg-crisp-white dark:text-deep-navy hover:opacity-90 transition-all shadow-xs"
            >
              Close Inspector
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
