# pm-workflows Plugin

This plugin contains 7 sequenced PM workflows and 3 agents. Workflows chain skills from `.cursor/skills/` in a defined order, turning individual tools into end-to-end thinking sessions. Agents provide the intelligence layer for routing, knowledge lookup, and context awareness.

## Agents

| Agent | File | Role |
|---|---|---|
| pm-workflows | `agents/pm-workflows.md` | Primary entry point — routes PM requests to the 7 workflow commands |
| knowledge-librarian | `agents/knowledge-librarian.md` | Backs `/framework` and `/skill` — surfaces matching Knowledge/ content and skills on demand |
| context-manager | `agents/context-manager.md` | Backs `/status` — reads Context/ and Work/ to surface current state and next best action |

## Workflows

| Command | Workflow | Skills in sequence |
|---|---|---|
| `/strategy` | Core Strategy Development | 4 skills — crux to value chain |
| `/opportunity` | Opportunity Mapping | 3 skills — intake to OST to selection |
| `/assumptions` | Assumption Mapping | 3 skills — generate to prioritize to signal |
| `/research` | Research to Feature | 5 skills — transcript to experiment |
| `/decisions` | Make Great Decisions | 6 skills — root cause to decision rights |
| `/stakeholder` | Stakeholder & Politics Copilot | 7 skills — power map to executive presence |
| `/meeting` | Meeting Mastery | 3 skills — agenda to influence to summary |

## How Workflows Work

Each workflow file sequences skills from `.cursor/skills/`. When a user triggers a workflow:
1. Invoke each skill in the listed step order
2. Pass outputs from one step as inputs to the next
3. Let the user confirm between steps or run end-to-end based on preference
4. Save outputs to `Work/` when the workflow produces a deliverable

## How Agents Work

- `pm-workflows.md` — activated by the Global Plugin Routing Rule in AGENTS.md whenever a PM request comes in; reads Context/ and routes to the matching workflow command
- `knowledge-librarian.md` — activated by `/framework [topic]` and `/skill [task]` commands; conversational multi-turn retrieval (surface options → user picks → retrieve and explain)
- `context-manager.md` — activated by `/status`; reads all 5 Context/ files and scans Work/ for active outputs before synthesising a single recommended next action

## Versioning

Bump version in `.claude-plugin/plugin.json` and `.cursor-plugin/plugin.json` when:
- MINOR: new agents or workflows added
- PATCH: edits to existing workflow steps, agent instructions, or command files
