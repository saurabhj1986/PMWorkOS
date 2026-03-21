# Generate product assumptions from core strategy inputs

Category: 🔍 User Research
Workflow: Assumption Mapping
Workflow Step: 1

```
You are tasked with producing a rigorous list of assumptions underlying a product strategy. Your goal is to generate clear, testable, and impact-aware assumptions across desirability, feasibility, viability, and usability—using only the information provided and disciplined inference. Do not use XML, HTML, or angle-bracket tags in your output.
INPUTS
Review the following:
product_description:
{{PRODUCT_DESCRIPTION}}
core_problem:
{{CORE_PROBLEM}}
target_user:
{{TARGET_USER}}
If any input block is missing or vague, proceed using prudent, industry-standard defaults and note these gaps explicitly in the SUMMARY (do not add new fields elsewhere).
OUTPUT REQUIREMENTS (STRICT)
Return exactly two sections in this order and nothing else:
ASSUMPTIONS LIST
SUMMARY
Do not use XML/HTML tags or code fences. Use plain text headings and lists only.
In ASSUMPTIONS LIST, create exactly four subsections in this order, each with at least 5 assumptions:
Desirability Assumptions
Feasibility Assumptions
Viability Assumptions
Usability Assumptions
Format each assumption as a numbered item with two labeled lines:
Statement: starting with “We believe that…”; a single, specific, falsifiable claim (max 35 words).
Impact if wrong: one concise sentence focused on adoption, cost, timelines, risk, or strategy.
No compound claims; one idea per assumption.
GUIDANCE & QUALITY BAR
Specificity & Testability: Include measurable thresholds, segments, timeframes, or conditions (e.g., “at least 20%,” “within 90 days,” “for new SMB admins,” “under normal network conditions”).
Domain Awareness: Reflect multi-sided markets, compliance, integrations, data quality, performance/SLOs, scalability, operational capacity, pricing power, unit economics, CAC/LTV, churn, retention, partner economics.
Category Lenses:
Desirability: problem severity, willingness to pay/switch, triggers, frequency, decision makers, trust.
Feasibility: technical risks, data availability, integration complexity, environments, reliability, security/compliance, scalability, support runbooks.
Viability: pricing, margin, TAM/SAM, sales cycle length, channel fit, retention, payback, partner take rates.
Usability: task success, learnability, accessibility, error tolerance, onboarding, IA/navigation, mobile/desktop context, latency thresholds.
Non-duplication: Avoid repeating the same assumption across categories; tailor to each lens.
Concision: Plain language; necessary jargon only.
FEW-SHOT FORMAT EXAMPLE (DO NOT COPY INTO YOUR OUTPUT)
ASSUMPTIONS LIST
Desirability Assumptions
Statement: We believe that new SMB admins will pay at least $20/user/month if onboarding time drops below 30 minutes.
Impact if wrong: Premium pricing underperforms due to insufficient willingness to pay.
SUMMARY
[Example only—omit in your output]
FINAL CHECKS (MUST PASS BEFORE YOU OUTPUT)
Output contains only ASSUMPTIONS LIST and SUMMARY sections.
Each category has ≥5 assumptions.
Every Statement begins with “We believe that…” and is ≤35 words.
Every assumption includes an “Impact if wrong” sentence with concrete consequences.
No XML/HTML tags, code blocks, or extra commentary.

```