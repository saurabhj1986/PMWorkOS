// End-to-end data architecture for the TrustReply platform.
// 5 layers: Source → Ingest → Store → Intelligence → Deliver
// Maps directly to Josh McKibben's "Buy GRC / Build Intelligence" framing.

export const architectureLayers = [
  {
    id: "source",
    label: "Source Systems",
    subtitle: "Buy: GRC + security tooling",
    icon: "Globe",
    color: "blue",
    boundary: "buy",
    description:
      "Best-of-breed SaaS tools that own the compliance workflow. We consume their data — we don't rebuild it.",
    components: [
      {
        name: "Anecdotes",
        icon: "Shield",
        type: "Primary GRC platform",
        description:
          "Control inventory, evidence lifecycle, audit workflows, and policy management. Josh's Buy layer for compliance operations.",
        dataFlows: ["Control inventory", "Evidence artifacts", "Audit findings"],
      },
      {
        name: "CrowdStrike",
        icon: "Shield",
        type: "Endpoint security",
        description:
          "Endpoint detection & response. Feeds real-time threat telemetry and device compliance posture into the trust data lake.",
        dataFlows: ["Threat events", "Device compliance"],
      },
      {
        name: "Okta",
        icon: "KeyRound",
        type: "Identity & access",
        description:
          "SSO configuration exports, MFA enrollment data, and access reviews. Backs CC-03 (Identity & Access Management).",
        dataFlows: ["SSO config", "MFA enrollment", "Access reviews"],
      },
      {
        name: "Datadog",
        icon: "Activity",
        type: "Monitoring & SIEM",
        description:
          "Infrastructure monitoring and SIEM-equivalent log exports for security event correlation and incident response evidence.",
        dataFlows: ["Security logs", "Alert events"],
      },
      {
        name: "Wiz",
        icon: "ScanSearch",
        type: "Cloud security posture",
        description:
          "Cloud security posture management. Asset inventory, vulnerability findings, and misconfiguration alerts feed system_asset_inventory.",
        dataFlows: ["Asset inventory", "Vulnerability findings", "Misconfigs"],
      },
      {
        name: "AWS",
        icon: "Cloud",
        type: "Infrastructure platform",
        description:
          "CloudTrail audit logs, IAM policies, and resource inventory. Feeds system_asset_inventory alongside Wiz.",
        dataFlows: ["CloudTrail logs", "IAM policies", "Resource inventory"],
      },
      {
        name: "Salesforce CRM",
        icon: "Users",
        type: "Deal pipeline",
        description:
          "Links every questionnaire to ARR at risk. The Questionnaire Triage agent uses deal value to prioritize work.",
        dataFlows: ["Deal metadata", "Customer records", "ARR values"],
      },
      {
        name: "Model Registry",
        icon: "Cpu",
        type: "AI governance",
        description:
          "Internal AI/ML model inventory. Model risk assessments, training data lineage, and safety evaluations for CC-18 (AI Governance).",
        dataFlows: ["Model inventory", "Risk assessments", "Safety evals"],
      },
    ],
  },
  {
    id: "ingest",
    label: "Ingestion",
    subtitle: "Build: pipeline layer",
    icon: "ArrowRightLeft",
    color: "cyan",
    boundary: "build",
    description:
      "Event-driven and scheduled pipelines that land source data into Snowflake's RAW schema with sub-minute latency.",
    components: [
      {
        name: "Snowpipe",
        icon: "Zap",
        type: "Continuous ingestion",
        description:
          "Event-driven, auto-scaling ingestion for high-volume streams (CloudTrail, Datadog logs). Sub-minute latency into RAW schema.",
        dataFlows: ["CloudTrail → RAW", "Datadog logs → RAW"],
      },
      {
        name: "REST API Connectors",
        icon: "Plug",
        type: "Scheduled pulls",
        description:
          "Scheduled API pulls from SaaS tools. Handles OAuth, pagination, rate limits, and schema drift detection.",
        dataFlows: ["Anecdotes API", "CrowdStrike API", "Okta API", "Wiz API"],
      },
      {
        name: "Snowflake Streams",
        icon: "GitBranch",
        type: "Change data capture",
        description:
          "CDC on RAW tables. Detects new and updated rows so downstream transforms only process deltas — not full reloads.",
        dataFlows: ["RAW deltas → CURATED"],
      },
      {
        name: "Scheduled Tasks",
        icon: "Clock",
        type: "Orchestration",
        description:
          "Snowflake TASK objects on cron schedules. Orchestrate the RAW → CURATED → ANALYTICS promotion pipeline and trigger Cortex scoring.",
        dataFlows: ["Schema promotion", "Cortex triggers"],
      },
    ],
  },
  {
    id: "store",
    label: "Snowflake Storage",
    subtitle: "Build: trust data lake",
    icon: "Database",
    color: "emerald",
    boundary: "build",
    description:
      "Three-schema architecture: RAW (land) → CURATED (clean) → ANALYTICS (aggregate). The compliance data lake Josh described.",
    components: [
      {
        name: "RAW Schema",
        icon: "HardDrive",
        type: "Landing zone",
        description:
          "Unmodified JSON/CSV payloads from every source system. Immutable audit trail — nothing is overwritten, only appended.",
        dataFlows: ["JSON payloads", "CSV exports", "API responses"],
      },
      {
        name: "CURATED Schema",
        icon: "Layers",
        type: "Cleaned tables",
        description:
          "Deduplicated, typed, and joined tables. This is where the 8 core tables live: customers, control_inventory, evidence_submissions, etc.",
        dataFlows: ["8 core tables", "FK relationships", "Type-safe columns"],
      },
      {
        name: "ANALYTICS Schema",
        icon: "BarChart3",
        type: "Aggregated views",
        description:
          "Materialized via Snowflake dynamic tables. Trust posture snapshots, cross-framework coverage matrices, evidence freshness rollups.",
        dataFlows: ["Trust posture views", "Coverage matrices", "KPI rollups"],
      },
      {
        name: "system_asset_inventory",
        icon: "Server",
        type: "New table",
        description:
          "Wiz + AWS asset coverage joined into one table. Maps every infrastructure asset to its owning control family so coverage gaps surface automatically.",
        dataFlows: ["Asset → control mapping", "Coverage status", "Scan dates"],
      },
    ],
  },
  {
    id: "intelligence",
    label: "Intelligence",
    subtitle: "Build: Cortex AI layer",
    icon: "Brain",
    color: "purple",
    boundary: "build",
    description:
      "Snowflake-native AI inference and scoring. No data leaves the Snowflake perimeter — all processing happens in-platform.",
    components: [
      {
        name: "Cortex LLM Functions",
        icon: "Sparkles",
        type: "Snowflake Cortex",
        description:
          "Native LLM inference (COMPLETE, CLASSIFY, SUMMARIZE). Powers answer drafting, evidence grading, and question classification without data leaving Snowflake.",
        dataFlows: ["COMPLETE → draft answers", "CLASSIFY → question topics", "SUMMARIZE → evidence briefs"],
      },
      {
        name: "Trust Index Scoring",
        icon: "ShieldCheck",
        type: "Composite metric",
        description:
          "Weighted composite: confidence 0.4 + accuracy 0.3 + freshness 0.2 + benchmark 0.1. Every AI output gets a band: TRUSTED / REVIEW / FLAG.",
        dataFlows: ["Per-answer scores", "Per-agent scores", "Historical trends"],
      },
      {
        name: "Evidence Grading",
        icon: "Award",
        type: "Quality assurance",
        description:
          "AI-graded evidence quality — is this screenshot actually proving what the control claims? Catches stale, irrelevant, or incomplete artifacts before auditors do.",
        dataFlows: ["Evidence → quality score", "Staleness alerts"],
      },
      {
        name: "Gap Analysis",
        icon: "GitCompareArrows",
        type: "Cross-framework",
        description:
          "Maps controls across SOC 2, ISO 27001, PCI DSS, EU AI Act, and NIST AI RMF. Finds which frameworks a single control satisfies and where gaps remain.",
        dataFlows: ["Control → framework matrix", "Gap reports"],
      },
    ],
  },
  {
    id: "deliver",
    label: "Delivery",
    subtitle: "Build: output channels",
    icon: "Send",
    color: "amber",
    boundary: "build",
    description:
      "Trust intelligence reaches the right people through the right channel at the right time — from real-time Slack alerts to weekly CISO digests.",
    components: [
      {
        name: "Slack #trust-ops",
        icon: "MessageSquare",
        type: "Real-time alerts",
        description:
          "Anomalies, SLA breaches, and drift events posted in real time. Threaded per incident with @mentions for on-call engineers.",
        dataFlows: ["Anomaly alerts", "SLA warnings", "Drift events"],
      },
      {
        name: "PagerDuty",
        icon: "Bell",
        type: "Critical alerts",
        description:
          "Critical alerts page the on-call trust engineer. Evidence expiry, audit deadline breach, and confidence collapse events.",
        dataFlows: ["Critical incidents", "On-call pages"],
      },
      {
        name: "Email Digest",
        icon: "Mail",
        type: "Leadership reporting",
        description:
          "Daily/weekly summary for CISO and trust leadership. Trust posture trends, evidence freshness, questionnaire throughput, and deal impact.",
        dataFlows: ["CISO weekly report", "Trust posture trends"],
      },
      {
        name: "TrustReply Dashboard",
        icon: "LayoutDashboard",
        type: "Ops console",
        description:
          "The app you're looking at right now. Real-time ops console for analysts with pipeline, anomalies, agent roster, and data model.",
        dataFlows: ["KPIs", "Pipeline status", "Agent activity"],
      },
      {
        name: "Salesforce Writeback",
        icon: "RefreshCw",
        type: "CRM sync",
        description:
          "Pushes trust scores and questionnaire completion status back to CRM. Sales sees security review status without asking the trust team.",
        dataFlows: ["Trust scores → CRM", "Completion status"],
      },
    ],
  },
];

export const buyBuildBoundary = {
  buyLabel: "BUY",
  buyDescription: "GRC automation + security tooling",
  buildLabel: "BUILD",
  buildDescription: "Snowflake trust intelligence layer",
};
