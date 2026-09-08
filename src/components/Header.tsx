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
      <header className="sticky top-0 z-40 w-full border-b border-warm-beige dark:border-warm-beige/20 bg-soft-beige/95 dark:bg-deep-navy/95 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Left: Branding & Emblems */}
            <div className="flex items-center space-x-3.5">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 rounded-xl bg-lavender flex items-center justify-center text-crisp-white shadow-md shadow-lavender/30 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-black tracking-tight text-deep-navy dark:text-crisp-white">
                      {t.appTitle}
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-muted-gray truncate max-w-[260px] sm:max-w-md">
                    {language === "hi" && activeEntity.orgName === "CPCL Manali Refinery"
                      ? "सीपीसीएल मनाली रिफाइनरी • पेट्रोलियम और प्राकृतिक गैस मंत्रालय"
                      : `${activeEntity.orgName} • ${activeEntity.department}`}
                  </p>
                </div>
              </Link>
            </div>

            {/* Center: Live Gateways Health Indicator (Clickable Pill) */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={() => setIsGatewayModalOpen(true)}
                className="flex items-center space-x-2 px-3 py-1 rounded-full border border-mint-green/30 bg-mint-green/10 text-mint-green text-xs font-semibold hover:bg-mint-green/15 transition-all group"
                title="Click to view detailed telemetry for all 8 Government Gateways"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-mint-green animate-pulse" />
                <span>{t.gatewayStatusBadge}</span>
                <ChevronDown className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Right: Streamlined Global Controls Capsule */}
            <div className="flex items-center p-1 rounded-xl bg-crisp-white dark:bg-dark-navy border border-warm-beige/70 dark:border-white/10 shadow-xs space-x-1">
              {/* Environment Mode Toggle */}
              <button
                onClick={toggleApiMode}
                className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-deep-navy dark:text-crisp-white hover:bg-warm-beige/40 dark:hover:bg-white/5 transition-all"
                title="Toggle between Simulated Mock Environment and Live API Gateway mode"
              >
                <Cpu className={`w-3.5 h-3.5 ${isLiveApiMode ? "text-mint-green" : "text-lavender"}`} />
                <span className="hidden sm:inline font-semibold">
                  {isLiveApiMode ? t.liveGateway : t.mockSandbox}
                </span>
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isLiveApiMode ? "bg-mint-green animate-pulse" : "bg-lavender"
                  }`}
                />
              </button>

              <div className="w-px h-3.5 bg-warm-beige/60 dark:bg-white/10" />

              {/* Language Switcher */}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1.5 px-2 py-1 rounded-lg text-xs font-semibold text-deep-navy dark:text-crisp-white hover:bg-warm-beige/40 dark:hover:bg-white/5 transition-all"
                aria-label="Toggle language"
              >
                <Globe className="w-3.5 h-3.5 text-lavender" />
                <span>{language === "en" ? "हिन्दी" : "English"}</span>
              </button>

              <div className="w-px h-3.5 bg-warm-beige/60 dark:bg-white/10" />

              {/* Theme Switcher */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-1.5 rounded-lg text-deep-navy dark:text-crisp-white hover:bg-warm-beige/40 dark:hover:bg-white/5 transition-all"
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
