---
name: mode-creator
description: Use when the user wants to create or copy a new standalone mode (a DSH agent preset) — e.g. "create an XX mode", "make an isolated working mode". Copies a release blueprint (standard/code/minimal) → edits only the persona + preset.yml → machine-validates (mount OK) → delivers, following token-saving rules (copy don't build, validate don't eyeball, fail-fast downgrade, one sandbox escalation). DSH (DeepSeek Harness) ONLY — not cross-platform. Not for creating skills (→ set-skill), multi-agent workflows (→ workflow-builder), or business content.
user-invocable: true
metadata:
  version: 1.0.0
  languages: [en]
  scope: global
  changelog:
    - 1.0.0: initial English release for GitHub (DSH-only); distilled from three real mode-creation sessions (novel / coding / office)
---

# mode-creator

Turn "create an XX mode" into a mountable, validated, isolated **DSH agent preset**. **Creates modes (presets) only — not skills, workflows, or business content.**

> ⚠️ **DSH-only (DeepSeek Harness).** This skill targets the DeepSeek Harness agent-preset system and is **not cross-platform**. It is not portable to Codex CLI or Claude Code.

## When to use / when not to use

- **Trigger**: "create an XX mode", "make an isolated working mode", "create a mode isolated from the others".
- A "mode" = an agent preset under `~/.dsh/.agent-presets/<id>/`: `agent.cordis.yml` (persona + tool orchestration) + `preset.yml` (name / description) + optional `skills/`.
- **Don't use**: creating a skill → set-skill; building a multi-agent workflow → workflow-builder; writing business content itself.

## Golden path (copy + validate, 6 steps)

1. **Lock identity**: id (kebab-case) + one-line description + blueprint (default `standard`; `minimal` for lean, `code` for Code SDK). If the id already exists it will be overwritten — ask about reuse first.
2. **Copy the blueprint**: copy the release blueprint directory whole to `~/.dsh/.agent-presets/<id>/` (method A/B below).
3. **Customize**: write `name` / `description` in `preset.yml`; in `agent.cordis.yml` **change only the persona line** (`config.text`) — leave every tool line untouched; that's where breakage comes from.
4. **Machine-validate**: run the mount check (`standingKeyFor` → mounted OK) or `scripts/validate-preset.mjs` — never eyeball.
5. **Clean up + report**: delete temp files; report the path, how to switch, and isolation (see references).

## Two copy methods (choose by reliability)

- **Method A · programmatic (fast, depends on cordis tooling)**: a temporary probe plugin injects the `agentPresets` service → `copy(from, id, name)` → `standingKeyFor(id)` validate → delete probe. See `references/mode-anatomy.md`.
- **Method B · file writing (stable, default fallback)**: `Copy-Item` the blueprint dir → write `preset.yml` + edit the persona → `node scripts/validate-preset.mjs <id>`. **If `cordis_define` throws parameter errors, switch to B immediately, retry ≤3 times.**

## Token-saving rules

1. **Copy the blueprint, don't build from scratch** — blueprints are already mountable.
2. **Machine-validate, don't eyeball** — mount/shape checks prevent rework.
3. **Fail-fast downgrade** — same tool failing? retry ≤3 times, then switch to method B.
4. **One sandbox escalation** — writing `~/.dsh` (outside the workspace) being denied is expected; escalate once with a reason, don't probe repeatedly.
5. **Mechanism knowledge lives in references, don't re-read source** — blueprint location / structure / API are in `references/mode-anatomy.md`.

## References

- `references/mode-anatomy.md` — preset root, blueprint list, file structure, validation API, probe plugin essentials, known pitfalls.
- `scripts/validate-preset.mjs` — mode-directory shape validation (no third-party deps).
