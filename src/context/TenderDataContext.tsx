"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Bidder, TenderMetadata, GatewayHealth } from "@/types";
import { mockTenders } from "@/data/mockTenders";
import { mockBidders } from "@/data/mockBidders";
import { mockGateways } from "@/data/mockGateways";

interface AuditLogEntry {
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
      id: "LOG-9812",
      timestamp: "2026-09-08T09:15:00+05:30",
      tenderId: "GEM/2026/B/9823410",
      bidderId: "BID-CPCL-001",
      bidderName: "Aura Flow Systems Private Limited",
      action: "AI Verification Scrutiny Completed (Score: 98%)",
      officerId: "CPCL-PO-4412",
      status: "COMPLIANT",
      hash: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    },
    {
      id: "LOG-9813",
      timestamp: "2026-09-08T10:30:00+05:30",
      tenderId: "GEM/2026/B/9823410",
      bidderId: "BID-CPCL-003",
      bidderName: "Apex Engineering & Logistics Enterprises",
      action: "Tampering & Debarment Alert Triggered",
      officerId: "SYSTEM-FORENSICS-BOT",
      status: "CRITICAL_ALERT",
      notes: "IOCL Debarment active & Photoshop CC 2024 tampering identified.",
      hash: "3b29091823908479201938479201938479201938479201938479201938479201",
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
