// validate-preset.mjs - validate the shape of a mode (agent preset) directory (no third-party deps)
// Usage: node validate-preset.mjs <absolute-path-to-preset-dir>
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.argv[2];
if (!dir) { console.error('Usage: node validate-preset.mjs <preset-dir>'); process.exit(2); }

let exit = 0;
const fail = (m) => { console.log('[FAIL] ' + m); exit = 1; };
const pass = (m) => { console.log('[PASS] ' + m); };

const agentYml = join(dir, 'agent.cordis.yml');
const presetYml = join(dir, 'preset.yml');

if (!existsSync(agentYml)) fail('missing agent.cordis.yml'); else pass('agent.cordis.yml present');
if (!existsSync(presetYml)) fail('missing preset.yml'); else pass('preset.yml present');

// shape validation: regex-level checks (no js-yaml, runs in any node env)
function read(p) {
  try { return readFileSync(p, 'utf8').replace(/^\uFEFF/, ''); }
  catch { return ''; }
}

const agent = read(agentYml);
if (agent) {
  const rows = agent.split(/\r?\n/).filter((l) => /^\s*-\s+id:/.test(l));
  if (rows.length === 0) fail('agent.cordis.yml parsed no tool rows (expected a "- id: ..." list)');
  else pass(`agent.cordis.yml top-level ${rows.length} rows`);
  if (!/- id:\s*persona\b/.test(agent)) fail('missing persona row (persona)');
  else pass('persona row present');
  // every row must have a name field
  for (const r of rows) {
    // take this row and its indented block, until the next - id:
    const body = agent.slice(agent.indexOf(r) + r.length);
    const next = body.search(/^\s*-\s+id:/m);
    const block = next === -1 ? body : body.slice(0, next);
    const id = /^\s*-\s+id:\s*(\S+)/m.exec(r)?.[1] ?? '?';
    if (!/^\s*name:/m.test(block)) fail(`row "${id}" missing name`);
  }
}

const preset = read(presetYml);
if (preset) {
  const nm = /^name:\s*(.+?)\s*$/m.exec(preset);
  if (nm) pass(`preset.yml name: ${nm[1]}`);
  else fail('preset.yml missing name');
  const ds = /^description:\s*(.+?)\s*$/m.exec(preset);
  if (ds) pass('preset.yml has description');
}

console.log(exit === 0 ? 'RESULT: ALL PASS' : 'RESULT: FAILURES');
process.exit(exit);
