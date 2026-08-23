# mode-creator

[English](./README.md) · [简体中文](./README.zh-CN.md) · [हिन्दी](./README.hi.md) · [Português](./README.pt.md) · [Español](./README.es.md) · [日本語](./README.ja.md) · [Deutsch](./README.de.md) · [Français](./README.fr.md) · [Русский](./README.ru.md) · [한국어](./README.ko.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](./CHANGELOG.md)
[![DSH-only](https://img.shields.io/badge/DSH--only-DeepSeek%20Harness-orange.svg)](#dsh-only)
[![100%25 AI-crafted](https://img.shields.io/badge/100%25-AI--crafted-9cf.svg)](#disclaimer)

> ⚠️ **DSH-ONLY (DeepSeek Harness).** Esta skill é voltada ao sistema de agent presets do **DeepSeek Harness** e **não é multiplataforma**. Ela **não** se adapta ao Codex CLI nem ao Claude Code. Instale-a apenas se você executar o DeepSeek Harness.

**Crie ou copie um modo DSH isolado (agent preset) a partir de um blueprint validado — copie, não construa; valide, não confie no olho.**

O `mode-creator` transforma "crie um modo XX" em um agent preset DSH montável, validado e isolado. Ele copia um blueprint de release (`standard` / `code` / `minimal`), edita apenas a persona e o `preset.yml`, valida o resultado por máquina e entrega — seguindo regras rígidas de economia de tokens.

## Por que ele se destaca

- **📋 Copie, não construa** — reutilize blueprints que já são montáveis em vez de escrever um preset do zero.
- **✅ Valide por máquina, não confie no olho** — verificação de montagem (`standingKeyFor`) ou `scripts/validate-preset.mjs` antes da entrega.
- **⚡ Regras de economia de tokens** — degradação rápida em caso de falha (≤3 tentativas e depois fallback para escrita em arquivo), uma única escalada de sandbox, conhecimento de mecanismos mantido em references.
- **🔒 Modos isolados** — cada modo ganha sua própria cópia de orquestração, histórico de conversa e, opcionalmente, skills com escopo no próprio modo.

## Como funciona — 6 passos

1. Travar a identidade (id + descrição + blueprint).
2. Copiar o blueprint para `~/.dsh/.agent-presets/<id>/`.
3. Editar apenas o `preset.yml` + a linha da persona no `agent.cordis.yml`.
4. Validar por máquina (montagem OK / verificação de estrutura).
5. Limpar + relatar caminho, troca de modo e isolamento.

## Instalação

```
~/.dsh/skills/mode-creator/    # global
.dsh/skills/mode-creator/      # por projeto
```

Acione-o com frases como *"crie um modo XX"*, *"faça um modo de trabalho isolado"*.

## Documentação

- `references/mode-anatomy.md` — raiz do preset, blueprints, estrutura de arquivos, API de validação, armadilhas conhecidas
- `scripts/validate-preset.mjs` — validação de estrutura (sem dependências de terceiros)

## Skills complementares

- **[set-skill](https://github.com/tydm2/create-generate-skill)** — criar/auditar skills (listadas no seu menu `/skill`).
- **[workflow-builder](https://github.com/tydm2/workflow-builder-skill)** — criar fluxos de trabalho multiagente (multiplataforma, diferente desta).
- **[gh-publisher](https://github.com/tydm2/gh-publisher)** — publicar arquivos no GitHub sem git.

## Requisitos

- **DeepSeek Harness (DSH)** — este é o único host suportado.

## Aviso legal

> **Esta skill é 100% criada por IA.** Problemas são inevitáveis — discussões e pull requests são bem-vindos. O autor itera ativamente sobre ela com base no uso no mundo real.

## Licença

[MIT](./LICENSE)
