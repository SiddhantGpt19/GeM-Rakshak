export type RiskTier = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type ComplianceStatus = "COMPLIANT" | "CLARIFICATION_NEEDED" | "HIGH_RISK" | "DISQUALIFIED";

export interface StatutoryRules {
  mandatory_gst_active: boolean;
  mandatory_pan_active: boolean;
  min_mii_local_content_pct: number;
  mii_class_required: string;
  msme_exemption_applicable: boolean;
  allowed_msme_activity: string[];
  mandatory_nic_code: string;
  min_turnover_inr: number;
  oem_authorization_mandatory: boolean;
  epfo_esic_mandatory: boolean;
}

export interface TenderMetadata {
  tender_id: string;
  title: string;
  buyer_organization: string;
  department: string;
  item_category: string;
  tender_type: string;
  estimated_value_inr: number;
  bid_deadline: string;
  total_bids: number;
  scrutiny_progress: number;
  statutory_rules: StatutoryRules;
}

export interface DocumentForensics {
  doc_id: string;
  doc_name: string;
  doc_type: "udyam" | "gst" | "mii" | "oem" | "epfo" | "general" | "tax";
  file_name: string;
  uploaded_at: string;
  file_size_mb?: string;
  total_pages?: number;
  file_hash_sha256: string;
  exif_metadata: {
    producer: string;
    creator_tool: string;
    modify_date: string;
    create_date: string;
    suspicious_flag: boolean;
    suspicious_reason?: string;
  };
  ela_tamper_detected: boolean;
  ela_tampered_regions?: {
    label: string;
    box: { x: number; y: number; width: number; height: number };
    anomaly: string;
  }[];
  qr_code_cross_check: {
    scanned_payload: string;
    ocr_visible_text: string;
    is_match: boolean;
    mismatch_details?: string;
  };
  udin_check?: {
    udin: string;
    ca_membership_no: string;
    ca_name: string;
    date_of_issuance: string;
    status: "AUTHENTIC" | "FORGED" | "NOT_FOUND" | "VALID";
    reason?: string;
  };
  ocr_text_blocks: {
    id: string;
    text: string;
    confidence: number;
    box: { x: number; y: number; width: number; height: number };
    field_mapped?: string;
    is_anomalous?: boolean;
  }[];
  statutory_entities_detected?: {
    gstin?: string | null;
    pan?: string | null;
    cin?: string | null;
    udyam?: string | null;
    udin?: string | null;
    declared_turnover?: string | null;
    bidder_name?: string | null;
  };
  statutory_verification_checks?: {
    gateway: string;
    identifier: string;
    status: "VERIFIED_COMPLIANT" | "FLAGGED_ANOMALY" | "DISQUALIFIED" | "NOT_FOUND";
    details: string;
    confidence: number;
  }[];
  ai_verification?: {
    verdict: "REAL_AUTHENTIC" | "FAKE_TAMPERED" | "PROCEDURAL_QUERY";
    real_percentage: number;
    risk_percentage: number;
    doc_classification: string;
    headline: string;
    summary: string;
    findings: {
      check: string;
      status: "PASS" | "FAIL" | "WARN";
      detail: string;
    }[];
  };
  audit_summary?: {
    risk_score: number;
    recommendation: string;
    flags_count: number;
    summary_text?: string;
  };
}

export interface DiscrepancyFlag {
  category: "GST Compliance" | "MSME Eligibility" | "OEM Authorization" | "Labor Compliance" | "Make in India" | "Tax Compliance" | "Debarment/Blacklisting" | "Forensics";
  severity: "Low" | "Medium" | "High" | "Critical";
  issue: string;
  evidence?: string;
  portal_reference?: string;
}

export interface Bidder {
  bidder_id: string;
  legal_name: string;
  seller_id: string;
  cin: string;
  bid_value_inr: number;
  submitted_data: {
    pan: string;
    gstin: string;
    udyam_number: string;
    epfo_code: string;
    esic_number: string;
    claimed_mii_percentage: number;
    mii_cert_type: string;
    oem_authorization_ref: string;
    debarment_self_declaration: string;
    claimed_turnover_inr: number;
  };
  portal_api_responses: {
    gstn_api: {
      status: "Active" | "Suspended" | "Cancelled";
      taxpayer_type: string;
      legal_name_match: boolean;
      gstr1_last_filed_period: string;
      gstr3b_last_filed_period: string;
      return_compliance_score: string;
      turnover_reported_inr: number;
    };
    udyam_api: {
      valid: boolean;
      enterprise_type: "Micro" | "Small" | "Medium" | "Not Found / Cancelled";
      major_activity: "Manufacturing" | "Services" | "Trading" | "Unknown";
      nic_5_digit_code: string | null;
      nic_description?: string;
      registered_unit_address: string;
    };
    pan_income_tax_api: {
      pan_status: "Valid and Operational" | "Inoperative" | "Not Found";
      name_on_pan: string;
      sec_206ab_specified_person: "Yes" | "No";
    };
    mca21_api: {
      company_status: "Active" | "Under Process of Striking Off" | "Dormant";
      incorporation_date: string;
      paid_up_capital_inr: number;
      directors: { din: string; name: string }[];
    };
    epfo_esic_api: {
      epfo_status: "Active" | "Inactive" | "Code Inactive";
      last_ecr_wage_month: string;
      esic_status: "Active" | "Default" | "Inactive";
      active_subscribers: number;
    };
    gem_cppp_debarment_registry: {
      is_debarred: boolean;
      blacklist_history: {
        issuing_authority: string;
        order_number: string;
        reason: string;
        effective_from: string;
        effective_to: string;
      }[];
    };
  };
  ai_evaluation: {
    compliance_score: number;
    risk_level: RiskTier;
    status: ComplianceStatus;
    ai_recommendation: "ELIGIBLE" | "REVIEW_REQUIRED" | "DISQUALIFIED";
    procurement_officer_summary: string;
    discrepancy_flags: DiscrepancyFlag[];
  };
  documents: DocumentForensics[];
  officer_decision?: {
    action: "QUALIFIED" | "DISQUALIFIED" | "CLARIFICATION_SENT";
    timestamp: string;
    officer_id: string;
    notes?: string;
    clarification_notice?: string;
  };
}

export interface CartelNode {
  id: string;
  label: string;
  type: "bidder" | "director" | "ip_subnet" | "bank" | "pdf_hash";
  risk_score?: number;
  details?: string;
}

export interface CartelEdge {
  source: string;
  target: string;
  relation: string;
  severity: "high" | "medium" | "low";
}

export interface GatewayHealth {
  id: string;
  name: string;
  authority: string;
  status: "OPERATIONAL" | "DEGRADED" | "OFFLINE";
  latency_ms: number;
  success_rate: string;
  last_sync: string;
  endpoint: string;
  statutory_scope: string;
}
