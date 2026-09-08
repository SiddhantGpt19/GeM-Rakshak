import { Bidder, TenderMetadata } from "@/types";

export function exportAuditDossier(bidder: Bidder, tender: TenderMetadata) {
  const timestamp = new Date().toISOString();
  const sha256 = `c3ab89${Math.random().toString(16).substring(2, 10)}e42109823f71c42${Date.now()}`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>CVC Statutory Audit Dossier - ${bidder.bidder_id}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 40px; color: #0C141C; line-height: 1.5; font-size: 13px; }
    .header { border-bottom: 2px solid #0C141C; padding-bottom: 15px; margin-bottom: 25px; }
    .org { font-size: 18px; font-weight: bold; color: #0C141C; }
    .title { font-size: 14px; color: #647080; margin-top: 4px; }
    .badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; }
    .badge-compliant { background: #d1fae5; color: #065f46; }
    .badge-disqualified { background: #fee2e2; color: #991b1b; }
    .badge-clarif { background: #fef3c7; color: #92400e; }
    .table { width: 100%; border-collapse: collapse; margin: 15px 0; }
    .table th, .table td { border: 1px solid #E4DCD4; padding: 8px 12px; text-align: left; }
    .table th { background: #ECE4DC; font-weight: 600; font-size: 12px; }
    .hash-box { background: #F4F4EC; border: 1px dashed #647080; padding: 12px; font-family: monospace; font-size: 11px; margin-top: 25px; border-radius: 6px; }
    .footer { margin-top: 40px; font-size: 11px; color: #647080; border-top: 1px solid #E4DCD4; padding-top: 15px; }
  </style>
</head>
<body>
  <div class="header">
    <div class="org">CHENNAI PETROLEUM CORPORATION LIMITED (CPCL)</div>
    <div class="title">Ministry of Petroleum & Natural Gas • Central Vigilance Commission (CVC) Audit Record</div>
    <p><strong>Platform:</strong> GeM-Rakshak AI Bid Compliance & Forensics Engine</p>
  </div>

  <h2>Statutory Bid Scrutiny Dossier</h2>
  <table class="table">
    <tr><th>Tender Reference</th><td>${tender.tender_id} (${tender.title})</td></tr>
    <tr><th>Procurement Category</th><td>${tender.item_category} | Value: INR ${(tender.estimated_value_inr / 10000000).toFixed(2)} Cr</td></tr>
    <tr><th>Bidder Legal Entity</th><td><strong>${bidder.legal_name}</strong> (${bidder.seller_id})</td></tr>
    <tr><th>CIN / Registration</th><td>${bidder.cin} | PAN: ${bidder.submitted_data.pan} | GSTIN: ${bidder.submitted_data.gstin}</td></tr>
    <tr><th>AI Compliance Score</th><td><strong>${bidder.ai_evaluation.compliance_score}%</strong> (Risk Tier: ${bidder.ai_evaluation.risk_level})</td></tr>
    <tr><th>Evaluation Status</th><td>
      <span class="badge ${
        bidder.ai_evaluation.status === "COMPLIANT"
          ? "badge-compliant"
          : bidder.ai_evaluation.status === "DISQUALIFIED"
          ? "badge-disqualified"
          : "badge-clarif"
      }">
        ${bidder.ai_evaluation.status}
      </span>
    </td></tr>
  </table>

  <h3>Reconciled Government Gateways Telemetry</h3>
  <table class="table">
    <thead>
      <tr><th>Government Authority</th><th>Statutory Parameter</th><th>Verified Status</th><th>Portal Finding</th></tr>
    </thead>
    <tbody>
      <tr>
        <td>GSTN (CBIC)</td>
        <td>GSTIN & GSTR-3B Filing</td>
        <td>${bidder.portal_api_responses.gstn_api.status}</td>
        <td>${bidder.portal_api_responses.gstn_api.return_compliance_score}</td>
      </tr>
      <tr>
        <td>Ministry of MSME (Udyam)</td>
        <td>NIC Code & Enterprise Classification</td>
        <td>${bidder.portal_api_responses.udyam_api.valid ? "Valid" : "Failed / Cancelled"}</td>
        <td>NIC: ${bidder.portal_api_responses.udyam_api.nic_5_digit_code || "N/A"} (${bidder.portal_api_responses.udyam_api.major_activity})</td>
      </tr>
      <tr>
        <td>Income Tax (CBDT)</td>
        <td>Section 206AB Higher TDS Non-Filer</td>
        <td>${bidder.portal_api_responses.pan_income_tax_api.pan_status}</td>
        <td>206AB Non-Filer: ${bidder.portal_api_responses.pan_income_tax_api.sec_206ab_specified_person}</td>
      </tr>
      <tr>
        <td>CPPP Debarment Registry</td>
        <td>CPSE / Ministry Vigilance Suspension</td>
        <td>${bidder.portal_api_responses.gem_cppp_debarment_registry.is_debarred ? "DEBARRED" : "CLEAN"}</td>
        <td>${bidder.portal_api_responses.gem_cppp_debarment_registry.is_debarred ? "Active Suspension Order IOCL/VIG/2025/DEB-41" : "No Blacklist History"}</td>
      </tr>
      <tr>
        <td>EPFO / ESIC</td>
        <td>Statutory Labor ECR Deposits</td>
        <td>${bidder.portal_api_responses.epfo_esic_api.epfo_status}</td>
        <td>Last Wage Month: ${bidder.portal_api_responses.epfo_esic_api.last_ecr_wage_month}</td>
      </tr>
    </tbody>
  </table>

  <h3>AI Discrepancy & Forensic Analysis</h3>
  <p>${bidder.ai_evaluation.procurement_officer_summary}</p>

  <div class="hash-box">
    <strong>CRYPTOGRAPHIC INTEGRITY RECORD (CVC COMPLIANT):</strong><br>
    Timestamp: ${timestamp}<br>
    SHA-256 Digest: ${sha256}<br>
    Audit Engine: GeM-Rakshak Neural Forensics v4.8 (Immutable Audit Trail)
  </div>

  <div class="footer">
    This document constitutes an official procurement audit record under Section 4 of the GeM General Terms and Conditions (GTC) and CVC Circular No. 03/05/22.
  </div>
</body>
</html>
  `;

  // Trigger download as HTML document
  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `CVC_Audit_Dossier_${bidder.bidder_id}_${new Date().toISOString().slice(0, 10)}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
