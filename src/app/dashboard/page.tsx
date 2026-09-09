"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  ShieldAlert,
  Clock,
  TrendingUp,
  ArrowRight,
  Radar,
  Zap,
  Users,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTenderData } from "@/context/TenderDataContext";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

export default function DashboardPage() {
  const { t, language } = useLanguage();
  const { tenders } = useTenderData();

  // Chart data matching exact tokens
  // Chart data matching authoritative enterprise tokens
  const riskDistribution = [
    { name: t.dashCompliantLabel, value: 18, color: "#059669" },
    { name: t.dashClarificationLabel, value: 17, color: "#D97706" },
    { name: t.dashHighRiskLabel, value: 7, color: "#DC2626" },
  ];

  const savingsData = [
    { name: t.dashManualScrutinyLabel, hours: 108, fill: "#64748B" },
    { name: t.dashAiScrutinyLabel, hours: 0.23, fill: "#2563EB" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 rounded-xl bg-white dark:bg-deep-navy border border-slate-200/80 dark:border-white/[0.08] shadow-enterprise-sm">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60">
              {t.dashWelcomeOrg}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">• {t.dashLiveConsole}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1.5">
            {t.appTitle} – {t.appSubtitle}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            {t.dashHeroDesc}
          </p>
        </div>

        <div className="flex items-center space-x-2.5 shrink-0">
          <Link
            href="/forensics-lab"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-enterprise-sm transition-all"
          >
            <span>{t.navForensicsLab}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/tenders/GEM-2026-B-9823410/cartel-network"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] dark:text-white border border-slate-200/80 dark:border-white/10 transition-all"
          >
            <Radar className="w-3.5 h-3.5 text-rose-500" />
            <span>{t.dashCartelAlertBtn}</span>
          </Link>
        </div>
      </div>

      {/* 1. Four Clean KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Active Tenders */}
        <div className="rounded-xl p-5 bg-white dark:bg-deep-navy border border-slate-200/80 dark:border-white/[0.08] shadow-enterprise-sm flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t.kpiActiveTenders}
            </span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800/60">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3 flex items-baseline justify-between gap-2">
            <div className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
              8
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              {language === "hi" ? "सक्रिय पाइपलाइन" : "Active Pipeline"}
            </span>
          </div>
          <div className="pt-2.5 border-t border-slate-100 dark:border-white/[0.06] text-xs text-slate-500 dark:text-slate-400">
            {t.kpiSubtitleTenders}
          </div>
        </div>

        {/* KPI 2: Bids Scrutinized Today */}
        <div className="rounded-xl p-5 bg-white dark:bg-deep-navy border border-slate-200/80 dark:border-white/[0.08] shadow-enterprise-sm flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t.kpiBidsToday}
            </span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3 flex items-baseline justify-between gap-2">
            <div className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
              42
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
              {language === "hi" ? "+14 आज" : "+14 today"}
            </span>
          </div>
          <div className="pt-2.5 border-t border-slate-100 dark:border-white/[0.06] text-xs text-slate-500 dark:text-slate-400">
            {t.kpiSubtitleBids}
          </div>
        </div>

        {/* KPI 3: Tampering & Fraud Blocked */}
        <div className="rounded-xl p-5 bg-white dark:bg-deep-navy border border-slate-200/80 dark:border-rose-900/40 shadow-enterprise-sm flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t.kpiFraudBlocked}
            </span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200/80 dark:border-rose-800/60">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3 flex items-baseline justify-between gap-2">
            <div className="text-3xl font-bold tracking-tight text-rose-600 dark:text-rose-400 font-mono">
              3
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
              {t.kpiFraudBlockedBadge}
            </span>
          </div>
          <div className="pt-2.5 border-t border-slate-100 dark:border-white/[0.06] text-xs text-slate-500 dark:text-slate-400">
            {language === "hi" ? "फ़ोटोशॉप संपादन, फ़र्ज़ी UDIN एवं कार्टेल" : "Photoshop edits, fake UDINs & cartels"}
          </div>
        </div>

        {/* KPI 4: Evaluation Time Saved */}
        <div className="rounded-xl p-5 bg-white dark:bg-deep-navy border border-slate-200/80 dark:border-emerald-900/40 shadow-enterprise-sm flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {t.kpiTimeSaved}
            </span>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/60">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3 flex items-baseline justify-between gap-2">
            <div className="text-3xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400 font-mono">
              &lt; 30s
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 shrink-0">
              {t.kpiTimeSavedBadge}
            </span>
          </div>
          <div className="pt-2.5 border-t border-slate-100 dark:border-white/[0.06] text-xs text-slate-500 dark:text-slate-400">
            {language === "hi" ? "पारंपरिक 4.5 दिन से घटकर 30 सेकंड" : "Down from 4.5 days manual checks"}
          </div>
        </div>
      </div>

      {/* 2. Tender Pipeline Table */}
      <div className="rounded-xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-deep-navy shadow-enterprise-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200/80 dark:border-white/[0.08] flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-deep-navy dark:text-crisp-white">
              {t.tendersHeader}
            </h2>
            <p className="text-xs text-muted-gray">
              {t.tendersSubheader}
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-white/5 text-muted-gray border border-slate-200/80 dark:border-white/10">
            {tenders.length} {language === "hi" ? "सक्रिय CPCL अधिप्राप्तियां" : "Active CPCL Procurements"}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[760px]">
            <thead className="bg-slate-50/80 dark:bg-white/[0.02] border-b border-slate-200/80 dark:border-white/[0.08] text-muted-gray font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-2.5 px-4 whitespace-nowrap">{t.colTenderId}</th>
                <th className="py-2.5 px-4 min-w-[220px]">{t.colTitle}</th>
                <th className="py-2.5 px-4 whitespace-nowrap">{t.colCategory}</th>
                <th className="py-2.5 px-4 whitespace-nowrap">{t.colDeadline}</th>
                <th className="py-2.5 px-4 whitespace-nowrap">{t.colTotalBids}</th>
                <th className="py-2.5 px-4 whitespace-nowrap min-w-[140px]">{t.colProgress}</th>
                <th className="py-2.5 px-4 text-right whitespace-nowrap">{t.colAction}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/60 dark:divide-white/[0.05]">
              {tenders.map((tender) => {
                const isPrimary = tender.tender_id === "GEM/2026/B/9823410";
                return (
                  <tr
                    key={tender.tender_id}
                    className="hover:bg-slate-50/70 dark:hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-deep-navy dark:text-crisp-white whitespace-nowrap">
                      <div className="flex items-center space-x-1.5">
                        <span>{tender.tender_id}</span>
                        {isPrimary && (
                          <span className="px-1.5 py-0.2 text-[9px] font-bold uppercase rounded bg-gov-blue-50 dark:bg-gov-blue-950/40 text-gov-blue-700 dark:text-gov-blue-300 border border-gov-blue-200 dark:border-gov-blue-800">
                            {t.lblActive}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium text-deep-navy dark:text-crisp-white max-w-xs truncate">
                      {tender.title}
                    </td>
                    <td className="py-3 px-4 text-muted-gray whitespace-nowrap">
                      {tender.item_category}
                    </td>
                    <td className="py-3 px-4 font-mono text-muted-gray whitespace-nowrap">
                      {new Date(tender.bid_deadline).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-white/5 text-deep-navy dark:text-crisp-white border border-slate-200/60 dark:border-white/10 whitespace-nowrap">
                        <Users className="w-3 h-3 text-muted-gray shrink-0" />
                        <span>{tender.total_bids}</span>
                        <span className="text-muted-gray font-normal">{language === "hi" ? "बोलीदाता" : "Bidders"}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 min-w-[140px]">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-semibold text-muted-gray">
                          <span>{language === "hi" ? "संवीक्षा" : "Scrutiny"}</span>
                          <span>{tender.scrutiny_progress}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-500"
                            style={{ width: `${tender.scrutiny_progress}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        {isPrimary && (
                          <Link
                            href="/tenders/GEM-2026-B-9823410/cartel-network"
                            className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-800/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all"
                            title={language === "hi" ? "कार्टेल रडार देखें" : "View Cartel Radar"}
                          >
                            <Radar className="w-3.5 h-3.5" />
                          </Link>
                        )}
                        <Link
                          href={`/tenders/${tender.tender_id.replace(/\//g, "-")}/bidders`}
                          className="px-2.5 py-1.5 rounded-lg font-semibold text-xs bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 dark:bg-blue-950/60 dark:hover:bg-blue-600 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60 transition-all shadow-2xs"
                        >
                          {t.btnScrutinize}
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Visual Charts & Recent Compliance Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Compliance Risk Breakdown Donut */}
        <div className="p-5 rounded-xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-deep-navy shadow-enterprise-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            {t.dashRiskDistribution}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === "hi" ? "CPCL निविदाओं में 42 बोलियों की संवीक्षा स्थिति" : "42 Total Bids Evaluated Across Active Tenders"}
          </p>

          <div className="h-52 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#F8FAFC",
                    fontSize: "11px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-white/[0.06] text-xs">
            {riskDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-700 dark:text-slate-200 font-medium">{item.name}</span>
                </div>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Evaluation Velocity Comparison */}
        <div className="p-5 rounded-xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-deep-navy shadow-enterprise-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            {t.dashTimeSavedChart}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === "hi" ? "पारंपरिक मानवीय संवीक्षा बनाम GeM-रक्षक" : "Manual Human Verification vs GeM-Rakshak"}
          </p>

          <div className="h-52 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={savingsData} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 10, fill: "#94A3B8" }} />
                <YAxis dataKey="name" type="category" width={95} tick={{ fontSize: 11, fill: "#94A3B8" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#F8FAFC",
                    fontSize: "11px",
                  }}
                />
                <Bar dataKey="hours" radius={[0, 4, 4, 0]} minPointSize={28}>
                  {savingsData.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-white/[0.06] text-xs">
            {savingsData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                  <span className="text-slate-700 dark:text-slate-200 font-medium">{item.name}</span>
                </div>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {item.hours >= 1
                    ? `${item.hours}h (${language === "hi" ? "4.5 दिन" : "4.5 days"})`
                    : `< 30s (${language === "hi" ? "तत्काल" : "Instant"})`}
                </span>
              </div>
            ))}
          </div>

          <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-xs text-emerald-700 dark:text-emerald-300 font-medium flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 shrink-0" />
            <span>{language === "hi" ? "प्रति निविदा 82% समय की बचत" : "82% turnaround improvement per tender cycle"}</span>
          </div>
        </div>

        {/* Real-time Forensic Anomaly Feed */}
        <div className="p-5 rounded-xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-deep-navy shadow-enterprise-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {language === "hi" ? "हालिया ऑडिट चेतावनियां" : "Recent Compliance Alerts"}
            </h3>
            <span className="w-2 h-2 rounded-full bg-rose-500" />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === "hi" ? "निविदाओं में स्वचालित रूप से चिन्हित विसंगतियां" : "Automated discrepancy flags from active evaluations"}
          </p>

          <div className="space-y-2 overflow-y-auto max-h-56">
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 space-y-1 text-xs">
              <div className="flex items-center justify-between font-bold text-rose-700 dark:text-rose-400">
                <span>{language === "hi" ? "प्रतिबंधित बोलीदाता" : "Debarred Vendor"}</span>
                <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">{language === "hi" ? "अभी" : "Just now"}</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                {language === "hi" ? "एपेक्स इंजीनियरिंग GFR नियम 151 के तहत प्रतिबंधित।" : "Apex Engineering debarred across CPSEs under GFR Rule 151."}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 space-y-1 text-xs">
              <div className="flex items-center justify-between font-bold text-rose-700 dark:text-rose-400">
                <span>{language === "hi" ? "फ़ोटोशॉप संपादन चिन्हित" : "Photoshop Alteration"}</span>
                <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">{language === "hi" ? "10 मि. पूर्व" : "10m ago"}</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                {language === "hi" ? "CA प्रमाणपत्र में टर्नओवर ₹1.5 Cr से बदलकर ₹18.5 Cr किया गया।" : "Turnover edited from ₹1.5 Cr to ₹18.5 Cr in CA certificate."}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 space-y-1 text-xs">
              <div className="flex items-center justify-between font-bold text-amber-700 dark:text-amber-400">
                <span>{language === "hi" ? "श्रेणी बेमेल (NIC)" : "Category Mismatch"}</span>
                <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400">{language === "hi" ? "25 मि. पूर्व" : "25m ago"}</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                {language === "hi" ? "भारत पेट्रो सेवाओं हेतु पंजीकृत, जबकि निविदा विनिर्माण मांगती है।" : "Bharat Petro registered for Services; tender mandates Manufacturing."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
