// Client-specific pipeline data. Each client traces one question through all
// 8 stages with different questionnaire types, volumes, and outcomes.
// Story: reuse rate climbs as the answer library grows across clients.

export const clients = [
  {
    id: "latham",
    name: "Latham & Watkins",
    shortName: "L&W",
    questionnaire: "CAIQ v4",
    totalQuestions: 261,
    dealValue: "$4.2M ARR",
    mappedControl: "CC-05",
    kpiOverrides: {
      "Reuse Rate": { value: "84%", subtitle: "target: ≥ 80%" },
      "Avg Response Time": { value: "1.4 days", subtitle: "target: < 2 business days" },
    },
    stages: {
      ingest: {
        tagline: "Latham & Watkins · CAIQ v4 · 261 questions",
        headlineStat: { value: "261", label: "questions" },
        sample: [
          { label: "customer_name", value: "Latham & Watkins" },
          { label: "questionnaire_type", value: "CAIQ v4" },
          { label: "total_questions", value: "261" },
          { label: "assigned_analyst", value: "Maya Chen" },
          { label: "due_date", value: "2026-04-10" },
          { label: "deal_value", value: "$4.2M ARR" },
        ],
      },
      parse: {
        tagline: "261 questions extracted in 1.4s",
        headlineStat: { value: "1.4s", label: "to extract" },
        sample: [
          { label: "questions_extracted", value: "261" },
          { label: "format_detected", value: "CAIQ v4 standard" },
          { label: "duplicate_questions_found", value: "14 (already answered)" },
          { label: "unique_questions", value: "247" },
        ],
      },
      classify: {
        tagline: "Q-47 → Data Protection / Encryption",
        headlineStat: { value: "247", label: "tagged" },
        sample: [
          { label: "question_id", value: "Q-47" },
          { label: "question_text", value: '"How does Acme Corp encrypt customer data at rest and in transit?"' },
          { label: "category", value: "Data Protection" },
          { label: "sub_topic", value: "Encryption" },
        ],
      },
      map: {
        tagline: "Matched to CC-05 · 0.98 confidence",
        headlineStat: { value: "CC-05", label: "control" },
        sample: [
          { label: "matched_control", value: "CC-05  Cryptography & Key Mgmt" },
          { label: "frameworks", value: "SOC 2, ISO 27001, PCI DSS" },
          { label: "match_confidence", value: "0.98" },
          { label: "alternates_considered", value: "CC-04, CC-10" },
        ],
        behind: "JOIN control_inventory ON category → control_family. Returns CC-05 ranked by overlap score.",
      },
      retrieve: {
        tagline: "3 current artifacts · all valid",
        headlineStat: { value: "3", label: "artifacts" },
        sample: [
          { label: "evidence_count", value: "3" },
          { label: "EVD-001", value: "AES-256 config screenshot · 2026-03-22 ✓" },
          { label: "EVD-002", value: "Key rotation policy · 2026-03-22 ✓" },
          { label: "EVD-003", value: "TLS 1.2+ enforcement audit log · 2026-03-20 ✓" },
        ],
        behind: "SELECT * FROM evidence_submissions WHERE control_id='CC-05' AND status='current' AND expires_date > CURRENT_DATE",
      },
      draft: {
        tagline: "96% confidence · 89% reuse match",
        headlineStat: { value: "0.96", label: "trust" },
        sample: [
          { label: "draft", value: '"Acme Corp encrypts all customer data at rest using AES-256 via Azure SQL and Cosmos DB..."' },
          { label: "confidence", value: "0.96" },
          { label: "reuse_match", value: "89%" },
          { label: "similar_answer", value: "Allen & Overy CAIQ Q-127 (2026-03-12)" },
        ],
        trustInputs: { confidence: 0.96, accuracy: 0.94, freshness: 0.97, benchmark: 0.92 },
      },
      review: {
        tagline: "Auto-approve queue · 12s decision",
        headlineStat: { value: "12s", label: "to approve" },
        sample: [
          { label: "confidence", value: "0.96" },
          { label: "routing", value: "auto-approve queue" },
          { label: "reviewer", value: "Maya Chen" },
          { label: "review_time", value: "12 seconds" },
        ],
      },
      deliver: {
        tagline: "Delivered · library +1 · deal unblocked",
        headlineStat: { value: "248", label: "delivered" },
        sample: [
          { label: "delivered_to", value: "latham-trust@lw.com" },
          { label: "answers_in_packet", value: "248" },
          { label: "reuse_rate", value: "84.6%" },
          { label: "deal_status", value: "Security review → Legal review" },
        ],
      },
    },
  },
  {
    id: "goldman",
    name: "Goldman Sachs",
    shortName: "GS",
    questionnaire: "SIG Lite",
    totalQuestions: 180,
    dealValue: "$2.8M ARR",
    mappedControl: "CC-01",
    kpiOverrides: {
      "Reuse Rate": { value: "93%", subtitle: "+9pp from L&W baseline" },
      "Avg Response Time": { value: "0.9 days", subtitle: "36% faster than L&W" },
    },
    stages: {
      ingest: {
        tagline: "Goldman Sachs · SIG Lite · 180 questions",
        headlineStat: { value: "180", label: "questions" },
        sample: [
          { label: "customer_name", value: "Goldman Sachs" },
          { label: "questionnaire_type", value: "SIG Lite" },
          { label: "total_questions", value: "180" },
          { label: "assigned_analyst", value: "James Park" },
          { label: "due_date", value: "2026-04-18" },
          { label: "deal_value", value: "$2.8M ARR" },
        ],
      },
      parse: {
        tagline: "180 questions extracted in 0.9s",
        headlineStat: { value: "0.9s", label: "to extract" },
        sample: [
          { label: "questions_extracted", value: "180" },
          { label: "format_detected", value: "SIG Lite v2024" },
          { label: "duplicate_questions_found", value: "31 (from L&W library)" },
          { label: "unique_questions", value: "149" },
        ],
      },
      classify: {
        tagline: "Q-12 → Identity & Access / Access Control",
        headlineStat: { value: "149", label: "tagged" },
        sample: [
          { label: "question_id", value: "Q-12" },
          { label: "question_text", value: '"How does Acme Corp manage access to production systems?"' },
          { label: "category", value: "Identity & Access" },
          { label: "sub_topic", value: "Access Control" },
        ],
      },
      map: {
        tagline: "Matched to CC-01 · 0.99 confidence",
        headlineStat: { value: "CC-01", label: "control" },
        sample: [
          { label: "matched_control", value: "CC-01  Access Control & IAM" },
          { label: "frameworks", value: "SOC 2, ISO 27001, NIST CSF" },
          { label: "match_confidence", value: "0.99" },
          { label: "alternates_considered", value: "CC-02, CC-03" },
        ],
        behind: "JOIN control_inventory ON category → control_family. Returns CC-01 ranked by overlap score.",
      },
      retrieve: {
        tagline: "5 current artifacts · all valid",
        headlineStat: { value: "5", label: "artifacts" },
        sample: [
          { label: "evidence_count", value: "5" },
          { label: "EVD-010", value: "Okta SSO config · 2026-04-01 ✓" },
          { label: "EVD-011", value: "RBAC policy doc · 2026-03-28 ✓" },
          { label: "EVD-012", value: "Quarterly access review log · 2026-03-30 ✓" },
        ],
        behind: "SELECT * FROM evidence_submissions WHERE control_id='CC-01' AND status='current' AND expires_date > CURRENT_DATE",
      },
      draft: {
        tagline: "98% confidence · 93% reuse match",
        headlineStat: { value: "0.98", label: "trust" },
        sample: [
          { label: "draft", value: '"Acme Corp enforces role-based access control (RBAC) across all production systems. Authentication is handled via Okta SSO with mandatory MFA..."' },
          { label: "confidence", value: "0.98" },
          { label: "reuse_match", value: "93%" },
          { label: "similar_answer", value: "Latham & Watkins CAIQ Q-201 (2026-04-08)" },
        ],
        trustInputs: { confidence: 0.98, accuracy: 0.96, freshness: 0.95, benchmark: 0.94 },
      },
      review: {
        tagline: "Auto-approve queue · 8s decision",
        headlineStat: { value: "8s", label: "to approve" },
        sample: [
          { label: "confidence", value: "0.98" },
          { label: "routing", value: "auto-approve queue" },
          { label: "reviewer", value: "James Park" },
          { label: "review_time", value: "8 seconds" },
        ],
      },
      deliver: {
        tagline: "Delivered · library +5 · deal unblocked",
        headlineStat: { value: "172", label: "delivered" },
        sample: [
          { label: "delivered_to", value: "gs-security@gs.com" },
          { label: "answers_in_packet", value: "172" },
          { label: "reuse_rate", value: "93.2%" },
          { label: "deal_status", value: "Security review → Procurement" },
        ],
      },
    },
  },
  {
    id: "allen",
    name: "Allen & Overy",
    shortName: "A&O",
    questionnaire: "ISO 27001 Custom",
    totalQuestions: 147,
    dealValue: "$3.1M ARR",
    mappedControl: "CC-15",
    kpiOverrides: {
      "Reuse Rate": { value: "96%", subtitle: "+12pp from L&W baseline" },
      "Avg Response Time": { value: "0.6 days", subtitle: "57% faster than L&W" },
    },
    stages: {
      ingest: {
        tagline: "Allen & Overy · ISO 27001 Custom · 147 questions",
        headlineStat: { value: "147", label: "questions" },
        sample: [
          { label: "customer_name", value: "Allen & Overy" },
          { label: "questionnaire_type", value: "ISO 27001 Custom" },
          { label: "total_questions", value: "147" },
          { label: "assigned_analyst", value: "Sarah Lin" },
          { label: "due_date", value: "2026-04-25" },
          { label: "deal_value", value: "$3.1M ARR" },
        ],
      },
      parse: {
        tagline: "147 questions extracted in 1.1s",
        headlineStat: { value: "1.1s", label: "to extract" },
        sample: [
          { label: "questions_extracted", value: "147" },
          { label: "format_detected", value: "ISO 27001 custom" },
          { label: "duplicate_questions_found", value: "52 (from L&W + GS library)" },
          { label: "unique_questions", value: "95" },
        ],
      },
      classify: {
        tagline: "Q-88 → Security Ops / Incident Response",
        headlineStat: { value: "95", label: "tagged" },
        sample: [
          { label: "question_id", value: "Q-88" },
          { label: "question_text", value: '"Describe Acme Corp\'s incident detection and response process."' },
          { label: "category", value: "Security Ops" },
          { label: "sub_topic", value: "Incident Response" },
        ],
      },
      map: {
        tagline: "Matched to CC-15 · 0.97 confidence",
        headlineStat: { value: "CC-15", label: "control" },
        sample: [
          { label: "matched_control", value: "CC-15  Incident Detect & Response" },
          { label: "frameworks", value: "SOC 2, ISO 27001, NIST CSF" },
          { label: "match_confidence", value: "0.97" },
          { label: "alternates_considered", value: "CC-16, CC-10" },
        ],
        behind: "JOIN control_inventory ON category → control_family. Returns CC-15 ranked by overlap score.",
      },
      retrieve: {
        tagline: "4 current artifacts · all valid",
        headlineStat: { value: "4", label: "artifacts" },
        sample: [
          { label: "evidence_count", value: "4" },
          { label: "EVD-020", value: "Incident response plan v3 · 2026-04-02 ✓" },
          { label: "EVD-021", value: "PagerDuty integration config · 2026-03-25 ✓" },
          { label: "EVD-022", value: "Tabletop exercise report · 2026-03-15 ✓" },
        ],
        behind: "SELECT * FROM evidence_submissions WHERE control_id='CC-15' AND status='current' AND expires_date > CURRENT_DATE",
      },
      draft: {
        tagline: "97% confidence · 96% reuse match",
        headlineStat: { value: "0.97", label: "trust" },
        sample: [
          { label: "draft", value: '"Acme Corp maintains a documented incident response plan with 4 severity tiers. Detection is powered by Datadog SIEM with PagerDuty escalation..."' },
          { label: "confidence", value: "0.97" },
          { label: "reuse_match", value: "96%" },
          { label: "similar_answer", value: "Goldman Sachs SIG Q-45 (2026-04-15)" },
        ],
        trustInputs: { confidence: 0.97, accuracy: 0.95, freshness: 0.93, benchmark: 0.96 },
      },
      review: {
        tagline: "Auto-approve queue · 6s decision",
        headlineStat: { value: "6s", label: "to approve" },
        sample: [
          { label: "confidence", value: "0.97" },
          { label: "routing", value: "auto-approve queue" },
          { label: "reviewer", value: "Sarah Lin" },
          { label: "review_time", value: "6 seconds" },
        ],
      },
      deliver: {
        tagline: "Delivered · library +3 · deal unblocked",
        headlineStat: { value: "142", label: "delivered" },
        sample: [
          { label: "delivered_to", value: "ao-security@allenovery.com" },
          { label: "answers_in_packet", value: "142" },
          { label: "reuse_rate", value: "96.4%" },
          { label: "deal_status", value: "Security review → Legal review" },
        ],
      },
    },
  },
];
