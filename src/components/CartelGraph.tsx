"use client";

import React, { useState } from "react";
import {
  Radar,
  AlertTriangle,
  CheckCircle2,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { mockCartelGraph } from "@/data/mockCartelGraph";
import { CartelNode } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import {
  Language,
  getCartelNodeLabel,
  getCartelNodeType,
  getCartelNodeDetails,
  getCartelFactorText,
} from "@/lib/translations";

interface NodeFinding {
  text: string;
  type: "critical" | "warning" | "success" | "info";
}

interface NodeBreakdownData {
  title: string;
  badge?: string;
  badgeColor?: string;
  findings: NodeFinding[];
}

function getNodeBreakdown(nodeId: string, language: Language): NodeBreakdownData {
  const isHi = language === "hi";

  switch (nodeId) {
    case "BID-001":
      return {
        title: isHi ? "कंपनी स्थिति: पूर्णतः स्वतंत्र" : "Bidder Status: Independent",
        badge: isHi ? "सत्यापित स्वच्छ" : "Verified Clean",
        badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
        findings: [
          {
            type: "success",
            text: isHi
              ? "अलग निदेशक: निदेशक एस. रामनाथन का किसी अन्य बोलीदाता से कोई संबंध नहीं है।"
              : "Independent Owner: Director has no links to any other competing bidder.",
          },
          {
            type: "success",
            text: isHi
              ? "अलग नेटवर्क: चेन्नई कार्यालय के निजी इंटरनेट कनेक्शन से बोली भेजी गई।"
              : "Separate Location: Bid sent from company office in Chennai.",
          },
          {
            type: "success",
            text: isHi
              ? "शून्य मिलीभगत: एपेक्स समूह की सिंडिकेट गतिविधियों से पूरी तरह मुक्त।"
              : "Zero Collusion: No connections found with other bidders in this tender.",
          },
        ],
      };

    case "BID-002":
      return {
        title: isHi ? "कंपनी स्थिति: अनुपालन समीक्षा" : "Bidder Status: Minor Notice",
        badge: isHi ? "गैर-कार्टेल" : "Non-Cartel",
        badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/30",
        findings: [
          {
            type: "info",
            text: isHi
              ? "अलग मालिक: किसी अन्य कंपनी के साथ कोई साझा निदेशक, बैंक या इंटरनेट नहीं।"
              : "Independent Ownership: No shared owners, bank accounts, or IP addresses.",
          },
          {
            type: "warning",
            text: isHi
              ? "श्रेणी सूचना: विनिर्माण के बजाय सेवा श्रेणी में पंजीकृत (स्पष्टीकरण मांगा गया)।"
              : "Category Note: Registered under services instead of manufacturing category.",
          },
        ],
      };

    case "BID-003":
    case "BID-004":
      return {
        title: isHi ? "मिलीभगत के 4 प्रत्यक्ष प्रमाण:" : "4 Direct Evidence Points of Collusion:",
        badge: isHi ? "उच्च जोखिम कार्टेल" : "High-Risk Syndicate",
        badgeColor: "bg-rose-500/10 text-rose-600 border-rose-500/30",
        findings: [
          {
            type: "critical",
            text: isHi
              ? "साझा निदेशक: विक्रम सिंघल दोनों कंपनियों के मालिक और निदेशक हैं।"
              : "Same Director: Vikram Singhal is a registered director in both companies.",
          },
          {
            type: "critical",
            text: isHi
              ? "समान इंटरनेट पता: दोनों बोलियां 4 मिनट के भीतर एक ही कार्यालय से भेजी गईं।"
              : "Same Location: Both bids submitted 4 minutes apart from the same office IP.",
          },
          {
            type: "critical",
            text: isHi
              ? "समान बैंक शाखा: दोनों कंपनियों ने HDFC ओखला से बैंक गारंटी ली।"
              : "Same Bank Branch: Both opened guarantee accounts at the exact same bank.",
          },
          {
            type: "critical",
            text: isHi
              ? "फोटोशॉप से छेड़छाड़: दोनों सीए प्रमाणपत्र एक ही कंप्यूटर पर एडिट किए गए।"
              : "Edited in Photoshop: Both CA certificates altered on the exact same computer.",
          },
        ],
      };

    case "DIN-08492019":
      return {
        title: isHi ? "निदेशक मिलीभगत प्रमाण:" : "Director Evidence:",
        badge: isHi ? "साझा निदेशक" : "Common Director",
        badgeColor: "bg-rose-500/10 text-rose-600 border-rose-500/30",
        findings: [
          {
            type: "critical",
            text: isHi
              ? "विक्रम सिंघल दोनों प्रतिस्पर्धी कंपनियों में सक्रिय निदेशक हैं।"
              : "Vikram Singhal holds directorship in both competing companies.",
          },
          {
            type: "critical",
            text: isHi
              ? "नियमों का सीधा उल्लंघन: एक ही व्यक्ति दो विरोधी बोलियां नहीं लगा सकता।"
              : "Direct Rule Violation: GeM strictly forbids one owner submitting competing bids.",
          },
        ],
      };

    case "IP-SUBNET":
      return {
        title: isHi ? "स्थान व नेटवर्क प्रमाण:" : "Location & Network Evidence:",
        badge: isHi ? "समान इंटरनेट पता" : "Identical IP Address",
        badgeColor: "bg-rose-500/10 text-rose-600 border-rose-500/30",
        findings: [
          {
            type: "critical",
            text: isHi
              ? "दोनों बोलियां ओखला, नई दिल्ली में एक ही इंटरनेट कनेक्शन से भेजी गईं।"
              : "Both bids uploaded from the exact same Internet subnet (Okhla, New Delhi).",
          },
          {
            type: "critical",
            text: isHi
              ? "प्रॉक्सी बोली की पुष्टि: दोनों कंपनियां एक ही कमरे से संचालित हो रही थीं।"
              : "Proxy Bidding: Proves both companies coordinated bids from the same room.",
          },
        ],
      };

    case "BANK-HDFC":
      return {
        title: isHi ? "बैंक गारंटी प्रमाण:" : "Bank Guarantee Evidence:",
        badge: isHi ? "समान बैंक शाखा" : "Common Bank Branch",
        badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/30",
        findings: [
          {
            type: "warning",
            text: isHi
              ? "दोनों कंपनियों ने HDFC बैंक, ओखला शाखा से अपनी ईएमडी गारंटी प्राप्त की।"
              : "Both bidders secured their EMD bank guarantee from HDFC Bank, Okhla.",
          },
          {
            type: "warning",
            text: isHi
              ? "साझा वित्तीय प्रबंधन: दोनों कंपनियों का खाता एक ही व्यवस्था द्वारा संचालित है।"
              : "Linked Finances: Indicates coordinated financial and treasury management.",
          },
        ],
      };

    case "PDF-METADATA":
      return {
        title: isHi ? "दस्तावेज़ फोरेंसिक प्रमाण:" : "Document Forensics Evidence:",
        badge: isHi ? "समान फोटोशॉप हैश" : "Matching Software Hash",
        badgeColor: "bg-rose-500/10 text-rose-600 border-rose-500/30",
        findings: [
          {
            type: "critical",
            text: isHi
              ? "दोनों कंपनियों के सीए प्रमाणपत्र Photoshop CC 2024 (Mac) में बनाए गए।"
              : "Both bidders' CA certificates were altered using Photoshop CC 2024 (Mac).",
          },
          {
            type: "critical",
            text: isHi
              ? "डिजिटल फिंगरप्रिंट मेल: दोनों जाली फाइलें एक ही कंप्यूटर पर तैयार हुईं।"
              : "Digital Fingerprint Match: Proves both fake documents came from the same laptop.",
          },
        ],
      };

    case "DIN-07812940":
      return {
        title: isHi ? "निदेशक स्वतंत्रता जांच:" : "Director Independence:",
        badge: isHi ? "सत्यापित स्वतंत्र" : "Verified Independent",
        badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
        findings: [
          {
            type: "success",
            text: isHi
              ? "एस. रामनाथन केवल ऑरा फ्लो सिस्टम्स से जुड़े हैं, अन्यत्र कोई हित नहीं।"
              : "S. Ramanathan is registered only with Aura Flow Systems with no other ties.",
          },
        ],
      };

    case "IP-CHENNAI":
      return {
        title: isHi ? "नेटवर्क अलगाव जांच:" : "Network Check:",
        badge: isHi ? "स्वतंत्र नेटवर्क" : "Isolated Network",
        badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
        findings: [
          {
            type: "success",
            text: isHi
              ? "चेन्नई में ऑरा फ्लो सिस्टम्स के नाम पर पंजीकृत स्वतंत्र इंटरनेट लाइन।"
              : "Verified dedicated line registered only to Aura Flow Systems in Chennai.",
          },
        ],
      };

    default:
      return {
        title: isHi ? "मिलीभगत विश्लेषण:" : "Collusion Summary:",
        findings: mockCartelGraph.summary.shared_factors.map((factor) => ({
          type: "critical",
          text: getCartelFactorText(factor, language),
        })),
      };
  }
}

export function CartelGraph() {
  const { language } = useLanguage();
  const [selectedNode, setSelectedNode] = useState<CartelNode | null>(
    mockCartelGraph.nodes.find((n) => n.id === "DIN-08492019") || null
  );
  const [showGlobalSummary, setShowGlobalSummary] = useState(false);

  // Layout node positions in SVG coordinates (viewBox 0 0 800 500)
  const nodePositions: Record<string, { x: number; y: number }> = {
    "BID-001": { x: 140, y: 150 },
    "DIN-07812940": { x: 100, y: 320 },
    "IP-CHENNAI": { x: 220, y: 340 },
    
    "BID-002": { x: 400, y: 80 },

    "BID-003": { x: 500, y: 220 },
    "BID-004": { x: 680, y: 220 },
    "DIN-08492019": { x: 590, y: 120 },
    "IP-SUBNET": { x: 590, y: 340 },
    "BANK-HDFC": { x: 480, y: 410 },
    "PDF-METADATA": { x: 700, y: 400 },
  };

  const getNodeColor = (node: CartelNode) => {
    if (node.type === "bidder") {
      if ((node.risk_score || 0) > 70) return "#DC2626"; // Crimson
      if ((node.risk_score || 0) > 30) return "#D97706"; // Amber
      return "#059669"; // Emerald
    }
    if ((node.risk_score || 0) > 70) return "#DC2626";
    return "#2563EB"; // Gov Blue
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Visualizer Canvas Card */}
      <div className="flex-1 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-deep-navy shadow-xs overflow-hidden flex flex-col">
        {/* Radar Alert Bar */}
        <div className="p-4 border-b border-rose-200 dark:border-rose-900/50 bg-rose-50/70 dark:bg-rose-950/30 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2.5">
            <div className="relative p-2 rounded-xl bg-rose-100 dark:bg-rose-900/50 text-rose-600">
              <Radar className="w-5 h-5 animate-spin" style={{ animationDuration: "6s" }} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider flex items-center space-x-2">
                <span>{language === "hi" ? "कार्टेल मिलीभगत पाई गई: 94% सटीकता" : "CARTEL COLLUSION DETECTED (94% CERTAINTY)"}</span>
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-200">
                {language === "hi" ? (
                  <><strong>एपेक्स इंजीनियरिंग</strong> और <strong>एपेक्स फ्लो</strong> मिलकर बोली लगा रहे हैं।</>
                ) : (
                  <>Coordinated bidding ring detected between <strong>Apex Engineering</strong> and <strong>Apex Flow Dynamics</strong>.</>
                )}
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-600 text-white shadow-xs">
            {language === "hi" ? "नियम 14 का उल्लंघन" : "GeM Rule 14 Violation"}
          </span>
        </div>

        {/* SVG Network Graph */}
        <div className="relative flex-1 min-h-[460px] bg-crisp-white dark:bg-dark-navy p-4 flex items-center justify-center select-none overflow-hidden">
          {/* Radar background grid lines */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
            <div className="w-[300px] h-[300px] rounded-full border-2 border-lavender" />
            <div className="absolute w-[480px] h-[480px] rounded-full border border-lavender" />
            <div className="absolute w-[660px] h-[660px] rounded-full border border-dashed border-lavender" />
          </div>

          <svg viewBox="0 0 800 500" className="w-full h-full max-h-[500px]">
            {/* Edges / Connections */}
            {mockCartelGraph.edges.map((edge, idx) => {
              const start = nodePositions[edge.source];
              const end = nodePositions[edge.target];
              if (!start || !end) return null;

              const isHigh = edge.severity === "high";

              return (
                <g key={`edge-${idx}`}>
                  <line
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke={isHigh ? "#F4643C" : "#647080"}
                    strokeWidth={isHigh ? 2.5 : 1.2}
                    strokeDasharray={isHigh ? "4,4" : "none"}
                    className={isHigh ? "animate-pulse" : "opacity-40"}
                  />
                </g>
              );
            })}

            {/* Nodes */}
            {mockCartelGraph.nodes.map((node) => {
              const pos = nodePositions[node.id];
              if (!pos) return null;

              const isSelected = selectedNode?.id === node.id;
              const isHighRisk = (node.risk_score || 0) > 70;
              const color = getNodeColor(node);

              return (
                <g
                  key={node.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onClick={() => setSelectedNode(node)}
                  className="cursor-pointer group"
                >
                  {/* High risk pulsing ring */}
                  {isHighRisk && (
                    <circle
                      r="26"
                      fill="none"
                      stroke="#F4643C"
                      strokeWidth="2"
                      opacity="0.6"
                      className="animate-ping"
                    />
                  )}

                  {/* Base Circle */}
                  <circle
                    r={isSelected ? "22" : "18"}
                    fill={isSelected ? color : "#0C141C"}
                    stroke={color}
                    strokeWidth={isSelected ? 3 : 2}
                    className="transition-all duration-200"
                  />

                  {/* Label */}
                  <text
                    y="32"
                    textAnchor="middle"
                    className="text-[11px] font-sans font-semibold fill-deep-navy dark:fill-crisp-white"
                  >
                    {(() => {
                      const displayLabel = getCartelNodeLabel(node.label, language);
                      return displayLabel.length > 20 ? `${displayLabel.slice(0, 18)}...` : displayLabel;
                    })()}
                  </text>
                  <text
                    y="45"
                    textAnchor="middle"
                    className="text-[9px] font-mono fill-muted-gray uppercase"
                  >
                    {getCartelNodeType(node.type, language)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend bar */}
        <div className="p-3 border-t border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-dark-navy/60 flex items-center justify-between text-xs text-muted-gray flex-wrap gap-2">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              <span>{language === "hi" ? "मिलीभगत में शामिल बोलीदाता" : "Collusive Bidder"}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span>{language === "hi" ? "साझा इकाई (निदेशक/बैंक/IP)" : "Shared Entity (Director/Bank/IP)"}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <span>{language === "hi" ? "स्वतंत्र बोलीदाता" : "Independent Bidder"}</span>
            </div>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            {language === "hi" ? "विवरण देखने के लिए किसी भी नोड पर क्लिक करें" : "Click any node to see details"}
          </span>
        </div>
      </div>

      {/* Side Detail Panel: Node Details & Statutory Evidence */}
      <div className="w-full lg:w-96 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-deep-navy shadow-xs p-5 flex flex-col justify-between space-y-4">
        {selectedNode ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/[0.08]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-gray">
                {language === "hi" ? "नोड विवरण" : "Node Details"}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  (selectedNode.risk_score || 0) > 70
                    ? "bg-rose-500/10 text-rose-600 border border-rose-500/30"
                    : "bg-emerald-500/10 text-emerald-600 border border-emerald-500/30"
                }`}
              >
                {language === "hi" ? "जोखिम:" : "Risk:"} {selectedNode.risk_score || 0}%
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-deep-navy dark:text-crisp-white">
                {getCartelNodeLabel(selectedNode.label, language)}
              </h3>
              <span className="text-xs font-medium uppercase text-gov-blue-600 dark:text-gov-blue-400 font-bold">
                {language === "hi" ? "श्रेणी:" : "Category:"} {getCartelNodeType(selectedNode.type, language)}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-dark-navy/80 border border-slate-200/60 dark:border-white/10 text-xs space-y-1">
              <span className="text-[10px] font-bold uppercase text-muted-gray block">
                {language === "hi" ? "साक्ष्य विवरण" : "Summary"}
              </span>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
                {getCartelNodeDetails(selectedNode.id, selectedNode.details, language)}
              </p>
            </div>

            {/* Dynamic Node-Specific Findings Breakdown */}
            {(() => {
              const breakdown = getNodeBreakdown(selectedNode.id, language);
              return (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-deep-navy dark:text-crisp-white">
                      {breakdown.title}
                    </span>
                    {breakdown.badge && (
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${breakdown.badgeColor}`}>
                        {breakdown.badge}
                      </span>
                    )}
                  </div>
                  <ul className="space-y-2 text-xs">
                    {breakdown.findings.map((item, i) => {
                      let style = "border-rose-200 dark:border-rose-900/40 bg-rose-50/50 dark:bg-rose-950/20 text-deep-navy dark:text-crisp-white";
                      let IconComponent = AlertTriangle;
                      let iconColor = "text-rose-600";

                      if (item.type === "success") {
                        style = "border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20 text-deep-navy dark:text-crisp-white";
                        IconComponent = CheckCircle2;
                        iconColor = "text-emerald-600";
                      } else if (item.type === "warning") {
                        style = "border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 text-deep-navy dark:text-crisp-white";
                        IconComponent = AlertTriangle;
                        iconColor = "text-amber-500";
                      } else if (item.type === "info") {
                        style = "border-sky-200 dark:border-sky-900/40 bg-sky-50/50 dark:bg-sky-950/20 text-deep-navy dark:text-crisp-white";
                        IconComponent = Info;
                        iconColor = "text-sky-500";
                      }

                      return (
                        <li
                          key={i}
                          className={`p-2.5 rounded-xl border ${style} flex items-start space-x-2`}
                        >
                          <IconComponent className={`w-4 h-4 ${iconColor} shrink-0 mt-0.5`} />
                          <span className="leading-snug text-xs">{item.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })()}

            {/* Collapsible Tender-wide Syndicate Dossier */}
            <div className="pt-2 border-t border-slate-200/80 dark:border-white/[0.08]">
              <button
                type="button"
                onClick={() => setShowGlobalSummary(!showGlobalSummary)}
                className="flex items-center justify-between w-full p-2 rounded-xl bg-slate-100/70 dark:bg-dark-navy hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors text-[11px] font-bold text-deep-navy dark:text-crisp-white"
              >
                <span className="flex items-center space-x-1.5">
                  <Radar className="w-3.5 h-3.5 text-rose-600" />
                  <span>
                    {language === "hi"
                      ? "संपूर्ण कार्टेल रिपोर्ट (4 साक्ष्य)"
                      : "Full Cartel Summary (4 Links)"}
                  </span>
                </span>
                {showGlobalSummary ? (
                  <ChevronUp className="w-3.5 h-3.5 text-muted-gray" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-muted-gray" />
                )}
              </button>

              {showGlobalSummary && (
                <ul className="mt-2 space-y-1.5 text-xs">
                  {mockCartelGraph.summary.shared_factors.map((factor, i) => (
                    <li
                      key={i}
                      className="p-2 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/60 dark:bg-rose-950/20 text-deep-navy dark:text-crisp-white flex items-start space-x-2 text-[11px]"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                      <span>{getCartelFactorText(factor, language)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center p-8 text-muted-gray">
            {language === "hi"
              ? "साक्ष्य देखने के लिए किसी भी नोड पर क्लिक करें।"
              : "Click any node on the graph to inspect evidence."}
          </div>
        )}

        <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-white/[0.03] border border-slate-200/70 dark:border-white/10 text-[11px] text-slate-500 leading-relaxed">
          {language === "hi" ? (
            <>
              <strong>वैधानिक नियम:</strong> सार्वजनिक खरीद निविदाओं में मिलीभगत GeM खंड 14 और प्रतिस्पर्धा अधिनियम 2002 की धारा 46 का उल्लंघन है।
            </>
          ) : (
            <>
              <strong>Rule Notice:</strong> Coordinated bidding and proxy submissions violate GeM Clause 14 and Section 46 of the Competition Act 2002.
            </>
          )}
        </div>
      </div>
    </div>
  );
}
