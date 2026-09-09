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
    appSubtitle: "Public Procurement Integrity & Document Forensics",
    orgName: "Chennai Petroleum Corporation Limited (CPCL) • MoP&NG",
    gatewayStatusBadge: "ALL 8 GOVT REGISTRIES ACTIVE",
    mockSandbox: "Demo Sandbox",
    liveGateway: "Live Gateway",
    searchPlaceholder: "Search Tender ID, Bidder, GSTIN, Udyam...",

    navDashboard: "Dashboard",
    navTenders: "Tenders Pipeline",
    navBidders: "Bidder Scrutiny",
    navCartelRadar: "Cartel Radar",
    navForensicsLab: "Document Forensics",
    navGateways: "Gateway Health",
    navAuditLog: "Audit Log",

    sidebarProcuringEntity: "Procuring Entity",
    sidebarSwitch: "Switch",
    sidebarActiveTenderBadge: "Active",
    sidebarAlertBadge: "Alert",
    sidebarPlatformDossier: "Platform Dossier",
    sidebarGuardTitle: "Procurement Guard",
    sidebarGuardDesc: "Automated anti-forgery & compliance checks under GeM GTC guidelines.",

    kpiActiveTenders: "Active Tenders",
    kpiBidsToday: "Bids Checked Today",
    kpiFraudBlocked: "Fraud Blocked",
    kpiFraudBlockedBadge: "7 Forgeries Flagged",
    kpiTimeSaved: "Turnaround Time",
    kpiTimeSavedBadge: "< 30s (Down from 4.5 days)",
    kpiSubtitleTenders: "Active CPCL procurements under surveillance",
    kpiSubtitleBids: "Verified across 8 official government registries",

    dashWelcomeOrg: "CPCL Procurement Cell • Manali Refinery",
    dashLiveConsole: "Live Scrutiny Console",
    dashHeroDesc: "Automated verification checking bidder records, document alterations, and cartel connections across government databases.",
    dashCartelAlertBtn: "Cartel Radar: 1 Ring Detected",
    dashEvaluateBtn: "Evaluate Active Tender",
    dashRiskDistribution: "Bidder Compliance & Risk Status",
    dashTimeSavedChart: "Evaluation Time (Manual vs GeM-Rakshak)",
    dashCompliantLabel: "Compliant / Authentic",
    dashClarificationLabel: "Clarification Needed",
    dashHighRiskLabel: "High Risk / Forgeries",
    dashManualScrutinyLabel: "Manual Scrutiny",
    dashAiScrutinyLabel: "GeM-Rakshak",

    tendersHeader: "Tender Scrutiny Pipeline",
    tendersSubheader: "Real-time compliance screening and discrepancy alerts for active tenders",
    colTenderId: "Tender ID",
    colTitle: "Item & Scope",
    colCategory: "Category",
    colDeadline: "Bid Deadline",
    colTotalBids: "Total Bids",
    colProgress: "Scrutiny Progress",
    colAction: "Actions",
    btnScrutinize: "Scrutinize Bids",
    btnViewCartel: "Cartel Radar",

    tenderParamsTitle: "Mandatory Tender Criteria (CPCL Guidelines)",
    paramMinTurnover: "Min Turnover: ₹15.00 Cr",
    paramMIIClass: "Class-I Local Supplier (≥50%)",
    paramNICCode: "Mandatory NIC: 28132 (Valves / Pumps)",
    paramOEMAuth: "OEM Authorization: Mandatory",
    paramEPFO: "EPFO & ESIC: Regular Clearance",
    cartelBannerWarning: "⚠️ Cartel Ring Suspected: 2 Bidders share Director DIN & Subnet IP.",
    cartelBannerBtn: "View Cartel Graph",
    filterAll: "All Bids",
    filterCompliant: "Compliant",
    filterClarification: "Needs Clarification",
    filterHighRisk: "High Risk / Flagged",

    colBidderName: "Bidder Name",
    colSellerId: "Seller ID",
    colBidValue: "Bid Value (INR)",
    colScoreGauge: "Compliance Score",
    colRiskBadge: "Risk Status",
    colDeepDive: "Audit Bid",

    statusCompliant: "Verified Clean",
    statusClarification: "Needs Clarification",
    statusHighRisk: "High Risk / Disqualified",
    statusDebarred: "Debarred / Blacklisted",

    auditTitle: "Bidder Compliance & Document Forensics",
    docForensicsHeader: "Document Verification & Viewer",
    docForensicsSub: "Pixel alteration detection, metadata audit, and QR cross-check",
    reconEngineHeader: "Cross-Portal Verification",
    reconEngineSub: "Instant cross-checks with MCA21, GSTN, Udyam, CPPP, and EPFO",
    laserScanActive: "Analyzing Document Integrity...",
    laserScanNotice: "Verifying digital signatures, image layers, and registry records",

    toolNormal: "Standard View",
    toolELA: "ELA Tamper View",
    toolExif: "Metadata / EXIF",
    toolQR: "QR Cross-Check",
    toolUDIN: "UDIN Verifier",

    accMCA21: "1. MCA21 & Director Identity",
    accMSME: "2. MSME & Udyam Scope",
    accTax: "3. GSTN & Tax Solvency",
    accMII: "4. Make in India (MII) & CA Turnover",
    accEPFO: "5. EPFO / ESIC Manpower",

    aiDisclaimer: "AI findings are decision-support only. Final authority rests with the Procurement Officer under GeM guidelines.",
    btnDraftClarification: "Draft Clarification",
    btnQualify: "Qualify Bidder",
    btnDisqualify: "Disqualify Bidder",
    btnExportDossier: "Export Audit PDF",

    cartelTitle: "Cartel Collusion & Syndicate Radar",
    cartelSub: "Discovers hidden ownership, shared directors, and common connections between bidders.",
    cartelRingAlert: "Collusive Syndicate Cluster Detected (94% Match)",
    nodeBidder: "Bidder",
    nodeDirector: "Director DIN",
    nodeIPSubnet: "IP Subnet",
    nodeBank: "Bank Branch",
    nodeHash: "File Creator Tool",
    confidenceScore: "Collusion Probability",

    modalClarificationTitle: "Clarification Notice (GeM GTC)",
    modalDisqualifyTitle: "Disqualification Record",
    modalExifTitle: "Document Metadata & Creator Details",
    modalQRTitle: "QR Code vs Document Text Verification",
    modalUDINTitle: "ICAI UDIN Verification",
    modalGatewayTitle: "Government Gateway Telemetry",
    modalClose: "Close",
    modalConfirm: "Confirm Action",
    modalCopyNotice: "Copy Notice",
    modalCopiedNotice: "Copied!",

    // Audit Log
    auditSubtitle: "Immutable, cryptographically chained audit log of all scrutiny checks and decisions.",
    auditCvcBadge: "CVC-Compliant Records",
    auditSha256Badge: "SHA-256 Sealed",
    auditTotalSealed: "Total Sealed Logs",
    auditCryptoTrail: "100% Verified Trail",
    auditCriticalAlerts: "Critical Alerts",
    auditDebarmentSub: "Debarments & Forgeries",
    auditCompliantPassed: "Compliant Bids",
    auditTechMetSub: "All Criteria Met",
    auditGatewayPolls: "Gateway Checks",
    auditGatewaySub: "GSTN / Udyam / CBDT",
    auditClarifications: "Clarifications",
    auditClarificationsSub: "Active Notices Sent",
    auditSearchPlaceholder: "Search by Bidder, Log ID, Action, or Clause...",
    auditFilterAll: "All Logs",
    auditFilterCritical: "Critical",
    auditFilterCompliant: "Compliant",
    auditFilterGateway: "Gateways",
    auditFilterClarification: "Clarifications",
    auditColLogIdTime: "Log ID & Time",
    auditColTenderRef: "Tender Ref",
    auditColBidderSubsystem: "Bidder / Subsystem",
    auditColActionAuthority: "Action & Authority",
    auditColAuditorAgent: "Auditor",
    auditColStatus: "Status",
    auditColShaDigest: "SHA-256 Digest",
    auditColDetails: "Details",
    auditBtnInspect: "Inspect",
    auditNoRecords: "No audit records match the selected filters.",
    auditResetFilters: "Reset filters",
    auditModalTitle: "Audit Record Certificate",
    auditModalTimestamp: "Timestamp",
    auditModalTenderId: "Tender Ref ID",
    auditModalEntity: "Legal Entity",
    auditModalAuditor: "Auditor ID",
    auditModalAuthority: "Governing Authority",
    auditModalFindings: "Verification Findings:",
    auditModalDigestTitle: "Cryptographic Digest",
    auditModalVerified: "VERIFIED & UNALTERED",
    auditModalCopy: "Copy",
    auditModalCopied: "Copied",
    auditModalExportJson: "Export (JSON)",
    auditModalClose: "Close",

    // Gateways Page
    gwInfraTitle: "Gateway Telemetry & Middleware",
    gwAvgLatency: "Average Latency",
    gwPageTitle: "Government Gateways Health",
    gwPageSubtitle: "Real-time verification links querying official source-of-truth registries",
    gwMode: "Mode",
    gwPingAll: "Ping All Gateways",
    gwPinging: "Checking Gateways...",
    gwArchTitle: "How Statutory Verification Works",
    gwArchDesc: "GeM-Rakshak serves as a secure verification middleware, standardizing statutory formats and generating tamper-evident audit trails for CVC scrutiny.",
    gwSandboxTitle: "Statutory API Sandbox",
    gwSandboxSubtitle: "Execute live API calls to test compliance verification",
    gwPresetsLabel: "Test Presets:",
    gwSelectGateway: "Select Government Gateway",
    gwTargetIdentifier: "Target Identifier (GSTIN/PAN/UDIN)",
    gwBtnVerify: "Verify Registry",
    gwVerifying: "Querying...",
    gwLiveResponse: "Gateway Response",
    gwDigestTitle: "Audit Digest",
    gwAuthority: "Authority",
    gwStatus: "Status",
    gwLatency: "Latency",
    gwRawJson: "Raw Response",
    gwBtnCopy: "Copy JSON",
    gwBtnCopied: "Copied!",
    gwEndpoint: "Endpoint",
    gwUptime: "Uptime",

    // Forensics Lab
    forensicsHeroTitle: "Document Verification & Forensics",
    forensicsHeroSubtitle: "Check tender documents for Photoshop edits, fake CA certificates, and registry mismatches.",
    forensicsSampleTampered: "Tampered CA Certificate",
    forensicsSampleGenuine: "Genuine MSME Udyam",
    forensicsSampleUpload: "Upload Bid Document",
    forensicsDropzoneTitle: "Drop PDF tender document here or click to browse",
    forensicsDropzoneSubtitle: "Supports CA Certificates, GST returns, Udyam certificates up to 25MB",
    forensicsBtnInstantTest: "Instant Verification",
    forensicsDocOverview: "Verification Summary",
    forensicsVerdictCritical: "FORGERY DETECTED",
    forensicsVerdictGenuine: "VERIFIED GENUINE",
    forensicsOcrBlocks: "Extracted Document Fields",
    forensicsAnomalousBadge: "Flagged Field",
    forensicsExifInspector: "Metadata & Creator Info",
    forensicsQrCrossCheck: "QR Code Verification",
    forensicsUdinValidator: "ICAI UDIN Verifier",
    forensicsScanStep1: "1/4: Generating SHA-256 seal & verifying file integrity...",
    forensicsScanStep2: "2/4: Checking document authoring metadata & image layers...",
    forensicsScanStep3: "3/4: Reading document text and statutory identifiers...",
    forensicsScanStep4: "4/4: Cross-checking PAN, GSTIN, and UDIN with official registries...",

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
    appSubtitle: "सार्वजनिक खरीद शुचिता एवं दस्तावेज़ फोरेंसिक",
    orgName: "चेन्नई पेट्रोलियम कॉर्पोरेशन लिमिटेड (CPCL) • MoP&NG",
    gatewayStatusBadge: "सभी 8 सरकारी गेटवे सक्रिय",
    mockSandbox: "डेमो सैंडबॉक्स",
    liveGateway: "लाइव गेटवे",
    searchPlaceholder: "निविदा संख्या, बोलीदाता, जीएसटी, उद्यम खोजें...",

    navDashboard: "डैशबोर्ड",
    navTenders: "निविदा पाइपलाइन",
    navBidders: "बोलीदाता संवीक्षा",
    navCartelRadar: "कार्टेल रडार",
    navForensicsLab: "दस्तावेज़ फोरेंसिक",
    navGateways: "गेटवे स्वास्थ्य",
    navAuditLog: "ऑडिट लॉग",

    sidebarProcuringEntity: "खरीददार इकाई",
    sidebarSwitch: "बदलें",
    sidebarActiveTenderBadge: "सक्रिय",
    sidebarAlertBadge: "चेतावनी",
    sidebarPlatformDossier: "प्लेटफॉर्म डोजियर",
    sidebarGuardTitle: "खरीद सुरक्षा गार्ड",
    sidebarGuardDesc: "GeM सामान्य शर्तों के तहत स्वचालित जालसाजी-रोधी जांच।",

    kpiActiveTenders: "सक्रिय निविदाएं",
    kpiBidsToday: "आज जांची गई बोलियां",
    kpiFraudBlocked: "रोका गया फर्जीवाड़ा",
    kpiFraudBlockedBadge: "7 फर्जीवाड़े चिन्हित",
    kpiTimeSaved: "सत्यापन समय",
    kpiTimeSavedBadge: "< 30 सेकंड (4.5 दिन से घटकर)",
    kpiSubtitleTenders: "निगरानी में सक्रिय CPCL निविदाएं",
    kpiSubtitleBids: "8 सरकारी पोर्टलों द्वारा सत्यापित",

    dashWelcomeOrg: "CPCL खरीद प्रकोष्ठ • मनाली रिफाइनरी",
    dashLiveConsole: "लाइव संवीक्षा कंसोल",
    dashHeroDesc: "सरकारी डेटाबेस के माध्यम से बोलीदाताओं, दस्तावेज़ों और सिंडिकेट की तत्काल स्वचालित जांच।",
    dashCartelAlertBtn: "कार्टेल रडार: 1 सिंडिकेट चिन्हित",
    dashEvaluateBtn: "सक्रिय निविदा की जांच करें",
    dashRiskDistribution: "बोलीदाता अनुपालन एवं जोखिम स्थिति",
    dashTimeSavedChart: "सत्यापन समय (पारंपरिक बनाम GeM-रक्षक)",
    dashCompliantLabel: "अनुपालन योग्य / स्वच्छ",
    dashClarificationLabel: "स्पष्टीकरण आवश्यक",
    dashHighRiskLabel: "उच्च जोखिम / फर्जी",
    dashManualScrutinyLabel: "पारंपरिक संवीक्षा",
    dashAiScrutinyLabel: "GeM-रक्षक",

    tendersHeader: "निविदा संवीक्षा पाइपलाइन",
    tendersSubheader: "सक्रिय निविदाओं के लिए स्वचालित अनुपालन एवं विसंगति जांच",
    colTenderId: "निविदा संख्या",
    colTitle: "मद एवं कार्यक्षेत्र",
    colCategory: "श्रेणी",
    colDeadline: "अंतिम तिथि",
    colTotalBids: "कुल बोलियां",
    colProgress: "प्रगति",
    colAction: "कार्रवाई",
    btnScrutinize: "बोलियां जांचें",
    btnViewCartel: "कार्टेल रडार",

    tenderParamsTitle: "अनिवार्य निविदा पात्रता शर्तें (CPCL)",
    paramMinTurnover: "न्यूनतम कारोबार: ₹15.00 करोड़",
    paramMIIClass: "क्लास-I स्थानीय आपूर्तिकर्ता (≥50%)",
    paramNICCode: "अनिवार्य NIC: 28132 (वाल्व / पंप)",
    paramOEMAuth: "OEM प्राधिकरण: अनिवार्य",
    paramEPFO: "EPFO एवं ESIC: नियमित प्रमाण",
    cartelBannerWarning: "⚠️ संदिग्ध सिंडिकेट: 2 बोलीदाता एक ही निदेशक एवं वाई-फाई साझा करते हैं।",
    cartelBannerBtn: "कार्टेल ग्राफ देखें",
    filterAll: "सभी बोलियां",
    filterCompliant: "सत्यापित",
    filterClarification: "स्पष्टीकरण आवश्यक",
    filterHighRisk: "उच्च जोखिम / अयोग्य",

    colBidderName: "बोलीदाता का नाम",
    colSellerId: "विक्रेता ID",
    colBidValue: "बोली मूल्य (INR)",
    colScoreGauge: "अनुपालन स्कोर",
    colRiskBadge: "जोखिम स्थिति",
    colDeepDive: "ऑडिट जांच",

    statusCompliant: "सत्यापित स्वच्छ",
    statusClarification: "स्पष्टीकरण आवश्यक",
    statusHighRisk: "उच्च जोखिम / अयोग्य",
    statusDebarred: "प्रतिबंधित / काली सूची",

    auditTitle: "बोलीदाता अनुपालन एवं दस्तावेज़ फोरेंसिक",
    docForensicsHeader: "दस्तावेज़ सत्यापन एवं दर्शक",
    docForensicsSub: "पिक्सेल छेड़छाड़ जांच, मेटाडेटा ऑडिट एवं क्यूआर सत्यापन",
    reconEngineHeader: "क्रॉस-पोर्टल मिलान",
    reconEngineSub: "MCA21, GSTN, उद्यम, CPPP और EPFO से तत्काल समाधान",
    laserScanActive: "दस्तावेज़ अखंडता जांच जारी...",
    laserScanNotice: "डिजिटल हस्ताक्षर, छवि परतों एवं आधिकारिक संस्थाओं का सत्यापन",

    toolNormal: "सामान्य दृश्य",
    toolELA: "ईएलए छेड़छाड़ दृश्य",
    toolExif: "मेटाडेटा / EXIF",
    toolQR: "क्यूआर सत्यापन",
    toolUDIN: "यूडीआईएन सत्यापन",

    accMCA21: "1. MCA21 व निदेशक पहचान",
    accMSME: "2. एमएसएमई व उद्यम दायरा",
    accTax: "3. जीएसटी एवं वित्तीय स्थिति",
    accMII: "4. मेक इन इंडिया व सीए टर्नओवर",
    accEPFO: "5. ईपीएफओ / ईएसआईसी श्रम अनुपालन",

    aiDisclaimer: "सिफ़ारिश केवल निर्णय-समर्थन हेतु है। GeM नियमों के तहत अंतिम अधिकार खरीद अधिकारी के पास है।",
    btnDraftClarification: "स्पष्टीकरण नोटिस बनाएं",
    btnQualify: "पात्र घोषित करें",
    btnDisqualify: "अयोग्य घोषित करें",
    btnExportDossier: "ऑडिट PDF डाउनलोड करें",

    cartelTitle: "कार्टेल मिलीभगत एवं सिंडिकेट रडार",
    cartelSub: "बोलीदाताओं के बीच साझा निदेशक, बैंक शाखा एवं गुप्त साठगांठ की पहचान।",
    cartelRingAlert: "संदिग्ध मिलीभगत समूह चिन्हित (94% मिलान)",
    nodeBidder: "बोलीदाता",
    nodeDirector: "निदेशक DIN",
    nodeIPSubnet: "आईपी सबनेट",
    nodeBank: "बैंक शाखा",
    nodeHash: "सॉफ़्टवेयर टूल",
    confidenceScore: "मिलीभगत संभावना",

    modalClarificationTitle: "स्पष्टीकरण नोटिस (GeM GTC)",
    modalDisqualifyTitle: "अयोग्यता रिकॉर्ड",
    modalExifTitle: "दस्तावेज़ मेटाडेटा व निर्माता विवरण",
    modalQRTitle: "क्यूआर कोड बनाम दस्तावेज़ पाठ सत्यापन",
    modalUDINTitle: "आईसीएआई यूडीआईएन सत्यापन",
    modalGatewayTitle: "सरकारी गेटवे टेलीमेट्री",
    modalClose: "बंद करें",
    modalConfirm: "पुष्टि करें",
    modalCopyNotice: "नोटिस कॉपी करें",
    modalCopiedNotice: "कॉपी हो गया!",

    // Audit Log
    auditSubtitle: "सभी संवीक्षा घटनाओं और निर्णयों का सुरक्षित एवं अपरिवर्तनीय ऑडिट बहीखाता।",
    auditCvcBadge: "CVC-अनुरूप रिकॉर्ड",
    auditSha256Badge: "SHA-256 सीलबंद",
    auditTotalSealed: "कुल सीलबंद लॉग",
    auditCryptoTrail: "100% सत्यापित ट्रेल",
    auditCriticalAlerts: "गंभीर चेतावनियां",
    auditDebarmentSub: "प्रतिबंध व जालसाजी",
    auditCompliantPassed: "अनुपालन बोलियां",
    auditTechMetSub: "मानदंड पूर्ण",
    auditGatewayPolls: "गेटवे जांच",
    auditGatewaySub: "GSTN / उद्यम / CBDT",
    auditClarifications: "स्पष्टीकरण",
    auditClarificationsSub: "भेजे गए नोटिस",
    auditSearchPlaceholder: "बोलीदाता, लॉग आईडी या कार्रवाई द्वारा खोजें...",
    auditFilterAll: "सभी लॉग",
    auditFilterCritical: "गंभीर",
    auditFilterCompliant: "अनुपालन",
    auditFilterGateway: "गेटवे",
    auditFilterClarification: "स्पष्टीकरण",
    auditColLogIdTime: "लॉग आईडी व समय",
    auditColTenderRef: "निविदा संदर्भ",
    auditColBidderSubsystem: "बोलीदाता / प्रणाली",
    auditColActionAuthority: "कार्रवाई एवं प्राधिकार",
    auditColAuditorAgent: "परीक्षक",
    auditColStatus: "स्थिति",
    auditColShaDigest: "SHA-256 डाइजेस्ट",
    auditColDetails: "विवरण",
    auditBtnInspect: "निरीक्षण करें",
    auditNoRecords: "कोई ऑडिट रिकॉर्ड नहीं मिला।",
    auditResetFilters: "फ़िल्टर रीसेट करें",
    auditModalTitle: "ऑडिट रिकॉर्ड प्रमाणपत्र",
    auditModalTimestamp: "सत्यापन समय",
    auditModalTenderId: "निविदा संदर्भ संख्या",
    auditModalEntity: "कानूनी इकाई",
    auditModalAuditor: "लेखा परीक्षक",
    auditModalAuthority: "प्राधिकरण एवं नियम",
    auditModalFindings: "सत्यापन निष्कर्ष:",
    auditModalDigestTitle: "क्रिप्टोग्राफिक डाइजेस्ट",
    auditModalVerified: "सत्यापित एवं सुरक्षित",
    auditModalCopy: "कॉपी करें",
    auditModalCopied: "कॉपी हो गया",
    auditModalExportJson: "निर्यात करें (JSON)",
    auditModalClose: "बंद करें",

    // Gateways Page
    gwInfraTitle: "गेटवे टेलीमेट्री एवं मिडलवेयर",
    gwAvgLatency: "औसत विलंबता",
    gwPageTitle: "सरकारी गेटवे स्वास्थ्य",
    gwPageSubtitle: "आधिकारिक रजिस्ट्रीयों से वास्तविक समय में जुड़ाव",
    gwMode: "मोड",
    gwPingAll: "सभी गेटवे जांचें",
    gwPinging: "जांच जारी है...",
    gwArchTitle: "वैधानिक सत्यापन कैसे कार्य करता है",
    gwArchDesc: "GeM-रक्षक प्रारूपों का मानकीकरण करता है और CVC संवीक्षा हेतु छेड़छाड़-मुक्त ऑडिट ट्रेल बनाता है।",
    gwSandboxTitle: "वैधानिक एपीआई सैंडबॉक्स",
    gwSandboxSubtitle: "अनुपालन सत्यापन का परीक्षण करने हेतु लाइव परीक्षण",
    gwPresetsLabel: "परीक्षण प्रीसेट:",
    gwSelectGateway: "सरकारी गेटवे चुनें",
    gwTargetIdentifier: "पहचान संख्या (GSTIN/PAN/UDIN)",
    gwBtnVerify: "सत्यापन निष्पादित करें",
    gwVerifying: "पूछताछ जारी है...",
    gwLiveResponse: "गेटवे प्रतिक्रिया",
    gwDigestTitle: "ऑडिट डाइजेस्ट",
    gwAuthority: "प्राधिकरण",
    gwStatus: "स्थिति",
    gwLatency: "विलंबता",
    gwRawJson: "रॉ प्रतिक्रिया",
    gwBtnCopy: "JSON कॉपी करें",
    gwBtnCopied: "कॉपी हो गया!",
    gwEndpoint: "एंडपॉइंट",
    gwUptime: "अपटाइम",

    // Forensics Lab
    forensicsHeroTitle: "दस्तावेज़ सत्यापन एवं फोरेंसिक",
    forensicsHeroSubtitle: "निविदा दस्तावेज़ों में फ़ोटोशॉप संपादन, फ़र्ज़ी सीए प्रमाणपत्र और सिंडिकेट की तत्काल जांच।",
    forensicsSampleTampered: "छेड़छाड़ किया गया सीए प्रमाणपत्र",
    forensicsSampleGenuine: "प्रामाणिक एमएसएमई उद्यम",
    forensicsSampleUpload: "बोली दस्तावेज़ अपलोड करें",
    forensicsDropzoneTitle: "दस्तावेज़ यहाँ छोड़ें या ब्राउज़ करें",
    forensicsDropzoneSubtitle: "सीए प्रमाणपत्र, जीएसटी रिटर्न, उद्यम प्रमाण (25MB तक)",
    forensicsBtnInstantTest: "त्वरित सत्यापन",
    forensicsDocOverview: "सत्यापन सारांश",
    forensicsVerdictCritical: "जालसाजी चिन्हित",
    forensicsVerdictGenuine: "सत्यापित प्रामाणिक",
    forensicsOcrBlocks: "दस्तावेज़ से प्राप्त फ़ील्ड्स",
    forensicsAnomalousBadge: "चिन्हित फ़ील्ड",
    forensicsExifInspector: "मेटाडेटा एवं निर्माता विवरण",
    forensicsQrCrossCheck: "क्यूआर कोड सत्यापन",
    forensicsUdinValidator: "आईसीएआई यूडीआईएन सत्यापन",
    forensicsScanStep1: "1/4: SHA-256 सील एवं फ़ाइल अखंडता जांच...",
    forensicsScanStep2: "2/4: सॉफ़्टवेयर मेटाडेटा एवं छवि परतों की जांच...",
    forensicsScanStep3: "3/4: दस्तावेज़ पाठ्य एवं वैधानिक पहचान पढ़ना...",
    forensicsScanStep4: "4/4: पैन, जीएसटी एवं सीए नंबर का लाइव सत्यापन...",

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

// --- BILINGUAL DATA HELPERS (MOCK & STATUTORY CONTENT) ---

export function getBidderLegalName(name: string, lang: Language): string {
  if (lang !== "hi") return name;
  const map: Record<string, string> = {
    "Aura Flow Systems Private Limited": "ऑरा फ्लो सिस्टम्स प्राइवेट लिमिटेड",
    "Bharat Petro-Tech Solutions": "भारत पेट्रो-टेक सॉल्यूशंस",
    "Apex Engineering & Logistics Enterprises": "एपेक्स इंजीनियरिंग एंड लॉजिस्टिक्स एंटरप्राइजेज",
    "Apex Flow Dynamics LLP": "एपेक्स फ्लो डायनेमिक्स एलएलपी",
  };
  return map[name] || name;
}

export function getCartelNodeLabel(label: string, lang: Language): string {
  if (lang !== "hi") return label;
  const map: Record<string, string> = {
    "Aura Flow Systems": "ऑरा फ्लो सिस्टम्स",
    "Bharat Petro-Tech": "भारत पेट्रो-टेक",
    "Apex Engineering": "एपेक्स इंजीनियरिंग",
    "Apex Flow Dynamics": "एपेक्स फ्लो डायनेमिक्स",
    "DIN 08492019 (Vikram Singhal)": "DIN 08492019 (विक्रम सिंघल)",
    "Subnet 192.168.44.0/24": "सबनेट 192.168.44.0/24",
    "IFSC HDFC0001294": "बैंक IFSC HDFC0001294",
    "Photoshop CC 2024 (Mac)": "फ़ोटोशॉप CC 2024 हैश",
    "DIN 07812940 (S. Ramanathan)": "DIN 07812940 (एस. रामनाथन)",
    "IP 122.178.91.44 (Chennai)": "आईपी 122.178.91.44 (चेन्नई)",
  };
  return map[label] || label;
}

export function getCartelNodeType(type: string, lang: Language): string {
  if (lang !== "hi") return type;
  const map: Record<string, string> = {
    bidder: "बोलीदाता",
    director: "निदेशक",
    ip_subnet: "आईपी सबनेट",
    bank: "बैंक खाता",
    pdf_hash: "पीडीएफ मेटाडेटा हैश",
  };
  return map[type] || type;
}

export function getCartelNodeDetails(id: string, defaultDetails: string | undefined, lang: Language): string {
  if (lang !== "hi") return defaultDetails || "";
  const map: Record<string, string> = {
    "BID-001": "वास्तविक स्वतंत्र बोलीदाता। कोई साझा निदेशक या डिजिटल फिंगरप्रिंट नहीं।",
    "BID-002": "स्वतंत्र इकाई; मामूली वैधानिक प्रक्रियात्मक त्रुटियां।",
    "BID-003": "IOCL द्वारा प्रतिबंधित। प्राथमिक सिंडिकेट नोड।",
    "BID-004": "प्रतिस्पर्धी मूल्य निर्धारण को दबाने के लिए इस्तेमाल की गई मुखौटा (शेल) प्रॉक्सी बोलीदाता।",
    "DIN-08492019": "दोनों एपेक्स संस्थाओं में एमसीए21 में पंजीकृत साझा निदेशक।",
    "IP-SUBNET": "दोनों बोलियां ओखला, नई दिल्ली में एक ही स्थिर फाइबर ब्लॉक से अपलोड की गईं।",
    "BANK-HDFC": "ईएमडी बैंक गारंटी/खाता एक ही शाखा में खोला गया।",
    "PDF-METADATA": "प्रस्तुत पीडीएफ फाइलों में एक समान एक्सएमपी मेटाडेटा फिंगरप्रिंट का पता चला।",
    "DIN-07812940": "स्वतंत्र सत्यापित बोर्ड सदस्य।",
    "IP-CHENNAI": "चेन्नई में स्वतंत्र व्यावसायिक लीज्ड लाइन।",
  };
  return map[id] || defaultDetails || "";
}

export function getCartelFactorText(factor: string, lang: Language): string {
  if (lang !== "hi") return factor;
  if (factor.includes("Common Director DIN 08492019")) {
    return "साझा निदेशक DIN 08492019 (विक्रम सिंघल)";
  }
  if (factor.includes("Identical Bid Upload IP Subnet")) {
    return "समान बोली अपलोड आईपी सबनेट: 192.168.44.0/24 (समय अंतर: 4 मिनट 12 सेकंड)";
  }
  if (factor.includes("Matching Bank Branch & IFSC")) {
    return "समान बैंक शाखा एवं IFSC: HDFC0001294 (ओखला औद्योगिक क्षेत्र)";
  }
  if (factor.includes("Identical PDF Creator Tool Hash")) {
    return "समान पीडीएफ निर्माता टूल हैश: Adobe Photoshop CC 2024 (Macintosh)";
  }
  return factor;
}

export function getForensicsDocName(name: string, lang: Language): string {
  if (lang !== "hi") return name;
  const map: Record<string, string> = {
    "CA Turnover Certificate (Photoshop Altered)": "सीए कारोबार प्रमाणपत्र (फ़ोटोशॉप द्वारा परिवर्तित)",
    "Udyam Registration Certificate (Aura Flow Systems)": "उद्यम पंजीकरण प्रमाणपत्र (ऑरा फ्लो सिस्टम्स)",
    "Udyam Registration Certificate (Apex Engineering Solutions)": "उद्यम पंजीकरण प्रमाणपत्र (एपेक्स इंजीनियरिंग सॉल्यूशंस)",
    "Statutory Tax Return & Udyam Dossier (Bharat Petro-Tech)": "वैधानिक कर रिटर्न एवं उद्यम डोजियर (भारत पेट्रो-टेक)",
    "Statutory Eligibility Undertaking (Apex Logistics - Debarred)": "वैधानिक पात्रता घोषणापत्र (एपेक्स लॉजिस्टिक्स - प्रतिबंधित)",
  };
  return map[name] || name;
}

export function getForensicsOcrText(text: string, lang: Language): string {
  if (lang !== "hi") return text;
  const map: Record<string, string> = {
    "CHARTERED ACCOUNTANT STATUTORY TURNOVER CERTIFICATE": "सनदी लेखाकार (CA) वैधानिक कारोबार प्रमाणपत्र",
    "Client: Apex Engineering & Logistics Enterprises (PAN: AAACD9988P)": "ग्राहक: एपेक्स इंजीनियरिंग एंड लॉजिस्टिक्स एंटरप्राइजेज (पैन: AAACD9988P)",
    "Certified Annual Turnover FY 2024-25: INR 18,50,00,000": "प्रमाणित वार्षिक कारोबार वित्त वर्ष 2024-25: ₹ 18,50,00,000",
    "GSTIN: 07AAACD9988P1Z3 (Suo-moto Suspended)": "GSTIN: 07AAACD9988P1Z3 (स्वतः संज्ञान निलंबित)",
    "UDIN: 26099999INVALID9": "UDIN: 26099999INVALID9",
    "UDIN: 26099999INVALID001": "UDIN: 26099999INVALID001",
    "UDYAM REGISTRATION CERTIFICATE": "उद्यम पंजीकरण प्रमाणपत्र",
    "UDYAM REGISTRATION CERTIFICATE - MINISTRY OF MSME": "उद्यम पंजीकरण प्रमाणपत्र - एमएसएमई मंत्रालय",
    "UDYAM-TN-02-0041289 (Small Enterprise)": "UDYAM-TN-02-0041289 (लघु उद्यम)",
    "UDYAM-HR-03-0019284 (Small Enterprise - Manufacturing)": "UDYAM-HR-03-0019284 (लघु उद्यम - विनिर्माण)",
    "Manufacture of Pumps and Compressors (NIC 28131)": "पंप एवं कंप्रेशर्स का निर्माण (NIC 28131)",
    "Apex Engineering Solutions Pvt Ltd (PAN: AAACA1234A)": "एपेक्स इंजीनियरिंग सॉल्यूशंस प्राइवेट लिमिटेड (पैन: AAACA1234A)",
    "GSTIN: 06AAACA1234A1Z5 (Active Regular Taxpayer)": "GSTIN: 06AAACA1234A1Z5 (सक्रिय नियमित करदाता)",
    "STATUTORY TAX RETURN & MSME REGISTRATION DOSSIER": "वैधानिक कर रिटर्न एवं एमएसएमई पंजीकरण डोजियर",
    "Vendor: Bharat Petro-Tech Supplies Pvt Ltd (PAN: AAACB5678G)": "विक्रेता: भारत पेट्रो-टेक सप्लाइज प्राइवेट लिमिटेड (पैन: AAACB5678G)",
    "GSTIN: 27AAACB5678G1Z2 • Maharashtra Jurisdiction": "GSTIN: 27AAACB5678G1Z2 • महाराष्ट्र क्षेत्राधिकार",
    "MSME: UDYAM-MH-02-0044812 (Services - NIC 74909)": "एमएसएमई: UDYAM-MH-02-0044812 (सेवाएं - NIC 74909)",
    "Declared Annual Turnover FY 2024-25: INR 4,20,00,000": "घोषित वार्षिक कारोबार वित्त वर्ष 2024-25: ₹ 4,20,00,000",
    "CENTRAL PUBLIC PROCUREMENT PORTAL - BIDDER INTEGRITY UNDERTAKING": "केंद्रीय सार्वजनिक खरीद पोर्टल - बोलीदाता सत्यनिष्ठा घोषणा",
    "Bidder: Apex Logistics & Infra Enterprises (PAN: AAACD9988P)": "बोलीदाता: एपेक्स लॉजिस्टिक्स एंड इंफ्रा एंटरप्राइजेज (पैन: AAACD9988P)",
    "GSTIN: 07AAACD9988P1Z3 (Suo-moto Suspended Rule 21A)": "GSTIN: 07AAACD9988P1Z3 (नियम 21A स्वतः संज्ञान निलंबित)",
    "DEBARMENT STATUS: BLACKLISTED UNDER ORDER CPPP/2026/BLK-8812": "प्रतिबंध स्थिति: आदेश CPPP/2026/BLK-8812 के तहत ब्लैकलिस्टेड",
    "Grounds: Collusive tendering and circular bid rigging detected": "कारण: मिलीभगत से निविदा और परिपत्र बोली हेराफेरी चिह्नित",
    "Manufacturing of Pumps & Valves (NIC 28131)": "पंप और वाल्व निर्माण (NIC 28131)",
    "Aura Flow Systems Private Limited (PAN: AAACA1234F)": "ऑरा फ्लो सिस्टम्स प्राइवेट लिमिटेड (पैन: AAACA1234F)",
  };
  return map[text] || text;
}

export function getForensicsGatewayName(name: string, lang: Language): string {
  if (lang !== "hi") return name;
  const map: Record<string, string> = {
    "Goods and Services Tax Network (GSTN)": "वस्तु एवं सेवा कर नेटवर्क (GSTN)",
    "Central Board of Direct Taxes & CPPP Blacklist": "केंद्रीय प्रत्यक्ष कर बोर्ड एवं CPPP ब्लैकलिस्ट",
    "ICAI UDIN Registry": "आईसीएआई यूडीआईएन रजिस्ट्री",
    "Ministry of MSME (Udyam Portal)": "सूक्ष्म, लघु एवं मध्यम उद्यम मंत्रालय (उद्यम पोर्टल)",
    "Central Board of Direct Taxes (CBDT) / PAN": "केंद्रीय प्रत्यक्ष कर बोर्ड (CBDT) / पैन",
  };
  return map[name] || name;
}

export function getForensicsGatewayDetail(detail: string, lang: Language): string {
  if (lang !== "hi") return detail;
  if (detail.includes("Suo-moto Suspension active under Rule 21A")) {
    return "सर्कुलर ट्रेडिंग जांच के लिए नियम 21A के तहत स्वतः संज्ञान निलंबन सक्रिय। सत्यापित GSTN राजस्व ₹1.5 करोड़ घोषित ₹18.5 करोड़ के विरोधाभासी है।";
  }
  if (detail.includes("CPPP Order BLK-8812")) {
    return "CPPP आदेश BLK-8812: इकाई को सभी सार्वजनिक खरीद निविदाओं से प्रतिबंधित किया गया।";
  }
  if (detail.includes("UDIN failed ICAI checksum")) {
    return "UDIN का ICAI चेकसम सत्यापन विफल रहा; संस्थान भंडार में कोई मिलान पंजीकरण नहीं मिला।";
  }
  if (detail.includes("Verified Authentic Udyam Certificate")) {
    return "सत्यापित प्रामाणिक उद्यम प्रमाणपत्र। लघु उद्यम, विनिर्माण श्रेणी (NIC 28131)। GeM खरीद वरीयता हेतु पात्र।";
  }
  if (detail.includes("PAN is valid and operational")) {
    return "पैन मान्य और सक्रिय है। कोई CPPP प्रतिबंध रिकॉर्ड नहीं मिला।";
  }
  return detail;
}

export function getGatewayInfo(
  gw: { id: string; name: string; authority: string; statutory_scope: string },
  lang: Language
): { name: string; authority: string; statutory_scope: string } {
  if (lang !== "hi") {
    return { name: gw.name, authority: gw.authority, statutory_scope: gw.statutory_scope };
  }
  const hindiData: Record<string, { name: string; authority: string; statutory_scope: string }> = {
    udyam: {
      name: "उद्यम पंजीकरण पोर्टल",
      authority: "सूक्ष्म, लघु एवं मध्यम उद्यम मंत्रालय",
      statutory_scope: "19-अंकीय उद्यम संख्या, उद्यम वर्गीकरण (सूक्ष्म/लघु/मध्यम), NIC 5-अंकीय विनिर्माण दायरा और इकाई के भौतिक पते का सत्यापन करता है।",
    },
    gstn: {
      name: "जीएसटीएन एपीआई गेटवे (GSP)",
      authority: "वस्तु एवं सेवा कर नेटवर्क / CBIC",
      statutory_scope: "जीएसटीआईएन सक्रिय स्थिति, कानूनी बनाम व्यापार नाम स्थिरता, पिछले 6 महीनों में GSTR-1 और GSTR-3B दाखिल करने की नियमितता और कुल कारोबार की जांच करता है।",
    },
    mca21: {
      name: "एमसीए21 रजिस्ट्री (V3)",
      authority: "कॉर्पोरेट कार्य मंत्रालय",
      statutory_scope: "सीआईएन (CIN), निगमन तिथि, प्रदत्त पूंजी, सक्रिय निदेशक (DIN), पंजीकृत कार्यालय का पता और हड़ताल/परिसमापन फाइलिंग का सत्यापन करता है।",
    },
    epfo: {
      name: "ईपीएफओ एकीकृत श्रम सुविधा",
      authority: "श्रम एवं रोजगार मंत्रालय",
      statutory_scope: "प्रतिष्ठान कोड, मासिक इलेक्ट्रॉनिक चालान सह रिटर्न (ECR) फाइलिंग और सक्रिय अंशदाता कर्मियों की संख्या का सत्यापन करता है।",
    },
    esic: {
      name: "ईएसआईसी पोर्टल (पंचदीप)",
      authority: "कर्मचारी राज्य बीमा निगम",
      statutory_scope: "17-अंकीय नियोक्ता कोड, नियमित मासिक वैधानिक वेतन बीमा भुगतान और चूक कार्यवाही की क्रॉस-जांच करता है।",
    },
    dpiit: {
      name: "डीपीआईआईटी एवं स्टार्टअप इंडिया हब",
      authority: "वाणिज्य एवं उद्योग मंत्रालय",
      statutory_scope: "DIPP/DPIIT मान्यता प्राप्त इकाई संख्या, सार्वजनिक खरीद आदेश (मेक इन इंडिया) श्रेणी-I/II घोषणाओं और सीए प्रमाणन रजिस्ट्रीयों की पुष्टि करता है।",
    },
    itd: {
      name: "आयकर विभाग / धारा 206AB",
      authority: "केंद्रीय प्रत्यक्ष कर बोर्ड (CBDT)",
      statutory_scope: "पैन स्थिति (सक्रिय/निष्क्रिय), आधार-पैन लिंकिंग और धारा 206AB/206CCA उच्च कर गैर-फाइलर जुर्माना डेटाबेस का सत्यापन करता है।",
    },
    cppp: {
      name: "सीपीपीपी केंद्रीय प्रतिबंध रजिस्ट्री",
      authority: "खरीद नीति प्रभाग / व्यय विभाग",
      statutory_scope: "सभी सीपीएसई और मंत्रालयों की काली सूचियों, सतर्कता निलंबन आदेशों और GeM विक्रेता प्रतिबंध सूचियों की क्रॉस-जांच करता है।",
    },
  };
  return hindiData[gw.id] || { name: gw.name, authority: gw.authority, statutory_scope: gw.statutory_scope };
}
