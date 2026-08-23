# mode-creator

[English](./README.md) · [简体中文](./README.zh-CN.md) · [हिन्दी](./README.hi.md) · [Português](./README.pt.md) · [Español](./README.es.md) · [日本語](./README.ja.md) · [Deutsch](./README.de.md) · [Français](./README.fr.md) · [Русский](./README.ru.md) · [한국어](./README.ko.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](./CHANGELOG.md)
[![DSH-only](https://img.shields.io/badge/DSH--only-DeepSeek%20Harness-orange.svg)](#dsh-only)
[![100%25 AI-crafted](https://img.shields.io/badge/100%25-AI--crafted-9cf.svg)](#disclaimer)

> ⚠️ **DSH-ONLY (DeepSeek Harness).** このスキルは **DeepSeek Harness** の agent-preset システムを対象としており、**クロスプラットフォームではありません**。Codex CLI や Claude Code には**対応していません**。DeepSeek Harness を実行している場合にのみインストールしてください。

**検証済みの blueprint から隔離された DSH モード（agent preset）を作成またはコピーします — 作らずにコピー、目視せずに検証。**

`mode-creator` は「XX モードを作成」を、マウント可能で検証済みの隔離された DSH agent preset へと変えます。リリース blueprint（`standard` / `code` / `minimal`）をコピーし、persona と `preset.yml` のみを編集し、結果を機械検証して納品します — 厳格なトークン節約ルールに従って。

## 特長

- **📋 作らずにコピー** — ゼロから preset を書くのではなく、すでにマウント可能な blueprint を再利用します。
- **✅ 目視せずに機械検証** — 納品前にマウントチェック（`standingKeyFor`）または `scripts/validate-preset.mjs` を実行します。
- **⚡ トークン節約ルール** — 即時失敗と段階的縮退（≤3 回リトライ後にファイル書き込みへフォールバック）、サンドボックス昇格は 1 回、仕組みの知識は references に集約。
- **🔒 隔離されたモード** — 各モードは独自のオーケストレーションコピー、会話履歴、オプションのモードスコープ付きスキルを持ちます。

## 動作の仕組み — 6つのステップ

1. ID（id + description + blueprint）を確定します。
2. blueprint を `~/.dsh/.agent-presets/<id>/` にコピーします。
3. `preset.yml` と `agent.cordis.yml` 内の persona 行のみを編集します。
4. 機械検証（マウント OK / 形状チェック）を行います。
5. クリーンアップし、パス・切り替え・隔離について報告します。

## インストール

```
~/.dsh/skills/mode-creator/    # global
.dsh/skills/mode-creator/      # per project
```

「XX モードを作成」「隔離された作業モードを作る」などのフレーズでトリガーします。

## ドキュメント

- `references/mode-anatomy.md` — preset のルート、blueprint、ファイル構造、検証 API、既知の落とし穴
- `scripts/validate-preset.mjs` — 形状検証（サードパーティ依存なし）

## 併用できるスキル

- **[set-skill](https://github.com/tydm2/create-generate-skill)** — スキルの作成／監査（`/skill` メニューに掲載）。
- **[workflow-builder](https://github.com/tydm2/workflow-builder-skill)** — マルチエージェントワークフローを構築（こちらはクロスプラットフォーム対応）。
- **[gh-publisher](https://github.com/tydm2/gh-publisher)** — git を使わずに GitHub へファイルを公開。

## 要件

- **DeepSeek Harness (DSH)** — サポートされるホストはこれのみです。

## 免責事項

> **このスキルは 100% AI 製です。** 問題は避けられません — 議論やプルリクエストを歓迎します。作者は実際の使用状況に基づいて積極的に改善を続けています。

## ライセンス

[MIT](./LICENSE)
