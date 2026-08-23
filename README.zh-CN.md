# mode-creator

[English](./README.md) · [简体中文](./README.zh-CN.md) · [हिन्दी](./README.hi.md) · [Português](./README.pt.md) · [Español](./README.es.md) · [日本語](./README.ja.md) · [Deutsch](./README.de.md) · [Français](./README.fr.md) · [Русский](./README.ru.md) · [한국어](./README.ko.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](./CHANGELOG.md)
[![DSH-only](https://img.shields.io/badge/DSH--only-DeepSeek%20Harness-orange.svg)](#dsh-only)
[![100%25 AI-crafted](https://img.shields.io/badge/100%25-AI--crafted-9cf.svg)](#免责声明)

> ⚠️ **仅限 DSH（DeepSeek Harness）。** 本技能面向 DeepSeek Harness 的 agent preset 系统，**不跨平台**。它**不**适配 Codex CLI 或 Claude Code。仅在运行 DeepSeek Harness 时安装。

**从已验证蓝本创建/复制一个隔离的 DSH 模式（agent preset）——复制别造、校验别目测。**

`mode-creator` 把「创建一个 XX 模式」变成可挂载、经校验、隔离的 DSH agent preset。它复制发行版蓝本（`standard` / `code` / `minimal`），只改人设与 `preset.yml`，机器校验后交付，全程遵守省 token 铁律。

## 亮点

- **📋 复制别造**——复用已验证可挂载的蓝本，不从零手写预设。
- **✅ 机器校验别目测**——交付前跑挂载校验（`standingKeyFor`）或 `scripts/validate-preset.mjs`。
- **⚡ 省 token 铁律**——失败快降级（≤3 次重试转文件手写）、沙箱一次升级、机制知识存 references。
- **🔒 模式隔离**——每个模式独立编排拷贝、独立对话记录、可选模式专属技能。

## 工作原理 —— 6 步

1. 锁定身份（id + 介绍 + 蓝本）。
2. 复制蓝本到 `~/.dsh/.agent-presets/<id>/`。
3. 只改 `preset.yml` + `agent.cordis.yml` 的 persona 行。
4. 机器校验（挂载 OK / 形状校验）。
5. 清理 + 汇报路径、切换方式、隔离性。

## 安装

```
~/.dsh/skills/mode-creator/    # 全局
.dsh/skills/mode-creator/      # 项目级
```

用「创建一个 XX 模式」「建一个隔离的工作模式」之类的话触发。

## 文档

- `references/mode-anatomy.md` —— 预设根目录、蓝本、文件结构、校验 API、已知坑
- `scripts/validate-preset.mjs` —— 形状校验（无第三方依赖）

## 配套技能

- **[set-skill](https://github.com/tydm2/create-generate-skill)** —— 创建/体检技能（在其 `/skill` 菜单中列出）。
- **[workflow-builder](https://github.com/tydm2/workflow-builder-skill)** —— 搭多智能体工作流（跨平台，与本技能不同）。
- **[gh-publisher](https://github.com/tydm2/gh-publisher)** —— 无需 git 推送文件到 GitHub。

## 环境要求

- **DeepSeek Harness（DSH）** —— 唯一支持的宿主。

## 免责声明

> **本技能为 100% AI 制作。** 问题在所难免——欢迎讨论与 PR。作者会根据真实使用情况持续迭代优化。

## License

[MIT](./LICENSE)
