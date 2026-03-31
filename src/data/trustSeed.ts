// ─── Trust Intelligence Platform — Seed Data ──────────────────────────────────
// Realistic demo data modeling Harvey's Trust & Compliance architecture.
// Mirrors a Snowflake analytical layer consuming GRC tool + security scanner APIs.

// ─── Types ────────────────────────────────────────────────────────────────────

export type FrameworkId = "soc2" | "iso27001" | "hipaa" | "soc1" | "nist_csf";
export type ControlStatus = "effective" | "partially_effective" | "not_effective" | "not_assessed";
export type EvidenceGrade = "A" | "B" | "C" | "F";
export type Severity = "critical" | "high" | "medium" | "low";
export type AutomationLevel = "fully_automated" | "semi_automated" | "manual";
export type EvidenceType = "screenshot" | "config_export" | "policy_doc" | "api_pull" | "log_export";
export type FreshnessStatus = "current" | "expiring_soon" | "stale";
export type AlertStatus = "open" | "acknowledged" | "resolved";

export interface Framework {
  id: FrameworkId;
  name: string;
  shortName: string;
  status: "active" | "planned";
  compliancePct: number;
  controlsMapped: number;
  evidenceCoverage: number;
  nextAuditDate: string;
}

export interface Control {
  id: string;
  name: string;
  description: string;
  owner: string;
  status: ControlStatus;
  frameworks: FrameworkId[];
  lastEvidenceDate: string;
  evidenceQuality: EvidenceGrade;
  automationLevel: AutomationLevel;
  riskLevel: Severity;
}

export interface EvidenceSubmission {
  id: string;
  controlId: string;
  title: string;
  submittedDate: string;
  submittedBy: string;
  type: EvidenceType;
  source: string;
  aiGrade: EvidenceGrade;
  aiNotes: string;
  freshnessStatus: FreshnessStatus;
}

export interface SystemAsset {
  id: string;
  name: string;
  type: string;
  owner: string;
  controlsCovered: number;
  lastScanned: string;
  riskScore: number;
}

export interface TrustAlert {
  id: string;
  severity: Severity;
  title: string;
  description: string;
  createdAt: string;
  status: AlertStatus;
}

export interface MonthlyTrend {
  month: string;
  overall: number;
  soc2: number;
  iso27001: number;
  hipaa: number;
}

// ─── Frameworks ───────────────────────────────────────────────────────────────

export const FRAMEWORKS: Framework[] = [
  {
    id: "soc2",
    name: "SOC 2 Type II",
    shortName: "SOC 2",
    status: "active",
    compliancePct: 91,
    controlsMapped: 24,
    evidenceCoverage: 88,
    nextAuditDate: "2026-09-15",
  },
  {
    id: "iso27001",
    name: "ISO 27001:2022",
    shortName: "ISO 27001",
    status: "active",
    compliancePct: 84,
    controlsMapped: 20,
    evidenceCoverage: 79,
    nextAuditDate: "2026-11-01",
  },
  {
    id: "hipaa",
    name: "HIPAA Security Rule",
    shortName: "HIPAA",
    status: "active",
    compliancePct: 78,
    controlsMapped: 16,
    evidenceCoverage: 72,
    nextAuditDate: "2026-07-20",
  },
  {
    id: "soc1",
    name: "SOC 1 Type II",
    shortName: "SOC 1",
    status: "planned",
    compliancePct: 45,
    controlsMapped: 10,
    evidenceCoverage: 38,
    nextAuditDate: "2027-03-01",
  },
  {
    id: "nist_csf",
    name: "NIST CSF 2.0",
    shortName: "NIST CSF",
    status: "planned",
    compliancePct: 62,
    controlsMapped: 18,
    evidenceCoverage: 55,
    nextAuditDate: "2027-01-15",
  },
];

// ─── Controls ─────────────────────────────────────────────────────────────────

export const CONTROLS: Control[] = [
  // Access Control
  { id: "AC-1", name: "Access Control Policy", description: "Documented access control policy reviewed annually", owner: "Security", status: "effective", frameworks: ["soc2", "iso27001", "hipaa", "nist_csf"], lastEvidenceDate: "2026-03-15", evidenceQuality: "A", automationLevel: "semi_automated", riskLevel: "high" },
  { id: "AC-2", name: "Account Management", description: "User account provisioning/deprovisioning via Okta SCIM", owner: "IT", status: "effective", frameworks: ["soc2", "iso27001", "hipaa"], lastEvidenceDate: "2026-03-28", evidenceQuality: "A", automationLevel: "fully_automated", riskLevel: "critical" },
  { id: "AC-3", name: "MFA Enforcement", description: "Multi-factor authentication required for all production access", owner: "Security", status: "effective", frameworks: ["soc2", "iso27001", "hipaa", "nist_csf"], lastEvidenceDate: "2026-03-29", evidenceQuality: "A", automationLevel: "fully_automated", riskLevel: "critical" },
  { id: "AC-4", name: "Least Privilege Access", description: "Role-based access with quarterly access reviews", owner: "Security", status: "partially_effective", frameworks: ["soc2", "iso27001", "nist_csf"], lastEvidenceDate: "2026-02-10", evidenceQuality: "B", automationLevel: "semi_automated", riskLevel: "high" },
  { id: "AC-5", name: "Privileged Access Management", description: "PAM solution for admin and root access to production", owner: "Security", status: "effective", frameworks: ["soc2", "iso27001", "hipaa", "nist_csf"], lastEvidenceDate: "2026-03-20", evidenceQuality: "A", automationLevel: "fully_automated", riskLevel: "critical" },

  // Configuration Management
  { id: "CM-1", name: "Configuration Management Policy", description: "Baseline configurations for all system components", owner: "Engineering", status: "effective", frameworks: ["soc2", "iso27001", "nist_csf"], lastEvidenceDate: "2026-03-18", evidenceQuality: "A", automationLevel: "fully_automated", riskLevel: "high" },
  { id: "CM-2", name: "Infrastructure as Code", description: "All infrastructure provisioned via Terraform with PR review", owner: "Engineering", status: "effective", frameworks: ["soc2", "iso27001"], lastEvidenceDate: "2026-03-25", evidenceQuality: "A", automationLevel: "fully_automated", riskLevel: "medium" },
  { id: "CM-3", name: "Change Management", description: "All changes tracked via Jira with approval workflow", owner: "Engineering", status: "partially_effective", frameworks: ["soc2", "iso27001", "soc1"], lastEvidenceDate: "2026-01-15", evidenceQuality: "C", automationLevel: "semi_automated", riskLevel: "high" },

  // Incident Response
  { id: "IR-1", name: "Incident Response Plan", description: "Documented IR plan with defined severity levels and escalation", owner: "Security", status: "partially_effective", frameworks: ["soc2", "iso27001", "hipaa", "nist_csf"], lastEvidenceDate: "2025-12-20", evidenceQuality: "C", automationLevel: "manual", riskLevel: "critical" },
  { id: "IR-2", name: "Incident Detection & Alerting", description: "SIEM-based detection with PagerDuty escalation", owner: "Security", status: "effective", frameworks: ["soc2", "iso27001", "nist_csf"], lastEvidenceDate: "2026-03-27", evidenceQuality: "A", automationLevel: "fully_automated", riskLevel: "critical" },
  { id: "IR-3", name: "Incident Post-Mortem Process", description: "Blameless post-mortems within 5 business days", owner: "Engineering", status: "effective", frameworks: ["soc2", "nist_csf"], lastEvidenceDate: "2026-03-10", evidenceQuality: "B", automationLevel: "manual", riskLevel: "medium" },

  // Data Protection
  { id: "SC-1", name: "Data Encryption at Rest", description: "AES-256 encryption for all data stores (RDS, S3, Snowflake)", owner: "Engineering", status: "effective", frameworks: ["soc2", "iso27001", "hipaa", "nist_csf"], lastEvidenceDate: "2026-03-22", evidenceQuality: "A", automationLevel: "fully_automated", riskLevel: "critical" },
  { id: "SC-2", name: "Data Encryption in Transit", description: "TLS 1.3 enforced on all endpoints", owner: "Engineering", status: "effective", frameworks: ["soc2", "iso27001", "hipaa", "nist_csf"], lastEvidenceDate: "2026-03-22", evidenceQuality: "A", automationLevel: "fully_automated", riskLevel: "critical" },
  { id: "SC-3", name: "Data Classification", description: "Data classification policy with labeling in data catalog", owner: "Legal", status: "not_effective", frameworks: ["iso27001", "hipaa"], lastEvidenceDate: "2025-11-05", evidenceQuality: "F", automationLevel: "manual", riskLevel: "high" },
  { id: "SC-4", name: "Data Loss Prevention", description: "DLP rules on email, endpoints, and cloud storage", owner: "Security", status: "partially_effective", frameworks: ["soc2", "iso27001", "hipaa"], lastEvidenceDate: "2026-02-28", evidenceQuality: "B", automationLevel: "semi_automated", riskLevel: "high" },

  // Audit & Logging
  { id: "AU-1", name: "Audit Logging", description: "Centralized logging via Datadog with 1-year retention", owner: "Engineering", status: "effective", frameworks: ["soc2", "iso27001", "hipaa", "nist_csf", "soc1"], lastEvidenceDate: "2026-03-28", evidenceQuality: "A", automationLevel: "fully_automated", riskLevel: "critical" },
  { id: "AU-2", name: "Log Monitoring & Review", description: "Automated log analysis with anomaly detection", owner: "Security", status: "effective", frameworks: ["soc2", "iso27001", "nist_csf"], lastEvidenceDate: "2026-03-26", evidenceQuality: "A", automationLevel: "fully_automated", riskLevel: "high" },

  // Physical & Environmental
  { id: "PE-1", name: "Physical Security", description: "AWS/GCP data center physical controls (inherited)", owner: "IT", status: "effective", frameworks: ["soc2", "iso27001", "hipaa"], lastEvidenceDate: "2026-01-30", evidenceQuality: "B", automationLevel: "manual", riskLevel: "low" },

  // Risk Management
  { id: "RA-1", name: "Risk Assessment", description: "Annual risk assessment with quarterly review", owner: "Security", status: "effective", frameworks: ["soc2", "iso27001", "hipaa", "nist_csf"], lastEvidenceDate: "2026-03-01", evidenceQuality: "B", automationLevel: "semi_automated", riskLevel: "high" },
  { id: "RA-2", name: "Vulnerability Management", description: "Weekly Wiz scans with 30-day SLA for critical findings", owner: "Security", status: "effective", frameworks: ["soc2", "iso27001", "nist_csf"], lastEvidenceDate: "2026-03-29", evidenceQuality: "A", automationLevel: "fully_automated", riskLevel: "critical" },

  // HR & Personnel
  { id: "PS-1", name: "Security Awareness Training", description: "Annual security training with phishing simulations", owner: "HR", status: "effective", frameworks: ["soc2", "iso27001", "hipaa", "nist_csf"], lastEvidenceDate: "2026-02-15", evidenceQuality: "B", automationLevel: "semi_automated", riskLevel: "medium" },
  { id: "PS-2", name: "Background Checks", description: "Pre-employment background verification for all hires", owner: "HR", status: "effective", frameworks: ["soc2", "hipaa", "soc1"], lastEvidenceDate: "2026-03-20", evidenceQuality: "A", automationLevel: "semi_automated", riskLevel: "medium" },

  // Business Continuity
  { id: "CP-1", name: "Business Continuity Plan", description: "Documented BCP with annual tabletop exercise", owner: "Security", status: "partially_effective", frameworks: ["soc2", "iso27001", "hipaa", "nist_csf"], lastEvidenceDate: "2025-12-01", evidenceQuality: "C", automationLevel: "manual", riskLevel: "high" },
  { id: "CP-2", name: "Disaster Recovery", description: "Multi-region DR with <4hr RTO, <1hr RPO", owner: "Engineering", status: "effective", frameworks: ["soc2", "iso27001", "nist_csf"], lastEvidenceDate: "2026-03-05", evidenceQuality: "A", automationLevel: "fully_automated", riskLevel: "critical" },

  // Vendor Management
  { id: "SA-1", name: "Third-Party Risk Management", description: "Vendor security assessments and ongoing monitoring", owner: "Legal", status: "partially_effective", frameworks: ["soc2", "iso27001", "hipaa"], lastEvidenceDate: "2026-01-20", evidenceQuality: "C", automationLevel: "manual", riskLevel: "high" },

  // Privacy
  { id: "PR-1", name: "Privacy Impact Assessment", description: "PIA for all new features processing PII", owner: "Legal", status: "not_assessed", frameworks: ["hipaa", "iso27001"], lastEvidenceDate: "2025-10-15", evidenceQuality: "F", automationLevel: "manual", riskLevel: "high" },

  // Software Development
  { id: "SD-1", name: "Secure SDLC", description: "Code review, SAST, DAST in CI/CD pipeline", owner: "Engineering", status: "effective", frameworks: ["soc2", "iso27001", "nist_csf"], lastEvidenceDate: "2026-03-28", evidenceQuality: "A", automationLevel: "fully_automated", riskLevel: "high" },
];

// ─── Evidence Submissions ─────────────────────────────────────────────────────

export const EVIDENCE: EvidenceSubmission[] = [
  { id: "EV-001", controlId: "AC-2", title: "Okta SCIM provisioning config export", submittedDate: "2026-03-28", submittedBy: "Pipeline: Okta → Snowflake", type: "api_pull", source: "Automated — Okta", aiGrade: "A", aiNotes: "Configuration matches policy. All deprovisioning events within 24hr SLA.", freshnessStatus: "current" },
  { id: "EV-002", controlId: "AC-3", title: "MFA enforcement audit — all users", submittedDate: "2026-03-29", submittedBy: "Pipeline: Okta → Snowflake", type: "api_pull", source: "Automated — Okta", aiGrade: "A", aiNotes: "100% MFA enrollment. No exceptions detected.", freshnessStatus: "current" },
  { id: "EV-003", controlId: "SC-1", title: "AWS RDS encryption status — all instances", submittedDate: "2026-03-22", submittedBy: "Pipeline: AWS Config → Snowflake", type: "config_export", source: "Automated — AWS Config", aiGrade: "A", aiNotes: "All 47 RDS instances encrypted with AES-256. KMS key rotation active.", freshnessStatus: "current" },
  { id: "EV-004", controlId: "SC-2", title: "TLS configuration scan — external endpoints", submittedDate: "2026-03-22", submittedBy: "Pipeline: Wiz → Snowflake", type: "config_export", source: "Automated — Wiz", aiGrade: "A", aiNotes: "All 132 endpoints on TLS 1.3. No deprecated cipher suites.", freshnessStatus: "current" },
  { id: "EV-005", controlId: "AU-1", title: "Datadog log retention verification", submittedDate: "2026-03-28", submittedBy: "Pipeline: Datadog → Snowflake", type: "api_pull", source: "Automated — Datadog", aiGrade: "A", aiNotes: "Retention policy: 395 days. All critical services forwarding logs.", freshnessStatus: "current" },
  { id: "EV-006", controlId: "IR-1", title: "Incident response plan — v3.2", submittedDate: "2025-12-20", submittedBy: "Sarah Chen (Security)", type: "policy_doc", source: "Manual Upload", aiGrade: "C", aiNotes: "Document is 100 days old. Missing updated escalation paths for new on-call structure. Recommend refresh.", freshnessStatus: "stale" },
  { id: "EV-007", controlId: "RA-2", title: "Wiz vulnerability scan — weekly rollup", submittedDate: "2026-03-29", submittedBy: "Pipeline: Wiz → Snowflake", type: "api_pull", source: "Automated — Wiz", aiGrade: "A", aiNotes: "12 critical findings, all within 30-day SLA. 0 overdue.", freshnessStatus: "current" },
  { id: "EV-008", controlId: "SD-1", title: "GitHub SAST/DAST pipeline results — March", submittedDate: "2026-03-28", submittedBy: "Pipeline: GitHub → Snowflake", type: "api_pull", source: "Automated — GitHub", aiGrade: "A", aiNotes: "3,247 PRs scanned. 0 critical findings merged. 98.7% pass rate.", freshnessStatus: "current" },
  { id: "EV-009", controlId: "SC-3", title: "Data classification inventory", submittedDate: "2025-11-05", submittedBy: "Mike Torres (Legal)", type: "policy_doc", source: "Manual Upload", aiGrade: "F", aiNotes: "Inventory covers <40% of data assets. No automated labeling. 146 days stale.", freshnessStatus: "stale" },
  { id: "EV-010", controlId: "CM-3", title: "Jira change management report — Q4", submittedDate: "2026-01-15", submittedBy: "Pipeline: Jira → Snowflake", type: "api_pull", source: "Automated — Jira", aiGrade: "C", aiNotes: "14% of production changes bypassed approval workflow. Exceeds 5% threshold.", freshnessStatus: "stale" },
  { id: "EV-011", controlId: "AC-4", title: "Quarterly access review — Q1 2026", submittedDate: "2026-02-10", submittedBy: "Lisa Park (Security)", type: "screenshot", source: "Manual Upload", aiGrade: "B", aiNotes: "Review completed for 92% of accounts. 8% pending manager confirmation.", freshnessStatus: "expiring_soon" },
  { id: "EV-012", controlId: "CP-1", title: "BCP tabletop exercise results", submittedDate: "2025-12-01", submittedBy: "James Wong (Security)", type: "policy_doc", source: "Manual Upload", aiGrade: "C", aiNotes: "Exercise revealed 3 gaps in communication procedures. Remediation plan pending. 120 days stale.", freshnessStatus: "stale" },
  { id: "EV-013", controlId: "PS-1", title: "Security awareness completion report", submittedDate: "2026-02-15", submittedBy: "Pipeline: KnowBe4 → Snowflake", type: "api_pull", source: "Automated — KnowBe4", aiGrade: "B", aiNotes: "94% completion rate. 6% past due (mostly new hires in onboarding).", freshnessStatus: "expiring_soon" },
  { id: "EV-014", controlId: "SA-1", title: "Vendor risk assessment tracker — Q1", submittedDate: "2026-01-20", submittedBy: "Amy Lin (Legal)", type: "policy_doc", source: "Manual Upload", aiGrade: "C", aiNotes: "62 of 89 vendors assessed. 27 vendors overdue for review. 70 days stale.", freshnessStatus: "stale" },
  { id: "EV-015", controlId: "PR-1", title: "Privacy impact assessment — legacy", submittedDate: "2025-10-15", submittedBy: "David Kim (Legal)", type: "policy_doc", source: "Manual Upload", aiGrade: "F", aiNotes: "PIA template outdated. Does not cover AI/ML data processing. 167 days stale.", freshnessStatus: "stale" },
  { id: "EV-016", controlId: "AC-5", title: "CyberArk PAM session logs — March", submittedDate: "2026-03-20", submittedBy: "Pipeline: CyberArk → Snowflake", type: "log_export", source: "Automated — CyberArk", aiGrade: "A", aiNotes: "All 342 privileged sessions recorded. No unauthorized access attempts.", freshnessStatus: "current" },
  { id: "EV-017", controlId: "CM-1", title: "Terraform state drift detection — weekly", submittedDate: "2026-03-18", submittedBy: "Pipeline: Terraform Cloud → Snowflake", type: "config_export", source: "Automated — Terraform", aiGrade: "A", aiNotes: "0 drift detected across 23 workspaces.", freshnessStatus: "current" },
  { id: "EV-018", controlId: "CM-2", title: "IaC PR merge report — March", submittedDate: "2026-03-25", submittedBy: "Pipeline: GitHub → Snowflake", type: "api_pull", source: "Automated — GitHub", aiGrade: "A", aiNotes: "100% of infra changes via PR. Average 2.1 reviewers per PR.", freshnessStatus: "current" },
  { id: "EV-019", controlId: "IR-2", title: "PagerDuty alert routing verification", submittedDate: "2026-03-27", submittedBy: "Pipeline: PagerDuty → Snowflake", type: "api_pull", source: "Automated — PagerDuty", aiGrade: "A", aiNotes: "All 14 services have valid escalation policies. MTTA: 2.3 min.", freshnessStatus: "current" },
  { id: "EV-020", controlId: "AU-2", title: "Datadog anomaly detection rules audit", submittedDate: "2026-03-26", submittedBy: "Pipeline: Datadog → Snowflake", type: "config_export", source: "Automated — Datadog", aiGrade: "A", aiNotes: "187 active monitors. 12 anomaly detection rules covering auth, API, and DB layers.", freshnessStatus: "current" },
  { id: "EV-021", controlId: "RA-1", title: "Annual risk assessment report — 2026", submittedDate: "2026-03-01", submittedBy: "Sarah Chen (Security)", type: "policy_doc", source: "Manual Upload", aiGrade: "B", aiNotes: "Comprehensive risk register. 3 new risks identified for AI model serving. Remediation timelines defined.", freshnessStatus: "current" },
  { id: "EV-022", controlId: "CP-2", title: "DR failover test results — March", submittedDate: "2026-03-05", submittedBy: "Pipeline: AWS → Snowflake", type: "config_export", source: "Automated — AWS Config", aiGrade: "A", aiNotes: "Failover completed in 3h 12m (within 4hr RTO). RPO: 47 min (within 1hr target).", freshnessStatus: "current" },
  { id: "EV-023", controlId: "PS-2", title: "Background check completion — Q1 hires", submittedDate: "2026-03-20", submittedBy: "Pipeline: Checkr → Snowflake", type: "api_pull", source: "Automated — Checkr", aiGrade: "A", aiNotes: "38/38 new hires cleared. Average turnaround: 3.2 business days.", freshnessStatus: "current" },
  { id: "EV-024", controlId: "SC-4", title: "DLP policy violation report — Feb", submittedDate: "2026-02-28", submittedBy: "Pipeline: Microsoft Purview → Snowflake", type: "api_pull", source: "Automated — Microsoft Purview", aiGrade: "B", aiNotes: "7 DLP triggers. 5 false positives, 2 genuine (resolved within SLA). Recommend rule tuning.", freshnessStatus: "expiring_soon" },
  { id: "EV-025", controlId: "PE-1", title: "AWS SOC 2 bridge letter", submittedDate: "2026-01-30", submittedBy: "AWS (inherited control)", type: "policy_doc", source: "Manual Upload", aiGrade: "B", aiNotes: "Valid bridge letter covering Jan–Mar 2026. Annual SOC 2 report expected Q2.", freshnessStatus: "expiring_soon" },
  { id: "EV-026", controlId: "AC-1", title: "Access control policy — v4.1 approved", submittedDate: "2026-03-15", submittedBy: "Sarah Chen (Security)", type: "policy_doc", source: "Manual Upload", aiGrade: "A", aiNotes: "Policy current. Board-approved. Next review scheduled Oct 2026.", freshnessStatus: "current" },
  { id: "EV-027", controlId: "IR-3", title: "Post-mortem report — API latency incident", submittedDate: "2026-03-10", submittedBy: "Alex Rivera (Engineering)", type: "policy_doc", source: "Manual Upload", aiGrade: "B", aiNotes: "Thorough root cause analysis. 4 action items defined, 2 completed. Follow-up in 2 weeks.", freshnessStatus: "current" },
];

// ─── System Assets ────────────────────────────────────────────────────────────

export const ASSETS: SystemAsset[] = [
  { id: "asset-01", name: "Production AWS Account", type: "Cloud Infrastructure", owner: "Engineering", controlsCovered: 18, lastScanned: "2026-03-29", riskScore: 22 },
  { id: "asset-02", name: "Staging AWS Account", type: "Cloud Infrastructure", owner: "Engineering", controlsCovered: 12, lastScanned: "2026-03-29", riskScore: 35 },
  { id: "asset-03", name: "GCP Project (AI/ML)", type: "Cloud Infrastructure", owner: "Engineering", controlsCovered: 10, lastScanned: "2026-03-28", riskScore: 41 },
  { id: "asset-04", name: "GitHub Organization", type: "Source Control", owner: "Engineering", controlsCovered: 8, lastScanned: "2026-03-29", riskScore: 18 },
  { id: "asset-05", name: "Okta Tenant", type: "Identity Provider", owner: "IT", controlsCovered: 6, lastScanned: "2026-03-29", riskScore: 12 },
  { id: "asset-06", name: "Snowflake Warehouse", type: "Data Platform", owner: "Data Engineering", controlsCovered: 9, lastScanned: "2026-03-28", riskScore: 28 },
  { id: "asset-07", name: "Datadog", type: "Monitoring", owner: "Engineering", controlsCovered: 5, lastScanned: "2026-03-29", riskScore: 15 },
  { id: "asset-08", name: "PagerDuty", type: "Incident Management", owner: "Engineering", controlsCovered: 3, lastScanned: "2026-03-27", riskScore: 10 },
  { id: "asset-09", name: "Slack Workspace", type: "Communication", owner: "IT", controlsCovered: 4, lastScanned: "2026-03-25", riskScore: 32 },
  { id: "asset-10", name: "Jira Cloud", type: "Project Management", owner: "Engineering", controlsCovered: 3, lastScanned: "2026-03-28", riskScore: 20 },
  { id: "asset-11", name: "CyberArk PAM", type: "Privileged Access", owner: "Security", controlsCovered: 4, lastScanned: "2026-03-29", riskScore: 8 },
  { id: "asset-12", name: "Microsoft 365 Tenant", type: "Productivity Suite", owner: "IT", controlsCovered: 5, lastScanned: "2026-03-26", riskScore: 25 },
  { id: "asset-13", name: "Terraform Cloud", type: "IaC Platform", owner: "Engineering", controlsCovered: 4, lastScanned: "2026-03-28", riskScore: 14 },
  { id: "asset-14", name: "Wiz Security", type: "CSPM/CNAPP", owner: "Security", controlsCovered: 7, lastScanned: "2026-03-29", riskScore: 11 },
];

// ─── Alerts ───────────────────────────────────────────────────────────────────

export const ALERTS: TrustAlert[] = [
  { id: "ALT-001", severity: "critical", title: "IR-1 evidence stale — 100 days", description: "Incident Response Plan (IR-1) evidence last submitted Dec 20, 2025. Exceeds 90-day freshness SLA. Impacts SOC 2, ISO 27001, HIPAA, NIST CSF coverage.", createdAt: "2026-03-21", status: "open" },
  { id: "ALT-002", severity: "critical", title: "SC-3 Data Classification — AI grade F", description: "Data Classification (SC-3) evidence failed Cortex AI quality check. Coverage <40% of data assets. Impacts ISO 27001, HIPAA.", createdAt: "2026-03-15", status: "open" },
  { id: "ALT-003", severity: "high", title: "PR-1 Privacy Impact Assessment — not assessed", description: "PIA control (PR-1) has not been assessed. Evidence 167 days old. Required for HIPAA and ISO 27001 compliance.", createdAt: "2026-03-10", status: "acknowledged" },
  { id: "ALT-004", severity: "high", title: "HIPAA compliance dropped below 80%", description: "HIPAA Security Rule compliance score fell to 78% (threshold: 80%). Primary drivers: SC-3 (Data Classification), PR-1 (PIA), SA-1 (Vendor Risk).", createdAt: "2026-03-18", status: "open" },
  { id: "ALT-005", severity: "high", title: "CM-3 Change Management — 14% bypass rate", description: "Change Management (CM-3) AI quality grade: C. 14% of production changes bypassed approval workflow, exceeding 5% threshold.", createdAt: "2026-03-20", status: "open" },
  { id: "ALT-006", severity: "medium", title: "5 controls have stale evidence (>60 days)", description: "Controls IR-1, SC-3, CM-3, CP-1, SA-1 have evidence older than 60 days. Combined framework impact: SOC 2, ISO 27001, HIPAA.", createdAt: "2026-03-25", status: "open" },
  { id: "ALT-007", severity: "medium", title: "Vendor risk reviews overdue — 27 vendors", description: "Third-party risk management (SA-1) shows 27 of 89 vendors overdue for security assessment. Largest gap in SaaS category.", createdAt: "2026-03-22", status: "acknowledged" },
  { id: "ALT-008", severity: "low", title: "SOC 1 readiness below 50%", description: "SOC 1 Type II compliance at 45%. Planned audit date March 2027. 12 months to close gap — on track if roadmap holds.", createdAt: "2026-03-28", status: "acknowledged" },
];

// ─── Monthly Trend ────────────────────────────────────────────────────────────

export const MONTHLY_TRENDS: MonthlyTrend[] = [
  { month: "Oct 2025", overall: 69, soc2: 78, iso27001: 65, hipaa: 61 },
  { month: "Nov 2025", overall: 72, soc2: 82, iso27001: 70, hipaa: 64 },
  { month: "Dec 2025", overall: 74, soc2: 84, iso27001: 73, hipaa: 68 },
  { month: "Jan 2026", overall: 77, soc2: 87, iso27001: 77, hipaa: 72 },
  { month: "Feb 2026", overall: 80, soc2: 89, iso27001: 81, hipaa: 75 },
  { month: "Mar 2026", overall: 82, soc2: 91, iso27001: 84, hipaa: 78 },
];

// ─── Helper lookups ───────────────────────────────────────────────────────────

export function frameworkById(id: FrameworkId): Framework | undefined {
  return FRAMEWORKS.find((f) => f.id === id);
}

export function controlsForFramework(fwId: FrameworkId): Control[] {
  return CONTROLS.filter((c) => c.frameworks.includes(fwId));
}

export function evidenceForControl(controlId: string): EvidenceSubmission[] {
  return EVIDENCE.filter((e) => e.controlId === controlId);
}
