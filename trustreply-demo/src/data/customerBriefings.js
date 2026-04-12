// Customer Briefings — one-click "what's happening on this deal" cards.
// Click a customer chip in Mission Control → this is what renders.
// Each briefing weaves together questionnaire progress, blockers, the
// agents currently working on the deal, the last human action, and a
// trust scorecard for the engagement as a whole.

export const customerBriefings = [
  {
    id: "latham",
    customerName: "Latham & Watkins",
    dealValue: "$4.2M ARR",
    dealStage: "In security review",
    daysToClose: 16,
    questionnaire: {
      type: "CAIQ v4",
      total: 261,
      answered: 248,
      reused: 210,
      avgResponseDays: 1.4,
    },
    blockers: { critical: 0, warning: 1, note: "EVD-008 stale (cited in 2 drafts)" },
    reuseRate: 0.846,
    agentsOnDeal: [
      { agentId: "trustreply", currentAction: "Drafting Q-249 (encryption follow-up)" },
      { agentId: "evidence_collector", currentAction: "Refreshing EVD-008 (3/5 sources)" },
    ],
    lastHumanAction: "Maya Chen approved 12 answers · 8 min ago",
    trustInputs: {
      confidence: 0.94,
      accuracy: 0.96,
      freshness: 0.88,
      benchmark: 0.95,
    },
    recommendation:
      "Likely closes on schedule. Watch EVD-008 freshness — refresh before Bridgewater also needs it. No human escalation required.",
  },
  {
    id: "allen_overy",
    customerName: "Allen & Overy",
    dealValue: "$2.8M ARR",
    dealStage: "Awaiting customer signoff",
    daysToClose: 5,
    questionnaire: {
      type: "SIG Lite",
      total: 180,
      answered: 180,
      reused: 156,
      avgResponseDays: 0.8,
    },
    blockers: { critical: 0, warning: 0, note: "All clear" },
    reuseRate: 0.867,
    agentsOnDeal: [
      { agentId: "notification", currentAction: "Sending daily status digest to customer" },
    ],
    lastHumanAction: "Maya Chen marked questionnaire complete · yesterday",
    trustInputs: {
      confidence: 0.97,
      accuracy: 0.96,
      freshness: 0.93,
      benchmark: 0.98,
    },
    recommendation:
      "Done on our side. Waiting on customer's internal sign-off. No agent dispatch needed — just the daily nudge from Notification Agent.",
  },
  {
    id: "hsbc",
    customerName: "HSBC Legal",
    dealValue: "$3.6M ARR",
    dealStage: "Closed-won (paperwork)",
    daysToClose: 2,
    questionnaire: {
      type: "Custom",
      total: 94,
      answered: 94,
      reused: 71,
      avgResponseDays: 1.1,
    },
    blockers: { critical: 0, warning: 0, note: "All clear" },
    reuseRate: 0.755,
    agentsOnDeal: [],
    lastHumanAction: "Maya Chen archived questionnaire · 2 days ago",
    trustInputs: {
      confidence: 0.95,
      accuracy: 0.96,
      freshness: 0.91,
      benchmark: 0.97,
    },
    recommendation:
      "Won. Custom-format answers feeding back into the library now (+71 reusable answers). Reuse rate impact will show up on the dashboard in the next refresh.",
  },
  {
    id: "kkr",
    customerName: "KKR",
    dealValue: "$3.4M ARR",
    dealStage: "In security review",
    daysToClose: 19,
    questionnaire: {
      type: "SIG Full",
      total: 340,
      answered: 122,
      reused: 98,
      avgResponseDays: 1.8,
    },
    blockers: { critical: 0, warning: 1, note: "Response time trending toward SLA breach" },
    reuseRate: 0.803,
    agentsOnDeal: [
      { agentId: "trustreply", currentAction: "Drafting Q-123 (incident response SLA)" },
    ],
    lastHumanAction: "Junior analyst (R. Patel) approved 4 answers · 1h ago",
    trustInputs: {
      confidence: 0.91,
      accuracy: 0.93,
      freshness: 0.89,
      benchmark: 0.86,
    },
    recommendation:
      "At risk. Response time is creeping toward the <2.0d SLA. Recommend bumping priority and shifting Maya Chen onto KKR after Allen & Overy signs. Triage Agent has flagged this already.",
  },
  {
    id: "paul_weiss",
    customerName: "Paul Weiss",
    dealValue: "$1.9M ARR",
    dealStage: "Closed-won (live customer)",
    daysToClose: 0,
    questionnaire: {
      type: "Custom",
      total: 67,
      answered: 67,
      reused: 58,
      avgResponseDays: 0.6,
    },
    blockers: { critical: 0, warning: 0, note: "All clear" },
    reuseRate: 0.866,
    agentsOnDeal: [],
    lastHumanAction: "Maya Chen archived questionnaire · 4 days ago",
    trustInputs: {
      confidence: 0.96,
      accuracy: 0.96,
      freshness: 0.94,
      benchmark: 0.98,
    },
    recommendation:
      "Reference customer now. The 58 reused answers were the foundation for the Allen & Overy reuse rate. Compounding library effect in action.",
  },
  {
    id: "bridgewater",
    customerName: "Bridgewater",
    dealValue: "$5.0M ARR",
    dealStage: "In security review",
    daysToClose: 13,
    questionnaire: {
      type: "CAIQ v4",
      total: 261,
      answered: 45,
      reused: 32,
      avgResponseDays: null,
    },
    blockers: { critical: 1, warning: 0, note: "SLA breach risk + stalled 6 days" },
    reuseRate: 0.711,
    agentsOnDeal: [
      { agentId: "questionnaire_triage", currentAction: "Re-triaging (escalating to senior)" },
    ],
    lastHumanAction: "No human action in 6 days",
    trustInputs: {
      confidence: 0.78,
      accuracy: 0.93,
      freshness: 0.85,
      benchmark: 0.71,
    },
    recommendation:
      "BIGGEST DEAL · MOST AT RISK. 216 questions remain, 13 days to due, no analyst velocity in 6 days. Recommend: re-triage to senior pool tonight, dispatch TrustReply in batch mode over the unanswered questions, schedule a check-in with the customer's security lead this week to buy goodwill.",
  },
];

export function getBriefing(id) {
  return customerBriefings.find((b) => b.id === id);
}
