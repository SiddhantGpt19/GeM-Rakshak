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
      <div className="p-6 rounded-2xl bg-soft-beige dark:bg-deep-navy border border-warm-beige dark:border-warm-beige/20 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-warm-beige dark:border-warm-beige/20 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-lavender">
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
              className="px-3.5 py-1.5 rounded-xl border border-warm-beige dark:border-warm-beige/20 bg-crisp-white dark:bg-dark-navy text-xs font-semibold text-deep-navy dark:text-crisp-white hover:border-lavender transition-all"
            >
              {language === "hi" ? "डैशबोर्ड पर वापस" : "Back to Dashboard"}
            </Link>
          </div>
        </div>

        {/* Mandatory Tender Criteria Pills */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-deep-navy dark:text-crisp-white">
            {t.tenderParamsTitle}:
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-xl bg-crisp-white dark:bg-dark-navy text-deep-navy dark:text-crisp-white font-semibold border border-warm-beige dark:border-warm-beige/20">
              💰 {t.paramMinTurnover}
            </span>
            <span className="px-3 py-1 rounded-xl bg-crisp-white dark:bg-dark-navy text-deep-navy dark:text-crisp-white font-semibold border border-warm-beige dark:border-warm-beige/20">
              🇮🇳 {t.paramMIIClass}
            </span>
            <span className="px-3 py-1 rounded-xl bg-crisp-white dark:bg-dark-navy text-deep-navy dark:text-crisp-white font-semibold border border-warm-beige dark:border-warm-beige/20">
              🏭 {t.paramNICCode}
            </span>
            <span className="px-3 py-1 rounded-xl bg-crisp-white dark:bg-dark-navy text-deep-navy dark:text-crisp-white font-semibold border border-warm-beige dark:border-warm-beige/20">
              📜 {t.paramOEMAuth}
            </span>
            <span className="px-3 py-1 rounded-xl bg-crisp-white dark:bg-dark-navy text-deep-navy dark:text-crisp-white font-semibold border border-warm-beige dark:border-warm-beige/20">
              👥 {t.paramEPFO}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Cartel Collusion Warning Banner (Coral Orange with Pulsing Radar Icon) */}
      <AnimatePresence>
        {showCartelBanner && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 rounded-2xl bg-coral-orange/15 border-2 border-coral-orange text-coral-orange shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-pulse-coral"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-coral-orange text-white shadow-md shadow-coral-orange/40">
                <Radar className="w-5 h-5 animate-spin" style={{ animationDuration: "5s" }} />
              </div>
              <div className="text-xs">
                <h3 className="font-black uppercase tracking-wider text-coral-orange text-sm">
                  {t.cartelBannerWarning}
                </h3>
                <p className="text-deep-navy dark:text-crisp-white mt-0.5">
                  {language === "hi"
                    ? "BID-CPCL-003 और BID-CPCL-004 के बीच साझा निदेशक DIN 08492019 और सबनेट आईपी 192.168.44.0/24 का सिंडिकेट पकड़ा गया।"
                    : "Nexus discovered between BID-CPCL-003 and BID-CPCL-004 sharing Common Director DIN 08492019 and Subnet IP 192.168.44.0/24."}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <Link
                href={`/tenders/${rawId}/cartel-network`}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-coral-orange text-white hover:bg-coral-orange-600 shadow-md shadow-coral-orange/30 transition-all"
              >
                <span>{t.cartelBannerBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setShowCartelBanner(false)}
                className="p-1.5 rounded-lg text-coral-orange hover:bg-coral-orange/20 transition-all"
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
        <div className="flex items-center space-x-1 p-1 rounded-xl bg-soft-beige dark:bg-deep-navy border border-warm-beige dark:border-warm-beige/20 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveFilter("ALL")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
              activeFilter === "ALL"
                ? "bg-crisp-white dark:bg-dark-navy text-deep-navy dark:text-crisp-white shadow-xs"
                : "text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white"
            }`}
          >
            {t.filterAll} ({bidders.length})
          </button>
          <button
            onClick={() => setActiveFilter("COMPLIANT")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
              activeFilter === "COMPLIANT"
                ? "bg-mint-green text-white shadow-xs"
                : "text-mint-green hover:bg-mint-green/15"
            }`}
          >
            🟢 {t.filterCompliant}
          </button>
          <button
            onClick={() => setActiveFilter("CLARIFICATION")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
              activeFilter === "CLARIFICATION"
                ? "bg-amber-500 text-white shadow-xs"
                : "text-amber-500 hover:bg-amber-500/15"
            }`}
          >
            🟡 {t.filterClarification}
          </button>
          <button
            onClick={() => setActiveFilter("HIGH_RISK")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap ${
              activeFilter === "HIGH_RISK"
                ? "bg-coral-orange text-white shadow-xs"
                : "text-coral-orange hover:bg-coral-orange/15"
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
            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/20 text-deep-navy dark:text-crisp-white focus:outline-none focus:border-lavender"
          />
        </div>
      </div>

      {/* 4. Comparative Bidder Scrutiny Table */}
      <div className="rounded-2xl border border-warm-beige dark:border-warm-beige/20 bg-soft-beige dark:bg-deep-navy shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-warm-beige/50 dark:bg-dark-navy/60 border-b border-warm-beige dark:border-warm-beige/20 text-muted-gray font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">{t.colBidderName}</th>
                <th className="py-3 px-4">{t.colSellerId}</th>
                <th className="py-3 px-4">{t.colBidValue}</th>
                <th className="py-3 px-4 text-center">{t.colScoreGauge}</th>
                <th className="py-3 px-4">{t.colRiskBadge}</th>
                <th className="py-3 px-4 text-right">{t.colDeepDive}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-beige dark:divide-warm-beige/20">
              {filteredBidders.map((bidder) => {
                const score = bidder.ai_evaluation.compliance_score;
                const status = bidder.ai_evaluation.status;
                const isHighRisk = status === "HIGH_RISK" || status === "DISQUALIFIED";
                const isClarification = status === "CLARIFICATION_NEEDED";
                const isCompliant = status === "COMPLIANT";

                return (
                  <tr
                    key={bidder.bidder_id}
                    className="hover:bg-warm-beige/30 dark:hover:bg-dark-navy/40 transition-colors"
                  >
                    {/* Bidder Name & Flags */}
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-sm text-deep-navy dark:text-crisp-white">
                            {bidder.legal_name}
                          </span>
                          {bidder.bidder_id === "BID-CPCL-001" && (
                            <span className="px-1.5 py-0.2 text-[9px] font-bold uppercase rounded bg-mint-green/15 text-mint-green border border-mint-green/30">
                              {language === "hi" ? "कक्षा-I MII" : "Class-I MII"}
                            </span>
                          )}
                          {bidder.bidder_id === "BID-CPCL-003" && (
                            <span className="px-1.5 py-0.2 text-[9px] font-bold uppercase rounded bg-coral-orange text-white animate-pulse">
                              {language === "hi" ? "प्रतिबंधित / जालसाजी" : "Debarred / Forgery"}
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
                    <td className="py-4 px-4 font-mono font-semibold text-deep-navy dark:text-crisp-white">
                      {bidder.seller_id}
                    </td>

                    {/* Bid Value */}
                    <td className="py-4 px-4 font-mono font-bold text-deep-navy dark:text-crisp-white">
                      ₹{(bidder.bid_value_inr / 10000000).toFixed(2)} {language === "hi" ? "करोड़" : "Cr"}
                    </td>

                    {/* Compliance Score Gauge (Radial SVG Meter) */}
                    <td className="py-4 px-4 text-center">
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
                    <td className="py-4 px-4">
                      {isCompliant && (
                        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-mint-green/15 text-mint-green border border-mint-green/30">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{t.statusCompliant}</span>
                        </span>
                      )}
                      {isClarification && (
                        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>{t.statusClarification}</span>
                        </span>
                      )}
                      {isHighRisk && (
                        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-coral-orange/15 text-coral-orange border border-coral-orange/40 animate-pulse">
                          <Ban className="w-3.5 h-3.5" />
                          <span>{status === "DISQUALIFIED" ? t.statusDebarred : t.statusHighRisk}</span>
                        </span>
                      )}
                    </td>

                    {/* Deep Dive Audit CTA Button */}
                    <td className="py-4 px-4 text-right">
                      <Link
                        href={`/bidders/${bidder.bidder_id}/audit`}
                        className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-lavender hover:bg-lavender/90 text-crisp-white shadow-md shadow-lavender/25 transition-all group"
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
