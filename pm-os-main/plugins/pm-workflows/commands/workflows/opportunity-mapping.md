---
name: opportunity-mapping
description: Map product opportunities systematically — from structured OST intake through opportunity tree construction to selecting one prioritized target opportunity.
---

# /opportunity — Opportunity Mapping

Walk the user through a 3-step opportunity mapping session. Each step invokes a skill from `.cursor/skills/`. Pass the output of each step as input to the next. Confirm with the user before advancing unless they request end-to-end.

---

## Step 1: Interactive OST intake

**Skill:** `interactive-intake-to-gather-ost-inputs`
**Folder:** `.cursor/skills/interactive-intake-to-gather-ost-inputs/SKILL.md`

Read and invoke this skill. Goal: gather the structured inputs needed to build an Opportunity Solution Tree — business outcome, user segments, existing solutions tried, constraints, and context.

**Output to carry forward:** Structured OST input document (outcome goal, user insights, constraints, solution attempts).

---

## Step 2: Build the Opportunity Solution Tree

**Skill:** `transform-input-into-an-opportunity-solution-tree`
**Folder:** `.cursor/skills/transform-input-into-an-opportunity-solution-tree/SKILL.md`

Invoke this skill using the structured inputs from Step 1. Goal: construct a full OST — outcome at the top, opportunities in the middle, solutions at the leaves.

**Output to carry forward:** Full OST with opportunities and candidate solutions mapped.

---

## Step 3: Prioritize and select one target opportunity

**Skill:** `prioritize-opportunities-in-opportunity-space`
**Folder:** `.cursor/skills/prioritize-opportunities-in-opportunity-space/SKILL.md`

Invoke this skill using the OST from Step 2. Goal: apply Teresa Torres's four-factor framework (opportunity sizing, market factors, company factors, customer factors) to compare candidates qualitatively and select a single target opportunity to explore.

**Output:** Four-factor analysis, compare-and-contrast summary, one target opportunity recommendation with rationale, distinctness check, key unknowns, and next steps.

> **Alternative:** If the user wants a quick mechanical selection from an OST JSON, use `choose-1-target-opportunity-from-the-ost` instead.

---

## Save output

Offer to save the OST and selected opportunity to `Work/Research/YYMMDD-opportunity-map.md`.
