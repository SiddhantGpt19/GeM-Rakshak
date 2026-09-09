"use client";

import React, { useState, useMemo } from "react";
import { useTenderData } from "@/context/TenderDataContext";
import { useLanguage } from "@/context/LanguageContext";
import { AuditLogEntry } from "@/context/TenderDataContext";
import {
  ShieldCheck,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Server,
  HelpCircle,
  Hash,
  ExternalLink,
  Copy,
  Check,
  X,
  Lock,
} from "lucide-react";

export default function AuditLogPage() {
  const { auditLogs, activeEntity } = useTenderData();
  const { t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  // Filter and search logic
  const filteredLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      // Filter tab check
      if (selectedFilter === "CRITICAL" && log.status !== "CRITICAL_ALERT" && log.status !== "DISQUALIFIED") {
        return false;
      }
      if (selectedFilter === "COMPLIANT" && log.status !== "COMPLIANT" && log.status !== "QUALIFIED") {
        return false;
      }
      if (selectedFilter === "GATEWAY" && log.status !== "GATEWAY_SYNC" && log.category !== "GATEWAY") {
        return false;
      }
      if (selectedFilter === "CLARIFICATION" && log.status !== "CLARIFICATION") {
        return false;
      }
      if (selectedFilter === "SYSTEM" && log.status !== "SYSTEM" && log.status !== "INTEGRITY_SEAL") {
        return false;
      }

      // Search query check
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        log.id.toLowerCase().includes(query) ||
        log.bidderName.toLowerCase().includes(query) ||
        log.action.toLowerCase().includes(query) ||
        log.officerId.toLowerCase().includes(query) ||
        log.tenderId.toLowerCase().includes(query) ||
        (log.notes && log.notes.toLowerCase().includes(query)) ||
        (log.statutoryClause && log.statutoryClause.toLowerCase().includes(query))
      );
    });
  }, [auditLogs, selectedFilter, searchQuery]);

  // Quick statistics
  const stats = useMemo(() => {
    const total = auditLogs.length;
    const critical = auditLogs.filter(
      (l) => l.status === "CRITICAL_ALERT" || l.status === "DISQUALIFIED"
    ).length;
    const compliant = auditLogs.filter(
      (l) => l.status === "COMPLIANT" || l.status === "QUALIFIED"
    ).length;
    const gateway = auditLogs.filter(
      (l) => l.status === "GATEWAY_SYNC" || l.category === "GATEWAY"
    ).length;
    const clarifications = auditLogs.filter((l) => l.status === "CLARIFICATION").length;

    return { total, critical, compliant, gateway, clarifications };
  }, [auditLogs]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLIANT":
      case "QUALIFIED":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "CRITICAL_ALERT":
      case "DISQUALIFIED":
        return "bg-rose-500/10 text-rose-600 border-rose-500/20";
      case "CLARIFICATION":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "GATEWAY_SYNC":
        return "bg-sky-500/10 text-sky-600 border-sky-500/20";
      case "INTEGRITY_SEAL":
      case "SYSTEM":
      default:
        return "bg-gov-blue-500/10 text-gov-blue-600 border-gov-blue-500/20";
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-deep-navy border border-slate-200/80 dark:border-white/[0.08] shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gov-blue-600 dark:text-gov-blue-400 flex items-center space-x-1">
              <Lock className="w-3 h-3" />
              <span>{t.auditCvcBadge}</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-dark-navy text-slate-600 dark:text-slate-300 font-mono font-medium">
              {activeEntity.orgName}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-deep-navy dark:text-crisp-white mt-1">
            {t.navAuditLog}
          </h1>
          <p className="text-xs text-muted-gray">
            {t.auditSubtitle}
          </p>
        </div>

        {/* Global Actions */}
        <div className="flex items-center space-x-2">
          {/* Sealed badge */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.auditSha256Badge}</span>
          </div>
        </div>
      </div>

      {/* Metrics Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-xl bg-white dark:bg-deep-navy border border-slate-200/80 dark:border-white/[0.08]">
          <div className="flex items-center justify-between text-muted-gray text-xs mb-1">
            <span>{t.auditTotalSealed}</span>
            <Hash className="w-3.5 h-3.5 text-gov-blue-600 dark:text-gov-blue-400" />
          </div>
          <div className="text-xl font-bold text-deep-navy dark:text-crisp-white">
            {stats.total}
          </div>
          <p className="text-[10px] text-muted-gray mt-0.5">{t.auditCryptoTrail}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-deep-navy border border-slate-200/80 dark:border-white/[0.08]">
          <div className="flex items-center justify-between text-muted-gray text-xs mb-1">
            <span>{t.auditCriticalAlerts}</span>
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
          </div>
          <div className="text-xl font-bold text-rose-600">
            {stats.critical}
          </div>
          <p className="text-[10px] text-rose-600/80 mt-0.5">{t.auditDebarmentSub}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-deep-navy border border-slate-200/80 dark:border-white/[0.08]">
          <div className="flex items-center justify-between text-muted-gray text-xs mb-1">
            <span>{t.auditCompliantPassed}</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-xl font-bold text-emerald-600">
            {stats.compliant}
          </div>
          <p className="text-[10px] text-muted-gray mt-0.5">{t.auditTechMetSub}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-deep-navy border border-slate-200/80 dark:border-white/[0.08]">
          <div className="flex items-center justify-between text-muted-gray text-xs mb-1">
            <span>{t.auditGatewayPolls}</span>
            <Server className="w-3.5 h-3.5 text-sky-500" />
          </div>
          <div className="text-xl font-bold text-sky-500">
            {stats.gateway}
          </div>
          <p className="text-[10px] text-muted-gray mt-0.5">{t.auditGatewaySub}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-deep-navy border border-slate-200/80 dark:border-white/[0.08] col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-muted-gray text-xs mb-1">
            <span>{t.auditClarifications}</span>
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-xl font-bold text-amber-500">
            {stats.clarifications}
          </div>
          <p className="text-[10px] text-muted-gray mt-0.5">{t.auditClarificationsSub}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-deep-navy border border-slate-200/80 dark:border-white/[0.08]">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-gray" />
          <input
            type="text"
            placeholder={t.auditSearchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-dark-navy border border-slate-200 dark:border-white/10 text-xs text-deep-navy dark:text-crisp-white placeholder:text-muted-gray focus:outline-hidden focus:border-gov-blue-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white text-xs"
            >
              {t.lblClear}
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedFilter("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedFilter === "ALL"
                ? "bg-gov-blue-600 text-white shadow-xs"
                : "bg-slate-50 dark:bg-dark-navy text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white border border-slate-200 dark:border-white/10"
            }`}
          >
            {t.auditFilterAll} ({auditLogs.length})
          </button>
          <button
            onClick={() => setSelectedFilter("CRITICAL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedFilter === "CRITICAL"
                ? "bg-rose-600 text-white shadow-xs"
                : "bg-slate-50 dark:bg-dark-navy text-muted-gray hover:text-rose-600 border border-slate-200 dark:border-white/10"
            }`}
          >
            {t.auditFilterCritical} ({stats.critical})
          </button>
          <button
            onClick={() => setSelectedFilter("COMPLIANT")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedFilter === "COMPLIANT"
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-slate-50 dark:bg-dark-navy text-muted-gray hover:text-emerald-600 border border-slate-200 dark:border-white/10"
            }`}
          >
            {t.auditFilterCompliant} ({stats.compliant})
          </button>
          <button
            onClick={() => setSelectedFilter("GATEWAY")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedFilter === "GATEWAY"
                ? "bg-sky-600 text-white shadow-xs"
                : "bg-slate-50 dark:bg-dark-navy text-muted-gray hover:text-sky-600 border border-slate-200 dark:border-white/10"
            }`}
          >
            {t.auditFilterGateway} ({stats.gateway})
          </button>
          <button
            onClick={() => setSelectedFilter("CLARIFICATION")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedFilter === "CLARIFICATION"
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-slate-50 dark:bg-dark-navy text-muted-gray hover:text-amber-600 border border-slate-200 dark:border-white/10"
            }`}
          >
            {t.auditFilterClarification} ({stats.clarifications})
          </button>
        </div>
      </div>

      {/* Main Audit Table */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-deep-navy shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 dark:bg-dark-navy/60 border-b border-slate-200 dark:border-white/10 text-muted-gray font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">{t.auditColLogIdTime}</th>
                <th className="py-3 px-4">{t.auditColTenderRef}</th>
                <th className="py-3 px-4">{t.auditColBidderSubsystem}</th>
                <th className="py-3 px-4">{t.auditColActionAuthority}</th>
                <th className="py-3 px-4">{t.auditColAuditorAgent}</th>
                <th className="py-3 px-4">{t.auditColStatus}</th>
                <th className="py-3 px-4">{t.auditColShaDigest}</th>
                <th className="py-3 px-4 text-right">{t.auditColDetails}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80 dark:divide-white/[0.08]">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-muted-gray">
                    <Filter className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="font-semibold">{t.auditNoRecords}</p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedFilter("ALL");
                      }}
                      className="mt-2 text-gov-blue-600 dark:text-gov-blue-400 hover:underline text-xs"
                    >
                      {t.auditResetFilters}
                    </button>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    onClick={() => setSelectedLog(log)}
                    className="hover:bg-slate-50 dark:hover:bg-dark-navy/50 transition-colors cursor-pointer group"
                  >
                    {/* Log ID & Timestamp */}
                    <td className="py-3.5 px-4 font-mono">
                      <span className="font-bold text-deep-navy dark:text-crisp-white group-hover:text-gov-blue-600 transition-colors block">
                        {log.id}
                      </span>
                      <span className="text-[10px] text-muted-gray">
                        {new Date(log.timestamp).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </span>
                    </td>

                    {/* Tender ID */}
                    <td className="py-3.5 px-4 font-mono text-muted-gray">
                      <span className="truncate block max-w-[130px]" title={log.tenderId}>
                        {log.tenderId}
                      </span>
                    </td>

                    {/* Bidder / Subsystem */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-deep-navy dark:text-crisp-white max-w-[180px] truncate" title={log.bidderName}>
                        {log.bidderName}
                      </div>
                      <div className="text-[10px] text-muted-gray font-mono">
                        {log.bidderId}
                      </div>
                    </td>

                    {/* Action & Statutory Clause */}
                    <td className="py-3.5 px-4 max-w-[280px]">
                      <span className="font-semibold text-deep-navy dark:text-crisp-white block">
                        {log.action}
                      </span>
                      {log.statutoryClause && (
                        <span className="text-[10px] text-gov-blue-600 dark:text-gov-blue-400 font-medium block truncate" title={log.statutoryClause}>
                          § {log.statutoryClause}
                        </span>
                      )}
                      {log.notes && (
                        <p className="text-[10px] text-muted-gray truncate mt-0.5" title={log.notes}>
                          {log.notes}
                        </p>
                      )}
                    </td>

                    {/* Auditor / Officer */}
                    <td className="py-3.5 px-4 font-mono font-bold text-gov-blue-600 dark:text-gov-blue-400">
                      <span className="px-2 py-0.5 rounded bg-gov-blue-50 dark:bg-gov-blue-950/40 text-[11px]">
                        {log.officerId}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(log.status)}`}>
                        {log.status}
                      </span>
                    </td>

                    {/* Cryptographic Hash */}
                    <td className="py-3.5 px-4 font-mono text-[10px]">
                      <div className="flex items-center space-x-1.5">
                        <span className="p-1 rounded bg-slate-50 dark:bg-dark-navy border border-slate-200 dark:border-white/10 block max-w-[90px] truncate text-muted-gray" title={log.hash}>
                          {log.hash.slice(0, 8)}...{log.hash.slice(-4)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(log.hash);
                          }}
                          className="p-1 rounded text-muted-gray hover:text-gov-blue-600 transition-colors"
                          title="Copy full SHA-256 hash"
                        >
                          {copiedHash === log.hash ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Inspect Link */}
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-xs font-semibold text-gov-blue-600 dark:text-gov-blue-400 group-hover:underline inline-flex items-center space-x-1">
                        <span>{t.auditBtnInspect}</span>
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Detail Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-deep-navy border border-slate-200/80 dark:border-white/[0.08] rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-200/80 dark:border-white/[0.08] pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gov-blue-600 dark:text-gov-blue-400">
                    {t.auditModalTitle}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(selectedLog.status)}`}>
                    {selectedLog.status}
                  </span>
                </div>
                <h3 className="text-lg font-black text-deep-navy dark:text-crisp-white mt-1">
                  {selectedLog.id} • {selectedLog.action}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="p-1.5 rounded-xl text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white hover:bg-slate-100 dark:hover:bg-dark-navy transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid Attributes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-navy border border-slate-200 dark:border-white/10">
                <span className="text-muted-gray block font-medium">{t.auditModalTimestamp}</span>
                <span className="font-bold text-deep-navy dark:text-crisp-white">
                  {new Date(selectedLog.timestamp).toLocaleString("en-IN", {
                    dateStyle: "full",
                    timeStyle: "medium",
                  })}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-navy border border-slate-200 dark:border-white/10">
                <span className="text-muted-gray block font-medium">{t.auditModalTenderId}</span>
                <span className="font-bold font-mono text-deep-navy dark:text-crisp-white">
                  {selectedLog.tenderId}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-navy border border-slate-200 dark:border-white/10">
                <span className="text-muted-gray block font-medium">{t.auditModalEntity}</span>
                <span className="font-bold text-deep-navy dark:text-crisp-white">
                  {selectedLog.bidderName}
                </span>
                <span className="text-[10px] text-muted-gray font-mono block">
                  ID: {selectedLog.bidderId}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-dark-navy border border-slate-200 dark:border-white/10">
                <span className="text-muted-gray block font-medium">{t.auditModalAuditor}</span>
                <span className="font-bold font-mono text-gov-blue-600 dark:text-gov-blue-400">
                  {selectedLog.officerId}
                </span>
                {selectedLog.ipAddress && (
                  <span className="text-[10px] text-muted-gray font-mono block">
                    IP: {selectedLog.ipAddress}
                  </span>
                )}
              </div>
            </div>

            {/* Statutory Authority & Legal Citations */}
            {selectedLog.statutoryClause && (
              <div className="p-3.5 rounded-xl bg-gov-blue-50/50 dark:bg-gov-blue-950/20 border border-gov-blue-200 dark:border-gov-blue-900/40 text-xs">
                <span className="font-bold text-gov-blue-600 dark:text-gov-blue-400 block text-[11px] uppercase tracking-wider mb-0.5">
                  {t.auditModalAuthority}
                </span>
                <p className="text-deep-navy dark:text-crisp-white font-medium">
                  {selectedLog.statutoryClause}
                </p>
              </div>
            )}

            {/* Investigation & Audit Notes */}
            {selectedLog.notes && (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-dark-navy/60 border border-slate-200 dark:border-white/10 text-xs">
                <span className="font-bold text-deep-navy dark:text-crisp-white block mb-1">
                  {t.auditModalFindings}
                </span>
                <p className="text-muted-gray leading-relaxed font-sans">
                  {selectedLog.notes}
                </p>
              </div>
            )}

            {/* Cryptographic SHA-256 Ledger Box */}
            <div className="p-3.5 rounded-xl bg-white dark:bg-dark-navy border border-slate-200 dark:border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-deep-navy dark:text-crisp-white flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{t.auditModalDigestTitle}</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-600 font-bold">
                  {t.auditModalVerified}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-deep-navy font-mono text-[11px] text-muted-gray break-all">
                <span>{selectedLog.hash}</span>
                <button
                  onClick={() => copyToClipboard(selectedLog.hash)}
                  className="ml-2 p-1 text-gov-blue-600 hover:underline flex items-center space-x-1 shrink-0"
                >
                  {copiedHash === selectedLog.hash ? (
                    <span className="text-emerald-600 flex items-center space-x-1">
                      <Check className="w-3 h-3" />
                      <span className="text-[10px]">{t.auditModalCopied}</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1">
                      <Copy className="w-3 h-3" />
                      <span className="text-[10px]">{t.auditModalCopy}</span>
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-200/80 dark:border-white/[0.08]">
              <button
                onClick={() => {
                  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(selectedLog, null, 2));
                  const a = document.createElement("a");
                  a.href = dataStr;
                  a.download = `CVC_Record_${selectedLog.id}.json`;
                  a.click();
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-dark-navy border border-slate-200 dark:border-white/10 text-deep-navy dark:text-crisp-white hover:border-gov-blue-400 transition-all"
              >
                {t.auditModalExportJson}
              </button>
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-gov-blue-600 text-white hover:bg-gov-blue-700 transition-all"
              >
                {t.auditModalClose}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
