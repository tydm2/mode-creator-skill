// validate-preset.mjs - 校验一个模式(agent preset)目录的形状（无第三方依赖）
// 用法: node validate-preset.mjs <preset目录绝对路径>
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.argv[2];
if (!dir) { console.error('用法: node validate-preset.mjs <preset目录>'); process.exit(2); }

let exit = 0;
const fail = (m) => { console.log('[FAIL] ' + m); exit = 1; };
const pass = (m) => { console.log('[PASS] ' + m); };

const agentYml = join(dir, 'agent.cordis.yml');
const presetYml = join(dir, 'preset.yml');

if (!existsSync(agentYml)) fail('缺 agent.cordis.yml'); else pass('存在 agent.cordis.yml');
if (!existsSync(presetYml)) fail('缺 preset.yml'); else pass('存在 preset.yml');

// 形状校验：正则级检查（不依赖 js-yaml，任何 node 环境可跑）
function read(p) {
  try { return readFileSync(p, 'utf8').replace(/^\uFEFF/, ''); }
  catch { return ''; }
}

const agent = read(agentYml);
if (agent) {
  const rows = agent.split(/\r?\n/).filter((l) => /^\s*-\s+id:/.test(l));
  if (rows.length === 0) fail('agent.cordis.yml 未解析到任何工具行（应为 - id: ... 列表）');
  else pass(`agent.cordis.yml 顶层 ${rows.length} 行`);
  if (!/- id:\s*persona\b/.test(agent)) fail('缺 persona 行（人设）');
  else pass('persona 行存在');
  // 每行必须有 name 字段
  for (const r of rows) {
    // 取该行及其后续缩进块，直到下一个 - id:
    const body = agent.slice(agent.indexOf(r) + r.length);
    const next = body.search(/^\s*-\s+id:/m);
    const block = next === -1 ? body : body.slice(0, next);
    const id = /^\s*-\s+id:\s*(\S+)/m.exec(r)?.[1] ?? '?';
    if (!/^\s*name:/m.test(block)) fail(`行 "${id}" 缺 name`);
  }
}

const preset = read(presetYml);
if (preset) {
  const nm = /^name:\s*(.+?)\s*$/m.exec(preset);
  if (nm) pass(`preset.yml name: ${nm[1]}`);
  else fail('preset.yml 缺 name');
  const ds = /^description:\s*(.+?)\s*$/m.exec(preset);
  if (ds) pass('preset.yml 有 description');
}

console.log(exit === 0 ? 'RESULT: ALL PASS' : 'RESULT: FAILURES');
process.exit(exit);
