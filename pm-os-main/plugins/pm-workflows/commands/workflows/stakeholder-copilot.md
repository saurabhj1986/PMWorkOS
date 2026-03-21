---
name: stakeholder-copilot
description: Navigate stakeholder complexity end-to-end — from power mapping and risk review through message framing, challenging meeting prep, difficult conversations, and executive presence review.
---

# /stakeholder — Stakeholder & Politics Copilot

Walk the user through a 7-step stakeholder management session. Each step invokes a skill from `.cursor/skills/`. Pass the output of each step as input to the next. Confirm with the user before advancing unless they request end-to-end.

---

## Step 1: Map power dynamics before meetings

**Skill:** `map-power-dynamics-before-meetings`
**Folder:** `.cursor/skills/map-power-dynamics-before-meetings/SKILL.md`

Read and invoke this skill. Goal: understand who has formal authority, informal influence, and decision-making power in the relevant stakeholder system before taking any action.

**Output to carry forward:** Power dynamics map — stakeholders, their incentives, relationships, and influence pathways.

---

## Step 2: Stakeholder Power-Interest & Influence Map

**Skill:** `stakeholder-powerinterest-influence-map`
**Folder:** `.cursor/skills/stakeholder-powerinterest-influence-map/SKILL.md`

Invoke this skill using the power dynamics map from Step 1. Goal: plot stakeholders on a Power-Interest grid and add an influence layer — determining who to manage closely, keep satisfied, keep informed, or monitor.

**Output to carry forward:** Power-Interest-Influence map with engagement strategy per quadrant.

---

## Step 3: Stakeholder risk review

**Skill:** `stakeholder-risk-review-for-a-featureprd`
**Folder:** `.cursor/skills/stakeholder-risk-review-for-a-featureprd/SKILL.md`

Invoke this skill using the stakeholder map from Step 2 and the feature or decision at hand. Goal: identify which stakeholders pose the highest risk of blocking, reframing, or derailing the work — and pre-plan mitigations.

**Output to carry forward:** Stakeholder risk register with mitigation moves.

---

## Step 4: Message framing and comms plan

**Skill:** `message-framing-comms-plan-designer`
**Folder:** `.cursor/skills/message-framing-comms-plan-designer/SKILL.md`

Invoke this skill using the stakeholder map and risk register from Steps 2–3. Goal: design tailored messages for each key stakeholder group — framing the narrative to their incentives, concerns, and language.

**Output to carry forward:** Comms plan with audience-specific message frames.

---

## Step 5: Prepare for a challenging meeting

**Skill:** `preparing-for-a-challenging-meeting-with-stakehold`
**Folder:** `.cursor/skills/preparing-for-a-challenging-meeting-with-stakehold/SKILL.md`

Invoke this skill using the comms plan and risk register from Steps 3–4. Goal: walk through the meeting scenario — anticipated objections, counter-arguments, room dynamics, and desired outcomes — so the user enters the meeting prepared.

**Output to carry forward:** Meeting preparation brief with objection handling and desired outcomes.

---

## Step 6: Difficult conversation script

**Skill:** `difficult-conversation-script-5-step-framework`
**Folder:** `.cursor/skills/difficult-conversation-script-5-step-framework/SKILL.md`

Invoke this skill when a specific difficult conversation needs to be scripted. Use the meeting prep from Step 5 as context. Goal: write a structured script using the 5-step framework (open, explore, share, problem-solve, close) for the hardest conversation the user is anticipating.

**Output to carry forward:** Conversation script.

---

## Step 7: Executive presence review

**Skill:** `executive-presence-update-review`
**Folder:** `.cursor/skills/executive-presence-update-review/SKILL.md`

Invoke this skill after the meeting or communication has occurred. Goal: review the user's performance against executive presence markers — conciseness, confidence, clarity, ownership, and composure.

**Output:** Executive presence feedback with 1–2 specific improvements.

---

## Save output

Offer to save the stakeholder plan and comms strategy to `Work/Decisions/YYMMDD-stakeholder-plan.md`.
