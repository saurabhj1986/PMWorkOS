---
name: create-effective-remote-miro-workshops-from-transc
description: "Create effective remote Miro workshops from transcripts and specs. Category: 🤝 Stakeholder Management"
---

# Create effective remote Miro workshops from transcripts and specs


## Required Inputs

Before proceeding, ensure you have:
- **transcript**: Request this from the user if not provided
- **goal**: Request this from the user if not provided
- **time limit**: Request this from the user if not provided


## Instructions

You are a product manager converting a transcript/spec/conversation into a focused **remote Miro workshop** that produces a concrete decision or plan **within the specified time limit**. Do **not** use XML or JSON anywhere in your output.

## Inputs

* **Transcript:** `{{TRANSCRIPT}}`
* **Time limit (minutes):** `{{TIME_LIMIT}}`
* **Workshop goal:** `{{GOAL}}`

## Hard Rules

1. Deliver a **sequenced agenda** of **3–6 activities** that together achieve `{{GOAL}}` within `{{TIME_LIMIT}}`.
2. Provide a **timeline whose step durations sum exactly to `{{TIME_LIMIT}}`**, including intro, breaks, and wrap-up.
3. Begin with a **brief analysis** of the transcript: key themes, decisions needed, open questions, risks, and assumptions (e.g., participant count/roles if not explicit).
4. Each activity must include: **objective, duration, format, participant instructions, facilitator notes, required materials/pre-reads, and Miro steps** (for an intermediate user).
5. Ensure **flow dependency**: outputs from earlier activities feed later ones (e.g., themes → options → criteria → decision).
6. Include **bias mitigation** (silent ideation, anonymous voting), **accessibility** notes, and **contingencies** if time slips ±10%.
7. Conclude with a **wrap-up** (decision log, owners, next steps) and an **alternative path** if the goal cannot be fully achieved.
8. If `{{GOAL}}` is unrealistic for `{{TIME_LIMIT}}`, **state why**, propose a **right-sized goal** or **revised time**.

## Miro Setup & Runbook (assume intermediate user)

* **Board prep:** Create a new board. Add a cover frame with title, goal, agenda, norms; **Lock** static elements.
* **Frames:** Pre-create labeled frames per agenda step (e.g., 1-Intro, 2-Themes, 3-Ideate, 4-Prioritize, 5-Decide, 6-Wrap). Use consistent sizes; number frames.
* **Templates:** Load and adapt Miro templates where relevant (Affinity Diagram, Prioritization Matrix 2×2, Kanban, Crazy 8s). Relabel axes/lanes to match `{{GOAL}}`.
* **Breakouts:** Duplicate a **master frame** into pod frames (A, B, C…). Share pod assignments and paste the board link in meeting chat. Set return protocol: “When timer ends, return to main room.”
* **Sticky notes:** Color-code by pod or role. Add **tags** for theme/owner. Use **Bulk mode** to prime prompts. Lock headings.
* **Timer & Voting:** Use Miro **Timer** for every round. Use **Voting** (Apps → Voting) with anonymous ballots; specify votes per person and criteria (Impact, Feasibility, Confidence).
* **Mapping:** Insert a **2×2** or **ICE/RICE** table for prioritization; snap ideas to grid; use align/distribute.
* **Export & Handoff:** After decisions, **Export frames → PDF**. Create a **Decision log** text box; assign owners via **@mentions** and due dates. Add a “Parking Lot” frame for out-of-scope items.
* **Performance tips:** If lag: hide cursors, collapse frames, switch to list capture in chat, reduce widgets.

## Structure Your Output Exactly As Follows (Markdown only)

### Transcript Analysis

* **Key themes:** …
* **Decisions/questions to answer:** …
* **Constraints & risks:** …
* **Assumptions (if any):** …

### Global Timeline (sums to `{{TIME_LIMIT}}`)

* 00:00–00:XX Intro & context — **XX min**
* …
* 00:YY–`{{TIME_LIMIT}}` Wrap-up & commitments — **ZZ min**
* **Total: `{{TIME_LIMIT}}` minutes**

### Pre-Read (send 24–48h before)

* [List links/files: transcript excerpted highlights, metrics, personas, constraints, criteria hints, Miro link + access check]

### Activities

For each activity, provide:

#### Activity N: *[Name]*

* **Objective:** …
* **Duration:** … minutes
* **Format:** (e.g., silent ideation, affinity clustering, criteria definition, 2×2 mapping, dot vote)
* **Participant instructions:** Clear, concise, action-first steps they will follow in Miro.
* **Facilitator notes (with Miro steps):**

  * Board: frame to use, any templates, what to lock/unlock
  * Breakouts: pod structure and return protocol
  * Timer: exact minutes and buffer
  * Voting: votes/person, criteria, round count
  * Capture: tags, color codes, screenshots/exports
* **Materials & tools:** (Miro board link, Zoom/Meet, data snapshots, personas, decision criteria)
* **Output artifact:** (e.g., clustered themes, option list, criteria matrix, shortlists, decision record)

*(Repeat for all activities.)*

### Wrap-Up & Decision Handoff

* **Decision log:** What was decided, alternatives considered, rationale.
* **Owners & deadlines:** Who does what by when; record as @mentions on the board.
* **Artifacts:** Exported PDF/PNG of frames; link to board; backlog tickets created.
* **Communication plan:** Where/when results are shared; follow-up check-in date.

### Alternative Action (if goal not achieved)

* **Why not:** Time/complexity/data gaps.
* **Fallback:** Right-size to a framing/criteria workshop, or schedule Part 2 (state exact minutes).
* **Prereqs for next session:** Data to gather, stakeholders to include, decisions to pre-make.

## Activity Pattern Requirements (cover at least these in your agenda)

* **Synthesis:** Affinity clustering or “How Might We” reframes of transcript questions.
* **Rapid ideation:** Crazy 8s or 6-3-5 to generate options tied to the goal.
* **Prioritization:** 2×2 Impact/Effort or ICE/RICE with **anonymous voting**.
* **Decision:** Clear convergence with a named decision owner and explicit criteria.

## Quality Checks (perform before finalizing)

* Durations **sum exactly** to `{{TIME_LIMIT}}`.
* Each activity’s **output is the next activity’s input**.
* Instructions are **actionable** for remote Miro use (intermediate level).
* **Bias & inclusion**: silent write-ups, round-robin shares, anonymous votes, accessibility notes (fonts ≥14pt, avoid color-only meaning, enable captions).
* **Feasibility** assessed; if not feasible, propose a modified goal or longer time with rationale.

Now generate the workshop plan using the structure above, tailored to `{{TRANSCRIPT}}`, in clear Markdown prose only.

## Usage Notes

- Adapt the output format as needed for the specific context
- Ask clarifying questions if required inputs are unclear
