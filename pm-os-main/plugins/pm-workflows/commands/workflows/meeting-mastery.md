---
name: meeting-mastery
description: Run high-impact meetings — surface hidden agendas before, apply influence principles during, and capture structured summaries after.
---

# /meeting — Meeting Mastery

Walk the user through a 3-step meeting session. Steps are numbered 3–5 to reflect their position in the broader stakeholder workflow (steps 1–2 are the stakeholder copilot's power mapping and influence map). Each step invokes a skill from `.cursor/skills/`. Confirm with the user before advancing unless they request end-to-end.

---

## Step 3: Identify potential hidden agendas

**Skill:** `identify-potential-hidden-agendas`
**Folder:** `.cursor/skills/identify-potential-hidden-agendas/SKILL.md`

Read and invoke this skill. Goal: surface what each attendee likely wants from the meeting beyond the stated agenda — their real objectives, fears, and motivations — so the user can navigate rather than react.

**Output to carry forward:** Hidden agenda map per key attendee with likely underlying motivations.

---

## Step 4: Apply Cialdini's influence principles

**Skill:** `generate-influence-strategies-from-cialdinis-7-pri`
**Folder:** `.cursor/skills/generate-influence-strategies-from-cialdinis-7-pri/SKILL.md`

Invoke this skill using the hidden agenda map from Step 3. Goal: design influence strategies using Cialdini's 7 principles (reciprocity, commitment, social proof, authority, liking, scarcity, unity) tailored to each key attendee.

**Output to carry forward:** Influence strategy per attendee with specific tactics.

---

## Step 5: Create a structured meeting summary

**Skill:** `create-structured-meeting-summaries-from-meeting-t`
**Folder:** `.cursor/skills/create-structured-meeting-summaries-from-meeting-t/SKILL.md`

Invoke this skill after the meeting using the transcript or notes provided by the user. Goal: apply the IDEAS framework (Issues, Decisions, Evidence, Actions, Sentiments) to produce a structured, actionable meeting summary.

**Output:** Meeting summary in IDEAS format with owners and deadlines for all actions.

---

## Save output

Offer to save the meeting summary to `Work/YYMMDD-meeting-summary.md`.
