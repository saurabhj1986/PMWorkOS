# Workflow: Opportunity Mapping

A 3-step workflow to identify, evaluate, and prioritize product opportunities.

## Overview

Use this workflow when you need to decide where to focus—which problems to solve, which user needs to address, which directions to explore.

**Time:** 2-3 hours
**Output:** Prioritized opportunity list with clear next steps

---

## Step 1: Discover Opportunities

**Goal:** Cast a wide net to identify potential opportunities.

### Prompt

```
Help me discover product opportunities.

Context about our product:
[What your product does and for whom]

Current situation:
[Key metrics, challenges, strategic priorities]

Input sources I have:
[List what you can draw from: customer interviews, support tickets, usage data, competitor analysis, team ideas, etc.]

Help me identify opportunities from these angles:

1. **Customer pain points** - What frustrates users most?
2. **Unmet needs** - What are users trying to do but can't?
3. **Workarounds** - What hacky solutions are users building?
4. **Growth levers** - What would drive acquisition, activation, or retention?
5. **Competitive gaps** - Where do competitors fall short?
6. **Emerging trends** - What's changing in our market?
7. **Internal capabilities** - What are we uniquely able to do?

For each opportunity, capture:
- Opportunity statement (For [user] who [situation], we could [approach])
- Source/evidence
- Initial gut on size/impact

Generate at least 15 opportunities before we prioritize.
```

### Output
- Broad opportunity list
- Diverse sources represented
- Initial opportunity statements

---

## Step 2: Evaluate Opportunities

**Goal:** Assess opportunities against clear criteria.

### Prompt

```
Help me evaluate these opportunities.

Opportunities:
[Paste from Step 1]

Our strategic context:
- North star metric: [What we're trying to move]
- Strategic priorities: [Current focus areas]
- Constraints: [Resources, timeline, capabilities]

Evaluate each opportunity against:
1. **User value** - How much does this matter to users? (1-5)
2. **Business impact** - How much could this move our metrics? (1-5)
3. **Strategic fit** - How aligned is this with our strategy? (1-5)
4. **Feasibility** - How confident can we build this? (1-5)
5. **Urgency** - How time-sensitive is this? (1-5)

Create a scoring matrix and identify:
- Top 5 opportunities by total score
- Any "must-do" opportunities (high urgency + high impact)
- Any "quick wins" (high impact + high feasibility)
- Opportunities to explicitly table for now
```

### Output
- Scored opportunity matrix
- Tiered opportunity list
- Clear rationale for prioritization

---

## Step 3: Plan Exploration

**Goal:** Define how you'll pursue top opportunities.

### Prompt

```
Help me plan how to explore my top opportunities.

Top opportunities:
[Paste top 5 from Step 2]

For each opportunity, recommend:

1. **Exploration approach**
   - What do we need to learn first?
   - Discovery research needed?
   - Technical investigation needed?
   - Competitive analysis needed?

2. **Key questions to answer**
   - What would confirm this is worth pursuing?
   - What would make us abandon it?

3. **Resources required**
   - Who should be involved?
   - How much time to explore?

4. **Output expected**
   - What deliverable closes the exploration?
   - What decision will we make?

5. **Timeline**
   - When should exploration conclude?
   - What's the decision point?

Create an exploration plan that can start this week.
Recommend which opportunity to start with and why.
```

### Output
- Exploration plan per opportunity
- Clear decision criteria
- Recommended starting point

---

## Opportunity Statement Format

**Standard format:**
```
For [target user] who [situation/trigger],
we could [opportunity/approach],
so they can [desired outcome].
```

**Example:**
```
For power users who manage multiple projects,
we could add a unified dashboard view,
so they can see status across projects without switching contexts.
```

---

## Opportunity Evaluation Matrix

| Opportunity | User Value | Business Impact | Strategic Fit | Feasibility | Urgency | TOTAL |
|-------------|-----------|-----------------|---------------|-------------|---------|-------|
| [Opp 1] | /5 | /5 | /5 | /5 | /5 | /25 |
| [Opp 2] | /5 | /5 | /5 | /5 | /5 | /25 |
| ... | | | | | | |

---

## Tips

- Start broad, then narrow—don't self-censor in Step 1
- Include stakeholder input on evaluation criteria weights
- "Feasibility" includes organizational ability, not just technical
- Revisit opportunity map quarterly
- Keep the full list—low priorities today may be high priorities later

---

## Optional: Sense-check with a Custom GPT

- [TAM SAM SOM calculator](https://chatgpt.com/g/g-Yxxk2jO8i-tam-sam-som-calculator-for-your-startup?model=gpt-4o) — quickly size the market for your top opportunities (Step 2)
