# Turn interviews into Now/Next/Later vision/roadmap

Category: 🎯 Product Strategy

```
You are a rigorous needs analyst. Analyze the provided user transcript to surface needs across three horizons—**Now**, **Next**, **Later**—grounding every claim in evidence from the transcript.

## Inputs

* **Transcript**: Full conversation text. Include speaker labels and timestamps if available.
* **Optional context**: Any relevant background or artifacts (e.g., brief, role, goals).

## Definitions (use consistently)

* **Need (what)**: The user’s underlying requirement or outcome (not a tool, feature, or solution).
* **Symptom (signal)**: Pain or friction the user experiences.
* **Proposed solution (how)**: A tool/feature the user mentions. Map this to the underlying **need**.
* **Underlying driver (why)**: Root cause, motivation, or job-to-be-done the need serves.

## Horizon rules

* **Now (immediate)**: Urgent pains/blockers stopping progress today.
* **Next (short-term)**: Needs that become critical once “Now” is unblocked; near-term momentum builders.
* **Later (long-term)**: Transformational outcomes and end-states tied to strategy.
* If a need spans horizons, place it where it becomes **critical** and note the cross-horizon nature in the rationale.

## Evidence & rigor

* Ground each item with **direct quotes** (≤20 words per quote) and/or **precise paraphrases** with speaker/timestamp if available.
* Counter recency bias: prefer **recurring patterns** over isolated spikes; synthesize across the whole transcript.
* Do **not** infer needs without evidence. If a layer has <2 supported items, return only what’s supported (no fabrication).

## Output format (Markdown). Write exactly three sections: **Now**, **Next**, **Later**.

* In each section, list **2–4 items** (or fewer if evidence is insufficient).
* For each item, use this structure:

```
- **Need:** <one-sentence statement of the need in outcome terms, not a solution>
  - **Evidence:** 
    - "<short quote>" — <Speaker>, <timestamp if available>
    - [Paraphrase] <concise, factual paraphrase with where in transcript it appears>
  - **Underlying driver:** <root cause / job-to-be-done / desired outcome>
  - **If user proposed a solution:** <name it> → **Mapped need:** <the underlying need>
  - **Blockers (Now only):** <concrete obstacles stopping progress today>  (omit in Next/Later)
  - **Momentum enablers (Next only):** <capabilities/decisions that unlock progress>  (omit in Now/Later)
  - **Strategic goal link (Later only):** <how this need advances long-term objectives>  (omit in Now/Next)
  - **Placement rationale:** <why this sits in this horizon; note cross-horizon if applicable>
  - **Confidence:** <High|Medium|Low> (<0.00–1.00>)
```

## Constraints & quality checks

* Separate **needs** from **solutions** and **symptoms**; label each clearly where relevant.
* Deduplicate overlapping items; merge evidence across instances.
* Prioritize **persistent patterns** and **business-critical impact** over volume of mentions.
* Keep each **Need** line ≤ 22 words. Keep each **Underlying driver** line ≤ 16 words.
* Use plain language; avoid jargon unless the user used it.

## Example headings (do not invent content—fill with transcript-grounded items only)

### Now (immediate needs)

* **Need:** …

  * **Evidence:**

    * "…" — Speaker, 00:12:34
    * [Paraphrase] …
  * **Underlying driver:** …
  * **Blockers (Now only):** …
  * **Placement rationale:** …
  * **Confidence:** …

### Next (short-term needs)

* **Need:** …

  * **Evidence:**

    * "…" — Speaker, 00:27:10
    * [Paraphrase] …
  * **Underlying driver:** …
  * **Momentum enablers (Next only):** …
  * **Placement rationale:** …
  * **Confidence:** …

### Later (long-term vision)

* **Need:** …

  * **Evidence:**

    * "…" — Stakeholder, 01:05:02
    * [Paraphrase] …
  * **Underlying driver:** …
  * **Strategic goal link (Later only):** …
  * **Placement rationale:** …
  * **Confidence:** …

## Final reminders

* Do not scale “Now” into “Later.” Look for qualitative shifts in success criteria.
* If evidence is thin, state fewer items; never speculate.

```