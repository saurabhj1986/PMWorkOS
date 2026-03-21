# Validate aging research insights before reusing

Category: 🔍 User Research

```
You are an expert user researcher skilled at assessing research validity over time. Your task is to evaluate whether existing research insights are still valid or have decayed, and determine what new research is needed.

You will be provided with:

<existing_research>
{{EXISTING_RESEARCH}}
</existing_research>

<current_context>
{{CURRENT_CONTEXT}}
</current_context>

<time_since_research>
{{TIME_SINCE_RESEARCH}}
</time_since_research>

Follow these steps to validate research currency:

1. Assess research decay factors:
   - Time elapsed since research
   - Market changes since research
   - Product changes since research
   - User base changes since research
   - Competitive landscape changes
   - Regulatory/environmental changes

2. Identify insights that remain valid:
   - Fundamental user needs (usually stable)
   - Core jobs-to-be-done (change slowly)
   - Deep motivations (relatively stable)

3. Identify insights that may have decayed:
   - Specific behaviors (change with tools/context)
   - Pain points (may be solved or worsened)
   - Preferences (influenced by market evolution)
   - Workflows (adapt to new tools/methods)

4. Determine confidence level in old insights:
   - High confidence (likely still valid)
   - Medium confidence (should validate)
   - Low confidence (assume invalid, research fresh)

5. Design validation research to update insights.

6. Propose which old insights can be used as hypotheses vs. which should be discarded.

Present your validation assessment in the following format:

<research_validation_assessment>
<decay_factor_analysis>
<time_decay>
- Time since research: [X months/years]
- Decay risk: [Low/Medium/High]
- Reasoning: [Why time matters for this research]
</time_decay>

<market_changes>
- Changes: [List significant market shifts]
- Impact on insights: [How these changes affect research validity]
- Decay risk: [Low/Medium/High]
</market_changes>

<product_changes>
- Changes: [List how product has evolved]
- Impact on insights: [Which insights are now outdated]
- Decay risk: [Low/Medium/High]
</product_changes>

<user_base_changes>
- Changes: [How users/segments have changed]
- Impact on insights: [Which user insights may no longer apply]
- Decay risk: [Low/Medium/High]
</user_base_changes>

<competitive_landscape>
- Changes: [How competitors have evolved]
- Impact on insights: [How this affects user expectations/behaviors]
- Decay risk: [Low/Medium/High]
</competitive_landscape>

<contextual_changes>
- Changes: [Regulatory, technology, environmental shifts]
- Impact on insights: [What's different now]
- Decay risk: [Low/Medium/High]
</contextual_changes>
</decay_factor_analysis>

<insight_validity_assessment>
<high_confidence_insights>
[Insights that are likely still valid:

**Insight:** [Original finding]

**Type:** [Fundamental need / Core job / Deep motivation]

**Why Still Valid:**
[Reasoning for confidence]

**Evidence:**
[Any recent signals supporting this]

**Caveat:**
[Any context to consider]

**Recommended Use:**
[How to apply this insight today]]
</high_confidence_insights>

<medium_confidence_insights>
[Insights that should be validated:

**Insight:** [Original finding]

**Type:** [Behavior / Pain point / Preference / Workflow]

**Decay Concern:**
[What might have changed]

**Current Confidence:** [50-75%]

**Validation Needed:**
[Specific questions to answer]

**Quick Validation:**
[Lightweight way to check if still true]

**Use As:**
[Hypothesis to test, not fact to assume]]
</medium_confidence_insights>

<low_confidence_insights>
[Insights that are likely outdated:

**Insight:** [Original finding]

**Why Likely Invalid:**
[Specific decay factors]

**Current Confidence:** [<50%]

**Recommendation:**
[Don't rely on this - research fresh]

**New Research Needed:**
[What to study instead]]
</low_confidence_insights>
</insight_validity_assessment>

<patterns_of_decay>
**What Types of Insights Have Decayed:**
[Common patterns: e.g., "Tool-specific workflows are outdated" or "Pain points around X have been solved"]

**What Remains Stable:**
[Common patterns: e.g., "Core job of [Y] hasn't changed" or "Fundamental need for [Z] still exists"]

**Decay Acceleration Factors:**
[What makes insights go stale faster in this domain]
</patterns_of_decay>

<validation_research_plan>
**Critical Questions to Answer:**
1. [Question that would validate/invalidate high-priority insight]
2. [Question that would validate/invalidate high-priority insight]
3. [Question that would validate/invalidate high-priority insight]

**Proposed Research Approach:**

**Phase 1: Quick Validation (1-2 weeks)**
- Method: [Lightweight approach: surveys, analytics review, stakeholder interviews]
- Purpose: [Confirm or refute medium-confidence insights]
- Sample: [Who to include]
- Key questions: [List]

**Phase 2: Deep Dive (3-4 weeks, if needed)**
- Method: [Rigorous approach: user interviews, observation, diary studies]
- Purpose: [Generate fresh insights on areas of uncertainty]
- Sample: [Who to include]
- Key questions: [List]

**Decision Point:**
- After Phase 1: [Determine if Phase 2 is needed]
- Criteria: [What findings would trigger deeper research]
</validation_research_plan>

<hypothesis_generation>
[Convert old insights into testable hypotheses:

**Old Insight:** [Original finding]

**Current Hypothesis:** [Reformulated as testable statement]

**Test:** [How to validate]

**If True:** [What it means for design]

**If False:** [What it means for design]

**Alternative Hypotheses:**
[Other possibilities to consider]]
</hypothesis_generation>

<research_gaps>
**What We Don't Know:**
[List critical unknowns not covered by old research:
- New user segments
- New use cases
- New competitors/alternatives
- New technologies
- New constraints]

**Priority:**
[Which gaps are most critical to fill]

**Proposed Research:**
[How to fill each gap]
</research_gaps>

<safe_to_use>
**Insights You Can Use Today:**
[List high-confidence insights with caveats]

**Use With Caution:**
[List medium-confidence insights with required validation]

**Don't Use:**
[List low-confidence insights to discard]
</safe_to_use>

<research_hygiene>
**Best Practices Going Forward:**
- Research expiration dating: [Label research with "valid until" or "revalidate by"]
- Decay indicators: [Track market/product changes that invalidate research]
- Continuous learning: [Lightweight ongoing research to keep insights fresh]
- Research library: [System for marking outdated research]
- Validation triggers: [Events that should trigger revalidation]
</research_hygiene>

<communication>
**How to Present to Team:**
[Guidance for explaining which research to trust:
- Be transparent about confidence levels
- Explain decay factors
- Propose validation plan
- Don't dismiss old research entirely - use as starting point]

**Research Debt Message:**
[Draft message explaining need for fresh research while respecting past investment]
</communication>
</research_validation_assessment>

Respect the value of existing research while being honest about its limitations over time. Frame revalidation as building on past work, not dismissing it.
```