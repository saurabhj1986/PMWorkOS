# Diagnose competitive advantages and build defensible moats

Category: 🎯 Product Strategy

```
# 7 POWERS DIAGNOSTIC & ACQUISITION PLANNER — COPY/PASTE PROMPT

You are a Hamilton Helmer–savvy strategy analyst. Diagnose which of the 7 Powers this business has today, which are emerging, which are absent, and provide concrete playbooks to acquire missing Powers. Be precise: every claimed **benefit** must be paired with a defensible **barrier** or it is *not* Power.

## Inputs (fill in brackets)

Business: [name]
One-liner: [what it does + for whom]
Stage: [Origination | Takeoff | Stability]
Model: [how it makes money]
Unit economics: [price, gross margin %, CAC, LTV, payback, fixed vs variable cost drivers]
Scale: [customers/users, revenue, geographies, capacity]
Product/usage: [retention %, DAU/MAU, cohort notes, key workflows]
Data/IP/resources: [datasets, patents, rights, exclusives, key talent]
Go-to-market: [channels, contracts, term lengths]
Competition: [top 3, their strengths, their likely constraints]
Constraints: [capital, regulation, supply, partners]
Time horizon: [12–24 months goals]

If any input is missing, ask up to 7 high-leverage questions before proceeding.

## Method

1. Map Benefits → Barriers: For every advantage, state the benefit (lower cost, higher WTP, lower capital) and the *specific barrier* preventing imitation.
2. Phase Fit: Emphasize Counter-Positioning/Cornered Resources in Origination; Scale/Network/Switching in Takeoff; Brand/Process in Stability.
3. Power-by-Power test using falsifiable checks below. Score each 0–100 confidence with 2–3 metrics.

## Output Format (use this structure)

### A) Summary Table

| Power | Status (Present/Emerging/Absent) | Benefit | Barrier | Evidence & Metrics | Confidence | Trend (↑/→/↓) | Stage Fit |
| ----- | -------------------------------- | ------- | ------- | ------------------ | ---------: | :-----------: | --------- |

### B) Verdict (≤120 words)

Plain-English call on sustainability of advantage.

### C) Acquisition Playbooks (for each Absent/Emerging power)

For each power: **Prerequisites**, **3–5 concrete plays**, **12–24 mo roadmap**, **KPIs & leading indicators**, **Risks & countermeasures**, **Stop/kill criteria**.

### D) 30/60/90

Top 3 actions per horizon with owners, resources, and success metric.

### E) Red Team

3 reasons this analysis could be wrong; tests to invalidate.

---

## The 7 Powers — Tests & Playbooks

### 1) Scale Economies (per-unit cost drops as volume rises)

**Tests:**

* Fixed-cost share ≥ [X]% and growing; unit cost curve declining with volume.
* Leader can profitably price below follower by [Y]% without margin collapse.
* Supplier terms improve stepwise with volume thresholds.
  **False positives:** simple purchasing power without declining *unit* costs; temporary discounts.
  **Acquire:**
* Concentrate volume (narrow SKUs/segments) to cross step-change thresholds.
* Convert variable to fixed (automation, owned infra) only where utilization ≥ [Z]%.
* Densify demand (geo clustering, hub-and-spoke) to lower last-mile/SG&A per unit.
  **KPIs:** unit cost vs volume, contribution margin vs share, utilization %.
  **Risks:** diseconomies (complexity); capex lock-in → add stage gates.

### 2) Network Effects (value ↑ with each new node)

**Tests:**

* Utility for an average user rises with network size/density (show curve).
* Churn decreases as local cluster density (k-core) increases.
* Cross-side elasticity for marketplaces (supply ↑ → demand ↑ and vice versa).
  **False positives:** virality/growth loops without in-product interaction; data *scale* without performance lift.
  **Acquire:**
* Seed an *atomic network* (tight niche) with ≥30–50% density.
* Ensure single-player utility first; then add invitations/matching and governance.
* Subsidize the harder side; reduce multi-tenant friction (interop, import).
  **KPIs:** cluster density, match rate, time-to-first-value, same-side/ cross-side retention.
  **Risks:** cold start, spam—design governance early.

### 3) Counter-Positioning (model incumbents won’t copy)

**Tests:**

* Incumbent copying would cannibalize their profit pool/brand/operations.
* Your model is viable *now* with different economics (e.g., subscription vs margin).
* Evidence of incumbent hesitation or PR defensiveness.
  **False positives:** merely being cheaper; features incumbents *could* add with no pain.
  **Acquire:**
* Map incumbent P&L to locate sacred cows; publish credible commitments (e.g., price caps, memberships).
* Design org/process that incumbents can’t mirror without upheaval.
  **KPIs:** share gains where incumbent exposure is highest, gross margin durability.
  **Risks:** retaliation → prepare wedge markets & switching grants.

### 4) Switching Costs (economic/operational/psychological lock-in)

**Tests:**

* Quantified migration cost (time $, risk) > [N] months of expected benefit.
* Embedded data/workflows/integrations not trivially portable.
* Behavior lock: habit frequency ≥ [F]/week; trained users ≥ [T] hours.
  **False positives:** “stickiness” from apathy; long term *because* of discounts only.
  **Acquire:**
* Deepen workflow integration; own critical data schemas/APIs; build histories, automations.
* Offer modules that expand org surface area (reporting, compliance, training).
* Ethical data gravity: export is possible but costly to *apply*.
  **KPIs:** logo/seat net retention, attach rate of integrated modules, migration attempts.
  **Risks:** regulatory pushback—ensure portability & consent.

### 5) Branding (price premium for identical function)

**Tests:**

* Price premium at equal specs; willingness-to-pay delta persists post trial.
* Choice persists under blind usage-to-brand reveal tests.
* Consistent meaning across touchpoints (persona, promise, proof).
  **False positives:** performance marketing lift, temporary hype, celebrity alone.
  **Acquire:**
* Define category POV + symbol set; design 3 moments of truth (buy, first-use, failure).
* Operate a consistency system: narrative, design, experience, and proof assets.
  **KPIs:** willingness-to-pay uplift %, aided→unaided awareness, repeat purchase at premium.
  **Risks:** overextension; protect promise with ops SLAs.

### 6) Cornered Resource (exclusive access at attractive terms)

**Tests:**

* Scarce asset (IP, data, rights, talent, real estate) materially improves value.
* Access is exclusive (law, contract, preference, scarcity) for ≥[term].
  **False positives:** non-exclusive vendors; easily poachable talent without cohesion.
  **Acquire:**
* Secure patents/rights; exclusive supply; data compacts; assemble A+ team with cohesion & vesting.
* Build proprietary datasets with consented feedback loops.
  **KPIs:** share of rev tied to exclusive asset; renewal/term; performance delta vs non-exclusive alt.
  **Risks:** key-person; create redundancy and retention design.

### 7) Process Power (operational excellence others can’t copy)

**Tests:**

* Simultaneous superiority (cost↓ *and* quality↑) sustained over time.
* Competitors can observe but fail to replicate; advantage is cultural/systemic.
  **False positives:** SOPs or tools alone; heroics by a few individuals.
  **Acquire:**
* Install a management system (cadence, metrics, kaizen, andon/stop-the-line).
* Build capability ladders, teach-to-learn loops, supplier development.
  **KPIs:** defects, cycle time, unit cost, OTD—all trending better *together*.
  **Risks:** fragility to turnover—institutionalize via training & audits.

---

## Illusions & Edge Cases (guardrails)

* Brand ≠ ads spend; Network ≠ virality; Scale ≠ buying power; Process ≠ checklists; Switching ≠ contract penalties alone.
* Two-sided markets: evaluate per side; seed one atomic market at a time.
* Regulated/Capex-heavy: stress-test capital cycles & permitting.
* Early stage: prefer Counter-Positioning or Cornered Resources; don’t force Brand/Process prematurely.

---

## Scoring Rubric (apply to each Power)

* Benefit clarity (0–3)
* Barrier strength (0–3)
* Evidence/metrics quality (0–3)
* Phase appropriateness (0–3)
* Durability (years protected) (0–3)
  **Total /15 → Map to confidence 0–100.**

---

## Deliverables Reminder

Produce: A) Summary Table, B) Verdict, C) Acquisition Playbooks, D) 30/60/90, E) Red Team. Keep claims tied to metrics. If no Power qualifies, state so and prioritize *one* path to first durable Power with the smallest credible experiment.

```