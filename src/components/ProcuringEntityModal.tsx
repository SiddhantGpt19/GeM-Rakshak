"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Building2,
  Check,
  Sparkles,
  ArrowRight,
  Landmark,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { useTenderData, ActiveProcuringEntity } from "@/context/TenderDataContext";
import { useLanguage } from "@/context/LanguageContext";

interface ProcuringEntityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProcuringEntityModal({ isOpen, onClose }: ProcuringEntityModalProps) {
  const { tenders, activeEntity, setActiveEntity, switchTender } = useTenderData();
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"preset" | "custom">("preset");

  // Custom entity form state
  const [customOrg, setCustomOrg] = useState(activeEntity.orgName);
  const [customDept, setCustomDept] = useState(activeEntity.department);
  const [customTenderId, setCustomTenderId] = useState(activeEntity.tenderId);
  const [customItem, setCustomItem] = useState(activeEntity.itemCategory);

  if (!isOpen) return null;

  const handleSelectPreset = (tenderId: string) => {
    switchTender(tenderId);
    onClose();
  };

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customOrg.trim() || !customTenderId.trim()) return;

    const newEntity: ActiveProcuringEntity = {
      orgName: customOrg.trim(),
      department: customDept.trim() || (language === "hi" ? "सार्वजनिक खरीद विभाग" : "Public Procurement Department"),
      tenderId: customTenderId.trim(),
      itemCategory: customItem.trim() || (language === "hi" ? "औद्योगिक उपकरण एवं वस्तुएं" : "Industrial Equipment & Goods"),
    };

    setActiveEntity(newEntity);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          className="w-full max-w-2xl bg-soft-beige dark:bg-deep-navy border border-warm-beige dark:border-warm-beige/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-deep-navy dark:text-crisp-white max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-5 border-b border-warm-beige dark:border-warm-beige/20 flex items-center justify-between bg-warm-beige/40 dark:bg-dark-navy/60">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-lavender/20 text-lavender">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black tracking-tight">
                  {t.modalEntityTitle}
                </h3>
                <p className="text-xs text-muted-gray">
                  {t.modalEntitySubtitle}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-warm-beige dark:border-warm-beige/20 px-6 pt-3 bg-warm-beige/20 dark:bg-dark-navy/30 gap-4 text-xs font-bold">
            <button
              onClick={() => setActiveTab("preset")}
              className={`pb-2.5 border-b-2 transition-all flex items-center space-x-1.5 ${
                activeTab === "preset"
                  ? "border-lavender text-lavender"
                  : "border-transparent text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white"
              }`}
            >
              <Landmark className="w-4 h-4" />
              <span>{t.modalTabPsu}</span>
            </button>
            <button
              onClick={() => setActiveTab("custom")}
              className={`pb-2.5 border-b-2 transition-all flex items-center space-x-1.5 ${
                activeTab === "custom"
                  ? "border-lavender text-lavender"
                  : "border-transparent text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.modalTabCustom}</span>
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4 overflow-y-auto">
            {activeTab === "preset" && (
              <div className="space-y-3">
                <p className="text-xs text-muted-gray">
                  {language === "hi" ? "नीचे दी गई किसी भी एकीकृत सरकारी इकाई पर सक्रिय खरीद सत्र बदलें:" : "Switch the active procurement session to any of the integrated public entities below:"}
                </p>

                <div className="space-y-2.5">
                  {tenders.map((tender) => {
                    const isSelected = activeEntity.tenderId === tender.tender_id;

                    return (
                      <div
                        key={tender.tender_id}
                        onClick={() => handleSelectPreset(tender.tender_id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                          isSelected
                            ? "border-lavender bg-lavender/10 shadow-sm"
                            : "border-warm-beige dark:border-warm-beige/20 bg-crisp-white dark:bg-dark-navy hover:border-lavender/60 hover:bg-soft-beige/50 dark:hover:bg-deep-navy/80"
                        }`}
                      >
                        <div className="space-y-1 pr-4">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-xs text-deep-navy dark:text-crisp-white">
                              {tender.buyer_organization}
                            </span>
                            {isSelected && (
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-mint-green text-white flex items-center space-x-1">
                                <Check className="w-2.5 h-2.5" />
                                <span>{t.lblActive}</span>
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-muted-gray leading-snug">
                            {tender.title}
                          </p>
                          <div className="flex items-center space-x-3 text-[10px] font-mono text-muted-gray pt-1">
                            <span className="text-lavender font-bold">ID: {tender.tender_id}</span>
                            <span>•</span>
                            <span>{language === "hi" ? `अनुमानित: ₹${(tender.estimated_value_inr / 10000000).toFixed(1)} करोड़` : `Est: ₹${(tender.estimated_value_inr / 10000000).toFixed(1)} Cr`}</span>
                            <span>•</span>
                            <span>{tender.total_bids} {language === "hi" ? "बोलीदाता" : "Bidders"}</span>
                          </div>
                        </div>

                        <div className="shrink-0">
                          {isSelected ? (
                            <div className="w-7 h-7 rounded-full bg-lavender text-crisp-white flex items-center justify-center shadow-sm">
                              <ShieldCheck className="w-4 h-4" />
                            </div>
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-warm-beige/40 dark:bg-deep-navy text-muted-gray group-hover:text-lavender group-hover:bg-lavender/10 flex items-center justify-center transition-colors">
                              <ArrowRight className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "custom" && (
              <form onSubmit={handleApplyCustom} className="space-y-3.5 text-xs">
                <div className="p-3.5 rounded-xl bg-lavender/10 border border-lavender/25 space-y-1">
                  <p className="font-bold text-deep-navy dark:text-crisp-white text-[11px]">
                    {t.modalCustomHeading}
                  </p>
                  <p className="text-muted-gray text-[11px] leading-relaxed">
                    {language === "hi" ? "GeM पर अनुकरण या लाइव ऑडिट हेतु कस्टम मंत्रालय, राज्य विभाग या PSU इकाई निर्धारित करें।" : "Set a custom Ministry, State Department, or PSU entity for simulated evaluation or live auditing on GeM."}
                  </p>
                </div>

                <div>
                  <label className="font-bold text-[11px] text-muted-gray block mb-1">
                    {t.modalLblOrgName}
                  </label>
                  <input
                    type="text"
                    required
                    value={customOrg}
                    onChange={(e) => setCustomOrg(e.target.value)}
                    placeholder={language === "hi" ? "उदा. नेशनल थर्मल पावर कॉर्पोरेशन (NTPC दादरी)" : "e.g. National Thermal Power Corporation (NTPC Dadri)"}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/30 font-medium text-deep-navy dark:text-crisp-white focus:outline-none focus:border-lavender"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[11px] text-muted-gray block mb-1">
                      {t.modalLblDept}
                    </label>
                    <input
                      type="text"
                      value={customDept}
                      onChange={(e) => setCustomDept(e.target.value)}
                      placeholder={language === "hi" ? "उदा. विद्युत मंत्रालय" : "e.g. Ministry of Power"}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/30 font-medium text-deep-navy dark:text-crisp-white focus:outline-none focus:border-lavender"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[11px] text-muted-gray block mb-1">
                      {t.modalLblTenderId}
                    </label>
                    <input
                      type="text"
                      required
                      value={customTenderId}
                      onChange={(e) => setCustomTenderId(e.target.value)}
                      placeholder="e.g. GEM/2026/B/7719284"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/30 font-mono text-deep-navy dark:text-crisp-white focus:outline-none focus:border-lavender"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[11px] text-muted-gray block mb-1">
                    {t.modalLblCategory}
                  </label>
                  <input
                    type="text"
                    value={customItem}
                    onChange={(e) => setCustomItem(e.target.value)}
                    placeholder={language === "hi" ? "उदा. हेवी ड्यूटी टर्बाइन पंप एवं उच्च दबाव वाल्व" : "e.g. Heavy Duty Turbine Pumps & High-Pressure Valves"}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/30 font-medium text-deep-navy dark:text-crisp-white focus:outline-none focus:border-lavender"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-lavender hover:bg-lavender/90 text-crisp-white font-bold transition-all shadow-md shadow-lavender/25 flex items-center justify-center space-x-1.5"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{t.modalBtnApplyScope}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-warm-beige dark:border-warm-beige/20 bg-warm-beige/30 dark:bg-dark-navy/40 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-deep-navy text-crisp-white dark:bg-crisp-white dark:text-deep-navy hover:opacity-90 transition-all shadow-xs"
            >
              {t.modalClose}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
