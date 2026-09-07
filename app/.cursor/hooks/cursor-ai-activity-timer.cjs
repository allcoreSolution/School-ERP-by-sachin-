#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

// Baked at install; config.json is fallback only.
const BAKED_LEDGER = "c:\\Users\\hp\\AppData\\Roaming\\Antigravity IDE\\User\\globalStorage\\philau2512.cursor-ai-activity-timer\\events";
const BAKED_WS = "0bcc30aa6b7f";
const configPath = path.join(__dirname, 'cursor-ai-activity-timer.config.json');
const hookNames = new Set(["sessionStart","sessionEnd","beforeSubmitPrompt","stop","afterAgentResponse","afterAgentThought","preToolUse","postToolUse","postToolUseFailure","subagentStart","subagentStop","beforeShellExecution","afterShellExecution","beforeMCPExecution","afterMCPExecution","beforeReadFile","afterFileEdit","preCompact","beforeTabFileRead","afterTabFileEdit"]);
const HEAD = 24576; // only need hook_event_name + session near JSON start

const done = () => { try { process.exit(0); } catch {} };

const normalizeHook = (name) => {
  if (!name) return null;
  if (hookNames.has(name)) return name;
  const camel = name.charAt(0).toLowerCase() + name.slice(1);
  return hookNames.has(camel) ? camel : null;
};

const pickStr = (raw, key) => {
  const re = new RegExp('"' + key + '"\\s*:\\s*"((?:\\\\.|[^"\\\\])*)"');
  const m = re.exec(raw);
  if (!m) return null;
  try { return JSON.parse('"' + m[1] + '"'); } catch { return m[1]; }
};

const sessionOf = (raw) => {
  for (const key of ['session_id', 'conversation_id', 'parent_conversation_id']) {
    const v = pickStr(raw, key);
    if (v && v.length <= 256) return v;
  }
  return '-';
};

const ymd = () => {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
};

// Read only the first HEAD bytes — never load multi-MB tool payloads into a string.
const readHead = () => {
  try {
    const buf = Buffer.allocUnsafe(HEAD);
    const n = fs.readSync(0, buf, 0, HEAD, null);
    return n > 0 ? buf.toString('utf8', 0, n) : '';
  } catch {
    return '';
  }
};

const resolveTarget = () => {
  if (typeof BAKED_LEDGER === 'string' && BAKED_LEDGER && typeof BAKED_WS === 'string' && BAKED_WS) {
    return { ledgerPath: BAKED_LEDGER, ws: BAKED_WS };
  }
  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const ledgerPath = config.ledgerPath;
    const ws = config.workspaceId;
    if (typeof ledgerPath === 'string' && ledgerPath && typeof ws === 'string' && ws) {
      return { ledgerPath, ws };
    }
  } catch {}
  return null;
};

const tick = (ledgerPath, ws, hook, session) => {
  const file = path.join(ledgerPath, 'events-' + ymd() + '.jsonl');
  const line = '+\t' + ws + '\t' + hook + '\t' + session + '\t' + Date.now() + '\n';
  try {
    fs.appendFileSync(file, line);
  } catch (e) {
    if (e && e.code === 'ENOENT') {
      try {
        fs.mkdirSync(ledgerPath, { recursive: true });
        fs.appendFileSync(file, line);
      } catch {}
    }
  }
};

try {
  const raw = readHead();
  if (!raw) { done(); return; }

  const hook = normalizeHook(pickStr(raw, 'hook_event_name'));
  if (!hook) { done(); return; }

  const target = resolveTarget();
  if (!target) { done(); return; }

  tick(target.ledgerPath, target.ws, hook, sessionOf(raw));
  done();
} catch {
  done();
}
