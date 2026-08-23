# mode-creator

[English](./README.md) · [简体中文](./README.zh-CN.md) · [हिन्दी](./README.hi.md) · [Português](./README.pt.md) · [Español](./README.es.md) · [日本語](./README.ja.md) · [Deutsch](./README.de.md) · [Français](./README.fr.md) · [Русский](./README.ru.md) · [한국어](./README.ko.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](./CHANGELOG.md)
[![DSH-only](https://img.shields.io/badge/DSH--only-DeepSeek%20Harness-orange.svg)](#dsh-only)
[![100%25 AI-crafted](https://img.shields.io/badge/100%25-AI--crafted-9cf.svg)](#disclaimer)

> ⚠️ **DSH-ONLY (DeepSeek Harness).** This skill targets the **DeepSeek Harness** agent-preset system and is **not cross-platform**. It does **not** adapt to Codex CLI or Claude Code. Install it only if you run DeepSeek Harness.

**Create or copy an isolated DSH mode (agent preset) from a validated blueprint — copy, don't build; validate, don't eyeball.**

`mode-creator` turns "create an XX mode" into a mountable, validated, isolated DSH agent preset. It copies a release blueprint (`standard` / `code` / `minimal`), edits only the persona + `preset.yml`, machine-validates the result, and delivers — following strict token-saving rules.

## Why it stands out

- **📋 Copy, don't build** — reuse already-mountable blueprints instead of writing a preset from scratch.
- **✅ Machine-validate, don't eyeball** — mount check (`standingKeyFor`) or `scripts/validate-preset.mjs` before delivery.
- **⚡ Token-saving rules** — fail-fast downgrade (≤3 retries then file-writing fallback), one sandbox escalation, mechanism knowledge kept in references.
- **🔒 Isolated modes** — each mode gets its own orchestration copy, conversation history, and optional mode-scoped skills.

## How it works — 6 steps

1. Lock identity (id + description + blueprint).
2. Copy the blueprint to `~/.dsh/.agent-presets/<id>/`.
3. Edit only `preset.yml` + the persona line in `agent.cordis.yml`.
4. Machine-validate (mount OK / shape check).
5. Clean up + report path, switching, isolation.

## Install

```
~/.dsh/skills/mode-creator/    # global
.dsh/skills/mode-creator/      # per project
```

Trigger it with phrases like *"create an XX mode"*, *"make an isolated working mode"*.

## Docs

- `references/mode-anatomy.md` — preset root, blueprints, file structure, validation API, known pitfalls
- `scripts/validate-preset.mjs` — shape validation (no third-party deps)

## Companion skills

- **[set-skill](https://github.com/tydm2/create-generate-skill)** — create/audit skills (listed in its `/skill` menu).
- **[workflow-builder](https://github.com/tydm2/workflow-builder-skill)** — build multi-agent workflows (cross-platform, unlike this one).
- **[gh-publisher](https://github.com/tydm2/gh-publisher)** — publish files to GitHub without git.

## Requirements

- **DeepSeek Harness (DSH)** — this is the only supported host.

## Disclaimer

> **This skill is 100% AI-crafted.** Issues are inevitable — discussion and pull requests are welcome. The author actively iterates on it based on real-world usage.

## License

[MIT](./LICENSE)
