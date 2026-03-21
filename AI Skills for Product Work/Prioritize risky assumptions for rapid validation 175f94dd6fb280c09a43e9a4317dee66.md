# Prioritize risky assumptions for rapid validation

Category: 🔍 User Research
Workflow: Assumption Mapping
Workflow Step: 2

```
Optimize for assumption prioritization only. Do not include validation plans. Do not use XML/HTML tags or code fences in your output. Avoid role prompting; rely on decomposition and self-criticism done internally. Output only the two sections specified below.
INPUT
 ASSUMPTIONS:
 {{ASSUMPTIONS}}
 (Plain-text list from the previous “ASSUMPTIONS LIST.” Each item typically has: Category, “Statement: We believe that…”, and “Impact if wrong: …”. If Category is missing, infer it: Desirability, Feasibility, Viability, or Usability.)
TASK
 Prioritize assumptions using an Importance × Certainty framework to identify which ones most threaten the strategy. Perform decomposition (break the task into sub-steps) and self-criticism (consistency checks) internally; report only final scores, quadrants, and concise rationales.
SCORING RUBRIC (APPLY CONSISTENTLY)
Importance (1–5): Estimate business/strategy impact if false.
 5 = Strategy fails, regulatory block, or >20% revenue/margin hit
 4 = Major adoption/cost driver (10–20%) or blocks critical milestone
 3 = Moderate impact (5–10%) or delays roadmap quarter
 2 = Minor impact (<5%) or local workaround available
 1 = Negligible, cosmetic, or isolated

Certainty (1–5): Strength of evidence the assumption is true.
 1 = No evidence; conjecture
 2 = Anecdotes/opinions; untested claim
 3 = Early signals/small samples; partial telemetry
 4 = Strong directional data; multiple sources
 5 = Robust evidence across cohorts; production proof

Derive scores using these factors (weigh as needed but keep the 1–5 result):
 • Impact severity from “Impact if wrong” text
 • Blast radius (users/partners/systems affected)
 • Irreversibility/time sensitivity (rework cost)
 • Dependency/precedence (blocks other assumptions)
 • Evidence quality (sample size, recency, applicability)
 • Variance/consistency across sources

Risk score (for ranking): Importance × (6 − Certainty). Higher = riskier.

PROCESS (INTERNAL)
Parse: Extract each “We believe that…” statement; capture Category and “Impact if wrong.”

Normalize: Merge duplicates; keep the most severe impact note.

Score: Assign Importance and Certainty per rubric; compute Risk score; map to quadrant:
 • High-Importance/Low-Certainty (HI/LC)
 • High-Importance/High-Certainty (HI/HC)
 • Low-Importance/Low-Certainty (LI/LC)
 • Low-Importance/High-Certainty (LI/HC)

Self-critique (internal): Check for scoring drift, category over/under-representation, and outliers; adjust only if a clear inconsistency exists.

OUTPUT REQUIREMENTS (STRICT)
 Return exactly two sections in this order and nothing else:
PRIORITIZATION
2×2 Summary (counts): HI/LC: x; HI/HC: y; LI/LC: z; LI/HC: w

Top Risks (HI/LC), ranked by Risk score (highest first). For each item, provide exactly these lines:
 Assumption: “We believe that …” (verbatim)
 Category: [Desirability | Feasibility | Viability | Usability]
 Importance: [1–5]
 Certainty: [1–5]
 Risk score: [number]
 Rationale: [max 2 short bullets referencing severity, blast radius, or evidence quality]

Full Ranked List: All assumptions sorted by Risk score (desc). Each line:
 [Rank]. [Category] — Importance:[x] Certainty:[y] Risk:[z] — “We believe that …”

QUALITY CHECK
3–6 concise bullets summarizing your self-critique outcomes (e.g., duplicates removed, any re-scored items, category balance, notable scoring ambiguities). Do not reveal step-by-step reasoning—only the final checks and adjustments.

FINAL CHECKS (MUST PASS)
Focus solely on prioritization; no validation activities or recommendations.

Every Top Risks item includes all required fields.

No XML/HTML tags, no code blocks, no role prompting.

Use plain text headings and lists only.

```