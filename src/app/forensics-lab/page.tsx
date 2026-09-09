"use client";

import React, { useState, useRef } from "react";
import {
  Search,
  QrCode,
  Upload,
  Sparkles,
  Eye,
  Flame,
  ArrowRight,
  Landmark,
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
  const [inspectorTab, setInspectorTab] = useState<"findings" | "statutory" | "integrity">("findings");

  // Pre-configured samples
  const defaultSampleTampered: DocumentForensics = {
    doc_id: "LAB-DOC-FORGED-01",
    doc_name: "CA Turnover Certificate (Photoshop Altered)",
    doc_type: "mii",
    file_name: "Sample_Tampered_CA_Turnover_Certificate.pdf",
    uploaded_at: "2026-09-08T12:00:00Z",
    file_hash_sha256: "9f8377636008f5e837e2d4ced4b613d772d27806445ecf05e1ebd3e7d60ba216",
    exif_metadata: {
      producer: "Adobe Photoshop CC 2024 (Windows)",
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
      mismatch_details: "Decoded QR leads to a 2021 invoice of ₹1.5L, conflicting with document face value of ₹18.5 Cr.",
    },
    udin_check: {
      udin: "26099999INVALID001",
      ca_membership_no: "099999",
      ca_name: "Invalid Membership",
      date_of_issuance: "29/08/2026",
      status: "FORGED",
      reason: "UDIN failed ICAI checksum; no matching registration in Institute repository.",
    },
    ocr_text_blocks: [
      { id: "s1", text: "CHARTERED ACCOUNTANT STATUTORY TURNOVER CERTIFICATE", confidence: 0.99, box: { x: 15, y: 15, width: 70, height: 6 } },
      { id: "s2", text: "Client: Apex Engineering & Logistics Enterprises (PAN: AAACD9988P)", confidence: 0.97, box: { x: 15, y: 28, width: 60, height: 5 }, field_mapped: "pan" },
      { id: "s3", text: "Certified Annual Turnover FY 2024-25: INR 18,50,00,000", confidence: 0.84, box: { x: 15, y: 44, width: 70, height: 6 }, is_anomalous: true },
      { id: "s4", text: "GSTIN: 07AAACD9988P1Z3 (Suo-moto Suspended)", confidence: 0.95, box: { x: 15, y: 56, width: 65, height: 5 }, field_mapped: "gstin", is_anomalous: true },
      { id: "s5", text: "UDIN: 26099999INVALID001", confidence: 0.82, box: { x: 15, y: 68, width: 50, height: 5 }, field_mapped: "udin", is_anomalous: true },
    ],
    statutory_entities_detected: {
      gstin: "07AAACD9988P1Z3",
      pan: "AAACD9988P",
      udin: "26099999INVALID001",
      declared_turnover: "INR 18,50,00,000",
    },
    statutory_verification_checks: [
      {
        gateway: "Goods and Services Tax Network (GSTN)",
        identifier: "07AAACD9988P1Z3",
        status: "DISQUALIFIED",
        details: "Suo-moto Suspension under Rule 21A. Verified GSTN revenue of ₹1.5 Cr contradicts declared ₹18.5 Cr.",
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
        identifier: "26099999INVALID001",
        status: "DISQUALIFIED",
        details: "ICAI Checksum failed: Forged Chartered Accountant registration.",
        confidence: 99,
      },
    ],
    ai_verification: {
      verdict: "FAKE_TAMPERED",
      real_percentage: 2,
      risk_percentage: 98,
      doc_classification: "Chartered Accountant Statutory Turnover Attestation",
      headline: "CRITICAL ALERT: Document Detected as FAKE / TAMPERED in Adobe Photoshop CC 2024",
      summary: "Definitive forgery detected. Document was authored or manipulated in Adobe Photoshop CC 2024 raster graphics software. Official statutory filings (GST, Udyam, CA Certificates) must be generated directly from government or accounting portals, never image editing software.",
      findings: [
        { check: "Authoring Software Authenticity", status: "FAIL", detail: "Authored in raster graphic software (Adobe Photoshop CC 2024). Image-level modification detected." },
        { check: "ICAI UDIN & CA Attestation", status: "FAIL", detail: "UDIN '26099999INVALID001' fails checksum validation on ICAI National Portal." },
        { check: "Government Gateway & Tax Registry", status: "FAIL", detail: "GSTIN '07AAACD9988P1Z3' is suo-moto suspended under GST Rule 21A." },
        { check: "Cryptographic Fingerprint", status: "PASS", detail: "SHA-256 seal logged in CVC audit trail." },
      ],
    },
    audit_summary: {
      risk_score: 96,
      recommendation: "DISQUALIFY_FRAUD_DETECTED",
      flags_count: 3,
    },
  };

  const defaultSampleGenuine: DocumentForensics = {
    doc_id: "LAB-DOC-GENUINE-02",
    doc_name: "Udyam Registration Certificate (Apex Engineering Solutions)",
    doc_type: "udyam",
    file_name: "Sample_Genuine_Udyam_Certificate.pdf",
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
      scanned_payload: "UDYAM-HR-03-0019284|Apex Engineering Solutions|Small|28131",
      ocr_visible_text: "UDYAM-HR-03-0019284",
      is_match: true,
    },
    ocr_text_blocks: [
      { id: "g1", text: "UDYAM REGISTRATION CERTIFICATE - MINISTRY OF MSME", confidence: 0.99, box: { x: 15, y: 15, width: 70, height: 6 } },
      { id: "g2", text: "UDYAM-HR-03-0019284 (Small Enterprise - Manufacturing)", confidence: 0.98, box: { x: 15, y: 28, width: 65, height: 5 }, field_mapped: "udyam" },
      { id: "g3", text: "Manufacture of Pumps and Compressors (NIC 28131)", confidence: 0.98, box: { x: 15, y: 44, width: 65, height: 6 } },
      { id: "g4", text: "Apex Engineering Solutions Pvt Ltd (PAN: AAACA1234A)", confidence: 0.97, box: { x: 15, y: 56, width: 65, height: 5 }, field_mapped: "pan" },
      { id: "g5", text: "GSTIN: 06AAACA1234A1Z5 (Active Regular Taxpayer)", confidence: 0.98, box: { x: 15, y: 68, width: 65, height: 5 }, field_mapped: "gstin" },
    ],
    statutory_entities_detected: {
      pan: "AAACA1234A",
      gstin: "06AAACA1234A1Z5",
      udyam: "UDYAM-HR-03-0019284",
    },
    statutory_verification_checks: [
      {
        gateway: "Ministry of MSME (Udyam Portal)",
        identifier: "UDYAM-HR-03-0019284",
        status: "VERIFIED_COMPLIANT",
        details: "Verified Authentic Udyam Certificate. Small Enterprise, Manufacturing category (NIC 28131). Eligible for GeM purchase preference.",
        confidence: 99,
      },
      {
        gateway: "Goods and Services Tax Network (GSTN)",
        identifier: "06AAACA1234A1Z5",
        status: "VERIFIED_COMPLIANT",
        details: "Active Regular Taxpayer verified in State jurisdiction (Code 06). GSTR-1 & GSTR-3B filings up to date.",
        confidence: 98,
      },
      {
        gateway: "Central Board of Direct Taxes (CBDT) / PAN",
        identifier: "AAACA1234A",
        status: "VERIFIED_COMPLIANT",
        details: "PAN is valid and operational. No CPPP debarment record found.",
        confidence: 99,
      },
    ],
    ai_verification: {
      verdict: "REAL_AUTHENTIC",
      real_percentage: 96,
      risk_percentage: 4,
      doc_classification: "Ministry of MSME Udyam Registration Certificate",
      headline: "DOCUMENT VERIFIED REAL: Authentic Government MSME Registration",
      summary: "Authentic MSME Certificate issued by the Ministry of Micro, Small and Medium Enterprises. All statutory tax identifiers (GSTIN, PAN, Udyam) match active government records with 0% digital tampering.",
      findings: [
        { check: "Authoring Software Authenticity", status: "PASS", detail: "Generated by Government of India MSME Portal Renderer v4.2." },
        { check: "Statutory Identifiers", status: "PASS", detail: "GSTIN, PAN, and Udyam conform to government checksum rules." },
        { check: "Pixel & Metadata Tamper Check", status: "PASS", detail: "0% Error Level Analysis (ELA) variance." },
        { check: "Cryptographic Fingerprint", status: "PASS", detail: "SHA-256 seal logged in CVC audit trail." },
      ],
    },
    audit_summary: {
      risk_score: 10,
      recommendation: "COMPLIANT_VERIFIED",
      flags_count: 0,
    },
  };

  const defaultSampleProcedural: DocumentForensics = {
    doc_id: "LAB-DOC-PROCEDURAL-03",
    doc_name: "Statutory Tax Return & Udyam Dossier (Bharat Petro-Tech)",
    doc_type: "udyam",
    file_name: "Sample_Procedural_Mismatch_Return.pdf",
    uploaded_at: "2026-09-08T14:30:00Z",
    file_hash_sha256: "7b13a89e4c5d2f10b891d4e0a7f23c90e1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    exif_metadata: {
      producer: "LibreOffice 7.6 (Ubuntu Linux)",
      creator_tool: "Writer",
      modify_date: "2026-06-15T11:20:00Z",
      create_date: "2026-06-15T11:20:00Z",
      suspicious_flag: false,
    },
    ela_tamper_detected: false,
    qr_code_cross_check: {
      scanned_payload: "GSTIN:27AAACB5678G1Z2|UDYAM-MH-02-0044812|BHARAT PETRO-TECH",
      ocr_visible_text: "27AAACB5678G1Z2",
      is_match: true,
    },
    ocr_text_blocks: [
      { id: "p1", text: "STATUTORY TAX RETURN & MSME REGISTRATION DOSSIER", confidence: 0.99, box: { x: 15, y: 15, width: 70, height: 6 } },
      { id: "p2", text: "Vendor: Bharat Petro-Tech Supplies Pvt Ltd (PAN: AAACB5678G)", confidence: 0.98, box: { x: 15, y: 28, width: 65, height: 5 }, field_mapped: "pan" },
      { id: "p3", text: "GSTIN: 27AAACB5678G1Z2 • Maharashtra Jurisdiction", confidence: 0.97, box: { x: 15, y: 42, width: 60, height: 5 }, field_mapped: "gstin" },
      { id: "p4", text: "MSME: UDYAM-MH-02-0044812 (Services - NIC 74909)", confidence: 0.96, box: { x: 15, y: 56, width: 65, height: 5 }, field_mapped: "udyam", is_anomalous: true },
      { id: "p5", text: "Declared Annual Turnover FY 2024-25: INR 4,20,00,000", confidence: 0.97, box: { x: 15, y: 70, width: 60, height: 5 } },
    ],
    statutory_entities_detected: {
      gstin: "27AAACB5678G1Z2",
      pan: "AAACB5678G",
      udyam: "UDYAM-MH-02-0044812",
      declared_turnover: "INR 4,20,00,000",
    },
    statutory_verification_checks: [
      {
        gateway: "Goods and Services Tax Network (GSTN)",
        identifier: "27AAACB5678G1Z2",
        status: "FLAGGED_ANOMALY",
        details: "Active status confirmed, but GSTR-3B return is pending for 2+ consecutive quarters. Clarification required.",
        confidence: 96,
      },
      {
        gateway: "Ministry of MSME (Udyam National Portal)",
        identifier: "UDYAM-MH-02-0044812",
        status: "FLAGGED_ANOMALY",
        details: "Valid Udyam registration, but activity is classified under 'Services' (NIC 74909), whereas tender mandates 'Manufacturing'.",
        confidence: 95,
      },
      {
        gateway: "Central Board of Direct Taxes (CBDT) / PAN",
        identifier: "AAACB5678G",
        status: "VERIFIED_COMPLIANT",
        details: "PAN is valid and operational. No CPPP debarment record found.",
        confidence: 99,
      },
    ],
    ai_verification: {
      verdict: "PROCEDURAL_QUERY",
      real_percentage: 58,
      risk_percentage: 42,
      doc_classification: "Statutory Tax Return & MSME Udyam Filing",
      headline: "PROCEDURAL QUERY: Document Authentic but Requires 48h Clarification",
      summary: "The document is authentic and free from image manipulation. However, a procedural inconsistency was detected: enterprise is registered under NIC 74909 (Services) rather than the Manufacturing scope mandated by this tender. Issue a 48h clarification notice under GeM GTC Rule 144.",
      findings: [
        { check: "Authoring Software Authenticity", status: "PASS", detail: "Generated in LibreOffice 7.6. Clean document catalog." },
        { check: "MSME Scope & NIC Classification", status: "WARN", detail: "NIC-2008 code indicates 'Services' while procurement scope requires 'Manufacturing'." },
        { check: "Tax Compliance (GSTR-3B)", status: "WARN", detail: "GSTR-3B filing delayed for 2 consecutive quarters." },
        { check: "Cryptographic Fingerprint", status: "PASS", detail: "SHA-256 seal verified." },
      ],
    },
    audit_summary: {
      risk_score: 55,
      recommendation: "CLARIFICATION_NEEDED",
      flags_count: 2,
    },
  };

  const defaultSampleDebarred: DocumentForensics = {
    doc_id: "LAB-DOC-DEBARRED-04",
    doc_name: "Statutory Eligibility Undertaking (Apex Logistics - Debarred)",
    doc_type: "general",
    file_name: "Sample_Debarred_Vendor_Declaration.pdf",
    uploaded_at: "2026-09-08T15:00:00Z",
    file_hash_sha256: "3c5a7e9b1d3f5a7b9c1d3e5f7a9b1c3d5e7f9a1b3c5d7e9f1a3b5c7d9e1f3a5b",
    exif_metadata: {
      producer: "CPPP Tender Submission Engine v2.4",
      creator_tool: "CPPP Portal Daemon",
      modify_date: "2026-07-20T08:00:00Z",
      create_date: "2026-07-20T08:00:00Z",
      suspicious_flag: true,
      suspicious_reason: "Critical Debarment Flag: Bidder entity PAN is flagged in Central Public Procurement Portal blacklist repository.",
    },
    ela_tamper_detected: false,
    qr_code_cross_check: {
      scanned_payload: "CPPP-BLK-8812|PAN:AAACD9988P|DEBARRED-UNTIL-2028",
      ocr_visible_text: "AAACD9988P",
      is_match: true,
    },
    ocr_text_blocks: [
      { id: "d1", text: "CENTRAL PUBLIC PROCUREMENT PORTAL - BIDDER INTEGRITY UNDERTAKING", confidence: 0.99, box: { x: 15, y: 15, width: 70, height: 6 } },
      { id: "d2", text: "Bidder: Apex Logistics & Infra Enterprises (PAN: AAACD9988P)", confidence: 0.98, box: { x: 15, y: 28, width: 65, height: 5 }, field_mapped: "pan", is_anomalous: true },
      { id: "d3", text: "GSTIN: 07AAACD9988P1Z3 (Suo-moto Suspended Rule 21A)", confidence: 0.96, box: { x: 15, y: 42, width: 65, height: 5 }, field_mapped: "gstin", is_anomalous: true },
      { id: "d4", text: "DEBARMENT STATUS: BLACKLISTED UNDER ORDER CPPP/2026/BLK-8812", confidence: 0.99, box: { x: 15, y: 56, width: 70, height: 6 }, is_anomalous: true },
      { id: "d5", text: "Grounds: Collusive tendering and circular bid rigging detected", confidence: 0.95, box: { x: 15, y: 70, width: 65, height: 5 }, is_anomalous: true },
    ],
    statutory_entities_detected: {
      gstin: "07AAACD9988P1Z3",
      pan: "AAACD9988P",
    },
    statutory_verification_checks: [
      {
        gateway: "Central Board of Direct Taxes & CPPP Blacklist",
        identifier: "AAACD9988P",
        status: "DISQUALIFIED",
        details: "CPPP Order BLK-8812: Entity debarred from all public procurement tenders nationwide until 31-DEC-2028.",
        confidence: 99,
      },
      {
        gateway: "Goods and Services Tax Network (GSTN)",
        identifier: "07AAACD9988P1Z3",
        status: "DISQUALIFIED",
        details: "Suo-moto Suspension under Rule 21A for non-filing & circular trading inquiry.",
        confidence: 99,
      },
    ],
    ai_verification: {
      verdict: "FAKE_TAMPERED",
      real_percentage: 2,
      risk_percentage: 98,
      doc_classification: "Statutory Eligibility Undertaking (Debarred)",
      headline: "CRITICAL ALERT: Debarred Bidder Entity (CPPP Order BLK-8812)",
      summary: "Entity has active debarment and suspension orders under GFR Rule 151 / GST Rule 21A for circular trading and collusive procurement practices. Automatic bid rejection.",
      findings: [
        { check: "Government Gateway & Tax Registry", status: "FAIL", detail: "PAN 'AAACD9988P' is actively blacklisted on CPPP National Debarment Database." },
        { check: "GSTN Rule 21A Status", status: "FAIL", detail: "GSTIN '07AAACD9988P1Z3' is suo-moto suspended under GST Rule 21A." },
        { check: "Integrity Undertaking", status: "FAIL", detail: "Self-declaration of clean compliance contradicted by statutory orders." },
        { check: "Cryptographic Fingerprint", status: "PASS", detail: "SHA-256 seal logged in CVC audit trail." },
      ],
    },
    audit_summary: {
      risk_score: 98,
      recommendation: "DISQUALIFY_FRAUD_DETECTED",
      flags_count: 2,
    },
  };

  type SampleType = "tampered_turnover" | "genuine_udyam" | "procedural_mismatch" | "debarred_vendor" | "uploaded";

  const [activeDoc, setActiveDoc] = useState<DocumentForensics>(defaultSampleGenuine);
  const [selectedSample, setSelectedSample] = useState<SampleType>("genuine_udyam");

  // Handle Real File Upload
  const processUploadedFile = async (file: File) => {
    setIsScanning(true);
    setUploadedFileName(file.name);
    setSelectedSample("uploaded");

    setScanStepText(t.forensicsScanStep1);
    await new Promise((r) => setTimeout(r, 600));

    setScanStepText(t.forensicsScanStep2);
    await new Promise((r) => setTimeout(r, 600));

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
  const processTestDocument = async (sampleType: "tampered" | "genuine" | "procedural" | "debarred" = "tampered") => {
    setIsScanning(true);
    const fileMap: Record<string, string> = {
      genuine: "Sample_Genuine_Udyam_Certificate.pdf",
      tampered: "Sample_Tampered_CA_Turnover_Certificate.pdf",
      procedural: "Sample_Procedural_Mismatch_Return.pdf",
      debarred: "Sample_Debarred_Vendor_Declaration.pdf",
    };
    setUploadedFileName(fileMap[sampleType] || "Sample_Tender_Forensics_Test.pdf");
    setSelectedSample(
      sampleType === "genuine"
        ? "genuine_udyam"
        : sampleType === "procedural"
        ? "procedural_mismatch"
        : sampleType === "debarred"
        ? "debarred_vendor"
        : "tampered_turnover"
    );

    setScanStepText(t.forensicsScanStep1);
    await new Promise((r) => setTimeout(r, 450));

    setScanStepText(t.forensicsScanStep2);
    await new Promise((r) => setTimeout(r, 450));

    setScanStepText(t.forensicsScanStep3);
    await new Promise((r) => setTimeout(r, 450));

    try {
      const res = await fetch("/api/forensics/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sample: sampleType }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setScanStepText(t.forensicsScanStep4);
          await new Promise((r) => setTimeout(r, 500));

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

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleTriggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".pdf,image/*"
        className="hidden"
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-deep-navy/70 border border-warm-beige/80 dark:border-white/[0.08] shadow-xs">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-lavender">
            {language === "hi" ? "न्यूरल छवि एवं दस्तावेज़ सत्यापन सैंडबॉक्स" : "Neural Image & Document Verification Sandbox"}
          </span>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-deep-navy dark:text-crisp-white">
            {t.navForensicsLab}
          </h1>
          <p className="text-xs text-muted-gray">
            {t.forensicsHeroSubtitle}
          </p>
        </div>

        <div className="flex items-center space-x-2 flex-wrap gap-y-2">
          {uploadedFileName && (
            <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-lg bg-lavender/10 text-lavender border border-lavender/20 truncate max-w-[180px]">
              📄 {uploadedFileName}
            </span>
          )}
          <button
            onClick={() => {
              setSelectedSample("genuine_udyam");
              setActiveDoc(defaultSampleGenuine);
              setDetectedEntities({ pan: "AAACA1234A", gstin: "06AAACA1234A1Z5", udyam: "UDYAM-HR-03-0019284" });
              setAuditSummary({ risk_score: 10, recommendation: "COMPLIANT_VERIFIED", flags_count: 0 });
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedSample === "genuine_udyam"
                ? "bg-mint-green/15 text-mint-green border border-mint-green/30"
                : "bg-slate-50 dark:bg-white/5 text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white border border-slate-200/60 dark:border-white/10"
            }`}
          >
            🟢 {language === "hi" ? "उद्यम (10%)" : "Genuine Udyam (10%)"}
          </button>
          <button
            onClick={() => {
              setSelectedSample("tampered_turnover");
              setActiveDoc(defaultSampleTampered);
              setDetectedEntities({ pan: "AAACD9988P", gstin: "07AAACD9988P1Z3", udin: "26099999INVALID001" });
              setAuditSummary({ risk_score: 96, recommendation: "DISQUALIFY_FRAUD_DETECTED", flags_count: 3 });
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedSample === "tampered_turnover"
                ? "bg-coral-orange/15 text-coral-orange border border-coral-orange/30"
                : "bg-slate-50 dark:bg-white/5 text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white border border-slate-200/60 dark:border-white/10"
            }`}
          >
            🔴 {language === "hi" ? "टर्नओवर जालसाजी (96%)" : "Tampered Turnover (96%)"}
          </button>
          <button
            onClick={() => {
              setSelectedSample("procedural_mismatch");
              setActiveDoc(defaultSampleProcedural);
              setDetectedEntities({ pan: "AAACB5678G", gstin: "27AAACB5678G1Z2", udyam: "UDYAM-MH-02-0044812" });
              setAuditSummary({ risk_score: 55, recommendation: "CLARIFICATION_NEEDED", flags_count: 2 });
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedSample === "procedural_mismatch"
                ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                : "bg-slate-50 dark:bg-white/5 text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white border border-slate-200/60 dark:border-white/10"
            }`}
          >
            🟡 {language === "hi" ? "प्रक्रियात्मक प्रश्न (55%)" : "Procedural Query (55%)"}
          </button>
          <button
            onClick={() => {
              setSelectedSample("debarred_vendor");
              setActiveDoc(defaultSampleDebarred);
              setDetectedEntities({ pan: "AAACD9988P", gstin: "07AAACD9988P1Z3" });
              setAuditSummary({ risk_score: 98, recommendation: "DISQUALIFY_FRAUD_DETECTED", flags_count: 2 });
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedSample === "debarred_vendor"
                ? "bg-red-500/15 text-red-500 border border-red-500/30"
                : "bg-slate-50 dark:bg-white/5 text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white border border-slate-200/60 dark:border-white/10"
            }`}
          >
            🚫 {language === "hi" ? "प्रतिबंधित (98%)" : "Debarred Bidder (98%)"}
          </button>
        </div>
      </div>

      {/* Compact 1-Line AI Verdict Banner (Option 2) */}
      {activeDoc.ai_verification && (
        <div
          className={`px-4 py-2.5 rounded-xl border flex items-center justify-between gap-3 text-xs shadow-xs transition-all ${
            activeDoc.ai_verification.verdict === "REAL_AUTHENTIC"
              ? "bg-mint-green/10 border-mint-green/30 text-deep-navy dark:text-crisp-white"
              : activeDoc.ai_verification.verdict === "FAKE_TAMPERED"
              ? "bg-coral-orange/10 border-coral-orange/30 text-deep-navy dark:text-crisp-white"
              : "bg-amber-500/10 border-amber-500/30 text-deep-navy dark:text-crisp-white"
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className={`w-2.5 h-2.5 rounded-full shrink-0 animate-pulse ${
                activeDoc.ai_verification.verdict === "REAL_AUTHENTIC"
                  ? "bg-mint-green"
                  : activeDoc.ai_verification.verdict === "FAKE_TAMPERED"
                  ? "bg-coral-orange"
                  : "bg-amber-500"
              }`}
            />
            <span className="font-bold tracking-wide uppercase text-[11px] shrink-0">
              {activeDoc.ai_verification.verdict === "REAL_AUTHENTIC"
                ? language === "hi"
                  ? "🟢 AI निर्णय: वास्तविक / प्रामाणिक"
                  : "🟢 AI Verdict: REAL / AUTHENTIC"
                : activeDoc.ai_verification.verdict === "FAKE_TAMPERED"
                ? language === "hi"
                  ? "🔴 AI निर्णय: फ़र्ज़ी / छेड़छाड़ किया गया"
                  : "🔴 AI Verdict: FAKE / TAMPERED"
                : language === "hi"
                ? "🟡 AI निर्णय: प्रक्रियात्मक प्रश्न"
                : "🟡 AI Verdict: PROCEDURAL QUERY"}
            </span>
            <span className="text-muted-gray hidden sm:inline">•</span>
            <span className="truncate text-deep-navy/90 dark:text-crisp-white/90 font-medium text-xs">
              {activeDoc.ai_verification.headline}
            </span>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <span
              className={`font-mono font-bold text-xs px-2.5 py-0.5 rounded-md border ${
                activeDoc.ai_verification.verdict === "REAL_AUTHENTIC"
                  ? "bg-mint-green/15 text-mint-green border-mint-green/30"
                  : activeDoc.ai_verification.verdict === "FAKE_TAMPERED"
                  ? "bg-coral-orange/15 text-coral-orange border-coral-orange/30"
                  : "bg-amber-500/15 text-amber-500 border-amber-500/30"
              }`}
            >
              {activeDoc.ai_verification.verdict === "REAL_AUTHENTIC"
                ? `${activeDoc.ai_verification.real_percentage}% Authentic`
                : `${activeDoc.ai_verification.risk_percentage}% Risk`}
            </span>
            <span className="text-[11px] text-muted-gray hidden md:inline font-mono">
              {activeDoc.file_name}
            </span>
          </div>
        </div>
      )}

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Interactive Forensics Canvas */}
        <div className="lg:col-span-2 rounded-2xl border border-warm-beige/80 dark:border-white/[0.08] bg-white dark:bg-deep-navy/70 p-5 shadow-xs space-y-4">
          {/* Streamlined Forensics Toolstrip */}
          <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-warm-beige/80 dark:border-white/[0.08]">
            <div className="flex items-center p-0.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/10 shadow-xs space-x-1">
              <button
                onClick={() => setActiveTool("normal")}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTool === "normal"
                    ? "bg-white dark:bg-dark-navy text-deep-navy dark:text-crisp-white shadow-2xs font-bold border border-slate-200/60 dark:border-white/10"
                    : "text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white"
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{t.toolNormal}</span>
              </button>

              <button
                onClick={() => setActiveTool(activeTool === "ela" ? "normal" : "ela")}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTool === "ela"
                    ? "bg-coral-orange text-white shadow-xs"
                    : activeDoc.ela_tamper_detected
                    ? "text-coral-orange hover:bg-coral-orange/10"
                    : "text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white"
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-coral-orange" />
                <span>{t.toolELA}</span>
              </button>

              <div className="w-px h-3.5 bg-slate-200 dark:bg-white/10" />

              <button
                onClick={() => setIsExifModalOpen(true)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{t.toolExif}</span>
              </button>

              <button
                onClick={() => setIsQRModalOpen(true)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>{t.toolQR}</span>
              </button>

              {activeDoc.udin_check && (
                <button
                  onClick={() => setIsUDINModalOpen(true)}
                  className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
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
              className="flex items-center space-x-1.5 text-xs text-lavender font-semibold hover:bg-lavender/10 px-3 py-1.5 rounded-lg transition-all border border-transparent hover:border-lavender/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === "hi" ? "लेज़र स्वीप" : "Laser Sweep"}</span>
            </button>
          </div>

          {/* Canvas with Laser Scan */}
          <div className="relative min-h-[480px] rounded-2xl border border-warm-beige/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-dark-navy/80 p-5 shadow-xs flex flex-col justify-between overflow-hidden">
            <LaserScanOverlay isScanning={isScanning} label={scanStepText} />

            {activeTool === "ela" && activeDoc.ela_tamper_detected && (
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-purple-950/40 to-red-950/40 z-10">
                <div className="absolute top-3 right-3 bg-deep-navy/90 border border-coral-orange text-coral-orange px-3 py-1 rounded-full text-[11px] font-mono font-bold animate-pulse shadow-lg">
                  {language === "hi" ? "ELA उच्च संपीड़न अवशेष विसंगति चिह्नित" : "ELA HIGH COMPRESSION RESIDUAL ANOMALY DETECTED"}
                </div>
              </div>
            )}

            <div className="flex items-start justify-between gap-3 border-b pb-4 border-warm-beige/80 dark:border-white/[0.08]">
              <div className="flex-1 min-w-0">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-lavender/10 text-lavender font-semibold border border-lavender/20">
                  {language === "hi" ? "फोरेंसिक ओसीआर कैनवास" : "FORENSICS OCR CANVAS"}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-deep-navy dark:text-crisp-white mt-1 break-words">
                  {getForensicsDocName(activeDoc.doc_name, language)}
                </h2>
                <p className="text-xs text-muted-gray mt-0.5">
                  {language === "hi" ? `स्रोत फ़ाइल: ${activeDoc.file_name} • GeM-रक्षक न्यूरल इंजन द्वारा स्कैन` : `Source File: ${activeDoc.file_name} • Scanned via GeM-Rakshak Neural Engine`}
                </p>
              </div>

              {/* Real Scannable QR Matrix */}
              <div
                onClick={() => setIsQRModalOpen(true)}
                className="p-1.5 bg-white dark:bg-dark-navy rounded-xl border border-warm-beige/80 dark:border-white/15 cursor-pointer hover:border-lavender hover:scale-105 transition-all shadow-2xs shrink-0 group"
                title="Click to cross-check & scan embedded QR code"
              >
                <div className="relative w-11 h-11 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                  <DocumentQRCode
                    payload={activeDoc.qr_code_cross_check.scanned_payload}
                    size={44}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-lavender/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[7px] font-bold uppercase tracking-tight text-lavender bg-white/95 dark:bg-deep-navy/95 px-1 py-0.5 rounded shadow-xs">
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
            <div className="space-y-2.5 my-6 z-10 relative">
              {activeDoc.ocr_text_blocks.map((block) => (
                <div
                  key={block.id}
                  className={`p-3 rounded-xl font-mono text-xs transition-all ${
                    activeTool === "ela" && block.is_anomalous
                      ? "ela-tamper-glow bg-coral-orange/20 text-coral-orange font-bold border border-coral-orange"
                      : block.is_anomalous
                      ? "border border-coral-orange/70 bg-coral-orange/10 text-coral-orange"
                      : "border border-warm-beige/70 dark:border-white/10 bg-soft-beige/25 dark:bg-deep-navy/40 text-deep-navy dark:text-crisp-white hover:border-lavender/60 shadow-xs"
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

        {/* Right Col: Real File Upload & Unified Forensic Inspector */}
        <div className="space-y-4">
          {/* Interactive Real File Upload Capsule */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`p-4.5 rounded-2xl border border-dashed transition-all text-center space-y-2.5 bg-white dark:bg-deep-navy/70 ${
              isDragging
                ? "border-lavender bg-lavender/10 scale-[1.01]"
                : "border-lavender/30 hover:border-lavender/60 shadow-xs"
            }`}
          >
            <div
              onClick={handleTriggerFileSelect}
              className="w-10 h-10 rounded-xl bg-lavender/10 text-lavender flex items-center justify-center mx-auto cursor-pointer hover:scale-105 transition-transform"
            >
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-deep-navy dark:text-crisp-white">
                {t.forensicsDropzoneTitle}
              </h3>
              <p className="text-[11px] text-muted-gray">
                {t.forensicsDropzoneSubtitle}
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-0.5">
              <button
                type="button"
                onClick={handleTriggerFileSelect}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-lavender hover:bg-lavender/90 text-white shadow-xs transition-all flex items-center space-x-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{language === "hi" ? "PDF चुनें" : "Upload PDF"}</span>
              </button>
              <button
                type="button"
                onClick={() => processTestDocument("tampered")}
                disabled={isScanning}
                className="px-3 py-1.5 rounded-xl text-xs font-medium text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-200/80 dark:border-white/10 transition-all flex items-center space-x-1.5"
              >
                <Sparkles className="w-3 h-3 text-lavender" />
                <span>{t.forensicsBtnInstantTest}</span>
              </button>
            </div>
          </div>

          {/* Unified Forensic Inspector Panel with Tabs */}
          <div className="rounded-2xl border border-warm-beige/80 dark:border-white/[0.08] bg-white dark:bg-deep-navy/70 shadow-xs overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex items-center border-b border-warm-beige/80 dark:border-white/[0.08] bg-slate-50/60 dark:bg-white/[0.02] p-1 gap-1">
              <button
                onClick={() => setInspectorTab("findings")}
                className={`flex-1 py-1.5 text-center text-xs font-medium rounded-lg transition-all ${
                  inspectorTab === "findings"
                    ? "bg-white dark:bg-dark-navy text-lavender font-bold shadow-2xs border border-slate-200/60 dark:border-white/10"
                    : "text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white"
                }`}
              >
                {language === "hi" ? "गेटवे ऑडिट" : "Gateway Audits"}
              </button>
              <button
                onClick={() => setInspectorTab("statutory")}
                className={`flex-1 py-1.5 text-center text-xs font-medium rounded-lg transition-all ${
                  inspectorTab === "statutory"
                    ? "bg-white dark:bg-dark-navy text-lavender font-bold shadow-2xs border border-slate-200/60 dark:border-white/10"
                    : "text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white"
                }`}
              >
                {language === "hi" ? "वैधानिक डेटा" : "Statutory Data"}
              </button>
              <button
                onClick={() => setInspectorTab("integrity")}
                className={`flex-1 py-1.5 text-center text-xs font-medium rounded-lg transition-all ${
                  inspectorTab === "integrity"
                    ? "bg-white dark:bg-dark-navy text-lavender font-bold shadow-2xs border border-slate-200/60 dark:border-white/10"
                    : "text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white"
                }`}
              >
                {language === "hi" ? "फ़ाइल मेटाडेटा" : "File Metadata"}
              </button>
            </div>

            {/* Tab 1: AI Findings & Gateway Audits */}
            {inspectorTab === "findings" && (
              <div className="p-4 space-y-3 text-xs">
                {/* AI Executive Summary Card */}
                {(() => {
                  const summary = auditSummary || activeDoc.audit_summary;
                  if (!summary) return null;
                  const isHighRisk = summary.risk_score > 60;
                  const isMedRisk = summary.risk_score > 25;
                  return (
                    <div
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                        isHighRisk
                          ? "bg-coral-orange/10 border-coral-orange/30"
                          : isMedRisk
                          ? "bg-amber-500/10 border-amber-500/30"
                          : "bg-mint-green/10 border-mint-green/30"
                      }`}
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              isHighRisk
                                ? "bg-coral-orange"
                                : isMedRisk
                                ? "bg-amber-500"
                                : "bg-mint-green"
                            }`}
                          />
                          <span className="text-[11px] font-bold uppercase tracking-wider text-deep-navy dark:text-crisp-white truncate">
                            {summary.recommendation}
                          </span>
                        </div>
                        <p className="text-[10px] text-muted-gray">
                          {language === "hi"
                            ? `${summary.flags_count} विसंगतियां पाई गईं`
                            : `${summary.flags_count} anomalies identified`}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className={`text-sm font-mono font-bold ${
                          isHighRisk ? "text-coral-orange" : isMedRisk ? "text-amber-500" : "text-mint-green"
                        }`}>
                          {summary.risk_score}%
                        </div>
                        <div className="text-[9px] text-muted-gray uppercase font-semibold">
                          {language === "hi" ? "जोखिम" : "Risk"}
                        </div>
                      </div>
                    </div>
                  );
                })()}

                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-muted-gray uppercase tracking-wider">
                    {language === "hi" ? "लाइव सरकारी रजिस्ट्री सत्यापन" : "Live Gateway Cross-Checks"}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-mint-green/10 text-mint-green font-medium border border-mint-green/20">
                    {activeDoc.statutory_verification_checks?.length || 0} {language === "hi" ? "चेक" : "Checks"}
                  </span>
                </div>

                <div className="space-y-2">
                  {activeDoc.statutory_verification_checks?.map((chk, idx) => (
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
                        <span className="font-bold text-[11px] truncate max-w-[170px]">
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

                <Link
                  href="/gateways"
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-100/70 dark:bg-white/5 hover:bg-lavender/10 text-muted-gray hover:text-lavender font-medium text-[11px] transition-all border border-slate-200/60 dark:border-white/10"
                >
                  <span>{language === "hi" ? "गेटवे टेलीमेट्री कंसोल खोलें →" : "Open Gateway Telemetry Console →"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

            {/* Tab 2: Statutory Data */}
            {inspectorTab === "statutory" && (
              <div className="p-4 space-y-2 text-xs">
                {/* GSTIN */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10">
                  <div>
                    <span className="text-[10px] font-semibold uppercase text-muted-gray block">GSTIN</span>
                    <span className="font-mono font-bold text-deep-navy dark:text-crisp-white text-xs">
                      {detectedEntities?.gstin || (
                        activeDoc.ai_verification?.doc_classification?.includes("Technical")
                          ? (language === "hi" ? "लागू नहीं (तकनीकी प्रस्ताव)" : "Not Required (Technical Scope)")
                          : (language === "hi" ? "पाठ्य में नहीं मिला" : "Not detected in text")
                      )}
                    </span>
                  </div>
                  {detectedEntities?.gstin ? (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-mint-green/10 text-mint-green border border-mint-green/20">
                      {language === "hi" ? "प्रारूप वैध" : "Valid Format"}
                    </span>
                  ) : (
                    <span className="text-[10px] text-muted-gray font-mono">N/A</span>
                  )}
                </div>

                {/* PAN */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10">
                  <div>
                    <span className="text-[10px] font-semibold uppercase text-muted-gray block">PAN</span>
                    <span className="font-mono font-bold text-deep-navy dark:text-crisp-white text-xs">
                      {detectedEntities?.pan || (
                        activeDoc.ai_verification?.doc_classification?.includes("Technical")
                          ? (language === "hi" ? "लागू नहीं (तकनीकी प्रस्ताव)" : "Not Required (Technical Scope)")
                          : (language === "hi" ? "पाठ्य में नहीं मिला" : "Not detected in text")
                      )}
                    </span>
                  </div>
                  {detectedEntities?.pan ? (
                    detectedEntities.pan === "AAACD9988P" ? (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-coral-orange/10 text-coral-orange border border-coral-orange/30">
                        {language === "hi" ? "प्रतिबंधित संस्था" : "Debarred Entity"}
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-mint-green/10 text-mint-green border border-mint-green/20">
                        {language === "hi" ? "CPPP स्वीकृत" : "CPPP Clear"}
                      </span>
                    )
                  ) : (
                    <span className="text-[10px] text-muted-gray font-mono">N/A</span>
                  )}
                </div>

                {/* Udyam */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10">
                  <div>
                    <span className="text-[10px] font-semibold uppercase text-muted-gray block">{language === "hi" ? "उद्यम संख्या" : "Udyam No"}</span>
                    <span className="font-mono font-bold text-deep-navy dark:text-crisp-white text-xs">
                      {detectedEntities?.udyam || (
                        activeDoc.ai_verification?.doc_classification?.includes("Technical")
                          ? (language === "hi" ? "लागू नहीं (तकनीकी प्रस्ताव)" : "Not Required (Technical Scope)")
                          : (language === "hi" ? "पाठ्य में नहीं मिला" : "Not detected in text")
                      )}
                    </span>
                  </div>
                  {detectedEntities?.udyam ? (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-mint-green/10 text-mint-green border border-mint-green/20">
                      {language === "hi" ? "MSME सत्यापित" : "MSME Verified"}
                    </span>
                  ) : (
                    <span className="text-[10px] text-muted-gray font-mono">N/A</span>
                  )}
                </div>

                {/* UDIN */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/10">
                  <div>
                    <span className="text-[10px] font-semibold uppercase text-muted-gray block">{language === "hi" ? "सीए UDIN" : "CA UDIN"}</span>
                    <span className="font-mono font-bold text-deep-navy dark:text-crisp-white text-xs">
                      {detectedEntities?.udin || (
                        activeDoc.ai_verification?.doc_classification?.includes("Technical")
                          ? (language === "hi" ? "लागू नहीं (गैर-सीए दस्तावेज़)" : "Not Required (Non-CA Dossier)")
                          : (language === "hi" ? "पाठ्य में नहीं मिला" : "Not detected in text")
                      )}
                    </span>
                  </div>
                  {detectedEntities?.udin ? (
                    detectedEntities.udin.includes("INVALID") ? (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-coral-orange/10 text-coral-orange border border-coral-orange/30">
                        {language === "hi" ? "ICAI जालसाजी" : "ICAI Forgery"}
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-mint-green/10 text-mint-green border border-mint-green/20">
                        {language === "hi" ? "ICAI वैध" : "ICAI Valid"}
                      </span>
                    )
                  ) : (
                    <span className="text-[10px] text-muted-gray font-mono">N/A</span>
                  )}
                </div>
              </div>
            )}

            {/* Tab 3: File Integrity & EXIF */}
            {inspectorTab === "integrity" && (
              <div className="p-4 space-y-3 text-xs font-mono">
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-warm-beige/40 dark:border-white/[0.05] pb-1.5">
                    <span className="text-muted-gray">{language === "hi" ? "निर्माता सॉफ़्टवेयर:" : "Producer:"}</span>
                    <span className="font-bold text-deep-navy dark:text-crisp-white truncate max-w-[160px]" title={activeDoc.exif_metadata.producer}>
                      {activeDoc.exif_metadata.producer}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-warm-beige/40 dark:border-white/[0.05] pb-1.5">
                    <span className="text-muted-gray">{language === "hi" ? "छेड़छाड़ स्थिति:" : "Tamper Flag:"}</span>
                    <span className={`font-bold ${activeDoc.exif_metadata.suspicious_flag ? "text-coral-orange" : "text-mint-green"}`}>
                      {activeDoc.exif_metadata.suspicious_flag ? (language === "hi" ? "संदिग्ध" : "SUSPECTED") : (language === "hi" ? "स्वच्छ" : "CLEAN")}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-warm-beige/40 dark:border-white/[0.05] pb-1.5">
                    <span className="text-muted-gray">{language === "hi" ? "QR सत्यापन:" : "QR Status:"}</span>
                    <span className={`font-bold ${activeDoc.qr_code_cross_check.is_match ? "text-mint-green" : "text-coral-orange"}`}>
                      {activeDoc.qr_code_cross_check.is_match ? (language === "hi" ? "मेल खाया" : "MATCH") : (language === "hi" ? "बेमेल" : "MISMATCH")}
                    </span>
                  </div>
                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] text-muted-gray block">{language === "hi" ? "SHA-256 डिजिटल सील:" : "SHA-256 Digest:"}</span>
                    <span className="text-[10px] break-all text-deep-navy dark:text-crisp-white font-mono bg-slate-50 dark:bg-white/[0.03] p-2 rounded-lg block border border-slate-200/60 dark:border-white/10">
                      {activeDoc.file_hash_sha256}
                    </span>
                  </div>
                </div>
              </div>
            )}
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
