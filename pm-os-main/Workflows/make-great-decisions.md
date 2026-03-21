# Workflow: Make Great Decisions

A 6-step workflow for making important product decisions with rigor and clarity.

## Overview

Use this workflow for significant decisions that deserve structured thinking—not every small choice, but ones with real consequences.

**Time:** 1-3 hours depending on complexity
**Output:** Documented decision with rationale

---

## Step 1: Frame the Decision

**Goal:** Ensure you're solving the right problem.

### Prompt

```
Help me frame a decision I need to make.

The situation:
[Describe what's happening]

What I think the decision is:
[Your initial framing]

Help me:
1. Reframe the decision if needed (am I asking the right question?)
2. Clarify what's actually at stake
3. Identify who else should be involved
4. Determine the timeline (when must this be decided?)
5. Assess reversibility (one-way door or two-way door?)

If this is a two-way door decision, help me move faster.
If it's a one-way door, help me be more rigorous.
```

### Output
- Clear decision statement
- Stakes understanding
- Decision type (reversible?)

---

## Step 2: Gather Information

**Goal:** Get the facts you need (and admit what you don't know).

### Prompt

```
Help me identify what information I need for this decision.

The decision:
[Paste framing from Step 1]

What I currently know:
[Current knowledge]

Help me:
1. List critical information I need but don't have
2. Identify what I can actually find out vs. what I have to guess
3. For knowable things: How to get the information quickly
4. For unknowable things: How to make reasonable assumptions
5. Flag if I'm missing stakeholder perspectives

Don't let me over-research—help me know when I have "enough" to decide.
```

### Output
- Information gaps identified
- Research plan
- Reasonable assumptions

---

## Step 3: Generate Options

**Goal:** Consider multiple paths (not just the obvious one).

### Prompt

```
Help me generate options for this decision.

The decision:
[From Step 1]

The information I have:
[From Step 2]

Generate at least 5 options including:
1. The obvious choice
2. A more aggressive version
3. A more conservative version
4. A creative/unconventional option
5. The "do nothing" option (what if we don't decide?)

For each, briefly note key implications.
Push me to consider options I might not have thought of.
```

### Output
- 5+ options
- Initial implications
- Creative alternatives

---

## Step 4: Evaluate Trade-offs

**Goal:** Honestly assess pros, cons, and risks of each option.

### Prompt

```
Help me evaluate the trade-offs for each option.

Options:
[Paste from Step 3]

Decision criteria (what matters most):
[List your priorities]

For each option, analyze:
1. Pros (benefits, upsides, opportunities)
2. Cons (costs, downsides, limitations)
3. Risks (what could go wrong, likelihood, impact)
4. Second-order effects (what does this lead to?)
5. Who wins/loses with this option

Create a comparison matrix and highlight:
- The option that maximizes upside
- The option that minimizes risk
- The option that's most reversible
```

### Output
- Trade-off analysis
- Comparison matrix
- Risk assessment

---

## Step 5: Make the Call

**Goal:** Commit to a decision with clear reasoning.

### Prompt

```
Help me make and document this decision.

Analysis:
[Paste from Step 4]

Help me:
1. Recommend a decision based on my criteria
2. Explain the reasoning clearly (for future me or others)
3. Acknowledge what I'm giving up (trade-offs accepted)
4. Identify what would make me revisit this decision
5. Define immediate next steps

Format as a decision document I can share.
```

### Output
- Clear decision
- Documented rationale
- Trigger conditions for revisit

---

## Step 6: Plan for Learning

**Goal:** Set up to learn if you made the right call.

### Prompt

```
Help me set up to learn from this decision.

The decision:
[From Step 5]

Timeline:
[When should we see results]

Help me:
1. Define leading indicators (early signs it's working/not)
2. Define lagging indicators (ultimate success measures)
3. Set review checkpoints (when to formally evaluate)
4. Pre-commit to what I'll do if it's not working
5. Identify what would make this a "good decision" even if outcomes are bad

This helps me learn from decisions, not just outcomes.
```

### Output
- Success indicators
- Review schedule
- Pre-committed responses

---

## Decision Document Template

After completing the workflow, you'll have:

```markdown
# Decision: [Title]

**Date:** [When decided]
**Decider:** [Who made the call]
**Stakeholders:** [Who was consulted]

## Decision
[What we decided]

## Context
[Why this decision was needed]

## Options Considered
[Summary of options evaluated]

## Rationale
[Why we chose this option]

## Trade-offs Accepted
[What we're giving up]

## Success Measures
[How we'll know it worked]

## Review Date
[When we'll revisit]

## Reversal Triggers
[What would make us change course]
```

---

## Tips

- Speed matters for two-way doors; rigor matters for one-way doors
- "I don't know" is valid—document assumptions
- Involve others for important decisions (but one person decides)
- Time-box information gathering
- A documented wrong decision teaches more than an undocumented right one

---

## Optional: Sense-check with a Custom GPT

- [Best decision making GPT](https://chatgpt.com/g/g-JFYwMmo6K-decision-maker?model=gpt-4o) — get a structured second opinion on your decision framing and trade-off analysis
