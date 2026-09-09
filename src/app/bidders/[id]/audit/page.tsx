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
import { getBidderLegalName } from "@/lib/translations";

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

    // Trigger celebratory confetti in Emerald and Gov Blue
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.65 },
      colors: ["#059669", "#2563EB", "#10B981", "#3B82F6"],
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-deep-navy border border-slate-200/80 dark:border-white/[0.08] shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs text-muted-gray">
            <Link
              href="/tenders/GEM-2026-B-9823410/bidders"
              className="flex items-center space-x-1 hover:text-gov-blue-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{language === "hi" ? "बोलीदाताओं की सूची पर वापस" : "Back to Bidders"}</span>
            </Link>
            <span>/</span>
            <span className="font-mono">{bidder.bidder_id}</span>
          </div>

          <div className="flex items-center space-x-3">
            <h1 className="text-xl sm:text-2xl font-black text-deep-navy dark:text-crisp-white">
              {getBidderLegalName(bidder.legal_name, language)}
            </h1>
            <span className="px-2.5 py-0.5 rounded-xl text-xs font-bold font-mono bg-slate-100 dark:bg-dark-navy text-deep-navy dark:text-crisp-white border border-slate-200 dark:border-white/10">
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
                ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                : bidder.ai_evaluation.status === "DISQUALIFIED"
                ? "bg-rose-500/10 text-rose-600 border border-rose-500/20"
                : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
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
        <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-deep-navy p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/[0.08]">
            <div>
              <h2 className="text-base font-bold text-deep-navy dark:text-crisp-white">
                {t.docForensicsHeader}
              </h2>
              <p className="text-xs text-muted-gray">
                {t.docForensicsSub}
              </p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-gov-blue-50 dark:bg-gov-blue-950/40 text-gov-blue-700 dark:text-gov-blue-300 border border-gov-blue-200 dark:border-gov-blue-800">
              {language === "hi" ? "दस्तावेज़ निरीक्षण" : "Forensic Audit Engine"}
            </span>
          </div>

          {/* Interactive Document Viewer Canvas */}
          <DocumentViewer bidder={bidder} />
        </div>

        {/* RIGHT PANEL: Verification & Cross-Portal Reconciliation Engine */}
        <div className="space-y-4">
          {/* Top Score Dial & AI Summary Card */}
          <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-deep-navy shadow-xs flex flex-col sm:flex-row items-center gap-6">
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
                  <Sparkles className="w-3.5 h-3.5 text-gov-blue-600 dark:text-gov-blue-400" />
                  <span>{language === "hi" ? "ऑडिट सारांश" : "Audit Summary"}</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 dark:bg-dark-navy text-deep-navy dark:text-crisp-white border border-slate-200 dark:border-white/10">
                  {language === "hi" ? "सिफारिश: " : "Recommendation: "}{bidder.ai_evaluation.ai_recommendation}
                </span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-dark-navy p-3.5 rounded-xl border border-slate-200 dark:border-white/10">
                {bidder.ai_evaluation.procurement_officer_summary}
              </p>
            </div>
          </div>

          {/* 5 Interactive Accordions */}
          <div className="space-y-3">
            {/* Accordion 1: MCA21 & Legal Entity Identity */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-deep-navy overflow-hidden shadow-xs">
              <button
                onClick={() => toggleAccordion("mca21")}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Building className="w-4 h-4 text-gov-blue-600 dark:text-gov-blue-400" />
                  <span className="text-xs font-bold text-deep-navy dark:text-crisp-white">
                    {t.accMCA21}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {isDebarred ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white animate-pulse">
                      {language === "hi" ? "IOCL द्वारा प्रतिबंधित" : "Debarred by IOCL"}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
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
                    className="p-4 border-t border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-dark-navy/60 text-xs space-y-2"
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
                        <strong className={isDebarred ? "text-rose-600 dark:text-rose-400 font-semibold" : "text-emerald-600 dark:text-emerald-400 font-semibold"}>
                          {isDebarred
                            ? (language === "hi" ? "प्रतिबंधित (अक्टूबर 2027 तक)" : "Debarred until Oct 2027 (IOCL)")
                            : (language === "hi" ? "स्वच्छ (कोई प्रतिबंध नहीं)" : "Clean (Not Debarred)")}
                        </strong>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 2: MSME & Udyam Activity Scope */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-deep-navy overflow-hidden shadow-xs">
              <button
                onClick={() => toggleAccordion("udyam")}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-4 h-4 text-gov-blue-600 dark:text-gov-blue-400" />
                  <span className="text-xs font-bold text-deep-navy dark:text-crisp-white">
                    {t.accMSME}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {hasNICMismatch ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white">
                      {language === "hi" ? "NIC बेमेल (सेवाएं)" : "NIC Mismatch (Services)"}
                    </span>
                  ) : bidder.portal_api_responses.udyam_api.valid ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                      {language === "hi" ? "वैध विनिर्माण दायरा" : "Valid Mfg Scope"}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white">
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
                    className="p-4 border-t border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-dark-navy/60 text-xs space-y-2"
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
                        <strong className={hasNICMismatch ? "text-rose-600 dark:text-rose-400 font-bold" : "text-deep-navy dark:text-crisp-white"}>
                          {bidder.portal_api_responses.udyam_api.major_activity}
                        </strong>
                      </div>
                      <div>
                        <span className="text-muted-gray block">{language === "hi" ? "NIC कोड:" : "NIC Code:"}</span>
                        <strong className="font-mono text-deep-navy dark:text-crisp-white">{bidder.portal_api_responses.udyam_api.nic_5_digit_code || "None"}</strong>
                      </div>
                    </div>
                    {hasNICMismatch && (
                      <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-[11px] leading-relaxed">
                        {language === "hi"
                          ? "⚠️ विसंगति: पंजीकृत गतिविधि 'सेवाएं' (NIC 74909) है, जबकि निविदा हेतु 'विनिर्माण' (NIC 28132) अनिवार्य है।"
                          : "⚠️ Mismatch: Registered as Services (NIC 74909) instead of Manufacturing (NIC 28132). Ineligible for MSME price preference."}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 3: Tax & Financial Solvency */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-deep-navy overflow-hidden shadow-xs">
              <button
                onClick={() => toggleAccordion("tax")}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-4 h-4 text-gov-blue-600 dark:text-gov-blue-400" />
                  <span className="text-xs font-bold text-deep-navy dark:text-crisp-white">
                    {t.accTax}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {isSuspendedGST ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white">
                      {language === "hi" ? "GST निलंबित" : "GST Suspended"}
                    </span>
                  ) : bidder.portal_api_responses.gstn_api.return_compliance_score.includes("Defaulter") ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                      {language === "hi" ? "2 रिटर्न लंबित" : "2 Filings Pending"}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
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
                    className="p-4 border-t border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-dark-navy/60 text-xs space-y-2"
                  >
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-muted-gray block">{language === "hi" ? "GSTIN स्थिति:" : "GSTIN Status:"}</span>
                        <strong className={isSuspendedGST ? "text-rose-600 dark:text-rose-400 font-semibold" : "text-deep-navy dark:text-crisp-white"}>
                          {bidder.portal_api_responses.gstn_api.status}
                        </strong>
                      </div>
                      <div>
                        <span className="text-muted-gray block">{language === "hi" ? "GSTR-3B स्थिति:" : "GSTR-3B Status:"}</span>
                        <strong className="text-deep-navy dark:text-crisp-white">{bidder.portal_api_responses.gstn_api.return_compliance_score}</strong>
                      </div>
                      <div>
                        <span className="text-muted-gray block">{language === "hi" ? "धारा 206AB (TDS):" : "Sec 206AB Defaulter:"}</span>
                        <strong className={bidder.portal_api_responses.pan_income_tax_api.sec_206ab_specified_person === "Yes" ? "text-rose-600 dark:text-rose-400 font-semibold" : "text-emerald-600 dark:text-emerald-400 font-semibold"}>
                          {bidder.portal_api_responses.pan_income_tax_api.sec_206ab_specified_person}
                        </strong>
                      </div>
                      <div>
                        <span className="text-muted-gray block">{language === "hi" ? "दर्ज वार्षिक कारोबार:" : "Reported Turnover:"}</span>
                        <strong className="font-mono text-deep-navy dark:text-crisp-white">₹{(bidder.portal_api_responses.gstn_api.turnover_reported_inr / 10000000).toFixed(2)} {language === "hi" ? "करोड़" : "Cr"}</strong>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 4: Make in India (MII) & CA Audit */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-deep-navy overflow-hidden shadow-xs">
              <button
                onClick={() => toggleAccordion("mii")}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <FileCheck2 className="w-4 h-4 text-gov-blue-600 dark:text-gov-blue-400" />
                  <span className="text-xs font-bold text-deep-navy dark:text-crisp-white">
                    {t.accMII}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {bidder.submitted_data.claimed_mii_percentage >= 50 ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                      {language === "hi" ? "कक्षा-I" : "Class-I"} ({bidder.submitted_data.claimed_mii_percentage}%)
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white">
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
                    className="p-4 border-t border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-dark-navy/60 text-xs space-y-2"
                  >
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-muted-gray block">{language === "hi" ? "स्थानीय सामग्री:" : "Local Content:"}</span>
                        <strong className="text-deep-navy dark:text-crisp-white">{bidder.submitted_data.claimed_mii_percentage}%</strong>
                      </div>
                      <div>
                        <span className="text-muted-gray block">{language === "hi" ? "प्रमाणीकरण प्रकार:" : "Certificate Type:"}</span>
                        <strong className="text-deep-navy dark:text-crisp-white">{bidder.submitted_data.mii_cert_type.replace(/_/g, " ")}</strong>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Accordion 5: EPFO / ESIC Manpower */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-deep-navy overflow-hidden shadow-xs">
              <button
                onClick={() => toggleAccordion("epfo")}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Users className="w-4 h-4 text-gov-blue-600 dark:text-gov-blue-400" />
                  <span className="text-xs font-bold text-deep-navy dark:text-crisp-white">
                    {t.accEPFO}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      bidder.portal_api_responses.epfo_esic_api.epfo_status === "Active"
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                        : "bg-rose-600 text-white"
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
                    className="p-4 border-t border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-dark-navy/60 text-xs space-y-2"
                  >
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-muted-gray block">{language === "hi" ? "अंतिम ECR माह:" : "Last Wage Month:"}</span>
                        <strong className="text-deep-navy dark:text-crisp-white">{bidder.portal_api_responses.epfo_esic_api.last_ecr_wage_month}</strong>
                      </div>
                      <div>
                        <span className="text-muted-gray block">{language === "hi" ? "सक्रिय कर्मचारी:" : "Active Employees:"}</span>
                        <strong className="text-deep-navy dark:text-crisp-white">{bidder.portal_api_responses.epfo_esic_api.active_subscribers}</strong>
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
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-deep-navy/95 border-t border-slate-200 dark:border-white/10 p-3 sm:p-4 backdrop-blur-lg shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* Recommendation Disclaimer */}
          <div className="text-xs text-muted-gray max-w-md lg:max-w-lg text-center lg:text-left leading-relaxed">
            <span className="font-semibold text-deep-navy dark:text-crisp-white">
              {language === "hi" ? "अधिकारी समीक्षा सूचना:" : "Reviewer Notice:"}
            </span>{" "}
            {t.aiDisclaimer}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap justify-center">
            {/* Auto-Draft Clarification Notice */}
            <button
              onClick={() => setIsClarificationModalOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-dark-navy hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-white/10 transition-all shadow-xs whitespace-nowrap"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t.btnDraftClarification}</span>
            </button>

            {/* Disqualify Bidder (Rose Crimson) */}
            <button
              onClick={() => setIsDisqualifyModalOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-all whitespace-nowrap"
            >
              <Ban className="w-3.5 h-3.5" />
              <span>{t.btnDisqualify}</span>
            </button>

            {/* Qualify Bidder (Emerald) */}
            <button
              onClick={handleQualify}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all whitespace-nowrap"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{t.btnQualify}</span>
            </button>

            {/* Export CVC Audit Dossier */}
            <button
              onClick={handleExportDossier}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gov-blue-600 hover:bg-gov-blue-700 text-white shadow-xs transition-all whitespace-nowrap"
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
