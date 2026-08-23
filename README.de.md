# mode-creator

[English](./README.md) · [简体中文](./README.zh-CN.md) · [हिन्दी](./README.hi.md) · [Português](./README.pt.md) · [Español](./README.es.md) · [日本語](./README.ja.md) · [Deutsch](./README.de.md) · [Français](./README.fr.md) · [Русский](./README.ru.md) · [한국어](./README.ko.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](./CHANGELOG.md)
[![DSH-only](https://img.shields.io/badge/DSH--only-DeepSeek%20Harness-orange.svg)](#dsh-only)
[![100%25 AI-crafted](https://img.shields.io/badge/100%25-AI--crafted-9cf.svg)](#disclaimer)

> ⚠️ **DSH-ONLY (DeepSeek Harness).** Dieser Skill zielt auf das **agent-preset**-System des **DeepSeek Harness** ab und ist **nicht plattformübergreifend**. Er passt sich **nicht** an Codex CLI oder Claude Code an. Installiere ihn nur, wenn du DeepSeek Harness betreibst.

**Erstelle oder kopiere einen isolierten DSH-Modus (agent preset) aus einem validierten Blueprint — kopieren statt bauen, validieren statt Augenmaß.**

`mode-creator` macht aus „erstelle einen XX-Modus“ ein mountbares, validiertes, isoliertes DSH agent preset. Er kopiert einen Release-Blueprint (`standard` / `code` / `minimal`), ändert nur die Persona + `preset.yml`, validiert das Ergebnis maschinell und liefert es aus — unter Einhaltung strenger Token-Sparregeln.

## Was ihn auszeichnet

- **📋 Kopieren statt bauen** — bereits mountbare Blueprints wiederverwenden, statt ein Preset von Grund auf neu zu schreiben.
- **✅ Maschinell validieren statt Augenmaß** — Mount-Check (`standingKeyFor`) oder `scripts/validate-preset.mjs` vor der Auslieferung.
- **⚡ Token-Sparregeln** — Fail-Fast-Downgrade (≤3 Wiederholungen, dann Fallback auf Dateischreiben), eine Sandbox-Eskalation, Mechanismuswissen in den Referenzen gehalten.
- **🔒 Isolierte Modi** — jeder Modus erhält seine eigene Orchestrierungskopie, seinen eigenen Gesprächsverlauf und optional modusspezifische Skills.

## So funktioniert es — 6 Schritte

1. Identität festlegen (id + Beschreibung + Blueprint).
2. Den Blueprint nach `~/.dsh/.agent-presets/<id>/` kopieren.
3. Nur `preset.yml` + die Persona-Zeile in `agent.cordis.yml` bearbeiten.
4. Maschinell validieren (Mount OK / Strukturprüfung).
5. Aufräumen + Pfad, Umschalten und Isolation melden.

## Installation

```
~/.dsh/skills/mode-creator/    # global
.dsh/skills/mode-creator/      # pro Projekt
```

Aktiviere ihn mit Formulierungen wie *„erstelle einen XX-Modus“* oder *„erstelle einen isolierten Arbeitsmodus“*.

## Dokumentation

- `references/mode-anatomy.md` — Preset-Root, Blueprints, Dateistruktur, Validierungs-API, bekannte Fallstricke
- `scripts/validate-preset.mjs` — Strukturvalidierung (ohne Drittanbieter-Abhängigkeiten)

## Ergänzende Skills

- **[set-skill](https://github.com/tydm2/create-generate-skill)** — Skills erstellen/auditieren (aufgelistet in seinem `/skill`-Menü).
- **[workflow-builder](https://github.com/tydm2/workflow-builder-skill)** — Multi-Agenten-Workflows bauen (plattformübergreifend, anders als dieser hier).
- **[gh-publisher](https://github.com/tydm2/gh-publisher)** — Dateien ohne git auf GitHub veröffentlichen.

## Voraussetzungen

- **DeepSeek Harness (DSH)** — dies ist der einzige unterstützte Host.

## Haftungsausschluss

> **Dieser Skill ist zu 100 % KI-erstellt.** Probleme sind unvermeidlich — Diskussionen und Pull Requests sind willkommen. Der Autor entwickelt ihn auf Basis der realen Nutzung aktiv weiter.

## License

[MIT](./LICENSE)
