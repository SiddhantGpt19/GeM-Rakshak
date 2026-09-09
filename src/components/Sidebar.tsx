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
    <aside className="w-60 shrink-0 hidden md:flex flex-col border-r border-warm-beige/80 dark:border-white/[0.08] bg-white/50 dark:bg-dark-navy/50 text-deep-navy dark:text-crisp-white min-h-[calc(100vh-3.5rem)] p-3.5 space-y-4 transition-colors">
      {/* Procuring Entity Context Badge */}
      <div
        onClick={() => setIsEntityModalOpen(true)}
        className="p-3 rounded-xl border border-warm-beige/80 dark:border-white/[0.08] bg-white dark:bg-deep-navy/60 hover:border-lavender/50 transition-all cursor-pointer group shadow-2xs"
        title="Click to switch or customize Procuring Entity & Tender ID"
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-gray">
            {t.sidebarProcuringEntity}
          </span>
          <span className="text-[10px] font-medium text-lavender flex items-center opacity-80 group-hover:opacity-100 transition-opacity">
            <span>{t.sidebarSwitch}</span>
            <ArrowLeftRight className="w-2.5 h-2.5 ml-0.5" />
          </span>
        </div>
        <p className="text-xs font-semibold text-deep-navy dark:text-crisp-white group-hover:text-lavender transition-colors truncate">
          {language === "hi" && activeEntity.orgName === "CPCL Manali Refinery"
            ? "सीपीसीएल मनाली रिफाइनरी"
            : activeEntity.orgName}
        </p>
        <p className="text-[10px] text-muted-gray font-mono truncate mt-0.5">
          {activeEntity.tenderId}
        </p>
      </div>

      <ProcuringEntityModal
        isOpen={isEntityModalOpen}
        onClose={() => setIsEntityModalOpen(false)}
      />

      {/* Navigation Links */}
      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.match;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? "bg-lavender/10 text-lavender dark:bg-lavender/15 font-semibold border border-lavender/20"
                  : "text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white hover:bg-slate-100/70 dark:hover:bg-white/5"
              }`}
            >
              <div className="flex items-center space-x-2.5 min-w-0 pr-1">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive
                      ? "text-lavender"
                      : "text-muted-gray group-hover:text-deep-navy dark:group-hover:text-crisp-white"
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`px-2 py-0.5 rounded-full text-[9px] font-bold whitespace-nowrap shrink-0 ${
                    item.isPulse
                      ? "bg-coral-orange/15 text-coral-orange border border-coral-orange/30"
                      : isActive
                      ? "bg-lavender/20 text-lavender"
                      : "bg-slate-100 dark:bg-white/10 text-muted-gray"
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
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-muted-gray hover:text-lavender hover:bg-slate-100 dark:hover:bg-white/5 transition-all group"
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
