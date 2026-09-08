"use client";

import React from "react";
import { useTenderData } from "@/context/TenderDataContext";
import { useLanguage } from "@/context/LanguageContext";

export default function AuditLogPage() {
  const { auditLogs } = useTenderData();
  const { t } = useLanguage();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-soft-beige dark:bg-deep-navy border border-warm-beige dark:border-warm-beige/20 shadow-sm">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-lavender">
            Central Vigilance Commission (CVC) Compliance Records
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-deep-navy dark:text-crisp-white">
            {t.navAuditLog}
          </h1>
          <p className="text-xs text-muted-gray">
            Immutable, cryptographically hashed log of all human-in-the-loop decisions and AI scans
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-mint-green/15 text-mint-green border border-mint-green/30">
            SHA-256 Integrity Sealed
          </span>
        </div>
      </div>

      {/* Audit Table */}
      <div className="rounded-2xl border border-warm-beige dark:border-warm-beige/20 bg-soft-beige dark:bg-deep-navy shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-warm-beige/50 dark:bg-dark-navy/60 border-b border-warm-beige dark:border-warm-beige/20 text-muted-gray font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Log ID & Timestamp</th>
                <th className="py-3 px-4">Tender ID</th>
                <th className="py-3 px-4">Bidder Entity</th>
                <th className="py-3 px-4">Action Taken</th>
                <th className="py-3 px-4">Officer / Agent</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Cryptographic Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-beige dark:divide-warm-beige/20">
              {auditLogs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-warm-beige/30 dark:hover:bg-dark-navy/40 transition-colors"
                >
                  <td className="py-3.5 px-4 font-mono">
                    <span className="font-bold text-deep-navy dark:text-crisp-white block">
                      {log.id}
                    </span>
                    <span className="text-[10px] text-muted-gray">
                      {new Date(log.timestamp).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-muted-gray">
                    {log.tenderId}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-deep-navy dark:text-crisp-white">
                    {log.bidderName}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-deep-navy dark:text-crisp-white">
                      {log.action}
                    </span>
                    {log.notes && (
                      <p className="text-[11px] text-muted-gray truncate max-w-xs mt-0.5">
                        {log.notes}
                      </p>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-lavender font-bold">
                    {log.officerId}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      log.status === "QUALIFIED" || log.status === "COMPLIANT"
                        ? "bg-mint-green/15 text-mint-green"
                        : log.status === "DISQUALIFIED" || log.status === "CRITICAL_ALERT"
                        ? "bg-coral-orange/15 text-coral-orange"
                        : "bg-amber-500/15 text-amber-500"
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[10px] text-muted-gray">
                    <span className="p-1.5 rounded-lg bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/20 block max-w-[130px] truncate" title={log.hash}>
                      {log.hash}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
