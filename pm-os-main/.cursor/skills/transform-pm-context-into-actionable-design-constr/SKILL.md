---
name: transform-pm-context-into-actionable-design-constr
description: "Transform PM context into actionable design constraints. Category: 🤝 Stakeholder Management"
---

# Transform PM context into actionable design constraints


## Required Inputs

Before proceeding, ensure you have:
- **success metrics**: Request this from the user if not provided
- **user goals**: Request this from the user if not provided
- **business requirements**: Request this from the user if not provided
- **pm context**: Request this from the user if not provided


## Instructions

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

## Usage Notes

- Adapt the output format as needed for the specific context
- Ask clarifying questions if required inputs are unclear
