---
name: prioritize-risky-assumptions-for-rapid-validation
description: "Prioritize risky assumptions for rapid validation using QuickSort pairwise comparisons. Category: 🔍 User Research"
---

# Prioritize risky assumptions for rapid validation


## Required Inputs

Before proceeding, ensure you have:
- **assumptions**: Request this from the user if not provided


## Instructions

You will rank assumptions using **pairwise comparisons** with a QuickSort algorithm. This avoids arbitrary scoring and forces explicit tradeoff decisions.

### RANKING PRINCIPLE

When comparing two assumptions, pick the **riskier one** based on:
1. **Severity**: Which failure would hurt more?
2. **Uncertainty**: Which one are we less certain about?
3. **Irreversibility**: Which mistake is harder to recover from?

### PROCESS

**Step 1: Parse Assumptions**
Extract each assumption with its:
- Statement ("We believe that...")
- Impact if wrong
- Category (Desirability, Feasibility, Viability, Usability)

**Step 2: QuickSort Ranking**

Use QuickSort algorithm with pairwise comparisons via AskQuestion tool:

1. Pick a pivot assumption (start with middle item)
2. Compare other assumptions to the pivot using AskQuestion
3. Split into two groups: More risky than pivot, Less risky than pivot
4. Recursively sort each group
5. Continue until fully ranked

**For each comparison**, present using AskQuestion:
```
{
  "title": "Assumption Risk Comparison",
  "questions": [{
    "id": "comparison",
    "prompt": "Which assumption is RISKIER if wrong?",
    "options": [
      {"id": "A", "label": "[Full assumption A with impact]"},
      {"id": "B", "label": "[Full assumption B with impact]"}
    ]
  }]
}
```

Format each option as:
```
[Category] We believe that [statement]

Impact if wrong: [impact text]
```

**Step 3: Track Progress**

After each comparison group, tell the user:
- "Compared [assumption] to [N] others"
- "[X] more risky, [Y] less risky"
- "Total comparisons so far: [count]"

**Step 4: Output Results**

Once fully ranked, output:

```
PRIORITIZED ASSUMPTIONS (Highest Risk First)

1. [Category] — "We believe that..."
   Impact if wrong: [text]

2. [Category] — "We believe that..."
   Impact if wrong: [text]

[Continue for all assumptions]

---

COMPARISON STATS
- Total comparisons made: [count]
- Expected comparisons for QuickSort: ~[N log N]
- Top 5 assumptions to test first: [list #1-5]
```

### IMPORTANT RULES

1. **No arbitrary scoring** - Use only pairwise comparisons, no 1-5 scales
2. **Force tradeoffs** - User must pick one or the other, no ties
3. **Be efficient** - Use QuickSort to minimize comparisons (~20-30 for 23 items)
4. **Track progress** - Keep user informed of comparison count
5. **Explain rankings** - At the end, note any surprising results

### ERROR HANDLING

If user seems inconsistent (e.g., picks A>B, B>C, C>A):
- Flag the inconsistency
- Ask them to re-compare the conflicting pair
- Use their latest decision

## Usage Notes

- This skill uses QuickSort pairwise ranking instead of arbitrary scoring
- Typical comparison count: N log N ≈ 23 × 4.5 ≈ 20-30 comparisons
- Each comparison takes ~10-15 seconds, total time ~5-8 minutes
- More consistent and defensible than 1-5 scoring rubrics
