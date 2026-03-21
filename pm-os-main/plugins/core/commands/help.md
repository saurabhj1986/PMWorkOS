---
name: help
description: Dynamic system tour — reads actual project structure before responding so the tour reflects what is really in the system
---

# /help — System Tour

**Do not generate output from memory or hardcoded content. Read the actual project structure first.**

Before writing anything visible to the user, execute the following reads in order:

1. List all folders in `plugins/` to identify which plugins are active
2. For each plugin folder (excluding `core/`), read its `agents/*.md` file to get the current persona and capabilities
3. List all files in `plugins/*/commands/` to build the complete current command list
4. Read `Knowledge/INDEX.md` to get the current framework and content counts
5. Read `Context/GOALS.md` — if it does not contain placeholder text, use the user's stated focus to personalize the recommendation at the end

Only after completing all reads above, generate the tour below. Everything you present must come from what you actually found in those files — not from what you recall or what was true when this command was written.

---

## Tour Structure

### 1. What this system is

Open with 3 bullet points that accurately describe the PM OS based on what you found:
- What it contains (plugins, frameworks, skills — use real counts)
- How it works (AI reads context + knowledge files, routes to the right plugin)
- What it is not (a generic chatbot — it's grounded in your specific situation)

Draw from `README.md` if needed for positioning language, but verify counts against what you actually found.

### 2. Plugins

For each plugin you found in `plugins/` (excluding `core/`), present:
- Plugin name (as found in the folder)
- What it does — pulled from that plugin's `agents/*.md` file, not paraphrased from memory
- Which commands are available — pulled from that plugin's `commands/` folder

Format this as a clean table or structured list.

### 3. Commands reference

List every slash command found across all `plugins/*/commands/` files, including `plugins/core/commands/`.

Group them logically:
- **Setup:** /start, /help
- **Strategy:** any commands found in pm-strategy
- **Research:** any commands found in pm-research
- **Specs:** any commands found in pm-specs
- **Influence:** any commands found in pm-influence
- **Career:** any commands found in pm-career

For each command: name + one-line description (from the command file's frontmatter `description` field).

### 4. How skills work

Explain that skills activate automatically based on what the user asks — no slash command needed. The user just describes what they want to do, and the right skill is invoked.

Give 2–3 concrete examples relevant to what you found in `Context/GOALS.md`. If GOALS.md is not filled, give generic examples instead:
- "Create a stakeholder update" → activates a communication skill
- "Help me prioritize these 5 features" → activates a prioritization skill
- "I need to run a customer interview" → activates a research skill

### 5. Pre-installed MCP servers

Check `.cursor/mcp.json` for any pre-installed MCP servers. For each one found, present:
- Server name
- What it provides (one sentence)
- Tools available

Note that these are live tools that work automatically — Cursor uses them when relevant to the user's request. No setup required beyond having Cursor open.

If no `.cursor/mcp.json` exists or it has no servers, skip this section.

### 6. Recommended next step

Based on what you found in `Context/GOALS.md`:

- If GOALS.md is filled (no placeholder text): identify the user's stated quarterly focus and recommend the single most relevant command, with a one-sentence explanation of why it fits their situation.
- If GOALS.md is empty or placeholder: recommend `/start` to set up context, explaining that the system works best when it knows their specific situation.

Do not list multiple options here. One clear recommendation with a reason.
