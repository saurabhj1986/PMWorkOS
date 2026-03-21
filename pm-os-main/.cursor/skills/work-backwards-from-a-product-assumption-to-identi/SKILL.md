---
name: work-backwards-from-a-product-assumption-to-identi
description: "Work backwards from a product assumption to identify an easy signal. Category: 🔍 User Research"
---

# Work backwards from a product assumption to identify an easy signal


## Required Inputs

Before proceeding, ensure you have:
- **assumption**: Request this from the user if not provided


## Instructions

Design an early, efficient signal to validate a single product assumption. Do not use XML/HTML tags or code fences in your output. Avoid role prompting; rely on decomposition and self-criticism internally. Output only the three sections specified below.
INPUT
 ASSUMPTION: {{ASSUMPTION}} (One statement starting with “We believe that …”)
OPTIONAL CONTEXT (use if provided; otherwise infer prudently and state in SUMMARY):
Segment: [Consumer | SMB | Mid-market | Enterprise | Gov/Healthcare]

Function executing: [Founder | PM | PMM | Research | Sales | Eng]

Stage: [Idea | Prototype | Alpha | Beta]

Constraints: [Compliance/security, data sensitivity, procurement limits, channels unavailable]

Assets/access: [Customer list, design partners, sandbox/prototype, analytics, ad budget]

Time/budget: [e.g., 1 week, <$500]

TASK
 Work backward from the single assumption to identify the most efficient, context-appropriate signal that could validate it early without building the full product. Generate options, then select the best one. Perform decomposition (assumption type, evidence needs, available channels) and self-criticism (suitability, bias, feasibility) internally; report only the required sections.
ASSUMPTION DIAGNOSTIC (INTERNAL)
 Classify the assumption’s primary lens: Desirability (intent/WTP), Feasibility (technical/operational), Viability (economics), or Usability (interaction). This classification should guide which signal families you consider.
METHOD SUITABILITY RULES (APPLY STRICTLY)
Enterprise/B2B with procurement or security constraints: favor expert/customer interviews with economic buyers, design-partner LOIs, security questionnaire dry-runs, sandbox/prototype demos, ROI/Total Cost calculators, reference checks, RFP alignment, API/mock evaluations. Avoid smoke/fake-door tests, consumer ad funnels, or tactics that bypass buyer process.

SMB SaaS: favor discovery calls, lightweight trials, website offer tests, calendly/POC requests, email list tests, usage of existing analytics; modest paid experiments permissible.

Consumer: favor ad-driven intent, waitlist conversion, community/panel polls, preorders, competitor usage proxies.

Regulated (health/fin): favor standards mapping, SME review, regulatory preflight, de-identified/synthetic data checks; avoid collecting sensitive data without approvals.

Feasibility assumptions: favor engineering spikes, benchmark repros, vendor evals, data quality audits; avoid user-facing experiments if not required.

Always ensure ethics/compliance; no scraping personal data, deception, or tests requiring approvals you don’t have.

QUALITY BAR FOR “EFFICIENT SIGNAL”
Early: obtainable at Idea/Prototype stage.

Cheap: minimal cash/time; leverage existing assets.

Attributable: reduces uncertainty about the assumption directly.

Decisive: includes a quantified success/falsification threshold.

Suitable: complies with the Method Suitability Rules above.

OUTPUT REQUIREMENTS (STRICT)
 Return exactly three sections in this order and nothing else:
SCRATCHPAD
Brainstorm at least 5 distinct, context-appropriate signals. For each item, provide a single line:
 [Signal name] — [What would constitute positive evidence] — [How to obtain quickly] — [Why suitable for this context]

EFFICIENT SIGNAL
Provide exactly these lines for the single best option:
 Signal description: [clear, specific statement of the signal]
 Method: [step-by-step, minimal-effort approach to capture it]
 Suitability: [why this fits the segment/stage/constraints; avoid unsuitable tactics]
 Earliest stage: [Idea | Prototype | Alpha | Beta]
 Participants/sample: [who/how many]
 Timebox & cost: [e.g., 3 days, <$200]
 Success threshold: [quantified pass criterion]
 Data captured: [metrics/notes/artifacts]
 Risks/ethics: [key risks and mitigations]
 Next evidence rung: [what you’d do next only if positive—one line]

SUMMARY
3–5 sentences: restate the assumption, note the diagnostic lens, explain why the chosen signal is the most efficient and suitable given the context, and mention any major options you intentionally excluded.

FEW-SHOT FORMAT EXAMPLE (DO NOT COPY CONTENT INTO YOUR OUTPUT)
 SCRATCHPAD
 • Design-partner LOIs — ≥3 signed LOIs from target enterprises — leverage exec sponsor outreach — respects enterprise buying process
 • Security questionnaire dry-run — pass SOC2-adjacent checklist with vendor — send standard questionnaire to friendly CISOs — aligns with compliance gate
 • ROI calculator sessions — ≥2 CFOs confirm model assumptions — 45-min screenshare with sample data — tests viability narrative
 • API mock eval — ≥5 architects complete 2 endpoints in Postman — publish mock server — tests feasibility without product
 • Reference check intent — ≥3 existing tools’ references agree to switch — conduct structured calls — gauges switching willingness
EFFICIENT SIGNAL
 Signal description: ≥3 target design partners sign LOIs stating problem urgency and willingness to run a 60-day pilot.
 Method: Use exec intros to schedule 5 discovery calls; present problem narrative and pilot terms; collect signed LOIs via template.
 Suitability: Enterprise buyers require formal commitment; avoids fake-door tactics; feasible at Idea/Prototype.
 Earliest stage: Idea
 Participants/sample: 5 economic buyers, target vertical
 Timebox & cost: 5 days, $0–$200 (legal template)
 Success threshold: ≥3 signed LOIs with pilot terms including named champion
 Data captured: Signed LOIs, objections, timelines
 Risks/ethics: Over-promising mitigated by clear pilot scope; no deceptive offers
 Next evidence rung: Draft mutual success plan for first pilot
FINAL CHECKS (MUST PASS)
Output includes only SCRATCHPAD, EFFICIENT SIGNAL, and SUMMARY sections.

≥5 brainstormed signals; all respect suitability rules.

EFFICIENT SIGNAL includes every required line and a quantified threshold.

No XML/HTML tags, no code blocks, no role prompting.

## Usage Notes

- Adapt the output format as needed for the specific context
- Ask clarifying questions if required inputs are unclear
