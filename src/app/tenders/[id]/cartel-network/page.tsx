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

  const { t } = useLanguage();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-soft-beige dark:bg-deep-navy border border-warm-beige dark:border-warm-beige/20 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs text-muted-gray">
            <Link
              href={`/tenders/${rawId}/bidders`}
              className="flex items-center space-x-1 hover:text-lavender transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Bidders</span>
            </Link>
            <span>/</span>
            <span>Cartel Collusion Radar</span>
          </div>

          <div className="flex items-center space-x-3">
            <h1 className="text-xl sm:text-2xl font-black text-deep-navy dark:text-crisp-white">
              {t.cartelTitle}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-coral-orange/15 text-coral-orange border border-coral-orange/30 animate-pulse">
              Cartel Ring Active
            </span>
          </div>
          <p className="text-xs text-muted-gray">
            {t.cartelSub} • GeM Tender Reference: GEM/2026/B/9823410
          </p>
        </div>

        <Link
          href={`/tenders/${rawId}/bidders`}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-lavender text-crisp-white hover:bg-lavender/90 shadow-md shadow-lavender/25 transition-all text-center"
        >
          Return to Bidder Scrutiny
        </Link>
      </div>

      {/* Interactive Cartel Graph Component */}
      <CartelGraph />
    </div>
  );
}
