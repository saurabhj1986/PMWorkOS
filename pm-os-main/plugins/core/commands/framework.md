# /framework [topic]

Search across all Knowledge folders and surface the best matching frameworks for any PM topic.

## When to use

Type `/framework` followed by a topic, problem, or question. Examples:

- `/framework prioritization`
- `/framework how to map stakeholder power`
- `/framework early-stage discovery`
- `/framework what to measure for growth`

## How it runs

1. Read `Knowledge/INDEX.md` — this is the master map of all frameworks, articles, and exercises
2. Delegate to `plugins/pm-workflows/agents/knowledge-librarian.md` for matching and retrieval
3. Present top 3–5 matches: file path + one-sentence principle + best-used-when context
4. Ask which to explore deeper
5. When the user picks: retrieve the file and explain the framework fully

## Scope

Searches across all Knowledge subfolders:

- `Knowledge/Frameworks/` — 119 PM lifecycle frameworks across discovery / validation / build / grow
- `Knowledge/Prioritization/` — 35 tagged prioritization frameworks
- `Knowledge/Resources/Lenny-Newsletter/` — 260 curated newsletter articles
- `Knowledge/Resources/prioritization-articles/` — 35 prioritization essays and strategies
- `Knowledge/PM Tasks/` — 25 PM exercises and practice drills
- `Knowledge/Interview-Questions/` — 100 interview questions across 6 categories
- `Knowledge/Metrics/` — 41 north star examples by company

Additionally, the `lenny-podcast` MCP server provides live search across 284 Lenny's Podcast episode transcripts. When a topic search could benefit from podcast insights (especially guest opinions on PM practices), use the `search_transcripts` tool as a supplementary source alongside the static Knowledge/ files.

## Note

If the topic maps clearly to one of the 7 PM workflows (`/strategy`, `/opportunity`, `/assumptions`, `/research`, `/decisions`, `/stakeholder`, `/meeting`), note that and offer the full workflow as the primary path — it sequences multiple frameworks for deeper results. `/framework` is best for standalone lookups and enrichment.
