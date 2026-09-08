import { CartelNode, CartelEdge } from "@/types";

export interface CartelGraphData {
  nodes: CartelNode[];
  edges: CartelEdge[];
  summary: {
    syndicate_detected: boolean;
    confidence: number;
    flagged_bidders: string[];
    shared_factors: string[];
    statutory_violation: string;
  };
}

export const mockCartelGraph: CartelGraphData = {
  summary: {
    syndicate_detected: true,
    confidence: 94.2,
    flagged_bidders: ["BID-CPCL-003 (Apex Eng)", "BID-CPCL-004 (Apex Flow)"],
    shared_factors: [
      "Common Director DIN 08492019 (Vikram Singhal)",
      "Identical Bid Upload IP Subnet: 192.168.44.0/24 (Delta: 4 mins 12 secs)",
      "Matching Bank Branch & IFSC: HDFC0001294 (Okhla Industrial)",
      "Identical PDF Creator Tool Hash: Adobe Photoshop CC 2024 (Macintosh)",
    ],
    statutory_violation: "Breach of GeM GTC Clause 14 (Anti-Collusion & Cartelization) and Section 3 of Competition Act 2002.",
  },
  nodes: [
    // Bidders
    {
      id: "BID-001",
      label: "Aura Flow Systems",
      type: "bidder",
      risk_score: 5,
      details: "Genuine Independent Bidder. No shared directors or digital fingerprints.",
    },
    {
      id: "BID-002",
      label: "Bharat Petro-Tech",
      type: "bidder",
      risk_score: 35,
      details: "Independent entity; minor statutory procedural lapses.",
    },
    {
      id: "BID-003",
      label: "Apex Engineering",
      type: "bidder",
      risk_score: 95,
      details: "Debarred by IOCL. Primary syndicate node.",
    },
    {
      id: "BID-004",
      label: "Apex Flow Dynamics",
      type: "bidder",
      risk_score: 88,
      details: "Shell proxy bidder used to suppress competitive pricing.",
    },
    // Connecting infrastructure & identity nodes
    {
      id: "DIN-08492019",
      label: "DIN 08492019 (Vikram Singhal)",
      type: "director",
      risk_score: 98,
      details: "Common director registered in MCA21 across both Apex entities.",
    },
    {
      id: "IP-SUBNET",
      label: "Subnet 192.168.44.0/24",
      type: "ip_subnet",
      risk_score: 90,
      details: "Both bids uploaded from the same static fiber block in Okhla, New Delhi.",
    },
    {
      id: "BANK-HDFC",
      label: "IFSC HDFC0001294",
      type: "bank",
      risk_score: 75,
      details: "EMD bank guarantee/account opened at identical branch.",
    },
    {
      id: "PDF-METADATA",
      label: "Photoshop CC 2024 (Mac)",
      type: "pdf_hash",
      risk_score: 92,
      details: "Identical XMP metadata build fingerprint detected in submitted PDFs.",
    },
    // Independent Aura Flow Nodes
    {
      id: "DIN-07812940",
      label: "DIN 07812940 (S. Ramanathan)",
      type: "director",
      risk_score: 2,
      details: "Independent verified board member.",
    },
    {
      id: "IP-CHENNAI",
      label: "IP 122.178.91.44 (Chennai)",
      type: "ip_subnet",
      risk_score: 0,
      details: "Independent business leased line in Chennai.",
    },
  ],
  edges: [
    // Collusive cluster edges
    { source: "BID-003", target: "DIN-08492019", relation: "Director / Shareholder", severity: "high" },
    { source: "BID-004", target: "DIN-08492019", relation: "Designated Partner", severity: "high" },
    { source: "BID-003", target: "IP-SUBNET", relation: "Uploaded from IP 192.168.44.112", severity: "high" },
    { source: "BID-004", target: "IP-SUBNET", relation: "Uploaded from IP 192.168.44.115", severity: "high" },
    { source: "BID-003", target: "BANK-HDFC", relation: "Bank Branch: Okhla", severity: "medium" },
    { source: "BID-004", target: "BANK-HDFC", relation: "Bank Branch: Okhla", severity: "medium" },
    { source: "BID-003", target: "PDF-METADATA", relation: "Forged CA Cert Metadata", severity: "high" },
    { source: "BID-004", target: "PDF-METADATA", relation: "Shared Document Template", severity: "high" },

    // Independent edges
    { source: "BID-001", target: "DIN-07812940", relation: "Director", severity: "low" },
    { source: "BID-001", target: "IP-CHENNAI", relation: "Chennai Fiber Upload", severity: "low" },
  ],
};
