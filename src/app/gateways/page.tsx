"use client";

import React, { useState } from "react";
import {
  Activity,
  RefreshCw,
  Cpu,
  Send,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Copy,
  Check,
  Terminal,
  ShieldCheck,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useTenderData } from "@/context/TenderDataContext";
import { useLanguage } from "@/context/LanguageContext";
import { GatewayHealth } from "@/types";
import { getGatewayInfo } from "@/lib/translations";

interface VerificationResponse {
  success: boolean;
  http_status: number;
  query_meta: {
    gateway_id: string;
    authority: string;
    endpoint: string;
    queried_identifier: string;
    execution_latency_ms: number;
    timestamp: string;
  };
  verification_verdict: {
    status: string;
    risk_level: string;
    is_compliant: boolean;
  };
  audit_trail: {
    sha256_digest: string;
    cvc_compliance_certified: boolean;
    node_node_ref: string;
  };
  data: Record<string, unknown>;
}

export default function GatewaysPage() {
  const { gateways: initialGateways, isLiveApiMode, toggleApiMode } = useTenderData();
  const { t, language } = useLanguage();
  
  const [gateways, setGateways] = useState<GatewayHealth[]>(initialGateways);
  const [isPinging, setIsPinging] = useState(false);
  const [lastPingTime, setLastPingTime] = useState("Just now");
  const [averageLatency, setAverageLatency] = useState(136);

  // Live API Console State
  const [selectedGateway, setSelectedGateway] = useState<string>("gstn");
  const [queryInput, setQueryInput] = useState<string>("33AAACA1234F1Z5");
  const [isQuerying, setIsQuerying] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<VerificationResponse | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [showRawJson, setShowRawJson] = useState<boolean>(false);

  // Ping All Gateways via real /api/gateways/ping Next.js backend route
  const handlePingAll = async () => {
    setIsPinging(true);
    try {
      const res = await fetch("/api/gateways/ping");
      if (res.ok) {
        const data = await res.json();
        if (data.gateways) {
          setGateways(data.gateways);
          setAverageLatency(data.average_latency_ms);
          setLastPingTime("Just now");
        }
      }
    } catch {
      // Fallback in case of local network interruption
      setLastPingTime("Just now");
    } finally {
      setIsPinging(false);
    }
  };

  // Execute statutory verification via real /api/verify Next.js backend route
  const handleExecuteVerification = async () => {
    if (!queryInput.trim()) return;
    setIsQuerying(true);
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gateway: selectedGateway,
          identifier: queryInput.trim(),
        }),
      });
      const data = await res.json();
      setApiResponse(data);
    } catch (err) {
      console.error("API verification error:", err);
    } finally {
      setIsQuerying(false);
    }
  };

  const handleCopyJson = () => {
    if (!apiResponse) return;
    navigator.clipboard.writeText(JSON.stringify(apiResponse, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Presets for instant testing
  const presets = [
    {
      label: language === "hi" ? "ऑरा फ्लो (वैध GSTIN)" : "Aura Flow (Valid GSTIN)",
      gateway: "gstn",
      identifier: "33AAACA1234F1Z5",
      type: "compliant",
    },
    {
      label: language === "hi" ? "भारत पेट्रो (सेवा उद्यम)" : "Bharat Petro (Service Udyam)",
      gateway: "udyam",
      identifier: "UDYAM-MH-02-0044812",
      type: "warning",
    },
    {
      label: language === "hi" ? "एपेक्स इंजी (प्रतिबंधित / निलंबित GST)" : "Apex Eng (Debarred / Suspended GST)",
      gateway: "gstn",
      identifier: "07AAACD9988P1Z3",
      type: "danger",
    },
    {
      label: language === "hi" ? "CPPP ब्लैकलिस्ट जांच (एपेक्स)" : "CPPP Blacklist Check (Apex)",
      gateway: "cppp",
      identifier: "AAACD9988P",
      type: "danger",
    },
    {
      label: language === "hi" ? "MCA21 कॉर्पोरेट CIN" : "MCA21 Corporate CIN",
      gateway: "mca21",
      identifier: "U29100TN2018PTC120491",
      type: "compliant",
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-soft-beige dark:bg-deep-navy border border-warm-beige dark:border-warm-beige/20 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-lavender">
              {t.gwInfraTitle}
            </span>
            <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-mint-green/15 text-mint-green border border-mint-green/30">
              {t.gwAvgLatency}: {averageLatency}ms
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-deep-navy dark:text-crisp-white">
            {t.gwPageTitle} {language === "hi" ? "(8 वैधानिक प्राधिकरण)" : "(8 Authorities)"}
          </h1>
          <p className="text-xs text-muted-gray">
            {t.gwPageSubtitle}
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={toggleApiMode}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-crisp-white dark:bg-dark-navy text-deep-navy dark:text-crisp-white border border-warm-beige dark:border-warm-beige/20 hover:border-lavender transition-all"
            title="Toggle between local sandbox simulation and live gateway routing"
          >
            <Cpu className="w-3.5 h-3.5 text-lavender" />
            <span>{t.gwMode}: {isLiveApiMode ? t.liveGateway : t.mockSandbox}</span>
          </button>

          <button
            onClick={handlePingAll}
            disabled={isPinging}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-lavender hover:bg-lavender/90 text-crisp-white shadow-md shadow-lavender/25 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? "animate-spin" : ""}`} />
            <span>{isPinging ? t.gwPinging : t.gwPingAll}</span>
          </button>
        </div>
      </div>

      {/* Production Architecture Banner */}
      <div className="p-4 rounded-xl border border-lavender/30 bg-lavender/5 flex items-start space-x-3 text-xs">
        <Zap className="w-5 h-5 text-lavender shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-deep-navy dark:text-crisp-white">
            {t.gwArchTitle}
          </h4>
          <p className="text-muted-gray leading-relaxed">
            {t.gwArchDesc}
          </p>
        </div>
      </div>

      {/* Interactive Statutory API Sandbox & Query Console */}
      <div className="p-5 rounded-2xl border border-warm-beige dark:border-warm-beige/20 bg-soft-beige dark:bg-deep-navy shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-warm-beige dark:border-warm-beige/20 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-lavender/20 flex items-center justify-center text-lavender">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-deep-navy dark:text-crisp-white">
                {t.gwSandboxTitle}
              </h2>
              <p className="text-[11px] text-muted-gray">
                {t.gwSandboxSubtitle}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-1 rounded bg-crisp-white dark:bg-dark-navy text-muted-gray border border-warm-beige dark:border-warm-beige/20">
            POST /api/verify
          </span>
        </div>

        {/* Preset Buttons */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-gray">
            {t.gwPresetsLabel}
          </span>
          <div className="flex flex-wrap gap-2">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedGateway(preset.gateway);
                  setQueryInput(preset.identifier);
                }}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all ${
                  preset.type === "compliant"
                    ? "bg-mint-green/10 text-mint-green border-mint-green/30 hover:bg-mint-green/20"
                    : preset.type === "warning"
                    ? "bg-amber-500/10 text-amber-500 border-amber-500/30 hover:bg-amber-500/20"
                    : "bg-coral-orange/10 text-coral-orange border-coral-orange/30 hover:bg-coral-orange/20"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
          <div className="sm:col-span-4">
            <label className="block text-[11px] font-bold text-muted-gray mb-1">
              {t.gwSelectGateway}:
            </label>
            <select
              value={selectedGateway}
              onChange={(e) => setSelectedGateway(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2 rounded-xl bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/20 text-deep-navy dark:text-crisp-white focus:outline-none focus:border-lavender"
            >
              <option value="gstn">{language === "hi" ? "जीएसटीएन एपीआई गेटवे (GSTIN)" : "GSTN API Gateway (GSTIN)"}</option>
              <option value="mca21">{language === "hi" ? "एमसीए21 V3 रजिस्ट्री (CIN)" : "MCA21 V3 Registry (CIN)"}</option>
              <option value="pan">{language === "hi" ? "आयकर / सीबीडीटी (PAN)" : "Income Tax / CBDT (PAN)"}</option>
              <option value="udyam">{language === "hi" ? "उद्यम एमएसएमई पोर्टल (Udyam No)" : "Udyam MSME Portal (Udyam No)"}</option>
              <option value="cppp">{language === "hi" ? "सीपीपीपी केंद्रीय प्रतिबंध रजिस्ट्री (CPPP)" : "CPPP Central Debarment Registry"}</option>
            </select>
          </div>

          <div className="sm:col-span-6">
            <label className="block text-[11px] font-bold text-muted-gray mb-1">
              {t.gwTargetIdentifier}:
            </label>
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder={language === "hi" ? "जीएसटी, सीआईएन, पैन या उद्यम संख्या दर्ज करें..." : "Enter GSTIN, CIN, PAN, or Udyam number..."}
              className="w-full text-xs font-mono px-3 py-2 rounded-xl bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/20 text-deep-navy dark:text-crisp-white focus:outline-none focus:border-lavender uppercase"
            />
          </div>

          <div className="sm:col-span-2 flex items-end">
            <button
              onClick={handleExecuteVerification}
              disabled={isQuerying}
              className="w-full flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-lavender hover:bg-lavender/90 text-crisp-white shadow-md shadow-lavender/25 transition-all disabled:opacity-50"
            >
              <Send className={`w-3.5 h-3.5 ${isQuerying ? "animate-pulse" : ""}`} />
              <span>{isQuerying ? t.gwVerifying : t.gwBtnVerify}</span>
            </button>
          </div>
        </div>

        {/* Live Response Inspector */}
        {apiResponse && (
          <div className="pt-3 border-t border-warm-beige dark:border-warm-beige/20 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-xl bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/20">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-mint-green/20 text-mint-green">
                  HTTP {apiResponse.http_status} OK
                </span>
                <span className="text-xs font-semibold text-deep-navy dark:text-crisp-white">
                  {t.gwLatency}: {apiResponse.query_meta.execution_latency_ms}ms
                </span>
                <span className="text-[11px] text-muted-gray">
                  • {t.gwAuthority}: {apiResponse.query_meta.authority}
                </span>
              </div>

              {/* Status Verdict Pill & Actions */}
              <div className="flex items-center space-x-2">
                {apiResponse.verification_verdict.status === "VERIFIED_COMPLIANT" && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-mint-green/15 text-mint-green border border-mint-green/30">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{t.statusCompliant}</span>
                  </span>
                )}
                {apiResponse.verification_verdict.status === "CLARIFICATION_NEEDED" && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30">
                    <AlertTriangle className="w-3 h-3" />
                    <span>{t.statusClarification}</span>
                  </span>
                )}
                {(apiResponse.verification_verdict.status === "CRITICAL_FRAUD_FLAG" ||
                  apiResponse.verification_verdict.status === "DEBARRED_VENDOR_BAN") && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-coral-orange/15 text-coral-orange border border-coral-orange/30 animate-pulse">
                    <XCircle className="w-3 h-3" />
                    <span>{t.statusDebarred}</span>
                  </span>
                )}

                <button
                  onClick={() => setShowRawJson(!showRawJson)}
                  className="flex items-center space-x-1 text-[11px] font-semibold text-lavender hover:bg-lavender/10 px-2 py-1 rounded-lg transition-all"
                  title="Toggle raw JSON response"
                >
                  <span>{showRawJson ? (language === "hi" ? "JSON छिपाएं" : "Hide JSON") : (language === "hi" ? "रॉ JSON देखें" : "View JSON")}</span>
                  {showRawJson ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>

                <button
                  onClick={handleCopyJson}
                  className="p-1.5 rounded-lg text-muted-gray hover:text-deep-navy dark:hover:text-crisp-white hover:bg-warm-beige/40 dark:hover:bg-white/5 transition-all"
                  title={t.gwBtnCopy}
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-mint-green" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Expandable JSON Code Block */}
            {showRawJson && (
              <pre className="p-3.5 rounded-xl bg-deep-navy text-crisp-white font-mono text-[11px] overflow-x-auto max-h-72 leading-relaxed border border-warm-beige/20 shadow-inner">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            )}

            {/* SHA-256 Audit Trail */}
            <div className="flex items-center justify-between text-[10px] font-mono text-muted-gray pt-1">
              <span className="flex items-center space-x-1 truncate max-w-md">
                <ShieldCheck className="w-3 h-3 text-lavender shrink-0" />
                <span className="truncate">{t.gwDigestTitle}: {apiResponse.audit_trail.sha256_digest}</span>
              </span>
              <span>Node: {apiResponse.audit_trail.node_node_ref}</span>
            </div>
          </div>
        )}
      </div>

      {/* Gateway Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gateways.map((gw) => {
          const info = getGatewayInfo(gw, language);
          return (
            <div
              key={gw.id}
              className="p-5 rounded-2xl border border-warm-beige/70 dark:border-white/10 bg-soft-beige/40 dark:bg-deep-navy shadow-xs space-y-3 hover:border-lavender/50 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-muted-gray">
                    {info.authority}
                  </span>
                  <h3 className="text-base font-bold text-deep-navy dark:text-crisp-white">
                    {info.name}
                  </h3>
                </div>
                <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-mint-green/15 text-mint-green border border-mint-green/30">
                  <span className="w-2 h-2 rounded-full bg-mint-green animate-pulse" />
                  <span>{language === "hi" ? "सक्रिय" : gw.status}</span>
                </span>
              </div>

              <p className="text-xs text-muted-gray leading-relaxed">
                {info.statutory_scope}
              </p>

              <div className="p-2.5 rounded-xl bg-crisp-white dark:bg-dark-navy font-mono text-[11px] text-muted-gray border border-warm-beige dark:border-warm-beige/20 break-all">
                {t.gwEndpoint}: <span className="text-deep-navy dark:text-crisp-white">{gw.endpoint}</span>
              </div>

            <div className="pt-3 border-t border-warm-beige dark:border-warm-beige/20 flex items-center justify-between text-xs font-mono text-muted-gray">
              <div className="flex items-center space-x-3">
                <span className="flex items-center space-x-1 text-deep-navy dark:text-crisp-white">
                  <Activity className="w-3.5 h-3.5 text-lavender" />
                  <strong>{gw.latency_ms}ms</strong>
                </span>
                <span>{t.gwUptime}: <strong className="text-mint-green">{gw.success_rate}</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    const presetMatch = presets.find((p) => p.gateway === gw.id);
                    if (presetMatch) {
                      setSelectedGateway(presetMatch.gateway);
                      setQueryInput(presetMatch.identifier);
                    } else {
                      setSelectedGateway(gw.id);
                      setQueryInput("TEST-QUERY-001");
                    }
                    window.scrollTo({ top: 120, behavior: "smooth" });
                  }}
                  className="text-[10px] font-bold text-lavender hover:underline"
                >
                  {language === "hi" ? "कंसोल में जांचें ↑" : "Test in Console ↑"}
                </button>
                <span>• {language === "hi" ? "अभी" : lastPingTime}</span>
              </div>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
}
