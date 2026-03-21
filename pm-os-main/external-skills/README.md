# External Skills

This directory manages third-party skills that are bundled with pm-os for convenience. These skills were created by independent authors and are governed by their own licenses. **prodmgmt.world does not maintain these skills and is not responsible for their content.**

---

## Included Skills

| Skill | Source Repo | Author | Description |
|-------|-------------|--------|-------------|
| `shaping` | [rjs/shaping-skills](https://github.com/rjs/shaping-skills) | [@rjs](https://github.com/rjs) | Shape problems and solutions (Shape Up methodology) |
| `breadboarding` | [rjs/shaping-skills](https://github.com/rjs/shaping-skills) | [@rjs](https://github.com/rjs) | Map UI + code affordances and their wiring |
| `breadboard-reflection` | [rjs/shaping-skills](https://github.com/rjs/shaping-skills) | [@rjs](https://github.com/rjs) | Find design smells in a breadboard and fix them |
| `frontend-slides` | [zarazhangrui/frontend-slides](https://github.com/zarazhangrui/frontend-slides) | [@zarazhangrui](https://github.com/zarazhangrui) | Create animation-rich HTML presentations from scratch or converted from PowerPoint (MIT license) |

These skills are vendored into `.cursor/skills/` so they work immediately after downloading pm-os — no setup required.

---

## Updating External Skills

When an upstream author publishes changes, run:

```bash
./external-skills/update.sh
```

This will:
1. Clone each registered repo at the latest commit
2. Copy updated skill files into `.cursor/skills/`
3. Preserve the attribution header in each `SKILL.md`
4. Record the synced commit hash and date in `registry.json`

**Requirements:** `git` must be installed (any Cursor user will have it).

---

## Adding a New External Skill Source

1. Add an entry to `registry.json` following the existing schema
2. Run `./external-skills/update.sh` to fetch and install it
3. Commit the vendored skill files and updated `registry.json`

---

## Disclaimer

The skills in `.cursor/skills/` that originate from external repositories are provided as-is. prodmgmt.world:

- Did not author them
- Does not audit them for accuracy or safety
- Does not guarantee compatibility with future versions of Cursor
- Is not responsible for any outputs generated when using them

For issues with an external skill, open an issue in its source repository (linked in the table above).
