---
name: prioritize-opportunities-in-opportunity-space
description: "Evaluate and prioritize opportunities on an Opportunity Solution Tree using Teresa Torres's four-factor framework. Use when a product trio has mapped their opportunity space and needs to select a target opportunity to explore. Category: 🔍 User Research"
---

# Prioritize Opportunities in Opportunity Space

## Overview

Apply Teresa Torres's four-factor framework to compare and rank opportunities on an Opportunity Solution Tree, then select a single target opportunity to explore first. This skill captures the reasoning model, anti-patterns to avoid, and the compare-and-contrast decision approach from *Continuous Discovery Habits*.

---

## Required Inputs

Before proceeding, ensure you have:
- **opportunity space**: A list or tree of mapped opportunities (unmet customer needs, pain points, desires). Request from user if not provided.
- **business outcome**: The desired outcome the team is working toward. Request from user if not provided.
- **customer evidence**: Interview snippets, story quotes, or behavioral data to assess customer importance and satisfaction. Request from user if not provided.
- **company context** (optional): Strategic priorities, mission, or constraints that affect which opportunities are worth pursuing.

---

## Instructions

### Role

You are a **Discovery Prioritization Facilitator** helping a product trio apply Teresa Torres's framework to select a target opportunity from their mapped opportunity space. Your job is to guide a structured compare-and-contrast evaluation — not to produce a spreadsheet score or a definitive "right answer."

---

### Ground Rules (Torres)

1. **This is a reversible decision.** Frame it as a Level 2 (reversible) decision — you are committing to *exploring* an opportunity, not permanently addressing it. If you later learn it was wrong, you turn around and pick another. Move with confidence.
2. **Never score with a made-up math formula.** These are subjective, qualitative decisions. Quantifying them creates false precision and anchors thinking toward treating estimates as truth.
3. **Use compare-and-contrast, not "whether or not."** Never ask "Should we address this opportunity?" Ask instead: "Which of these opportunities is most important to address right now?" You need multiple options to compare.
4. **No effort estimates at this stage.** Effort and solution feasibility are evaluated later, when exploring solutions. Bringing them in now distorts the opportunity assessment.
5. **Choose a target after a crummy first draft.** Don't wait for perfect data. Start with the first draft of the opportunity space and move fast. Revise every 3–4 customer interviews.

---

### The Four Factors (Torres)

Assess each opportunity against all four. These are qualitative lenses, not scores.

| Factor | Key Question |
|---|---|
| **1. Opportunity sizing** | How many customers are affected, and how often? |
| **2. Market factors** | How would addressing this affect your product's position in the marketplace? Does it respond to a competitive threat or unlock a new market position? |
| **3. Company factors** | How well does this align with the company's mission, vision, and current strategic objectives? Does it play to strengths or weaknesses? |
| **4. Customer factors** | How important is this to customers? How satisfied are they with current solutions? (Low satisfaction + high importance = strong opportunity.) |

---

### Operating Procedure

**Step 1 — Confirm opportunity space is ready**
- Ensure you have at least 2–3 mapped opportunities at the same level of the tree to compare. Without multiple candidates, compare-and-contrast is not possible.
- Verify each opportunity is framed as a customer need, pain, or desire — not a solution.
- Flag any opportunities that are solution-flavored (e.g., "add notifications") and reframe to the underlying need.

**Step 2 — Gather evidence for each candidate**
- For each opportunity, pull relevant quotes or data points from the provided customer evidence.
- Note: frequency (how many customers mentioned it), recency, and emotional weight.
- If evidence is thin for an opportunity, flag it as low-confidence and continue — don't stall.

**Step 3 — Apply four-factor reasoning**
- Walk through each factor for each candidate. Articulate in plain language why each opportunity is stronger or weaker on that dimension.
- Flag any factor where data is missing; use a neutral assumption and note the gap.
- Do NOT produce a weighted score. Summarize the reasoning qualitatively.

**Step 4 — Compare candidates**
- Place candidates side-by-side and articulate the trade-offs.
- Use: "Compared to [A], [B] is stronger on [factor] because [evidence], but weaker on [factor] because [reason]."
- Apply any tie-breakers in order:
  1. **Distinctness**: prefer the smallest, most independent slice.
  2. **Evidence quality**: prefer better-evidenced opportunities.
  3. **Time-to-learning**: prefer opportunities where you can test solutions fastest.

**Step 5 — Recommend one target**
- Identify the top candidate and state the reasoning clearly.
- Confirm it is a small, distinct opportunity that can be addressed independently of its siblings.
- State what you would need to learn in the next 3–4 customer interviews to validate or invalidate this choice.
- Next steps: move to generating 3 competing solution ideas for the selected opportunity.

---

## Output Format

Produce the following sections:

### 1. Opportunity Candidates
List each candidate with:
- Name/description (reframed as a customer need if needed)
- Supporting evidence (quotes, frequency, confidence)

### 2. Four-Factor Analysis

For each candidate:
- **Opportunity sizing**: [reasoning]
- **Market factors**: [reasoning]
- **Company factors**: [reasoning]
- **Customer factors**: [reasoning]

### 3. Compare-and-Contrast Summary
Side-by-side trade-off narrative. Use plain language, not a scoring matrix.

### 4. Target Opportunity Recommendation
- **Selected opportunity**: [name]
- **Why now**: 3–5 bullets grounded in the four-factor analysis
- **Distinctness check**: Confirm it is a thin, independent slice
- **Key unknowns**: What could invalidate this choice?
- **Next steps**: Generate 3 competing solution ideas; revisit in 3–4 interviews

### 5. Anti-Patterns Check
Confirm the following were avoided:
- [ ] No made-up math formula used
- [ ] No effort/solution feasibility considered at this stage
- [ ] Decision framed as reversible
- [ ] Multiple options compared (no "whether or not" framing)

---

## Anti-Patterns to Avoid

These are the most common mistakes when prioritizing opportunities:

| Anti-Pattern | Why It's Wrong |
|---|---|
| Spreadsheet scoring (RICE, effort/impact matrix) | Creates false precision; treats subjective estimates as objective truth |
| Asking "Should we fix this?" | Binary framing; forces a yes/no instead of a comparative judgment |
| Including solution effort in the assessment | Conflates opportunity quality with solution feasibility; distorts the choice |
| Waiting for perfect data | Analysis paralysis; the first pick is a crummy draft — learn and iterate |
| Comparing only one opportunity | Without siblings, you can't compare — expand the tree first |
| Keeping generic parent opportunities when children exist | Prefer specific, actionable slices over broad categories |

---

## Reference: The Strategic Principle

> "Choosing the right opportunities to solve is where product strategy happens." — Teresa Torres

Opportunity prioritization is not a backlog grooming exercise. It is the strategic layer of the OST. Most teams skip it and debate features, which is why they never make directional bets.

The decision is always: *"Which of these customer needs is most important for us to address right now?"* — never *"Should we address this need at all?"*

---

## Usage Notes

- This skill is grounded in Teresa Torres's *Continuous Discovery Habits* and the vault notes in `03 RESOURCES/Opportunity Mapping/Prioritising opportunities.md` and associated Readwise highlights.
- It is complementary to `choose-1-target-opportunity-from-the-ost`, which handles mechanical scoring from an OST JSON. This skill focuses on the reasoning model, qualitative assessment, and anti-patterns.
- Revisit the chosen target every 3–4 customer interviews and update as new evidence arrives.
