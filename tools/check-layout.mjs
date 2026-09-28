#!/usr/bin/env node
// Run tools/layout-check.html in headless Chrome (DevTools protocol, no npm deps) and print its report.
//
//   python3 -m http.server 8000 --directory <embedded-system>   (separate terminal)
//   node tools/check-layout.mjs [base-url]                       (default http://localhost:8000)
//
// Exit code 0 when every header-geometry and theme-boot check passes, 1 otherwise. Needs Node 22+.
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

let BASE = process.argv[2] || 'http://localhost:8000';
while (BASE.endsWith('/')) BASE = BASE.slice(0, -1);
const PORT = 9333;
const CHROME = [
  process.env.CHROME,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find((p) => p && existsSync(p));

if (!CHROME) {
  console.error('Chrome not found: set the CHROME environment variable to the browser binary');
  process.exit(2);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const profile = mkdtempSync(join(tmpdir(), 'layout-check-'));
const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--hide-scrollbars',
  '--remote-debugging-port=' + PORT, '--user-data-dir=' + profile, 'about:blank',
], { stdio: 'ignore' });

async function cleanup() {
  const exited = new Promise((r) => chrome.once('exit', r));
  chrome.kill();
  await Promise.race([exited, sleep(3000)]);
  try {
    rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
  } catch (e) { /* temp profile is harmless if it lingers */ }
}

async function devtools() {
  for (let i = 0; i < 100; i++) {
    try {
      const res = await fetch('http://127.0.0.1:' + PORT + '/json/new?' + encodeURIComponent(BASE + '/tools/layout-check.html'), { method: 'PUT' });
      if (res.ok) return (await res.json()).webSocketDebuggerUrl;
    } catch (e) { /* Chrome still starting */ }
    await sleep(100);
  }
  throw new Error('Chrome DevTools endpoint did not come up');
}

async function main() {
  const ws = new WebSocket(await devtools());
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  let id = 0;
  const pending = new Map();
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (pending.has(msg.id)) { pending.get(msg.id)(msg.result); pending.delete(msg.id); }
  };
  const evaluate = (expression) => new Promise((resolve) => {
    id += 1;
    pending.set(id, (result) => resolve(result && result.result ? result.result.value : undefined));
    ws.send(JSON.stringify({ id, method: 'Runtime.evaluate', params: { expression, returnByValue: true } }));
  });

  const deadline = Date.now() + 10 * 60 * 1000;
  let done = null;
  while (!done && Date.now() < deadline) {
    await sleep(500);
    done = await evaluate("document.body && document.body.getAttribute('data-done')");
  }
  const report = await evaluate("document.getElementById('report') ? document.getElementById('report').textContent : ''");
  console.log(report || '(no report)');
  ws.close();
  return done === 'pass';
}

main()
  .then(async (ok) => { await cleanup(); process.exit(ok ? 0 : 1); })
  .catch(async (err) => { console.error(err); await cleanup(); process.exit(2); });
