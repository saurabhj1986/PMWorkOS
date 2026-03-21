# /skill [task]

Find and invoke the right skill for any PM task from the 182 skills in `.cursor/skills/`.

## When to use

Type `/skill` followed by what you are trying to do. Examples:

- `/skill write a decision journal`
- `/skill map stakeholder power dynamics`
- `/skill turn interview transcripts into JTBD insights`
- `/skill build a feature impact model`

## How it runs

1. Match the task description against skill folder names and trigger descriptions in `.cursor/skills/`
2. Delegate to `plugins/pm-workflows/agents/knowledge-librarian.md` for matching
3. Present top 3–5 skill matches: name + trigger description + when to use
4. Ask which to invoke
5. When the user picks: read that skill's `SKILL.md` and follow it exactly

## Note on skill-first vs workflow-first

If the task maps to one of the 7 PM workflows (`/strategy`, `/opportunity`, `/assumptions`, `/research`, `/decisions`, `/stakeholder`, `/meeting`), suggest the workflow instead — it chains multiple skills in sequence for deeper, end-to-end results.

Use `/skill` for standalone, single-task invocations where you want one specific tool without the full workflow sequence.
