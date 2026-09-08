import { NextResponse } from "next/server";
import crypto from "crypto";

interface VerificationRequest {
  gateway: "gstn" | "mca21" | "pan" | "udyam" | "cppp" | "epfo" | "esic" | "dpiit";
  identifier: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gateway = (searchParams.get("gateway") || "gstn") as VerificationRequest["gateway"];
  const identifier = searchParams.get("identifier") || "33AAACA1234F1Z5";
  return handleVerification(gateway, identifier);
}

export async function POST(request: Request) {
  try {
    let gateway: VerificationRequest["gateway"] = "gstn";
    let identifier = "";

    try {
      const rawText = await request.text();
      try {
        const body = JSON.parse(rawText);
        gateway = body.gateway || "gstn";
        identifier = body.identifier || "";
      } catch {
        // If body is form-urlencoded or unescaped query string
        const params = new URLSearchParams(rawText);
        gateway = (params.get("gateway") as VerificationRequest["gateway"]) || "gstn";
        identifier = params.get("identifier") || "";
      }
    } catch {
      // Fallback
    }

    if (!identifier) {
      return NextResponse.json(
        {
          error: "Missing required parameters: 'gateway' and 'identifier' are required.",
          status: "INVALID_REQUEST",
        },
        { status: 400 }
      );
    }

    return handleVerification(gateway, identifier);
  } catch (err) {
    return NextResponse.json(
      {
        error: "Internal Gateway Communication Error",
        status: "GATEWAY_TIMEOUT",
        message: String(err),
      },
      { status: 500 }
    );
  }
}

async function handleVerification(gateway: VerificationRequest["gateway"], identifier: string) {
  try {
    const cleanId = (identifier || "").trim().toUpperCase();
    const timestamp = new Date().toISOString();
    const simulatedLatency = Math.floor(Math.random() * 65) + 60;
    await new Promise((resolve) => setTimeout(resolve, simulatedLatency));

    let resultPayload: Record<string, unknown> = {};
    let status = "VERIFIED_COMPLIANT";
    let riskLevel = "LOW";
    let authorityName = "";
    let endpointCalled = "";

    // 1. GSTN Verification
    if (gateway === "gstn") {
      authorityName = "Goods and Services Tax Network (GSTN) / GSP";
      endpointCalled = "https://services.gst.gov.in/services/api/taxpayer/verify";

      // Match against known bidders or parse dynamically
      if (cleanId === "33AAACA1234F1Z5") {
        resultPayload = {
          gstin: cleanId,
          legal_name: "AURA FLOW SYSTEMS PRIVATE LIMITED",
          trade_name: "Aura Flow Systems",
          status: "Active",
          taxpayer_type: "Regular",
          state_jurisdiction: "Tamil Nadu (Code 33) - Chennai Central Division",
          registration_date: "2018-04-18",
          gstr1_filing_status: { last_period: "July-2026", status: "FILED", arn: "AA3307260019284" },
          gstr3b_filing_status: { last_period: "July-2026", status: "FILED", arn: "AB3307260049102" },
          annual_aggregate_turnover_inr: 182500000.0,
          compliance_score: "100% (Regular Non-Defaulter)",
          e_way_bill_blocked: false,
        };
      } else if (cleanId === "27AAACB5678G1Z2") {
        status = "CLARIFICATION_NEEDED";
        riskLevel = "MEDIUM";
        resultPayload = {
          gstin: cleanId,
          legal_name: "BHARAT PETRO-TECH SOLUTIONS",
          trade_name: "Bharat Petro-Tech",
          status: "Active",
          taxpayer_type: "Regular",
          state_jurisdiction: "Maharashtra (Code 27) - Mumbai East",
          registration_date: "2021-03-02",
          gstr1_filing_status: { last_period: "May-2026", status: "FILED" },
          gstr3b_filing_status: { last_period: "April-2026", status: "PENDING", note: "2+ consecutive months pending" },
          annual_aggregate_turnover_inr: 158000000.0,
          compliance_score: "Defaulter (Late Filer)",
          e_way_bill_blocked: false,
        };
      } else if (cleanId === "07AAACD9988P1Z3") {
        status = "CRITICAL_FRAUD_FLAG";
        riskLevel = "CRITICAL";
        resultPayload = {
          gstin: cleanId,
          legal_name: "APEX LOGISTICS TRADERS",
          trade_name: "Apex Engineering & Logistics Enterprises",
          status: "Suspended",
          taxpayer_type: "Regular",
          state_jurisdiction: "Delhi (Code 07) - North Delhi Ward 12",
          suspension_reason: "Suo-moto suspension under Rule 21A for non-filing and circular trading inquiry",
          gstr1_filing_status: { last_period: "January-2026", status: "FILED" },
          gstr3b_filing_status: { last_period: "January-2026", status: "DEFICIENT" },
          annual_aggregate_turnover_inr: 15000000.0, // ₹1.5 Cr in reality vs claimed ₹18.5 Cr
          discrepancy_alert: "Declared turnover in tender ₹18.5 Cr violates verified GSTN revenue of ₹1.5 Cr by 1,133%.",
          e_way_bill_blocked: true,
        };
      } else {
        // Generic fallback parser for any 15-character GSTIN
        const stateCode = cleanId.substring(0, 2);
        const panPart = cleanId.substring(2, 12);
        resultPayload = {
          gstin: cleanId,
          legal_name: `REGISTERED ENTITY (${panPart})`,
          status: "Active",
          taxpayer_type: "Regular",
          state_jurisdiction: `State Code: ${stateCode}`,
          gstr3b_filing_status: { status: "FILED", last_period: "Current Quarter" },
          compliance_rating: "Compliant",
        };
      }
    }

    // 2. MCA21 Registry Verification
    else if (gateway === "mca21") {
      authorityName = "Ministry of Corporate Affairs (MCA21 V3 Registry)";
      endpointCalled = "https://mca.gov.in/mcafoportal/api/company/details";

      if (cleanId === "U29100TN2018PTC120491") {
        resultPayload = {
          cin: cleanId,
          company_name: "AURA FLOW SYSTEMS PRIVATE LIMITED",
          roc_code: "RoC-Chennai",
          company_category: "Company limited by Shares",
          company_class: "Private",
          authorized_capital_inr: 25000000,
          paid_up_capital_inr: 20000000,
          incorporation_date: "2018-04-12",
          status: "Active",
          directors: [
            { din: "07812940", name: "Suresh Ramanathan", appointment_date: "2018-04-12" },
            { din: "08192341", name: "Kavitha Sundaram", appointment_date: "2018-04-12" },
          ],
          active_charges_inr: 5000000,
          charges_status: "No overdue defaults",
        };
      } else if (cleanId === "U51909DL2015PTC284561") {
        status = "CRITICAL_FRAUD_FLAG";
        riskLevel = "CRITICAL";
        resultPayload = {
          cin: cleanId,
          company_name: "APEX ENGINEERING & LOGISTICS ENTERPRISES PRIVATE LIMITED",
          roc_code: "RoC-Delhi",
          company_status: "Under Process of Striking Off",
          strike_off_notice_ref: "STK-7/2026/0912",
          authorized_capital_inr: 1000000,
          paid_up_capital_inr: 500000,
          incorporation_date: "2015-08-11",
          directors: [
            { din: "06291034", name: "Rajeshwar Dayal", debarred_by_mca: true },
            { din: "07481920", name: "Deepak Sharma", debarred_by_mca: false },
          ],
          alert: "Entity is currently under strike-off proceedings and Director DIN 06291034 is disqualified under Section 164(2)(a).",
        };
      } else {
        resultPayload = {
          cin: cleanId,
          company_name: "VERIFIED CORPORATE ENTITY",
          status: "Active",
          authorized_capital_inr: 10000000,
          incorporation_year: cleanId.length >= 12 ? cleanId.substring(9, 13) : "2020",
        };
      }
    }

    // 3. PAN / Income Tax Verification
    else if (gateway === "pan") {
      authorityName = "Central Board of Direct Taxes (CBDT) / Income Tax";
      endpointCalled = "https://eportal.incometax.gov.in/api/v2/pan/compliance";

      if (cleanId === "AAACA1234F") {
        resultPayload = {
          pan: cleanId,
          pan_status: "Valid and Operational",
          entity_name: "AURA FLOW SYSTEMS PRIVATE LIMITED",
          entity_type: "Company (C)",
          aadhaar_seeding_status: "Exempt (Corporate Entity)",
          sec_206ab_higher_tds_status: "Compliant (Regular ITR Filer)",
          last_itr_filed_assessment_year: "2025-26",
          pan_allotment_date: "2018-04-14",
        };
      } else if (cleanId === "AAACD9988P") {
        status = "CRITICAL_FRAUD_FLAG";
        riskLevel = "CRITICAL";
        resultPayload = {
          pan: cleanId,
          pan_status: "Inoperative / High Risk",
          entity_name: "APEX LOGISTICS TRADERS",
          entity_type: "Individual / Proprietorship (P)",
          discrepancy: "Bidder submitted bid as a Private Limited company, but PAN is issued to an individual proprietorship.",
          sec_206ab_higher_tds_status: "Specified Person (Non-Filer 206AB Penalty Active)",
          penal_tds_rate_applicable: "20% or twice the normal rate",
        };
      } else {
        resultPayload = {
          pan: cleanId,
          pan_status: "Valid and Operational",
          sec_206ab_higher_tds_status: "Compliant",
        };
      }
    }

    // 4. Udyam MSME Verification
    else if (gateway === "udyam") {
      authorityName = "Ministry of Micro, Small and Medium Enterprises (MSME)";
      endpointCalled = "https://api.udyamregistration.gov.in/v2/verify";

      if (cleanId === "UDYAM-TN-02-0041289") {
        resultPayload = {
          udyam_registration_number: cleanId,
          enterprise_name: "AURA FLOW SYSTEMS PRIVATE LIMITED",
          enterprise_classification: "Small Enterprise",
          major_activity: "Manufacturing",
          nic_5_digit_code: "28131",
          nic_description: "Manufacture of other pumps, compressors, taps and valves",
          registered_address: "Plot 14-B, Ennore Expressway Industrial Estate, Chennai, Tamil Nadu - 600057",
          tender_preference_eligible: true,
          fee_exemption_eligible: true,
        };
      } else if (cleanId === "UDYAM-MH-02-0044812") {
        status = "CLARIFICATION_NEEDED";
        riskLevel = "MEDIUM";
        resultPayload = {
          udyam_registration_number: cleanId,
          enterprise_name: "BHARAT PETRO-TECH SOLUTIONS",
          enterprise_classification: "Micro Enterprise",
          major_activity: "Services",
          nic_5_digit_code: "74909",
          nic_description: "Other professional, scientific and technical activities n.e.c.",
          discrepancy: "Tender requires 'Manufacturing' classification for pump equipment, but enterprise is registered under 'Services'.",
          tender_preference_eligible: false,
        };
      } else {
        resultPayload = {
          udyam_registration_number: cleanId,
          status: "Valid",
          enterprise_classification: "Small",
          major_activity: "Manufacturing",
        };
      }
    }

    // 5. CPPP / Debarment Registry
    else if (gateway === "cppp") {
      authorityName = "Procurement Policy Division (CPPP) / Dept of Expenditure";
      endpointCalled = "https://eprocure.gov.in/cppp/api/debarment/registry";

      if (cleanId === "AAACD9988P" || cleanId.includes("APEX")) {
        status = "DEBARRED_VENDOR_BAN";
        riskLevel = "CRITICAL";
        resultPayload = {
          searched_entity: cleanId,
          debarment_status: "ACTIVE_DEBARMENT_FOUND",
          is_blacklisted: true,
          order_details: {
            debarring_authority: "Indian Oil Corporation Limited (IOCL) / MoP&NG",
            order_number: "IOCL-REF-VIG-2025-0819",
            order_date: "2025-11-14",
            debarment_period_years: 3,
            valid_until: "2028-11-13",
            reason: "Submission of forged OEM authorization and fraudulent testing certificate in pipeline contract.",
          },
          action_required: "Statutory mandatory disqualification under CVC Guidelines Clause 8.4 and GeM Incident Rule 14.",
        };
      } else {
        resultPayload = {
          searched_entity: cleanId,
          debarment_status: "CLEAR_NO_RECORDS",
          is_blacklisted: false,
          searched_registries: ["CPPP Central Registry", "GeM Incident Management", "CVC Watchlist", "CPCL Debarment List"],
          findings: "No negative records or ongoing vigilance bans found.",
        };
      }
    }

    // Generic fallback for any other gateway
    else {
      authorityName = "Government of India Statutory Registry Gateway";
      endpointCalled = `https://${gateway}.gov.in/api/v1/verify`;
      resultPayload = {
        searched_identifier: cleanId,
        verification_status: "RECORD_FOUND_VALID",
        statutory_compliance: "Verified",
      };
    }

    // Cryptographic audit proof
    const rawDataToHash = `${cleanId}:${gateway}:${JSON.stringify(resultPayload)}:${timestamp}`;
    const auditDigest = crypto.createHash("sha256").update(rawDataToHash).digest("hex");

    return NextResponse.json({
      success: true,
      http_status: 200,
      query_meta: {
        gateway_id: gateway,
        authority: authorityName,
        endpoint: endpointCalled,
        queried_identifier: cleanId,
        execution_latency_ms: simulatedLatency,
        timestamp,
      },
      verification_verdict: {
        status,
        risk_level: riskLevel,
        is_compliant: status === "VERIFIED_COMPLIANT",
      },
      audit_trail: {
        sha256_digest: auditDigest,
        cvc_compliance_certified: true,
        node_node_ref: "CPCL-CHENNAI-GATEWAY-POD-04",
      },
      data: resultPayload,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Internal Gateway Communication Error",
        status: "GATEWAY_TIMEOUT",
        message: "Failed to parse statutory verification request.",
      },
      { status: 500 }
    );
  }
}
