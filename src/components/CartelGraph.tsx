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
        title: isHi ? "विक्रेता स्वतंत्रता मूल्यांकन:" : "Vendor Independence Assessment:",
        badge: isHi ? "सत्यापित स्वतंत्र" : "Verified Clean",
        badgeColor: "bg-mint-green/20 text-mint-green border-mint-green/40",
        findings: [
          {
            type: "success",
            text: isHi
              ? "स्वतंत्र निदेशक बोर्ड: किसी अन्य प्रतिस्पर्धी बोलीदाता के साथ साझा DIN नहीं (निदेशक: एस. रामनाथन, DIN 07812940)।"
              : "Independent Board: No overlapping directorships with competing bidders (Director: S. Ramanathan, DIN 07812940).",
          },
          {
            type: "success",
            text: isHi
              ? "पृथक नेटवर्क अवसंरचना: चेन्नई स्थित स्वतंत्र कॉर्पोरेट फाइबर लाइन (आईपी 122.178.91.44) से सुरक्षित बोली अपलोड।"
              : "Segregated IP Infrastructure: Uploaded via dedicated corporate broadband in Chennai (IP 122.178.91.44).",
          },
          {
            type: "success",
            text: isHi
              ? "शून्य सिंडिकेट मिलीभगत: एपेक्स समूह की प्रॉक्सी बोलियों और ओखला सर्वर क्लस्टर से पूर्णतः असंबद्ध।"
              : "Zero Cartel Ties: Fully decoupled from the Apex proxy bidding syndicate and Okhla IP cluster.",
          },
        ],
      };

    case "BID-002":
      return {
        title: isHi ? "विक्रेता अनुपालन एवं स्वतंत्रता मूल्यांकन:" : "Vendor Compliance & Independence:",
        badge: isHi ? "गैर-कार्टेल / प्रक्रियात्मक" : "Non-Cartel / Procedural",
        badgeColor: "bg-amber-500/20 text-amber-500 border-amber-500/40",
        findings: [
          {
            type: "info",
            text: isHi
              ? "स्वतंत्र स्वामित्व: किसी भी अन्य बोलीदाता के साथ कोई साझा निदेशक, बैंक शाखा या अपलोड सबनेट नहीं।"
              : "Independent Ownership: Zero shared directorships, common bank branches, or upload subnets with other bidders.",
          },
          {
            type: "warning",
            text: isHi
              ? "प्रक्रियात्मक विसंगति: अनिवार्य विनिर्माण NIC 28132 के बजाय सेवा NIC 74909 के तहत पंजीकृत (दस्तावेजी स्पष्टीकरण आवश्यक)।"
              : "Procedural Mismatch: Registered under Services NIC 74909 instead of mandatory Manufacturing NIC 28132 (clarification pending).",
          },
        ],
      };

    case "BID-003":
    case "BID-004":
      return {
        title: isHi ? "सिंडिकेट मिलीभगत विश्लेषण (4 साक्ष्य):" : "Syndicate Nexus Breakdown (4 Collusive Links):",
        badge: isHi ? "उच्च जोखिम सिंडिकेट" : "High-Risk Syndicate",
        badgeColor: "bg-coral-orange/20 text-coral-orange border-coral-orange/40",
        findings: [
          {
            type: "critical",
            text: isHi
              ? "साझा निदेशक DIN 08492019 (विक्रम सिंघल) दोनों कंपनियों के प्रबंधन और स्वामित्व को नियंत्रित करता है।"
              : "Common Director DIN 08492019 (Vikram Singhal) controls designated management in both competing entities.",
          },
          {
            type: "critical",
            text: isHi
              ? "समान बोली अपलोड सबनेट: 192.168.44.0/24 (ओखला, नई दिल्ली में 4 मिनट 12 सेकंड के अंतराल में अपलोड)।"
              : "Identical Bid Upload IP Subnet: 192.168.44.0/24 (Uploaded within 4 mins 12 secs from same physical facility).",
          },
          {
            type: "critical",
            text: isHi
              ? "समान बैंक शाखा एवं IFSC: HDFC0001294 (ओखला औद्योगिक क्षेत्र शाखा) में ईएमडी खाते खोले गए।"
              : "Matching Bank Branch & IFSC: HDFC0001294 (Okhla Industrial Area) used for EMD security deposits.",
          },
          {
            type: "critical",
            text: isHi
              ? "समान डिजिटल टूल हैश: दोनों कंपनियों के सीए प्रमाणपत्र Adobe Photoshop CC 2024 (Macintosh) पर तैयार किए गए।"
              : "Identical PDF Creator Tool Hash: CA certificates for both bidders were altered on the same Adobe Photoshop CC 2024 workstation.",
          },
        ],
      };

    case "DIN-08492019":
      return {
        title: isHi ? "निदेशक पद मिलीभगत साक्ष्य:" : "Directorship Collusion Evidence:",
        badge: isHi ? "साझा निदेशक DIN" : "Shared Director DIN",
        badgeColor: "bg-coral-orange/20 text-coral-orange border-coral-orange/40",
        findings: [
          {
            type: "critical",
            text: isHi
              ? "एमसीए21 पोर्टल पुष्टि करता है कि विक्रम सिंघल (DIN 08492019) एपेक्स इंजीनियरिंग और एपेक्स फ्लो डायनेमिक्स दोनों में सक्रिय निदेशक हैं।"
              : "MCA21 corporate registry confirms Vikram Singhal (DIN 08492019) holds active directorship across both Apex entities.",
          },
          {
            type: "critical",
            text: isHi
              ? "यह GeM GTC खंड 14 और प्रतिस्पर्धा अधिनियम 2002 का सीधा उल्लंघन है, जो संबंधित संस्थाओं को एक साथ बोली लगाने से रोकता है।"
              : "Direct violation of GeM GTC Clause 14 & Competition Act 2002 prohibiting dual bid submission by related parties.",
          },
        ],
      };

    case "IP-SUBNET":
      return {
        title: isHi ? "नेटवर्क अपलोड मिलीभगत साक्ष्य:" : "Network Infrastructure Nexus:",
        badge: isHi ? "समान आईपी सबनेट" : "Identical IP Subnet",
        badgeColor: "bg-coral-orange/20 text-coral-orange border-coral-orange/40",
        findings: [
          {
            type: "critical",
            text: isHi
              ? "दोनों प्रतिस्पर्धी बोलियां 252 सेकंड के भीतर स्थिर सबनेट 192.168.44.0/24 (ओखला, दिल्ली) से GeM सर्वर पर सबमिट की गईं।"
              : "Both bids submitted to GeM gateway from static subnet 192.168.44.0/24 (Okhla, New Delhi) within 252 seconds.",
          },
          {
            type: "critical",
            text: isHi
              ? "समान डिजिटल गेटवे मूल साबित करता है कि दोनों बोलियां एक ही कार्यालय से समन्वित रूप से भेजी गईं।"
              : "Confirms proxy bid coordination from the exact same physical office facility.",
          },
        ],
      };

    case "BANK-HDFC":
      return {
        title: isHi ? "बैंकिंग एवं ईएमडी मिलीभगत साक्ष्य:" : "Banking & EMD Nexus Evidence:",
        badge: isHi ? "समान बैंक शाखा" : "Common Bank Branch",
        badgeColor: "bg-amber-500/20 text-amber-500 border-amber-500/40",
        findings: [
          {
            type: "warning",
            text: isHi
              ? "दोनों बोलीदाताओं ने HDFC बैंक, ओखला औद्योगिक क्षेत्र शाखा (IFSC: HDFC0001294) से ईएमडी बैंक गारंटी प्राप्त की।"
              : "Both bidders secured EMD bank guarantees and accounts from HDFC Bank, Okhla Industrial Area (IFSC: HDFC0001294).",
          },
          {
            type: "warning",
            text: isHi
              ? "वित्तीय संस्थागत लिंकेज साबित करता है कि दोनों संस्थाएं एक ही वित्तीय सलाहकार द्वारा प्रबंधित हैं।"
              : "Institutional financial linkage demonstrates coordinated banking and treasury management.",
          },
        ],
      };

    case "PDF-METADATA":
      return {
        title: isHi ? "डिजिटल दस्तावेज़ फोरेंसिक साक्ष्य:" : "Document Forensics Nexus:",
        badge: isHi ? "समान सॉफ्टवेयर हैश" : "Matching XMP Hash",
        badgeColor: "bg-coral-orange/20 text-coral-orange border-coral-orange/40",
        findings: [
          {
            type: "critical",
            text: isHi
              ? "दोनों बोलीदाताओं के सीए टर्नओवर प्रमाणपत्रों में समान एक्सएमपी मेटाडेटा (Adobe Photoshop CC 2024 - Macintosh) पाया गया।"
              : "XMP metadata build hash in both bidders' CA certificates matches Adobe Photoshop CC 2024 (Macintosh).",
          },
          {
            type: "critical",
            text: isHi
              ? "फोरेंसिक विश्लेषण से प्रमाणित होता है कि दोनों दस्तावेज़ एक ही मैक वर्कस्टेशन पर जाली बनाए गए थे।"
              : "Forensic pixel/metadata analysis proves both statutory documents were prepared on the exact same workstation.",
          },
        ],
      };

    case "DIN-07812940":
      return {
        title: isHi ? "निदेशक स्वतंत्रता सत्यापन:" : "Director Independence Verification:",
        badge: isHi ? "सत्यापित स्वतंत्र" : "Verified Independent",
        badgeColor: "bg-mint-green/20 text-mint-green border-mint-green/40",
        findings: [
          {
            type: "success",
            text: isHi
              ? "एस. रामनाथन (DIN 07812940) केवल ऑरा फ्लो सिस्टम्स में पंजीकृत हैं; अन्य किसी बोलीदाता में कोई हित नहीं है।"
              : "S. Ramanathan (DIN 07812940) is registered exclusively with Aura Flow Systems with no cross-holdings.",
          },
        ],
      };

    case "IP-CHENNAI":
      return {
        title: isHi ? "नेटवर्क अलगाव सत्यापन:" : "Network Segregation Verification:",
        badge: isHi ? "पृथक नेटवर्क" : "Isolated Network",
        badgeColor: "bg-mint-green/20 text-mint-green border-mint-green/40",
        findings: [
          {
            type: "success",
            text: isHi
              ? "आईपी 122.178.91.44 चेन्नई में ऑरा फ्लो सिस्टम्स के नाम पर पंजीकृत एकल-मूल कॉर्पोरेट लीज्ड लाइन है।"
              : "IP 122.178.91.44 is a verified corporate leased line registered solely to Aura Flow Systems in Chennai.",
          },
        ],
      };

    default:
      return {
        title: isHi ? "सिंडिकेट मिलीभगत विश्लेषण:" : "Syndicate Nexus Breakdown:",
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
      if ((node.risk_score || 0) > 70) return "#F4643C"; // Coral Orange
      if ((node.risk_score || 0) > 30) return "#F59E0B"; // Amber
      return "#10B981"; // Mint Green
    }
    if ((node.risk_score || 0) > 70) return "#F4643C";
    return "#6366F1"; // Lavender
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Visualizer Canvas Card */}
      <div className="flex-1 rounded-2xl border border-warm-beige dark:border-warm-beige/20 bg-soft-beige dark:bg-deep-navy shadow-sm overflow-hidden flex flex-col">
        {/* Radar Alert Bar */}
        <div className="p-4 border-b border-warm-beige dark:border-warm-beige/20 bg-coral-orange/15 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2.5">
            <div className="relative p-2 rounded-xl bg-coral-orange/20 text-coral-orange">
              <Radar className="w-5 h-5 animate-spin" style={{ animationDuration: "6s" }} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-coral-orange uppercase tracking-wider flex items-center space-x-2">
                <span>{language === "hi" ? "कार्टेल सिंडिकेट चिन्हित: 94.2% विश्वसनीयता" : "CARTEL SYNDICATE FLAGGED: 94.2% CONFIDENCE"}</span>
                <span className="w-2 h-2 rounded-full bg-coral-orange animate-ping" />
              </h3>
              <p className="text-xs text-deep-navy dark:text-crisp-white">
                {language === "hi" ? (
                  <><strong>एपेक्स इंजीनियरिंग</strong> और <strong>एपेक्स फ्लो डायनेमिक्स</strong> के बीच मिलीभगत सिंडिकेट का पता चला।</>
                ) : (
                  <>Collusive ring detected between <strong>Apex Engineering</strong> and <strong>Apex Flow Dynamics</strong>.</>
                )}
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-coral-orange text-white shadow-xs">
            {language === "hi" ? "GeM GTC खंड 14 का उल्लंघन" : "GeM GTC Cl. 14 Violation"}
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
        <div className="p-3 border-t border-warm-beige dark:border-warm-beige/20 bg-soft-beige/50 dark:bg-deep-navy flex items-center justify-between text-xs text-muted-gray flex-wrap gap-2">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-coral-orange" />
              <span>{language === "hi" ? "मिलीभगत सिंडिकेट नोड" : "Collusive Ring Node"}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-lavender" />
              <span>{language === "hi" ? "साझा अवसंरचना इकाई" : "Infrastructure Entity"}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-mint-green" />
              <span>{language === "hi" ? "स्वतंत्र वास्तविक बोलीदाता" : "Independent Genuine Bidder"}</span>
            </div>
          </div>
          <span className="text-[11px] font-mono">
            {language === "hi" ? "साक्ष्य देखने के लिए किसी भी नोड पर क्लिक करें" : "Click any node to inspect evidence"}
          </span>
        </div>
      </div>

      {/* Side Detail Panel: Node Details & Statutory Evidence */}
      <div className="w-full lg:w-96 rounded-2xl border border-warm-beige dark:border-warm-beige/20 bg-soft-beige dark:bg-deep-navy shadow-sm p-5 flex flex-col justify-between space-y-4">
        {selectedNode ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-warm-beige dark:border-warm-beige/20">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-gray">
                {language === "hi" ? "नोड अन्वेषक" : "Node Inspector"}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  (selectedNode.risk_score || 0) > 70
                    ? "bg-coral-orange/20 text-coral-orange border border-coral-orange/40"
                    : "bg-mint-green/20 text-mint-green border border-mint-green/40"
                }`}
              >
                {language === "hi" ? "जोखिम:" : "Risk:"} {selectedNode.risk_score || 0}%
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-deep-navy dark:text-crisp-white">
                {getCartelNodeLabel(selectedNode.label, language)}
              </h3>
              <span className="text-xs font-mono uppercase text-lavender font-bold">
                {language === "hi" ? "श्रेणी:" : "Category:"} {getCartelNodeType(selectedNode.type, language)}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/20 text-xs space-y-1.5">
              <span className="text-[10px] font-bold uppercase text-muted-gray block">
                {language === "hi" ? "साक्ष्य विवरण" : "Evidence Details"}
              </span>
              <p className="text-deep-navy dark:text-crisp-white leading-relaxed">
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
                      let style = "border-coral-orange/40 bg-coral-orange/10 text-deep-navy dark:text-crisp-white";
                      let IconComponent = AlertTriangle;
                      let iconColor = "text-coral-orange";

                      if (item.type === "success") {
                        style = "border-mint-green/40 bg-mint-green/10 text-deep-navy dark:text-crisp-white";
                        IconComponent = CheckCircle2;
                        iconColor = "text-mint-green";
                      } else if (item.type === "warning") {
                        style = "border-amber-500/40 bg-amber-500/10 text-deep-navy dark:text-crisp-white";
                        IconComponent = AlertTriangle;
                        iconColor = "text-amber-500";
                      } else if (item.type === "info") {
                        style = "border-sky-500/40 bg-sky-500/10 text-deep-navy dark:text-crisp-white";
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
            <div className="pt-2 border-t border-warm-beige dark:border-warm-beige/20">
              <button
                type="button"
                onClick={() => setShowGlobalSummary(!showGlobalSummary)}
                className="flex items-center justify-between w-full p-2 rounded-xl bg-warm-beige/30 dark:bg-dark-navy/60 hover:bg-warm-beige/50 dark:hover:bg-dark-navy transition-colors text-[11px] font-bold text-deep-navy dark:text-crisp-white"
              >
                <span className="flex items-center space-x-1.5">
                  <Radar className="w-3.5 h-3.5 text-coral-orange" />
                  <span>
                    {language === "hi"
                      ? "संपूर्ण निविदा कार्टेल डॉसियर (4 साक्ष्य)"
                      : "Full Tender Syndicate Dossier (4 Links)"}
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
                      className="p-2 rounded-xl border border-coral-orange/30 bg-coral-orange/10 text-deep-navy dark:text-crisp-white flex items-start space-x-2 text-[11px]"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-coral-orange shrink-0 mt-0.5" />
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
              ? "मिलीभगत संकेतकों का निरीक्षण करने के लिए रडार पर किसी भी नेटवर्क नोड पर क्लिक करें।"
              : "Click any network node on the radar to inspect collusion indicators."}
          </div>
        )}

        <div className="p-3 rounded-xl bg-lavender/15 border border-lavender/30 text-[11px] text-muted-gray leading-relaxed">
          {language === "hi" ? (
            <>
              <strong>भारतीय प्रतिस्पर्धा आयोग (CCI) वैधानिक चेतावनी:</strong> सार्वजनिक खरीद निविदाओं में मिलीभगत / कार्टेल बनाना प्रतिस्पर्धा अधिनियम 2002 की धारा 46 के तहत दंडनीय अपराध है।
            </>
          ) : (
            <>
              <strong>Competition Commission of India (CCI) Alert:</strong> Cartelization in CPCL hydrocarbon tenders is punishable under Sec 46 of Competition Act 2002.
            </>
          )}
        </div>
      </div>
    </div>
  );
}
