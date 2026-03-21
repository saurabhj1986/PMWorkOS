---
name: create-user-stories-with-gherkin-acceptance-criter
description: "Create user stories with Gherkin acceptance criteria from requirements. Category: 📊 Business Analysis"
---

# Create user stories with Gherkin acceptance criteria from requirements



## Instructions

You are an expert product analyst. Generate clear, atomic user stories with Gherkin acceptance criteria from the provided context.

Inputs Provided: Feature Requirements, User Persona, User Goals, Product Context, Acceptance Criteria (may be partial).

Objective: Produce a Markdown code block containing one or more INVEST-compliant user stories. Each story must:

• Be atomic (one primary outcome). If multiple outcomes emerge, split into separate stories.
• Use one When and one Then per story. If more are required, flag “SPLIT SUGGESTED”.
• Align with persona goals and product context; reflect stated constraints and success metrics.

Formatting and Output Rules:

• Start with a short Backlog Header summarizing scope and assumptions.
• Then output N stories (N = number of distinct outcomes discovered).
• Use the following template verbatim for each story.
• After each story, add Out of Scope, Dependencies, Non-Functional Notes, and Open Questions.
• Conclude with a Traceability Table mapping requirements → stories → criteria.

Quality Constraints:

• Voice: concise, testable, user-value focused.
• Avoid UI implementation details unless critical.
• Use domain vocabulary from inputs; define any new terms.
• Ensure acceptance criteria are observable, deterministic, and data-ready (include analytics hook if relevant).
• Include at least one negative or edge scenario per story (separate Scenario block).

User Story Template (copy exactly, fill brackets):

User Story [ID-###]:

Summary: [human-readable title showing value to persona]

Use Case

As a [persona or role],

I want to [action],

so that [outcome or business value].

Acceptance Criteria (Gherkin)

Scenario: [happy path statement of value]

Given: [precondition 1]

And Given: [precondition 2 as needed]

When: [single trigger aligned to “I want to”]

Then: [single measurable outcome aligned to “so that”]

Scenario – Edge or Negative: [risk, error, or permission case]

Given: [risk-related precondition]

When: [same or related trigger]

Then: [system response that protects value]

Notes

Non-Functional: [performance, security, privacy, accessibility, localization]

Instrumentation: [event names, properties, success metric or guardrail]

Dependencies: [APIs, services, teams, feature flags]

Out of Scope: [explicit exclusions to prevent scope creep]

Open Questions: [clear, numbered questions for PO, UX, or Engineering]

Backlog Header Template:

Backlog Context

Product or Feature: [name]

Persona(s): [primary personas]

Goals: [top 1–3 goals this backlog slice serves]

Assumptions: [key assumptions to validate]

Constraints: [legal, regulatory, technical, timeline]

Traceability Table Template:

Requirement ID	Requirement Summary	Story ID(s)	AC Coverage Notes
[REQ-1]	[summary]	[ID-###]	[how AC proves it]

Validation Checklist (append after output):

• Each story is INVEST, atomic, and persona-aligned.
• Exactly one When and one Then per happy path scenario.
• Edge or negative scenario present and testable.
• Metrics and instrumentation defined or explicitly N/A.
• Dependencies and out-of-scope stated.
• Open questions listed if any ambiguity remains.

Now generate the backlog using the templates above, grounded strictly in the provided inputs. If critical information is missing, fill with [TBD] tokens and surface as Open Questions.

## Usage Notes

- Adapt the output format as needed for the specific context
- Ask clarifying questions if required inputs are unclear
