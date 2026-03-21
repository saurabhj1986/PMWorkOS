---
name: core-strategy-development
description: Build a grounded product strategy from first principles — from identifying the strategic crux through competitive analysis to a limit-based strategy and value chain map.
---

# /strategy — Core Strategy Development

Walk the user through a 4-step strategy build. Each step invokes a skill from `.cursor/skills/`. Pass the output of each step as input to the next. Confirm with the user before advancing unless they request end-to-end.

---

## Step 0: Find the strategic crux

**Skill:** `find-the-strategic-crux`
**Folder:** `.cursor/skills/find-the-strategic-crux/SKILL.md`

Read and invoke this skill. Goal: surface the pivotal obstacle between today's state and the desired future. This becomes the anchor for all subsequent strategy work.

**Output to carry forward:** Identified crux + current state / desired future framing + key constraints.

---

## Step 1: Competitive analysis + structured product strategy

Run both skills at this step. They are complementary — competitive analysis provides external grounding; the structured strategy skill uses that alongside the crux to build the initial strategy frame.

### Step 1a: NETMBA competitor analysis

**Skill:** `netmba-competitor-analysis`
**Folder:** `.cursor/skills/netmba-competitor-analysis/SKILL.md`

Invoke this skill using the crux and context from Step 0. Goal: map the competitive landscape against the crux.

**Output to carry forward:** Competitor positioning map + differentiation gaps.

### Step 1b: Create a structured product strategy

**Skill:** `create-a-structured-product-strategy-from-product`
**Folder:** `.cursor/skills/create-a-structured-product-strategy-from-product/SKILL.md`

Invoke this skill using Step 0 crux + Step 1a competitor analysis. Goal: produce an initial structured strategy document.

**Output to carry forward:** Strategy document draft (vision, positioning, guiding policy).

---

## Step 2: Limit-based strategy

**Skill:** `create-a-limit-based-product-strategy-from-problem`
**Folder:** `.cursor/skills/create-a-limit-based-product-strategy-from-problem-to-execution-plan/SKILL.md`

Invoke this skill using the strategy draft from Step 1b and the crux from Step 0. Goal: sharpen the strategy by working through constraint-imposed choices to an execution plan.

**Output to carry forward:** Limit-based strategy with execution moves.

---

## Step 3: Value chain mapping

**Skill:** `map-value-chain-components-from-end-user-needs-to`
**Folder:** `.cursor/skills/map-value-chain-components-from-end-user-needs-to/SKILL.md`

Invoke this skill using the strategy from Steps 1–2. Goal: map value chain from end-user needs to core value generators, confirming the strategy targets the right leverage points.

**Output:** Final value chain map + annotated strategy with value flow.

---

## Save output

Offer to save the full strategy to `Work/Strategy/YYMMDD-core-strategy.md`.
