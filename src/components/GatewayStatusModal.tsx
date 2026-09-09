"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Activity, Database } from "lucide-react";
import { useTenderData } from "@/context/TenderDataContext";
import { useLanguage } from "@/context/LanguageContext";

interface GatewayStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GatewayStatusModal({ isOpen, onClose }: GatewayStatusModalProps) {
  const { gateways } = useTenderData();
  const { t, language } = useLanguage();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-4xl max-h-[85vh] bg-white dark:bg-deep-navy border border-slate-200/80 dark:border-white/[0.08] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-deep-navy dark:text-crisp-white"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-200/80 dark:border-white/[0.08] flex items-center justify-between bg-slate-50 dark:bg-dark-navy/60">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-gov-blue-50 dark:bg-gov-blue-950/40 text-gov-blue-600 dark:text-gov-blue-400">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-deep-navy dark:text-crisp-white">
                  {t.modalGatewayTitle}
                </h2>
                <p className="text-xs text-muted-gray">
                  {language === "hi"
                    ? "सरकारी पोर्टल और वैधानिक डेटाबेस स्थिति"
                    : "Official Government Registries & Source-of-Truth Status"}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gateways.map((gw) => (
                <div
                  key={gw.id}
                  className="p-4 rounded-xl border border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-dark-navy/60 hover:border-gov-blue-300 dark:hover:border-gov-blue-800 transition-all space-y-2.5 shadow-xs"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-muted-gray">
                        {gw.authority}
                      </span>
                      <h3 className="text-sm font-bold text-deep-navy dark:text-crisp-white flex items-center space-x-2">
                        <span>{gw.name}</span>
                      </h3>
                    </div>
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{language === "hi" ? "सक्रिय" : gw.status}</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {gw.statutory_scope}
                  </p>

                  <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-muted-gray">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-3.5 h-3.5 text-gov-blue-600 dark:text-gov-blue-400" />
                      <span>{language === "hi" ? "विलंबता: " : "Latency: "}<strong className="text-deep-navy dark:text-crisp-white">{gw.latency_ms}ms</strong></span>
                      <span>{language === "hi" ? "• अपटाइम: " : "• Uptime: "}<strong className="text-emerald-600">{gw.success_rate}</strong></span>
                    </div>
                    <span>{gw.last_sync}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200/80 dark:border-white/[0.08] bg-slate-50 dark:bg-dark-navy/40 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-gov-blue-600 text-white hover:bg-gov-blue-700 transition-all shadow-xs"
            >
              {t.modalClose}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
