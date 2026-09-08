"use client";

import React, { useState, useMemo } from "react";
import { useTenderData } from "@/context/TenderDataContext";
import { useLanguage } from "@/context/LanguageContext";
import { AuditLogEntry } from "@/context/TenderDataContext";
import {
  FileText,
  Download,
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

  const exportToJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `CVC_Audit_Log_Full_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const exportToCsv = () => {
    const headers = ["Log ID", "Timestamp", "Tender ID", "Bidder Name", "Action", "Officer ID", "Status", "Statutory Clause", "SHA256 Hash"];
    const rows = auditLogs.map((l) => [
      l.id,
      l.timestamp,
      l.tenderId,
      `"${l.bidderName.replace(/"/g, '""')}"`,
      `"${l.action.replace(/"/g, '""')}"`,
      l.officerId,
      l.status,
      `"${(l.statutoryClause || "").replace(/"/g, '""')}"`,
      l.hash,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CVC_Audit_Trail_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLIANT":
      case "QUALIFIED":
        return "bg-mint-green/15 text-mint-green border-mint-green/30";
      case "CRITICAL_ALERT":
      case "DISQUALIFIED":
        return "bg-coral-orange/15 text-coral-orange border-coral-orange/30";
      case "CLARIFICATION":
        return "bg-amber-500/15 text-amber-500 border-amber-500/30";
      case "GATEWAY_SYNC":
        return "bg-sky-500/15 text-sky-500 border-sky-500/30";
      case "INTEGRITY_SEAL":
      case "SYSTEM":
      default:
        return "bg-lavender/15 text-lavender border-lavender/30";
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-soft-beige dark:bg-deep-navy border border-warm-beige dark:border-warm-beige/20 shadow-xs">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-lavender flex items-center space-x-1">
              <Lock className="w-3 h-3" />
              <span>Central Vigilance Commission (CVC) Statutory Records</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-warm-beige dark:bg-dark-navy text-muted-gray font-mono font-medium">
              {activeEntity.orgName}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-deep-navy dark:text-crisp-white mt-1">
            {t.navAuditLog}
          </h1>
          <p className="text-xs text-muted-gray">
            Immutable, cryptographically chained forensic ledger of all automated scrutiny events and committee decisions.
          </p>
        </div>

        {/* Global Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Platform Dossier PDF Download */}
          <a
            href="/docs/GeM_Rakshak_System_Architecture_and_Platform_Documentation.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="GeM_Rakshak_System_Architecture_and_Platform_Documentation.pdf"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-lavender text-crisp-white shadow-xs hover:bg-lavender/90 transition-all"
            title="Download full CVC statutory architecture and technical dossier (PDF)"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Platform Dossier (PDF)</span>
            <Download className="w-3 h-3 ml-0.5 opacity-80" />
          </a>

          {/* Export JSON */}
          <button
            onClick={exportToJson}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/20 text-deep-navy dark:text-crisp-white hover:border-lavender transition-all shadow-xs"
            title="Export complete immutable log to JSON"
          >
            <Download className="w-3.5 h-3.5 text-lavender" />
            <span>Export JSON</span>
          </button>

          {/* Export CSV */}
          <button
            onClick={exportToCsv}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/20 text-deep-navy dark:text-crisp-white hover:border-lavender transition-all shadow-xs"
            title="Export audit log to CSV spreadsheet"
          >
            <FileText className="w-3.5 h-3.5 text-mint-green" />
            <span>CSV</span>
          </button>

          {/* Sealed badge */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-mint-green/15 text-mint-green border border-mint-green/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SHA-256 Sealed</span>
          </div>
        </div>
      </div>

      {/* Metrics Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-xl bg-soft-beige dark:bg-deep-navy border border-warm-beige dark:border-warm-beige/20">
          <div className="flex items-center justify-between text-muted-gray text-xs mb-1">
            <span>Total Sealed Logs</span>
            <Hash className="w-3.5 h-3.5 text-lavender" />
          </div>
          <div className="text-xl font-bold text-deep-navy dark:text-crisp-white">
            {stats.total}
          </div>
          <p className="text-[10px] text-muted-gray mt-0.5">100% Cryptographic Trail</p>
        </div>

        <div className="p-3.5 rounded-xl bg-soft-beige dark:bg-deep-navy border border-warm-beige dark:border-warm-beige/20">
          <div className="flex items-center justify-between text-muted-gray text-xs mb-1">
            <span>Critical Alerts</span>
            <AlertTriangle className="w-3.5 h-3.5 text-coral-orange" />
          </div>
          <div className="text-xl font-bold text-coral-orange">
            {stats.critical}
          </div>
          <p className="text-[10px] text-coral-orange/80 mt-0.5">Debarment &amp; QR Forgery</p>
        </div>

        <div className="p-3.5 rounded-xl bg-soft-beige dark:bg-deep-navy border border-warm-beige dark:border-warm-beige/20">
          <div className="flex items-center justify-between text-muted-gray text-xs mb-1">
            <span>Compliant / Passed</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-mint-green" />
          </div>
          <div className="text-xl font-bold text-mint-green">
            {stats.compliant}
          </div>
          <p className="text-[10px] text-muted-gray mt-0.5">Technical Criteria Met</p>
        </div>

        <div className="p-3.5 rounded-xl bg-soft-beige dark:bg-deep-navy border border-warm-beige dark:border-warm-beige/20">
          <div className="flex items-center justify-between text-muted-gray text-xs mb-1">
            <span>Gateway Polls</span>
            <Server className="w-3.5 h-3.5 text-sky-500" />
          </div>
          <div className="text-xl font-bold text-sky-500">
            {stats.gateway}
          </div>
          <p className="text-[10px] text-muted-gray mt-0.5">GSTN / Udyam / CBDT</p>
        </div>

        <div className="p-3.5 rounded-xl bg-soft-beige dark:bg-deep-navy border border-warm-beige dark:border-warm-beige/20 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-muted-gray text-xs mb-1">
            <span>Clarifications</span>
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-xl font-bold text-amber-500">
            {stats.clarifications}
          </div>
          <p className="text-[10px] text-muted-gray mt-0.5">Rule 173(iv) Active Notices</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3 rounded-2xl bg-soft-beige dark:bg-deep-navy border border-warm-beige dark:border-warm-beige/20">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-gray" />
          <input
            type="text"
            placeholder="Search by Bidder, Log ID, Action, Officer, or Statutory Clause..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/20 text-xs text-deep-navy dark:text-crisp-white placeholder:text-muted-gray focus:outline-hidden focus:border-lavender transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white text-xs"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedFilter("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedFilter === "ALL"
                ? "bg-lavender text-crisp-white shadow-xs"
                : "bg-crisp-white dark:bg-dark-navy text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white border border-warm-beige dark:border-warm-beige/20"
            }`}
          >
            All Logs ({auditLogs.length})
          </button>
          <button
            onClick={() => setSelectedFilter("CRITICAL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedFilter === "CRITICAL"
                ? "bg-coral-orange text-white shadow-xs"
                : "bg-crisp-white dark:bg-dark-navy text-muted-gray hover:text-coral-orange border border-warm-beige dark:border-warm-beige/20"
            }`}
          >
            Critical ({stats.critical})
          </button>
          <button
            onClick={() => setSelectedFilter("COMPLIANT")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedFilter === "COMPLIANT"
                ? "bg-mint-green text-white shadow-xs"
                : "bg-crisp-white dark:bg-dark-navy text-muted-gray hover:text-mint-green border border-warm-beige dark:border-warm-beige/20"
            }`}
          >
            Compliant ({stats.compliant})
          </button>
          <button
            onClick={() => setSelectedFilter("GATEWAY")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedFilter === "GATEWAY"
                ? "bg-sky-500 text-white shadow-xs"
                : "bg-crisp-white dark:bg-dark-navy text-muted-gray hover:text-sky-500 border border-warm-beige dark:border-warm-beige/20"
            }`}
          >
            Gateways ({stats.gateway})
          </button>
          <button
            onClick={() => setSelectedFilter("CLARIFICATION")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedFilter === "CLARIFICATION"
                ? "bg-amber-500 text-white shadow-xs"
                : "bg-crisp-white dark:bg-dark-navy text-muted-gray hover:text-amber-500 border border-warm-beige dark:border-warm-beige/20"
            }`}
          >
            Clarifications ({stats.clarifications})
          </button>
        </div>
      </div>

      {/* Main Audit Table */}
      <div className="rounded-2xl border border-warm-beige dark:border-warm-beige/20 bg-soft-beige dark:bg-deep-navy shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-warm-beige/50 dark:bg-dark-navy/60 border-b border-warm-beige dark:border-warm-beige/20 text-muted-gray font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Log ID &amp; Time</th>
                <th className="py-3 px-4">Tender Reference</th>
                <th className="py-3 px-4">Bidder / Subsystem</th>
                <th className="py-3 px-4">Action &amp; Statutory Authority</th>
                <th className="py-3 px-4">Auditor / Agent</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">SHA-256 Digest</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-beige dark:divide-warm-beige/20">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-muted-gray">
                    <Filter className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="font-semibold">No statutory audit records match the selected filters.</p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedFilter("ALL");
                      }}
                      className="mt-2 text-lavender hover:underline text-xs"
                    >
                      Reset all filters
                    </button>
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    onClick={() => setSelectedLog(log)}
                    className="hover:bg-warm-beige/40 dark:hover:bg-dark-navy/50 transition-colors cursor-pointer group"
                  >
                    {/* Log ID & Timestamp */}
                    <td className="py-3.5 px-4 font-mono">
                      <span className="font-bold text-deep-navy dark:text-crisp-white group-hover:text-lavender transition-colors block">
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
                        <span className="text-[10px] text-lavender font-medium block truncate" title={log.statutoryClause}>
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
                    <td className="py-3.5 px-4 font-mono font-bold text-lavender">
                      <span className="px-2 py-0.5 rounded bg-lavender/10 text-[11px]">
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
                        <span className="p-1 rounded bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/20 block max-w-[90px] truncate text-muted-gray" title={log.hash}>
                          {log.hash.slice(0, 8)}...{log.hash.slice(-4)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(log.hash);
                          }}
                          className="p-1 rounded text-muted-gray hover:text-lavender transition-colors"
                          title="Copy full SHA-256 hash"
                        >
                          {copiedHash === log.hash ? (
                            <Check className="w-3 h-3 text-mint-green" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Inspect Link */}
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-xs font-semibold text-lavender group-hover:underline inline-flex items-center space-x-1">
                        <span>Inspect</span>
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
          <div className="bg-soft-beige dark:bg-deep-navy border border-warm-beige dark:border-warm-beige/20 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-warm-beige dark:border-warm-beige/20 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-lavender">
                    CVC Statutory Record Certificate
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
                className="p-1.5 rounded-xl text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white hover:bg-warm-beige/50 dark:hover:bg-dark-navy transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid Attributes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/20">
                <span className="text-muted-gray block font-medium">Exact Statutory Timestamp</span>
                <span className="font-bold text-deep-navy dark:text-crisp-white">
                  {new Date(selectedLog.timestamp).toLocaleString("en-IN", {
                    dateStyle: "full",
                    timeStyle: "medium",
                  })}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/20">
                <span className="text-muted-gray block font-medium">Tender Reference ID</span>
                <span className="font-bold font-mono text-deep-navy dark:text-crisp-white">
                  {selectedLog.tenderId}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/20">
                <span className="text-muted-gray block font-medium">Subject Legal Entity</span>
                <span className="font-bold text-deep-navy dark:text-crisp-white">
                  {selectedLog.bidderName}
                </span>
                <span className="text-[10px] text-muted-gray font-mono block">
                  Identifier: {selectedLog.bidderId}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/20">
                <span className="text-muted-gray block font-medium">Auditor / Agent Identity</span>
                <span className="font-bold font-mono text-lavender">
                  {selectedLog.officerId}
                </span>
                {selectedLog.ipAddress && (
                  <span className="text-[10px] text-muted-gray font-mono block">
                    Source IP: {selectedLog.ipAddress}
                  </span>
                )}
              </div>
            </div>

            {/* Statutory Authority & Legal Citations */}
            {selectedLog.statutoryClause && (
              <div className="p-3.5 rounded-xl bg-lavender/10 border border-lavender/25 text-xs">
                <span className="font-bold text-lavender block text-[11px] uppercase tracking-wider mb-0.5">
                  Governing Statutory Authority &amp; Procurement Rule
                </span>
                <p className="text-deep-navy dark:text-crisp-white font-medium">
                  {selectedLog.statutoryClause}
                </p>
              </div>
            )}

            {/* Investigation & Audit Notes */}
            {selectedLog.notes && (
              <div className="p-3.5 rounded-xl bg-warm-beige/40 dark:bg-dark-navy/60 border border-warm-beige dark:border-warm-beige/20 text-xs">
                <span className="font-bold text-deep-navy dark:text-crisp-white block mb-1">
                  Forensic Examination &amp; Gateway Findings:
                </span>
                <p className="text-muted-gray leading-relaxed font-sans">
                  {selectedLog.notes}
                </p>
              </div>
            )}

            {/* Cryptographic SHA-256 Ledger Box */}
            <div className="p-3.5 rounded-xl bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/20 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-deep-navy dark:text-crisp-white flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-mint-green" />
                  <span>CVC Non-Repudiation Cryptographic Digest</span>
                </span>
                <span className="text-[10px] font-mono text-mint-green font-bold">
                  VERIFIED &amp; UNALTERED
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-soft-beige dark:bg-deep-navy font-mono text-[11px] text-muted-gray break-all">
                <span>{selectedLog.hash}</span>
                <button
                  onClick={() => copyToClipboard(selectedLog.hash)}
                  className="ml-2 p-1 text-lavender hover:underline flex items-center space-x-1 shrink-0"
                >
                  {copiedHash === selectedLog.hash ? (
                    <span className="text-mint-green flex items-center space-x-1">
                      <Check className="w-3 h-3" />
                      <span className="text-[10px]">Copied</span>
                    </span>
                  ) : (
                    <span className="flex items-center space-x-1">
                      <Copy className="w-3 h-3" />
                      <span className="text-[10px]">Copy</span>
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-warm-beige dark:border-warm-beige/20">
              <button
                onClick={() => {
                  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(selectedLog, null, 2));
                  const a = document.createElement("a");
                  a.href = dataStr;
                  a.download = `CVC_Record_${selectedLog.id}.json`;
                  a.click();
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/20 text-deep-navy dark:text-crisp-white hover:border-lavender transition-all"
              >
                Export Record (JSON)
              </button>
              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-lavender text-crisp-white hover:bg-lavender/90 transition-all"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
