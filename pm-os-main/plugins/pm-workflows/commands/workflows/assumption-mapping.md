---
name: assumption-mapping
description: Surface, prioritize, and find early signals for the riskiest assumptions in your product strategy — from assumption generation through prioritization to identifying the easiest validation signal.
---

# /assumptions — Assumption Mapping

Walk the user through a 3-step assumption mapping session. Each step invokes a skill from `.cursor/skills/`. Pass the output of each step as input to the next. Confirm with the user before advancing unless they request end-to-end.

---

## Step 1: Generate product assumptions

**Skill:** `generate-product-assumptions-from-core-strategy-in`
**Folder:** `.cursor/skills/generate-product-assumptions-from-core-strategy-in/SKILL.md`

Read and invoke this skill. Goal: systematically generate the full set of product assumptions embedded in the current strategy — across desirability, feasibility, viability, and business model dimensions.

**Output to carry forward:** Full assumption inventory with initial risk tags.

---

## Step 2: Prioritize risky assumptions

**Skill:** `prioritize-risky-assumptions-for-rapid-validation`
**Folder:** `.cursor/skills/prioritize-risky-assumptions-for-rapid-validation/SKILL.md`

Invoke this skill using the assumption inventory from Step 1. Goal: rank assumptions by risk (likelihood of being wrong × consequence if wrong) using QuickSort pairwise comparisons. Identify the top 1–3 that most threaten the strategy.

**Output to carry forward:** Ranked assumption list with top 1–3 critical assumptions identified.

---

## Step 3: Work backwards to an easy validation signal

**Skill:** `work-backwards-from-a-product-assumption-to-identi`
**Folder:** `.cursor/skills/work-backwards-from-a-product-assumption-to-identi/SKILL.md`

Invoke this skill for each of the top critical assumptions from Step 2. Goal: identify the cheapest, fastest signal that would confirm or refute each assumption before committing resources.

**Output:** Assumption → Signal map with validation approach for each critical assumption.

---

## Save output

Offer to save the assumption map and validation plan to `Work/Research/YYMMDD-assumption-map.md`.
