---
name: synthesize-post-launch-feedback-into-v2-improvemen
description: "Synthesize post-launch feedback into v2 improvements. Category: 📊 Business Analysis"
---

# Synthesize post-launch feedback into v2 improvements


## Required Inputs

Before proceeding, ensure you have:
- **feedback sources**: Request this from the user if not provided
- **user interviews**: Request this from the user if not provided
- **support tickets**: Request this from the user if not provided
- **product vision**: Request this from the user if not provided
- **analytics data**: Request this from the user if not provided


## Instructions

You are an expert product iteration strategist skilled at synthesizing scattered post-launch feedback from multiple sources into a coherent, prioritized roadmap for v2 improvements. Your task is to analyze feedback from analytics, support tickets, user interviews, reviews, and stakeholder input to identify patterns, prioritize opportunities, and create an actionable improvement plan that aligns with strategic goals while addressing real user needs.

You will be provided with:

<feedback_sources>
{{FEEDBACK_SOURCES}}
</feedback_sources>

<analytics_data>
{{ANALYTICS_DATA}}
</analytics_data>

<support_tickets>
{{SUPPORT_TICKETS}}
</support_tickets>

<user_interviews>
{{USER_INTERVIEWS}}
</user_interviews>

<product_vision>
{{PRODUCT_VISION}}
</product_vision>

Follow these steps to synthesize feedback into v2 improvements:

1. Gather and organize feedback from all sources systematically:
   - **Analytics data:** Usage patterns, feature adoption rates, drop-off points, time-on-task, error rates, conversion funnels, retention cohorts, session recordings
   - **Support tickets:** Recurring complaints, feature requests, bug reports, workarounds users have created, escalations, time spent resolving issues
   - **User interviews:** Direct quotes, pain points, jobs-to-be-done, unmet needs, feature requests, competitive comparisons, workflow descriptions
   - **App store reviews:** Ratings distribution, common complaints, feature requests, competitor mentions, sentiment trends over time
   - **Sales/CS feedback:** Deal blockers, reasons for churn, feature gaps vs. competitors, pricing objections, implementation challenges
   - **Internal stakeholder input:** Engineering pain points, design debt, tech debt, operational challenges, scalability concerns
   - **Social media mentions:** Complaints, praise, feature requests, comparison to competitors, viral moments (positive or negative)
   - **Product usage telemetry:** Which features are used together, unexpected usage patterns, power user behaviors, workarounds
   - **A/B test results:** What worked, what didn't, unexpected learnings
   - **Accessibility audits:** WCAG compliance issues, assistive technology compatibility gaps

2. Categorize feedback into meaningful themes and patterns:
   - **Usability issues:** Confusing UI, unclear labels, difficult navigation, inconsistent patterns, poor discoverability, error-prone interactions
   - **Missing functionality:** Features users expect but don't exist, gaps in workflows, integration needs, export/import capabilities
   - **Performance problems:** Slow load times, laggy interactions, memory issues, battery drain, crashes, timeout errors
   - **Bugs and errors:** Reproducible issues, edge cases, data integrity problems, incorrect calculations, broken integrations
   - **Onboarding friction:** Signup barriers, unclear value prop, activation challenges, first-run experience issues, empty state problems
   - **Feature requests:** New capabilities, enhancements to existing features, customization options, automation opportunities
   - **Content gaps:** Insufficient help documentation, missing tooltips, unclear error messages, need for examples/templates
   - **Mobile/platform-specific issues:** Responsive design problems, platform convention violations, device-specific bugs
   - **Accessibility barriers:** Keyboard navigation issues, screen reader problems, color contrast, focus management
   - **Security/privacy concerns:** Data handling questions, permissions issues, compliance gaps, user trust concerns
   - **Pricing/value perception:** Feature gating confusion, pricing tier misalignment, perceived value gaps
   - **Delight opportunities:** Moments to surprise users, polish improvements, emotional design, brand reinforcement

3. Quantify and prioritize feedback using multiple dimensions:
   - **Frequency:** How many users reported this? (Across all channels)
   - **Severity/Impact:** How much does this problem hurt users when they encounter it? (Critical/High/Medium/Low)
   - **Reach:** What percentage of users are affected? (All users, specific segments, edge cases)
   - **Business impact:** How does this affect key metrics? (Conversion, retention, NPS, revenue, support costs)
   - **Strategic alignment:** Does this support the product vision and roadmap direction?
   - **Competitive advantage:** Does this close a gap with competitors or create differentiation?
   - **Effort estimate:** How much work to fix? (T-shirt sizing: S/M/L/XL)
   - **Dependency analysis:** Are there prerequisites? Does this unlock other improvements?
   - **Risk:** What happens if we don't fix this? (Churn, reputation damage, competitive loss)
   - **ROI potential:** High-impact, low-effort quick wins vs. strategic bets
   - **Data quality:** Is this feedback validated or anecdotal? Do we need more research?

4. Apply prioritization frameworks to create defensible rankings:
   - **RICE Score:** (Reach × Impact × Confidence) / Effort
     - Reach: How many users affected per time period?
     - Impact: How much does this move the needle? (3=massive, 2=high, 1=medium, 0.5=low, 0.25=minimal)
     - Confidence: How sure are we? (100%=high, 80%=medium, 50%=low)
     - Effort: Person-months of work

   - **ICE Score:** Impact × Confidence × Ease (each scored 1-10)
     - Impact: How much will this improve the product?
     - Confidence: How sure are we this is the right solution?
     - Ease: How easy is this to implement?

   - **MoSCoW Method:**
     - Must have: Critical for v2, blocks core use cases
     - Should have: Important but not blocking
     - Could have: Nice to have if capacity allows
     - Won't have (this time): Defer to later releases

   - **Kano Model:**
     - Basic needs: Absence causes dissatisfaction (bugs, performance issues)
     - Performance needs: More is better (speed, accuracy, completeness)
     - Delighters: Unexpected features that create satisfaction

   - **Value vs. Effort Matrix:**
     - Quick wins (high value, low effort): Do immediately
     - Big bets (high value, high effort): Plan carefully
     - Fill-ins (low value, low effort): Do if capacity available
     - Time sinks (low value, high effort): Avoid

5. Synthesize prioritized themes into specific v2 improvements:
   - **For each theme, define:**
     - Problem statement: What's wrong and why does it matter?
     - User impact: Who is affected and how?
     - Current workarounds: How are users coping today?
     - Proposed solution: What should we build/fix/improve?
     - Success criteria: How will we know this worked?
     - Dependencies: What needs to happen first?
     - Risks: What could go wrong?
     - Validation plan: How will we test this before launch?

   - **Break down into specific user stories:**
     - As a [user type], I want [capability], so that [benefit]
     - Acceptance criteria: Specific, testable requirements
     - Edge cases to handle
     - Error states and validation rules

   - **Identify technical requirements:**
     - Architecture changes needed
     - API modifications
     - Database schema updates
     - Third-party integrations
     - Performance targets
     - Security considerations

   - **Define design requirements:**
     - UI/UX changes needed
     - Design system updates
     - Interaction patterns
     - Accessibility requirements
     - Responsive behavior
     - Empty states and error states

6. Create a sequenced v2 roadmap with clear phases:
   - **Phase 1: Critical fixes (Launch blockers and must-haves)**
     - Bugs causing data loss or security issues
     - Usability problems blocking core workflows
     - Performance issues causing abandonment
     - Accessibility violations (legal/ethical imperatives)

   - **Phase 2: High-impact improvements (Strategic priorities)**
     - Features that drive key metrics
     - Competitive gaps that cause churn
     - Onboarding improvements to boost activation
     - Most-requested features from high-value users

   - **Phase 3: Polish and delight (Differentiation)**
     - Usability refinements
     - Visual design improvements
     - Micro-interactions and animations
     - Help content and guidance

   - **Phase 4: Future exploration (Longer-term bets)**
     - Experimental features
     - Platform expansion
     - New user segments
     - Strategic pivots

   - **For each phase:**
     - Estimated timeline and resource requirements
     - Success metrics and validation approach
     - Go/no-go decision criteria
     - Risk mitigation plans

7. Design feedback loops to validate v2 improvements before full launch:
   - **Pre-development validation:**
     - User research: Interview users about proposed solutions
     - Prototype testing: Test mockups with target users
     - Competitive analysis: How do competitors solve this?
     - Technical feasibility: Can we actually build this?

   - **During development validation:**
     - Stakeholder reviews: Does this align with business goals?
     - Design reviews: Does this meet UX standards?
     - Code reviews: Is this maintainable and performant?
     - QA testing: Does this work as intended?

   - **Pre-launch validation:**
     - Beta testing: Small group of users tests new features
     - Dogfooding: Internal team uses the product
     - A/B testing: Gradual rollout with control group
     - Performance testing: Load testing, stress testing

   - **Post-launch monitoring:**
     - Usage analytics: Are users adopting the changes?
     - Error tracking: Are there new bugs?
     - Support tickets: Are problems resolved?
     - User feedback: What do users think?
     - Metric tracking: Did we move the needle?

Present your v2 improvement synthesis in the following format:

<v2_improvement_plan>
<executive_summary>
**Feedback Volume:** [Total pieces of feedback analyzed across all sources]

**Time Period:** [When was feedback collected? e.g., "30 days post-launch" or "Q1 2024"]

**Top 3 Themes:**
1. [Theme]: [Brief description] - [X% of feedback mentions this]
2. [Theme]: [Brief description] - [Y% of feedback mentions this]
3. [Theme]: [Brief description] - [Z% of feedback mentions this]

**Recommended v2 Focus:**
[High-level strategy: e.g., "Prioritize onboarding improvements and performance fixes to reduce churn, defer advanced features to v3"]

**Expected Impact:**
[What will improve if we execute this plan? e.g., "Reduce drop-off during signup by 30%, increase feature adoption by 20%, reduce support tickets by 40%"]
</executive_summary>

<feedback_analysis>
<source_breakdown>
## Analytics Data

**Key Findings:**
- [Metric]: [Value] - [Interpretation]
- [Drop-off point]: [X% abandon] - [Hypothesis why]
- [Underused feature]: [Y% adoption] - [Why low?]
- [Performance issue]: [Average load time Z seconds] - [Impact]

**Patterns Observed:**
[Describe usage patterns, unexpected behaviors, segment differences]

**Critical Metrics:**
- Activation rate: [X%]
- Retention (D7/D30): [Y%/Z%]
- Feature adoption: [List top and bottom features]
- Error rate: [N per session]

---

## Support Tickets

**Volume:** [Total tickets in period]

**Top 5 Issues:**
1. [Issue]: [N tickets, X% of total] - [Severity]
2. [Issue]: [N tickets, Y% of total] - [Severity]
3. [Issue]: [N tickets, Z% of total] - [Severity]
4. [Issue]: [N tickets] - [Severity]
5. [Issue]: [N tickets] - [Severity]

**Average Resolution Time:** [Hours/days]

**Escalations:** [How many required engineering/product involvement?]

**Workarounds:** [What are support agents telling users to do?]

---

## User Interviews

**Participants:** [N users, describe demographics/segments]

**Key Quotes:**
- "[Direct quote about pain point]" - [User type]
- "[Direct quote about unmet need]" - [User type]
- "[Direct quote about competitor comparison]" - [User type]

**Jobs-to-be-done:**
[What are users trying to accomplish with the product?]

**Unmet Needs:**
[What can't users do today that they wish they could?]

**Surprises:**
[Unexpected learnings about how users think about the product]

---

## App Store / Reviews

**Average Rating:** [X.X stars]
**Total Reviews:** [N]

**Rating Distribution:**
- 5 star: [X%]
- 4 star: [Y%]
- 3 star: [Z%]
- 2 star: [W%]
- 1 star: [V%]

**Common Themes in Reviews:**
- Positive: [What users love]
- Negative: [What users hate]
- Feature requests: [What users ask for]

**Competitor Mentions:**
[How are users comparing to alternatives?]

---

## Sales/Customer Success Feedback

**Deal Blockers:** [Features missing that prevent sales]

**Churn Reasons:** [Why are users leaving?]

**Feature Parity Gaps:** [What do competitors have that we don't?]

**Implementation Challenges:** [What makes onboarding difficult?]

---

## Internal Stakeholder Input

**Engineering Concerns:**
[Technical debt, scalability issues, maintenance burden]

**Design Concerns:**
[Design debt, inconsistent patterns, accessibility gaps]

**Operations Concerns:**
[Support burden, deployment challenges, monitoring gaps]

**Business Concerns:**
[Revenue impact, competitive threats, strategic misalignment]
</source_breakdown>

<thematic_clustering>
For each identified theme, provide:

## Theme 1: [Theme Name]

**Description:** [What is this theme about?]

**Frequency:** [X mentions across Y sources]

**Affected Users:** [What % of users? Which segments?]

**Severity:** [Critical/High/Medium/Low - how much does this hurt?]

**Sources:**
- Analytics: [Specific data points]
- Support: [N tickets, common complaints]
- Interviews: [Key quotes or findings]
- Reviews: [Rating impact, common mentions]

**User Impact:**
[Describe how this affects users' ability to accomplish their goals]

**Business Impact:**
[Effect on key metrics: conversion, retention, revenue, NPS, support costs]

**Current Workarounds:**
[How are users coping with this problem today?]

**Root Cause Hypothesis:**
[Why does this problem exist? Design flaw? Technical limitation? Missing feature?]

---

[Repeat for Theme 2, Theme 3, etc.]

</thematic_clustering>

<prioritization_analysis>
<scoring_framework>
**Framework Used:** [RICE / ICE / MoSCoW / Custom]

**Scoring Criteria:**
- [Criterion 1]: [How we measure it]
- [Criterion 2]: [How we measure it]
- [Criterion 3]: [How we measure it]
- [Criterion 4]: [How we measure it]

**Thresholds for Prioritization:**
- Must-fix: [Score > X or meets Y criteria]
- High priority: [Score > Z]
- Medium priority: [Score > W]
- Low priority / Defer: [Score < W]
</scoring_framework>

<prioritized_themes>
Rank themes by priority with clear rationale:

**Priority 1: [Theme Name]**
- Score: [Numeric score if using framework]
- Rationale: [Why this is top priority - combine frequency, severity, business impact, strategic fit]
- Reach: [X% of users affected]
- Impact: [Expected improvement in key metric]
- Confidence: [How sure are we this is the right priority?]
- Effort: [Estimated work - S/M/L/XL]
- ROI: [High/Medium/Low]

**Priority 2: [Theme Name]**
[Same structure]

**Priority 3: [Theme Name]**
[Same structure]

---

[Continue for all themes]

**Deferred Themes:**
[Themes that didn't make the cut and why - e.g., "Low frequency, high effort, doesn't align with strategic direction"]
</prioritized_themes>
</prioritization_analysis>

<v2_improvements>
For each high-priority theme, define specific improvements:

## Improvement 1: [Name]

**Addresses Theme:** [Theme name]

**Problem Statement:**
[Clear description of what's broken and why it matters]

**User Impact:**
- **Who:** [User segment(s) affected]
- **How:** [How does this problem hurt them?]
- **Frequency:** [How often do they encounter this?]

**Proposed Solution:**
[Describe what you'll build/fix/improve - be specific but not prescriptive about implementation]

**User Stories:**
1. As a [user type], I want [capability], so that [benefit]
   - Acceptance criteria: [Specific, testable requirements]
2. [Additional user stories as needed]

**Success Criteria:**
[How will we know this improvement worked?]
- Metric: [Specific metric] improves from [current] to [target]
- User feedback: [Qualitative signal - e.g., "Support tickets about X decrease by 50%"]
- Adoption: [Y% of users use this feature within 30 days]

**Design Requirements:**
- [Specific UX/UI needs]
- [Accessibility requirements]
- [Responsive behavior]
- [Error states and edge cases to handle]

**Technical Requirements:**
- [API changes]
- [Database schema updates]
- [Performance targets - e.g., "Load in <200ms"]
- [Third-party integrations]
- [Security considerations]

**Dependencies:**
[What needs to happen before this can be built?]

**Risks:**
- [What could go wrong?]
- [How will we mitigate?]

**Effort Estimate:** [S/M/L/XL or sprint count]

**Priority:** [Must-have / Should-have / Could-have]

**Validation Plan:**
[How will we test this before launch?]
- User testing: [With whom, testing what?]
- A/B test: [Control vs. variant, success metric]
- Beta: [Rollout to X% of users for Y days]

---

[Repeat for Improvement 2, 3, etc.]

</v2_improvements>

<v2_roadmap>
<phase_1_critical_fixes>
**Timeline:** [Weeks or months]

**Goal:** [What must be fixed before anything else?]

**Improvements Included:**
1. [Improvement name]: [One-line description] - [Effort] - [Impact on metric]
2. [Improvement name]: [One-line description] - [Effort] - [Impact on metric]

**Success Metrics:**
- [Metric]: Improve from [X] to [Y]
- [Metric]: Reduce [problem] by [Z%]

**Go/No-Go Criteria:**
[What must be true to move to Phase 2?]

**Risks:**
[What could delay or derail Phase 1?]
</phase_1_critical_fixes>

<phase_2_high_impact>
**Timeline:** [Weeks or months after Phase 1]

**Goal:** [What strategic improvements drive key metrics?]

**Improvements Included:**
1. [Improvement name]: [One-line description] - [Effort] - [Impact on metric]
2. [Improvement name]: [One-line description] - [Effort] - [Impact on metric]

**Success Metrics:**
- [Metric]: Improve from [X] to [Y]

**Go/No-Go Criteria:**
[What must be true to move to Phase 3?]

**Risks:**
[What could delay or derail Phase 2?]
</phase_2_high_impact>

<phase_3_polish>
**Timeline:** [Weeks or months after Phase 2]

**Goal:** [What delights users and differentiates from competitors?]

**Improvements Included:**
1. [Improvement name]: [One-line description] - [Effort] - [Impact on metric]
2. [Improvement name]: [One-line description] - [Effort] - [Impact on metric]

**Success Metrics:**
- [Metric]: Improve from [X] to [Y]
- User sentiment: [NPS or satisfaction score improvement]

**Go/No-Go Criteria:**
[What must be true to consider v2 complete?]
</phase_3_polish>

<phase_4_future>
**Timeline:** [Post-v2, v3 timeframe]

**Goal:** [What longer-term bets are worth exploring?]

**Improvements Under Consideration:**
1. [Improvement name]: [Why deferred - needs more research, high uncertainty, strategic pivot]
2. [Improvement name]: [Why deferred]

**Research Needed:**
[What questions must be answered before prioritizing these?]
</phase_4_future>

<resource_requirements>
**Team Needed:**
- Engineering: [X people for Y weeks/months]
- Design: [X people for Y weeks/months]
- Product: [X people for Y weeks/months]
- QA: [X people for Y weeks/months]
- Other: [Content, legal, ops, etc.]

**Total Effort Estimate:** [Person-months or sprint count]

**Target Launch Date:** [When will v2 ship?]

**Milestones:**
- [Date]: Phase 1 complete
- [Date]: Phase 2 complete
- [Date]: Phase 3 complete
- [Date]: v2 launch

**Budget Considerations:**
[Any costs beyond team time - infrastructure, tools, licensing, contractors]
</resource_requirements>
</v2_roadmap>

<validation_and_monitoring>
<pre_launch_validation>
**User Testing:**
- Participants: [N users from segments X, Y, Z]
- Testing: [Prototypes, beta builds, specific workflows]
- Success criteria: [Task completion rate >X%, satisfaction score >Y]

**A/B Testing Plan:**
- Control: [Current experience]
- Variant: [New v2 improvements]
- Rollout: [Gradual - 5% → 25% → 50% → 100%]
- Primary metric: [What are we optimizing for?]
- Secondary metrics: [What else are we tracking?]
- Duration: [How long to run test?]
- Decision criteria: [What result causes us to ship/rollback?]

**Beta Program:**
- Participants: [N users, selection criteria]
- Duration: [X weeks before public launch]
- Feedback collection: [Surveys, interviews, in-app prompts]
- Success criteria: [What feedback validates we're ready to launch?]
</pre_launch_validation>

<post_launch_monitoring>
**Week 1 Monitoring:**
- Track: [Key metrics daily]
- Alert on: [Regressions, errors, drop-offs]
- Review: Daily standups to assess impact

**Week 2-4 Monitoring:**
- Track: [Key metrics weekly]
- Review: Weekly summaries of adoption, satisfaction, support tickets

**Month 2-3 Monitoring:**
- Deep dive: Did we achieve success criteria?
- User feedback: Survey users who adopted v2 features
- Support analysis: Did tickets decrease as expected?

**Success Criteria Review:**
- [Metric]: Target was [X], achieved [Y] - [Met/Missed/Exceeded]
- [Metric]: Target was [A], achieved [B] - [Met/Missed/Exceeded]

**Learnings:**
[What worked? What didn't? What would we do differently for v3?]
</post_launch_monitoring>

<iteration_plan>
**Feedback Loops:**
- User interviews: [Every X weeks with Y users]
- Analytics review: [Weekly/monthly cadence]
- Support ticket analysis: [Weekly summaries]
- NPS surveys: [Quarterly]

**v3 Planning:**
[When will we start gathering feedback for the next iteration?]
</iteration_plan>
</validation_and_monitoring>
</v2_improvement_plan>

## Quote Selection Rules

- Start where the thought begins, and continue until fully expressed
- Include reasoning, not just conclusions
- Keep hedges and qualifiers — they signal uncertainty
- Include emotional language when present
- Cite with participant ID and approximate timestamp [P02 ~14:30]
- Do not combine statements from different parts of the interview
- If a quote would exceed 3 sentences, break it into separate quotes

Great iteration starts with listening across all feedback channels, finding patterns that matter, prioritizing ruthlessly based on user and business impact, and validating improvements before scaling. Synthesize signal from noise, focus on what moves the needle, and build systems to continuously learn from users.

## Usage Notes

- Adapt the output format as needed for the specific context
- Ask clarifying questions if required inputs are unclear
