# Mode anatomy (mode-anatomy) — one-time research asset

This file holds the "how to create a mode" mechanism knowledge, kept here so we **never re-read the DSH source**. It comes from three real mode-creation sessions (novel / coding / office) cross-checked against the DSH release. The body only references this file; read it on demand.

## Preset root

- **User root**: `~/.dsh/.agent-presets/` (on Windows `C:\Users\<you>\.dsh\.agent-presets\`). Write here; it's scanned in real time — **no restart needed**, a new session shows it in the mode picker.
- **Release blueprints**: `<workspace>\node_modules\@deepseek-ai\dsh\config\agent-presets\{standard,code,cordis,minimal}\`.

## Blueprint list (which to pick)

| id | Name | When to pick |
|---|---|---|
| standard | standard mode | default; full-featured coding agent |
| code | PTC mode | when you need the Code Mode SDK |
| minimal | (no zh name) | when you only need a lean persona + two tools |
| cordis | (plugin development) | ships the cordis plugin-dev skill |

## File structure

- `agent.cordis.yml`: an AGENT-PLANE combination, a list of YAML rows. First row `- id: persona`, `name: '@deepseek-ai/dsh-persona'`, `config.text` is the mode persona (`{{model}}` / `{{cwd}}` auto-resolved). The rest are tool rows (bash/pwsh, fs, jobs, skills, goals, plan, compaction, subagent/workflow, ask-user, todo, web).
- `preset.yml`: `name` (display name) + `description` (intro) + optional `order` (sorting).
- `skills/` (optional): mode-specific skills, only visible in that mode's sessions.

## Validation API (agentPresets service)

- `list()` / `resolve(id)` / `copy(from, id, name)` / `standingKeyFor(id)` (returns the scope key, mount OK).
- File-shape validation: `scripts/validate-preset.mjs` (no third-party deps; checks files present, persona row, preset.yml has a name).

## Probe plugin (method A) essentials

- `cordis_define` (plugin: `{kind:'new', idPrefix:'preset'}`) + `cordis_run` register a temporary plugin; `inject: ['agentPresets','tools']`; expose `preset_copy` / `preset_validate` via `defineTool` in apply; `cordis_undefine` to remove when done.
- **Known pitfall (seen in the coding mode session)**: `cordis_define`'s `plugin` param may be treated as a string at the transport layer and repeatedly fail object validation — on that, **switch to method B (file writing) immediately**, don't debug to death.

## Isolation (explain to the user when reporting)

- Orchestration independent: an isolated copy that references / modifies no other preset.
- Conversation history: stored per session, naturally isolated across modes.
- Skills: global skills in `~/.dsh/skills` are visible to all modes; skills under `<id>/skills/` are visible only to that mode.
