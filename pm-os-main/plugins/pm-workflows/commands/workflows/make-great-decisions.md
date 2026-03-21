---
name: make-great-decisions
description: Make high-quality product decisions by working through root causes, classifying reversibility, journaling the decision, structuring the problem, synthesizing recommendations, and defining decision rights.
---

# /decisions — Make Great Decisions

Walk the user through a 6-step decision-making session. Each step invokes a skill from `.cursor/skills/`. Pass the output of each step as input to the next. Confirm with the user before advancing unless they request end-to-end.

---

## Step 1: Analyze root causes and consequences

**Skill:** `analyze-root-causes-and-consequences-from-a-questi`
**Folder:** `.cursor/skills/analyze-root-causes-and-consequences-from-a-questi/SKILL.md`

Read and invoke this skill. Goal: build a rigorous causal map — work backwards from the presenting problem to identify root causes, and work forwards to trace consequences of each option.

**Output to carry forward:** Root cause map + consequence tree for the decision at hand.

---

## Step 2: Classify the decision as reversible or permanent

**Skill:** `classify-decisions-as-reversible-or-permanent-from`
**Folder:** `.cursor/skills/classify-decisions-as-reversible-or-permanent-from/SKILL.md`

Invoke this skill using the root cause map from Step 1. Goal: classify the decision on the reversibility spectrum (Type 1 vs Type 2) from first principles — this determines how much deliberation is warranted and what process to use.

**Output to carry forward:** Reversibility classification + recommended decision process (fast/solo vs slow/collaborative).

---

## Step 3: Create a structured decision journal entry

**Skill:** `create-structured-decision-journals-from-decisions`
**Folder:** `.cursor/skills/create-structured-decision-journals-from-decisions/SKILL.md`

Invoke this skill using the causal map and classification from Steps 1–2. Goal: write a structured decision journal entry capturing the decision, reasoning, expected outcomes, and success criteria — creating accountability and enabling future review.

**Output to carry forward:** Decision journal entry draft.

---

## Step 4: MECE analysis

**Skill:** `create-mece-analysis-and-logical-tree-from-list-it`
**Folder:** `.cursor/skills/create-mece-analysis-and-logical-tree-from-list-it/SKILL.md`

Invoke this skill using the options identified in Steps 1–2. Goal: ensure the option space is Mutually Exclusive, Collectively Exhaustive — no overlaps, no gaps. Build a logical tree to expose hidden options or collapsed distinctions.

**Output to carry forward:** MECE option tree.

---

## Step 5: Structure complex problems into actionable recommendations

**Skill:** `structure-complex-problems-into-actionable-recomme`
**Folder:** `.cursor/skills/structure-complex-problems-into-actionable-recomme/SKILL.md`

Invoke this skill using the MECE option tree from Step 4 and the causal map from Step 1. Goal: synthesize all analysis into a clear, pyramid-structured recommendation with the top answer stated first, then supporting logic.

**Output to carry forward:** Structured recommendation (Pyramid Principle format).

---

## Step 6: Define decision rights using DAVCI

**Skill:** `define-clear-decision-rights-using-davci`
**Folder:** `.cursor/skills/define-clear-decision-rights-using-davci/SKILL.md`

Invoke this skill using the recommendation from Step 5. Goal: clarify who Decides, Advises, Vetoes, Contributes, and is Informed — preventing ambiguity about ownership before the decision is communicated.

**Output:** Decision + DAVCI matrix + communication plan.

---

## Save output

Offer to save the full decision analysis and journal entry to `Work/Decisions/YYMMDD-decision-title.md`.
