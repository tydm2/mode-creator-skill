# mode-creator

[English](./README.md) · [简体中文](./README.zh-CN.md) · [हिन्दी](./README.hi.md) · [Português](./README.pt.md) · [Español](./README.es.md) · [日本語](./README.ja.md) · [Deutsch](./README.de.md) · [Français](./README.fr.md) · [Русский](./README.ru.md) · [한국어](./README.ko.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](./CHANGELOG.md)
[![DSH-only](https://img.shields.io/badge/DSH--only-DeepSeek%20Harness-orange.svg)](#dsh-only)
[![100%25 AI-crafted](https://img.shields.io/badge/100%25-AI--crafted-9cf.svg)](#disclaimer)

> ⚠️ **DSH-ONLY (DeepSeek Harness).** Cette compétence cible le système d'agent presets **DeepSeek Harness** et n'est **pas multiplateforme**. Elle ne s'adapte **pas** à Codex CLI ni à Claude Code. Installez-la uniquement si vous utilisez DeepSeek Harness.

**Créez ou copiez un mode DSH isolé (agent preset) à partir d'un blueprint validé — copiez au lieu de construire ; validez au lieu de juger à l'œil.**

`mode-creator` transforme « créer un mode XX » en un agent preset DSH isolé, validé et montable. Il copie un blueprint de version (`standard` / `code` / `minimal`), ne modifie que le persona + `preset.yml`, valide le résultat par machine, puis le livre — en suivant des règles strictes d'économie de tokens.

## Pourquoi il se démarque

- **📋 Copier, pas construire** — réutiliser des blueprints déjà montables au lieu d'écrire un preset à partir de zéro.
- **✅ Valider par machine, pas à l'œil** — contrôle de montage (`standingKeyFor`) ou `scripts/validate-preset.mjs` avant la livraison.
- **⚡ Règles d'économie de tokens** — repli immédiat en cas d'échec (≤3 tentatives, puis écriture de fichier en dernier recours), une seule escalade de sandbox, connaissance des mécanismes conservée dans `references`.
- **🔒 Modes isolés** — chaque mode dispose de sa propre copie d'orchestration, de son propre historique de conversation et de compétences optionnelles limitées au mode.

## Fonctionnement — 6 étapes

1. Verrouiller l'identité (id + description + blueprint).
2. Copier le blueprint vers `~/.dsh/.agent-presets/<id>/`.
3. Ne modifier que `preset.yml` + la ligne persona dans `agent.cordis.yml`.
4. Valider par machine (montage OK / contrôle de forme).
5. Nettoyer + signaler le chemin, la commutation, l'isolation.

## Installation

```
~/.dsh/skills/mode-creator/    # global
.dsh/skills/mode-creator/      # per project
```

Déclenchez-le avec des expressions telles que *« créer un mode XX »*, *« créer un mode de travail isolé »*.

## Documentation

- `references/mode-anatomy.md` — racine du preset, blueprints, structure des fichiers, API de validation, pièges connus
- `scripts/validate-preset.mjs` — validation de forme (aucune dépendance tierce)

## Compétences complémentaires

- **[set-skill](https://github.com/tydm2/create-generate-skill)** — créer/auditer des compétences (listées dans son menu `/skill`).
- **[workflow-builder](https://github.com/tydm2/workflow-builder-skill)** — construire des workflows multi-agents (multiplateforme, contrairement à celle-ci).
- **[gh-publisher](https://github.com/tydm2/gh-publisher)** — publier des fichiers sur GitHub sans git.

## Prérequis

- **DeepSeek Harness (DSH)** — c'est le seul hôte pris en charge.

## Avertissement

> **Cette compétence est 100 % créée par IA.** Les problèmes sont inévitables — les discussions et les pull requests sont les bienvenues. L'auteur itère activement dessus en fonction de l'usage réel.

## License

[MIT](./LICENSE)
