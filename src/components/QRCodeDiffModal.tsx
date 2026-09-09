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
import { useLanguage } from "@/context/LanguageContext";

interface QRCodeDiffModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: DocumentForensics | null;
}

export function QRCodeDiffModal({ isOpen, onClose, document }: QRCodeDiffModalProps) {
  const { language } = useLanguage();
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
        color: { dark: "#0B0F19", light: "#FFFFFF" },
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          className="w-full max-w-3xl bg-white dark:bg-deep-navy border border-slate-200/80 dark:border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden flex flex-col text-deep-navy dark:text-crisp-white max-h-[90vh]"
        >
          {/* Header */}
          <div
            className={`p-5 border-b flex items-center justify-between ${
              !isMatch && activeTab === "cross_check"
                ? "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300"
                : "bg-slate-50 dark:bg-dark-navy/60 border-slate-200/80 dark:border-white/[0.08] text-deep-navy dark:text-crisp-white"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`p-2.5 rounded-xl ${
                  !isMatch && activeTab === "cross_check"
                    ? "bg-rose-100 dark:bg-rose-900/50 text-rose-600"
                    : "bg-gov-blue-50 dark:bg-gov-blue-950/40 text-gov-blue-600 dark:text-gov-blue-400"
                }`}
              >
                <QrCode className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold tracking-tight">
                  {activeTab === "cross_check"
                    ? isMatch
                      ? (language === "hi" ? "QR कोड सत्यापन: प्रामाणिक मिलान" : "QR Code Check: Verified Authentic")
                      : (language === "hi" ? "QR कोड विसंगति: पाठ्य मेल नहीं खाता" : "QR Code Alert: Content Mismatch")
                    : (language === "hi" ? "GeM वैधानिक QR जनरेटर" : "GeM Statutory QR Generator")}
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
          <div className="flex border-b border-slate-200/80 dark:border-white/[0.08] px-6 pt-3 bg-slate-50/50 dark:bg-dark-navy/30 gap-4 text-xs font-semibold">
            <button
              onClick={() => setActiveTab("cross_check")}
              className={`pb-2.5 border-b-2 transition-all flex items-center space-x-1.5 ${
                activeTab === "cross_check"
                  ? "border-gov-blue-600 text-gov-blue-600 dark:text-gov-blue-400 font-bold"
                  : "border-transparent text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white"
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{language === "hi" ? "दस्तावेज़ QR निरीक्षण" : "Document QR Inspection"}</span>
            </button>
            <button
              onClick={() => setActiveTab("qr_generator")}
              className={`pb-2.5 border-b-2 transition-all flex items-center space-x-1.5 ${
                activeTab === "qr_generator"
                  ? "border-gov-blue-600 text-gov-blue-600 dark:text-gov-blue-400 font-bold"
                  : "border-transparent text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{language === "hi" ? "QR जनरेटर" : "QR Generator"}</span>
            </button>
          </div>

          {/* Tab 1: Document QR Inspection */}
          {activeTab === "cross_check" && (
            <div className="p-6 space-y-5 overflow-y-auto">
              {/* Status Alert Banner */}
              <div
                className={`p-4 rounded-xl border flex items-start space-x-3 ${
                  isMatch
                    ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300"
                    : "bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50 text-rose-800 dark:text-rose-300"
                }`}
              >
                {isMatch ? (
                  <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
                ) : (
                  <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-rose-600" />
                )}
                <div className="text-xs space-y-1">
                  <p className="font-bold text-sm">
                    {isMatch
                      ? (language === "hi" ? "QR कोड डेटा 100% मेल खाता है" : "QR Code Data Matches Document")
                      : (language === "hi" ? "⚠️ QR कोड विसंगति: कॉपी-पेस्ट QR कोड" : "⚠️ QR Code Mismatch: Unrelated / Re-used QR")}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {isMatch
                      ? (language === "hi" ? "QR बारकोड में एन्कोड किया गया डेटा प्रमाणपत्र पर छपे विवरण से पूरी तरह मेल खाता है।" : "The data encoded in this QR barcode aligns 100% with the text printed on the certificate.")
                      : (language === "hi" ? "बारकोड में किसी अन्य पुराने दस्तावेज़ का डेटा शामिल है, जिससे पता चलता है कि QR कोड कॉपी किया गया था।" : (qr_code_cross_check.mismatch_details || "The barcode contains transaction data conflicting with the certificate face value, indicating the QR code was copied from an unrelated document."))}
                  </p>
                </div>
              </div>

              {/* Main Interactive Inspection Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                {/* Left: Scannable Real QR Matrix */}
                <div className="md:col-span-5 p-4 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-dark-navy/60 text-center space-y-3 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-muted-gray">
                    <span className="font-bold uppercase tracking-wider text-[10px]">
                      {language === "hi" ? "स्कैन करने योग्य QR" : "Scannable QR"}
                    </span>
                    <span className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-semibold">
                      <Smartphone className="w-3 h-3" />
                      <span>{language === "hi" ? "स्कैन हेतु तैयार" : "Ready to Scan"}</span>
                    </span>
                  </div>

                  {/* QR Image */}
                  <div className="relative p-3 bg-white rounded-xl border border-slate-200 inline-block shadow-xs">
                    <DocumentQRCode
                      payload={qr_code_cross_check.scanned_payload}
                      size={180}
                      className="mx-auto"
                    />
                    <div className="text-[9px] font-mono text-center text-slate-500 mt-1">
                      {language === "hi" ? "फ़ोन कैमरे से स्कैन करें" : "Scan with phone camera"}
                    </div>
                  </div>

                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={handleCopyPayload}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-deep-navy border border-slate-200 dark:border-white/10 hover:border-gov-blue-400 transition-all flex items-center space-x-1.5 shadow-xs"
                      title="Copy encoded payload"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? (language === "hi" ? "कॉपी हो गया" : "Copied") : (language === "hi" ? "डेटा कॉपी करें" : "Copy Data")}</span>
                    </button>
                    <button
                      onClick={() => handleDownloadQR(qr_code_cross_check.scanned_payload, "document_scanned_qr")}
                      disabled={downloading}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-deep-navy border border-slate-200 dark:border-white/10 hover:border-gov-blue-400 transition-all flex items-center space-x-1.5 shadow-xs"
                      title="Download PNG"
                    >
                      <Download className="w-3.5 h-3.5 text-gov-blue-600 dark:text-gov-blue-400" />
                      <span>{language === "hi" ? "डाउनलोड" : "Download"}</span>
                    </button>
                  </div>
                </div>

                {/* Right: Data Discrepancy Breakdown */}
                <div className="md:col-span-7 space-y-3.5">
                  {/* Decoded QR Structured Tokens */}
                  <div className="p-4 rounded-xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-deep-navy space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1.5 text-gov-blue-600 dark:text-gov-blue-400 font-bold">
                        <QrCode className="w-4 h-4" />
                        <span>{language === "hi" ? "QR कोड से डिकोड किया गया डेटा" : "Decoded QR Content"}</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-dark-navy text-muted-gray">
                        Format: Payload
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs">
                      {parsedFields.map((field, i) => (
                        <div
                          key={i}
                          className="p-2 rounded-lg bg-slate-50 dark:bg-dark-navy border border-slate-200/80 dark:border-white/10 space-y-0.5"
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

                    <div className="pt-2 border-t border-slate-200 dark:border-white/10">
                      <span className="text-[10px] text-muted-gray uppercase font-bold block mb-1">
                        {language === "hi" ? "कच्चा डेटा:" : "Raw Payload:"}
                      </span>
                      <p className="font-mono text-[10px] p-2 rounded bg-slate-50 dark:bg-dark-navy break-all text-slate-700 dark:text-slate-300">
                        {qr_code_cross_check.scanned_payload}
                      </p>
                    </div>
                  </div>

                  {/* Face Value Comparison */}
                  <div
                    className={`p-4 rounded-xl border space-y-2 ${
                      isMatch
                        ? "border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20"
                        : "border-rose-200 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/20"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold flex items-center space-x-1.5">
                        <ArrowRight className="w-3.5 h-3.5" />
                        <span>{language === "hi" ? "दस्तावेज़ पर छपा पाठ (OCR)" : "Printed Document Text"}</span>
                      </span>
                      <span
                        className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          isMatch ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
                        }`}
                      >
                        {isMatch
                          ? (language === "hi" ? "सत्यापित" : "VERIFIED")
                          : (language === "hi" ? "बेमेल" : "MISMATCH")}
                      </span>
                    </div>

                    <p
                      className={`p-2.5 rounded-lg font-mono text-xs font-bold ${
                        isMatch
                          ? "bg-white dark:bg-dark-navy text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50"
                          : "bg-white dark:bg-dark-navy text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50"
                      }`}
                    >
                      {qr_code_cross_check.ocr_visible_text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: GeM QR Generator */}
          {activeTab === "qr_generator" && (
            <div className="p-6 space-y-5 overflow-y-auto">
              <div className="p-4 rounded-xl bg-gov-blue-50/60 dark:bg-gov-blue-950/20 border border-gov-blue-200 dark:border-gov-blue-900/40 text-xs flex items-start space-x-3">
                <Sparkles className="w-5 h-5 text-gov-blue-600 dark:text-gov-blue-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-deep-navy dark:text-crisp-white">
                    {language === "hi" ? "GeM सत्यापन QR मैट्रिक्स जनरेटर" : "GeM Verification QR Code Generator"}
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {language === "hi"
                      ? "निविदा विवरण और SHA-256 हैश के साथ आधिकारिक QR कोड जनरेट करें।"
                      : "Generate official QR codes encoded with tender reference, GSTIN, and cryptographic SHA-256 integrity hashes for audit stamping."}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                {/* Form Controls */}
                <div className="md:col-span-7 space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-[11px] text-muted-gray block mb-1">
                      {language === "hi" ? "खरीदार संगठन" : "Procuring Organization"}
                    </label>
                    <input
                      type="text"
                      value={customEntity}
                      onChange={(e) => setCustomEntity(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-navy border border-slate-200 dark:border-white/10 font-medium text-deep-navy dark:text-crisp-white focus:outline-none focus:border-gov-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="font-bold text-[11px] text-muted-gray block mb-1">
                        {language === "hi" ? "निविदा संदर्भ आईडी" : "Tender Ref ID"}
                      </label>
                      <input
                        type="text"
                        value={customId}
                        onChange={(e) => setCustomId(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-navy border border-slate-200 dark:border-white/10 font-mono text-deep-navy dark:text-crisp-white focus:outline-none focus:border-gov-blue-500"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[11px] text-muted-gray block mb-1">
                        GSTIN
                      </label>
                      <input
                        type="text"
                        value={customGstin}
                        onChange={(e) => setCustomGstin(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-navy border border-slate-200 dark:border-white/10 font-mono text-deep-navy dark:text-crisp-white focus:outline-none focus:border-gov-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-[11px] text-muted-gray block mb-1">
                      {language === "hi" ? "मूल्य (₹)" : "Verified Turnover Value (INR)"}
                    </label>
                    <input
                      type="text"
                      value={customValue}
                      onChange={(e) => setCustomValue(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-dark-navy border border-slate-200 dark:border-white/10 font-mono text-deep-navy dark:text-crisp-white focus:outline-none focus:border-gov-blue-500"
                    />
                  </div>

                  <button
                    onClick={handleGenerateCustomQR}
                    className="w-full py-2 rounded-xl bg-gov-blue-600 hover:bg-gov-blue-700 text-white font-bold transition-all shadow-xs flex items-center justify-center space-x-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{language === "hi" ? "QR कोड जनरेट करें" : "Generate QR Code"}</span>
                  </button>
                </div>

                {/* Generated QR Code View */}
                <div className="md:col-span-5 p-4 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-dark-navy/60 text-center space-y-3 shadow-xs">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-gov-blue-600 dark:text-gov-blue-400 block">
                    {language === "hi" ? "जनरेटेड QR कोड" : "Generated QR Code"}
                  </span>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 inline-block shadow-xs">
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
                    className="w-full py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-xs flex items-center justify-center space-x-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{language === "hi" ? "QR डाउनलोड करें (.PNG)" : "Download QR Code (.PNG)"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="p-4 border-t border-slate-200/80 dark:border-white/[0.08] bg-slate-50 dark:bg-dark-navy/40 flex items-center justify-between text-xs">
            <span className="text-muted-gray font-mono text-[11px] truncate max-w-sm">
              SHA-256: {file_hash_sha256.slice(0, 24)}...
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:opacity-90 transition-all shadow-xs"
            >
              {language === "hi" ? "बंद करें" : "Close"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
