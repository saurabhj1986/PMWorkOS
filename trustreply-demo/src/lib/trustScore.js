// Trust Score helper — the unifying "should I trust this output?" math used
// across the whole app (Pipeline Stage 6, every agent, every anomaly, every
// customer briefing).
//
// Inputs (all 0..1):
//   confidence  — how sure THIS specific output is (LLM logprobs / classifier)
//   accuracy    — historical accuracy of THIS agent on similar tasks (30-day)
//   freshness   — how current the underlying evidence is (1.0 = just collected,
//                 0.0 = expired)
//   benchmark   — how close confidence is to historical baseline confidence on
//                 similar tasks (drift indicator; 1.0 = on baseline, 0.0 = wildly off)
//
// Output:
//   { confidence, accuracy, freshness, benchmark, index, band }
//
// Index is a weighted average. Confidence weighs most (it's the immediate
// signal), accuracy second (historical track record), freshness third
// (stale evidence kills audits), benchmark last (drift is a tiebreaker).

const WEIGHTS = {
  confidence: 0.4,
  accuracy: 0.3,
  freshness: 0.2,
  benchmark: 0.1,
};

export function computeTrustScore({
  confidence,
  accuracy,
  freshness,
  benchmark,
}) {
  const index =
    confidence * WEIGHTS.confidence +
    accuracy * WEIGHTS.accuracy +
    freshness * WEIGHTS.freshness +
    benchmark * WEIGHTS.benchmark;

  const band = bandFor(index);

  return { confidence, accuracy, freshness, benchmark, index, band };
}

export function bandFor(index) {
  if (index >= 0.9) return "trusted";
  if (index >= 0.75) return "review";
  return "flag";
}

export function formatPct(value) {
  return `${Math.round(value * 100)}%`;
}

export function formatScore(value) {
  return value.toFixed(2);
}

export const BAND_LABELS = {
  trusted: "TRUSTED",
  review: "REVIEW",
  flag: "FLAG",
};

export const BAND_TOOLTIPS = {
  trusted:
    "Trust Index ≥ 0.90. High confidence, strong accuracy track record, fresh evidence. Safe to auto-approve or surface to customer with light review.",
  review:
    "Trust Index 0.75–0.89. One or more inputs (confidence / accuracy / freshness / benchmark) is degraded. Needs an analyst eye before it ships.",
  flag: "Trust Index < 0.75. Don't ship. Either the agent isn't sure, or its track record on this task type is weak, or the evidence is stale. Investigate before acting.",
};
