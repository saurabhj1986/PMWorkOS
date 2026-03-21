---
name: research-to-feature
description: Transform raw interview transcripts into a tested feature hypothesis — from transcript cleanup through JTBD extraction, clustering, hypothesis formation, and experiment design.
---

# /research — Research to Feature

Walk the user through a 5-step research synthesis session. Each step invokes a skill from `.cursor/skills/`. Pass the output of each step as input to the next. Confirm with the user before advancing unless they request end-to-end.

---

## Step 1: Clean up raw interview transcripts

**Skill:** `clean-up-raw-interview-transcripts`
**Folder:** `.cursor/skills/clean-up-raw-interview-transcripts/SKILL.md`

Read and invoke this skill. Goal: take messy, verbatim interview transcripts and produce clean, structured versions with speaker labels, timestamps normalized, and filler removed — ready for analysis.

**Output to carry forward:** Clean interview transcripts.

---

## Step 2: Extract customer insights using JTBD framework

**Skill:** `extract-customer-insights-from-interview-transcrip`
**Folder:** `.cursor/skills/extract-customer-insights-from-interview-transcrip/SKILL.md`

Invoke this skill using the clean transcripts from Step 1. Goal: extract structured Jobs-to-be-Done insights — functional, emotional, and social jobs; struggles; workarounds; desired outcomes.

**Output to carry forward:** JTBD insight set per interview, tagged by job type and intensity.

---

## Step 3: Cluster JTBD forces

**Skill:** `transform-interview-data-into-clustered-jtbd-force`
**Folder:** `.cursor/skills/transform-interview-data-into-clustered-jtbd-force/SKILL.md`

Invoke this skill using the JTBD insights from Step 2. Goal: cluster forces of progress (push, pull, anxiety, inertia) across interviews to reveal the strongest demand signals.

**Output to carry forward:** Clustered JTBD forces map showing dominant pushes, pulls, anxieties, and habits across participants.

---

## Step 4: Create structured product hypotheses

**Skill:** `create-structured-product-hypotheses-from-product`
**Folder:** `.cursor/skills/create-structured-product-hypotheses-from-product/SKILL.md`

Invoke this skill using the clustered forces from Step 3. Goal: translate the dominant demand signals into 1–3 structured product hypotheses in the format: "We believe [user] will [behavior] because [insight], which will result in [outcome]."

**Output to carry forward:** 1–3 testable product hypotheses ranked by confidence and impact.

---

## Step 5: Design robust experiments

**Skill:** `design-robust-experiments-from-goals-and-systems`
**Folder:** `.cursor/skills/design-robust-experiments-from-goals-and-systems/SKILL.md`

Invoke this skill using the product hypotheses from Step 4. Goal: design the minimum viable experiment to test each hypothesis — method, metric, minimum detectable effect, sample size, stop/scale rules.

**Output:** Experiment designs (1 per hypothesis) with full test plans.

---

## Save output

Offer to save the full research synthesis and experiment plan to `Work/Research/YYMMDD-research-to-feature.md`.
