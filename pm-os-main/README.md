# Product Manager's OS

**Your AI thinking partner, grounded in frameworks and tuned to your context.**

---

## Model recommendation

**Use the most capable model available to you. Do not use the Auto model selector.**

PM OS rules require multi-constraint reasoning on every turn — routing, citations, deliverable gating, question discipline. Weaker models fail these rules even on fresh sessions with no context pressure. Stronger models hold reliably.

Tested and recommended:
- **Claude Sonnet or Opus** (Anthropic) — use the latest available
- **GPT-4o or o-series** (OpenAI) — use the latest available
- **Gemini 1.5 Pro or 2.0** (Google) — use the latest available

Avoid Haiku-class models (Anthropic), mini/nano models (OpenAI), or Flash-class models (Google). These are too weak to follow PM OS's instruction set reliably, regardless of how well your context files are filled.

The Auto model selector in Cursor may route messages to weaker models based on perceived simplicity. PM OS messages are never simple — disable Auto and pin to a capable model in Cursor's model settings.

---

## Get started in 5 minutes

PM OS ships with 190+ skills and 168 frameworks, but none of that matters until the AI knows who you are.

The `Context/` folder has 5 files — company, product, team, goals, constraints. They're empty right now. The AI reads all five before every response. Empty files = generic advice. Filled files = advice that accounts for your actual constraints, your actual team, and your actual product stage.

**Step 1: Run `/start`**

```
/start
```

The AI asks you questions about your company, product, team, goals, and constraints — and fills in the `Context/` files as you answer. Takes about 5 minutes. You can always come back and update them.

**Step 2: Ask something real**

Don't test it with a hypothetical. Ask about something you're actually working on right now:

```
I need to figure out what to prioritize for Q2. Here are the 6 things on the table: [list them]
```

The difference between a context-filled and context-empty response will be immediately obvious.

---

## Your first real session

Pick the scenario that matches your biggest challenge this week.

**"I need to clarify my product strategy"**
```
/workflow:strategy
```
Walks you through: what problem you're solving → who it's for → what's unique → competitive position. Produces a strategy kernel you can share.

**"I have a hard decision to make"**
```
/workflow:decisions
```
Walks you through: root cause → reversibility → options → recommendation. Produces a decision journal entry with reasoning.

**"I just ran customer interviews and need to make sense of them"**
```
/workflow:research
```
Walks you through: transcript cleanup → JTBD extraction → insight clustering → hypothesis → experiment design.

**"I have a tricky stakeholder situation"**
```
/workflow:stakeholder
```
Walks you through: power mapping → influence mapping → communication plan → meeting prep script.

**"I need to find the right problem to solve"**
```
/workflow:opportunity
```
Walks you through: OST intake → opportunity tree → selecting one target to pursue.

**"I need to validate before we build"**
```
/workflow:assumptions
```
Walks you through: generating assumptions → prioritizing by risk → identifying the fastest validation signal.

**"I have a meeting I need to prepare for"**
```
/workflow:meeting
```
Walks you through: uncovering hidden agendas → influence tactics → building a structured summary and script.

Not sure which one fits? Ask:
```
/status
```
The AI reads your context and active work, then tells you what to focus on.

<!-- IMAGE: A screenshot of a /workflow:strategy or /workflow:decisions response in Cursor chat would be ideal here -->
<!-- Suggested: Show the multi-step output with the strategy kernel filled in for a real product -->
<!-- ![First session example](images/first-session.png) -->

---

## Your first week

**Day 1**
Run `/start`. Then ask one real question about something you're working on right now — not a test, a real problem. Save any useful output by asking the AI: "save this to Work/."

**Day 3**
Run one full workflow end-to-end. Pick the scenario above that matches your most pressing challenge. Give it real context (paste in actual notes, constraints, stakeholder names). The output should be shareable.

**Day 7**
Type `/status`. It reads your context files and any work you've saved, and gives you a grounded assessment of what to focus on next. Make this a weekly habit.

---

## Reference

Everything below is for when you need to look something up. You don't need to read it to get started.

---

### The 7 workflows

Each workflow is a sequenced multi-step thinking session — not a single prompt. The AI asks the right questions in the right order.

> Workflow commands use a `workflow:` prefix and won't appear in Cursor's autocomplete — type them directly and they trigger correctly.

| Command | Workflow | What it produces |
|---------|----------|-----------------|
| `/workflow:strategy` | Core Strategy Development | Strategy kernel → competitive analysis → value chain |
| `/workflow:opportunity` | Opportunity Mapping | OST intake → opportunity tree → one selected target |
| `/workflow:assumptions` | Assumption Mapping | Assumption list → risk prioritization → validation plan |
| `/workflow:research` | Research to Feature | Transcript cleanup → JTBD → clustering → hypothesis → experiment |
| `/workflow:decisions` | Make Great Decisions | Root cause → reversibility → MECE analysis → decision journal |
| `/workflow:stakeholder` | Stakeholder & Politics Copilot | Power map → influence map → comms plan → meeting script |
| `/workflow:meeting` | Meeting Mastery | Hidden agendas → influence tactics → structured summary |

---

### All slash commands

**System commands** — appear in Cursor's autocomplete when you type `/`:

| Command | What it does |
|---------|--------------|
| `/start` | Set up your personal context (do this first) |
| `/help` | Dynamic system tour — shows what's actually in your install |
| `/status` | Review your context and get a recommended next action |
| `/framework [topic]` | Find frameworks for a topic (e.g., `/framework prioritization`) |
| `/skill [task]` | Search for a skill by task description |

**Workflow commands** — type directly, won't appear in autocomplete but trigger correctly:

| Command | What it does |
|---------|--------------|
| `/workflow:strategy` | Run the Core Strategy Development workflow |
| `/workflow:opportunity` | Run the Opportunity Mapping workflow |
| `/workflow:assumptions` | Run the Assumption Mapping workflow |
| `/workflow:research` | Run the Research to Feature workflow |
| `/workflow:decisions` | Run the Make Great Decisions workflow |
| `/workflow:stakeholder` | Run the Stakeholder & Politics Copilot workflow |
| `/workflow:meeting` | Run the Meeting Mastery workflow |

---

### Skills by category

190+ skills are invoked automatically — just describe what you need in plain language.

| Category | Skills | Example |
|----------|--------|---------|
| 🔍 User Research | 30 | Extract JTBD from interview transcripts |
| 🎯 Product Strategy | 30 | Build a strategy kernel from scratch |
| 🤝 Stakeholder Management | 24 | Map power dynamics before a meeting |
| 📊 Business Analysis | 23 | Diagnose a metric drop step-by-step |
| 🌱 Personal Productivity | 21 | Take control of your week |
| 🎨 Design & Prototyping | 12 | Generate wireframe descriptions |
| 🤔 Decision Making | 10 | Create a structured decision journal |
| 🗣️ Presentation & Communication | 10 | Write a status update people actually read |
| 📅 Project Management | 9 | Build a project plan from a brief |
| 💡 Ideation & Creativity | 7 | Generate disruptive strategy ideas |
| 💾 Technical | 5 | Design an event tracking schema |
| ⛳ Job Search | 4 | Convert work experiences into STAR stories |

Type `/skill [task]` to find a skill by what you want to do.

<!-- IMAGE: A screenshot showing a skill being auto-triggered in the chat (e.g., typing "create a stakeholder map" and seeing the skill activate) -->
<!-- ![Skill auto-trigger example](images/skill-trigger.png) -->

---

### The knowledge library

168 frameworks back the AI's reasoning — it references them before forming any opinion. Here's what's in `Knowledge/`:

```
Knowledge/
├── Frameworks/
│   ├── discovery/      # 69 frameworks  (JTBD, Lean Canvas, OST, Wardley Maps…)
│   ├── validation/     # 33 frameworks  (A/B test design, Kano, Wizard of Oz…)
│   ├── build/          #  8 frameworks  (RICE, Shape Up, stakeholder scoring…)
│   └── grow/           #  8 frameworks  (Hooked Model, North Star, GTM…)
├── Prioritization/     # 50 frameworks  (ICE, GIST, DHM, BRICE, Kano…)
├── Interview-Questions/# 100 questions  (6 categories)
├── Metrics/
│   └── north-star-examples/ # 41 real company examples
├── PM Tasks/           # 25 practice drills
└── Resources/
    └── Lenny-Newsletter/    # 260 curated articles (indexed)
```

Browse `Knowledge/INDEX.md` for a full map.

---

### Pre-installed MCP servers

MCP (Model Context Protocol) servers give the AI live access to external tools and data — beyond the static files in `Knowledge/`. These are pre-configured in `.cursor/mcp.json` and work automatically. No setup required.

| Server | Source | What it does |
|--------|--------|--------------|
| `lenny-podcast` | [akshayvkt/lenny-mcp](https://github.com/akshayvkt/lenny-mcp) | Search 284 Lenny's Podcast episode transcripts by topic or guest |

**How it works:** When you ask about something a podcast guest discussed, the AI searches the transcripts directly. Try:

```
What has Shreyas Doshi said about prioritization on Lenny's podcast?
```

```
Search Lenny's podcast for advice on building growth teams
```

This complements the 260 curated newsletter articles in `Knowledge/Resources/Lenny-Newsletter/` — podcast transcripts and newsletter articles are different content from the same source.

**Adding your own MCPs:** Edit `.cursor/mcp.json` to add more servers. See [Cursor's MCP docs](https://cursor.com/help/customization/mcp) for the format.

---

### Your context files

The AI reads all five of these before every response. Fill them in with `/start` or edit them directly.

| File | What to put in it |
|------|-------------------|
| `COMPANY.md` | Company overview, metrics, business model, competitors |
| `PRODUCTS.md` | What you're building, stage, KPIs, current priorities |
| `GOALS.md` | Your current PM goals and OKRs |
| `TEAM.md` | Team structure, key stakeholders, working style |
| `CONSTRAINTS.md` | Budget, timeline, tech, and political constraints |

Update these when priorities shift — `/start` can re-run the intake for any individual file.

---

### PRD templates

7 formats in `Templates/` — ask the AI which format fits your situation, or request one by name.

| Template | Best for |
|----------|----------|
| `amazon-prfaq.md` | Working backwards from a customer outcome |
| `feature-prd.md` | Standard feature specification |
| `shape-up-pitch.md` | Shape Up betting table format |
| `lean-ux-canvas.md` | Lean UX problem framing |
| `lenny-1-pager.md` | Quick single-page brief |
| `intercom-intermission.md` | Intercom's internal brief format |
| `kevin-yien-prd.md` | Kevin Yien's concise PM brief |

---

### Folder structure

```
pm-os/
├── AGENTS.md               # The system brain — operating rules for the AI
├── Context/                # Your context (fill with /start)
│   ├── COMPANY.md
│   ├── PRODUCTS.md
│   ├── GOALS.md
│   ├── TEAM.md
│   └── CONSTRAINTS.md
├── Knowledge/              # 349 reference files across frameworks, questions, drills
├── Templates/              # 7 PRD formats
├── plugins/                # Core + pm-workflows plugin definitions
│   ├── core/               # /start, /help, /status, /framework, /skill
│   └── pm-workflows/       # 7 workflow agents + commands
├── Work/                   # Your output folder (PRDs, research, decisions)
├── external-skills/        # Registry + sync script for vendored skills
├── .cursor/
│   ├── mcp.json            # Pre-installed MCP servers (Lenny Podcast, etc.)
│   ├── commands/           # Slash commands (/start, /help, /status, /framework, /skill)
│   │   └── workflow/       # Workflow commands (/workflow:strategy, /workflow:decisions…)
│   └── skills/             # 190+ skills (auto-available in Cursor)
```

---

### Customizing

Edit `AGENTS.md` to change how the AI behaves:

- Change the tone (more formal, more direct, more coaching)
- Add company-specific frameworks or terminology
- Modify default behaviors for any workflow
- Add context-specific instructions for your industry

---

### External skills

PM OS bundles a curated set of third-party skills. They work immediately — no setup required.

| Skill | Source | What it does |
|-------|--------|--------------|
| `shaping` | [rjs/shaping-skills](https://github.com/rjs/shaping-skills) | Shape problems + solution options (Shape Up) |
| `breadboarding` | [rjs/shaping-skills](https://github.com/rjs/shaping-skills) | Map UI affordances and their wiring |
| `breadboard-reflection` | [rjs/shaping-skills](https://github.com/rjs/shaping-skills) | Find and fix design smells in a breadboard |
| `frontend-slides` | [zarazhangrui/frontend-slides](https://github.com/zarazhangrui/frontend-slides) | Build animation-rich HTML presentations |

These are not maintained by prodmgmt.world. To pull the latest versions:

```bash
./external-skills/update.sh
```

See [`external-skills/README.md`](external-skills/README.md) for attribution and instructions for adding new sources.

---

## Upgrading

When a new version of PM OS is released, download the new zip and run the migration tool to bring your context, work files, custom skills, and learnings into the new version:

```bash
# From inside the NEW project folder
python3 migrate.py /path/to/your-old-pm-os-folder
```

Use `--dry-run` first to preview what will be migrated without changing anything. The tool handles everything — your Context files, Work folder, installed skills, AGENTS.md learnings, and any other customizations you've made.

---

## Support

Questions? Visit [prodmgmt.world](https://prodmgmt.world) or open an issue.

---

*Product Manager's OS v1.0 · [prodmgmt.world](https://prodmgmt.world)*
