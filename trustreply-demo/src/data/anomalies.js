// Live anomaly feed for Mission Control. 6 simulated alerts spanning the
// realistic failure modes a Trust function would actually see:
//   - Evidence lifecycle (artifacts about to expire)
//   - SLA breach (questionnaire idle past due date)
//   - Confidence drift (saved answer score dropped after evidence change)
//   - SLA trending (response time creeping toward target)
//   - Data mismatch (dashboard count != source table count)
//   - Schema update (external standard changed under us)

export const anomalies = [
  {
    id: "ANO-001",
    severity: "critical",
    type: "Evidence Lifecycle",
    title: "EVD-008 expires in 32 days · cited by 3 active questionnaires",
    detectedAt: "2m ago",
    body: "AI Model Risk Assessment evidence is about to lose currency. It is currently cited as supporting evidence in 3 active questionnaire responses (KKR, Bridgewater, Latham) and 2 in-progress draft answers in the TrustReply queue. If it expires before refresh, all dependent answers will be flagged stale.",
    affectedEntities: [
      { kind: "evidence", id: "EVD-008" },
      { kind: "control", id: "CC-18" },
      { kind: "customer", id: "KKR" },
      { kind: "customer", id: "Bridgewater" },
      { kind: "customer", id: "Latham & Watkins" },
    ],
    detectionConfidence: 0.99,
    suggestedAgentId: "evidence_collector",
    suggestedAction:
      "Dispatch Evidence Collector to refresh from internal model registry, OpenAI usage logs, and AI Safety Review Board. ETA ~12 minutes.",
    expandedDetails:
      "Lifecycle policy: AI Governance evidence (CC-18) renews on a 90-day cycle vs the 365-day cycle for most other controls because of the EU AI Act surveillance period. EVD-008 was last collected 2026-02-15. Auto-refresh attempted yesterday but the model registry export job failed (timeout). This is the second consecutive failure, which is why detection confidence is 0.99 (high) — we're sure it needs human attention.",
  },
  {
    id: "ANO-002",
    severity: "critical",
    type: "SLA Breach",
    title: "Bridgewater CAIQ idle 6 days · 13 days to due · $5.0M deal",
    detectedAt: "47m ago",
    body: "Bridgewater's CAIQ v4 questionnaire (261 questions) has been sitting at 45/261 answered for 6 days. Due date is 2026-04-25 (13 days). At zero current velocity, this will breach SLA. This deal is the largest active engagement in the pipeline at $5.0M ARR.",
    affectedEntities: [
      { kind: "customer", id: "Bridgewater" },
      { kind: "questionnaire", id: "QR-006" },
    ],
    detectionConfidence: 1.0,
    suggestedAgentId: "questionnaire_triage",
    suggestedAction:
      "Re-triage Bridgewater to senior analyst pool. Reassign from junior queue. Consider parallel-running TrustReply over the remaining 216 questions tonight.",
    expandedDetails:
      "Original triage assignment: junior analyst pool, 'standard' priority. Should have been 'high' given deal size + early CAIQ complexity. Triage scoring under-weighted deal value at the time of intake. Recommendation: dispatch Questionnaire Triage Agent to re-score and reassign, then dispatch TrustReply on the unanswered 216 questions in batch mode overnight. Expected to bring completion to ~85% by morning.",
  },
  {
    id: "ANO-003",
    severity: "warning",
    type: "Confidence Drift",
    title: "Latham Q-184 confidence dropped 0.92 → 0.71 (data residency)",
    detectedAt: "1h 12m ago",
    body: "Saved answer for Latham CAIQ Q-184 ('Where is customer data stored geographically?') re-scored from 0.92 → 0.71 in the last batch. Triggered by metadata change on EVD-010 (Data Residency Architecture diagram) — diagram was updated yesterday but no version note was added.",
    affectedEntities: [
      { kind: "customer", id: "Latham & Watkins" },
      { kind: "evidence", id: "EVD-010" },
      { kind: "answer", id: "Q-184" },
    ],
    detectionConfidence: 0.88,
    suggestedAgentId: "drift_detection",
    suggestedAction:
      "Dispatch Drift Detection to inspect EVD-010 diff and produce a side-by-side comparison. If material change → re-draft answer. If cosmetic → restore baseline confidence.",
    expandedDetails:
      "EVD-010 was modified by user mchen@harvey.ai at 2026-04-11 14:22 UTC. The change is currently un-annotated. Drift agent needs to render a visual diff of the architecture diagram (PDF) and decide whether the change affects the regions covered. If it just renamed an Azure region label, we restore confidence. If it removed a region, we have to redraft Latham's answer and notify the customer.",
  },
  {
    id: "ANO-004",
    severity: "warning",
    type: "SLA Trending",
    title: "KKR SIG Full avg response 1.8d (target <2.0d) · breach in ~3 days",
    detectedAt: "2h ago",
    body: "KKR SIG Full questionnaire response time has crept from 1.4d → 1.8d over the last 5 days. At current pace, it will breach the <2.0d SLA in approximately 3 days. 218 questions remaining out of 340 total.",
    affectedEntities: [
      { kind: "customer", id: "KKR" },
      { kind: "questionnaire", id: "QR-004" },
    ],
    detectionConfidence: 0.84,
    suggestedAgentId: "questionnaire_triage",
    suggestedAction:
      "Bump KKR priority by one band. Recommend pulling Maya Chen off Allen & Overy (already 100% complete, just signoff pending) and onto KKR.",
    expandedDetails:
      "Trend analysis on the rolling 5-day response_time average. Detection confidence is moderate (0.84) because SIG Full questionnaires have higher natural variance — some days have lots of complex multi-part questions, some have cosmetic ones. Recommend the lighter intervention (re-prioritize) before the heavier one (escalate).",
  },
  {
    id: "ANO-005",
    severity: "warning",
    type: "Data Mismatch",
    title: "CC-04 evidence_count = 9 in dashboard but 8 in source table",
    detectedAt: "3h ago",
    body: "Dashboard shows CC-04 (Data Classification & DLP) has 9 evidence artifacts. Source query against evidence_submissions returns 8. The 9th artifact (EVD-009) is flagged status='current' but its expires_date is in the past.",
    affectedEntities: [
      { kind: "control", id: "CC-04" },
      { kind: "evidence", id: "EVD-009" },
    ],
    detectionConfidence: 1.0,
    suggestedAgentId: "error_remediation",
    suggestedAction:
      "Dispatch Error Remediation to flip EVD-009 status to 'expired' and recompute the CC-04 evidence_count denormalization. Then dispatch Evidence Collector to refresh.",
    expandedDetails:
      "Root cause: the nightly job that flips status='current' → status='expired' when expires_date passes failed last night (Snowflake task error). The dashboard's evidence_count is denormalized for performance and references the cached count, which still includes EVD-009. Two-step fix: (1) flip the flag, (2) recompute the count. Both are idempotent and safe.",
  },
  {
    id: "ANO-006",
    severity: "info",
    type: "Schema Update",
    title: "CSA released CAIQ v4.2 · 17 saved answers may need re-mapping",
    detectedAt: "yesterday",
    body: "Cloud Security Alliance published CAIQ v4.2 yesterday. The diff vs v4.1: 23 questions renumbered, 4 new questions added, 1 question deprecated. 17 of our currently saved approved_answers are tied to question IDs that have changed.",
    affectedEntities: [
      { kind: "schema", id: "CAIQ v4.2" },
    ],
    detectionConfidence: 0.96,
    suggestedAgentId: "evidence_collector",
    suggestedAction:
      "Schedule a batch re-mapping job for the 17 affected answers. Low urgency — next CAIQ-format questionnaire isn't due for 11 days.",
    expandedDetails:
      "We monitor CSA's GitHub repo for spec changes. Detection confidence is 0.96 (not 1.0) because we haven't yet validated that all 23 renumbers are pure renumbers vs partial rewrites. The Evidence Collector will need to fetch the official diff document before the re-mapping can run safely.",
  },
];
