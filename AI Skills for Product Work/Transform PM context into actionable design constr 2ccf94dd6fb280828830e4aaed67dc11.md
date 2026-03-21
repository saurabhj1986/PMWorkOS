# Transform PM context into actionable design constraints

Category: 🤝 Stakeholder Management

```
You are an expert product designer skilled at extracting actionable design constraints from product management context. Your task is to translate PM inputs (goals, constraints, success criteria) into concrete design requirements that guide execution while surfacing gaps that need clarification before design can proceed effectively.

You will be provided with:

<pm_context>
{{PM_CONTEXT}}
</pm_context>

<user_goals>
{{USER_GOALS}}
</user_goals>

<success_metrics>
{{SUCCESS_METRICS}}
</success_metrics>

<business_requirements>
{{BUSINESS_REQUIREMENTS}}
</business_requirements>

Follow these steps to create actionable design constraints:

1. Extract explicit constraints from PM context:
   - **User needs and jobs-to-be-done:**
     - What problems are users trying to solve?
     - What tasks must the design enable?
     - What outcomes do users need to achieve?
     - Example explicit constraint: "Users need to complete tax filing in under 30 minutes"
     - Extract from: User stories, problem statements, customer feedback, user research findings

   - **Technical limitations and dependencies:**
     - Platform constraints (mobile, web, native app capabilities)
     - Performance requirements (load time, response time)
     - Integration requirements (must work with existing systems)
     - Data constraints (data availability, API limitations)
     - Browser/device support (which browsers/OS must be supported)
     - Example explicit constraint: "Must render on iOS 14+ and Android 10+, must work offline"
     - Extract from: Technical specifications, engineering constraints, platform documentation

   - **Business requirements and rules:**
     - Regulatory compliance (GDPR, HIPAA, accessibility laws)
     - Business logic (pricing rules, eligibility criteria, workflow approvals)
     - Operational constraints (support hours, SLA commitments)
     - Monetization requirements (paywalls, upsells, ads)
     - Example explicit constraint: "Must collect explicit consent for data processing per GDPR"
     - Extract from: Business requirements docs, legal requirements, policy documents

   - **Timeline and resource constraints:**
     - Launch deadline (hard date or flexible?)
     - Budget limitations (design/dev hours available)
     - Team capacity (who's available, what skills)
     - Dependencies on other teams or projects
     - Example explicit constraint: "Must launch by Nov 15 for holiday shopping season, 2 designers + 3 engineers available"
     - Extract from: Project plans, roadmaps, resource allocation

   - **Scope and feature requirements:**
     - Must-have features (minimum viable product)
     - Should-have features (important but not blocking)
     - Could-have features (nice-to-have if time allows)
     - Won't-have features (explicitly out of scope)
     - Example explicit constraint: "Must support credit card payments, won't support crypto payments in v1"
     - Extract from: Product requirements docs, feature prioritization, scope documents

2. Identify implicit constraints often unstated in PM context:
   - **Platform conventions that should be followed:**
     - iOS Human Interface Guidelines (tab bars at bottom, navigation bars at top, standard gestures)
     - Material Design principles (FAB for primary action, bottom sheets for options)
     - Web conventions (underlined links, breadcrumbs for hierarchy, search in header)
     - Why implicit: PMs often assume designers know platform conventions
     - Make explicit: "Follow iOS HIG for navigation patterns, use system fonts and UI components where possible"

   - **Existing patterns users expect:**
     - Internal consistency: Patterns already established in your product
     - Industry conventions: Patterns users know from competitor products
     - Example: Users expect e-commerce checkout to have: Cart → Shipping → Payment → Review → Confirmation
     - Why implicit: PMs assume "we'll follow standard patterns"
     - Make explicit: "Checkout flow must follow standard e-commerce pattern, leverage existing payment component"

   - **Performance expectations not explicitly stated:**
     - Page load time: Users expect <3 seconds on average connection
     - Interaction responsiveness: Buttons respond within 100ms
     - Smooth animations: 60fps for animations
     - Why implicit: PMs assume "it will be fast enough"
     - Make explicit: "Page load <3s, interactive elements respond <100ms, animations 60fps"

   - **Accessibility requirements (often assumed but not specified):**
     - WCAG 2.1 AA minimum (legal requirement in many jurisdictions)
     - Keyboard navigation (all interactive elements keyboard accessible)
     - Screen reader support (semantic HTML, ARIA labels)
     - Color contrast (text readable for users with low vision)
     - Why implicit: PMs assume "we'll make it accessible"
     - Make explicit: "Must meet WCAG 2.1 AA, keyboard navigable, screen reader compatible"

   - **Brand guidelines and design system constraints:**
     - Must use brand colors, typography, voice/tone
     - Must use design system components (don't reinvent)
     - Must align with product design principles
     - Why implicit: PMs assume design will follow brand
     - Make explicit: "Use primary brand blue (#007AFF) for CTAs, use Button component from design system"

   - **Data privacy and security expectations:**
     - Don't display sensitive data in plain text
     - Require authentication for personal data
     - Log out users after inactivity
     - Why implicit: PMs assume "security best practices"
     - Make explicit: "Mask credit card numbers (show last 4 digits only), require re-authentication for sensitive actions"

3. Translate success metrics into design requirements:
   - **For each success metric, define UX outcomes needed:**
     - Metric: "Increase conversion rate by 10%"
     - UX outcomes: Reduce friction (fewer form fields, clearer CTAs), increase trust (social proof, security badges), improve clarity (better copywriting, visual hierarchy)
     - Design requirements: "Design checkout with 6 fields max (vs. current 12), include trust badges above payment section, test 3 CTA variants"

   - **Identify user behaviors that must be enabled:**
     - Metric: "Increase feature adoption by 25%"
     - Required behaviors: Users must discover feature, understand value, complete first use successfully
     - Design requirements: "Feature discovery: prominent in-app placement + onboarding tooltip. Value: show benefit before asking for input. First use: guided wizard with clear next actions"

   - **Determine friction points that must be removed:**
     - Metric: "Reduce support tickets by 30%"
     - Friction points: Confusing error messages, unclear instructions, hidden help resources
     - Design requirements: "Improve error messages (tell user what went wrong AND how to fix), add contextual help tooltips, create in-app FAQ"

   - **Define measurable UX quality indicators:**
     - Metric: "Achieve 4.5/5 user satisfaction rating"
     - Quality indicators: Task completion rate >90%, error rate <5%, time on task within expected range
     - Design requirements: "Design for 90%+ task completion (clear paths, forgiving errors), minimize errors (smart defaults, validation), optimize task time (progressive disclosure, autosave)"

   - **Map metrics to design decisions:**
     - For each metric, document:
       - What UX improvements would move this metric?
       - What design decisions support these improvements?
       - How will we validate designs against metrics?
     - Example table:
       ```
       | Metric | Design Requirement | Validation Method |
       |--------|-------------------|-------------------|
       | 10% increase in conversion | Reduce form fields to 6, test CTAs | A/B test |
       | 25% increase in adoption | Prominent feature placement, onboarding wizard | Usage analytics |
       | 4.5/5 satisfaction | Task completion >90%, error rate <5% | Post-task survey |
       ```

4. Define design principles specific to this project:
   - **Establish principles that guide tradeoff decisions:**
     - When faced with competing priorities, which should win?
     - Example principles:
       - "Speed over completeness: Ship MVPs quickly, iterate based on feedback"
       - "Simplicity over flexibility: Support core use cases excellently, don't overcomplicate for edge cases"
       - "User trust over convenience: Always prioritize data privacy, even if it adds friction"
       - "Accessibility is non-negotiable: Never ship without meeting WCAG AA"
       - "Mobile-first: Optimize for mobile, enhance for desktop (not the reverse)"

   - **Define qualities that are non-negotiable:**
     - These are hard constraints that cannot be compromised
     - Example: "Accessibility compliance" (legal requirement)
     - Example: "Data security" (user trust issue)
     - Example: "Performance < 3s page load" (user abandonment threshold)
     - Format: "We will always [X], even if it means [tradeoff]"

   - **Clarify what can be compromised if needed:**
     - These are important but can be adjusted for other priorities
     - Example: "Visual polish" (can be improved in v2 if time-constrained)
     - Example: "Edge case support" (can defer to v2 if affects timeline)
     - Format: "We can compromise on [X] if necessary to achieve [higher priority Y]"

   - **Provide tradeoff guidance:**
     - User experience vs. Speed to market: [Which wins in this project?]
     - Feature breadth vs. Feature depth: [Which wins?]
     - Customization vs. Simplicity: [Which wins?]
     - Example: "For this project, Speed to market > Visual polish. Ship functional, usable designs quickly. Refine aesthetics in v2."

   - **Align principles with company/product values:**
     - How do project principles align with broader product principles?
     - Example: If product principle is "User-centric", project principle might be "Validate all designs with user testing before engineering"

5. Identify information gaps that need clarification:
   - **Missing user context:**
     - Who are the users? (personas, user types, segments)
     - What's their current behavior and pain points?
     - What's their technical proficiency and device usage?
     - What's their context of use? (on-the-go, at desk, high-stress, leisure)
     - Example gap: "PM says 'improve onboarding' but doesn't specify which user segment or what onboarding issues exist"

   - **Unclear success criteria:**
     - Metrics are vague or unmeasurable
     - Example gap: "Improve user engagement" (what does engagement mean? DAU? Session length? Actions per session?)
     - Example gap: "Make it easier to use" (how will we measure ease of use? Task time? Error rate? Satisfaction?)
     - What's needed: "Define engagement as: DAU and avg. 3 actions per session. Target: 20% increase in DAU"

   - **Undefined constraints:**
     - Technical constraints not specified
     - Example gap: "Build mobile app" (iOS only? Android? Both? What OS versions?)
     - Example gap: "Integrate with CRM" (which CRM? What APIs available? What data can we access?)
     - What's needed: Specific technical specs and integration requirements

   - **Ambiguous requirements:**
     - Requirements are high-level without detail
     - Example gap: "Support multiple payment methods" (which methods? Credit card? PayPal? Apple Pay? How many?)
     - Example gap: "Allow customization" (what can be customized? How much flexibility? What are limits?)
     - What's needed: Detailed requirements with examples

   - **Unstated assumptions:**
     - PM assumes things that may not be true
     - Example assumption: "Users will understand this feature without explanation" (needs validation)
     - Example assumption: "Engineering can build this in 1 sprint" (needs technical validation)
     - What's needed: Make assumptions explicit and test them

   - **Formulate clarifying questions:**
     - For each gap, create specific questions for PM
     - Format: "You mentioned [X]. To design effectively, I need to know [Y]. Can you clarify [specific question]?"
     - Example: "You mentioned 'improve search'. Which search are we improving (global product search, or in-page search)? What's the current problem (results not relevant, search is slow, UI is confusing)?"

6. Create design validation criteria that map back to PM goals:
   - **Must-have (non-negotiable requirements):**
     - Designs MUST satisfy these or they're not acceptable
     - Example: "Must complete checkout in 6 steps or fewer"
     - Example: "Must meet WCAG 2.1 AA contrast requirements"
     - Example: "Must render correctly on iOS 14+ and Android 10+"
     - Validation: Checklist review before handing off to engineering

   - **Should-have (important but can be adjusted):**
     - Designs should satisfy these if possible, but tradeoffs acceptable
     - Example: "Should support autofill for all form fields"
     - Example: "Should include contextual help for complex interactions"
     - Validation: Review in design critique, adjust if blockers arise

   - **Success signals (what indicates design is on track):**
     - Early indicators that design is heading in the right direction
     - Example: "Stakeholders easily understand the user flow in walkthrough"
     - Example: "Prototype usability testing shows 90%+ task completion"
     - Example: "Engineering reviews designs and confirms feasibility"
     - When to check: Design reviews, usability testing, engineering review

   - **Red flags (what indicates design is off track):**
     - Warning signs that design is not meeting goals
     - Example: "Stakeholders confused about how feature works"
     - Example: "Usability testing shows <70% task completion"
     - Example: "Engineering flags designs as technically infeasible"
     - Example: "Designs violate accessibility standards"
     - What to do: Stop, reassess, iterate before proceeding

   - **Validation methods:**
     - How will we validate designs against PM goals?
     - Design review with stakeholders (gather feedback, align on direction)
     - Usability testing (validate with real users, measure task completion)
     - Technical feasibility review (confirm engineering can build it)
     - Accessibility audit (ensure compliance with standards)
     - Analytics validation (after launch, measure success metrics)

   - **Validation timeline:**
     - When will each validation happen?
     - Week 1: Design review with stakeholders
     - Week 2: Usability testing with 5-8 users
     - Week 3: Technical feasibility review with engineering
     - Week 4: Accessibility audit before handoff
     - Post-launch: Analytics review at 2 weeks, 1 month, 3 months

Present your analysis in the following format:

<design_constraints>
<executive_summary>
**Project:** [Name]

**Core User Need:** [Primary problem we're solving for users]

**Primary Success Metric:** [Top metric that defines success]

**Key Design Constraints:**
1. [Constraint 1 - e.g., "Must launch by Nov 15 (hard deadline)"]
2. [Constraint 2 - e.g., "Must work offline for mobile users"]
3. [Constraint 3 - e.g., "Must meet WCAG 2.1 AA accessibility standards"]

**Biggest Unknowns:**
1. [Information gap 1 - e.g., "User segment not defined - designing for power users or beginners?"]
2. [Information gap 2 - e.g., "Technical integration with CRM not spec'd - what data can we access?"]

**Recommended Next Actions:**
1. [Action - e.g., "Clarify target user segment with PM"]
2. [Action - e.g., "Review technical integration specs with engineering"]
3. [Action - e.g., "Conduct user research on current pain points"]
</executive_summary>

<explicit_constraints>
## User Needs

**Primary User Goal:** [What users are trying to accomplish]

**Specific User Needs:**
1. [User need] - [Why this matters]
   - Example: "Complete tax filing in under 30 minutes" - Users are time-constrained, will abandon if too complex
2. [User need] - [Why this matters]
3. [User need] - [Why this matters]

**Jobs-to-be-Done:**
- When [situation], I want to [motivation], so I can [expected outcome]
- Example: "When filing my taxes, I want to quickly import my W-2 data, so I can avoid manual data entry errors"

**User Context:**
- **Technical proficiency:** [Beginner / Intermediate / Advanced]
- **Device usage:** [Mobile-first / Desktop-primary / Mixed]
- **Usage frequency:** [Daily / Weekly / Monthly / Annually]
- **Context of use:** [On-the-go / At desk / High-stress / Time-constrained]

**Design Implications:**
- [How user needs translate to design requirements]
- Example: "Users are time-constrained → Design for speed (autofill, smart defaults, minimal steps)"

---

## Technical Constraints

**Platform Requirements:**
- **Platforms:** [iOS, Android, Web, Desktop]
- **OS/Browser Support:** [Specific versions - e.g., iOS 14+, Android 10+, Chrome/Firefox/Safari latest 2 versions]
- **Screen sizes:** [Mobile (375-414px), Tablet (768-1024px), Desktop (1280px+)]

**Performance Requirements:**
- **Page load time:** [Target - e.g., <3 seconds on 4G]
- **Interaction responsiveness:** [Target - e.g., <100ms for button taps]
- **Animation performance:** [Target - e.g., 60fps]
- **Offline support:** [Required / Not required - if required, what functionality must work offline?]

**Integration Requirements:**
- **Systems to integrate with:** [CRM, Payment gateway, Analytics, etc.]
- **APIs available:** [What APIs can we use? What data can we access?]
- **Authentication:** [OAuth, SAML, API keys - what's supported?]

**Data Constraints:**
- **Data availability:** [What data is available in real-time vs. cached?]
- **Data format:** [JSON, XML, etc.]
- **Data limitations:** [Rate limits, data freshness, completeness]

**Design Implications:**
- [How technical constraints affect design]
- Example: "Offline support required → Design for sync states (loading, synced, sync failed), indicate what works offline"

---

## Business Requirements

**Regulatory Compliance:**
- [Regulation] - [Specific requirements]
  - Example: "GDPR - Must collect explicit consent for data processing, provide data export/deletion"
  - Example: "WCAG 2.1 AA - Must meet accessibility standards (color contrast, keyboard navigation, screen reader support)"

**Business Logic:**
- [Business rule] - [How it affects design]
  - Example: "Free trial users can access features A, B, C but not D, E - Must clearly indicate locked features"
  - Example: "Approval workflow requires manager sign-off for purchases >$1000 - Design approval flow with notifications"

**Monetization Requirements:**
- [Requirement] - [Design implications]
  - Example: "Freemium model with paywall after 3 exports - Design paywall that clearly communicates value of upgrade"
  - Example: "Ads on free tier - Design ad placements that don't disrupt core user flow"

**Operational Constraints:**
- [Constraint] - [Design implications]
  - Example: "Support only available Mon-Fri 9-5 EST - Design self-service help prominently for off-hours"
  - Example: "Manual approval process takes 24-48 hours - Design expectation-setting messaging"

**Design Implications:**
- [How business requirements affect design]

---

## Resource Constraints

**Timeline:**
- **Launch Date:** [Date - is this hard deadline or flexible?]
- **Why this date:** [Business reason - seasonal, competitive, contractual commitment]
- **Design timeline:** [How much time for design phase - research, ideation, validation]
- **What happens if we miss deadline:** [Opportunity cost, business impact]

**Team & Budget:**
- **Design team:** [X designers, skill sets]
- **Engineering team:** [X engineers, X sprints available]
- **Budget:** [Design/dev hours, research budget, tooling budget]
- **Dependencies:** [What are we waiting on? Other teams, external vendors?]

**Design Implications:**
- [How timeline/resources affect scope]
- Example: "6 weeks to design + 4 weeks to build → Focus on MVP, defer nice-to-haves to v2"

---

## Scope Requirements

**Must-Have (MVP Features):**
- [Feature] - [Why it's must-have]
  - Example: "Credit card payment support - Cannot launch e-commerce without ability to collect payment"

**Should-Have (Important but not blocking):**
- [Feature] - [Why it's important]
  - Example: "Saved payment methods - Improves returning user experience, but first-time users can still checkout"

**Could-Have (Nice-to-have if time allows):**
- [Feature] - [Why it's nice-to-have]
  - Example: "Gift wrapping option - Adds value but low usage expected"

**Won't-Have (Explicitly out of scope):**
- [Feature] - [Why we're not doing it]
  - Example: "Cryptocurrency payments - Too few users, high implementation complexity, defer to v2"

**Design Implications:**
- [How scope affects design priorities]
- Example: "MVP focused → Design core flow excellently, cut secondary features"

</explicit_constraints>

<implicit_constraints>
## Platform Conventions

[List platform-specific conventions that should be followed even if not explicitly stated]

**iOS:**
- Navigation bar at top, tab bar at bottom
- System fonts (San Francisco) and standard UI components
- Standard gestures (swipe back, pull to refresh)
- Haptic feedback for key interactions

**Android:**
- Material Design principles (FAB, bottom sheets)
- System back button behavior
- Material motion and elevation system

**Web:**
- Underlined links or clear visual distinction
- Breadcrumbs for deep hierarchy
- Search in header (typically top-right)
- Responsive design (mobile-first approach)

**Design Implication:** "Follow platform conventions to meet user expectations, don't reinvent standard patterns"

---

## Existing Patterns Users Expect

**Product-Specific Patterns:**
- [Pattern already established in our product]
- Example: "We always use bottom sheet for secondary actions - maintain consistency"

**Industry Conventions:**
- [Pattern users know from competitor products]
- Example: "E-commerce checkout follows: Cart → Shipping → Payment → Review → Confirmation"

**Design Implication:** "Leverage existing mental models, don't make users learn new patterns unnecessarily"

---

## Performance Expectations (Unstated)

- **Page load:** Users expect <3 seconds, abandon after 5 seconds
- **Interaction responsiveness:** Buttons/links respond <100ms (feels instant)
- **Animation:** 60fps for smooth motion (30fps feels janky)
- **Search results:** Return results <1 second (ideally instant)

**Design Implication:** "Design with performance in mind - minimize heavy assets, use lazy loading, show loading states"

---

## Accessibility Requirements (Often Assumed)

- **WCAG 2.1 AA minimum** (legal requirement in many jurisdictions)
- **Keyboard navigation:** All interactive elements keyboard accessible (tab order logical)
- **Screen reader support:** Semantic HTML, ARIA labels, alt text for images
- **Color contrast:** Text has 4.5:1 contrast ratio (large text 3:1)
- **Focus indicators:** Visible focus states for keyboard navigation
- **Touch targets:** Minimum 44x44px (iOS) / 48x48px (Android)

**Design Implication:** "Accessibility is non-negotiable - bake it in from the start, not an afterthought"

---

## Brand & Design System Constraints

- **Brand colors:** [Hex codes for primary, secondary, accent colors]
- **Typography:** [Font families, sizes, weights]
- **Voice & tone:** [Brand voice - professional, friendly, playful, etc.]
- **Design system components:** [Must use existing components, don't reinvent]
- **Design principles:** [Product design principles to follow]

**Design Implication:** "Stay within brand guidelines and design system, maintain consistency across product"

---

## Data Privacy & Security (Unstated Expectations)

- **Sensitive data:** Don't display in plain text (mask credit cards, SSNs, passwords)
- **Authentication:** Require login for personal data access
- **Session timeout:** Auto-logout after inactivity (typically 15-30 min)
- **Audit logging:** Track sensitive actions (for security and compliance)

**Design Implication:** "Design for security by default - mask sensitive data, require authentication, set expectations around timeouts"

</implicit_constraints>

<metric_driven_requirements>
For each success metric, translate into design requirements:

## Metric #1: [e.g., "Increase conversion rate by 10%"]

**Current Baseline:** [X]% conversion rate

**Target:** [Y]% conversion rate (10% relative increase)

**UX Outcomes Needed:**
- Reduce friction: Fewer steps, clearer CTAs, smart defaults
- Increase trust: Social proof, security badges, clear value proposition
- Improve clarity: Better copywriting, visual hierarchy, reduced cognitive load

**User Behaviors to Enable:**
- Users must understand value proposition within 5 seconds
- Users must complete key actions with minimal effort (ideally <3 clicks)
- Users must feel confident proceeding (reduce anxiety, increase trust)

**Friction to Remove:**
- Current friction: 12-field checkout form (reduce to 6 fields)
- Current friction: Unclear CTAs (test 3 CTA variants for clarity)
- Current friction: No trust signals (add security badges, testimonials)

**Design Requirements:**
1. Reduce checkout form from 12 to 6 fields (use smart defaults for the rest)
2. Test 3 CTA variants: "Buy Now", "Complete Purchase", "Checkout Securely"
3. Add trust badges above payment section (SSL, money-back guarantee, testimonials)
4. Improve visual hierarchy: Make CTA most prominent element on page (size, color, placement)

**Validation:**
- Usability testing: 90%+ of users complete checkout without confusion
- A/B test: New design increases conversion by 5-10%

---

## Metric #2: [e.g., "Increase feature adoption by 25%"]

[Same detailed structure as Metric #1]

---

[Continue for all success metrics]

</metric_driven_requirements>

<design_principles>
## Project-Specific Design Principles

These principles guide tradeoff decisions for this project:

### 1. [Principle Name]: [Principle Statement]

**What This Means:**
[Explain the principle in plain language]

**Tradeoff Guidance:**
When we must choose between [X] and [Y], we prioritize [X] because [reason]

**Example:**
[Concrete example of how this principle guides a design decision]

**Example Principle: Speed Over Polish**
- **Statement:** "Ship functional, usable designs quickly. Refine aesthetics in v2."
- **What This Means:** Prioritize getting core functionality in users' hands over pixel-perfect visual design. Design must be usable and brand-consistent, but doesn't need to be visually stunning in v1.
- **Tradeoff:** When choosing between "thorough visual design exploration" vs. "get prototype to users fast", choose speed.
- **Example:** "For v1, use standard design system components and straightforward layouts. Save custom illustrations and micro-interactions for v2."

---

### 2. [Principle]: [Statement]

[Same structure]

---

[Continue for 5-7 principles total]

## Non-Negotiable Qualities

These qualities cannot be compromised:

1. **[Quality - e.g., Accessibility Compliance]**
   - We will always meet WCAG 2.1 AA, even if it means additional design/dev time
   - Why: Legal requirement, user trust, inclusive design is a core value

2. **[Quality - e.g., Data Security]**
   - We will always prioritize user data security, even if it adds friction
   - Why: User trust is foundational, security breaches are existential risk

3. **[Quality - e.g., Performance]**
   - We will always ship designs that load <3 seconds, even if it means reducing features
   - Why: Users abandon after 5 seconds, performance is part of UX quality

## What Can Be Compromised (If Necessary)

These are important but can be adjusted for higher priorities:

1. **Visual Polish:** Can be improved in v2 if timeline is constrained. Core functionality and usability cannot be compromised, but aesthetic refinement can wait.

2. **Edge Case Support:** Can defer rare edge cases to v2 if they significantly increase complexity. Support 80% of users excellently, handle 20% adequately.

3. **Feature Breadth:** Can launch with fewer features if it means shipping sooner. Better to do 3 things excellently than 10 things poorly.

</design_principles>

<information_gaps>
## Missing User Context

**Gap:** [What's unclear about users]

**Why This Matters:** [How this affects design decisions]

**Example:** "PM says 'design for mobile users' but doesn't specify: Are these existing users (familiar with product) or new users (need onboarding)? Are they using on-the-go (need quick access) or at desk (can handle complexity)?"

**Impact on Design:** Can't design appropriate level of guidance/onboarding without knowing user proficiency

**Clarifying Question:** "Which user segment are we designing for: power users who know the product, or first-time users who need guidance? What's their context of use: on-the-go or at desk?"

---

[Continue for all user context gaps]

## Unclear Success Criteria

**Gap:** [What's vague about success metrics]

**Why This Matters:** [Can't validate designs without clear metrics]

**Example:** "PM says 'improve user engagement' but doesn't define engagement. Does this mean DAU (daily active users), session length, actions per session, or feature usage?"

**Impact on Design:** Can't make informed tradeoff decisions without knowing what we're optimizing for

**Clarifying Question:** "How are we defining user engagement? What's the baseline and target? How will we measure it?"

---

[Continue for all success criteria gaps]

## Undefined Constraints

**Gap:** [What technical/business constraints are missing]

**Why This Matters:** [Can't design feasible solutions without constraints]

**Example:** "PM says 'integrate with CRM' but doesn't specify which CRM system, what APIs are available, or what data we can access"

**Impact on Design:** Can't design data displays or workflows without knowing what data is available

**Clarifying Question:** "Which CRM system are we integrating with? What APIs are available? What user data can we access? Are there rate limits or data freshness issues?"

---

[Continue for all undefined constraints]

## Ambiguous Requirements

[Same structure for requirements that need detail]

## Clarifying Questions for PM

Prioritized list of questions that need answers before design can proceed effectively:

### Critical (Must answer before starting design):
1. [Question that blocks design work]
2. [Question that blocks design work]

### High Priority (Should answer in first week):
1. [Question that affects design direction]
2. [Question that affects design direction]

### Medium Priority (Good to know, but can proceed without):
1. [Question that would inform design but not block it]

</information_gaps>

<validation_criteria>
## Must-Have (Non-Negotiable)

Designs MUST satisfy these requirements or they're not acceptable:

- [ ] **[Requirement]** - [How to validate]
  - Example: "Must complete checkout in 6 steps or fewer" - Validate by counting steps in user flow
- [ ] **[Requirement]** - [How to validate]
  - Example: "Must meet WCAG 2.1 AA contrast requirements" - Validate with color contrast checker
- [ ] **[Requirement]** - [How to validate]
  - Example: "Must render correctly on iOS 14+ and Android 10+" - Validate with device testing

**Validation Method:** Checklist review before handoff to engineering

---

## Should-Have (Important but Adjustable)

Designs should satisfy these if possible, but tradeoffs acceptable:

- [ ] **[Requirement]** - [How to validate]
  - Example: "Should support autofill for all form fields" - Validate in browser testing
- [ ] **[Requirement]** - [How to validate]
  - Example: "Should include contextual help for complex interactions" - Validate in usability testing

**Validation Method:** Design critique, adjust if blockers arise

---

## Success Signals (Design is On Track)

Early indicators that design is heading in the right direction:

- ✅ **[Signal]** - [When to check]
  - Example: "Stakeholders easily understand user flow in walkthrough" - Check in design review
- ✅ **[Signal]** - [When to check]
  - Example: "Usability testing shows 90%+ task completion" - Check in usability testing
- ✅ **[Signal]** - [When to check]
  - Example: "Engineering confirms designs are feasible" - Check in technical review

---

## Red Flags (Design is Off Track)

Warning signs that design is not meeting goals:

- 🚩 **[Red flag]** - [What to do]
  - Example: "Stakeholders confused about how feature works" - Stop, clarify requirements, iterate
- 🚩 **[Red flag]** - [What to do]
  - Example: "Usability testing shows <70% task completion" - Identify friction points, redesign
- 🚩 **[Red flag]** - [What to do]
  - Example: "Engineering flags designs as technically infeasible" - Adjust design to meet constraints
- 🚩 **[Red flag]** - [What to do]
  - Example: "Designs violate accessibility standards" - Fix immediately, non-negotiable

---

## Validation Methods & Timeline

**Design Review with Stakeholders:**
- **When:** Week 1 (after initial concepts)
- **Purpose:** Align on direction, gather feedback, ensure we're solving the right problem
- **Success Criteria:** Stakeholders agree on direction, no major misalignment

**Usability Testing:**
- **When:** Week 2 (after refined prototype)
- **Purpose:** Validate designs with real users, measure task completion and satisfaction
- **Success Criteria:** 90%+ task completion, 4+/5 satisfaction rating, no critical usability issues

**Technical Feasibility Review:**
- **When:** Week 3 (before finalizing designs)
- **Purpose:** Confirm engineering can build this within timeline and constraints
- **Success Criteria:** Engineering confirms feasibility, no major technical blockers

**Accessibility Audit:**
- **When:** Week 4 (before handoff)
- **Purpose:** Ensure designs meet WCAG 2.1 AA standards
- **Success Criteria:** All accessibility requirements met, no violations

**Post-Launch Analytics:**
- **When:** 2 weeks, 1 month, 3 months after launch
- **Purpose:** Measure success metrics, identify areas for improvement
- **Success Criteria:** Success metrics trending toward targets

</validation_criteria>

<next_actions>
## Immediate Next Steps

Based on this analysis, here's what needs to happen before design can proceed effectively:

### 1. Clarify with PM (Priority: Critical)
**Action:** Schedule 30-min meeting with PM to clarify:
- [Question 1]
- [Question 2]
- [Question 3]

**Owner:** [Designer name]
**Timeline:** By [date]
**Blocker:** Cannot start design without this information

### 2. Gather User Context (Priority: High)
**Action:** Review existing user research or conduct [research method]
- [Specific research need]

**Owner:** [UX Researcher or Designer]
**Timeline:** By [date]
**Impact:** Informs user-centered design decisions

### 3. Technical Validation (Priority: High)
**Action:** Meet with engineering to clarify:
- [Technical constraint or integration question]

**Owner:** [Designer + Engineering Lead]
**Timeline:** By [date]
**Impact:** Ensures designs are technically feasible

### 4. Begin Design Exploration (Priority: High)
**Action:** Start with [specific design task]
- Focus on [core user flow or interaction]
- Create [low-fi sketches / wireframes / prototype]

**Owner:** [Designer name]
**Timeline:** By [date]
**Deliverable:** [Prototype for usability testing / Concepts for design review]

### 5. Schedule Validation Sessions (Priority: Medium)
**Action:** Schedule:
- Design review with stakeholders: [date]
- Usability testing sessions: [dates]
- Technical review with engineering: [date]

**Owner:** [Designer or PM]
**Timeline:** Schedule by [date], sessions occur in weeks 1-4

</next_actions>
</design_constraints>

The goal of translating PM context into design constraints is to give yourself clear guardrails while identifying what's missing. Good constraints enable creativity by defining boundaries - you know what problems to solve, what limitations exist, and what success looks like. Bad or unclear constraints lead to wasted effort designing the wrong things. When PM context is vague, your job is to ask clarifying questions until you have enough constraints to design confidently. Design is problem-solving under constraints - the clearer the constraints, the better the solutions.
```