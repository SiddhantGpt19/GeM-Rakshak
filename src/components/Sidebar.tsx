"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import {
  LayoutDashboard,
  FileCheck2,
  Radar,
  Fingerprint,
  Server,
  FileSpreadsheet,
  ArrowLeftRight,
  FileText,
  Download,
} from "lucide-react";
import { useTenderData } from "@/context/TenderDataContext";
import { ProcuringEntityModal } from "./ProcuringEntityModal";

export function Sidebar() {
  const pathname = usePathname();
  const { t, language } = useLanguage();
  const { activeEntity } = useTenderData();
  const [isEntityModalOpen, setIsEntityModalOpen] = useState(false);

  const navItems = [
    {
      label: t.navDashboard,
      href: "/dashboard",
      icon: LayoutDashboard,
      match: pathname === "/" || pathname === "/dashboard",
    },
    {
      label: t.navTenders,
      href: "/tenders/GEM-2026-B-9823410/bidders",
      icon: FileCheck2,
      match: pathname.startsWith("/tenders") && !pathname.includes("cartel-network"),
      badge: t.sidebarActiveTenderBadge,
    },
    {
      label: t.navCartelRadar,
      href: "/tenders/GEM-2026-B-9823410/cartel-network",
      icon: Radar,
      match: pathname.includes("cartel-network"),
      badge: t.sidebarAlertBadge,
      isPulse: true,
    },
    {
      label: t.navForensicsLab,
      href: "/forensics-lab",
      icon: Fingerprint,
      match: pathname.startsWith("/forensics-lab"),
    },
    {
      label: t.navGateways,
      href: "/gateways",
      icon: Server,
      match: pathname.startsWith("/gateways"),
    },
    {
      label: t.navAuditLog,
      href: "/audit-log",
      icon: FileSpreadsheet,
      match: pathname.startsWith("/audit-log"),
    },
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:flex flex-col border-r border-warm-beige dark:border-warm-beige/20 bg-soft-beige/70 dark:bg-deep-navy text-deep-navy dark:text-crisp-white min-h-[calc(100vh-4rem)] p-4 space-y-6 transition-colors">
      {/* Procuring Entity Context Card (Clickable to switch) */}
      <div
        onClick={() => setIsEntityModalOpen(true)}
        className="p-3.5 rounded-xl border border-warm-beige dark:border-warm-beige/20 bg-crisp-white dark:bg-dark-navy shadow-xs space-y-1.5 cursor-pointer hover:border-lavender/60 hover:shadow-md transition-all group"
        title="Click to switch or customize Procuring Entity & Tender ID"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-gray">
              {t.sidebarProcuringEntity}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-mint-green animate-pulse" />
          </div>
          <span className="text-[9px] font-bold text-lavender flex items-center space-x-0.5 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
            <span>{t.sidebarSwitch}</span>
            <ArrowLeftRight className="w-2.5 h-2.5" />
          </span>
        </div>
        <p className="text-xs font-bold text-deep-navy dark:text-crisp-white group-hover:text-lavender transition-colors line-clamp-1">
          {language === "hi" && activeEntity.orgName === "CPCL Manali Refinery"
            ? "सीपीसीएल मनाली रिफाइनरी"
            : activeEntity.orgName}
        </p>
        <p className="text-[10px] text-muted-gray font-mono truncate">
          {language === "hi" ? "निविदा आईडी:" : "Tender ID:"} {activeEntity.tenderId}
        </p>
      </div>

      <ProcuringEntityModal
        isOpen={isEntityModalOpen}
        onClose={() => setIsEntityModalOpen(false)}
      />

      {/* Navigation Links */}
      <nav className="space-y-1.5 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.match;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? "bg-lavender text-crisp-white shadow-md shadow-lavender/30 font-semibold"
                  : "text-deep-navy/70 hover:text-deep-navy dark:text-crisp-white/80 dark:hover:text-crisp-white hover:bg-warm-beige/60 dark:hover:bg-dark-navy"
              }`}
            >
              <div className="flex items-center space-x-3 min-w-0 pr-1">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive
                      ? "text-crisp-white"
                      : "text-muted-gray group-hover:text-lavender dark:group-hover:text-lavender"
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap shrink-0 ${
                    item.isPulse
                      ? "bg-coral-orange text-white animate-pulse"
                      : isActive
                      ? "bg-white/20 text-white"
                      : "bg-warm-beige dark:bg-white/10 text-deep-navy/80 dark:text-crisp-white/80"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Platform Documentation Minimal Footer Link */}
      <div className="pt-3 border-t border-warm-beige/70 dark:border-white/10">
        <a
          href="/docs/GeM_Rakshak_System_Architecture_and_Platform_Documentation.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download="GeM_Rakshak_System_Architecture_and_Platform_Documentation.pdf"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-muted-gray hover:text-lavender hover:bg-warm-beige/40 dark:hover:bg-white/5 transition-all group"
          title="Download official CVC-compliant GeM-Rakshak Platform Architecture Dossier (PDF)"
        >
          <div className="flex items-center space-x-2">
            <FileText className="w-3.5 h-3.5 text-lavender" />
            <span className="font-semibold text-[11px]">{t.sidebarPlatformDossier}</span>
          </div>
          <Download className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-y-0.5 transition-transform" />
        </a>
      </div>
    </aside>
  );
}
