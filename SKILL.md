---
name: mode-creator
description: 创建或复制一个新的独立「模式」（DSH / DeepSeek Harness 的 agent preset，可从任何平台的本技能触发）。当用户说「单独创建一个 XX 模式」「生成一个独立的工作模式」「新建一个与其它模式隔离（记忆/对话记录/技能）的模式」或输入 /mode-creator 时使用。不用于创建技能（set-skill）、搭建多智能体工作流（workflow-builder）或撰写业务内容本身。
license: MIT
user-invocable: true
metadata:
  version: 1.2.0
---


# 模式创建协议（创造模式）

把「单独创建一个 XX 模式」一句话，变成可挂载、经校验、与其它模式隔离的 DSH agent preset。**只造模式（预设），不造技能/工作流/业务内容。** 本技能可从任何平台的 agent 触发（管理对象始终是本机 DSH 的预设目录）。变更历史见 `references/CHANGELOG.md`。

## 触发与边界

- **触发**：「单独创建一个 XX 模式」「生成一个独立的工作模式」「创造一个模式，跟其它模式隔离」。
- 一个「模式」= `~/.dsh/.agent-presets/<id>/` 下的 agent preset：`agent.cordis.yml`（人设+工具编排）+ `preset.yml`（名称/介绍）+ 可选 `skills/`。
- **何时不要用**：造技能 → set-skill；搭多智能体工作流 → workflow-builder；写业务内容本身。

## 黄金路径（复制 + 校验，6 步）

**启动确认门控（写前必做）**：执行前用选项式提问向用户确认（id / 蓝本 / 落位 / 将修改内容）；**目标 id 已存在时必须问清「覆盖 / 换名 / 复用」，未确认不写任何文件。**

1. **锁定身份**：id（kebab-case）+ 一句话介绍 + 蓝本（默认 `standard`；要精简用 `minimal`，要 Code SDK 用 `code`）。id 已存在会覆盖，先问清是否复用。
2. **复制蓝本**：把发行版蓝本整目录复制到 `~/.dsh/.agent-presets/<id>/`（方式 A/B 见下）。
3. **定制**：`preset.yml` 写 name/description；`agent.cordis.yml` **只改 persona 行**（`config.text`），其余工具行原样保留——别动工具编排，那是坏掉的源头。
4. **机器校验**：跑挂载校验（standingKeyFor → mounted OK）或 `scripts/validate-preset.mjs`，别目测。
5. **清理 + 汇报**：删临时文件；汇报路径、切换方式、隔离性（见 references）。

## 两种复制方式（按可靠性选）

- **方式 A · 程序化复制（快，但依赖 cordis 工具）**：临时探针插件注入 `agentPresets` 服务 → `copy(from, id, name)` → `standingKeyFor(id)` 校验 → 删探针。要点见 `references/mode-anatomy.md`。
- **方式 B · 文件手写（稳，默认兜底）**：`Copy-Item` 蓝本目录 → 写 `preset.yml` + 改 persona → `node scripts/validate-preset.mjs <id>`。**`cordis_define` 报参数错就立刻转 B，重试 ≤3 次。**

## 省 token 铁律

1. **复制蓝本，别从零造**——蓝本已验证可挂载，抄来即对。
2. **机器校验，别目测**——挂载校验 / 形状校验兜底，防返工。
3. **失败快降级**——同一工具坏掉重试 ≤3 次就换方式 B，防空转。
4. **沙箱一次升级**——写 `~/.dsh`（工作区外）被拒是预期，带理由升级一次，别反复试探。
5. **机制知识在 references，别重读源码**——蓝本位置/结构/API 见 `references/mode-anatomy.md`（调研一次落成的资产）。

## 参考

- `references/mode-anatomy.md`：预设根目录、蓝本清单、文件结构、校验 API、探针插件要点与已知坑。
- `scripts/validate-preset.mjs`：模式目录形状校验（无第三方依赖）。
