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
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-white/[0.08] bg-white/90 dark:bg-dark-navy/90 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-15">
            {/* Left: Branding & Emblems */}
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-2.5 group">
                <div className="w-8 h-8 rounded-lg bg-blue-600 dark:bg-blue-600 flex items-center justify-center text-white shadow-enterprise-sm transition-transform group-hover:scale-105">
                  <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                      {t.appTitle}
                    </span>
                    <span className="hidden sm:inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                      GeM
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[220px] sm:max-w-xs font-medium">
                    {language === "hi" && activeEntity.orgName === "CPCL Manali Refinery"
                      ? "सीपीसीएल मनाली रिफाइनरी • भारत सरकार"
                      : `${activeEntity.orgName} • Govt of India`}
                  </p>
                </div>
              </Link>
            </div>

            {/* Center: Live Gateways Health Indicator */}
            <div className="hidden md:flex items-center">
              <button
                onClick={() => setIsGatewayModalOpen(true)}
                className="flex items-center space-x-2 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-100/70 dark:hover:bg-emerald-900/50 transition-all group"
                title="View Government Gateways status"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{t.gatewayStatusBadge}</span>
                <ChevronDown className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Right: Streamlined Global Controls */}
            <div className="flex items-center space-x-2">
              {/* Environment Mode Toggle */}
              <button
                onClick={toggleApiMode}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100/80 dark:bg-white/[0.04] hover:bg-slate-200/70 dark:hover:bg-white/[0.08] border border-slate-200/80 dark:border-white/[0.08] transition-all"
                title="Toggle between Demo Sandbox and Live API mode"
              >
                <Cpu className={`w-3.5 h-3.5 ${isLiveApiMode ? "text-emerald-500" : "text-blue-600 dark:text-blue-400"}`} />
                <span className="hidden sm:inline font-medium">
                  {isLiveApiMode ? t.liveGateway : t.mockSandbox}
                </span>
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isLiveApiMode ? "bg-emerald-500" : "bg-blue-600"
                  }`}
                />
              </button>

              <div className="w-px h-4 bg-slate-200 dark:bg-white/10" />

              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100/80 dark:bg-white/[0.04] hover:bg-slate-200/70 dark:hover:bg-white/[0.08] border border-slate-200/80 dark:border-white/[0.08] transition-all"
                aria-label="Toggle language"
              >
                <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{language === "en" ? "हिन्दी" : "EN"}</span>
              </button>

              <div className="w-px h-4 bg-slate-200 dark:bg-white/10" />

              {/* Theme Switcher */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100/80 dark:bg-white/[0.04] hover:bg-slate-200/70 dark:hover:bg-white/[0.08] border border-slate-200/80 dark:border-white/[0.08] transition-all"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-blue-600" />
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
