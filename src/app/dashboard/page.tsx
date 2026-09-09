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
  const riskDistribution = [
    { name: t.dashCompliantLabel, value: 18, color: "#10B981" },
    { name: t.dashClarificationLabel, value: 17, color: "#F59E0B" },
    { name: t.dashHighRiskLabel, value: 7, color: "#F4643C" },
  ];

  const savingsData = [
    { name: t.dashManualScrutinyLabel, hours: 108, fill: "#647080" },
    { name: t.dashAiScrutinyLabel, hours: 0.23, fill: "#6366F1" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-white dark:bg-deep-navy border border-slate-200/80 dark:border-white/[0.08] shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-lavender/10 text-lavender border border-lavender/20">
              {t.dashWelcomeOrg}
            </span>
            <span className="text-xs text-muted-gray">• {t.dashLiveConsole}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-deep-navy dark:text-crisp-white mt-1">
            {t.appTitle} – {t.appSubtitle}
          </h1>
          <p className="text-xs text-muted-gray mt-1 max-w-2xl leading-relaxed">
            {t.dashHeroDesc}
          </p>
        </div>

        <div className="flex items-center space-x-2.5 shrink-0">
          <Link
            href="/forensics-lab"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-lavender/10 hover:bg-lavender/20 text-lavender border border-lavender/25 transition-all"
          >
            <span>{t.navForensicsLab}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/tenders/GEM-2026-B-9823410/cartel-network"
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-coral-orange/10 hover:bg-coral-orange/20 text-coral-orange border border-coral-orange/25 transition-all"
          >
            <Radar className="w-3.5 h-3.5" />
            <span>{t.dashCartelAlertBtn}</span>
          </Link>
        </div>
      </div>

      {/* 1. Four Sleek KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Active Tenders */}
        <div className="relative overflow-hidden rounded-2xl p-5 bg-white dark:bg-deep-navy border border-slate-200/80 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-lavender/40 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">
              {t.kpiActiveTenders}
            </span>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-lavender/10 text-lavender border border-lavender/20 group-hover:scale-105 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3 flex items-baseline justify-between gap-2">
            <div className="text-3xl font-bold tracking-tight text-deep-navy dark:text-crisp-white font-mono">
              8
            </div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-lavender/15 text-lavender dark:text-lavender-300 border border-lavender/30">
              {language === "hi" ? "सक्रिय अधिप्राप्ति" : "Active Pipeline"}
            </span>
          </div>
          <div className="pt-2.5 border-t border-slate-100 dark:border-white/[0.06] text-xs text-slate-500 dark:text-slate-400">
            {t.kpiSubtitleTenders}
          </div>
        </div>

        {/* KPI 2: Bids Scrutinized Today */}
        <div className="relative overflow-hidden rounded-2xl p-5 bg-white dark:bg-deep-navy border border-slate-200/80 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-mint-green/40 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">
              {t.kpiBidsToday}
            </span>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-mint-green/10 text-mint-green border border-mint-green/20 group-hover:scale-105 transition-transform">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3 flex items-baseline justify-between gap-2">
            <div className="text-3xl font-bold tracking-tight text-deep-navy dark:text-crisp-white font-mono">
              42
            </div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-mint-green/15 text-mint-green border border-mint-green/30">
              {language === "hi" ? "+14 आज" : "+14 today"}
            </span>
          </div>
          <div className="pt-2.5 border-t border-slate-100 dark:border-white/[0.06] text-xs text-slate-500 dark:text-slate-400">
            {t.kpiSubtitleBids}
          </div>
        </div>

        {/* KPI 3: Tampering & Fraud Blocked */}
        <div className="relative overflow-hidden rounded-2xl p-5 bg-white dark:bg-deep-navy border border-slate-200/80 dark:border-coral-orange/25 hover:border-coral-orange/45 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">
              {t.kpiFraudBlocked}
            </span>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-coral-orange/10 text-coral-orange border border-coral-orange/25 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3 flex items-baseline justify-between gap-2">
            <div className="text-3xl font-bold tracking-tight text-coral-orange font-mono">
              3
            </div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-coral-orange/15 text-coral-orange border border-coral-orange/30">
              {t.kpiFraudBlockedBadge}
            </span>
          </div>
          <div className="pt-2.5 border-t border-slate-100 dark:border-white/[0.06] text-xs text-slate-500 dark:text-slate-400">
            {language === "hi" ? "फ़ोटोशॉप संपादन, फ़र्ज़ी UDIN एवं सिंडिकेट" : "Photoshop edits, fake UDINs & cartels"}
          </div>
        </div>

        {/* KPI 4: Evaluation Time Saved */}
        <div className="relative overflow-hidden rounded-2xl p-5 bg-white dark:bg-deep-navy border border-slate-200/80 dark:border-mint-green/25 hover:border-mint-green/45 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-300">
              {t.kpiTimeSaved}
            </span>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-mint-green/10 text-mint-green border border-mint-green/25 group-hover:scale-105 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3 flex items-baseline justify-between gap-2">
            <div className="text-3xl font-bold tracking-tight text-mint-green font-mono">
              &lt; 30s
            </div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-mint-green/15 text-mint-green border border-mint-green/30 shrink-0">
              {t.kpiTimeSavedBadge}
            </span>
          </div>
          <div className="pt-2.5 border-t border-slate-100 dark:border-white/[0.06] text-xs text-slate-500 dark:text-slate-400">
            {language === "hi" ? "4.5 दिनों की मानवीय संवीक्षा घटकर तत्काल हुई" : "Down from 4.5 days manual cross-checking"}
          </div>
        </div>
      </div>

      {/* 2. Tender Pipeline Table */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-deep-navy shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-warm-beige/80 dark:border-white/[0.08] flex items-center justify-between flex-wrap gap-3">
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
            <thead className="bg-slate-50/80 dark:bg-white/[0.02] border-b border-warm-beige/80 dark:border-white/[0.08] text-muted-gray font-semibold uppercase tracking-wider text-[10px]">
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
            <tbody className="divide-y divide-warm-beige/60 dark:divide-white/[0.05]">
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
                          <span className="px-1.5 py-0.2 text-[9px] font-bold uppercase rounded bg-lavender/15 text-lavender border border-lavender/25">
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
                            className="h-full rounded-full bg-gradient-to-r from-lavender to-mint-green transition-all duration-500"
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
                            className="p-1.5 rounded-lg border border-coral-orange/30 text-coral-orange hover:bg-coral-orange/10 transition-all"
                            title={language === "hi" ? "कार्टेल रडार देखें" : "View Cartel Radar"}
                          >
                            <Radar className="w-3.5 h-3.5" />
                          </Link>
                        )}
                        <Link
                          href={`/tenders/${tender.tender_id.replace(/\//g, "-")}/bidders`}
                          className="px-2.5 py-1.5 rounded-lg font-semibold text-xs bg-lavender/10 hover:bg-lavender hover:text-white text-lavender border border-lavender/25 transition-all shadow-2xs"
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

      {/* 3. Visual Charts & Recent Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Compliance Risk Breakdown Donut */}
        <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-deep-navy shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-deep-navy dark:text-crisp-white">
            {t.dashRiskDistribution}
          </h3>
          <p className="text-xs text-muted-gray">
            {language === "hi" ? "CPCL निविदाओं में कुल 42 बोलियों की संवीक्षा" : "42 Total Bids Scrutinized Across CPCL Tenders"}
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
                    backgroundColor: "#0C141C",
                    borderRadius: "12px",
                    border: "1px solid #E4DCD4",
                    color: "#FCFCFC",
                    fontSize: "11px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-warm-beige dark:border-warm-beige/20 text-xs">
            {riskDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-deep-navy dark:text-crisp-white font-medium">{item.name}</span>
                </div>
                <span className="font-mono font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Evaluation Velocity Comparison */}
        <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-deep-navy shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-deep-navy dark:text-crisp-white">
            {t.dashTimeSavedChart}
          </h3>
          <p className="text-xs text-muted-gray">
            {language === "hi" ? "पारंपरिक मानवीय सत्यापन बनाम GeM-रक्षक एआई इंजन" : "Manual Human Verification vs GeM-Rakshak AI Pipeline"}
          </p>

          <div className="h-52 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={savingsData} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 10, fill: "#647080" }} />
                <YAxis dataKey="name" type="category" width={95} tick={{ fontSize: 11, fill: "#647080" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#090D16",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#F8FAFC",
                    fontSize: "11px",
                  }}
                />
                <Bar dataKey="hours" radius={[0, 6, 6, 0]} minPointSize={28}>
                  {savingsData.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-warm-beige/80 dark:border-white/[0.08] text-xs">
            {savingsData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                  <span className="text-deep-navy dark:text-crisp-white font-medium">{item.name}</span>
                </div>
                <span className="font-mono font-bold text-deep-navy dark:text-crisp-white">
                  {item.hours >= 1
                    ? `${item.hours}h (${language === "hi" ? "4.5 दिन" : "4.5 days"})`
                    : `< 30s (${language === "hi" ? "तत्काल" : "Instant"})`}
                </span>
              </div>
            ))}
          </div>

          <div className="p-2.5 rounded-xl bg-mint-green/10 border border-mint-green/20 text-xs text-mint-green font-medium flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 shrink-0" />
            <span>{language === "hi" ? "प्रति CPSE निविदा चक्र में 82% समय की बचत" : "82% turnaround improvement per CPSE tender cycle"}</span>
          </div>
        </div>

        {/* Real-time Forensic Anomaly Feed */}
        <div className="p-5 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-deep-navy shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-deep-navy dark:text-crisp-white">
              {language === "hi" ? "हालिया फोरेंसिक विसंगतियां" : "Recent Forensic Detections"}
            </h3>
            <span className="w-2 h-2 rounded-full bg-coral-orange" />
          </div>
          <p className="text-xs text-muted-gray">
            {language === "hi" ? "CPCL हाइड्रोकार्बन निविदाओं में स्वचालित अलर्ट" : "Automated alerts flagged in CPCL Hydrocarbon tenders"}
          </p>

          <div className="space-y-2 overflow-y-auto max-h-56">
            <div className="p-2.5 rounded-xl bg-coral-orange/10 border border-coral-orange/20 space-y-1 text-xs">
              <div className="flex items-center justify-between font-bold text-coral-orange">
                <span>{language === "hi" ? "IOCL डिबारमेंट सक्रिय" : "IOCL Debarment Active"}</span>
                <span className="font-mono text-[10px] text-muted-gray">{language === "hi" ? "अभी-अभी" : "Just now"}</span>
              </div>
              <p className="text-deep-navy dark:text-crisp-white text-[11px] leading-relaxed">
                {language === "hi" ? "GFR नियम 151 के अंतर्गत अक्टूबर 2027 तक CPSEs में एपेक्स इंजीनियरिंग प्रतिबंधित।" : "Apex Engineering debarred across CPSEs until Oct 2027 under GFR Rule 151."}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-coral-orange/10 border border-coral-orange/20 space-y-1 text-xs">
              <div className="flex items-center justify-between font-bold text-coral-orange">
                <span>{language === "hi" ? "फ़ोटोशॉप CC 2024 संपादन" : "Photoshop CC 2024 Alteration"}</span>
                <span className="font-mono text-[10px] text-muted-gray">{language === "hi" ? "10 मिनट पूर्व" : "10m ago"}</span>
              </div>
              <p className="text-deep-navy dark:text-crisp-white text-[11px] leading-relaxed">
                {language === "hi" ? "CA नेटवर्थ प्रमाणपत्र में टर्नओवर अंक ₹1.5 करोड़ से बदलकर ₹18.5 करोड़ किए गए।" : "Turnover digits edited from ₹1.5 Cr to ₹18.5 Cr in CA Net Worth certificate."}
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1 text-xs">
              <div className="flex items-center justify-between font-bold text-amber-500">
                <span>{language === "hi" ? "MSME NIC श्रेणी बेमेल" : "MSME NIC Category Mismatch"}</span>
                <span className="font-mono text-[10px] text-muted-gray">{language === "hi" ? "25 मिनट पूर्व" : "25m ago"}</span>
              </div>
              <p className="text-deep-navy dark:text-crisp-white text-[11px] leading-relaxed">
                {language === "hi" ? "भारत पेट्रो सेवाओं (74909) के लिए पंजीकृत, जबकि निविदा विनिर्माण की मांग करती है।" : "Bharat Petro registered for Services (74909), tender mandates Manufacturing."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
