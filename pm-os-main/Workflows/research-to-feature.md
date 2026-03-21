# Workflow: Research to Feature

A 5-step workflow to go from customer research to shipped feature.

## Overview

Use this workflow when you have customer insights and need to turn them into a well-scoped feature. Each step bridges the gap from research to delivery.

**Time:** 1-2 weeks total (depending on scope)
**Output:** Ready-to-build PRD with validation

---

## Step 1: Synthesize Research

**Goal:** Turn raw research into actionable insights.

### Prompt

```
Help me synthesize my customer research into actionable insights.

Research inputs:
[Paste interview notes, survey results, support tickets, usage data]

Help me identify:
1. Key customer jobs to be done (JTBD format)
2. Top pain points with frequency/severity
3. Current workarounds customers use
4. Quotes that capture the core problem
5. Patterns across different customer segments
6. Surprises or contradictions in the data

Format as a research synthesis document I can share with my team.
```

### Output
- Synthesized insights
- JTBD statements
- Evidence-backed pain points

---

## Step 2: Opportunity Definition

**Goal:** Define the specific opportunity to pursue.

### Prompt

```
Help me define a clear opportunity based on my research synthesis.

Research synthesis:
[Paste output from Step 1]

Our product context:
[Brief description of your product and current focus areas]

Help me create an opportunity brief that includes:
1. **Opportunity statement**: For [user] who [situation], we will [approach] so they can [outcome]
2. **Why now**: Why is this the right time to address this?
3. **Sizing**: How many users affected? What's the potential impact?
4. **Strategic fit**: How does this align with our strategy?
5. **Risks**: What could go wrong? What don't we know?

Also identify what we should learn before committing to build.
```

### Output
- Focused opportunity statement
- Business case
- Key assumptions to test

---

## Step 3: Solution Exploration

**Goal:** Generate and evaluate solution options.

### Prompt

```
Help me explore solutions for this opportunity.

Opportunity brief:
[Paste output from Step 2]

Constraints:
- Technical: [Any tech limitations]
- Timeline: [How quickly we need to ship]
- Resources: [Team capacity]

Help me:
1. Generate 5+ solution approaches (vary in scope/complexity)
2. Evaluate each against:
   - User value (does it solve the problem?)
   - Feasibility (can we build it?)
   - Business value (does it move our metrics?)
3. Create a 2x2 of solutions (effort vs. impact)
4. Recommend 1-2 solutions to prototype/test
5. Identify what assumptions each solution rests on

Don't just pick the obvious solution—help me think creatively.
```

### Output
- Solution options
- Evaluation matrix
- Recommended direction
- Assumptions to validate

---

## Step 4: Validation Planning

**Goal:** Design experiments to de-risk before building.

### Prompt

```
Help me plan validation for my proposed solution.

Proposed solution:
[Paste recommended solution from Step 3]

Key assumptions to test:
[List from Step 3]

Resources available:
- Time: [How long for validation]
- People: [Who can help]
- Budget: [If any]

Help me design validation:
1. For each key assumption:
   - Validation method (prototype test, survey, fake door, etc.)
   - Success criteria (what result means proceed vs. pivot)
   - Time/effort required
2. Sequence: What to test first (riskiest assumptions)
3. Timeline: Realistic validation schedule
4. Go/no-go criteria: When do we commit to building?

Make the validation as lean as possible while still being rigorous.
```

### Output
- Validation plan
- Success criteria
- Decision framework

---

## Step 5: PRD Creation

**Goal:** Document the feature for development.

### Prompt

```
Help me write a PRD for this validated feature.

Validation results:
[What you learned from Step 4]

Solution we're building:
[Refined based on validation]

Use the PRD structure I have in Templates/ to create a complete PRD that includes:
1. Problem statement with research backing
2. Goals and success metrics
3. User stories with acceptance criteria
4. Design requirements
5. Technical considerations
6. Analytics plan
7. Rollout approach

Make sure every requirement traces back to customer research.
```

### Output
- Complete PRD
- Ready for design and engineering review

---

## Checkpoint Questions

Before moving to next step, ask:

**After Step 1:** Do we understand the problem well enough?
**After Step 2:** Is this the right opportunity to pursue?
**After Step 3:** Are we confident in our solution direction?
**After Step 4:** Did validation confirm our assumptions?
**After Step 5:** Is the PRD clear enough to build from?

---

## Tips

- Don't skip validation (Step 4) even under time pressure
- Involve engineering early (by Step 3 at latest)
- Keep research artifacts linked throughout
- Be willing to kill ideas that don't validate
- The best features feel obvious in hindsight because of the research

---

## Optional: Sense-check with a Custom GPT

- [Write PRDs](https://chatgpt.com/g/g-G5diVh12v-chatprd-ai-for-product-managers?model=gpt-4o) — sense-check your PRD draft or generate a first pass from requirements (Step 5)
- [Write like an Amazonian](https://chatgpt.com/g/g-XN091ulbF-write-like-an-amazonian-writing-style-editor?model=gpt-4o) — run your PRD through Amazon's writing rules for clarity (Step 5)
