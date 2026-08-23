# mode-creator

[English](./README.md) · [简体中文](./README.zh-CN.md) · [हिन्दी](./README.hi.md) · [Português](./README.pt.md) · [Español](./README.es.md) · [日本語](./README.ja.md) · [Deutsch](./README.de.md) · [Français](./README.fr.md) · [Русский](./README.ru.md) · [한국어](./README.ko.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](./CHANGELOG.md)
[![DSH-only](https://img.shields.io/badge/DSH--only-DeepSeek%20Harness-orange.svg)](#dsh-only)
[![100%25 AI-crafted](https://img.shields.io/badge/100%25-AI--crafted-9cf.svg)](#disclaimer)

> ⚠️ **DSH-ONLY (DeepSeek Harness).** Этот навык нацелен на систему agent preset **DeepSeek Harness** и **не является кроссплатформенным**. Он **не** адаптируется под Codex CLI или Claude Code. Устанавливай его только если используешь DeepSeek Harness.

**Создай или скопируй изолированный режим DSH (agent preset) из проверенного blueprint — копируй, а не строй; проверяй машиной, а не на глаз.**

`mode-creator` превращает запрос «создай режим XX» в монтируемый, проверенный, изолированный DSH agent preset. Он копирует релизный blueprint (`standard` / `code` / `minimal`), изменяет только persona + `preset.yml`, проверяет результат машиной и отдаёт его — следуя строгим правилам экономии токенов.

## Чем он выделяется

- **📋 Копируй, а не строй** — переиспользуй уже монтируемые blueprint'ы вместо написания preset с нуля.
- **✅ Проверяй машиной, а не на глаз** — проверка монтирования (`standingKeyFor`) или `scripts/validate-preset.mjs` перед выдачей результата.
- **⚡ Правила экономии токенов** — быстрая деградация при неудаче (≤3 попытки, затем fallback на запись в файл), одно расширение песочницы, знания о механике хранятся в references.
- **🔒 Изолированные режимы** — у каждого режима своя копия оркестрации, своя история диалогов и, опционально, навыки в рамках режима.

## Как это работает — 6 шагов

1. Зафиксируй идентичность (id + description + blueprint).
2. Скопируй blueprint в `~/.dsh/.agent-presets/<id>/`.
3. Измени только `preset.yml` + строку persona в `agent.cordis.yml`.
4. Проверь машиной (монтирование OK / проверка структуры).
5. Приберись + сообщи путь, переключение, изоляцию.

## Установка

```
~/.dsh/skills/mode-creator/    # глобально
.dsh/skills/mode-creator/      # на проект
```

Запускай его фразами вроде *«создай режим XX»*, *«сделай изолированный рабочий режим»*.

## Документация

- `references/mode-anatomy.md` — корень preset, blueprint'ы, структура файлов, API валидации, известные подводные камни
- `scripts/validate-preset.mjs` — проверка структуры (без сторонних зависимостей)

## Сопутствующие навыки

- **[set-skill](https://github.com/tydm2/create-generate-skill)** — создание/аудит навыков (перечислены в его меню `/skill`).
- **[workflow-builder](https://github.com/tydm2/workflow-builder-skill)** — сборка мультиагентных рабочих процессов (кроссплатформенный, в отличие от этого).
- **[gh-publisher](https://github.com/tydm2/gh-publisher)** — публикация файлов на GitHub без git.

## Требования

- **DeepSeek Harness (DSH)** — единственный поддерживаемый хост.

## Отказ от ответственности

> **Этот навык на 100% создан ИИ.** Ошибки неизбежны — обсуждения и pull request'ы приветствуются. Автор активно дорабатывает его на основе реального использования.

## Лицензия

[MIT](./LICENSE)
