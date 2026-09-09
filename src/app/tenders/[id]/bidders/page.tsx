"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radar,
  ArrowRight,
  Search,
  CheckCircle2,
  AlertTriangle,
  Ban,
  X,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTenderData } from "@/context/TenderDataContext";
import { AnimatedRadialGauge } from "@/components/AnimatedRadialGauge";
import { getBidderLegalName } from "@/lib/translations";

export default function BidderComparisonPage() {
  const params = useParams();
  const rawId = (params?.id as string) || "GEM-2026-B-9823410";
  const tenderId = rawId.replace(/-/g, "/");

  const { t, language } = useLanguage();
  const { bidders, getTenderById } = useTenderData();
  const tender = getTenderById(tenderId) || getTenderById("GEM/2026/B/9823410");

  const [activeFilter, setActiveFilter] = useState<"ALL" | "COMPLIANT" | "CLARIFICATION" | "HIGH_RISK">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCartelBanner, setShowCartelBanner] = useState(true);

  // Filter bidders
  const filteredBidders = bidders.filter((b) => {
    const matchesSearch =
      b.legal_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.seller_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.submitted_data.gstin.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === "ALL") return true;
    if (activeFilter === "COMPLIANT") return b.ai_evaluation.status === "COMPLIANT";
    if (activeFilter === "CLARIFICATION") return b.ai_evaluation.status === "CLARIFICATION_NEEDED";
    if (activeFilter === "HIGH_RISK") return b.ai_evaluation.status === "HIGH_RISK" || b.ai_evaluation.status === "DISQUALIFIED";

    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. Tender Parameters Banner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-deep-navy border border-slate-200/80 dark:border-white/[0.08] shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 dark:border-white/[0.08] pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gov-blue-600 dark:text-gov-blue-400">
              {language === "hi" ? "निविदा संवीक्षा कार्यक्षेत्र • सीपीसीएल मनाली रिफाइनरी" : "Tender Scrutiny Workspace • CPCL Manali Refinery"}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-deep-navy dark:text-crisp-white">
              {tender
                ? (language === "hi" ? "उच्च दबाव हाइड्रोकार्बन वाल्व की आपूर्ति" : tender.title)
                : (language === "hi" ? "उच्च दबाव हाइड्रोकार्बन वाल्व की आपूर्ति" : "Supply of High-Pressure Hydrocarbon Valves")}
            </h1>
            <p className="text-xs font-mono text-muted-gray">
              {language === "hi" ? "निविदा संदर्भ: " : "Tender Ref: "}{tender ? tender.tender_id : "GEM/2026/B/9823410"} | {language === "hi" ? "अनुमानित मूल्य: ₹4.50 करोड़" : "Est. Value: ₹4.50 Cr"}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              href="/dashboard"
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-navy text-xs font-semibold text-deep-navy dark:text-crisp-white hover:border-gov-blue-400 transition-all"
            >
              {language === "hi" ? "डैशबोर्ड पर वापस" : "Back to Dashboard"}
            </Link>
          </div>
        </div>

        {/* Mandatory Tender Criteria Parameter Strip */}
        <div className="flex items-center flex-wrap gap-2 text-xs pt-1">
          <span className="text-[11px] font-semibold text-muted-gray uppercase tracking-wider">
            {t.tenderParamsTitle}:
          </span>
          <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
            <span className="px-2.5 py-1 rounded-lg bg-slate-100/80 dark:bg-slate-800/60 text-deep-navy dark:text-crisp-white font-medium border border-slate-200/60 dark:border-slate-700/60">
              💰 {t.paramMinTurnover}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100/80 dark:bg-slate-800/60 text-deep-navy dark:text-crisp-white font-medium border border-slate-200/60 dark:border-slate-700/60">
              🇮🇳 {t.paramMIIClass}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100/80 dark:bg-slate-800/60 text-deep-navy dark:text-crisp-white font-medium border border-slate-200/60 dark:border-slate-700/60">
              🏭 {t.paramNICCode}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100/80 dark:bg-slate-800/60 text-deep-navy dark:text-crisp-white font-medium border border-slate-200/60 dark:border-slate-700/60">
              📜 {t.paramOEMAuth}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-100/80 dark:bg-slate-800/60 text-deep-navy dark:text-crisp-white font-medium border border-slate-200/60 dark:border-slate-700/60">
              👥 {t.paramEPFO}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Cartel Collusion Warning Banner (Modern Clean Alert) */}
      <AnimatePresence>
        {showCartelBanner && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-400 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 shrink-0">
                <Radar className="w-5 h-5 animate-spin" style={{ animationDuration: "5s" }} />
              </div>
              <div className="text-xs">
                <h3 className="font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 text-xs">
                  {t.cartelBannerWarning}
                </h3>
                <p className="text-slate-700 dark:text-slate-200 mt-0.5">
                  {language === "hi"
                    ? "BID-003 और BID-004 में समान निदेशक और समान इंटरनेट पता पाया गया (आपसी मिलीभगत)।"
                    : "Nexus found: BID-003 and BID-004 share the same Director and uploaded from the same office IP address."}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <Link
                href={`/tenders/${rawId}/cartel-network`}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 transition-all shadow-xs"
              >
                <span>{t.cartelBannerBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setShowCartelBanner(false)}
                className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-all"
                title="Dismiss banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Filter Tabs */}
        <div className="flex items-center space-x-1 p-1 rounded-xl bg-slate-100/80 dark:bg-dark-navy border border-slate-200 dark:border-white/10 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveFilter("ALL")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
              activeFilter === "ALL"
                ? "bg-white dark:bg-slate-800 text-deep-navy dark:text-crisp-white shadow-2xs"
                : "text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white"
            }`}
          >
            {t.filterAll} ({bidders.length})
          </button>
          <button
            onClick={() => setActiveFilter("COMPLIANT")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
              activeFilter === "COMPLIANT"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-emerald-600 hover:bg-emerald-500/10"
            }`}
          >
            🟢 {t.filterCompliant}
          </button>
          <button
            onClick={() => setActiveFilter("CLARIFICATION")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
              activeFilter === "CLARIFICATION"
                ? "bg-amber-500 text-white shadow-xs"
                : "text-amber-500 hover:bg-amber-500/10"
            }`}
          >
            🟡 {t.filterClarification}
          </button>
          <button
            onClick={() => setActiveFilter("HIGH_RISK")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
              activeFilter === "HIGH_RISK"
                ? "bg-rose-600 text-white shadow-xs"
                : "text-rose-600 hover:bg-rose-500/10"
            }`}
          >
            🔴 {t.filterHighRisk}
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-gray" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-white dark:bg-dark-navy border border-slate-200 dark:border-white/10 text-deep-navy dark:text-crisp-white focus:outline-none focus:border-gov-blue-500"
          />
        </div>
      </div>

      {/* 4. Comparative Bidder Scrutiny Table */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-deep-navy shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[760px]">
            <thead className="bg-slate-50 dark:bg-dark-navy/60 border-b border-slate-200 dark:border-white/10 text-muted-gray font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4 min-w-[200px]">{t.colBidderName}</th>
                <th className="py-3 px-4 whitespace-nowrap">{t.colSellerId}</th>
                <th className="py-3 px-4 whitespace-nowrap">{t.colBidValue}</th>
                <th className="py-3 px-4 text-center whitespace-nowrap">{t.colScoreGauge}</th>
                <th className="py-3 px-4 whitespace-nowrap">{t.colRiskBadge}</th>
                <th className="py-3 px-4 text-right whitespace-nowrap">{t.colDeepDive}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80 dark:divide-white/[0.08]">
              {filteredBidders.map((bidder) => {
                const score = bidder.ai_evaluation.compliance_score;
                const status = bidder.ai_evaluation.status;
                const isHighRisk = status === "HIGH_RISK" || status === "DISQUALIFIED";
                const isClarification = status === "CLARIFICATION_NEEDED";
                const isCompliant = status === "COMPLIANT";

                return (
                  <tr
                    key={bidder.bidder_id}
                    className="hover:bg-slate-50/70 dark:hover:bg-dark-navy/40 transition-colors"
                  >
                    {/* Bidder Name & Flags */}
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-sm text-deep-navy dark:text-crisp-white">
                            {getBidderLegalName(bidder.legal_name, language)}
                          </span>
                          {bidder.bidder_id === "BID-CPCL-001" && (
                            <span className="px-1.5 py-0.2 text-[9px] font-bold uppercase rounded bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 whitespace-nowrap">
                              {language === "hi" ? "कक्षा-I MII" : "Class-I MII"}
                            </span>
                          )}
                          {bidder.bidder_id === "BID-CPCL-003" && (
                            <span className="px-1.5 py-0.2 text-[9px] font-bold uppercase rounded bg-rose-600 text-white whitespace-nowrap">
                              {language === "hi" ? "प्रतिबंधित" : "Blacklisted"}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-[11px] text-muted-gray font-mono">
                          <span>CIN: {bidder.cin}</span>
                          <span>•</span>
                          <span>GSTIN: {bidder.submitted_data.gstin}</span>
                        </div>
                      </div>
                    </td>

                    {/* GeM Seller ID */}
                    <td className="py-4 px-4 font-mono font-semibold text-deep-navy dark:text-crisp-white whitespace-nowrap">
                      {bidder.seller_id}
                    </td>

                    {/* Bid Value */}
                    <td className="py-4 px-4 font-mono font-bold text-deep-navy dark:text-crisp-white whitespace-nowrap">
                      ₹{(bidder.bid_value_inr / 10000000).toFixed(2)} {language === "hi" ? "करोड़" : "Cr"}
                    </td>

                    {/* Compliance Score Gauge (Radial SVG Meter) */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        <AnimatedRadialGauge
                          score={score}
                          size={64}
                          strokeWidth={6}
                          showLabel={false}
                        />
                      </div>
                    </td>

                    {/* Risk Status Badge */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {isCompliant && (
                        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 whitespace-nowrap">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{t.statusCompliant}</span>
                        </span>
                      )}
                      {isClarification && (
                        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20 whitespace-nowrap">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>{t.statusClarification}</span>
                        </span>
                      )}
                      {isHighRisk && (
                        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 border border-rose-500/30 whitespace-nowrap">
                          <Ban className="w-3.5 h-3.5" />
                          <span>{status === "DISQUALIFIED" ? t.statusDebarred : t.statusHighRisk}</span>
                        </span>
                      )}
                    </td>

                    {/* Deep Dive Audit CTA Button */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <Link
                        href={`/bidders/${bidder.bidder_id}/audit`}
                        className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gov-blue-600 hover:bg-gov-blue-700 text-white shadow-xs transition-all group whitespace-nowrap"
                      >
                        <span>{t.colDeepDive}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
