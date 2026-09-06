# 模式解剖（mode-anatomy）—— 调研一次落成的资产

本文件是「怎么造一个模式」的机制知识，存这里是为了**下次不再重读 DSH 源码**。内容来自三次造模式实测（小说/编程/办公）与 DSH 发行版核对。正文只引用本文件，按需读取。

## 预设根目录

- **用户根**：`~/.dsh/.agent-presets/`（Windows 即 `C:\Users\<你>\.dsh\.agent-presets\`）。写这里；发现是每次实时扫描，**无需重启**，新建会话即可在模式选择器看到。
- **发行版蓝本**：`<workspace>\node_modules\@deepseek-ai\dsh\config\agent-presets\{standard,code,cordis,minimal}\`。

## 蓝本清单（选哪个）

| id | 名称 | 何时选 |
|---|---|---|
| standard | 标准模式 | 默认；全功能编码 agent |
| code | PTC 模式 | 要 Code Mode SDK 时 |
| minimal | （无中文名） | 只要精简人设 + 两工具时 |
| cordis | （插件开发） | 自带 cordis 插件开发相关 skill |

## 文件结构

- `agent.cordis.yml`：AGENT-PLANE 组合，YAML 行列表。第一行 `- id: persona`，`name: '@deepseek-ai/dsh-persona'`，`config.text` 是模式人设（`{{model}}`/`{{cwd}}` 自动解析）。其余是工具行（bash/pwsh、fs、jobs、skills、goals、plan、compaction、subagent/workflow、ask-user、todo、web）。
- `preset.yml`：`name`（显示名）+ `description`（介绍）+ 可选 `order`（排序）。
- `skills/`（可选）：模式专属技能，只在该模式会话出现。

## 校验 API（agentPresets 服务）

- `list()` / `resolve(id)` / `copy(from, id, name)` / `standingKeyFor(id)`（返回 scope key，挂载 OK）。
- 文件形状校验：`scripts/validate-preset.mjs`（无第三方依赖，检查文件齐全、persona 行、preset.yml 有 name）。

## 探针插件（方式 A）要点

- `cordis_define`（plugin: `{kind:'new', idPrefix:'preset'}`）+ `cordis_run` 注册临时插件；`inject: ['agentPresets','tools']`，在 apply 里用 defineTool 暴露 `preset_copy`/`preset_validate` 等；用完 `cordis_undefine` 删除。
- **已知坑（编程模式实测）**：`cordis_define` 的 `plugin` 参数在传输层可能被当字符串、对象校验反复失败——遇到就**立刻转方式 B（文件手写）**，别死磕调试。

## 隔离性（汇报时向用户说明）

- 编排独立：一份独立拷贝，不引用/不修改其它预设。
- 对话记录：按会话独立存储，模式间天然隔离。
- 技能：`~/.dsh/skills` 全局技能所有模式可见；放 `<id>/skills/` 的技能仅该模式可见。
