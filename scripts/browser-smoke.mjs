import http from 'node:http';
import { spawn } from 'node:child_process';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';

const ROOT = process.cwd();
const PORT = 4173;
const DEBUG_PORT = 9222;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const IS_HEADFUL = process.argv.includes('--headful');
const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
];

const CONTENT_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'text/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function findChrome() {
  for (const candidate of CHROME_PATHS) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {}
  }
  throw new Error('Chrome/Edge executable not found.');
}

async function startStaticServer() {
  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, BASE_URL);
      let filePath = decodeURIComponent(url.pathname);
      if (filePath === '/') filePath = '/index.html';
      const absPath = path.join(ROOT, filePath);
      const stat = await fs.stat(absPath);
      const targetPath = stat.isDirectory() ? path.join(absPath, 'index.html') : absPath;
      const ext = path.extname(targetPath).toLowerCase();
      const body = await fs.readFile(targetPath);
      res.writeHead(200, { 'Content-Type': CONTENT_TYPES[ext] || 'application/octet-stream' });
      res.end(body);
    } catch (error) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('Not Found');
    }
  });

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(PORT, '127.0.0.1', resolve);
  });

  return server;
}

class CDPSession {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.nextId = 1;
    this.pending = new Map();
    this.events = [];
    this.eventListeners = new Map();
  }

  async connect() {
    await new Promise((resolve, reject) => {
      this.ws.addEventListener('open', resolve, { once: true });
      this.ws.addEventListener('error', reject, { once: true });
      this.ws.addEventListener('message', event => {
        const message = JSON.parse(event.data);
        if (message.id) {
          const pending = this.pending.get(message.id);
          if (!pending) return;
          this.pending.delete(message.id);
          if (message.error) pending.reject(new Error(message.error.message));
          else pending.resolve(message.result);
          return;
        }

        this.events.push(message);
        const listeners = this.eventListeners.get(message.method) || [];
        listeners.forEach(listener => listener(message.params));
      });
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.nextId++;
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  waitForEvent(method, predicate = () => true, timeoutMs = 10000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        cleanup();
        reject(new Error(`Timed out waiting for ${method}`));
      }, timeoutMs);

      const listener = params => {
        if (!predicate(params)) return;
        cleanup();
        resolve(params);
      };

      const cleanup = () => {
        clearTimeout(timer);
        const listeners = this.eventListeners.get(method) || [];
        this.eventListeners.set(method, listeners.filter(item => item !== listener));
      };

      const listeners = this.eventListeners.get(method) || [];
      listeners.push(listener);
      this.eventListeners.set(method, listeners);
    });
  }

  async evaluate(expression) {
    const result = await this.send('Runtime.evaluate', {
      expression,
      awaitPromise: true,
      returnByValue: true
    });
    return result.result?.value;
  }

  async close() {
    this.ws.close();
  }
}

async function getPageWsUrl() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const targets = await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/list`).then(r => r.json());
      const page = targets.find(target => target.type === 'page');
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch {}
    await delay(200);
  }
  throw new Error('DevTools page target not available.');
}

async function run() {
  const chromePath = await findChrome();
  const userDataDir = await fs.mkdtemp(path.join(os.tmpdir(), 'woof-cal-browser-'));
  const server = await startStaticServer();

  let chrome;
  let client;

  try {
    chrome = spawn(chromePath, [
      ...(IS_HEADFUL ? [] : ['--headless=new']),
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      `--remote-debugging-port=${DEBUG_PORT}`,
      `--user-data-dir=${userDataDir}`,
      `${BASE_URL}/index.html`
    ], { stdio: 'ignore' });

    const wsUrl = await getPageWsUrl();
    client = new CDPSession(wsUrl);
    await client.connect();

    const consoleErrors = [];
    const exceptions = [];

    await client.send('Page.enable');
    await client.send('Runtime.enable');
    await client.send('Log.enable');

    client.eventListeners.set('Runtime.consoleAPICalled', [params => {
      if (params.type === 'error') {
        consoleErrors.push(params.args?.map(arg => arg.value ?? arg.description).join(' '));
      }
    }]);
    client.eventListeners.set('Runtime.exceptionThrown', [params => {
      exceptions.push(params.exceptionDetails?.text || 'Runtime exception');
    }]);

    const loaded = client.waitForEvent('Page.loadEventFired', () => true, 15000);
    await client.send('Page.navigate', { url: `${BASE_URL}/index.html` });
    await loaded;
    await delay(2500);

    const results = [];

    const title = await client.evaluate('document.title');
    assert(Boolean(title), 'Page title is empty.');
    results.push(`Loaded page: ${title}`);

    await client.evaluate(`
      localStorage.clear();
      location.reload();
    `);
    await client.waitForEvent('Page.loadEventFired', () => true, 15000);
    await delay(2500);

    const today = await client.evaluate(`
      (() => {
        const d = new Date();
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return \`\${y}-\${m}-\${day}\`;
      })()
    `);

    await client.evaluate(`
      document.getElementById('manual-name').value = 'Smoke Apple';
      document.getElementById('manual-cal').value = '123';
      document.getElementById('manual-pro').value = '1.1';
      document.getElementById('manual-fat').value = '0.5';
      document.getElementById('manual-carb').value = '30';
      document.getElementById('btn-add-record').click();
    `);
    await delay(400);
    assert((await client.evaluate(`document.getElementById('total-cal-display').innerText`)) === '123', 'Manual add did not update total calories.');
    results.push('Manual add works');

    await client.evaluate(`
      document.getElementById('manual-name').value = 'Smoke Apple';
      document.getElementById('manual-cal').value = '123';
      document.getElementById('btn-fav-save-main').click();
    `);
    await delay(400);
    const favoritesCount = await client.evaluate(`JSON.parse(localStorage.getItem('myFavorites') || '[]').length`);
    assert(favoritesCount === 1, 'Favorite save did not persist.');
    results.push('Favorite save works');

    await client.evaluate(`document.getElementById('btn-fav-load-main').click()`);
    await delay(300);
    assert(await client.evaluate(`document.getElementById('fav-modal').style.display === 'flex'`), 'Favorite modal did not open.');
    assert(await client.evaluate(`document.querySelectorAll('#fav-list-container .fav-item-row').length === 1`), 'Favorite modal list is incorrect.');
    results.push('Favorite modal works');
    await client.evaluate(`document.getElementById('btn-fav-close').click()`);

    await client.evaluate(`
      document.getElementById('daily-weight-input').value = '61.2';
      document.getElementById('btn-save-weight').click();
    `);
    await delay(300);
    assert((await client.evaluate(`localStorage.getItem('weight_${today}')`)) === '61.2', 'Weight save did not persist.');
    results.push('Weight save works');

    const nextDate = await client.evaluate(`
      (() => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return \`\${y}-\${m}-\${day}\`;
      })()
    `);
    const switchedForward = await client.evaluate(`
      (() => {
        const input = document.getElementById('current-date');
        input.value = '${nextDate}';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        return input.value;
      })()
    `);
    await delay(300);
    assert(switchedForward === nextDate, `Could not switch date forward. Value became ${switchedForward}`);
    assert((await client.evaluate(`document.getElementById('total-cal-display').innerText`)) === '0', 'Date switch did not reset to empty day.');
    const switchedBack = await client.evaluate(`
      (() => {
        const input = document.getElementById('current-date');
        input.value = '${today}';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        return input.value;
      })()
    `);
    await delay(300);
    assert(switchedBack === today, `Could not switch date back. Value became ${switchedBack}`);
    const restoredTotal = await client.evaluate(`document.getElementById('total-cal-display').innerText`);
    const debugState = await client.evaluate(`
      (() => ({
        inputValue: document.getElementById('current-date').value,
        localStorageKeys: Object.keys(localStorage).sort(),
        todayRecord: localStorage.getItem('record_${today}'),
        tomorrowRecord: localStorage.getItem('record_${nextDate}')
      }))()
    `);
    assert(
      restoredTotal === '123',
      `Date switch back did not restore record. Actual total: ${restoredTotal}. Debug: ${JSON.stringify(debugState)}`
    );
    results.push('Date switching works');

    const themeBefore = await client.evaluate(`document.documentElement.getAttribute('data-theme')`);
    await client.evaluate(`document.getElementById('btn-toggle-theme-setting').click()`);
    await delay(300);
    const themeAfter = await client.evaluate(`document.documentElement.getAttribute('data-theme')`);
    assert(themeBefore !== themeAfter, 'Theme toggle did not change theme.');
    results.push('Theme toggle works');

    await client.evaluate(`
      document.getElementById('btn-open-lang-setting').click();
      document.querySelector('.lang-option[data-lang="en"]').click();
    `);
    await client.waitForEvent('Page.loadEventFired', () => true, 15000);
    await delay(2500);
    assert((await client.evaluate(`document.getElementById('nav-settings').innerText`)) === 'Settings', 'Language switch to English failed.');
    results.push('Language switch works');

    await client.evaluate(`document.querySelector('.nav-item[data-target="view-ai"]').click()`);
    await delay(300);
    assert(await client.evaluate(`document.getElementById('view-ai').classList.contains('active-view')`), 'AI view did not activate.');
    results.push('AI view navigation works');

    await client.evaluate(`document.getElementById('analyze-btn').click()`);
    await delay(300);
    const latestToast = await client.evaluate(`
      (() => {
        const toasts = [...document.querySelectorAll('.toast')];
        return toasts.length ? toasts[toasts.length - 1].innerText : '';
      })()
    `);
    assert(Boolean(latestToast), 'AI validation toast did not appear.');
    results.push('AI validation toast works');

    const swSupported = await client.evaluate(`'serviceWorker' in navigator`);
    results.push(`Service worker supported: ${swSupported}`);

    const isExpectedTurnstileIssue = message => /Turnstile|110200/i.test(message || '');
    const unexpectedConsoleErrors = consoleErrors.filter(message => !isExpectedTurnstileIssue(message));
    const unexpectedExceptions = exceptions.filter(message => !isExpectedTurnstileIssue(message));

    console.log('SMOKE_RESULTS_START');
    for (const line of results) console.log(`PASS: ${line}`);
    console.log(`Console errors: ${consoleErrors.length}`);
    if (consoleErrors.length) console.log(consoleErrors.join('\n'));
    console.log(`Runtime exceptions: ${exceptions.length}`);
    if (exceptions.length) console.log(exceptions.join('\n'));
    if (consoleErrors.length || exceptions.length) {
      console.log(`Known Turnstile-only warnings: ${consoleErrors.length + exceptions.length - unexpectedConsoleErrors.length - unexpectedExceptions.length}`);
    }
    console.log('SMOKE_RESULTS_END');

    if (unexpectedConsoleErrors.length || unexpectedExceptions.length) {
      process.exitCode = 1;
    }
  } finally {
    if (client) await client.close().catch(() => {});
    if (chrome && !chrome.killed) chrome.kill('SIGKILL');
    server.close();
    await fs.rm(userDataDir, { recursive: true, force: true }).catch(() => {});
  }
}

run().catch(error => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
