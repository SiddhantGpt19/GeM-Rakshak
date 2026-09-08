"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Bidder, TenderMetadata, GatewayHealth } from "@/types";
import { mockTenders } from "@/data/mockTenders";
import { mockBidders } from "@/data/mockBidders";
import { mockGateways } from "@/data/mockGateways";

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  tenderId: string;
  bidderId: string;
  bidderName: string;
  action: string;
  officerId: string;
  status: string;
  notes?: string;
  hash: string;
  category?: "EVALUATION" | "FORENSICS" | "GATEWAY" | "OFFICER_DECISION" | "CARTEL_RADAR" | "CLARIFICATION" | "SYSTEM";
  statutoryClause?: string;
  ipAddress?: string;
}

export interface ActiveProcuringEntity {
  orgName: string;
  department: string;
  tenderId: string;
  itemCategory: string;
}

interface TenderDataContextType {
  tenders: TenderMetadata[];
  bidders: Bidder[];
  gateways: GatewayHealth[];
  auditLogs: AuditLogEntry[];
  isLiveApiMode: boolean;
  activeEntity: ActiveProcuringEntity;
  setActiveEntity: (entity: ActiveProcuringEntity) => void;
  switchTender: (tenderId: string) => void;
  toggleApiMode: () => void;
  getBidderById: (bidderId: string) => Bidder | undefined;
  getTenderById: (tenderId: string) => TenderMetadata | undefined;
  qualifyBidder: (bidderId: string, notes?: string) => void;
  disqualifyBidder: (bidderId: string, notes: string) => void;
  sendClarificationNotice: (bidderId: string, noticeText: string) => void;
}

const TenderDataContext = createContext<TenderDataContextType | undefined>(undefined);

export function TenderDataProvider({ children }: { children: React.ReactNode }) {
  const [tenders] = useState<TenderMetadata[]>(mockTenders);
  const [bidders, setBidders] = useState<Bidder[]>(mockBidders);
  const [gateways] = useState<GatewayHealth[]>(mockGateways);
  const [isLiveApiMode, setIsLiveApiMode] = useState<boolean>(false);
  const [activeEntity, setActiveEntityState] = useState<ActiveProcuringEntity>({
    orgName: "CPCL Manali Refinery",
    department: "Ministry of Petroleum & Natural Gas",
    tenderId: "GEM/2026/B/9823410",
    itemCategory: "High Pressure Centrifugal Flow Pumps & Critical Valves",
  });
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([
    {
      id: "LOG-9825",
      timestamp: "2026-09-08T11:45:00+05:30",
      tenderId: "GEM/2026/B/9823410",
      bidderId: "ALL-SYSTEM",
      bidderName: "CPCL Procurement Vigilance Enclave",
      action: "CVC Statutory Block Seal & Integrity Merkle Root Anchored",
      officerId: "CVC-SECURITY-ENCLAVE",
      status: "INTEGRITY_SEAL",
      category: "SYSTEM",
      statutoryClause: "CVC Circular No. 03/05/22 (Immutable Audit Records)",
      ipAddress: "10.14.0.1 (Air-Gapped HSM)",
      notes: "Merkle root sealed at block #9825 with zero-knowledge tamper proof. Non-repudiation signature verified.",
      hash: "e7b819f091c01e38b348d61f8933b91a27e6db5817c7689104fa289012bb9401",
    },
    {
      id: "LOG-9824",
      timestamp: "2026-09-08T11:32:00+05:30",
      tenderId: "GEM/2026/B/9823410",
      bidderId: "BID-CPCL-001",
      bidderName: "Aura Flow Systems Private Limited",
      action: "Technical Bid Final Qualification Approved by Committee",
      officerId: "CPCL-COMM-CHAIR",
      status: "QUALIFIED",
      category: "OFFICER_DECISION",
      statutoryClause: "GeM GTC Clause 12 (Technical Evaluation Committee)",
      ipAddress: "172.16.4.112",
      notes: "All mandatory technical credentials, hydrostatic test certificates, and OEM authorizations validated. Bidder cleared for commercial opening.",
      hash: "8a4f91b029384c71e82710384719284719283746192837461928374619283746",
    },
    {
      id: "LOG-9823",
      timestamp: "2026-09-08T11:15:00+05:30",
      tenderId: "GEM/2026/B/9823410",
      bidderId: "ALL-BIDDERS",
      bidderName: "CPPP National Debarment Database",
      action: "Routine Debarment Cross-Index Polled Across All CPSEs",
      officerId: "CPPP-MONITOR-BOT",
      status: "GATEWAY_SYNC",
      category: "GATEWAY",
      statutoryClause: "GFR 2017 Rule 151 & DoE OM F.1/20/2018-PPD",
      ipAddress: "164.100.128.45 (NIC-CPPP Gateway)",
      notes: "Synchronized with Ministry of Finance centralized blacklist; confirmed zero new debarment orders against remaining active bidders.",
      hash: "4f72819038472910482719203948571029384756102938475610293847561029",
    },
    {
      id: "LOG-9822",
      timestamp: "2026-09-08T11:05:00+05:30",
      tenderId: "GEM/2026/B/9823410",
      bidderId: "BID-CPCL-002",
      bidderName: "PetroTech Heavy Flow Equipments",
      action: "Statutory Clarification Notice Issued (Make in India)",
      officerId: "CPCL-PO-4412",
      status: "CLARIFICATION",
      category: "CLARIFICATION",
      statutoryClause: "GFR 2017 Rule 173(iv) & Public Procurement (Make in India) Order",
      ipAddress: "172.16.4.108",
      notes: "Vendor requested to submit chartered engineer certificate clarifying domestic value addition calculation (Class-I vs Class-II). 48hr window initiated.",
      hash: "9283746192837461928374619283746192837461928374619283746192837461",
    },
    {
      id: "LOG-9821",
      timestamp: "2026-09-08T10:50:00+05:30",
      tenderId: "GEM/2026/B/9823410",
      bidderId: "BID-CPCL-003",
      bidderName: "Apex Engineering & Logistics Enterprises",
      action: "Anti-Collusion Radar: Shared Subnet IP & Director DIN Detected",
      officerId: "GRAPH-RADAR-VIG",
      status: "CRITICAL_ALERT",
      category: "CARTEL_RADAR",
      statutoryClause: "Competition Act 2002 Section 3(3) (Prohibition of Bid Rigging)",
      ipAddress: "103.24.182.44 (Identical Subnet)",
      notes: "Bids submitted within 118 seconds from identical public IP subnet. Overlapping director DIN 08923141 confirmed via MCA gateway.",
      hash: "5b19283746592837465928374659283746592837465928374659283746592837",
    },
    {
      id: "LOG-9820",
      timestamp: "2026-09-08T10:42:00+05:30",
      tenderId: "GEM/2026/B/9823410",
      bidderId: "BID-CPCL-003",
      bidderName: "Apex Engineering & Logistics Enterprises",
      action: "Neural QR Forensics: Visual Text vs Decoded Payload Mismatch",
      officerId: "NEURAL-QR-GUARD",
      status: "CRITICAL_ALERT",
      category: "FORENSICS",
      statutoryClause: "Information Technology Act Sec 66D & GeM GTC Clause 14",
      ipAddress: "10.0.8.22",
      notes: "Printed turnover claims ₹12.50 Cr, but scanned QR code payload decodes to ₹2.10 Cr under disparate GSTIN 07AABCU9603R1Z2.",
      hash: "6c28374659283746592837465928374659283746592837465928374659283746",
    },
    {
      id: "LOG-9819",
      timestamp: "2026-09-08T10:30:00+05:30",
      tenderId: "GEM/2026/B/9823410",
      bidderId: "BID-CPCL-003",
      bidderName: "Apex Engineering & Logistics Enterprises",
      action: "Tampering & Debarment Alert Triggered (Photoshop CC 2024)",
      officerId: "SYSTEM-FORENSICS-BOT",
      status: "CRITICAL_ALERT",
      category: "FORENSICS",
      statutoryClause: "GeM GTC Clause 14 (Fraudulent Practices & Forgery)",
      ipAddress: "10.0.8.19",
      notes: "IOCL Debarment active & Adobe Photoshop CC 2024 metadata tampering identified in CA Net Worth certificate.",
      hash: "3b29091823908479201938479201938479201938479201938479201938479201",
    },
    {
      id: "LOG-9818",
      timestamp: "2026-09-08T10:18:00+05:30",
      tenderId: "GEM/2026/B/9823410",
      bidderId: "BID-CPCL-003",
      bidderName: "Apex Engineering & Logistics Enterprises",
      action: "Statutory Disqualification Recommendation Issued",
      officerId: "CPCL-CVO-8821",
      status: "DISQUALIFIED",
      category: "OFFICER_DECISION",
      statutoryClause: "GeM GTC Clause 14 & CVC Vigilance Manual 2021",
      ipAddress: "172.16.4.101",
      notes: "Disqualified with recommendation for EMD forfeiture and 24-month CPPP blacklisting referral due to forged credentials.",
      hash: "1d92837465928374659283746592837465928374659283746592837465928374",
    },
    {
      id: "LOG-9817",
      timestamp: "2026-09-08T10:05:00+05:30",
      tenderId: "GEM/2026/B/9823410",
      bidderId: "ALL-BIDDERS",
      bidderName: "EPFO & ESIC National Gateways",
      action: "Statutory Labor ECR Deposits Reconciled",
      officerId: "GATEWAY-DAEMON-05",
      status: "COMPLIANT",
      category: "GATEWAY",
      statutoryClause: "Contract Labour (Regulation & Abolition) Act 1970",
      ipAddress: "164.100.21.33 (Shram Suvidha Portal)",
      notes: "Reconciled active ECR wage month contributions for 142 deployed technical personnel across active bidders.",
      hash: "7e92837465928374659283746592837465928374659283746592837465928374",
    },
    {
      id: "LOG-9816",
      timestamp: "2026-09-08T09:52:00+05:30",
      tenderId: "GEM/2026/B/9823410",
      bidderId: "ALL-BIDDERS",
      bidderName: "Income Tax Department (CBDT)",
      action: "Section 206AB Higher TDS Non-Filer Verification Polled",
      officerId: "CBDT-API-SYNC",
      status: "COMPLIANT",
      category: "GATEWAY",
      statutoryClause: "Income Tax Act 1961 Section 206AB",
      ipAddress: "115.240.10.18 (CBDT e-Filing Core)",
      notes: "Verified PAN statuses and return filing compliance for FY 2023-24 and 2024-25. Zero specified higher-TDS non-filers found.",
      hash: "2a92837465928374659283746592837465928374659283746592837465928374",
    },
    {
      id: "LOG-9815",
      timestamp: "2026-09-08T09:40:00+05:30",
      tenderId: "GEM/2026/B/9823410",
      bidderId: "BID-CPCL-001",
      bidderName: "Aura Flow Systems Private Limited",
      action: "MSME Udyam NIC-2008 Classification Confirmed",
      officerId: "GATEWAY-DAEMON-02",
      status: "GATEWAY_SYNC",
      category: "GATEWAY",
      statutoryClause: "Public Procurement Policy for Micro & Small Enterprises (MSEs) Order 2012",
      ipAddress: "164.100.78.102 (MSME Gateway)",
      notes: "Udyam Registration UDYAM-TN-02-0049281 verified active. 5-digit NIC 28132 (Manufacture of pumps) matches tender criteria.",
      hash: "4c92837465928374659283746592837465928374659283746592837465928374",
    },
    {
      id: "LOG-9814",
      timestamp: "2026-09-08T09:28:00+05:30",
      tenderId: "GEM/2026/B/9823410",
      bidderId: "BID-CPCL-001",
      bidderName: "Aura Flow Systems Private Limited",
      action: "GSTN CBIC GSTR-3B Return Compliance Verified",
      officerId: "GATEWAY-DAEMON-01",
      status: "GATEWAY_SYNC",
      category: "GATEWAY",
      statutoryClause: "CBIC GST Compliance Rating Guidelines",
      ipAddress: "103.247.12.8 (GSTN Production API)",
      notes: "GSTIN 33AAACA1122B1Z8 active. 100% monthly GSTR-3B filing regularity confirmed. Declared turnover ₹48.50 Cr matches financials.",
      hash: "8f92837465928374659283746592837465928374659283746592837465928374",
    },
    {
      id: "LOG-9813",
      timestamp: "2026-09-08T09:20:00+05:30",
      tenderId: "GEM/2026/B/9823410",
      bidderId: "BID-CPCL-001",
      bidderName: "Aura Flow Systems Private Limited",
      action: "Chartered Accountant UDIN & Net Worth Verification Passed",
      officerId: "AI-EVAL-ENGINE-V4",
      status: "COMPLIANT",
      category: "EVALUATION",
      statutoryClause: "GeM GTC Clause 4 (Annual Financial Turnover Benchmark)",
      ipAddress: "10.0.8.12",
      notes: "ICAI UDIN 24089123AAAA01 verified live. Net worth ₹18.20 Cr exceeds tender minimum requirement of ₹15.00 Cr.",
      hash: "5d92837465928374659283746592837465928374659283746592837465928374",
    },
    {
      id: "LOG-9812",
      timestamp: "2026-09-08T09:15:00+05:30",
      tenderId: "GEM/2026/B/9823410",
      bidderId: "BID-CPCL-001",
      bidderName: "Aura Flow Systems Private Limited",
      action: "AI Verification Scrutiny Completed (Score: 98%)",
      officerId: "CPCL-PO-4412",
      status: "COMPLIANT",
      category: "EVALUATION",
      statutoryClause: "GeM GTC Clause 4 (Technical Qualification Scrutiny)",
      ipAddress: "172.16.4.108",
      notes: "Complete clause-by-clause scrutiny completed with zero compliance exceptions.",
      hash: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    },
    {
      id: "LOG-9811",
      timestamp: "2026-09-08T09:00:00+05:30",
      tenderId: "GEM/2026/B/9823410",
      bidderId: "ALL-SYSTEM",
      bidderName: "Procuring Entity Switcher",
      action: "Procuring Entity Context Initialized: CPCL Manali Refinery",
      officerId: "SYSTEM-ADMIN",
      status: "SYSTEM",
      category: "SYSTEM",
      statutoryClause: "GeM Procurement Guidelines for CPSEs",
      ipAddress: "172.16.4.1",
      notes: "Tender parameters loaded for High Pressure Centrifugal Flow Pumps & Critical Valves (Estimated Value: ₹35.00 Cr).",
      hash: "1a92837465928374659283746592837465928374659283746592837465928374",
    },
    {
      id: "LOG-9810",
      timestamp: "2026-09-08T08:45:00+05:30",
      tenderId: "GEM/2026/B/9823410",
      bidderId: "ALL-SYSTEM",
      bidderName: "GeM Secure Ingestion Daemon",
      action: "Encrypted Technical Bid Submission Archive Demultiplexed",
      officerId: "GEM-INGESTION-DAEMON",
      status: "SYSTEM",
      category: "SYSTEM",
      statutoryClause: "GeM Bidding System Protocol v4",
      ipAddress: "10.0.8.2",
      notes: "Decrypted 5 technical bids and 48 attached PDF certificates with SHA-256 baseline verification.",
      hash: "0f92837465928374659283746592837465928374659283746592837465928374",
    },
  ]);

  const toggleApiMode = () => {
    setIsLiveApiMode((prev) => !prev);
  };

  const setActiveEntity = (entity: ActiveProcuringEntity) => {
    setActiveEntityState(entity);
  };

  const switchTender = (tenderId: string) => {
    const found = tenders.find((t) => t.tender_id === tenderId);
    if (found) {
      setActiveEntityState({
        orgName: found.buyer_organization,
        department: found.department,
        tenderId: found.tender_id,
        itemCategory: found.item_category,
      });
    }
  };

  const getBidderById = (bidderId: string) => {
    return bidders.find((b) => b.bidder_id === bidderId);
  };

  const getTenderById = (tenderId: string) => {
    return tenders.find((t) => t.tender_id === decodeURIComponent(tenderId) || t.tender_id.replace(/\//g, "-") === tenderId);
  };

  const qualifyBidder = (bidderId: string, notes?: string) => {
    const timestamp = new Date().toISOString();
    const hash = `sha256_${Math.random().toString(36).substring(2)}${Date.now()}`;
    
    setBidders((prev) =>
      prev.map((b) => {
        if (b.bidder_id === bidderId) {
          return {
            ...b,
            ai_evaluation: {
              ...b.ai_evaluation,
              status: "COMPLIANT",
            },
            officer_decision: {
              action: "QUALIFIED",
              timestamp,
              officer_id: "CPCL-OFFICER-7782",
              notes: notes || "Statutorily qualified under GeM GTC & CPCL evaluation norms.",
            },
          };
        }
        return b;
      })
    );

    const bidder = bidders.find((b) => b.bidder_id === bidderId);
    if (bidder) {
      setAuditLogs((prev) => [
        {
          id: `LOG-${Date.now()}`,
          timestamp,
          tenderId: "GEM/2026/B/9823410",
          bidderId,
          bidderName: bidder.legal_name,
          action: "Officer Qualified Bidder",
          officerId: "CPCL-OFFICER-7782",
          status: "QUALIFIED",
          notes,
          hash,
        },
        ...prev,
      ]);
    }
  };

  const disqualifyBidder = (bidderId: string, notes: string) => {
    const timestamp = new Date().toISOString();
    const hash = `sha256_${Math.random().toString(36).substring(2)}${Date.now()}`;

    setBidders((prev) =>
      prev.map((b) => {
        if (b.bidder_id === bidderId) {
          return {
            ...b,
            ai_evaluation: {
              ...b.ai_evaluation,
              status: "DISQUALIFIED",
            },
            officer_decision: {
              action: "DISQUALIFIED",
              timestamp,
              officer_id: "CPCL-OFFICER-7782",
              notes,
            },
          };
        }
        return b;
      })
    );

    const bidder = bidders.find((b) => b.bidder_id === bidderId);
    if (bidder) {
      setAuditLogs((prev) => [
        {
          id: `LOG-${Date.now()}`,
          timestamp,
          tenderId: "GEM/2026/B/9823410",
          bidderId,
          bidderName: bidder.legal_name,
          action: "Officer Disqualified Bidder",
          officerId: "CPCL-OFFICER-7782",
          status: "DISQUALIFIED",
          notes,
          hash,
        },
        ...prev,
      ]);
    }
  };

  const sendClarificationNotice = (bidderId: string, noticeText: string) => {
    const timestamp = new Date().toISOString();
    const hash = `sha256_${Math.random().toString(36).substring(2)}${Date.now()}`;

    setBidders((prev) =>
      prev.map((b) => {
        if (b.bidder_id === bidderId) {
          return {
            ...b,
            ai_evaluation: {
              ...b.ai_evaluation,
              status: "CLARIFICATION_NEEDED",
            },
            officer_decision: {
              action: "CLARIFICATION_SENT",
              timestamp,
              officer_id: "CPCL-OFFICER-7782",
              clarification_notice: noticeText,
            },
          };
        }
        return b;
      })
    );

    const bidder = bidders.find((b) => b.bidder_id === bidderId);
    if (bidder) {
      setAuditLogs((prev) => [
        {
          id: `LOG-${Date.now()}`,
          timestamp,
          tenderId: "GEM/2026/B/9823410",
          bidderId,
          bidderName: bidder.legal_name,
          action: "Statutory Clarification Notice Issued",
          officerId: "CPCL-OFFICER-7782",
          status: "CLARIFICATION_ISSUED",
          notes: "Notice dispatched via GeM Portal messaging system.",
          hash,
        },
        ...prev,
      ]);
    }
  };

  return (
    <TenderDataContext.Provider
      value={{
        tenders,
        bidders,
        gateways,
        auditLogs,
        isLiveApiMode,
        activeEntity,
        setActiveEntity,
        switchTender,
        toggleApiMode,
        getBidderById,
        getTenderById,
        qualifyBidder,
        disqualifyBidder,
        sendClarificationNotice,
      }}
    >
      {children}
    </TenderDataContext.Provider>
  );
}

export function useTenderData() {
  const context = useContext(TenderDataContext);
  if (!context) {
    throw new Error("useTenderData must be used within TenderDataProvider");
  }
  return context;
}
