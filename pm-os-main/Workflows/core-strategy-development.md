# Workflow: Core Strategy Development

A 4-step workflow to develop a product strategy from scratch.

## Overview

Use this workflow when you need to create a comprehensive product strategy. Each step builds on the previous one.

**Time:** 2-4 hours total
**Output:** Complete strategy document

---

## Step 1: Situation Analysis

**Goal:** Understand where you are today.

### Prompt

```
Help me analyze my current situation for strategy development.

Context:
- Product: [Your product]
- Market: [Your market]
- Current position: [Where you are today]

I need you to help me answer:
1. What's working well? What's our current competitive advantage?
2. What's not working? Where are we falling short?
3. What's changing in our market? Key trends and forces?
4. What are our biggest constraints? Resources, capabilities, dependencies?
5. What opportunities exist that we're not currently pursuing?

Format this as a situation assessment I can share with stakeholders.
```

### Output
- SWOT-style analysis
- Key insights summary
- Foundation for next steps

---

## Step 2: Problem Diagnosis

**Goal:** Identify the core strategic challenge.

### Prompt

```
Based on my situation analysis, help me diagnose our core strategic challenge.

Situation analysis:
[Paste output from Step 1]

Help me identify:
1. What is the REAL challenge we face? (Not symptoms, root cause)
2. Why is this challenge hard? What makes it difficult to solve?
3. What happens if we don't address it?
4. What's the timeframe for addressing it?

The diagnosis should be:
- Honest (not what we want to hear)
- Specific (not generic platitudes)
- Actionable (points toward solutions)

Format as a diagnosis statement I can rally the team around.
```

### Output
- Clear problem statement
- Understanding of difficulty
- Urgency framework

---

## Step 3: Guiding Policy

**Goal:** Define your approach to winning.

### Prompt

```
Help me develop a guiding policy that addresses our strategic challenge.

Our challenge:
[Paste diagnosis from Step 2]

Our constraints:
[Key resource/capability limits]

Our strengths:
[What we do well]

A guiding policy should:
1. Create leverage against the challenge
2. Build on our existing strengths
3. Be differentiated from competitors
4. Guide prioritization decisions

Help me develop:
1. 2-3 candidate guiding policies (different approaches)
2. Pros/cons of each
3. Your recommendation and why
4. How to express this in one memorable sentence

The policy should tell us what we'll do differently than competitors.
```

### Output
- Strategic direction
- Clear differentiation
- Decision-making filter

---

## Step 4: Coherent Actions

**Goal:** Translate strategy into specific initiatives.

### Prompt

```
Help me translate our guiding policy into coherent actions.

Our guiding policy:
[Paste policy from Step 3]

Our time horizon: [e.g., 1 year]
Our resource constraints: [Team size, budget]

Help me develop:
1. 3-5 key initiatives that execute this policy
2. How these initiatives reinforce each other
3. Sequencing: What must happen first?
4. What we're explicitly NOT doing (trade-offs)
5. Early milestones to know if we're on track

For each initiative:
- Clear description
- Success metric
- Owner (role, not name)
- Dependencies
- Rough timeline

End with a one-page strategy summary I can share.
```

### Output
- Prioritized initiative list
- Implementation sequence
- Trade-offs documented
- Strategy on a page

---

## Putting It Together

After completing all 4 steps, you'll have:

1. **Situation Analysis** - Where we are
2. **Diagnosis** - The real challenge
3. **Guiding Policy** - Our approach
4. **Coherent Actions** - What we'll do

Combine these into a strategy document using the `/prompt strategy-memo` prompt.

---

## Tips

- Don't rush—each step needs honest thinking
- Involve stakeholders for input (especially on diagnosis)
- The guiding policy is the hardest part—take your time
- Actions must reinforce each other (coherence)
- Review and update quarterly

---

## Optional: Sense-check with a Custom GPT

- [Discover your strategy with Richard Rumelt](https://chatgpt.com/g/g-hiers5c7f-the-strategy-process-by-richard-rumelt?model=gpt-4o) — stress-test your strategy kernel (diagnosis, guiding policy, actions) against Rumelt's framework
- [Make a plan on a page like John Cutler](https://chatgpt.com/g/g-HbtS0fCku-plan-on-a-page-maker-for-product-managers?model=gpt-4o) — compress your final strategy into a single-page summary
