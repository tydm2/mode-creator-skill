# mode-creator

[English](./README.md) · [简体中文](./README.zh-CN.md) · [हिन्दी](./README.hi.md) · [Português](./README.pt.md) · [Español](./README.es.md) · [日本語](./README.ja.md) · [Deutsch](./README.de.md) · [Français](./README.fr.md) · [Русский](./README.ru.md) · [한국어](./README.ko.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](./CHANGELOG.md)
[![DSH-only](https://img.shields.io/badge/DSH--only-DeepSeek%20Harness-orange.svg)](#dsh-only)
[![100%25 AI-crafted](https://img.shields.io/badge/100%25-AI--crafted-9cf.svg)](#disclaimer)

> ⚠️ **DSH-ONLY (DeepSeek Harness).** यह skill **DeepSeek Harness** के agent-preset सिस्टम के लिए बनी है और **क्रॉस-प्लेटफ़ॉर्म नहीं** है। यह Codex CLI या Claude Code के अनुकूल **नहीं** है। इसे केवल तभी इंस्टॉल करें जब आप DeepSeek Harness चला रहे हों।

**एक मान्य (validated) blueprint से एक अलग-थलग (isolated) DSH mode (agent preset) बनाएँ या कॉपी करें — बनाएँ नहीं, कॉपी करें; आँख से नहीं, मशीन से जाँचें।**

`mode-creator` "create an XX mode" को एक mount होने योग्य, मान्य और अलग-थलग DSH agent preset में बदल देता है। यह एक release blueprint (`standard` / `code` / `minimal`) को कॉपी करता है, केवल persona + `preset.yml` में बदलाव करता है, परिणाम को मशीन से जाँचता है, और — सख्त token बचाने वाले नियमों का पालन करते हुए — डिलीवर करता है।

## यह ख़ास क्यों है

- **📋 बनाएँ नहीं, कॉपी करें** — शून्य से preset लिखने की बजाय पहले से mount होने योग्य blueprints का दोबारा इस्तेमाल करें।
- **✅ आँख से नहीं, मशीन से जाँचें** — डिलीवरी से पहले mount जाँच (`standingKeyFor`) या `scripts/validate-preset.mjs`।
- **⚡ Token बचाने वाले नियम** — fail-fast downgrade (≤3 retries, फिर file-writing fallback), एक sandbox escalation, तंत्र-ज्ञान references में रखा जाता है।
- **🔒 अलग-थलग modes** — हर mode को अपनी अलग orchestration कॉपी, conversation history, और वैकल्पिक mode-scoped skills मिलती हैं।

## यह कैसे काम करता है — 6 चरण

1. पहचान लॉक करें (id + description + blueprint)।
2. blueprint को `~/.dsh/.agent-presets/<id>/` में कॉपी करें।
3. केवल `preset.yml` + `agent.cordis.yml` में persona लाइन में बदलाव करें।
4. मशीन से जाँचें (mount OK / shape जाँच)।
5. साफ़-सफ़ाई करें + path, switching, isolation की रिपोर्ट दें।

## इंस्टॉल करें

```
~/.dsh/skills/mode-creator/    # global
.dsh/skills/mode-creator/      # per project
```

इसे *"create an XX mode"*, *"make an isolated working mode"* जैसे वाक्यांशों से ट्रिगर करें।

## दस्तावेज़

- `references/mode-anatomy.md` — preset root, blueprints, file structure, validation API, ज्ञात समस्याएँ
- `scripts/validate-preset.mjs` — shape जाँच (कोई third-party deps नहीं)

## सहयोगी skills

- **[set-skill](https://github.com/tydm2/create-generate-skill)** — skills बनाएँ/जाँचें (इसके `/skill` मेन्यू में सूचीबद्ध)।
- **[workflow-builder](https://github.com/tydm2/workflow-builder-skill)** — multi-agent workflows बनाएँ (इसके विपरीत, क्रॉस-प्लेटफ़ॉर्म)।
- **[gh-publisher](https://github.com/tydm2/gh-publisher)** — बिना git के GitHub पर फ़ाइलें प्रकाशित करें।

## आवश्यकताएँ

- **DeepSeek Harness (DSH)** — यही एकमात्र समर्थित host है।

## अस्वीकरण

> **यह skill 100% AI द्वारा बनाई गई है।** समस्याएँ अपरिहार्य हैं — चर्चा और pull requests का स्वागत है। लेखक वास्तविक उपयोग के आधार पर इस पर लगातार सुधार करता रहता है।

## License

[MIT](./LICENSE)
