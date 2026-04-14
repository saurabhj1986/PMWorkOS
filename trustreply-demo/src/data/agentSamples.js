// Sample questions for the TrustReply Agent tab. Each question has the
// full reasoning trace (classify → map → retrieve → draft) so the right
// pane can animate through the steps. Real CAIQ / SIG / custom questions.

export const agentSamples = [
  {
    id: "Q-047",
    customer: "Latham & Watkins",
    questionnaireType: "CAIQ v4",
    question:
      "How does Acme Corp encrypt customer data at rest and in transit?",
    classify: {
      category: "Data Protection",
      subTopic: "Encryption",
      intent: "factual_lookup",
      confidence: 0.99,
    },
    map: {
      controlId: "CC-05",
      controlName: "Cryptography & Key Management",
      frameworks: ["SOC 2", "ISO 27001", "PCI DSS"],
      matchConfidence: 0.98,
      alternates: ["CC-04", "CC-10"],
    },
    retrieve: [
      { id: "EVD-001", name: "AES-256 config screenshot", date: "2026-03-22", current: true },
      { id: "EVD-002", name: "Key rotation policy", date: "2026-03-22", current: true },
      { id: "EVD-003", name: "TLS 1.2+ enforcement audit log", date: "2026-03-20", current: true },
    ],
    draft: {
      answer:
        "Acme Corp encrypts all customer data at rest using AES-256 via Azure SQL and Cosmos DB. Data in transit is protected using TLS 1.2 or higher on all public endpoints, enforced at the Cloudflare edge. Encryption keys are managed through Azure Key Vault with annual rotation, and access is logged for SOC 2 audit purposes.",
      confidence: 0.96,
      reuseMatch: 0.89,
      reuseSource: "Allen & Overy CAIQ Q-127 (2026-03-12)",
      hallucinationRisk: "none detected",
    },
    trustInputs: { confidence: 0.96, accuracy: 0.96, freshness: 0.97, benchmark: 0.94 },
  },
  {
    id: "Q-184",
    customer: "Latham & Watkins",
    questionnaireType: "CAIQ v4",
    question:
      "Where is customer data stored geographically? Can data residency be restricted to a specific region?",
    classify: {
      category: "Data Sovereignty",
      subTopic: "Data Residency",
      intent: "configuration_lookup",
      confidence: 0.97,
    },
    map: {
      controlId: "CC-12",
      controlName: "Data Residency & Sovereignty",
      frameworks: ["SOC 2", "ISO 27018", "GDPR"],
      matchConfidence: 0.95,
      alternates: ["CC-11"],
    },
    retrieve: [
      { id: "EVD-010", name: "Data Residency Architecture diagram", date: "2026-04-11", current: true, drift: true },
      { id: "EVD-011", name: "Azure region inventory", date: "2026-03-30", current: true },
    ],
    draft: {
      answer:
        "Acme Corp supports data residency in US, EU (Ireland), and UK regions. Customer data is provisioned to a specific region at onboarding and never crosses region boundaries except for opt-in features (e.g., shared model training, which can be disabled). The architecture diagram (EVD-010) was updated yesterday — drift detection has flagged this answer for analyst re-review.",
      confidence: 0.71,
      reuseMatch: 0.62,
      reuseSource: "Bridgewater CAIQ Q-191 (2026-02-04)",
      hallucinationRisk: "low — drift on EVD-010",
    },
    trustInputs: { confidence: 0.71, accuracy: 0.86, freshness: 0.65, benchmark: 0.78 },
  },
  {
    id: "Q-091",
    customer: "Allen & Overy",
    questionnaireType: "SIG Lite",
    question:
      "Describe your incident response process. What are your detection-to-notification SLAs?",
    classify: {
      category: "Incident Response",
      subTopic: "Detection & Notification",
      intent: "process_description",
      confidence: 0.96,
    },
    map: {
      controlId: "CC-09",
      controlName: "Incident Response & Recovery",
      frameworks: ["SOC 2", "ISO 27035", "NIST 800-61"],
      matchConfidence: 0.97,
      alternates: ["CC-15"],
    },
    retrieve: [
      { id: "EVD-014", name: "IR runbook v3.2", date: "2026-03-18", current: true },
      { id: "EVD-015", name: "PagerDuty on-call schedule export", date: "2026-04-01", current: true },
      { id: "EVD-016", name: "2025 IR tabletop exercise report", date: "2025-12-04", current: true },
    ],
    draft: {
      answer:
        "Acme Corp runs a 24/7 incident response process with PagerDuty primary on-call and a dedicated security engineer. Detection SLA: 15 min for critical, 1h for high. Customer notification SLA: 24h for confirmed material incidents per the MSA. Tabletop exercises are run quarterly; the most recent (Dec 2025) report is attached as supporting evidence.",
      confidence: 0.94,
      reuseMatch: 0.81,
      reuseSource: "HSBC Custom Q-22 (2026-02-19)",
      hallucinationRisk: "none detected",
    },
    trustInputs: { confidence: 0.94, accuracy: 0.95, freshness: 0.96, benchmark: 0.93 },
  },
  {
    id: "Q-220",
    customer: "KKR",
    questionnaireType: "SIG Full",
    question:
      "What data loss prevention controls are in place for sensitive document handling?",
    classify: {
      category: "Data Protection",
      subTopic: "DLP",
      intent: "control_inventory",
      confidence: 0.95,
    },
    map: {
      controlId: "CC-04",
      controlName: "Data Classification & DLP",
      frameworks: ["SOC 2", "ISO 27001"],
      matchConfidence: 0.93,
      alternates: ["CC-05"],
    },
    retrieve: [
      { id: "EVD-007", name: "Microsoft Purview DLP policy export", date: "2026-03-15", current: true },
      { id: "EVD-008", name: "Sensitivity label inventory", date: "2026-03-12", current: true },
    ],
    draft: {
      answer:
        "Acme Corp uses Microsoft Purview for sensitivity labeling and DLP enforcement across SharePoint, OneDrive, and Exchange. Customer documents are auto-labeled at ingest based on content classification. Egress is blocked for documents marked Confidential or above without an audit-logged override.",
      confidence: 0.92,
      reuseMatch: 0.78,
      reuseSource: "Bridgewater CAIQ Q-210 (2026-01-18)",
      hallucinationRisk: "none detected",
    },
    trustInputs: { confidence: 0.92, accuracy: 0.94, freshness: 0.92, benchmark: 0.89 },
  },
  {
    id: "Q-249",
    customer: "Latham & Watkins",
    questionnaireType: "CAIQ v4",
    question:
      "Does Acme Corp use customer data to train its underlying foundation models?",
    classify: {
      category: "AI Governance",
      subTopic: "Training Data",
      intent: "policy_lookup",
      confidence: 0.99,
    },
    map: {
      controlId: "CC-18",
      controlName: "AI Model Risk & Governance",
      frameworks: ["EU AI Act", "NIST AI RMF", "ISO 42001"],
      matchConfidence: 0.99,
      alternates: [],
    },
    retrieve: [
      { id: "EVD-018", name: "Customer DPA template (training opt-out clause)", date: "2026-04-02", current: true },
      { id: "EVD-019", name: "Model training data lineage report", date: "2026-03-28", current: true },
    ],
    draft: {
      answer:
        "No. Acme Corp does not use customer prompts, documents, or any customer-derived data to train its underlying foundation models. This is contractually guaranteed in every customer DPA (clause 4.2). Model training uses only Acme Corp-licensed corpora and synthetic data. Lineage of all training data is documented in the model training data lineage report (EVD-019).",
      confidence: 0.98,
      reuseMatch: 0.94,
      reuseSource: "Allen & Overy CAIQ Q-258 (2026-03-12)",
      hallucinationRisk: "none detected",
    },
    trustInputs: { confidence: 0.98, accuracy: 0.99, freshness: 0.97, benchmark: 0.99 },
  },
];

export function getSample(id) {
  return agentSamples.find((s) => s.id === id);
}
