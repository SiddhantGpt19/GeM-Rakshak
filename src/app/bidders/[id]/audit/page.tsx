"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  ShieldAlert,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileCheck2,
  ArrowLeft,
  Sparkles,
  Ban,
  Send,
  Download,
  Building,
  Users,
  Briefcase,
  DollarSign,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTenderData } from "@/context/TenderDataContext";
import { AnimatedRadialGauge } from "@/components/AnimatedRadialGauge";
import { DocumentViewer } from "@/components/DocumentViewer";
import { ClarificationNoticeModal } from "@/components/ClarificationNoticeModal";
import { DisqualificationModal } from "@/components/DisqualificationModal";
import { exportAuditDossier } from "@/lib/pdfDossierGenerator";

export default function BidderAuditPage() {
  const params = useParams();
  const bidderId = (params?.id as string) || "BID-CPCL-001";

  const { t, language } = useLanguage();
  const { getBidderById, getTenderById, qualifyBidder } = useTenderData();

  const bidder = getBidderById(bidderId) || getBidderById("BID-CPCL-001");
  const tender = getTenderById("GEM/2026/B/9823410");

  // Accordion open/close state
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    mca21: true,
    udyam: true,
    tax: true,
    mii: true,
    epfo: true,
  });

  // Modal states
  const [isClarificationModalOpen, setIsClarificationModalOpen] = useState(false);
  const [isDisqualifyModalOpen, setIsDisqualifyModalOpen] = useState(false);

  if (!bidder || !tender) {
    return (
      <div className="p-12 text-center text-muted-gray">
        {language === "hi" ? "बोलीदाता नहीं मिला।" : "Bidder not found."}
      </div>
    );
  }

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleQualify = () => {
    qualifyBidder(bidder.bidder_id, "Verified by CPCL Procurement Officer under GeM guidelines.");

    // Trigger celebratory confetti in Mint Green and Lavender
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.65 },
      colors: ["#10B981", "#6366F1", "#34D399", "#818cf8"],
    });
  };

  const handleExportDossier = () => {
    exportAuditDossier(bidder, tender);
  };

  const score = bidder.ai_evaluation.compliance_score;
  const isDebarred = bidder.portal_api_responses.gem_cppp_debarment_registry.is_debarred;
  const isSuspendedGST = bidder.portal_api_responses.gstn_api.status === "Suspended";
  const hasNICMismatch = bidder.portal_api_responses.udyam_api.major_activity === "Services";

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-24">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-soft-beige dark:bg-deep-navy border border-warm-beige dark:border-warm-beige/20 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs text-muted-gray">
            <Link
              href="/tenders/GEM-2026-B-9823410/bidders"
              className="flex items-center space-x-1 hover:text-lavender transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{language === "hi" ? "बोलीदाताओं की सूची पर वापस" : "Back to Bidders"}</span>
            </Link>
            <span>/</span>
            <span className="font-mono">{bidder.bidder_id}</span>
          </div>

          <div className="flex items-center space-x-3">
            <h1 className="text-xl sm:text-2xl font-black text-deep-navy dark:text-crisp-white">
              {bidder.legal_name}
            </h1>
            <span className="px-2.5 py-0.5 rounded-xl text-xs font-bold font-mono bg-crisp-white dark:bg-dark-navy text-deep-navy dark:text-crisp-white border border-warm-beige dark:border-warm-beige/20">
              {bidder.seller_id}
            </span>
          </div>
          <p className="text-xs text-muted-gray">
            {language === "hi" ? "मूल्यांकनधीन निविदा मूल्य: " : "Evaluating Bid Value: "}
            <strong>₹{(bidder.bid_value_inr / 10000000).toFixed(2)} {language === "hi" ? "करोड़" : "Cr"}</strong> | {language === "hi" ? "निविदा: " : "Tender: "} GEM/2026/B/9823410
          </p>
        </div>

        {/* Quick Badge */}
        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 ${
              bidder.ai_evaluation.status === "COMPLIANT"
                ? "bg-mint-green/15 text-mint-green border border-mint-green/30"
                : bidder.ai_evaluation.status === "DISQUALIFIED"
                ? "bg-coral-orange/15 text-coral-orange border border-coral-orange/40 animate-pulse"
                : "bg-amber-500/15 text-amber-500 border border-amber-500/30"
            }`}
          >
            {bidder.ai_evaluation.status === "COMPLIANT" ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <ShieldAlert className="w-4 h-4" />
            )}
            <span>
              {bidder.ai_evaluation.status === "COMPLIANT"
                ? t.statusCompliant
                : bidder.ai_evaluation.status === "DISQUALIFIED"
                ? t.statusHighRisk
                : t.statusClarification}
            </span>
          </span>
        </div>
      </div>

      {/* 50/50 Split-Screen Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* LEFT PANEL: Document Forensics & Smart OCR Viewer */}
        <div className="rounded-2xl border border-warm-beige dark:border-warm-beige/20 bg-soft-beige dark:bg-deep-navy p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-warm-beige dark:border-warm-beige/20">
            <div>
              <h2 className="text-base font-bold text-deep-navy dark:text-crisp-white">
                {t.docForensicsHeader}
              </h2>
              <p className="text-xs text-muted-gray">
                {t.docForensicsSub}
              </p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-lavender/15 text-lavender border border-lavender/30">
              {language === "hi" ? "फोरेंसिक इंजन संस्करण 4.8" : "Forensics Engine v4.8"}
            </span>
          </div>

          {/* Interactive Document Viewer Canvas */}
          <DocumentViewer bidder={bidder} />
        </div>

        {/* RIGHT PANEL: Verification & Cross-Portal Reconciliation Engine */}
        <div className="space-y-4">
          {/* Top Score Dial & AI Summary Card */}
          <div className="p-5 rounded-2xl border border-warm-beige dark:border-warm-beige/20 bg-soft-beige dark:bg-deep-navy shadow-sm flex flex-col sm:flex-row items-center gap-6">
            {/* Animated Radial Gauge */}
            <div className="shrink-0 flex flex-col items-center">
              <AnimatedRadialGauge
                score={score}
                size={120}
                strokeWidth={10}
                labelText={t.colScoreGauge}
              />
            </div>

            {/* AI Summary Card */}
            <div className="flex-1 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs uppercase tracking-wider text-muted-gray flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-lavender" />
                  <span>{language === "hi" ? "एआई समग्र निष्कर्ष" : "AI Comprehensive Finding"}</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-crisp-white dark:bg-dark-navy text-deep-navy dark:text-crisp-white border border-warm-beige dark:border-warm-beige/20">
                  {language === "hi" ? "सिफारिश: " : "Recommendation: "}{bidder.ai_evaluation.ai_recommendation}
                </span>
              </div>
              <p className="text-deep-navy dark:text-crisp-white leading-relaxed bg-crisp-white dark:bg-dark-navy p-3.5 rounded-xl border border-warm-beige dark:border-warm-beige/20">
                {bidder.ai_evaluation.procurement_officer_summary}
              </p>
            </div>
          </div>

          {/* 5 Interactive Accordions */}
          <div className="space-y-3">
            {/* Accordion 1: MCA21 & Legal Entity Identity */}
            <div className="rounded-2xl border border-warm-beige dark:border-warm-beige/20 bg-soft-beige dark:bg-deep-navy overflow-hidden shadow-xs">
              <button
                onClick={() => toggleAccordion("mca21")}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-warm-beige/30 dark:hover:bg-dark-navy/40 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Building className="w-4 h-4 text-lavender" />
                  <span className="text-xs font-bold text-deep-navy dark:text-crisp-white">
                    {t.accMCA21}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {isDebarred ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-coral-orange text-white animate-pulse">
                      {language === "hi" ? "IOCL द्वारा प्रतिबंधित" : "Debarred by IOCL"}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-mint-green/15 text-mint-green">
                      {language === "hi" ? "MCA21 सक्रिय" : "MCA21 Active"}
                    </span>
                  )}
                  {openAccordions.mca21 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              <AnimatePresence>
                {openAccordions.mca21 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-4 border-t border-warm-beige dark:border-warm-beige/20 bg-crisp-white dark:bg-dark-navy text-xs space-y-2"
                  >
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-muted-gray block">{language === "hi" ? "कंपनी स्थिति:" : "Company Status:"}</span>
                        <strong className="text-deep-navy dark:text-crisp-white">{bidder.portal_api_responses.mca21_api.company_status}</strong>
                      </div>
                      <div>
                        <span className="text-muted-gray block">{language === "hi" ? "निगमन तिथि:" : "Incorporation Date:"}</span>
                        <strong className="text-deep-navy dark:text-crisp-white">{bidder.portal_api_responses.mca21_api.incorporation_date}</strong>
                      </div>
                      <div>
                        <span className="text-muted-gray block">{language === "hi" ? "चुकता पूंजी:" : "Paid Up Capital:"}</span>
                        <strong className="text-deep-navy dark:text-crisp-white">₹{(bidder.portal_api_responses.mca21_api.paid_up_capital_inr / 100000).toFixed(2)} {language === "hi" ? "लाख" : "Lakhs"}</strong>
                      </div>
                      <div>
                        <span className="text-muted-gray block">{language === "hi" ? "CPPP प्रतिबंध:" : "CPPP Debarment:"}</span>
                        <strong className={isDebarred ? "text-coral-orange" : "text-mint-green"}>
                          {isDebarred
                            ? (language === "hi" ? "गंभीर: अक्टूबर 2027 तक सक्रिय प्रतिबंध" : "CRITICAL: Active Debarment until Oct 2027")
                            : (language === "hi" ? "स्वच्छ (कोई प्रतिबंध नहीं)" : "CLEAN (Not Debarred)")}
                        </strong>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 2: MSME & Udyam Activity Scope */}
            <div className="rounded-2xl border border-warm-beige dark:border-warm-beige/20 bg-soft-beige dark:bg-deep-navy overflow-hidden shadow-xs">
              <button
                onClick={() => toggleAccordion("udyam")}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-warm-beige/30 dark:hover:bg-dark-navy/40 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-4 h-4 text-lavender" />
                  <span className="text-xs font-bold text-deep-navy dark:text-crisp-white">
                    {t.accMSME}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {hasNICMismatch ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-coral-orange text-white">
                      {language === "hi" ? "NIC बेमेल (सेवाएं)" : "NIC Mismatch (Services)"}
                    </span>
                  ) : bidder.portal_api_responses.udyam_api.valid ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-mint-green/15 text-mint-green">
                      {language === "hi" ? "वैध विनिर्माण दायरा" : "Valid Mfg Scope"}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-coral-orange text-white">
                      {language === "hi" ? "अमान्य उद्यम" : "Invalid Udyam"}
                    </span>
                  )}
                  {openAccordions.udyam ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              <AnimatePresence>
                {openAccordions.udyam && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-4 border-t border-warm-beige dark:border-warm-beige/20 bg-crisp-white dark:bg-dark-navy text-xs space-y-2"
                  >
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-muted-gray block">{language === "hi" ? "उद्यम संख्या:" : "Udyam Number:"}</span>
                        <strong className="font-mono text-deep-navy dark:text-crisp-white">{bidder.submitted_data.udyam_number}</strong>
                      </div>
                      <div>
                        <span className="text-muted-gray block">{language === "hi" ? "उद्यम प्रकार:" : "Enterprise Type:"}</span>
                        <strong className="text-deep-navy dark:text-crisp-white">{bidder.portal_api_responses.udyam_api.enterprise_type}</strong>
                      </div>
                      <div>
                        <span className="text-muted-gray block">{language === "hi" ? "प्रमुख गतिविधि:" : "Major Activity:"}</span>
                        <strong className={hasNICMismatch ? "text-coral-orange font-bold" : "text-deep-navy dark:text-crisp-white"}>
                          {bidder.portal_api_responses.udyam_api.major_activity}
                        </strong>
                      </div>
                      <div>
                        <span className="text-muted-gray block">{language === "hi" ? "NIC 5-अंकीय कोड:" : "NIC 5-Digit Code:"}</span>
                        <strong className="font-mono text-deep-navy dark:text-crisp-white">{bidder.portal_api_responses.udyam_api.nic_5_digit_code || "None"}</strong>
                      </div>
                    </div>
                    {hasNICMismatch && (
                      <div className="p-2.5 rounded-xl bg-coral-orange/15 border border-coral-orange/40 text-coral-orange text-[11px]">
                        {language === "hi"
                          ? "⚠️ विसंगति: बोलीदाता अनिवार्य NIC 28132 (वाल्व विनिर्माण) के बजाय NIC 74909 (व्यावसायिक सेवाएं) के तहत पंजीकृत है। MSME मूल्य प्राथमिकता छूट के लिए अपात्र!"
                          : "⚠️ Discrepancy: Bidder registered under NIC 74909 (Services) rather than mandatory NIC 28132 (Valves Manufacturing). Ineligible for MSME price preference exemption!"}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 3: Tax & Financial Solvency */}
            <div className="rounded-2xl border border-warm-beige dark:border-warm-beige/20 bg-soft-beige dark:bg-deep-navy overflow-hidden shadow-xs">
              <button
                onClick={() => toggleAccordion("tax")}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-warm-beige/30 dark:hover:bg-dark-navy/40 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-4 h-4 text-lavender" />
                  <span className="text-xs font-bold text-deep-navy dark:text-crisp-white">
                    {t.accTax}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {isSuspendedGST ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-coral-orange text-white">
                      {language === "hi" ? "GST निलंबित" : "GST Suspended"}
                    </span>
                  ) : bidder.portal_api_responses.gstn_api.return_compliance_score.includes("Defaulter") ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                      {language === "hi" ? "2 रिटर्न लंबित" : "2 Filings Pending"}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-mint-green/15 text-mint-green">
                      {language === "hi" ? "100% कर अनुपालित" : "100% Tax Compliant"}
                    </span>
                  )}
                  {openAccordions.tax ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              <AnimatePresence>
                {openAccordions.tax && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-4 border-t border-warm-beige dark:border-warm-beige/20 bg-crisp-white dark:bg-dark-navy text-xs space-y-2"
                  >
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-muted-gray block">{language === "hi" ? "GSTIN स्थिति:" : "GSTIN Status:"}</span>
                        <strong className={isSuspendedGST ? "text-coral-orange" : "text-deep-navy dark:text-crisp-white"}>
                          {bidder.portal_api_responses.gstn_api.status}
                        </strong>
                      </div>
                      <div>
                        <span className="text-muted-gray block">{language === "hi" ? "GSTR-3B नियमितता:" : "GSTR-3B Regularity:"}</span>
                        <strong className="text-deep-navy dark:text-crisp-white">{bidder.portal_api_responses.gstn_api.return_compliance_score}</strong>
                      </div>
                      <div>
                        <span className="text-muted-gray block">{language === "hi" ? "आयकर धारा 206AB गैर-दाखिलकर्ता:" : "Income Tax Sec 206AB Non-Filer:"}</span>
                        <strong className={bidder.portal_api_responses.pan_income_tax_api.sec_206ab_specified_person === "Yes" ? "text-coral-orange" : "text-mint-green"}>
                          {bidder.portal_api_responses.pan_income_tax_api.sec_206ab_specified_person}
                        </strong>
                      </div>
                      <div>
                        <span className="text-muted-gray block">{language === "hi" ? "पोर्टल दर्ज कारोबार:" : "Portal Reported Turnover:"}</span>
                        <strong className="font-mono text-deep-navy dark:text-crisp-white">₹{(bidder.portal_api_responses.gstn_api.turnover_reported_inr / 10000000).toFixed(2)} {language === "hi" ? "करोड़" : "Cr"}</strong>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 4: Make in India (MII) & CA Audit */}
            <div className="rounded-2xl border border-warm-beige dark:border-warm-beige/20 bg-soft-beige dark:bg-deep-navy overflow-hidden shadow-xs">
              <button
                onClick={() => toggleAccordion("mii")}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-warm-beige/30 dark:hover:bg-dark-navy/40 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <FileCheck2 className="w-4 h-4 text-lavender" />
                  <span className="text-xs font-bold text-deep-navy dark:text-crisp-white">
                    {t.accMII}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {bidder.submitted_data.claimed_mii_percentage >= 50 ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-mint-green/15 text-mint-green">
                      {language === "hi" ? "कक्षा-I" : "Class-I"} ({bidder.submitted_data.claimed_mii_percentage}%)
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-coral-orange text-white">
                      {language === "hi" ? "कक्षा-I में विफल" : "Fails Class-I"} ({bidder.submitted_data.claimed_mii_percentage}%)
                    </span>
                  )}
                  {openAccordions.mii ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              <AnimatePresence>
                {openAccordions.mii && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-4 border-t border-warm-beige dark:border-warm-beige/20 bg-crisp-white dark:bg-dark-navy text-xs space-y-2"
                  >
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-muted-gray block">{language === "hi" ? "स्थानीय सामग्री प्रतिशतता:" : "Local Content Percentage:"}</span>
                        <strong className="text-deep-navy dark:text-crisp-white">{bidder.submitted_data.claimed_mii_percentage}%</strong>
                      </div>
                      <div>
                        <span className="text-muted-gray block">{language === "hi" ? "प्रमाणीकरण प्रकार:" : "Certification Type:"}</span>
                        <strong className="text-deep-navy dark:text-crisp-white">{bidder.submitted_data.mii_cert_type}</strong>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 5: EPFO / ESIC Manpower */}
            <div className="rounded-2xl border border-warm-beige dark:border-warm-beige/20 bg-soft-beige dark:bg-deep-navy overflow-hidden shadow-xs">
              <button
                onClick={() => toggleAccordion("epfo")}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-warm-beige/30 dark:hover:bg-dark-navy/40 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Users className="w-4 h-4 text-lavender" />
                  <span className="text-xs font-bold text-deep-navy dark:text-crisp-white">
                    {t.accEPFO}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      bidder.portal_api_responses.epfo_esic_api.epfo_status === "Active"
                        ? "bg-mint-green/15 text-mint-green"
                        : "bg-coral-orange text-white"
                    }`}
                  >
                    {bidder.portal_api_responses.epfo_esic_api.epfo_status === "Active"
                      ? (language === "hi" ? "सक्रिय" : "Active")
                      : bidder.portal_api_responses.epfo_esic_api.epfo_status}
                  </span>
                  {openAccordions.epfo ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              <AnimatePresence>
                {openAccordions.epfo && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-4 border-t border-warm-beige dark:border-warm-beige/20 bg-crisp-white dark:bg-dark-navy text-xs space-y-2"
                  >
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-muted-gray block">{language === "hi" ? "अंतिम ECR वेतन माह:" : "Last ECR Wage Month:"}</span>
                        <strong className="text-deep-navy dark:text-crisp-white">{bidder.portal_api_responses.epfo_esic_api.last_ecr_wage_month}</strong>
                      </div>
                      <div>
                        <span className="text-muted-gray block">{language === "hi" ? "सक्रिय अंशदाता:" : "Active Subscribers:"}</span>
                        <strong className="text-deep-navy dark:text-crisp-white">{bidder.portal_api_responses.epfo_esic_api.active_subscribers} {language === "hi" ? "कर्मचारी" : "Employees"}</strong>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Officer Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-soft-beige/95 dark:bg-deep-navy/95 border-t border-warm-beige dark:border-warm-beige/20 p-3 sm:p-4 backdrop-blur-lg shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* AI Recommendation Disclaimer */}
          <div className="text-xs text-muted-gray max-w-md lg:max-w-lg text-center lg:text-left leading-relaxed">
            <span className="font-semibold text-deep-navy dark:text-crisp-white">
              {language === "hi" ? "निर्णय समर्थन वैधानिक सूचना:" : "Decision Support Notice:"}
            </span>{" "}
            {t.aiDisclaimer}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap justify-center">
            {/* Auto-Draft Clarification Notice */}
            <button
              onClick={() => setIsClarificationModalOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-lavender/15 hover:bg-lavender/25 text-lavender border border-lavender/40 transition-all shadow-xs whitespace-nowrap"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t.btnDraftClarification}</span>
            </button>

            {/* Disqualify Bidder (Coral Orange) */}
            <button
              onClick={() => setIsDisqualifyModalOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-coral-orange hover:bg-coral-orange-600 text-white shadow-md shadow-coral-orange/30 transition-all whitespace-nowrap"
            >
              <Ban className="w-3.5 h-3.5" />
              <span>{t.btnDisqualify}</span>
            </button>

            {/* Qualify Bidder (Mint Green - Triggers confetti!) */}
            <button
              onClick={handleQualify}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-mint-green hover:bg-mint-green-600 text-white shadow-md shadow-mint-green/30 transition-all whitespace-nowrap"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t.btnQualify}</span>
            </button>

            {/* Export CVC Audit Dossier (PDF/HTML with SHA-256) */}
            <button
              onClick={handleExportDossier}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-crisp-white dark:bg-dark-navy text-deep-navy dark:text-crisp-white border border-warm-beige dark:border-warm-beige/20 hover:border-lavender transition-all whitespace-nowrap"
              title="Download CVC-compliant audit dossier with SHA-256 integrity hash"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.btnExportDossier}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ClarificationNoticeModal
        isOpen={isClarificationModalOpen}
        onClose={() => setIsClarificationModalOpen(false)}
        bidder={bidder}
        tender={tender}
      />
      <DisqualificationModal
        isOpen={isDisqualifyModalOpen}
        onClose={() => setIsDisqualifyModalOpen(false)}
        bidder={bidder}
        tender={tender}
      />
    </div>
  );
}
