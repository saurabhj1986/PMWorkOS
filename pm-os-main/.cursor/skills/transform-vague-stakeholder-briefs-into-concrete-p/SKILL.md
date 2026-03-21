---
name: transform-vague-stakeholder-briefs-into-concrete-p
description: "Transform vague stakeholder briefs into concrete problem statements. Category: 🤝 Stakeholder Management"
---

# Transform vague stakeholder briefs into concrete problem statements


## Required Inputs

Before proceeding, ensure you have:
- **vague brief**: Request this from the user if not provided
- **current metrics**: Request this from the user if not provided
- **stakeholder context**: Request this from the user if not provided
- **business constraints**: Request this from the user if not provided
- **user research**: Request this from the user if not provided


## Instructions

You are an expert product designer skilled at extracting concrete, actionable problem statements from vague stakeholder requests. Your task is to transform ambiguous design briefs like "make it modern" or "improve the user experience" into well-defined problem statements that guide design decisions and enable measurable outcomes.

You will be provided with the following inputs:

<vague_brief>
{{VAGUE_BRIEF}}
</vague_brief>

<stakeholder_context>
{{STAKEHOLDER_CONTEXT}}
</stakeholder_context>

<business_constraints>
{{BUSINESS_CONSTRAINTS}}
</business_constraints>

<user_research>
{{USER_RESEARCH}}
</user_research>

<current_metrics>
{{CURRENT_METRICS}}
</current_metrics>

Follow these steps to create a concrete problem statement:

1. Decode the vague language:
   - Identify subjective terms ("modern," "better," "simpler," "cleaner," "more intuitive")
   - List all assumptions embedded in the request
   - Note what's implied but not explicitly stated
   - Distinguish between symptoms and root causes
   - Separate personal preferences from business needs
   - Identify emotional drivers behind the request
   - Map vague terms to specific design attributes
   - Determine if this is a real problem or perceived problem
   - Check if the request conflicts with other stated goals
   - Assess whether the stakeholder has solution bias

2. Extract underlying business needs:
   - What business outcome is the stakeholder trying to achieve?
   - What revenue, growth, or efficiency goals drive this request?
   - What competitive pressure or market shift prompted this?
   - What internal KPIs or OKRs connect to this brief?
   - What's the cost of not solving this problem?
   - What strategic initiatives does this support or block?
   - What stakeholder reputation or political concerns exist?
   - What customer feedback or market data supports this?
   - What timeline pressures influence this request?
   - How does this align with product roadmap priorities?

3. Identify user problems beneath the request:
   - What specific user pain points would this address?
   - Which user segments are most affected?
   - What user behaviors indicate this is a real problem?
   - What alternatives or workarounds do users currently employ?
   - How do users describe this problem in their own words?
   - What user journeys or tasks are impacted?
   - What's the frequency and severity of user friction?
   - How does this problem affect different user personas?
   - What emotional impact does this have on users?
   - What would users prioritize if asked directly?

4. Translate vague terms into measurable criteria:
   - "Modern" could mean:
     * Faster load times (< 2 seconds on 3G)
     * Mobile-first responsive design
     * WCAG 2.1 AA accessibility compliance
     * Reduced visual clutter (50% fewer UI elements)
     * Contemporary visual language matching 2024 standards
     * Support for dark mode and system preferences
     * Progressive web app capabilities
     * Micro-interactions and smooth animations
     * Flat or subtle depth design system
     * Updated typography and color palette

   - "Better UX" could mean:
     * Higher conversion rates (baseline → target %)
     * Lower drop-off at specific steps (current % → target %)
     * Improved task completion rates
     * Reduced support tickets for specific flows
     * Higher satisfaction scores (NPS, CSAT, CES)
     * Decreased time-on-task for core workflows
     * Reduced error rates or form validation failures
     * Increased feature discovery and adoption
     * Better accessibility scores (Lighthouse, WAVE)
     * Improved user retention metrics

   - "Simpler" could mean:
     * Fewer steps to complete key tasks (X → Y steps)
     * Reduced cognitive load (measured by eye tracking or task analysis)
     * Clearer visual hierarchy and information architecture
     * Progressive disclosure of complexity
     * Reduced decision points per screen
     * More obvious next actions and CTAs
     * Elimination of redundant UI elements
     * Consolidated related functions
     * Clearer labeling and microcopy
     * Reduced learning curve for new users

   - "Cleaner" could mean:
     * Increased whitespace and breathing room
     * Reduced number of colors in palette
     * More consistent spacing system (8pt grid)
     * Simplified navigation structure
     * Removed deprecated or low-use features
     * Standardized component library usage
     * Eliminated visual noise and distractions
     * Better contrast and readability
     * Consistent iconography and visual language
     * Removed redundant labels or decorative elements

5. Define success criteria and metrics:
   - Primary success metric: [specific, measurable outcome]
   - Secondary metrics: [supporting indicators of success]
   - Leading indicators: [early signals of improvement]
   - Lagging indicators: [long-term impact measures]
   - Baseline measurements: [current state]
   - Target improvements: [specific goals with timeframes]
   - User satisfaction metrics: [NPS, CSAT, survey responses]
   - Behavioral metrics: [usage, adoption, completion rates]
   - Business metrics: [revenue, conversions, retention]
   - Technical metrics: [performance, accessibility scores]
   - Qualitative measures: [user feedback themes, sentiment]
   - Negative metrics to monitor: [potential unintended consequences]
   - Measurement methodology: [how and when to collect data]
   - Statistical significance criteria: [sample size, confidence level]
   - Success timeline: [when to evaluate results]

6. Uncover unstated constraints:
   - Technical constraints:
     * Legacy system dependencies or integrations
     * Performance budgets (load time, bundle size)
     * Browser and device support requirements
     * Existing technical debt that limits options
     * API limitations or third-party dependencies
     * Data migration or backward compatibility needs
     * Security and privacy requirements
     * Infrastructure or hosting limitations
     * Existing codebase architecture
     * Team technical expertise and capacity

   - Timeline constraints:
     * Hard deadlines (launches, events, contracts)
     * Resource availability windows
     * Dependency on other team deliverables
     * Business cycle considerations (fiscal year, seasonality)
     * Competitor activity or market timing
     * Regulatory deadlines or compliance requirements
     * Testing and QA duration requirements
     * Stakeholder availability for reviews
     * Holiday or blackout periods
     * Phased rollout requirements

   - Budget constraints:
     * Development hours available
     * Design resources and tools
     * User research budget
     * Third-party service costs
     * Infrastructure or hosting costs
     * Opportunity cost of other initiatives
     * Maintenance and support costs
     * Training or documentation needs
     * Localization and internationalization costs
     * Accessibility audit and remediation budget

   - Brand and design constraints:
     * Existing design system and component library
     * Brand guidelines and visual identity
     * Accessibility standards and compliance
     * Content tone and voice guidelines
     * Established user mental models
     * Cross-product consistency requirements
     * Legal and regulatory copy requirements
     * Marketing campaign alignment
     * Partner or white-label restrictions
     * Historical design decisions that set precedents

   - Organizational constraints:
     * Stakeholder approval processes
     * Cross-team dependencies and coordination
     * Existing user commitments or promises
     * Internal politics and competing priorities
     * Change management and user communication needs
     * Training requirements for support teams
     * Documentation and knowledge base updates
     * A/B testing and experimentation capacity
     * Localization and translation workflows
     * Data privacy and security review processes

7. Formulate clarifying questions:
   - Generate questions that validate assumptions
   - Questions that reveal hidden requirements
   - Questions that expose conflicts or tradeoffs
   - Questions that establish priority and scope
   - Questions that test solution flexibility
   - Questions that clarify success criteria
   - Questions that uncover political or organizational dynamics
   - Questions that establish decision-making authority
   - Questions that define out-of-scope items
   - Questions that identify risk tolerance

Present your analysis in the following format:

<problem_statement_analysis>
<vague_language_decoded>
**Subjective Terms Identified:**
[List each vague term with its contextual meaning]

**Embedded Assumptions:**
- [Assumption 1]
- [Assumption 2]
- [Assumption 3]

**Implied But Not Stated:**
[What the stakeholder assumes you know or will infer]

**Root Cause vs. Symptom:**
- Stated symptom: [what stakeholder described]
- Likely root cause: [underlying issue driving the symptom]
</vague_language_decoded>

<underlying_business_needs>
**Primary Business Driver:**
[The core business outcome this request aims to achieve]

**Revenue/Growth Connection:**
[How this impacts company financial goals]

**Strategic Alignment:**
[How this connects to broader company strategy or roadmap]

**Competitive Context:**
[Market forces or competitor actions driving this]

**Internal Stakeholder Pressures:**
[Political, reputational, or organizational dynamics]

**Cost of Inaction:**
[What happens if this problem isn't solved]
</underlying_business_needs>

<user_problems_identified>
**Affected User Segments:**
- [Segment 1]: [specific pain points]
- [Segment 2]: [specific pain points]
- [Segment 3]: [specific pain points]

**User-Reported Pain Points:**
[Direct quotes or themes from user research, support tickets, reviews]

**Behavioral Evidence:**
[Observable user behaviors that indicate this problem exists]

**Current Workarounds:**
[How users compensate for this problem today]

**Impact on User Journeys:**
[Specific tasks or flows where users experience friction]

**Severity Assessment:**
- Frequency: [how often users encounter this]
- Impact: [how much it affects user success]
- User priority: [how users would rank fixing this]
</user_problems_identified>

<concrete_criteria>
**Translation of "[VAGUE_TERM_1]":**
- Criterion 1: [specific, measurable attribute]
- Criterion 2: [specific, measurable attribute]
- Criterion 3: [specific, measurable attribute]

**Translation of "[VAGUE_TERM_2]":**
- Criterion 1: [specific, measurable attribute]
- Criterion 2: [specific, measurable attribute]
- Criterion 3: [specific, measurable attribute]

**Observable Design Characteristics:**
[Specific visual, interaction, or structural attributes that would demonstrate the vague term has been achieved]

**User-Facing Improvements:**
[Concrete changes users would notice and value]
</concrete_criteria>

<success_metrics>
**Primary Success Metric:**
- Metric: [specific measurement]
- Current baseline: [X]
- Target: [Y]
- Timeline: [when to measure]
- Collection method: [how to measure]

**Secondary Metrics:**
1. [Metric]: [baseline] → [target] by [date]
2. [Metric]: [baseline] → [target] by [date]
3. [Metric]: [baseline] → [target] by [date]

**Leading Indicators:**
- [Early signal 1]
- [Early signal 2]
- [Early signal 3]

**Qualitative Success Signals:**
- [User feedback theme or sentiment shift]
- [Stakeholder observation or report]
- [Support ticket reduction in specific category]

**Risks to Monitor:**
[Potential negative metrics that could indicate unintended consequences]
</success_metrics>

<constraint_analysis>
<technical_constraints>
- [Constraint 1 with impact on design options]
- [Constraint 2 with impact on design options]
- [Constraint 3 with impact on design options]
</technical_constraints>

<timeline_constraints>
- Hard deadline: [date and reason]
- Resource availability: [when team is available]
- Dependencies: [what must happen first]
</timeline_constraints>

<budget_constraints>
- Development capacity: [hours or sprints available]
- Research budget: [ability to validate with users]
- Third-party costs: [tools or services needed]
</budget_constraints>

<brand_design_constraints>
- Design system: [existing components and patterns to leverage]
- Accessibility: [WCAG level required, existing debt]
- Brand guidelines: [visual identity rules that apply]
</brand_design_constraints>

<organizational_constraints>
- Approval process: [who must sign off, when]
- Cross-team dependencies: [coordination needed]
- Political considerations: [stakeholder dynamics]
</organizational_constraints>
</constraint_analysis>

<refined_problem_statement>
**Problem Statement:**
We need to [specific design action] for [specific user segment] so that [specific user outcome] and [specific business outcome], as measured by [primary metric] improving from [baseline] to [target] by [date], while considering [key constraints].

**In Plain Language:**
[Restate the problem statement in conversational terms that any stakeholder can understand]

**Scope Boundaries:**
- In scope: [what this problem statement includes]
- Out of scope: [what this explicitly does not include]
- Future consideration: [what might be addressed later]
</refined_problem_statement>

<validation_questions>
**Business Outcome Validation:**
1. What would represent a home-run outcome for this initiative in 6 months?
2. If we could only improve one business metric, which would matter most?
3. What would cause you to consider this effort a failure, even if users liked it?

**User Need Validation:**
4. Which user segment would benefit most from solving this problem?
5. How do we know users actually experience this as a problem vs. our assumption?
6. What would users give up or trade off to get this improvement?

**Scope and Priority Validation:**
7. If we had to cut scope by 50%, what's the core of this request we must keep?
8. What's more important: shipping by [date] or achieving [specific outcome]?
9. How does this compare in priority to [other initiative on roadmap]?

**Constraints Validation:**
10. What technical limitations should we absolutely not try to work around?
11. Are there brand or design standards we could flex if it meant better user outcomes?
12. What budget or timeline assumptions should we validate before proceeding?

**Success Criteria Validation:**
13. How will we know if we've succeeded in 3 months? 6 months? 12 months?
14. What user feedback or behavior would make you confident we solved this?
15. What business metrics matter more than hitting the launch date?
</validation_questions>

<recommended_next_steps>
1. **Validate assumptions:** [Specific research or conversations needed to confirm problem understanding]
2. **Baseline metrics:** [Establish current measurements for success criteria]
3. **Exploratory design:** [Create lightweight concepts to test problem framing]
4. **Stakeholder alignment:** [Schedule review of refined problem statement with key stakeholders]
5. **Technical feasibility:** [Partner with engineering to validate constraints and opportunities]
6. **User validation:** [Test problem statement against actual user pain points through interviews or surveys]
7. **Prioritization:** [Compare this problem statement against other roadmap items]
</recommended_next_steps>
</problem_statement_analysis>

**Guidelines for Effective Problem Statements:**

- Focus on outcomes, not solutions: Describe the desired end state, not how to get there
- Be specific enough to guide decisions: Avoid creating another vague statement
- Be flexible enough to allow creativity: Don't over-constrain the solution space
- Ground in evidence: Connect to user research, data, or business metrics
- Make tradeoffs explicit: Acknowledge what you're optimizing for and what you're not
- Establish measurability: Define how you'll know if the problem is solved
- Respect constraints: Work within real-world limitations while challenging assumptions
- Invite iteration: Problem statements should evolve as you learn more

**Common Pitfalls to Avoid:**

- Accepting solution-disguised-as-problem: "We need to add a chatbot" isn't a problem statement
- Confusing preferences with problems: "I don't like the blue" isn't a user problem
- Skipping the "why": Always connect design changes to user or business outcomes
- Over-indexing on one stakeholder: Balance multiple perspectives and needs
- Ignoring data: Don't let the loudest voice override evidence
- False precision: Don't invent metrics just to sound data-driven
- Scope creep: Keep the problem statement focused on the core issue
- Analysis paralysis: Get to a testable hypothesis quickly, refine as you learn

Remember: A well-crafted problem statement is the foundation of effective design work. It aligns stakeholders, guides design decisions, enables measurement of success, and helps teams say no to scope creep. Invest time in getting the problem statement right before jumping to solutions.

## Usage Notes

- Adapt the output format as needed for the specific context
- Ask clarifying questions if required inputs are unclear
