"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { CartelGraph } from "@/components/CartelGraph";

export default function CartelNetworkPage() {
  const params = useParams();
  const rawId = (params?.id as string) || "GEM-2026-B-9823410";

  const { t, language } = useLanguage();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-deep-navy border border-slate-200/80 dark:border-white/[0.08] shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs text-muted-gray">
            <Link
              href={`/tenders/${rawId}/bidders`}
              className="flex items-center space-x-1 hover:text-gov-blue-600 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{language === "hi" ? "बोलीदाताओं की सूची पर वापस" : "Back to Bidders"}</span>
            </Link>
            <span>/</span>
            <span>{language === "hi" ? "कार्टेल जांच" : "Cartel Collusion Analysis"}</span>
          </div>

          <div className="flex items-center space-x-3">
            <h1 className="text-xl sm:text-2xl font-black text-deep-navy dark:text-crisp-white">
              {t.cartelTitle}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-600 border border-rose-500/20">
              {language === "hi" ? "कार्टेल सिंडिकेट सक्रिय" : "Cartel Ring Active"}
            </span>
          </div>
          <p className="text-xs text-muted-gray">
            {t.cartelSub} • {language === "hi" ? "GeM निविदा संदर्भ:" : "GeM Tender Reference:"} GEM/2026/B/9823410
          </p>
        </div>

        <Link
          href={`/tenders/${rawId}/bidders`}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-gov-blue-600 text-white hover:bg-gov-blue-700 shadow-xs transition-all text-center"
        >
          {language === "hi" ? "बोलीदाताओं की सूची देखें" : "View Bidders List"}
        </Link>
      </div>

      {/* Interactive Cartel Graph Component */}
      <CartelGraph />
    </div>
  );
}
