# mode-creator

[English](./README.md) · [简体中文](./README.zh-CN.md) · [हिन्दी](./README.hi.md) · [Português](./README.pt.md) · [Español](./README.es.md) · [日本語](./README.ja.md) · [Deutsch](./README.de.md) · [Français](./README.fr.md) · [Русский](./README.ru.md) · [한국어](./README.ko.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](./CHANGELOG.md)
[![DSH-only](https://img.shields.io/badge/DSH--only-DeepSeek%20Harness-orange.svg)](#dsh-only)
[![100%25 AI-crafted](https://img.shields.io/badge/100%25-AI--crafted-9cf.svg)](#disclaimer)

> ⚠️ **DSH-ONLY (DeepSeek Harness).** Esta habilidad está dirigida al sistema de agent presets de **DeepSeek Harness** y **no es multiplataforma**. **No** se adapta a Codex CLI ni a Claude Code. Instálala solo si usas DeepSeek Harness.

**Crea o copia un modo DSH aislado (agent preset) a partir de un blueprint validado: copia, no construyas; valida, no mires a ojo.**

`mode-creator` convierte «crear un modo XX» en un agent preset de DSH aislado, validado y montable. Copia un blueprint de la distribución (`standard` / `code` / `minimal`), edita solo la persona + `preset.yml`, valida el resultado con máquina y lo entrega — siguiendo reglas estrictas de ahorro de tokens.

## Por qué destaca

- **📋 Copia, no construyas** — reutiliza blueprints ya montables en lugar de escribir un preset desde cero.
- **✅ Valida con máquina, no a ojo** — comprobación de montaje (`standingKeyFor`) o `scripts/validate-preset.mjs` antes de entregar.
- **⚡ Reglas de ahorro de tokens** — degradación rápida ante fallos (≤3 reintentos y luego recurrir a la escritura de archivos), una sola escalada de sandbox, conocimiento de mecanismos guardado en references.
- **🔒 Modos aislados** — cada modo obtiene su propia copia de orquestación, historial de conversación y habilidades opcionales con ámbito de modo.

## Cómo funciona — 6 pasos

1. Fija la identidad (id + descripción + blueprint).
2. Copia el blueprint a `~/.dsh/.agent-presets/<id>/`.
3. Edita solo `preset.yml` + la línea de persona en `agent.cordis.yml`.
4. Valida con máquina (montaje OK / comprobación de forma).
5. Limpia + informa de la ruta, el cambio y el aislamiento.

## Instalación

```
~/.dsh/skills/mode-creator/    # global
.dsh/skills/mode-creator/      # por proyecto
```

Actívalo con frases como *«crear un modo XX»*, *«hacer un modo de trabajo aislado»*.

## Documentación

- `references/mode-anatomy.md` — raíz del preset, blueprints, estructura de archivos, API de validación, escollos conocidos
- `scripts/validate-preset.mjs` — validación de forma (sin dependencias de terceros)

## Habilidades complementarias

- **[set-skill](https://github.com/tydm2/create-generate-skill)** — crea/audita habilidades (listadas en su menú `/skill`).
- **[workflow-builder](https://github.com/tydm2/workflow-builder-skill)** — construye flujos de trabajo multiagente (multiplataforma, a diferencia de esta).
- **[gh-publisher](https://github.com/tydm2/gh-publisher)** — publica archivos en GitHub sin git.

## Requisitos

- **DeepSeek Harness (DSH)** — este es el único host compatible.

## Descargo de responsabilidad

> **Esta habilidad es 100 % obra de IA.** Los problemas son inevitables — los debates y las pull requests son bienvenidos. El autor la itera activamente a partir del uso en el mundo real.

## Licencia

[MIT](./LICENSE)
