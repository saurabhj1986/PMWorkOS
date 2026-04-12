// Sub-agent roster for Mission Control. 6 named agents across 3 tiers:
//   Core     — do the work (TrustReply, Evidence Collector)
//   Quality  — keep the system honest (Drift Detection, Error Remediation)
//   Ops      — keep operations flowing (Questionnaire Triage, Notification)
//
// Each agent has a tier, a failureMode (interview-ready "without this, X breaks"),
// a trust scorecard, and recent activity. Used by AgentRoster, AnomalyFeed,
// and CustomerBriefings via getAgent().

export const agents = [
  {
    id: "trustreply",
    name: "TrustReply Agent",
    role: "Drafts answers to customer security questionnaires",
    tier: "core",
    failureMode: "Without this: analysts spend 20 min per answer instead of 12 seconds",
    icon: "MessageSquare",
    status: "idle",
    statusDetail: "Last run 2 min ago · 248 answers drafted today",
    description:
      "The original TrustReply agent. Reads customer questionnaire questions, classifies them, maps to the Common Control Framework, retrieves current evidence, and drafts a customer-ready answer with a confidence score. The pipeline you see on Tab 1 is this agent in action.",
    sources: [
      "control_inventory",
      "evidence_submissions",
      "approved_answers (history)",
    ],
    runsToday: 248,
    accuracyBaseline: 0.93,
    trustInputs: {
      confidence: 0.96,
      accuracy: 0.96,
      freshness: 0.94,
      benchmark: 0.98,
    },
    recentRuns: [
      { at: "2m ago", action: "Drafted Q-249 (Latham)", outcome: "approved" },
      { at: "4m ago", action: "Drafted Q-248 (Latham)", outcome: "approved" },
      { at: "11m ago", action: "Drafted Q-247 (Latham)", outcome: "edits applied" },
      { at: "32m ago", action: "Drafted Q-180 (Allen & Overy)", outcome: "approved" },
    ],
  },
  {
    id: "evidence_collector",
    name: "Evidence Collector",
    role: "Refreshes expiring evidence from source systems",
    tier: "core",
    failureMode: "Without this: evidence goes stale → audit failures → wrong answers ship",
    icon: "FolderSync",
    status: "working",
    statusDetail: "Collecting EVD-008 update · 3 of 5 sources gathered",
    description:
      "Polls source systems on a schedule (and on-demand from anomaly alerts) to refresh evidence artifacts before they expire. Currently fetching the AI Model Risk Assessment update from internal model registry, OpenAI usage logs, and the AI safety review board's latest sign-off.",
    sources: ["Anecdotes", "CrowdStrike", "Okta", "Datadog", "Internal model registry"],
    runsToday: 14,
    accuracyBaseline: 0.89,
    trustInputs: {
      confidence: 0.91,
      accuracy: 0.91,
      freshness: 1.0,
      benchmark: 0.93,
    },
    recentRuns: [
      { at: "now", action: "Refreshing EVD-008 (in progress)", outcome: "working" },
      { at: "1h ago", action: "Refreshed EVD-006 (Datadog SIEM export)", outcome: "success" },
      { at: "3h ago", action: "Refreshed EVD-004 (Okta SSO export)", outcome: "success" },
      { at: "yesterday", action: "Refreshed EVD-003 (Cloudflare TLS audit)", outcome: "success" },
    ],
  },
  {
    id: "drift_detection",
    name: "Drift Detection Agent",
    role: "Catches confidence drift on saved answers when evidence changes",
    tier: "quality",
    failureMode: "Without this: approved answers silently become wrong after evidence changes",
    icon: "Activity",
    status: "alert",
    statusDetail: "3 drift events flagged today · 1 critical",
    description:
      "Watches every approved answer in the library. When the underlying evidence is modified (new collected_date, new content, or status flip), this agent re-scores the cached confidence. If the new score deviates from the historical baseline by more than 20%, it raises an alert. Today it caught a Latham residency answer that dropped from 0.92 to 0.71.",
    sources: ["approved_answers", "evidence_submissions", "trust_score history"],
    runsToday: 1842,
    accuracyBaseline: 0.85,
    trustInputs: {
      confidence: 0.88,
      accuracy: 0.86,
      freshness: 0.95,
      benchmark: 0.82,
    },
    recentRuns: [
      { at: "1h 12m ago", action: "Drift on Latham Q-184 (residency) — flagged", outcome: "alert raised" },
      { at: "4h ago", action: "Drift on Allen & Overy Q-091 (key rotation) — flagged", outcome: "alert raised" },
      { at: "6h ago", action: "Re-scored 412 cached answers", outcome: "no drift" },
      { at: "yesterday", action: "Drift on KKR Q-220 (DLP) — flagged", outcome: "resolved" },
    ],
  },
  {
    id: "error_remediation",
    name: "Error Remediation Agent",
    role: "Investigates and fixes data mismatches in the trust data lake",
    tier: "quality",
    failureMode: "Without this: dashboard shows wrong numbers → bad decisions",
    icon: "Wrench",
    status: "idle",
    statusDetail: "12 mismatches resolved this week",
    description:
      "When the dashboard says one thing and the source tables say another, this agent figures out why. Common cases: stale caches, status flags that didn't propagate, evidence_count denormalizations gone bad, or duplicated rows from a failed dedupe job. It opens an incident, proposes a fix, and (with human approval) applies it.",
    sources: ["control_inventory", "evidence_submissions", "questionnaire_responses", "Snowflake query logs"],
    runsToday: 3,
    accuracyBaseline: 0.92,
    trustInputs: {
      confidence: 0.94,
      accuracy: 0.95,
      freshness: 0.97,
      benchmark: 0.96,
    },
    recentRuns: [
      { at: "1h ago", action: "Reconciled CC-04 evidence_count (9 vs 8)", outcome: "fix proposed" },
      { at: "yesterday", action: "Fixed stale 'current' flag on EVD-009", outcome: "approved + applied" },
      { at: "yesterday", action: "Reconciled CC-15 last_tested date", outcome: "resolved" },
    ],
  },
  {
    id: "questionnaire_triage",
    name: "Questionnaire Triage Agent",
    role: "Prioritizes incoming questionnaires by deal value, due date, complexity",
    tier: "ops",
    failureMode: "Without this: $5M deals get deprioritized behind $1.9M deals",
    icon: "ListChecks",
    status: "idle",
    statusDetail: "6 questionnaires triaged today",
    description:
      "When a new questionnaire arrives, this agent scores it on three axes: deal value (from CRM lookup), urgency (days to due date), and complexity (total questions × novelty score). Outputs a priority rank and assigns it to the right analyst based on workload and expertise. Bridgewater's CAIQ is currently flagged for re-triage because it's been idle for 6 days.",
    sources: ["questionnaire_responses", "Salesforce (CRM)", "analyst_workload"],
    runsToday: 6,
    accuracyBaseline: 0.95,
    trustInputs: {
      confidence: 0.97,
      accuracy: 0.97,
      freshness: 1.0,
      benchmark: 0.99,
    },
    recentRuns: [
      { at: "12m ago", action: "Triaged Goldman Sachs (CAIQ v4, $3.1M)", outcome: "assigned to Maya Chen" },
      { at: "2h ago", action: "Re-triaged Bridgewater (idle 6d)", outcome: "escalated to senior" },
      { at: "yesterday", action: "Triaged Latham CAIQ", outcome: "assigned to Maya Chen" },
    ],
  },
  {
    id: "notification",
    name: "Notification Agent",
    role: "Routes alerts to Slack / email / PagerDuty by severity + on-call",
    tier: "ops",
    failureMode: "Without this: SLA breaches go unnoticed for hours",
    icon: "Bell",
    status: "working",
    statusDetail: "Sent 7 alerts today · routing 1 now",
    description:
      "Every anomaly and SLA event flows through here. Critical alerts page the on-call trust engineer via PagerDuty. Warnings go to the #trust-ops Slack channel with a thread per incident. Info events get batched into a daily digest email. Follows the on-call rotation defined in the trust team's PagerDuty schedule.",
    sources: ["PagerDuty", "Slack #trust-ops", "Gmail trust@harvey.ai", "On-call rotation"],
    runsToday: 7,
    accuracyBaseline: 0.99,
    trustInputs: {
      confidence: 1.0,
      accuracy: 1.0,
      freshness: 1.0,
      benchmark: 0.99,
    },
    recentRuns: [
      { at: "now", action: "Routing EVD-008 critical alert to PagerDuty", outcome: "in progress" },
      { at: "47m ago", action: "Routed Bridgewater SLA breach to #trust-ops", outcome: "delivered" },
      { at: "2h ago", action: "Routed KKR SLA trending warning to #trust-ops", outcome: "delivered" },
    ],
  },
];

export function getAgent(id) {
  return agents.find((a) => a.id === id);
}
