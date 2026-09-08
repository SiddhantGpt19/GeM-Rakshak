"use client";

import React, { useState } from "react";
import {
  Radar,
  AlertTriangle,
} from "lucide-react";
import { mockCartelGraph } from "@/data/mockCartelGraph";
import { CartelNode } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

export function CartelGraph() {
  const { language } = useLanguage();
  const [selectedNode, setSelectedNode] = useState<CartelNode | null>(
    mockCartelGraph.nodes.find((n) => n.id === "DIN-08492019") || null
  );

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
                    {node.label.length > 20 ? `${node.label.slice(0, 18)}...` : node.label}
                  </text>
                  <text
                    y="45"
                    textAnchor="middle"
                    className="text-[9px] font-mono fill-muted-gray uppercase"
                  >
                    {node.type}
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
                {selectedNode.label}
              </h3>
              <span className="text-xs font-mono uppercase text-lavender font-bold">
                {language === "hi" ? "श्रेणी:" : "Category:"} {selectedNode.type}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-crisp-white dark:bg-dark-navy border border-warm-beige dark:border-warm-beige/20 text-xs space-y-1.5">
              <span className="text-[10px] font-bold uppercase text-muted-gray block">
                {language === "hi" ? "साक्ष्य विवरण" : "Evidence Details"}
              </span>
              <p className="text-deep-navy dark:text-crisp-white leading-relaxed">
                {selectedNode.details}
              </p>
            </div>

            {/* Cartel Factors Summary */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-deep-navy dark:text-crisp-white block">
                {language === "hi" ? "सिंडिकेट मिलीभगत विश्लेषण:" : "Syndicate Nexus Breakdown:"}
              </span>
              <ul className="space-y-2 text-xs">
                {mockCartelGraph.summary.shared_factors.map((factor, i) => (
                  <li
                    key={i}
                    className="p-2.5 rounded-xl border border-coral-orange/40 bg-coral-orange/10 text-deep-navy dark:text-crisp-white flex items-start space-x-2"
                  >
                    <AlertTriangle className="w-4 h-4 text-coral-orange shrink-0 mt-0.5" />
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
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
