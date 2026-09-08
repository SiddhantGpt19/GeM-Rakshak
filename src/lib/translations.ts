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

  // KPI Cards
  kpiActiveTenders: string;
  kpiBidsToday: string;
  kpiFraudBlocked: string;
  kpiFraudBlockedBadge: string;
  kpiTimeSaved: string;
  kpiTimeSavedBadge: string;
  kpiSubtitleTenders: string;
  kpiSubtitleBids: string;

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

    kpiActiveTenders: "Active Tenders Under Scrutiny",
    kpiBidsToday: "Bids Scrutinized Today",
    kpiFraudBlocked: "Tampering & Fraud Blocked",
    kpiFraudBlockedBadge: "7 Forgeries Flagged",
    kpiTimeSaved: "Evaluation Time Saved",
    kpiTimeSavedBadge: "82% Drop (4.5 Days ➔ 14 Mins)",
    kpiSubtitleTenders: "High-value CPCL Hydrocarbon Procurements",
    kpiSubtitleBids: "Across 8 Government Integrated Gateways",

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
  },
  hi: {
    appTitle: "GeM-रक्षक",
    appSubtitle: "एआई बोली अनुपालन और दस्तावेज़ फोरेंसिक सत्यापन मंच",
    orgName: "चेन्नई पेट्रोलियम कॉर्पोरेशन लिमिटेड (CPCL) • MoP&NG",
    gatewayStatusBadge: "सभी 8 सरकारी गेटवे सक्रिय एवं चालू हैं",
    mockSandbox: "मॉक सैंडबॉक्स मोड",
    liveGateway: "लाइव एपीआई गेटवे",
    searchPlaceholder: "निविदा आईडी, बोलीदाता, जीएसटी, उद्यम खोजें...",

    navDashboard: "डैशबोर्ड",
    navTenders: "निविदा पाइपलाइन",
    navBidders: "बोलीदाता जांच",
    navCartelRadar: "कार्टेल रडार",
    navForensicsLab: "फोरेंसिक सैंडबॉक्स",
    navGateways: "गेटवे स्वास्थ्य",
    navAuditLog: "सीवीसी ऑडिट ट्रेल",

    kpiActiveTenders: "समीक्षाधीन सक्रिय निविदाएं",
    kpiBidsToday: "आज जांची गई बोलियां",
    kpiFraudBlocked: "रोकी गई जालसाजी एवं छेड़छाड़",
    kpiFraudBlockedBadge: "7 फर्जीवाड़े चिन्हित",
    kpiTimeSaved: "सत्यापन समय में बचत",
    kpiTimeSavedBadge: "82% कमी (4.5 दिन ➔ 14 मिनट)",
    kpiSubtitleTenders: "उच्च मूल्य की CPCL हाइड्रोकार्बन खरीद",
    kpiSubtitleBids: "8 सरकारी एकीकृत पोर्टलों के माध्यम से",

    tendersHeader: "निविदा संवीक्षा पाइपलाइन",
    tendersSubheader: "CPCL खरीद हेतु वास्तविक समय में स्वचालित वैधानिक जांच और विसंगति पहचान",
    colTenderId: "निविदा संख्या",
    colTitle: "मद एवं विवरण",
    colCategory: "श्रेणी",
    colDeadline: "अंतिम तिथि",
    colTotalBids: "कुल बोलियां",
    colProgress: "संवीक्षा प्रगति",
    colAction: "कार्रवाई",
    btnScrutinize: "बोलियों की जांच करें",
    btnViewCartel: "कार्टेल रडार",

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
    colSellerId: "GeM विक्रेता आईडी",
    colBidValue: "बोली मूल्य (रु.)",
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
    laserScanNotice: "क्रिप्टोग्राफिक प्रमाण पत्र और दस्तावेज़ परतों का स्कैन",

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
    btnDraftClarification: "स्पष्टीकरण नोटिस स्वतः तैयार करें",
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
    confidenceScore: "कार्टेल संभावना स्कोर",

    modalClarificationTitle: "वैधानिक GeM स्पष्टीकरण नोटिस (खंड 4.1)",
    modalDisqualifyTitle: "वैधानिक अस्वीकृति एवं अयोग्यता दस्तावेज़",
    modalExifTitle: "गहन एक्सिफ एवं एक्सएमपी मेटाडेटा फोरेंसिक निरीक्षक",
    modalQRTitle: "क्यूआर क्रिप्टोग्राफ़िक पेलोड बनाम ओसीआर पाठ्य मिलान",
    modalUDINTitle: "आईसीएआई विशिष्ट दस्तावेज़ पहचान संख्या (UDIN) पंजी",
    modalGatewayTitle: "सरकारी गेटवे टेलीमेट्री और स्वास्थ्य मॉनिटर",
    modalClose: "बंद करें",
    modalConfirm: "पुष्टि करें",
    modalCopyNotice: "कानूनी नोटिस कॉपी करें",
    modalCopiedNotice: "क्लिपबोर्ड पर कॉपी किया गया!",
  },
};
