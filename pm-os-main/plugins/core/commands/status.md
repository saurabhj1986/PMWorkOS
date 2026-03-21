# /status

Review your current PM OS state and get a grounded recommendation on what to focus on next.

## What it does

1. Reads all `Context/` files — `COMPANY.md`, `PRODUCTS.md`, `GOALS.md`, `TEAM.md`, `CONSTRAINTS.md`
2. Scans `Work/` for recently modified files (in-progress artifacts)
3. Cross-references active Work against `Context/GOALS.md`
4. Delegates synthesis to `plugins/pm-workflows/agents/context-manager.md`
5. Outputs: current state summary → active work → goal coverage gaps → one recommended next action

## When to use

- Start of a session — orient yourself before diving in
- After completing a workflow — see what is naturally next
- When you feel stuck or context has drifted — get a fresh read on priorities
- Periodically — check whether your GOALS.md still reflects reality

## If Context/ files are empty or contain placeholders

Redirect to `/start` to fill them first. `/status` cannot orient you without context.
