"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext";
import { useTenderData } from "@/context/TenderDataContext";
import { GatewayStatusModal } from "./GatewayStatusModal";
import {
  ShieldCheck,
  Sun,
  Moon,
  Globe,
  Cpu,
  ChevronDown,
} from "lucide-react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const { isLiveApiMode, toggleApiMode, activeEntity } = useTenderData();
  const [isGatewayModalOpen, setIsGatewayModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-warm-beige/80 dark:border-white/[0.08] bg-white/80 dark:bg-dark-navy/80 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-15">
            {/* Left: Branding & Emblems */}
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-2.5 group">
                <div className="w-8 h-8 rounded-lg bg-lavender flex items-center justify-center text-white shadow-xs shadow-lavender/30 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <span className="text-base font-bold tracking-tight text-deep-navy dark:text-crisp-white block leading-tight">
                    {t.appTitle}
                  </span>
                  <p className="text-[10px] text-muted-gray truncate max-w-[220px] sm:max-w-xs font-medium">
                    {language === "hi" && activeEntity.orgName === "CPCL Manali Refinery"
                      ? "सीपीसीएल मनाली रिफाइनरी • पेट्रोलियम और प्राकृतिक गैस मंत्रालय"
                      : `${activeEntity.orgName} • ${activeEntity.department}`}
                  </p>
                </div>
              </Link>
            </div>

            {/* Center: Live Gateways Health Indicator */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => setIsGatewayModalOpen(true)}
                className="flex items-center space-x-2 px-3 py-1 rounded-full border border-mint-green/30 bg-mint-green/10 text-mint-green text-[11px] font-medium hover:bg-mint-green/15 transition-all group"
                title="Click to view detailed telemetry for all 8 Government Gateways"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-mint-green" />
                <span>{t.gatewayStatusBadge}</span>
                <ChevronDown className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Right: Streamlined Global Controls */}
            <div className="flex items-center space-x-1.5">
              {/* Environment Mode Toggle */}
              <button
                onClick={toggleApiMode}
                className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent hover:border-slate-200 dark:hover:border-white/10 transition-all"
                title="Toggle between Simulated Mock Environment and Live API Gateway mode"
              >
                <Cpu className={`w-3.5 h-3.5 ${isLiveApiMode ? "text-mint-green" : "text-lavender"}`} />
                <span className="hidden sm:inline font-medium">
                  {isLiveApiMode ? t.liveGateway : t.mockSandbox}
                </span>
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isLiveApiMode ? "bg-mint-green" : "bg-lavender"
                  }`}
                />
              </button>

              <div className="w-px h-3.5 bg-slate-200 dark:bg-white/10" />

              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-medium text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent hover:border-slate-200 dark:hover:border-white/10 transition-all"
                aria-label="Toggle language"
              >
                <Globe className="w-3.5 h-3.5 text-lavender" />
                <span className="font-semibold">{language === "en" ? "हिन्दी" : "EN"}</span>
              </button>

              <div className="w-px h-3.5 bg-slate-200 dark:bg-white/10" />

              {/* Theme Switcher */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-1.5 rounded-lg text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent hover:border-slate-200 dark:hover:border-white/10 transition-all"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-3.5 h-3.5 text-amber-400 hover:rotate-45 transition-transform" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-lavender hover:-rotate-12 transition-transform" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Gateway Telemetry Modal */}
      <GatewayStatusModal
        isOpen={isGatewayModalOpen}
        onClose={() => setIsGatewayModalOpen(false)}
      />
    </>
  );
}
