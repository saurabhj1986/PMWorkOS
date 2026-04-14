// Pipeline demo — 8 stages of TrustReply processing a single customer questionnaire.
// One sample customer (Latham & Watkins / CAIQ v4) traced end-to-end through every stage.
// Used by src/tabs/dashboard/PipelineDemo.jsx — clickable stages + Inspector Panel.
//
// Each stage has:
//   id          — stable key
//   number      — display number (1-8)
//   title       — short label on the card
//   tagline     — one-line summary visible on the card
//   icon        — lucide icon name (string, looked up by component)
//   what        — "What happens here" plain English
//   behind      — "Behind the scenes" technical detail
//   sample      — array of {label, value} key/value pairs (shown as a code block)
//   why         — "Why this matters" with cite to trust strategy where relevant
//   hoverPreview— compact one-liner shown on hover (no click required)

export const pipelineStages = [
  {
    id: "ingest",
    number: 1,
    title: "Inbound",
    description: "Customer uploads their security questionnaire, linked to an active deal.",
    tagline: "Latham & Watkins · CAIQ v4 · 261 questions",
    icon: "Inbox",
    headlineStat: { value: "261", label: "questions" },
    what: "The customer's security team uploads their CAIQ v4 file. It's tied to a $4.2M enterprise deal currently sitting in security review — every day stalled is revenue at risk.",
    behind:
      "INSERT INTO trust_intelligence.questionnaire_responses (status='pending'). Notify the assigned analyst via Slack + dashboard.",
    sample: [
      { label: "customer_name", value: "Latham & Watkins" },
      { label: "questionnaire_type", value: "CAIQ v4" },
      { label: "total_questions", value: "261" },
      { label: "assigned_analyst", value: "Maya Chen" },
      { label: "due_date", value: "2026-04-10" },
      { label: "deal_value", value: "$4.2M ARR" },
    ],
    why: "Each questionnaire is tied to an enterprise deal. Customer Trust = highest direct revenue impact.",
    hoverPreview: "Latham & Watkins · CAIQ v4 · 261 Q's · $4.2M ARR",
  },
  {
    id: "parse",
    number: 2,
    title: "Parse",
    description: "Extract questions from Excel/PDF into structured rows. Flag duplicates from the answer library.",
    tagline: "261 questions extracted in 1.4s",
    icon: "FileText",
    headlineStat: { value: "1.4s", label: "to extract" },
    what: "The 261 questions are extracted from the CAIQ Excel file into structured rows. Duplicates against the historical question library are flagged for instant reuse.",
    behind:
      "File parser identifies question columns, normalizes formatting, and runs fuzzy match against the approved_answers index.",
    sample: [
      { label: "questions_extracted", value: "261" },
      { label: "format_detected", value: "CAIQ v4 standard" },
      { label: "duplicate_questions_found", value: "14 (already answered)" },
      { label: "unique_questions", value: "247" },
      { label: "parse_time", value: "1.4s" },
    ],
    why: "Manual parsing is the #1 time sink for trust teams. Auto-parsing recovers ~2 hours per questionnaire before the agent even starts work.",
    hoverPreview: "247 unique · 14 dupes flagged · 1.4s",
  },
  {
    id: "classify",
    number: 3,
    title: "Classify",
    description: "Tag each question with a security domain so the agent targets the right controls.",
    tagline: "Q-47 → Data Protection / Encryption",
    icon: "Tags",
    headlineStat: { value: "247", label: "tagged" },
    what: "Each question is tagged with a security domain so the agent knows which control to look up. Following Q-47 through the rest of the pipeline.",
    behind:
      "LLM classifier emits {category, sub_topic, intent} per question. Confidence threshold gates routing.",
    sample: [
      { label: "question_id", value: "Q-47" },
      {
        label: "question_text",
        value:
          '"How does Acme Corp encrypt customer data at rest and in transit?"',
      },
      { label: "category", value: "Data Protection" },
      { label: "sub_topic", value: "Encryption" },
      { label: "intent", value: "factual_lookup" },
    ],
    why: "No classification = the agent has to brute-force every control family for every question. Classification turns it into a targeted lookup.",
    hoverPreview: 'Q-47 "How does Acme Corp encrypt..." → Encryption',
  },
  {
    id: "map",
    number: 4,
    title: "Map",
    description: "Match to the Common Control Framework — one answer can satisfy multiple audits.",
    tagline: "Matched to CC-05 · 0.98 confidence",
    icon: "GitBranch",
    headlineStat: { value: "CC-05", label: "control" },
    what: "Q-47's classification is matched against the 16-family Common Control Framework.",
    behind:
      "JOIN control_inventory ON category → control_family. Returns one or more matching controls ranked by overlap score.",
    sample: [
      { label: "matched_control", value: "CC-05  Cryptography & Key Mgmt" },
      { label: "frameworks", value: "SOC 2, ISO 27001, PCI DSS" },
      { label: "match_confidence", value: "0.98" },
      { label: "alternates_considered", value: "CC-04, CC-10" },
    ],
    why: "\"Test once, audit many\" — one CC-05 answer satisfies SOC 2, ISO 27001, AND PCI DSS simultaneously. Three audits, one piece of work.",
    hoverPreview: "CC-05 Cryptography → SOC 2 + ISO 27001 + PCI DSS",
  },
  {
    id: "retrieve",
    number: 5,
    title: "Retrieve",
    description: "Pull current, non-expired evidence artifacts for the matched control family.",
    tagline: "3 current artifacts · all valid",
    icon: "Database",
    headlineStat: { value: "3", label: "artifacts" },
    what: "Pull every current, non-expired evidence artifact attached to CC-05.",
    behind:
      "SELECT * FROM evidence_submissions WHERE control_id='CC-05' AND status='current' AND expires_date > CURRENT_DATE",
    sample: [
      { label: "evidence_count", value: "3" },
      { label: "EVD-001", value: "AES-256 config screenshot · 2026-03-22 ✓" },
      { label: "EVD-002", value: "Key rotation policy · 2026-03-22 ✓" },
      { label: "EVD-003", value: "TLS 1.2+ enforcement audit log · 2026-03-20 ✓" },
      { label: "all_current", value: "true" },
    ],
    why: "This is where the Evidence Currency 90% KPI lives. Stale evidence = audit fail. The lifecycle check is what makes auto-answers safe.",
    hoverPreview: "EVD-001 + EVD-002 + EVD-003 · all current",
  },
  {
    id: "draft",
    number: 6,
    title: "Draft",
    description: "Compose an evidence-grounded answer. Score for faithfulness to prevent hallucinations.",
    tagline: "96% confidence · 89% reuse match",
    icon: "Sparkles",
    headlineStat: { value: "0.96", label: "trust" },
    what: "Compose a customer-facing answer grounded in the 3 evidence artifacts. Score the draft for faithfulness so we don't ship hallucinations.",
    behind:
      "Prompt template wraps {question + evidence + company tone guide} → LLM draft → faithfulness check (every claim must trace back to a cited artifact).",
    sample: [
      {
        label: "draft",
        value:
          '"Acme Corp encrypts all customer data at rest using AES-256 via Azure SQL and Cosmos DB. Data in transit is protected using TLS 1.2 or higher on all public endpoints, enforced at the Cloudflare edge. Encryption keys are managed through Azure Key Vault with annual rotation..."',
      },
      { label: "confidence", value: "0.96" },
      { label: "reuse_match", value: "89%" },
      { label: "similar_answer", value: "Allen & Overy CAIQ Q-127 (2026-03-12)" },
      { label: "hallucination_risk", value: "none detected" },
    ],
    why: "96% confidence + 89% reuse = analyst approves in seconds, not 20 minutes. This is where the dashboard's 84% Reuse Rate KPI comes from.",
    hoverPreview: "Draft · 0.96 conf · 89% reuse · 0 hallucinations",
    trustInputs: {
      confidence: 0.96,
      accuracy: 0.94,
      freshness: 0.97,
      benchmark: 0.92,
    },
  },
  {
    id: "review",
    number: 7,
    title: "Review",
    description: "Route by confidence — high to one-click approve, low to senior analyst review.",
    tagline: "Auto-approve queue · 12s decision",
    icon: "UserCheck",
    headlineStat: { value: "12s", label: "to approve" },
    what: "Routed by confidence band. High-confidence drafts go to a one-click approve queue. Low-confidence drafts go to a senior analyst for judgment.",
    behind:
      "Routing rules: ≥0.95 → auto-approve queue · 0.80–0.95 → standard review · <0.80 → senior analyst escalation.",
    sample: [
      { label: "confidence", value: "0.96" },
      { label: "routing", value: "auto-approve queue" },
      { label: "reviewer", value: "Maya Chen" },
      { label: "review_time", value: "12 seconds" },
      { label: "decision", value: "approved" },
      { label: "changes_made", value: "none" },
    ],
    why: "Humans handle judgment. The agent doesn't replace Maya, it gives her 10x leverage. She reviews 248 answers in the time it used to take to write 25.",
    hoverPreview: "Auto-approve queue · approved in 12s",
  },
  {
    id: "deliver",
    number: 8,
    title: "Deliver",
    description: "Send approved answers to the customer. Each answer feeds the reuse library for next time.",
    tagline: "Delivered · library +1 · deal unblocked",
    icon: "Send",
    headlineStat: { value: "248", label: "delivered" },
    what: "Approved bundle goes back to Latham. The new approved answer joins the library so the next customer asking about encryption gets it instantly.",
    behind:
      "UPDATE questionnaire_responses SET answered = answered + 1; INSERT INTO approved_answers; notify analyst dashboard. Loops back to Stage 5 for the next questionnaire.",
    sample: [
      { label: "delivered_to", value: "latham-trust@lw.com" },
      { label: "answers_in_packet", value: "248" },
      { label: "reuse_rate_this_engagement", value: "84.6%" },
      { label: "library_growth", value: "+1 reusable answer" },
      { label: "deal_status", value: "Security review unblocked → Legal review" },
    ],
    why: "The flywheel. Every approved answer makes the next questionnaire faster. This is how Reuse Rate climbs from 84% toward the ≥80% target — and keeps going past it.",
    hoverPreview: "Delivered · library +1 · deal unblocked",
  },
];
