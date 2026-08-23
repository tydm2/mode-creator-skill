# mode-creator

[English](./README.md) · [简体中文](./README.zh-CN.md) · [हिन्दी](./README.hi.md) · [Português](./README.pt.md) · [Español](./README.es.md) · [日本語](./README.ja.md) · [Deutsch](./README.de.md) · [Français](./README.fr.md) · [Русский](./README.ru.md) · [한국어](./README.ko.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](./CHANGELOG.md)
[![DSH-only](https://img.shields.io/badge/DSH--only-DeepSeek%20Harness-orange.svg)](#dsh-only)
[![100%25 AI-crafted](https://img.shields.io/badge/100%25-AI--crafted-9cf.svg)](#disclaimer)

> ⚠️ **DSH-ONLY (DeepSeek Harness).** 이 스킬은 **DeepSeek Harness** agent-preset 시스템을 대상으로 하며 **크로스 플랫폼이 아닙니다**. Codex CLI나 Claude Code에는 맞지 않습니다. DeepSeek Harness를 실행하는 경우에만 설치하세요.

**검증된 blueprint에서 격리된 DSH 모드(agent preset)를 생성하거나 복사하세요 — 만들지 말고 복사하고, 눈대중하지 말고 검증하세요.**

`mode-creator`는 "XX 모드 만들기"를 마운트 가능하고 검증된 격리 DSH agent preset으로 바꿔줍니다. 릴리스 blueprint(`standard` / `code` / `minimal`)를 복사하고 persona와 `preset.yml`만 수정한 뒤, 결과를 기계적으로 검증하고 엄격한 token 절약 규칙을 지키며 전달합니다.

## 돋보이는 이유

- **📋 만들지 말고 복사** — preset을 처음부터 작성하는 대신 이미 마운트 가능한 blueprint를 재사용합니다.
- **✅ 눈대중하지 말고 기계 검증** — 전달 전에 마운트 체크(`standingKeyFor`) 또는 `scripts/validate-preset.mjs`로 검증합니다.
- **⚡ Token 절약 규칙** — 빠른 실패 후 강등(≤3회 재시도 후 파일 쓰기로 폴백), 샌드박스 확장은 한 번만, 메커니즘 지식은 references에 보관.
- **🔒 격리된 모드** — 각 모드는 자체 orchestration 복사본, 대화 기록, 선택적 모드 범위 스킬을 가집니다.

## 동작 방식 — 6단계

1. 정체성 잠금(id + description + blueprint).
2. blueprint를 `~/.dsh/.agent-presets/<id>/`에 복사합니다.
3. `preset.yml`과 `agent.cordis.yml`의 persona 줄만 수정합니다.
4. 기계 검증(마운트 OK / 형태 체크).
5. 정리 + 경로, 전환, 격리 보고.

## 설치

```
~/.dsh/skills/mode-creator/    # global
.dsh/skills/mode-creator/      # per project
```

*"XX 모드 만들기"*, *"격리된 작업 모드 만들기"* 같은 문구로 트리거하세요.

## 문서

- `references/mode-anatomy.md` — preset 루트, blueprint, 파일 구조, 검증 API, 알려진 함정
- `scripts/validate-preset.mjs` — 형태 검증(서드파티 의존성 없음)

## 함께 쓰는 스킬

- **[set-skill](https://github.com/tydm2/create-generate-skill)** — 스킬 생성/감사(`/skill` 메뉴에 나열됨).
- **[workflow-builder](https://github.com/tydm2/workflow-builder-skill)** — 멀티 에이전트 워크플로 구축(이 스킬과 달리 크로스 플랫폼).
- **[gh-publisher](https://github.com/tydm2/gh-publisher)** — git 없이 GitHub에 파일 게시.

## 요구 사항

- **DeepSeek Harness (DSH)** — 지원되는 유일한 호스트입니다.

## 면책 조항

> **이 스킬은 100% AI로 제작되었습니다.** 문제는 불가피합니다 — 논의와 pull request를 환영합니다. 작성자는 실제 사용 사례를 바탕으로 적극적으로 개선합니다.

## 라이선스

[MIT](./LICENSE)
