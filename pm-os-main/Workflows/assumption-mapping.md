# Workflow: Assumption Mapping

A 3-step workflow to identify and prioritize the riskiest assumptions in your initiative.

## Overview

Use this workflow before committing significant resources to a new initiative. It surfaces hidden assumptions and helps you test the right things first.

**Time:** 1-2 hours
**Output:** Prioritized assumption list with test plans

---

## Step 1: Surface Assumptions

**Goal:** Make implicit assumptions explicit.

### Prompt

```
Help me identify all the assumptions behind this initiative.

The initiative:
[Describe what you're planning to do]

Expected outcome:
[What you expect to happen if it works]

Help me surface assumptions in these categories:

1. **Desirability assumptions** (will customers want this?)
   - Do they have this problem?
   - Do they care enough to change behavior?
   - Will our solution appeal to them?

2. **Viability assumptions** (will this work for our business?)
   - Can we price this profitably?
   - Is the market large enough?
   - Does this fit our business model?

3. **Feasibility assumptions** (can we build this?)
   - Do we have the technical capability?
   - Can we do this with our resources?
   - Are there dependencies we can't control?

4. **Usability assumptions** (can customers use this?)
   - Will they understand how to use it?
   - Can they complete key workflows?
   - Will they form habits around it?

Be thorough—include assumptions that seem obvious.
```

### Output
- Comprehensive assumption list
- Categorized by risk type
- Nothing left implicit

---

## Step 2: Prioritize by Risk

**Goal:** Identify which assumptions are most dangerous.

### Prompt

```
Help me prioritize these assumptions by risk.

Assumptions:
[Paste from Step 1]

For each assumption, assess:
1. **Impact if wrong:** What happens if this assumption is false? (High/Medium/Low)
2. **Uncertainty:** How confident are we this is true? (High/Medium/Low uncertainty)
3. **Evidence:** What evidence do we have for/against? (Strong/Weak/None)

Create a risk matrix:
- HIGH impact + HIGH uncertainty = Test immediately
- HIGH impact + LOW uncertainty = Monitor
- LOW impact + HIGH uncertainty = Nice to know
- LOW impact + LOW uncertainty = Ignore

Rank the top 5 assumptions we should test first.
For each, explain why it's critical.
```

### Output
- Risk-prioritized assumptions
- Top 5 to test
- Justification for priority

---

## Step 3: Design Tests

**Goal:** Plan how to validate the riskiest assumptions.

### Prompt

```
Help me design tests for my top assumptions.

Top assumptions to test:
[Paste top 5 from Step 2]

Resources available:
- Time: [How much time for testing]
- Budget: [If any]
- Access: [Who can we reach]

For each assumption, recommend:
1. **Test type:** (interview, survey, prototype, fake door, data analysis, etc.)
2. **Sample:** Who to involve, how many
3. **Success criteria:** What result confirms vs. invalidates the assumption
4. **Timeline:** How long will this take
5. **Effort:** Low/Medium/High

Sequence the tests:
- What can run in parallel?
- What depends on other results?
- Total timeline for validation

Create a testing plan I can execute this week.
```

### Output
- Test plan for each assumption
- Success/failure criteria
- Realistic timeline

---

## Assumption Mapping Canvas

```
┌─────────────────────────────────────────────────────────────┐
│                    HIGH IMPACT                               │
│                                                              │
│   ┌────────────────────┐    ┌────────────────────┐          │
│   │                    │    │                    │          │
│   │    NICE TO KNOW    │    │   TEST FIRST ★     │          │
│   │                    │    │                    │          │
│   └────────────────────┘    └────────────────────┘          │
│        LOW UNCERTAINTY            HIGH UNCERTAINTY           │
│   ┌────────────────────┐    ┌────────────────────┐          │
│   │                    │    │                    │          │
│   │      IGNORE        │    │      MONITOR       │          │
│   │                    │    │                    │          │
│   └────────────────────┘    └────────────────────┘          │
│                                                              │
│                    LOW IMPACT                                │
└─────────────────────────────────────────────────────────────┘
```

---

## Test Types Quick Reference

| Assumption Type | Fast Tests |
|-----------------|-----------|
| "Users want this" | Interviews, fake door, landing page |
| "Users will pay" | Pricing survey, willingness-to-pay interview |
| "We can build it" | Spike, proof of concept, vendor demo |
| "Users can use it" | Prototype test, usability study |
| "Market is big enough" | Market sizing, comparable analysis |

---

## Tips

- Run this with your team for more complete assumption surfacing
- The obvious assumptions are often not the riskiest
- Test the thing that would be most devastating if wrong
- Document everything—you'll reference this throughout the project
- Revisit assumptions after major learnings
