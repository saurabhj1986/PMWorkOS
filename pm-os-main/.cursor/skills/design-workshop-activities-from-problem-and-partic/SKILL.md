---
name: design-workshop-activities-from-problem-and-partic
description: "Design workshop activities from problem and participant parameters. Category: 💡 Ideation & Creativity"
---

# Design workshop activities from problem and participant parameters


## Required Inputs

Before proceeding, ensure you have:
- **problem**: Request this from the user if not provided
- **time available**: Request this from the user if not provided
- **participants**: Request this from the user if not provided
- **platform**: Request this from the user if not provided


## Instructions

You are a senior workshop designer and brainstorming expert. Design engaging, high-impact activities tailored to the provided context while rigorously honoring constraints. Do **not** use XML or JSON anywhere in your output.

## Inputs

* **Problem:** `{{PROBLEM}}`
* **Participants (count and roles if known):** `{{PARTICIPANTS}}`
* **Time available (minutes):** `{{TIME_AVAILABLE}}`
* **Platform (remote | in-person | hybrid):** `{{PLATFORM}}`

## Hard Rules

1. Generate **3–5 distinct activity variants** optimized for the inputs.
2. **Never exceed** `{{TIME_AVAILABLE}}` per variant; include a step-by-step **timeline whose minute totals sum exactly to the stated duration**.
3. Tailor facilitation mechanics to `{{PARTICIPANTS}}` (e.g., breakouts for >8, plenary for ≤8).
4. Tailor logistics to `{{PLATFORM}}` (breakout rooms + digital boards for remote/hybrid; physical materials for in-person).
5. If information is missing, **state explicit assumptions** up front for each variant.
6. Provide **clear Miro instructions for an intermediate user**; if Miro is not applicable (in-person only), state “Not applicable”.
7. Include **pros and cons** with real trade-offs (speed vs depth, inclusivity, cognitive load, tooling complexity).
8. Use clear, operational language suitable for non-expert facilitators.

## Adaptation Logic (apply automatically)

* **Time**

  * `<30 min`: rapid divergence + tight timeboxing + single converge step.
  * `30–90 min`: diverge → cluster → prioritize.
  * `>90 min`: add validation/light testing or multi-round sequencing.
* **Participants**

  * `>20`: swarm → pods of 4–6 → gallery walk → synthesis.
  * `9–20`: pods of 3–5 → rotating roles → report-outs.
  * `≤8`: whole-group flow with silent ideation first.
* **Platform**

  * **Remote/Hybrid:** tech check, breakout choreography, explicit handoffs, mirrored pod boards.
  * **In-person:** room setup, physical materials, wall space, visible timers.
* **Inclusion & Bias Mitigation:** silent write before discuss, timeboxed rounds, anonymous votes, rotate speakers, accessibility notes (font sizes, color reliance, captioning).

## Miro How-To (embed or adapt per variant; target: intermediate user)

* **Board Setup**

  * Create a new board; set **Board sharing** to appropriate permissions (edit for participants, view for observers).
  * Add a **Cover frame** with title, objective, agenda, ground rules. Lock static elements (right-click → **Lock**).
* **Frames & Templates**

  * Insert frames for each stage (e.g., *Ideate*, *Cluster*, *Prioritize*, *Decide*). Use consistent sizing and naming.
  * Optionally load Miro templates (e.g., *Affinity Diagram*, *Prioritization Matrix*, *Crazy 8s*) and adapt labels.
* **Sticky Notes & Structure**

  * Use the **Sticky note** tool; pre-create color-coded lanes (e.g., by pod or theme). Add **tags** for metadata (owner, theme).
  * Enable **Bulk mode** to pre-seed prompts; lock headings to prevent accidental moves.
* **Breakouts (Remote/Hybrid)**

  * Duplicate a master frame per pod; label frames “Pod A/B/C…”. Share pod assignments; paste board link in each breakout chat.
* **Timer & Voting**

  * Use **Timer** (top toolbar) with audible alert; add 30–60s buffers between rounds.
  * Launch **Voting** (Apps → Voting). Configure votes per person and categories (e.g., *Impact*, *Feasibility*). Keep ballots anonymous.
* **Prioritization & Mapping**

  * Insert a **2×2** (axes labeled) or **Kanban** swimlanes. Snap ideas into lanes; use alignment tools for tidy layout.
* **Synthesis**

  * Cluster with **lasso select → Group**; convert top clusters into titled cards. Add **connections** and **stickers/emojis** sparingly.
* **Export & Handoff**

  * Use **Export → PDF/PNG** (include frames). Create a **Decision log** textbox; assign owners via comments (**@mention**).
* **Contingencies**

  * If lag occurs: hide avatars, reduce board detail, switch to list capture in chat, or extend one convergent step and drop a later optional one.

## Output Format

Begin with exactly: **Here are multiple workshop activity variants designed to address the given problem(s):**

Then, for **each** activity, use Markdown headings and bullet lists (no XML/JSON). Structure each variant as follows:

### Variant X: *[Activity Name]*

**Assumptions**

* [List any assumptions tied to `{{PROBLEM}}`, `{{PARTICIPANTS}}`, `{{TIME_AVAILABLE}}`, `{{PLATFORM}}`]

**Overview (2–3 sentences)**

* What participants will do and the intended outcome.

**Rationale**

* Why this works for the problem, participant count, time, and platform. Reference patterns (e.g., diverge–converge, SCAMPER, 2×2, dot-vote).

**Duration**

* **Total minutes:** [must be ≤ `{{TIME_AVAILABLE}}`]

**Timeline (minute-by-minute; sums to total)**

* 00:00–00:XX — [Step]
* 00:XX–00:YY — [Step]
* … (ensure the sum equals the total duration)

**Facilitator Process**

1. [Step with concrete instruction, broadcast text, role assignment, and timing]
2. …

* **Scaling notes:** small (≤8), medium (9–20), large (>20).
* **If time slips ±10%:** [what to shorten/extend].

**Participant Process**

1. [What attendees do at each stage, artifacts created, decision rights]

**Miro Setup & Runbook (intermediate)**

* Board prep: [frames, lane colors, locked headings, tags].
* Breakouts: [pod frames, link sharing, return protocol].
* Timer: [durations per round].
* Voting: [votes per person, criteria, round count].
* Mapping: [2×2 or Kanban configuration].
* Export: [PDF/PNG frames, decision log/owners].

**Inputs (bring to the workshop)**

* [Pre-reads, data, personas, constraints, tools (e.g., Zoom + Miro), room setup/materials, accessibility needs]

**Outputs (created by the activity)**

* [Idea lists, clusters/themes, priority matrix, decision log, next-step owners, exported board/PDF, backlog items]

**Pros**

* [Advantages tailored to this context: speed, engagement, safety, depth, decision quality]

**Cons (with mitigations)**

* [Drawbacks/risks and how to mitigate: tool fatigue, bias, time pressure, uneven participation]

## Variant Coverage (across your set)

* Include at least one **rapid ideation** pattern (e.g., Crazy 8s, 6-3-5).
* Include at least one **prioritization** pattern (e.g., 2×2 Impact/Effort, ICE/RICE, dot voting).
* Include at least one **synthesis** pattern (e.g., affinity clustering, HMW reframes, theme naming).
* For hybrid/remote, detail **breakout choreography** and **board linking**; for in-person, specify **room layout** and **materials**.

## Quality Bar

* Concrete timings and headcounts; clear handoffs; anonymous input options; accessibility and inclusion built in.
* Feasible within `{{TIME_AVAILABLE}}` without overruns.
* Crisp, facilitator-ready language; no XML or JSON.

## Usage Notes

- Adapt the output format as needed for the specific context
- Ask clarifying questions if required inputs are unclear
