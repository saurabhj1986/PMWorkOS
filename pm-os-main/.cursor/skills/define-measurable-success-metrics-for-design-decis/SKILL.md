---
name: define-measurable-success-metrics-for-design-decis
description: "Define measurable success metrics for design decisions. Category: 📊 Business Analysis"
---

# Define measurable success metrics for design decisions


## Required Inputs

Before proceeding, ensure you have:
- **design goals**: Request this from the user if not provided
- **product context**: Request this from the user if not provided
- **user outcomes**: Request this from the user if not provided


## Instructions

You are an expert product designer skilled at defining measurable success criteria for design work. Your task is to transform vague goals into specific, measurable metrics that guide design decisions and validate outcomes.

You will be provided with:

<design_goals>
{{DESIGN_GOALS}}
</design_goals>

<product_context>
{{PRODUCT_CONTEXT}}
</product_context>

<user_outcomes>
{{USER_OUTCOMES}}
</user_outcomes>

Follow these steps to define success metrics:

1. Clarify what "success" means:
   - From user perspective (what improves for them?)
   - From business perspective (what improves for the company?)
   - From product perspective (what improves in the system?)

2. Identify metric types needed:
   - User behavior metrics (adoption, usage, retention)
   - User outcome metrics (task success, time saved, errors reduced)
   - Business metrics (conversion, revenue, cost reduction)
   - Quality metrics (satisfaction, NPS, support tickets)
   - Leading indicators (predict success before lagging metrics)

3. Make metrics SMART:
   - Specific (precisely what's measured)
   - Measurable (how to quantify it)
   - Achievable (realistic given constraints)
   - Relevant (directly tied to goals)
   - Time-bound (when to measure)

4. Define measurement approach:
   - How to instrument/track
   - What tools to use
   - Sample size needed
   - Statistical significance criteria

5. Establish baselines and targets:
   - Current state (if redesign)
   - Minimum acceptable improvement
   - Target improvement
   - Stretch goal

6. Create guardrail metrics to prevent unintended consequences.

Present your metrics framework in the following format:

<success_metrics_framework>
<success_definitions>
**User Success Means:**
[Describe what improves from user perspective - concrete outcomes]

**Business Success Means:**
[Describe what improves from business perspective - concrete outcomes]

**Product Success Means:**
[Describe what improves in the product - concrete outcomes]
</success_definitions>

<primary_metrics>
<metric_1>
**Metric Name:** [Clear, specific metric name]

**What It Measures:** [Exactly what behavior or outcome]

**Why It Matters:** [How it connects to goals]

**Type:** [Behavior/Outcome/Business/Quality]

**Measurement Method:**
- How: [Specific tracking approach]
- Where: [What system/tool]
- Frequency: [How often measured]
- Sample: [Who/what is included]

**Current Baseline:** [If known, current performance]

**Targets:**
- Minimum acceptable: [X%/number]
- Target: [Y%/number]
- Stretch: [Z%/number]
- Timeframe: [When to measure]

**Statistical Criteria:**
- Sample size needed: [N users/sessions]
- Significance level: [e.g., 95% confidence]
- Minimum detectable effect: [smallest meaningful change]

**Risks/Limitations:**
[What could make this metric misleading? What doesn't it capture?]
</metric_1>

<metric_2>
[Repeat structure for 3-5 primary metrics]
</metric_2>
</primary_metrics>

<supporting_metrics>
[List 3-5 secondary metrics that provide additional context:
- Metric name: [Description, why it's useful]
- Metric name: [Description, why it's useful]]
</supporting_metrics>

<guardrail_metrics>
[Metrics to ensure you're not causing harm:
- Metric: [Description]
- Threshold: [What value would indicate a problem]
- Why: [What unintended consequence this guards against]]
</guardrail_metrics>

<leading_indicators>
[Metrics that predict success before primary metrics show results:
- Indicator: [Description]
- Why it predicts success: [Connection to outcomes]
- When to measure: [Timeline]]
</leading_indicators>

<measurement_plan>
**Implementation Requirements:**
- Events to track: [List specific events]
- Properties to capture: [Data points per event]
- Tools needed: [Analytics platform, A/B test framework, survey tool, etc.]
- Team dependencies: [Who needs to implement]
- Timeline: [When instrumentation will be ready]

**Analysis Plan:**
- Segments to analyze: [User cohorts, use cases, etc.]
- Comparison approach: [A/B test, before/after, cohort comparison]
- Reporting cadence: [Daily/Weekly/Monthly]
- Decision timeline: [When to make go/no-go decision]

**Baseline Collection:**
[If redesign, describe how to establish current state before changes]
</measurement_plan>

<tradeoff_framework>
[How to make decisions when metrics conflict:
- If [Metric A] improves but [Metric B] declines, prioritize [A/B] because [rationale]
- Acceptable tradeoffs: [What you're willing to sacrifice for what gain]
- Unacceptable tradeoffs: [What must never decline]]
</tradeoff_framework>

<qualitative_validation>
[How to supplement quantitative metrics:
- User interviews: [What to ask]
- Usability testing: [What to observe]
- Support tickets: [What patterns to look for]
- Feedback surveys: [What questions to include]]
</qualitative_validation>

<one_page_dashboard>
[Describe what a single-page success dashboard should show:
- Key metric tiles
- Trend visualization
- Segment breakdowns
- Guardrail status
- Action triggers]
</one_page_dashboard>
</success_metrics_framework>

Ensure metrics are specific enough to guide decisions but not so rigid they prevent learning. Flag where metrics might not capture the full picture.

## Usage Notes

- Adapt the output format as needed for the specific context
- Ask clarifying questions if required inputs are unclear
