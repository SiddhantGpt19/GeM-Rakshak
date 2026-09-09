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
    <aside className="w-64 shrink-0 hidden md:flex flex-col border-r border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-dark-navy/80 text-slate-800 dark:text-slate-100 min-h-[calc(100vh-3.5rem)] p-4 space-y-4 transition-colors">
      {/* Procuring Entity Context Card */}
      <div
        onClick={() => setIsEntityModalOpen(true)}
        className="p-3 rounded-xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-deep-navy hover:border-blue-500/50 transition-all cursor-pointer group shadow-enterprise-sm"
        title="Click to switch Procuring Entity or Tender scope"
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t.sidebarProcuringEntity}
          </span>
          <span className="text-[11px] font-medium text-blue-600 dark:text-blue-400 flex items-center group-hover:underline">
            <span>{t.sidebarSwitch}</span>
            <ArrowLeftRight className="w-3 h-3 ml-1" />
          </span>
        </div>
        <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
          {language === "hi" && activeEntity.orgName === "CPCL Manali Refinery"
            ? "सीपीसीएल मनाली रिफाइनरी"
            : activeEntity.orgName}
        </p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate mt-0.5">
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
              className={`group flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800/60 shadow-2xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex items-center space-x-2.5 min-w-0 pr-1">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200"
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-semibold whitespace-nowrap shrink-0 ${
                    item.isPulse
                      ? "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60"
                      : isActive
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200"
                      : "bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Platform Documentation & SIH Dossier Footer */}
      <div className="pt-3 border-t border-slate-200/80 dark:border-white/[0.08] space-y-1">
        <a
          href="/GeM_Rakshak_Judge_Pitch_and_Architecture_Dossier.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-white/[0.04] transition-all group"
          title="Download SIH Hackathon Judge Pitch & Architecture Dossier (PDF)"
        >
          <div className="flex items-center space-x-2">
            <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold text-[11px]">{language === "hi" ? "SIH जज पिच डोजियर" : "Judge Pitch Dossier"}</span>
          </div>
          <Download className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
        </a>
      </div>
    </aside>
  );
}
