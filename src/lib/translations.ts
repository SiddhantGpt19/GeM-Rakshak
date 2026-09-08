export type Language = "en" | "hi";

export interface TranslationDict {
  // Brand & Header
  appTitle: string;
  appSubtitle: string;
  orgName: string;
  gatewayStatusBadge: string;
  mockSandbox: string;
  liveGateway: string;
  searchPlaceholder: string;
  
  // Navigation
  navDashboard: string;
  navTenders: string;
  navBidders: string;
  navCartelRadar: string;
  navForensicsLab: string;
  navGateways: string;
  navAuditLog: string;

  // Sidebar
  sidebarProcuringEntity: string;
  sidebarSwitch: string;
  sidebarActiveTenderBadge: string;
  sidebarAlertBadge: string;
  sidebarPlatformDossier: string;
  sidebarGuardTitle: string;
  sidebarGuardDesc: string;

  // KPI Cards
  kpiActiveTenders: string;
  kpiBidsToday: string;
  kpiFraudBlocked: string;
  kpiFraudBlockedBadge: string;
  kpiTimeSaved: string;
  kpiTimeSavedBadge: string;
  kpiSubtitleTenders: string;
  kpiSubtitleBids: string;

  // Dashboard Welcome & Charts
  dashWelcomeOrg: string;
  dashLiveConsole: string;
  dashHeroDesc: string;
  dashCartelAlertBtn: string;
  dashEvaluateBtn: string;
  dashRiskDistribution: string;
  dashTimeSavedChart: string;
  dashCompliantLabel: string;
  dashClarificationLabel: string;
  dashHighRiskLabel: string;
  dashManualScrutinyLabel: string;
  dashAiScrutinyLabel: string;

  // Tenders Table
  tendersHeader: string;
  tendersSubheader: string;
  colTenderId: string;
  colTitle: string;
  colCategory: string;
  colDeadline: string;
  colTotalBids: string;
  colProgress: string;
  colAction: string;
  btnScrutinize: string;
  btnViewCartel: string;

  // Bidder Grid
  tenderParamsTitle: string;
  paramMinTurnover: string;
  paramMIIClass: string;
  paramNICCode: string;
  paramOEMAuth: string;
  paramEPFO: string;
  cartelBannerWarning: string;
  cartelBannerBtn: string;
  filterAll: string;
  filterCompliant: string;
  filterClarification: string;
  filterHighRisk: string;
  
  // Bidder Table
  colBidderName: string;
  colSellerId: string;
  colBidValue: string;
  colScoreGauge: string;
  colRiskBadge: string;
  colDeepDive: string;
  
  // Status Badges
  statusCompliant: string;
  statusClarification: string;
  statusHighRisk: string;
  statusDebarred: string;

  // Audit Workspace
  auditTitle: string;
  docForensicsHeader: string;
  docForensicsSub: string;
  reconEngineHeader: string;
  reconEngineSub: string;
  laserScanActive: string;
  laserScanNotice: string;
  
  // Forensics Tools
  toolNormal: string;
  toolELA: string;
  toolExif: string;
  toolQR: string;
  toolUDIN: string;
  
  // Accordions
  accMCA21: string;
  accMSME: string;
  accTax: string;
  accMII: string;
  accEPFO: string;
  
  // Action Bar
  aiDisclaimer: string;
  btnDraftClarification: string;
  btnQualify: string;
  btnDisqualify: string;
  btnExportDossier: string;
  
  // Cartel Visualizer
  cartelTitle: string;
  cartelSub: string;
  cartelRingAlert: string;
  nodeBidder: string;
  nodeDirector: string;
  nodeIPSubnet: string;
  nodeBank: string;
  nodeHash: string;
  confidenceScore: string;
  
  // Modals
  modalClarificationTitle: string;
  modalDisqualifyTitle: string;
  modalExifTitle: string;
  modalQRTitle: string;
  modalUDINTitle: string;
  modalGatewayTitle: string;
  modalClose: string;
  modalConfirm: string;
  modalCopyNotice: string;
  modalCopiedNotice: string;

  // Audit Log Page
  auditSubtitle: string;
  auditCvcBadge: string;
  auditSha256Badge: string;
  auditTotalSealed: string;
  auditCryptoTrail: string;
  auditCriticalAlerts: string;
  auditDebarmentSub: string;
  auditCompliantPassed: string;
  auditTechMetSub: string;
  auditGatewayPolls: string;
  auditGatewaySub: string;
  auditClarifications: string;
  auditClarificationsSub: string;
  auditSearchPlaceholder: string;
  auditFilterAll: string;
  auditFilterCritical: string;
  auditFilterCompliant: string;
  auditFilterGateway: string;
  auditFilterClarification: string;
  auditColLogIdTime: string;
  auditColTenderRef: string;
  auditColBidderSubsystem: string;
  auditColActionAuthority: string;
  auditColAuditorAgent: string;
  auditColStatus: string;
  auditColShaDigest: string;
  auditColDetails: string;
  auditBtnInspect: string;
  auditNoRecords: string;
  auditResetFilters: string;
  auditModalTitle: string;
  auditModalTimestamp: string;
  auditModalTenderId: string;
  auditModalEntity: string;
  auditModalAuditor: string;
  auditModalAuthority: string;
  auditModalFindings: string;
  auditModalDigestTitle: string;
  auditModalVerified: string;
  auditModalCopy: string;
  auditModalCopied: string;
  auditModalExportJson: string;
  auditModalClose: string;

  // Gateways Page
  gwInfraTitle: string;
  gwAvgLatency: string;
  gwPageTitle: string;
  gwPageSubtitle: string;
  gwMode: string;
  gwPingAll: string;
  gwPinging: string;
  gwArchTitle: string;
  gwArchDesc: string;
  gwSandboxTitle: string;
  gwSandboxSubtitle: string;
  gwPresetsLabel: string;
  gwSelectGateway: string;
  gwTargetIdentifier: string;
  gwBtnVerify: string;
  gwVerifying: string;
  gwLiveResponse: string;
  gwDigestTitle: string;
  gwAuthority: string;
  gwStatus: string;
  gwLatency: string;
  gwRawJson: string;
  gwBtnCopy: string;
  gwBtnCopied: string;
  gwEndpoint: string;
  gwUptime: string;

  // Forensics Lab Page
  forensicsHeroTitle: string;
  forensicsHeroSubtitle: string;
  forensicsSampleTampered: string;
  forensicsSampleGenuine: string;
  forensicsSampleUpload: string;
  forensicsDropzoneTitle: string;
  forensicsDropzoneSubtitle: string;
  forensicsBtnInstantTest: string;
  forensicsDocOverview: string;
  forensicsVerdictCritical: string;
  forensicsVerdictGenuine: string;
  forensicsOcrBlocks: string;
  forensicsAnomalousBadge: string;
  forensicsExifInspector: string;
  forensicsQrCrossCheck: string;
  forensicsUdinValidator: string;
  forensicsScanStep1: string;
  forensicsScanStep2: string;
  forensicsScanStep3: string;
  forensicsScanStep4: string;

  // Procuring Entity Modal
  modalEntityTitle: string;
  modalEntitySubtitle: string;
  modalTabPsu: string;
  modalTabCustom: string;
  modalCurrentActive: string;
  modalCurrentlySelected: string;
  modalBtnSwitchEntity: string;
  modalCustomHeading: string;
  modalCustomSub: string;
  modalLblOrgName: string;
  modalLblDept: string;
  modalLblTenderId: string;
  modalLblCategory: string;
  modalBtnApplyScope: string;

  // QR Diff Modal
  qrDiffTitle: string;
  qrDiffSubtitle: string;
  qrTabCrossCheck: string;
  qrTabGenerator: string;
  qrScanInstruction: string;
  qrScanWithPhone: string;
  qrDualEngineTitle: string;
  qrStatusMatch: string;
  qrStatusTampered: string;
  qrRawScannedPayload: string;
  qrVisualOcrText: string;
  qrDiscrepancyNotes: string;
  qrGenTitle: string;
  qrGenSubtitle: string;
  qrBtnDownload: string;
  qrBtnCopyPayload: string;

  // Common UI
  lblActive: string;
  lblPending: string;
  lblCompleted: string;
  lblVerified: string;
  lblClear: string;
  lblCancel: string;
}

export const translations: Record<Language, TranslationDict> = {
  en: {
    appTitle: "GeM-Rakshak",
    appSubtitle: "AI Bid Compliance & Document Forensics Platform",
    orgName: "Chennai Petroleum Corporation Limited (CPCL) • MoP&NG",
    gatewayStatusBadge: "ALL 8 GOVT GATEWAYS OPERATIONAL",
    mockSandbox: "Mock Sandbox",
    liveGateway: "Live API Gateway",
    searchPlaceholder: "Search Tender ID, Bidder, GSTIN, Udyam...",

    navDashboard: "Dashboard",
    navTenders: "Tenders Pipeline",
    navBidders: "Bidder Scrutiny",
    navCartelRadar: "Cartel Radar",
    navForensicsLab: "Forensics Sandbox",
    navGateways: "Gateway Health",
    navAuditLog: "CVC Audit Trail",

    sidebarProcuringEntity: "Procuring Entity",
    sidebarSwitch: "Switch",
    sidebarActiveTenderBadge: "Active Tender",
    sidebarAlertBadge: "Alert",
    sidebarPlatformDossier: "Platform Dossier",
    sidebarGuardTitle: "GeM Statutory AI Guard",
    sidebarGuardDesc: "Zero-tolerance anti-forgery scanning active under GeM General Terms & Conditions Clause 14.",

    kpiActiveTenders: "Active Tenders Under Scrutiny",
    kpiBidsToday: "Bids Scrutinized Today",
    kpiFraudBlocked: "Tampering & Fraud Blocked",
    kpiFraudBlockedBadge: "7 Forgeries Flagged",
    kpiTimeSaved: "Evaluation Time Saved",
    kpiTimeSavedBadge: "82% Drop (4.5 Days ➔ 14 Mins)",
    kpiSubtitleTenders: "High-value CPCL Hydrocarbon Procurements",
    kpiSubtitleBids: "Across 8 Government Integrated Gateways",

    dashWelcomeOrg: "CPCL Procurement Cell • Manali Refinery",
    dashLiveConsole: "Live Scrutiny Console",
    dashHeroDesc: "Automated statutory cross-verification engine reconciling bidder submissions across MCA21, GSTN, Udyam, EPFO, and CPPP debarment databases.",
    dashCartelAlertBtn: "Cartel Radar: 1 Ring Detected",
    dashEvaluateBtn: "Evaluate Active Tender",
    dashRiskDistribution: "Bidder Compliance & Risk Distribution",
    dashTimeSavedChart: "Scrutiny Turnaround Benchmark (Hours)",
    dashCompliantLabel: "Compliant / Authentic",
    dashClarificationLabel: "Clarification Needed",
    dashHighRiskLabel: "High Risk / Forgeries",
    dashManualScrutinyLabel: "Manual Scrutiny",
    dashAiScrutinyLabel: "GeM-Rakshak AI",

    tendersHeader: "Tender Scrutiny Pipeline",
    tendersSubheader: "Real-time automated statutory screening and discrepancy detection for CPCL procurements",
    colTenderId: "Tender ID",
    colTitle: "Item & Scope",
    colCategory: "Category",
    colDeadline: "Bid Deadline",
    colTotalBids: "Total Bids",
    colProgress: "Scrutiny Progress",
    colAction: "Actions",
    btnScrutinize: "Scrutinize Bids",
    btnViewCartel: "Cartel Radar",

    tenderParamsTitle: "Mandatory Statutory Tender Criteria (CPCL Guidelines)",
    paramMinTurnover: "Min Turnover: ₹15.00 Cr",
    paramMIIClass: "Class-I Local Supplier (≥50%)",
    paramNICCode: "Mandatory NIC: 28132 (Valves / Pumps)",
    paramOEMAuth: "OEM Authorization: Mandatory",
    paramEPFO: "EPFO & ESIC: Regular Clearance",
    cartelBannerWarning: "⚠️ Cartel Ring Suspected: 2 Bidders share Director DIN & Subnet IP.",
    cartelBannerBtn: "View Interactive Cartel Graph",
    filterAll: "All Bids",
    filterCompliant: "Compliant / Authentic",
    filterClarification: "Clarification Needed",
    filterHighRisk: "High Risk / Forged",

    colBidderName: "Bidder Legal Entity",
    colSellerId: "GeM Seller ID",
    colBidValue: "Bid Value (INR)",
    colScoreGauge: "Compliance Score",
    colRiskBadge: "Risk Status",
    colDeepDive: "Deep Dive Audit",

    statusCompliant: "Compliant / Authentic",
    statusClarification: "Clarification Needed",
    statusHighRisk: "High Risk / Disqualified",
    statusDebarred: "Debarred / Blacklisted",

    auditTitle: "Bidder Compliance & Document Forensics Workspace",
    docForensicsHeader: "Document Forensics & Smart OCR Viewer",
    docForensicsSub: "Pixel-level manipulation detection, metadata provenance & QR cross-validation",
    reconEngineHeader: "Cross-Portal Verification Engine",
    reconEngineSub: "Automated reconciliation with MCA21, GSTN, Udyam, CPPP, EPFO & ITD",
    laserScanActive: "AI Optical Forensics Scanning In Progress...",
    laserScanNotice: "Scanning cryptographic certificates and document layers",

    toolNormal: "Standard View",
    toolELA: "ELA Heatmap",
    toolExif: "Exif & Metadata",
    toolQR: "QR Cross-Check",
    toolUDIN: "UDIN Verifier",

    accMCA21: "1. MCA21 & Legal Entity Identity",
    accMSME: "2. MSME & Udyam Activity Scope",
    accTax: "3. GSTN & Income Tax Solvency",
    accMII: "4. Make in India (MII) & CA Audit",
    accEPFO: "5. EPFO / ESIC Statutory Manpower",

    aiDisclaimer: "AI Recommendation is decision-support only. Final statutory power vests exclusively with the CPCL Procurement Officer under CVC & GeM GTC guidelines.",
    btnDraftClarification: "Draft Clarification",
    btnQualify: "Qualify Bidder",
    btnDisqualify: "Disqualify Bidder",
    btnExportDossier: "Export CVC Dossier (PDF)",

    cartelTitle: "Cartel Collusion & Syndicate Radar",
    cartelSub: "Interactive behavioral & infrastructure graph detecting proxy bidding rings",
    cartelRingAlert: "Collusive Syndicate Cluster Flagged with 94.2% Confidence",
    nodeBidder: "Bidder Node",
    nodeDirector: "Director DIN Node",
    nodeIPSubnet: "IP Subnet Node",
    nodeBank: "Bank IFSC/Branch Node",
    nodeHash: "PDF Author Metadata Node",
    confidenceScore: "Collusion Probability Score",

    modalClarificationTitle: "Statutory GeM Clarification Notice (Clause 4.1)",
    modalDisqualifyTitle: "Statutory Disqualification & Rejection Record",
    modalExifTitle: "Deep Exif & XMP Metadata Forensic Inspector",
    modalQRTitle: "QR Cryptographic Payload vs OCR Text Cross-Check",
    modalUDINTitle: "ICAI Unique Document Identification (UDIN) Registry",
    modalGatewayTitle: "Government Gateway Telemetry & Health Monitor",
    modalClose: "Close",
    modalConfirm: "Confirm Action",
    modalCopyNotice: "Copy Legal Notice",
    modalCopiedNotice: "Copied to Clipboard!",

    // Audit Log
    auditSubtitle: "Immutable, cryptographically chained forensic ledger of all automated scrutiny events and committee decisions.",
    auditCvcBadge: "Central Vigilance Commission (CVC) Statutory Records",
    auditSha256Badge: "SHA-256 Sealed",
    auditTotalSealed: "Total Sealed Logs",
    auditCryptoTrail: "100% Cryptographic Trail",
    auditCriticalAlerts: "Critical Alerts",
    auditDebarmentSub: "Debarment & QR Forgery",
    auditCompliantPassed: "Compliant / Passed",
    auditTechMetSub: "Technical Criteria Met",
    auditGatewayPolls: "Gateway Polls",
    auditGatewaySub: "GSTN / Udyam / CBDT",
    auditClarifications: "Clarifications",
    auditClarificationsSub: "Rule 173(iv) Active Notices",
    auditSearchPlaceholder: "Search by Bidder, Log ID, Action, Officer, or Statutory Clause...",
    auditFilterAll: "All Logs",
    auditFilterCritical: "Critical",
    auditFilterCompliant: "Compliant",
    auditFilterGateway: "Gateways",
    auditFilterClarification: "Clarifications",
    auditColLogIdTime: "Log ID & Time",
    auditColTenderRef: "Tender Reference",
    auditColBidderSubsystem: "Bidder / Subsystem",
    auditColActionAuthority: "Action & Statutory Authority",
    auditColAuditorAgent: "Auditor / Agent",
    auditColStatus: "Status",
    auditColShaDigest: "SHA-256 Digest",
    auditColDetails: "Details",
    auditBtnInspect: "Inspect",
    auditNoRecords: "No statutory audit records match the selected filters.",
    auditResetFilters: "Reset all filters",
    auditModalTitle: "CVC Statutory Record Certificate",
    auditModalTimestamp: "Exact Statutory Timestamp",
    auditModalTenderId: "Tender Reference ID",
    auditModalEntity: "Subject Legal Entity",
    auditModalAuditor: "Auditor / Agent Identity",
    auditModalAuthority: "Governing Statutory Authority & Procurement Rule",
    auditModalFindings: "Forensic Examination & Gateway Findings:",
    auditModalDigestTitle: "CVC Non-Repudiation Cryptographic Digest",
    auditModalVerified: "VERIFIED & UNALTERED",
    auditModalCopy: "Copy",
    auditModalCopied: "Copied",
    auditModalExportJson: "Export Record (JSON)",
    auditModalClose: "Close Dossier",

    // Gateways Page
    gwInfraTitle: "Infrastructure Telemetry & API Middleware",
    gwAvgLatency: "Avg Latency",
    gwPageTitle: "Government Gateways Health",
    gwPageSubtitle: "Real-time API middleware querying official source-of-truth registries",
    gwMode: "Mode",
    gwPingAll: "Ping All Gateways",
    gwPinging: "Pinging Gateways...",
    gwArchTitle: "How Live Statutory Verification Works",
    gwArchDesc: "In government production, direct browser calls to .gov.in registries are protected behind API Setu (MeitY) and GSP enterprise client tokens. GeM-Rakshak's backend route serves as the secure reverse proxy middleware, standardizing statutory formats and generating cryptographic audit trails for CVC scrutiny.",
    gwSandboxTitle: "Interactive Statutory API Sandbox & Tester",
    gwSandboxSubtitle: "Execute live API calls against our verification engine to test compliance reconciliation",
    gwPresetsLabel: "Test Presets:",
    gwSelectGateway: "Select Target Government Gateway",
    gwTargetIdentifier: "Target Query Identifier",
    gwBtnVerify: "Run Statutory Verification",
    gwVerifying: "Querying Gateway...",
    gwLiveResponse: "Live Gateway Response",
    gwDigestTitle: "CVC Non-Repudiation Digest",
    gwAuthority: "Official Authority",
    gwStatus: "Verification Status",
    gwLatency: "Latency",
    gwRawJson: "Raw JSON Payload",
    gwBtnCopy: "Copy JSON",
    gwBtnCopied: "Copied!",
    gwEndpoint: "Endpoint",
    gwUptime: "Uptime",

    // Forensics Lab
    forensicsHeroTitle: "Neural Forensic Sandbox & Document Inspector",
    forensicsHeroSubtitle: "Multi-layered optical forensics, pixel differential heatmaps, font anomaly detection and live QR verification.",
    forensicsSampleTampered: "Tampered CA Certificate",
    forensicsSampleGenuine: "Genuine MSME Udyam",
    forensicsSampleUpload: "Upload Custom Bid Document",
    forensicsDropzoneTitle: "Drop PDF tender document here or click to browse",
    forensicsDropzoneSubtitle: "Supports CA Certificates, GST returns, Udyam proofs and Bank Guarantees up to 25MB",
    forensicsBtnInstantTest: "Analyze Test Document (Instant)",
    forensicsDocOverview: "Forensic Examination Summary",
    forensicsVerdictCritical: "CRITICAL FORGERY DETECTED",
    forensicsVerdictGenuine: "GENUINE & UNTAMPERED",
    forensicsOcrBlocks: "Neural OCR Extracted Blocks",
    forensicsAnomalousBadge: "Anomalous Block",
    forensicsExifInspector: "Deep EXIF Metadata Inspector",
    forensicsQrCrossCheck: "QR Code Cross-Check & Phone Scanner",
    forensicsUdinValidator: "ICAI UDIN Statutory Verifier",
    forensicsScanStep1: "1/4: Reading byte stream & calculating cryptographic SHA-256 hash...",
    forensicsScanStep2: "2/4: Extracting XMP metadata, catalog producer & font stream tables...",
    forensicsScanStep3: "3/4: Running neural OCR extraction & identifying statutory entities...",
    forensicsScanStep4: "4/4: Cross-reconciling extracted PAN, GSTIN, UDYAM & UDIN against live registries...",

    // Procuring Entity Modal
    modalEntityTitle: "Change Procuring Entity & Active Tender Scope",
    modalEntitySubtitle: "Select an authenticated public buyer or enter a custom procurement department",
    modalTabPsu: "Public Sector Undertakings (PSUs)",
    modalTabCustom: "Custom Procuring Entity",
    modalCurrentActive: "Active Scope",
    modalCurrentlySelected: "Currently Selected",
    modalBtnSwitchEntity: "Switch to this Entity",
    modalCustomHeading: "Create Custom Entity Scope",
    modalCustomSub: "Define a tailored procurement context for specialized tenders",
    modalLblOrgName: "Organization Name",
    modalLblDept: "Department / Division",
    modalLblTenderId: "Tender Reference ID",
    modalLblCategory: "Procurement Category",
    modalBtnApplyScope: "Apply & Switch Scope",

    // QR Diff Modal
    qrDiffTitle: "QR Code Forensics & Phone Scanner",
    qrDiffSubtitle: "Cross-examine embedded cryptographic QR payloads against visual OCR text.",
    qrTabCrossCheck: "Payload Cross-Check",
    qrTabGenerator: "Generate GeM QR",
    qrScanInstruction: "Scan with Smartphone Camera to Verify Raw Payload Directly",
    qrScanWithPhone: "Live Scannable QR Code",
    qrDualEngineTitle: "Dual-Verification Forensic Engine",
    qrStatusMatch: "PAYLOAD & TEXT MATCH (100% AUTHENTIC)",
    qrStatusTampered: "CRITICAL MISMATCH DETECTED (FRAUD ALERT)",
    qrRawScannedPayload: "Raw Scanned QR Payload",
    qrVisualOcrText: "Visual Document Text (OCR)",
    qrDiscrepancyNotes: "Forensic Discrepancy Analysis",
    qrGenTitle: "Live GeM QR Code Generator",
    qrGenSubtitle: "Generate authentic, cryptographically signed test QR payloads",
    qrBtnDownload: "Download High-Res QR",
    qrBtnCopyPayload: "Copy Raw Payload",

    // Common
    lblActive: "Active",
    lblPending: "Pending",
    lblCompleted: "Completed",
    lblVerified: "Verified",
    lblClear: "Clear",
    lblCancel: "Cancel",
  },
  hi: {
    appTitle: "GeM-रक्षक",
    appSubtitle: "एआई बोली अनुपालन और दस्तावेज़ फोरेंसिक सत्यापन मंच",
    orgName: "चेन्नई पेट्रोलियम कॉर्पोरेशन लिमिटेड (CPCL) • पेट्रोलियम एवं प्राकृतिक गैस मंत्रालय",
    gatewayStatusBadge: "सभी 8 सरकारी गेटवे सक्रिय एवं सुचारू हैं",
    mockSandbox: "मॉक सैंडबॉक्स मोड",
    liveGateway: "लाइव एपीआई गेटवे",
    searchPlaceholder: "निविदा आईडी, बोलीदाता, जीएसटी, उद्यम संख्या खोजें...",

    navDashboard: "डैशबोर्ड",
    navTenders: "निविदा पाइपलाइन",
    navBidders: "बोलीदाता संवीक्षा",
    navCartelRadar: "कार्टेल रडार",
    navForensicsLab: "फोरेंसिक सैंडबॉक्स",
    navGateways: "गेटवे स्वास्थ्य",
    navAuditLog: "सीवीसी ऑडिट ट्रेल",

    sidebarProcuringEntity: "खरीददार सरकारी इकाई",
    sidebarSwitch: "बदलें",
    sidebarActiveTenderBadge: "सक्रिय निविदा",
    sidebarAlertBadge: "चेतावनी",
    sidebarPlatformDossier: "प्लेटफॉर्म तकनीकी डोजियर",
    sidebarGuardTitle: "GeM वैधानिक एआई रक्षक",
    sidebarGuardDesc: "GeM सामान्य नियम एवं शर्तें खंड 14 के तहत शून्य-सहनशीलता जालसाजी-रोधी जांच सक्रिय है।",

    kpiActiveTenders: "समीक्षाधीन सक्रिय निविदाएं",
    kpiBidsToday: "आज जांची गई बोलियां",
    kpiFraudBlocked: "रोकी गई जालसाजी एवं छेड़छाड़",
    kpiFraudBlockedBadge: "7 फर्जीवाड़े चिन्हित",
    kpiTimeSaved: "सत्यापन समय में बचत",
    kpiTimeSavedBadge: "82% कमी (4.5 दिन ➔ 14 मिनट)",
    kpiSubtitleTenders: "उच्च मूल्य की CPCL हाइड्रोकार्बन खरीद",
    kpiSubtitleBids: "8 सरकारी एकीकृत पोर्टलों के माध्यम से",

    dashWelcomeOrg: "CPCL खरीद प्रकोष्ठ • मनाली रिफाइनरी",
    dashLiveConsole: "लाइव संवीक्षा कंसोल",
    dashHeroDesc: "MCA21, GSTN, उद्यम, EPFO और CPPP प्रतिबंध डाटाबेस के माध्यम से बोलीदाता दस्तावेजों का वास्तविक समय में समाधान करने वाला स्वचालित वैधानिक सत्यापन इंजन।",
    dashCartelAlertBtn: "कार्टेल रडार: 1 सिंडिकेट समूह चिन्हित",
    dashEvaluateBtn: "सक्रिय निविदा की जांच करें",
    dashRiskDistribution: "बोलीदाता अनुपालन एवं जोखिम वितरण",
    dashTimeSavedChart: "संवीक्षा समय की तुलना (घंटों में)",
    dashCompliantLabel: "अनुपालन योग्य / प्रामाणिक",
    dashClarificationLabel: "स्पष्टीकरण आवश्यक",
    dashHighRiskLabel: "उच्च जोखिम / फर्जी",
    dashManualScrutinyLabel: "पारंपरिक मानवीय संवीक्षा",
    dashAiScrutinyLabel: "GeM-रक्षक एआई इंजन",

    tendersHeader: "निविदा संवीक्षा पाइपलाइन",
    tendersSubheader: "CPCL खरीद हेतु वास्तविक समय में स्वचालित वैधानिक जांच और विसंगति पहचान",
    colTenderId: "निविदा संख्या",
    colTitle: "मद एवं कार्यक्षेत्र",
    colCategory: "श्रेणी",
    colDeadline: "निविदा अंतिम तिथि",
    colTotalBids: "कुल बोलियां",
    colProgress: "संवीक्षा प्रगति",
    colAction: "कार्रवाई",
    btnScrutinize: "बोलियों की जांच करें",
    btnViewCartel: "कार्टेल रडार देखें",

    tenderParamsTitle: "अनिवार्य वैधानिक निविदा पात्रता शर्तें (CPCL दिशानिर्देश)",
    paramMinTurnover: "न्यूनतम कारोबार: ₹15.00 करोड़",
    paramMIIClass: "क्लास-I स्थानीय आपूर्तिकर्ता (≥50%)",
    paramNICCode: "अनिवार्य NIC: 28132 (वाल्व / पंप निर्माण)",
    paramOEMAuth: "मूल उपकरण निर्माता (OEM) प्राधिकरण: अनिवार्य",
    paramEPFO: "EPFO एवं ESIC: नियमित भुगतान प्रमाण",
    cartelBannerWarning: "⚠️ संदिग्ध कार्टेल सिंडिकेट: 2 बोलीदाता एक ही निदेशक DIN और सबनेट IP साझा करते हैं।",
    cartelBannerBtn: "इंटरैक्टिव कार्टेल ग्राफ देखें",
    filterAll: "सभी बोलियां",
    filterCompliant: "अनुपालन योग्य / प्रामाणिक",
    filterClarification: "स्पष्टीकरण आवश्यक",
    filterHighRisk: "उच्च जोखिम / फर्जी",

    colBidderName: "बोलीदाता कानूनी नाम",
    colSellerId: "GeM विक्रेता पहचान (ID)",
    colBidValue: "बोली मूल्य (INR)",
    colScoreGauge: "अनुपालन स्कोर",
    colRiskBadge: "जोखिम स्थिति",
    colDeepDive: "गहन फोरेंसिक ऑडिट",

    statusCompliant: "अनुपालन योग्य / प्रामाणिक",
    statusClarification: "स्पष्टीकरण आवश्यक",
    statusHighRisk: "उच्च जोखिम / अयोग्य",
    statusDebarred: "प्रतिबंधित / काली सूची में दर्ज",

    auditTitle: "बोलीदाता अनुपालन एवं दस्तावेज़ फोरेंसिक कार्यक्षेत्र",
    docForensicsHeader: "दस्तावेज़ फोरेंसिक और स्मार्ट ओसीआर दर्शक",
    docForensicsSub: "पिक्सेल-स्तरीय छेड़छाड़ पहचान, मेटाडेटा स्रोत एवं क्यूआर सत्यापन",
    reconEngineHeader: "क्रॉस-पोर्टल मिलान एवं सत्यापन इंजन",
    reconEngineSub: "MCA21, GSTN, उद्यम, CPPP, EPFO और ITD से स्वचालित समाधान",
    laserScanActive: "एआई ऑप्टिकल फोरेंसिक लेजर स्कैन जारी है...",
    laserScanNotice: "क्रिप्टोग्राफिक प्रमाण पत्र और दस्तावेज़ परतों का गहन स्कैन",

    toolNormal: "सामान्य दृश्य",
    toolELA: "ईएलए हीटमैप",
    toolExif: "एक्सिफ व मेटाडेटा",
    toolQR: "क्यूआर क्रॉस-चेक",
    toolUDIN: "यूडीआईएन सत्यापन",

    accMCA21: "1. MCA21 और कानूनी अस्तित्व पहचान",
    accMSME: "2. एमएसएमई व उद्यम गतिविधि दायरा",
    accTax: "3. जीएसटीएन और आयकर वित्तीय सॉल्वेंसी",
    accMII: "4. मेक इन इंडिया (MII) व सीए ऑडिट",
    accEPFO: "5. ईपीएफओ / ईएसआईसी वैधानिक श्रम अनुपालन",

    aiDisclaimer: "एआई सिफ़ारिश केवल निर्णय-समर्थन हेतु है। CVC और GeM GTC दिशानिर्देशों के तहत अंतिम वैधानिक अधिकार केवल CPCL खरीद अधिकारी के पास सुरक्षित है।",
    btnDraftClarification: "स्पष्टीकरण नोटिस तैयार करें",
    btnQualify: "बोलीदाता को पात्र घोषित करें",
    btnDisqualify: "बोलीदाता को अयोग्य घोषित करें",
    btnExportDossier: "ऑडिट डोजियर डाउनलोड करें (PDF)",

    cartelTitle: "कार्टेल मिलीभगत एवं सिंडिकेट रडार",
    cartelSub: "प्रॉक्सी बोली सिंडिकेट का पता लगाने वाला इंटरैक्टिव बुनियादी ढांचा ग्राफ",
    cartelRingAlert: "94.2% विश्वसनीयता के साथ संदिग्ध मिलीभगत समूह चिन्हित",
    nodeBidder: "बोलीदाता नोड",
    nodeDirector: "निदेशक DIN नोड",
    nodeIPSubnet: "आईपी सबनेट नोड",
    nodeBank: "बैंक शाखा नोड",
    nodeHash: "पीडीएफ लेखक हैश नोड",
    confidenceScore: "कार्टेल मिलीभगत संभावना स्कोर",

    modalClarificationTitle: "वैधानिक GeM स्पष्टीकरण नोटिस (खंड 4.1)",
    modalDisqualifyTitle: "वैधानिक अस्वीकृति एवं अयोग्यता दस्तावेज़",
    modalExifTitle: "गहन एक्सिफ एवं एक्सएमपी मेटाडेटा फोरेंसिक निरीक्षक",
    modalQRTitle: "क्यूआर क्रिप्टोग्राफ़िक पेलोड बनाम ओसीआर पाठ्य मिलान",
    modalUDINTitle: "आईसीएआई विशिष्ट दस्तावेज़ पहचान संख्या (UDIN) पंजी",
    modalGatewayTitle: "सरकारी गेटवे टेलीमेट्री और स्वास्थ्य मॉनिटर",
    modalClose: "बंद करें",
    modalConfirm: "कार्रवाई की पुष्टि करें",
    modalCopyNotice: "कानूनी नोटिस कॉपी करें",
    modalCopiedNotice: "क्लिपबोर्ड पर कॉपी किया गया!",

    // Audit Log
    auditSubtitle: "सभी स्वचालित संवीक्षा घटनाओं और समिति निर्णयों का अपरिवर्तनीय, क्रिप्टोग्राफ़िक रूप से शृंखलाबद्ध फोरेंसिक बहीखाता।",
    auditCvcBadge: "केंद्रीय सतर्कता आयोग (CVC) वैधानिक रिकॉर्ड",
    auditSha256Badge: "SHA-256 सीलबंद",
    auditTotalSealed: "कुल सीलबंद लॉग",
    auditCryptoTrail: "100% क्रिप्टोग्राफ़िक ट्रेल",
    auditCriticalAlerts: "गंभीर चेतावनियां",
    auditDebarmentSub: "काली सूची व क्यूआर जालसाजी",
    auditCompliantPassed: "अनुपालन योग्य / उत्तीर्ण",
    auditTechMetSub: "तकनीकी मानदंड पूर्ण",
    auditGatewayPolls: "गेटवे सत्यापन जांच",
    auditGatewaySub: "GSTN / उद्यम / CBDT",
    auditClarifications: "स्पष्टीकरण नोटिस",
    auditClarificationsSub: "नियम 173(iv) सक्रिय नोटिस",
    auditSearchPlaceholder: "बोलीदाता, लॉग आईडी, कार्रवाई, अधिकारी या वैधानिक धारा द्वारा खोजें...",
    auditFilterAll: "सभी लॉग",
    auditFilterCritical: "गंभीर",
    auditFilterCompliant: "अनुपालन",
    auditFilterGateway: "गेटवे",
    auditFilterClarification: "स्पष्टीकरण",
    auditColLogIdTime: "लॉग आईडी व समय",
    auditColTenderRef: "निविदा संदर्भ",
    auditColBidderSubsystem: "बोलीदाता / उपप्रणाली",
    auditColActionAuthority: "कार्रवाई एवं वैधानिक प्राधिकार",
    auditColAuditorAgent: "परीक्षक / एजेंट",
    auditColStatus: "स्थिति",
    auditColShaDigest: "SHA-256 डाइजेस्ट",
    auditColDetails: "विवरण",
    auditBtnInspect: "निरीक्षण करें",
    auditNoRecords: "चयनित फिल्टर से कोई वैधानिक ऑडिट रिकॉर्ड मेल नहीं खाता।",
    auditResetFilters: "सभी फिल्टर रीसेट करें",
    auditModalTitle: "CVC वैधानिक रिकॉर्ड प्रमाणपत्र",
    auditModalTimestamp: "सटीक वैधानिक समय",
    auditModalTenderId: "निविदा संदर्भ आईडी",
    auditModalEntity: "संबंधित कानूनी इकाई",
    auditModalAuditor: "लेखा परीक्षक / एजेंट पहचान",
    auditModalAuthority: "शासित वैधानिक प्राधिकरण एवं खरीद नियम",
    auditModalFindings: "फोरेंसिक परीक्षण एवं गेटवे निष्कर्ष:",
    auditModalDigestTitle: "CVC गैर-अस्वीकरण क्रिप्टोग्राफिक डाइजेस्ट",
    auditModalVerified: "सत्यापित एवं अपरिवर्तित",
    auditModalCopy: "कॉपी करें",
    auditModalCopied: "कॉपी हो गया",
    auditModalExportJson: "रिकॉर्ड निर्यात करें (JSON)",
    auditModalClose: "डोजियर बंद करें",

    // Gateways Page
    gwInfraTitle: "बुनियादी ढांचा टेलीमेट्री एवं एपीआई मिडलवेयर",
    gwAvgLatency: "औसत विलंबता",
    gwPageTitle: "सरकारी गेटवे स्वास्थ्य",
    gwPageSubtitle: "आधिकारिक सत्य-स्रोत रजिस्ट्रीयों से वास्तविक समय में पूछताछ करने वाला एपीआई मिडलवेयर",
    gwMode: "मोड",
    gwPingAll: "सभी गेटवे की जांच करें (पिंग)",
    gwPinging: "गेटवे पिंग किए जा रहे हैं...",
    gwArchTitle: "लाइव वैधानिक सत्यापन कैसे कार्य करता है",
    gwArchDesc: "सरकारी उत्पादन परिवेश में, .gov.in रजिस्ट्रीयों के लिए सीधे ब्राउज़र कॉल एपीआई सेतु (MeitY) और जीएसपी एंटरप्राइज टोकन द्वारा सुरक्षित होते हैं। GeM-रक्षक का बैकएंड रूट एक सुरक्षित रिवर्स प्रॉक्सी मिडलवेयर के रूप में कार्य करता है, जो प्रारूपों का मानकीकरण करता है और CVC संवीक्षा हेतु क्रिप्टोग्राफ़िक ऑडिट ट्रेल उत्पन्न करता है।",
    gwSandboxTitle: "इंटरैक्टिव वैधानिक एपीआई सैंडबॉक्स एवं परीक्षक",
    gwSandboxSubtitle: "अनुपालन समाधान का परीक्षण करने हेतु हमारे सत्यापन इंजन के विरुद्ध लाइव एपीआई कॉल निष्पादित करें",
    gwPresetsLabel: "परीक्षण प्रीसेट:",
    gwSelectGateway: "लक्षित सरकारी गेटवे चुनें",
    gwTargetIdentifier: "लक्षित पहचानकर्ता संख्या",
    gwBtnVerify: "वैधानिक सत्यापन निष्पादित करें",
    gwVerifying: "गेटवे से पूछताछ जारी है...",
    gwLiveResponse: "लाइव गेटवे प्रतिक्रिया",
    gwDigestTitle: "CVC गैर-अस्वीकरण डाइजेस्ट",
    gwAuthority: "आधिकारिक प्राधिकरण",
    gwStatus: "सत्यापन स्थिति",
    gwLatency: "विलंबता",
    gwRawJson: "रॉ JSON पेलोड",
    gwBtnCopy: "JSON कॉपी करें",
    gwBtnCopied: "कॉपी हो गया!",
    gwEndpoint: "एंडपॉइंट",
    gwUptime: "अपटाइम",

    // Forensics Lab
    forensicsHeroTitle: "न्यूरल फोरेंसिक सैंडबॉक्स और दस्तावेज़ निरीक्षक",
    forensicsHeroSubtitle: "बहुस्तरीय ऑप्टिकल फोरेंसिक, पिक्सेल अंतर हीटमैप, फ़ॉन्ट विसंगति पहचान और लाइव क्यूआर सत्यापन।",
    forensicsSampleTampered: "छेड़छाड़ किया गया सीए प्रमाणपत्र",
    forensicsSampleGenuine: "प्रामाणिक एमएसएमई उद्यम",
    forensicsSampleUpload: "कस्टम बोली दस्तावेज़ अपलोड करें",
    forensicsDropzoneTitle: "पीडीएफ निविदा दस्तावेज़ यहाँ छोड़ें या ब्राउज़ करें",
    forensicsDropzoneSubtitle: "सीए प्रमाणपत्र, जीएसटी रिटर्न, उद्यम प्रमाण और 25MB तक के बैंक गारंटी का समर्थन करता है",
    forensicsBtnInstantTest: "परीक्षण दस्तावेज़ का तुरंत विश्लेषण करें",
    forensicsDocOverview: "फोरेंसिक परीक्षण सारांश",
    forensicsVerdictCritical: "गंभीर जालसाजी चिन्हित",
    forensicsVerdictGenuine: "प्रामाणिक एवं बिना छेड़छाड़",
    forensicsOcrBlocks: "न्यूरल ओसीआर निष्कर्षित ब्लॉक",
    forensicsAnomalousBadge: "विसंगत ब्लॉक",
    forensicsExifInspector: "गहन EXIF मेटाडेटा निरीक्षक",
    forensicsQrCrossCheck: "क्यूआर कोड क्रॉस-चेक और फोन स्कैनर",
    forensicsUdinValidator: "आईसीएआई यूडीआईएन वैधानिक सत्यापनकर्ता",
    forensicsScanStep1: "1/4: बाइट स्ट्रीम पढ़ना और क्रिप्टोग्राफ़िक SHA-256 हैश की गणना जारी है...",
    forensicsScanStep2: "2/4: XMP मेटाडेटा, कैटलॉग निर्माता और फ़ॉन्ट तालिकाओं का निष्कर्षण...",
    forensicsScanStep3: "3/4: न्यूरल ओसीआर निष्कर्षण और वैधानिक संस्थाओं की पहचान जारी है...",
    forensicsScanStep4: "4/4: निष्कर्षित पैन, जीएसटी, उद्यम व यूडीआईएन का लाइव रजिस्ट्रीयों से मिलान जारी है...",

    // Procuring Entity Modal
    modalEntityTitle: "खरीददार सरकारी इकाई व सक्रिय निविदा दायरा बदलें",
    modalEntitySubtitle: "प्रमाणित सार्वजनिक क्रेता चुनें या कस्टम खरीद विभाग दर्ज करें",
    modalTabPsu: "सार्वजनिक क्षेत्र के उपक्रम (PSUs)",
    modalTabCustom: "कस्टम खरीददार इकाई",
    modalCurrentActive: "सक्रिय दायरा",
    modalCurrentlySelected: "वर्तमान में चयनित",
    modalBtnSwitchEntity: "इस इकाई पर स्विच करें",
    modalCustomHeading: "कस्टम इकाई दायरा बनाएं",
    modalCustomSub: "विशिष्ट निविदाओं हेतु अनुकूलित खरीद संदर्भ परिभाषित करें",
    modalLblOrgName: "संगठन का नाम",
    modalLblDept: "विभाग / प्रभाग",
    modalLblTenderId: "निविदा संदर्भ संख्या",
    modalLblCategory: "खरीद श्रेणी",
    modalBtnApplyScope: "लागू करें और दायरा बदलें",

    // QR Diff Modal
    qrDiffTitle: "क्यूआर कोड फोरेंसिक और फोन स्कैनर",
    qrDiffSubtitle: "दृश्य ओसीआर पाठ के विरुद्ध अंतर्निहित क्रिप्टोग्राफ़िक क्यूआर पेलोड की जांच करें।",
    qrTabCrossCheck: "पेलोड क्रॉस-चेक",
    qrTabGenerator: "GeM क्यूआर जनरेटर",
    qrScanInstruction: "सीधे रॉ पेलोड सत्यापित करने हेतु स्मार्टफोन कैमरे से स्कैन करें",
    qrScanWithPhone: "लाइव स्कैन करने योग्य क्यूआर कोड",
    qrDualEngineTitle: "दोहरी-सत्यापन फोरेंसिक इंजन",
    qrStatusMatch: "पेलोड और पाठ 100% मेल खाते हैं (पूर्णतः प्रामाणिक)",
    qrStatusTampered: "गंभीर विसंगति चिन्हित (धोखाधड़ी चेतावनी)",
    qrRawScannedPayload: "रॉ स्कैन किया गया क्यूआर पेलोड",
    qrVisualOcrText: "दृश्य दस्तावेज़ पाठ्य (ओसीआर)",
    qrDiscrepancyNotes: "फोरेंसिक विसंगति विश्लेषण",
    qrGenTitle: "लाइव GeM क्यूआर कोड जनरेटर",
    qrGenSubtitle: "प्रामाणिक, क्रिप्टोग्राफ़िक रूप से हस्ताक्षरित परीक्षण क्यूआर पेलोड उत्पन्न करें",
    qrBtnDownload: "उच्च-रिज़ॉल्यूशन क्यूआर डाउनलोड करें",
    qrBtnCopyPayload: "रॉ पेलोड कॉपी करें",

    // Common
    lblActive: "सक्रिय",
    lblPending: "लंबित",
    lblCompleted: "पूर्ण",
    lblVerified: "सत्यापित",
    lblClear: "साफ़ करें",
    lblCancel: "रद्द करें",
  },
};
