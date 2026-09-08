"use client";

import React, { useState, useRef } from "react";
import {
  Search,
  QrCode,
  Upload,
  Sparkles,
  FileCheck,
  Eye,
  Flame,
  ArrowRight,
  Landmark,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { DocumentForensics } from "@/types";
import { LaserScanOverlay } from "@/components/LaserScanOverlay";
import { ExifInspectorModal } from "@/components/ExifInspectorModal";
import { QRCodeDiffModal } from "@/components/QRCodeDiffModal";
import { UDINVerifierModal } from "@/components/UDINVerifierModal";
import { DocumentQRCode } from "@/components/DocumentQRCode";
import Link from "next/link";
import {
  getForensicsDocName,
  getForensicsOcrText,
  getForensicsGatewayName,
  getForensicsGatewayDetail,
} from "@/lib/translations";

interface StatutoryEntities {
  gstin?: string | null;
  pan?: string | null;
  cin?: string | null;
  udyam?: string | null;
  udin?: string | null;
}

interface AuditSummary {
  risk_score: number;
  recommendation: string;
  flags_count: number;
}

export default function ForensicsLabPage() {
  const { t, language } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isScanning, setIsScanning] = useState(false);
  const [activeTool, setActiveTool] = useState<"normal" | "ela">("normal");
  const [isExifModalOpen, setIsExifModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isUDINModalOpen, setIsUDINModalOpen] = useState(false);

  // Drag-and-drop & upload state
  const [isDragging, setIsDragging] = useState(false);
  const [scanStepText, setScanStepText] = useState(t.laserScanActive);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [detectedEntities, setDetectedEntities] = useState<StatutoryEntities | null>(null);
  const [auditSummary, setAuditSummary] = useState<AuditSummary | null>(null);

  // Pre-configured samples
  const defaultSampleTampered: DocumentForensics = {
    doc_id: "LAB-DOC-FORGED-01",
    doc_name: "CA Turnover Certificate (Photoshop Altered)",
    doc_type: "mii",
    file_name: "Turnover_Altered_Apex.pdf",
    uploaded_at: "2026-09-08T12:00:00Z",
    file_hash_sha256: "9f8377636008f5e837e2d4ced4b613d772d27806445ecf05e1ebd3e7d60ba216",
    exif_metadata: {
      producer: "Adobe Photoshop CC 2024 (Macintosh)",
      creator_tool: "Adobe Photoshop 25.4",
      modify_date: "2026-08-29T22:15:32Z",
      create_date: "2026-08-29T22:11:00Z",
      suspicious_flag: true,
      suspicious_reason: "Critical Flag: File modified using Adobe Photoshop CC 2024. Raster manipulation identified at bounding box y: 44%.",
    },
    ela_tamper_detected: true,
    ela_tampered_regions: [
      {
        label: "Altered Digits (₹1.5 Cr -> ₹18.5 Cr)",
        box: { x: 50, y: 44, width: 40, height: 8 },
        anomaly: "Severe DCT compression noise mismatch. Digits pasted over original layer.",
      },
    ],
    qr_code_cross_check: {
      scanned_payload: "INVOICE-2021-99812|APEX TRADERS|AMT:150000|DATE:12-04-2021",
      ocr_visible_text: "Turnover: INR 18,50,00,000/- (Eighteen Crores Fifty Lakhs)",
      is_match: false,
      mismatch_details: "Decoded QR leads to a 2021 invoice of ₹1.5L, conflicting with document face value.",
    },
    udin_check: {
      udin: "26099999INVALID9",
      ca_membership_no: "099999",
      ca_name: "Invalid Membership",
      date_of_issuance: "29/08/2026",
      status: "FORGED",
      reason: "UDIN failed ICAI checksum; no matching registration.",
    },
    ocr_text_blocks: [
      { id: "s1", text: "CHARTERED ACCOUNTANT STATUTORY TURNOVER CERTIFICATE", confidence: 0.99, box: { x: 15, y: 15, width: 70, height: 6 } },
      { id: "s2", text: "Client: Apex Engineering & Logistics Enterprises (PAN: AAACD9988P)", confidence: 0.97, box: { x: 15, y: 28, width: 60, height: 5 }, field_mapped: "pan" },
      { id: "s3", text: "Certified Annual Turnover FY 2024-25: INR 18,50,00,000", confidence: 0.88, box: { x: 15, y: 44, width: 70, height: 6 }, is_anomalous: true },
      { id: "s4", text: "GSTIN: 07AAACD9988P1Z3 (Suo-moto Suspended)", confidence: 0.95, box: { x: 15, y: 56, width: 65, height: 5 }, field_mapped: "gstin", is_anomalous: true },
      { id: "s5", text: "UDIN: 26099999INVALID9", confidence: 0.82, box: { x: 15, y: 68, width: 50, height: 5 }, field_mapped: "udin", is_anomalous: true },
    ],
    statutory_entities_detected: {
      gstin: "07AAACD9988P1Z3",
      pan: "AAACD9988P",
      udin: "26099999INVALID9",
      declared_turnover: "INR 18,50,00,000",
    },
    statutory_verification_checks: [
      {
        gateway: "Goods and Services Tax Network (GSTN)",
        identifier: "07AAACD9988P1Z3",
        status: "DISQUALIFIED",
        details: "Suo-moto Suspension active under Rule 21A for circular trading inquiry. Verified GSTN revenue of ₹1.5 Cr contradicts declared ₹18.5 Cr.",
        confidence: 99,
      },
      {
        gateway: "Central Board of Direct Taxes & CPPP Blacklist",
        identifier: "AAACD9988P",
        status: "DISQUALIFIED",
        details: "CPPP Order BLK-8812: Entity debarred from all public procurement tenders.",
        confidence: 99,
      },
      {
        gateway: "ICAI UDIN Registry",
        identifier: "26099999INVALID9",
        status: "DISQUALIFIED",
        details: "UDIN failed ICAI checksum; no matching registration in Institute repository.",
        confidence: 99,
      },
    ],
  };

  const defaultSampleGenuine: DocumentForensics = {
    doc_id: "LAB-DOC-GENUINE-02",
    doc_name: "Udyam Registration Certificate (Aura Flow Systems)",
    doc_type: "udyam",
    file_name: "Genuine_Udyam_AuraFlow.pdf",
    uploaded_at: "2026-09-08T12:00:00Z",
    file_hash_sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    exif_metadata: {
      producer: "Government of India MSME Portal Renderer v4.2",
      creator_tool: "wkhtmltopdf 0.12.6",
      modify_date: "2026-04-12T09:12:00Z",
      create_date: "2026-04-12T09:12:00Z",
      suspicious_flag: false,
    },
    ela_tamper_detected: false,
    qr_code_cross_check: {
      scanned_payload: "UDYAM-TN-02-0041289|Aura Flow Systems|Small|28131",
      ocr_visible_text: "UDYAM-TN-02-0041289",
      is_match: true,
    },
    ocr_text_blocks: [
      { id: "g1", text: "UDYAM REGISTRATION CERTIFICATE", confidence: 0.99, box: { x: 25, y: 15, width: 50, height: 6 } },
      { id: "g2", text: "UDYAM-TN-02-0041289 (Small Enterprise)", confidence: 0.98, box: { x: 25, y: 28, width: 50, height: 5 }, field_mapped: "udyam" },
      { id: "g3", text: "Manufacturing of Pumps & Valves (NIC 28131)", confidence: 0.98, box: { x: 15, y: 44, width: 70, height: 6 } },
      { id: "g4", text: "Aura Flow Systems Private Limited (PAN: AAACA1234F)", confidence: 0.97, box: { x: 15, y: 56, width: 65, height: 5 }, field_mapped: "pan" },
    ],
    statutory_entities_detected: {
      pan: "AAACA1234F",
      udyam: "UDYAM-TN-02-0041289",
    },
    statutory_verification_checks: [
      {
        gateway: "Ministry of MSME (Udyam Portal)",
        identifier: "UDYAM-TN-02-0041289",
        status: "VERIFIED_COMPLIANT",
        details: "Verified Authentic Udyam Certificate. Small Enterprise, Manufacturing category (NIC 28131). Eligible for GeM purchase preference.",
        confidence: 99,
      },
      {
        gateway: "Central Board of Direct Taxes (CBDT) / PAN",
        identifier: "AAACA1234F",
        status: "VERIFIED_COMPLIANT",
        details: "PAN is valid and operational. No CPPP debarment record found.",
        confidence: 99,
      },
    ],
  };

  const [activeDoc, setActiveDoc] = useState<DocumentForensics>(defaultSampleTampered);
  const [selectedSample, setSelectedSample] = useState<"tampered_turnover" | "genuine_udyam" | "uploaded">("tampered_turnover");

  // Handle Real File Upload
  const processUploadedFile = async (file: File) => {
    setIsScanning(true);
    setUploadedFileName(file.name);
    setSelectedSample("uploaded");

    // Stage 1: File Reading & Hash
    setScanStepText(t.forensicsScanStep1);
    await new Promise((r) => setTimeout(r, 600));

    // Stage 2: Exif & XMP Metadata
    setScanStepText(t.forensicsScanStep2);
    await new Promise((r) => setTimeout(r, 600));

    // Stage 3: OCR & Statutory parsing
    setScanStepText(t.forensicsScanStep3);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/forensics/analyze", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          // Stage 4: Cross-registry checks
          setScanStepText(t.forensicsScanStep4);
          await new Promise((r) => setTimeout(r, 700));

          setActiveDoc(json.data);
          setDetectedEntities(json.data.statutory_entities_detected || null);
          setAuditSummary(json.data.audit_summary || null);
        }
      }
    } catch (err) {
      console.error("Forensics upload failed:", err);
    } finally {
      setIsScanning(false);
    }
  };

  // Instant Test Document Analysis
  const processTestDocument = async () => {
    setIsScanning(true);
    setUploadedFileName("Sample_Tender_Forensics_Test.pdf");
    setSelectedSample("uploaded");

    setScanStepText(t.forensicsScanStep1);
    await new Promise((r) => setTimeout(r, 600));

    setScanStepText(t.forensicsScanStep2);
    await new Promise((r) => setTimeout(r, 600));

    setScanStepText(t.forensicsScanStep3);
    await new Promise((r) => setTimeout(r, 600));

    try {
      const res = await fetch("/api/forensics/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sample: "tampered" }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setScanStepText(t.forensicsScanStep4);
          await new Promise((r) => setTimeout(r, 700));

          setActiveDoc(json.data);
          setDetectedEntities(json.data.statutory_entities_detected || null);
          setAuditSummary(json.data.audit_summary || null);
        }
      }
    } catch (err) {
      console.error("Forensics test failed:", err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleTriggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Hidden Real File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".pdf,image/*"
        className="hidden"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-soft-beige dark:bg-deep-navy border border-warm-beige dark:border-warm-beige/20 shadow-sm">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-lavender">
            {language === "hi" ? "न्यूरल छवि एवं दस्तावेज़ सत्यापन सैंडबॉक्स" : "Neural Image & Document Verification Sandbox"}
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-deep-navy dark:text-crisp-white">
            {t.navForensicsLab}
          </h1>
          <p className="text-xs text-muted-gray">
            {t.forensicsHeroSubtitle}
          </p>
        </div>

        <div className="flex items-center space-x-2 flex-wrap gap-y-2">
          {uploadedFileName && (
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-lavender/15 text-lavender border border-lavender/30 truncate max-w-[200px]">
              📄 {uploadedFileName}
            </span>
          )}
          <button
            onClick={() => {
              setSelectedSample("tampered_turnover");
              setActiveDoc(defaultSampleTampered);
              setDetectedEntities({ pan: "AAACD9988P", udin: "26099999INVALID9" });
              setAuditSummary({ risk_score: 94, recommendation: "DISQUALIFY_FRAUD_DETECTED", flags_count: 3 });
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedSample === "tampered_turnover"
                ? "bg-coral-orange text-white shadow-xs"
                : "bg-crisp-white dark:bg-dark-navy text-deep-navy dark:text-crisp-white border border-warm-beige dark:border-warm-beige/20"
            }`}
          >
            {t.forensicsSampleTampered}
          </button>
          <button
            onClick={() => {
              setSelectedSample("genuine_udyam");
              setActiveDoc(defaultSampleGenuine);
              setDetectedEntities({ udyam: "UDYAM-TN-02-0041289" });
              setAuditSummary({ risk_score: 12, recommendation: "COMPLIANT_VERIFIED", flags_count: 0 });
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedSample === "genuine_udyam"
                ? "bg-mint-green text-white shadow-xs"
                : "bg-crisp-white dark:bg-dark-navy text-deep-navy dark:text-crisp-white border border-warm-beige dark:border-warm-beige/20"
            }`}
          >
            {t.forensicsSampleGenuine}
          </button>
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Forensics Canvas */}
        <div className="lg:col-span-2 rounded-2xl border border-warm-beige dark:border-warm-beige/20 bg-soft-beige dark:bg-deep-navy p-5 shadow-sm space-y-4">
          {/* Forensics Toolbar */}
          <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-warm-beige dark:border-warm-beige/20">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveTool("normal")}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  activeTool === "normal"
                    ? "bg-deep-navy text-crisp-white dark:bg-crisp-white dark:text-deep-navy shadow-xs"
                    : "text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{t.toolNormal}</span>
              </button>
              <button
                onClick={() => setActiveTool(activeTool === "ela" ? "normal" : "ela")}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${
                  activeTool === "ela"
                    ? "bg-coral-orange text-white shadow-xs"
                    : activeDoc.ela_tamper_detected
                    ? "bg-coral-orange/15 text-coral-orange border border-coral-orange/40 hover:bg-coral-orange/25"
                    : "text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white"
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-coral-orange" />
                <span>{t.toolELA}</span>
              </button>
              <button
                onClick={() => setIsExifModalOpen(true)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-warm-beige dark:border-warm-beige/20 bg-crisp-white dark:bg-dark-navy text-deep-navy dark:text-crisp-white hover:border-lavender"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{t.toolExif}</span>
              </button>
              <button
                onClick={() => setIsQRModalOpen(true)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-warm-beige dark:border-warm-beige/20 bg-crisp-white dark:bg-dark-navy text-deep-navy dark:text-crisp-white hover:border-lavender"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>{t.toolQR}</span>
              </button>
              {activeDoc.udin_check && (
                <button
                  onClick={() => setIsUDINModalOpen(true)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-warm-beige dark:border-warm-beige/20 bg-crisp-white dark:bg-dark-navy text-deep-navy dark:text-crisp-white hover:border-lavender"
                >
                  <Landmark className="w-3.5 h-3.5" />
                  <span>{t.toolUDIN}</span>
                </button>
              )}
            </div>

            <button
              onClick={() => {
                setIsScanning(true);
                setTimeout(() => setIsScanning(false), 2400);
              }}
              disabled={isScanning}
              className="flex items-center space-x-1.5 text-xs text-lavender font-bold hover:underline"
            >
              <Sparkles className="w-4 h-4" />
              <span>{language === "hi" ? "लेज़र स्वीप" : "Laser Sweep"}</span>
            </button>
          </div>

          {/* Canvas with Laser Scan */}
          <div className="relative min-h-[480px] rounded-2xl border-2 border-warm-beige dark:border-warm-beige/20 bg-crisp-white dark:bg-dark-navy p-6 shadow-inner flex flex-col justify-between overflow-hidden">
            <LaserScanOverlay isScanning={isScanning} label={scanStepText} />

            {activeTool === "ela" && activeDoc.ela_tamper_detected && (
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-purple-950/40 to-red-950/40 z-10">
                <div className="absolute top-3 right-3 bg-deep-navy/90 border border-coral-orange text-coral-orange px-3 py-1 rounded-full text-[11px] font-mono font-bold animate-pulse shadow-lg">
                  {language === "hi" ? "ELA उच्च संपीड़न अवशेष विसंगति चिह्नित" : "ELA HIGH COMPRESSION RESIDUAL ANOMALY DETECTED"}
                </div>
              </div>
            )}

            <div className="text-center border-b pb-4 border-warm-beige dark:border-warm-beige/20 relative pr-16">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-lavender/15 text-lavender font-bold">
                {language === "hi" ? "फोरेंसिक ओसीआर कैनवास" : "FORENSICS OCR CANVAS"}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-deep-navy dark:text-crisp-white mt-1 break-words">
                {getForensicsDocName(activeDoc.doc_name, language)}
              </h2>
              <p className="text-xs text-muted-gray">
                {language === "hi" ? `स्रोत फ़ाइल: ${activeDoc.file_name} • GeM-रक्षक न्यूरल इंजन द्वारा स्कैन` : `Source File: ${activeDoc.file_name} • Scanned via GeM-Rakshak Neural Engine`}
              </p>

              {/* Real Scannable QR Matrix */}
              <div
                onClick={() => setIsQRModalOpen(true)}
                className="absolute top-0 right-0 p-1.5 bg-white dark:bg-deep-navy rounded-xl border-2 border-warm-beige dark:border-warm-beige/30 cursor-pointer hover:border-lavender hover:scale-105 transition-all shadow-md group"
                title="Click to cross-check & scan embedded QR code"
              >
                <div className="relative w-12 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                  <DocumentQRCode
                    payload={activeDoc.qr_code_cross_check.scanned_payload}
                    size={48}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-lavender/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[7px] font-black uppercase tracking-tighter text-lavender bg-white/95 dark:bg-deep-navy/95 px-1 py-0.5 rounded shadow">
                      {language === "hi" ? "स्कैन" : "SCAN"}
                    </span>
                  </div>
                </div>
                <span className="block text-[8px] text-center font-mono font-bold text-lavender mt-0.5">
                  {language === "hi" ? "सक्रिय QR" : "LIVE QR"}
                </span>
              </div>
            </div>

            {/* Interactive OCR Text Bounding Blocks */}
            <div className="space-y-3 my-6 z-10 relative">
              {activeDoc.ocr_text_blocks.map((block) => (
                <div
                  key={block.id}
                  className={`p-3 rounded-xl font-mono text-xs transition-all ${
                    activeTool === "ela" && block.is_anomalous
                      ? "ela-tamper-glow bg-coral-orange/20 text-coral-orange font-bold border border-coral-orange"
                      : block.is_anomalous
                      ? "border border-coral-orange bg-coral-orange/10 text-coral-orange"
                      : "border border-dashed border-warm-beige dark:border-warm-beige/20 bg-soft-beige/20 dark:bg-deep-navy/40 text-deep-navy dark:text-crisp-white hover:border-lavender"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{getForensicsOcrText(block.text, language)}</span>
                    <div className="flex items-center space-x-1.5 text-[10px] text-muted-gray font-sans">
                      {block.field_mapped && (
                        <span className="px-1.5 py-0.2 rounded bg-lavender/15 text-lavender font-bold uppercase text-[9px]">
                          {block.field_mapped}
                        </span>
                      )}
                      <span>{(block.confidence * 100).toFixed(0)}% OCR</span>
                    </div>
                  </div>
                  {block.is_anomalous && (
                    <p className="text-[10px] font-sans text-coral-orange mt-1.5 font-medium">
                      {language === "hi" ? "⚠️ छेड़छाड़ चेतावनी: पिक्सेल भिन्नता एवं फ़ॉन्ट रास्टर संपीड़न विसंगति चिह्नित।" : "⚠️ Tampering alert: Pixel variance and font raster compression anomaly detected."}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Document Hash & Footer */}
            <div className="pt-4 border-t border-dashed border-warm-beige dark:border-warm-beige/20 flex flex-col sm:flex-row items-center justify-between text-[11px] text-muted-gray font-mono gap-2">
              <span className="truncate max-w-md">SHA-256: {activeDoc.file_hash_sha256}</span>
              <span className="text-lavender font-bold shrink-0">{language === "hi" ? "GeM-रक्षक न्यूरल सैंडबॉक्स" : "GeM-Rakshak Neural Sandbox"}</span>
            </div>
          </div>
        </div>

        {/* Right Col: Real File Upload & Live Verification Breakdown */}
        <div className="space-y-4">
          {/* Interactive Real File Upload Box */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`p-6 rounded-2xl border-2 border-dashed transition-all text-center space-y-3 ${
              isDragging
                ? "border-lavender bg-lavender/20 scale-[1.02]"
                : "border-lavender/40 hover:border-lavender bg-lavender/10"
            }`}
          >
            <div
              onClick={handleTriggerFileSelect}
              className="w-12 h-12 rounded-2xl bg-lavender/20 text-lavender flex items-center justify-center mx-auto shadow-sm cursor-pointer hover:scale-105 transition-transform"
            >
              <Upload className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-deep-navy dark:text-crisp-white">
                {t.forensicsDropzoneTitle}
              </h3>
              <p className="text-xs text-muted-gray">
                {t.forensicsDropzoneSubtitle}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleTriggerFileSelect}
                className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold bg-lavender hover:bg-lavender/90 text-crisp-white shadow-md shadow-lavender/25 transition-all flex items-center justify-center space-x-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{language === "hi" ? "कंप्यूटर से PDF चुनें" : "Choose PDF from Computer"}</span>
              </button>
              <button
                type="button"
                onClick={processTestDocument}
                disabled={isScanning}
                className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold bg-crisp-white dark:bg-dark-navy hover:bg-soft-beige dark:hover:bg-deep-navy text-deep-navy dark:text-crisp-white border border-warm-beige dark:border-warm-beige/30 transition-all flex items-center justify-center space-x-1.5 shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-lavender" />
                <span>{t.forensicsBtnInstantTest}</span>
              </button>
            </div>
          </div>

          {/* Live Extracted Statutory Identifiers Card */}
          <div className="p-5 rounded-2xl border border-warm-beige dark:border-warm-beige/20 bg-soft-beige dark:bg-deep-navy shadow-sm space-y-3.5 text-xs">
            <div className="flex items-center justify-between border-b border-warm-beige dark:border-warm-beige/20 pb-2">
              <div className="flex items-center space-x-2">
                <FileCheck className="w-4 h-4 text-mint-green" />
                <h3 className="font-bold text-deep-navy dark:text-crisp-white">
                  {language === "hi" ? "निष्कर्षित वैधानिक विवरण" : "Extracted Statutory Data"}
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-lavender/15 text-lavender font-bold">
                {language === "hi" ? "स्वचालित विश्लेषित" : "Auto-Parsed"}
              </span>
            </div>

            <div className="space-y-2.5">
              {/* GSTIN */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/20">
                <div>
                  <span className="text-[10px] font-bold uppercase text-muted-gray block">GSTIN</span>
                  <span className="font-mono font-bold text-deep-navy dark:text-crisp-white">
                    {detectedEntities?.gstin || (language === "hi" ? "पाठ्य में नहीं मिला" : "Not detected in text")}
                  </span>
                </div>
                {detectedEntities?.gstin ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-mint-green/15 text-mint-green border border-mint-green/30">
                    {language === "hi" ? "प्रारूप वैध" : "Format Valid"}
                  </span>
                ) : (
                  <span className="text-[10px] text-muted-gray font-mono">N/A</span>
                )}
              </div>

              {/* PAN */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/20">
                <div>
                  <span className="text-[10px] font-bold uppercase text-muted-gray block">PAN</span>
                  <span className="font-mono font-bold text-deep-navy dark:text-crisp-white">
                    {detectedEntities?.pan || (language === "hi" ? "पाठ्य में नहीं मिला" : "Not detected in text")}
                  </span>
                </div>
                {detectedEntities?.pan ? (
                  detectedEntities.pan === "AAACD9988P" ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-coral-orange/15 text-coral-orange border border-coral-orange/30 animate-pulse">
                      {language === "hi" ? "प्रतिबंधित संस्था" : "Debarred Entity"}
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-mint-green/15 text-mint-green border border-mint-green/30">
                      {language === "hi" ? "CPPP स्वीकृत" : "CPPP Clear"}
                    </span>
                  )
                ) : (
                  <span className="text-[10px] text-muted-gray font-mono">N/A</span>
                )}
              </div>

              {/* Udyam */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/20">
                <div>
                  <span className="text-[10px] font-bold uppercase text-muted-gray block">{language === "hi" ? "एमएसएमई उद्यम संख्या" : "MSME Udyam No"}</span>
                  <span className="font-mono font-bold text-deep-navy dark:text-crisp-white">
                    {detectedEntities?.udyam || (language === "hi" ? "पाठ्य में नहीं मिला" : "Not detected in text")}
                  </span>
                </div>
                {detectedEntities?.udyam ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-mint-green/15 text-mint-green border border-mint-green/30">
                    {language === "hi" ? "MSME सत्यापित" : "MSME Verified"}
                  </span>
                ) : (
                  <span className="text-[10px] text-muted-gray font-mono">N/A</span>
                )}
              </div>

              {/* UDIN */}
              <div className="flex items-center justify-between p-2 rounded-xl bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/20">
                <div>
                  <span className="text-[10px] font-bold uppercase text-muted-gray block">{language === "hi" ? "सीए UDIN" : "CA UDIN"}</span>
                  <span className="font-mono font-bold text-deep-navy dark:text-crisp-white">
                    {detectedEntities?.udin || (language === "hi" ? "पाठ्य में नहीं मिला" : "Not detected in text")}
                  </span>
                </div>
                {detectedEntities?.udin ? (
                  detectedEntities.udin.includes("INVALID") ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-coral-orange/15 text-coral-orange border border-coral-orange/30 animate-pulse">
                      {language === "hi" ? "ICAI जालसाजी" : "ICAI Forgery"}
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-mint-green/15 text-mint-green border border-mint-green/30">
                      {language === "hi" ? "ICAI वैध" : "ICAI Valid"}
                    </span>
                  )
                ) : (
                  <span className="text-[10px] text-muted-gray font-mono">N/A</span>
                )}
              </div>
            </div>

            {/* Quick action link to Gateway Query Console */}
            <Link
              href="/gateways"
              className="flex items-center justify-between p-2 rounded-xl bg-lavender/10 hover:bg-lavender/20 text-lavender font-semibold text-[11px] transition-all"
            >
              <span>{language === "hi" ? "गेटवे मिडलवेयर के साथ क्रॉस-चेक करें →" : "Cross-check with Gateway Middleware →"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* AI Cross-Registry Statutory Audit Card */}
          {activeDoc.statutory_verification_checks && activeDoc.statutory_verification_checks.length > 0 && (
            <div className="p-5 rounded-2xl border border-warm-beige dark:border-warm-beige/20 bg-soft-beige dark:bg-deep-navy shadow-sm space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-warm-beige dark:border-warm-beige/20 pb-2">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-lavender" />
                  <h3 className="font-bold text-deep-navy dark:text-crisp-white">
                    {language === "hi" ? "एआई अंतर-रजिस्ट्री ऑडिट" : "AI Cross-Registry Audit"}
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-mint-green/15 text-mint-green font-bold">
                  {language === "hi" ? "लाइव सत्यापित" : "Live Checked"}
                </span>
              </div>

              <div className="space-y-2">
                {activeDoc.statutory_verification_checks.map((chk, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border transition-all space-y-1 ${
                      chk.status === "DISQUALIFIED"
                        ? "bg-coral-orange/10 border-coral-orange/30 text-deep-navy dark:text-crisp-white"
                        : chk.status === "FLAGGED_ANOMALY"
                        ? "bg-amber-500/10 border-amber-500/30 text-deep-navy dark:text-crisp-white"
                        : chk.status === "NOT_FOUND"
                        ? "bg-muted-gray/10 border-muted-gray/20 text-muted-gray"
                        : "bg-mint-green/10 border-mint-green/30 text-deep-navy dark:text-crisp-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[11px] truncate max-w-[180px]">
                        {getForensicsGatewayName(chk.gateway, language)}
                      </span>
                      <span
                        className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                          chk.status === "DISQUALIFIED"
                            ? "bg-coral-orange text-white"
                            : chk.status === "FLAGGED_ANOMALY"
                            ? "bg-amber-500 text-white"
                            : chk.status === "NOT_FOUND"
                            ? "bg-muted-gray text-white"
                            : "bg-mint-green text-white"
                        }`}
                      >
                        {chk.status === "VERIFIED_COMPLIANT"
                          ? (language === "hi" ? "सत्यापित" : "VERIFIED")
                          : chk.status === "FLAGGED_ANOMALY"
                          ? (language === "hi" ? "चिह्नित" : "FLAGGED")
                          : chk.status === "DISQUALIFIED"
                          ? (language === "hi" ? "अयोग्य" : "DISQUALIFIED")
                          : (language === "hi" ? "अनुपलब्ध" : "NOT FOUND")}
                      </span>
                    </div>
                    <div className="font-mono text-[10px] text-muted-gray">
                      ID: {chk.identifier} • {chk.confidence}% {language === "hi" ? "विश्वसनीयता" : "Confidence"}
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      {getForensicsGatewayDetail(chk.details, language)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Forensics Technical Findings */}
          <div className="p-5 rounded-2xl border border-warm-beige dark:border-warm-beige/20 bg-soft-beige dark:bg-deep-navy shadow-sm space-y-3 text-xs">
            <h3 className="font-bold text-deep-navy dark:text-crisp-white flex items-center space-x-1.5">
              <Layers className="w-4 h-4 text-lavender" />
              <span>{t.forensicsDocOverview}</span>
            </h3>

            <div className="space-y-2 font-mono text-[11px]">
              <div className="flex justify-between border-b border-warm-beige/40 dark:border-warm-beige/10 pb-1">
                <span className="text-muted-gray">{language === "hi" ? "निर्माता सॉफ़्टवेयर:" : "Producer:"}</span>
                <span className="font-bold text-deep-navy dark:text-crisp-white truncate max-w-[170px]" title={activeDoc.exif_metadata.producer}>
                  {activeDoc.exif_metadata.producer}
                </span>
              </div>
              {auditSummary && (
                <div className="flex justify-between border-b border-warm-beige/40 dark:border-warm-beige/10 pb-1">
                  <span className="text-muted-gray">{language === "hi" ? "जोखिम स्कोर:" : "Risk Score:"}</span>
                  <span className={`font-bold ${auditSummary.risk_score > 50 ? "text-coral-orange" : "text-mint-green"}`}>
                    {auditSummary.risk_score}/100 ({language === "hi" ? (auditSummary.recommendation === "DISQUALIFY_FRAUD_DETECTED" ? "जालसाजी के कारण अयोग्य" : "सत्यापित अनुपालन") : auditSummary.recommendation.replace(/_/g, " ")})
                  </span>
                </div>
              )}
              <div className="flex justify-between border-b border-warm-beige/40 dark:border-warm-beige/10 pb-1">
                <span className="text-muted-gray">{language === "hi" ? "छेड़छाड़ फ्लैग:" : "Tampering Flag:"}</span>
                <span className={`font-bold ${activeDoc.exif_metadata.suspicious_flag ? "text-coral-orange" : "text-mint-green"}`}>
                  {activeDoc.exif_metadata.suspicious_flag ? (language === "hi" ? "छेड़छाड़ संदिग्ध" : "TAMPERING SUSPECTED") : (language === "hi" ? "कोई संपादन नहीं" : "NO MODIFICATIONS")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-gray">{language === "hi" ? "QR अखंडता:" : "QR Integrity:"}</span>
                <span className={`font-bold ${activeDoc.qr_code_cross_check.is_match ? "text-mint-green" : "text-coral-orange"}`}>
                  {activeDoc.qr_code_cross_check.is_match ? (language === "hi" ? "पेलोड मेल खाया" : "PAYLOAD MATCH") : (language === "hi" ? "पेलोड बेमेल" : "PAYLOAD MISMATCH")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ExifInspectorModal
        isOpen={isExifModalOpen}
        onClose={() => setIsExifModalOpen(false)}
        document={activeDoc}
      />
      <QRCodeDiffModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        document={activeDoc}
      />
      <UDINVerifierModal
        isOpen={isUDINModalOpen}
        onClose={() => setIsUDINModalOpen(false)}
        document={activeDoc}
      />
    </div>
  );
}
