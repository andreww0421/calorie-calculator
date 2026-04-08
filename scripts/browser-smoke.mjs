import http from 'node:http';
import { spawn } from 'node:child_process';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';

const ROOT = process.cwd();
const IS_HEADFUL = process.argv.includes('--headful');
const RUN_REAL_AI = process.argv.includes('--real-ai');
const DUMP_AI = process.argv.includes('--dump-ai');
const ATTACH_EXISTING_BROWSER = process.argv.includes('--attach-browser');
const URL_ARG = process.argv.find(arg => arg.startsWith('--url='));
const UPLOAD_ARG = process.argv.find(arg => arg.startsWith('--upload-image='));
const PORT_ARG = process.argv.find(arg => arg.startsWith('--port='));
const DEBUG_PORT_ARG = process.argv.find(arg => arg.startsWith('--debug-port='));
const PORT = Number.parseInt(PORT_ARG?.slice('--port='.length) || '4173', 10);
const DEBUG_PORT = Number.parseInt(DEBUG_PORT_ARG?.slice('--debug-port='.length) || '9222', 10);
const BASE_URL = URL_ARG ? URL_ARG.slice('--url='.length).replace(/\/$/, '') : `http://127.0.0.1:${PORT}`;
const UPLOAD_IMAGE_PATH = UPLOAD_ARG ? UPLOAD_ARG.slice('--upload-image='.length) : '';
const CHROME_PATHS = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
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

async function clickSelector(client, selector) {
  const selectorLiteral = JSON.stringify(selector);
  await client.evaluate(`(() => {
    document.querySelector(${selectorLiteral})?.click();
  })()`);
  await delay(250);
}

async function setInputValue(client, selector, value) {
  const selectorLiteral = JSON.stringify(selector);
  const valueLiteral = JSON.stringify(value);
  const found = await client.evaluate(`(() => {
    const el = document.querySelector(${selectorLiteral});
    if (!el) return false;
    el.value = ${valueLiteral};
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  })()`);
  assert(found, `Could not find input: ${selector}`);
  await delay(250);
}

async function getActiveViewState(client) {
  return client.evaluate(`(() => ({
    daily: document.getElementById('view-daily')?.classList.contains('active-view') || false,
    dashboard: document.getElementById('view-dashboard')?.classList.contains('active-view') || false,
    ai: document.getElementById('view-ai')?.classList.contains('active-view') || false,
    settings: document.getElementById('view-settings')?.classList.contains('active-view') || false
  }))()`);
}

async function readAiSmokeState(client) {
  return client.evaluate(`(() => {
    const state = window.__woofAppStateBridge?.getAppState?.() || {};
    const flow = state.analysisFlow || {};
    const modal = document.getElementById('analysis-modal');
    const content = document.getElementById('analysis-content');
    const statusNote = document.getElementById('turnstile-status-note');
    const toast = [...document.querySelectorAll('.toast')]
      .map((node) => node.innerText?.trim() || '')
      .filter(Boolean)
      .pop() || '';

    return {
      modalOpen: modal?.style.display === 'flex',
      tempAIResult: Boolean(state.tempAIResult),
      flowStatus: String(flow.status || ''),
      flowError: String(flow.lastError || ''),
      verificationUnavailable: Boolean(flow.verificationUnavailable),
      verificationMessage: String(flow.verificationMessage || ''),
      statusNote: String(statusNote?.innerText?.trim() || ''),
      visibleStatusNote: Boolean(statusNote && !statusNote.hidden && statusNote.innerText?.trim()),
      toast,
      resultTitle: String(content?.querySelector('h3')?.innerText?.trim() || ''),
      resultCards: Number(content?.querySelectorAll('.ai-nutri-item')?.length || 0)
    };
  })()`);
}

function isVerificationSignal(state = {}) {
  const combined = [
    state.flowStatus,
    state.flowError,
    state.verificationMessage,
    state.statusNote,
    state.toast
  ].join(' ').toLowerCase();

  return (
    state.verificationUnavailable ||
    combined.includes('turnstile') ||
    combined.includes('110200') ||
    combined.includes('security verification') ||
    combined.includes('verification')
  );
}

async function exerciseRealAiFlow(client, results, { requireResult = false } = {}) {
  await client.evaluate(`(() => {
    if (typeof window.__woofUiBridge?.openAIView === 'function') {
      window.__woofUiBridge.openAIView();
      return 'bridge';
    }
    document.querySelector('.nav-item[data-target="view-ai"]')?.click();
    return 'nav';
  })()`);
  await delay(350);

  let aiViewState = await getActiveViewState(client);
  if (!aiViewState.ai) {
    await client.evaluate(`(async () => {
      const ui = await import('./js/ui.js');
      if (typeof ui.switchView === 'function') {
        ui.switchView('view-ai');
      }
    })()`);
    await delay(350);
    aiViewState = await getActiveViewState(client);
  }
  assert(aiViewState.ai, 'AI view should remain reachable.');

  await setInputValue(client, '#ai-text-desc', 'One bowl of beef noodle soup, one tea egg, and one plate of blanched greens.');
  await delay(1000);

  const preSubmitState = await readAiSmokeState(client);
  if (preSubmitState.visibleStatusNote && isVerificationSignal(preSubmitState)) {
    const message = preSubmitState.statusNote || preSubmitState.verificationMessage || preSubmitState.toast || preSubmitState.flowError;
    if (requireResult) {
      throw new Error(`Real AI verification blocked before submit: ${message}`);
    }
    results.push(`Real AI surfaced clear verification/domain error before submit: ${message}`);
    return;
  }

  await clickSelector(client, '#analyze-btn');

  let aiOutcome = null;
  for (let attempt = 0; attempt < 60; attempt += 1) {
    await delay(1000);
    aiOutcome = await readAiSmokeState(client);

    if (aiOutcome.modalOpen && aiOutcome.tempAIResult) {
      assert(aiOutcome.resultTitle, 'Real AI result modal should render a meal title.');
      assert(aiOutcome.resultCards > 0, 'Real AI result modal should render nutrition cards.');
      results.push(`Real AI analysis returned a result modal (${aiOutcome.resultCards} nutrition cards)`);
      return;
    }

    if (isVerificationSignal(aiOutcome) && !aiOutcome.modalOpen && !aiOutcome.tempAIResult) {
      const message = aiOutcome.statusNote || aiOutcome.verificationMessage || aiOutcome.toast || aiOutcome.flowError;
      if (requireResult) {
        throw new Error(`Real AI verification failed on the production URL: ${message}`);
      }
      results.push(`Real AI surfaced clear verification/domain error: ${message}`);
      return;
    }
  }

  assert(aiOutcome, 'Real AI smoke did not produce a result state.');
  assert(
    aiOutcome.modalOpen && aiOutcome.tempAIResult,
    `Real AI smoke did not reach a result modal. State: ${JSON.stringify(aiOutcome)}`
  );
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

async function launchBrowser(browserPath, args) {
  const browser = spawn(browserPath, args, { stdio: 'ignore' });
  return { browser, pid: browser.pid };
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
          if (message.error) pending.reject(new Error(`${pending.method}: ${message.error.message}`));
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
      this.pending.set(id, { resolve, reject, method });
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

  async setFileInputFiles(selector, files) {
    await this.send('DOM.enable');
    const documentNode = await this.send('DOM.getDocument', {});
    const query = await this.send('DOM.querySelector', {
      nodeId: documentNode.root.nodeId,
      selector
    });
    if (!query.nodeId) {
      throw new Error(`Could not find file input: ${selector}`);
    }
    await this.send('DOM.setFileInputFiles', {
      nodeId: query.nodeId,
      files
    });
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

async function waitForDocumentReady(client, timeoutMs = 15000) {
  const start = Date.now();
  while ((Date.now() - start) < timeoutMs) {
    try {
      const readyState = await client.evaluate('document.readyState');
      if (readyState === 'interactive' || readyState === 'complete') {
        return;
      }
    } catch {}
    await delay(250);
  }
  throw new Error('Timed out waiting for document.readyState.');
}

async function run() {
  const chromePath = await findChrome();
  const userDataDir = await fs.mkdtemp(path.join(os.tmpdir(), 'woof-cal-browser-'));
  const server = URL_ARG ? null : await startStaticServer();
  const useHeadless = !IS_HEADFUL && (process.env.CI === 'true' || process.argv.includes('--headless'));

  let chrome;
  let browserPid = null;
  let client;

  try {
    if (!ATTACH_EXISTING_BROWSER) {
      const browserLaunch = await launchBrowser(chromePath, [
        ...(useHeadless ? ['--headless=new'] : []),
        '--disable-gpu',
        '--remote-allow-origins=*',
        '--no-first-run',
        '--no-default-browser-check',
        `--remote-debugging-port=${DEBUG_PORT}`,
        `--user-data-dir=${userDataDir}`,
        `${BASE_URL}/index.html`
      ]);
      chrome = browserLaunch.browser ? browserLaunch.browser : null;
      browserPid = browserLaunch.pid || null;
    }

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
      const details = params.exceptionDetails || {};
      const description = details.exception?.description || details.exception?.value || '';
      const stack = Array.isArray(details.stackTrace?.callFrames)
        ? details.stackTrace.callFrames.map((frame) => `${frame.url || '<anonymous>'}:${frame.lineNumber + 1}:${frame.columnNumber + 1}`).join('\n')
        : '';
      exceptions.push([description || details.text || 'Runtime exception', stack].filter(Boolean).join('\n'));
    }]);

    const targetUrl = URL_ARG ? BASE_URL : `${BASE_URL}/index.html`;
    await client.send('Page.navigate', { url: targetUrl });
    await waitForDocumentReady(client, URL_ARG ? 30000 : 15000);
    await delay(2500);

    const results = [];

    const title = await client.evaluate('document.title');
    assert(Boolean(title), 'Page title is empty.');
    results.push(`Loaded page: ${title}`);

    const iconHref = await client.evaluate(`
      document.querySelector('link[rel="icon"]')?.getAttribute('href') || ''
    `);
    assert(/calorie_icon\.png$/i.test(iconHref), `App icon should point to calorie_icon.png, got ${iconHref}`);
    results.push('App icon uses the original black-background logo');

    if (!URL_ARG) {
      await client.evaluate(`
        localStorage.clear();
        location.reload();
      `);
      await waitForDocumentReady(client, 15000);
      await delay(2500);
    }

    const today = await client.evaluate(`
      (() => {
        const d = new Date();
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return \`\${y}-\${m}-\${day}\`;
      })()
    `);

    if (!URL_ARG) {
      const onboardingState = await client.evaluate(`
        (() => ({
          onboardingVisible: !document.getElementById('onboarding-card').hidden,
          coachTitle: document.getElementById('txt-coach-title')?.innerText?.trim() || '',
          coachHeadline: document.getElementById('coach-headline')?.innerText?.trim() || '',
          goalProgressPresent: Boolean(document.getElementById('goal-insights-card'))
        }))()
      `);
      if (!onboardingState.onboardingVisible) {
        results.push('Onboarding card is already completed on initial load');
      }
      assert(Boolean(onboardingState.coachTitle), 'Coach card should render a title.');
      assert(Boolean(onboardingState.coachHeadline), 'Coach card should render a headline.');
      assert(!onboardingState.goalProgressPresent, 'Goal progress card should not render on the daily view.');
      results.push('Coach card renders on the daily view');

      const deferredChartState = await client.evaluate(`typeof window.Chart === 'function'`);
      assert(!deferredChartState, 'Chart.js should stay unloaded until the dashboard is opened.');
      results.push('Chart.js is deferred on the daily view');
    }

    if (!URL_ARG) {
      const homeQuickState = await client.evaluate(`
        (async () => ({
          reactHomeStatus: window.__woofReactHomeStatus || '',
          reactHomeError: window.__woofReactHomeError || '',
          reactBundleTagPresent: Boolean(document.querySelector('script[src="js/react-home/react-home-island.js"]')),
          reactBundleRequested: performance.getEntriesByType('resource').some((entry) => entry.name.includes('/js/react-home/react-home-island.js')),
          reactBundleReachable: await fetch('js/react-home/react-home-island.js', { cache: 'no-store' })
            .then((response) => response.ok)
            .catch(() => false),
          reactHomeMounted: document.getElementById('view-daily')?.classList.contains('react-home-enabled') || false,
          reactRootVisible: getComputedStyle(document.getElementById('home-react-root')).display !== 'none',
          regionVisible: Boolean(document.querySelector('#view-daily #food-preset-region')),
          manualFieldsOnHome: Boolean(document.querySelector('#view-daily #manual-name')),
          dailySummaryCompatPresent: Boolean(document.getElementById('daily-summary-compat')),
          todayHint: document.querySelector('#home-react-root .woof-home__today .woof-home__section-hint')?.innerText?.trim() || '',
          overviewHint: document.querySelector('#home-react-root .woof-home__overview .woof-home__section-hint')?.innerText?.trim() || '',
          companionStatus: document.querySelector('#home-react-root .woof-home__pet-status')?.innerText?.trim() || '',
          launcherCount: document.querySelectorAll('#home-log-modal .home-log-launcher-card').length
        }))()
      `);
      assert(homeQuickState.reactHomeMounted, `Home React island should mount into the live daily shell. Status: ${homeQuickState.reactHomeStatus}. Error: ${homeQuickState.reactHomeError}. Tag: ${homeQuickState.reactBundleTagPresent}. Requested: ${homeQuickState.reactBundleRequested}. Reachable: ${homeQuickState.reactBundleReachable}. Console: ${consoleErrors.join(' | ')}. Exceptions: ${exceptions.join(' | ')}`);
      assert(homeQuickState.reactRootVisible, `Home React root should be visible after mount. Status: ${homeQuickState.reactHomeStatus}. Error: ${homeQuickState.reactHomeError}. Tag: ${homeQuickState.reactBundleTagPresent}. Requested: ${homeQuickState.reactBundleRequested}. Reachable: ${homeQuickState.reactBundleReachable}. Console: ${consoleErrors.join(' | ')}. Exceptions: ${exceptions.join(' | ')}`);
      assert(!homeQuickState.regionVisible, 'Home should not expose the preset region selector.');
      assert(!homeQuickState.manualFieldsOnHome, 'Home should not expose advanced manual input fields.');
      assert(!homeQuickState.dailySummaryCompatPresent, 'Home should not expose the legacy daily summary compatibility block.');
      assert(Boolean(homeQuickState.todayHint), 'React Home should expose a visible today hint.');
      assert(Boolean(homeQuickState.overviewHint), 'React Home should expose a visible overview hint.');
      assert(Boolean(homeQuickState.companionStatus), 'React Home should expose a companion status.');
      assert(homeQuickState.launcherCount === 3, `Home log modal should contain 3 logging entry actions, got ${homeQuickState.launcherCount}.`);

      await client.evaluate(`document.querySelector('#home-react-root .woof-home__action-button--primary')?.click()`);
      await delay(200);
      const logHubState = await client.evaluate(`
        (() => ({
          open: document.getElementById('home-log-modal').style.display === 'flex',
          launcherCount: document.querySelectorAll('#home-log-modal .home-log-launcher-card').length,
          regionVisible: Boolean(document.querySelector('#home-log-modal #food-preset-region')),
          shortcutCount: document.querySelectorAll('#home-log-modal [data-preset-quick-id]').length
        }))()
      `);
      assert(logHubState.open, 'Home log hub should open from the primary hero action.');
      assert(logHubState.launcherCount === 3, `Log hub should show 3 lightweight action cards, got ${logHubState.launcherCount}.`);
      assert(!logHubState.regionVisible, 'Log hub should not expose region selection.');
      assert(logHubState.shortcutCount === 0, 'Log hub should not show inline common-food quick shortcuts anymore.');

      await client.evaluate(`window.__woofUiBridge?.openHomeLogModal?.()`);
      await delay(250);
      const bridgeLogHubState = await client.evaluate(`
        (() => ({
          open: document.getElementById('home-log-modal').style.display === 'flex',
          launcherCount: document.querySelectorAll('#home-log-modal .home-log-launcher-card').length
        }))()
      `);
      assert(bridgeLogHubState.open, 'Home log hub should stay reachable after quick-log interactions.');
      assert(bridgeLogHubState.launcherCount === 3, 'Home log hub should keep the same three actions after opening.');
      await client.evaluate(`document.getElementById('btn-home-log-close')?.click()`);
      await delay(200);

      const dashboardState = await client.evaluate(`
        (() => ({
          heroActionCount: document.querySelectorAll('#home-react-root .woof-home__action-button').length,
          summarySignalCount: document.querySelectorAll('#home-react-root .woof-home__overview .woof-home__insight-card').length,
          petSrc: document.querySelector('#home-react-root .woof-home__pet-image')?.getAttribute('src') || '',
          petLoaded: (document.querySelector('#home-react-root .woof-home__pet-image')?.naturalWidth || 0) > 0
        }))()
      `);
      assert(dashboardState.heroActionCount === 3, `Home companion hero should show 3 quick actions, got ${dashboardState.heroActionCount}.`);
      assert(dashboardState.summarySignalCount >= 2, `React Home overview should show at least 2 insight cards, got ${dashboardState.summarySignalCount}.`);
      assert(dashboardState.petLoaded, `Pet image failed to load: ${dashboardState.petSrc}`);
      assert(/dog_animation\/dog_[a-z]+\.gif$/i.test(dashboardState.petSrc), `Pet image should point to a bundled gif, got ${dashboardState.petSrc}.`);
      results.push('Companion hero and lighter summary render correctly');

      await client.evaluate(`window.__woofUiBridge?.openDailySummaryDetail?.()`);
      await delay(300);
      const dailySummaryModal = await client.evaluate(`
        (() => ({
          open: document.getElementById('detail-modal').style.display === 'flex',
          reactVisible: !document.getElementById('detail-react-root')?.hidden,
          summaryCount: document.querySelectorAll('#detail-react-root .woof-detail__summary-card').length,
          sectionCount: document.querySelectorAll('#detail-react-root .woof-detail__section').length,
          signalCount: document.querySelectorAll('#detail-react-root .woof-detail__signal-card').length
        }))()
      `);
      assert(dailySummaryModal.open, 'Daily summary card did not open the detail modal.');
      assert(dailySummaryModal.reactVisible, 'Daily summary detail should render from the React detail surface.');
      assert(dailySummaryModal.summaryCount === 3, `Daily summary detail should show 3 summary cards, got ${dailySummaryModal.summaryCount}.`);
      assert(dailySummaryModal.sectionCount === 2, `Daily summary detail should show 2 nutrition sections, got ${dailySummaryModal.sectionCount}.`);
      assert(dailySummaryModal.signalCount === 3, `Daily summary detail should show 3 weekly focus signals, got ${dailySummaryModal.signalCount}.`);
      results.push('Daily summary card opens the full nutrition modal');
      await client.evaluate(`document.getElementById('btn-detail-close').click()`);

      await client.evaluate(`(async () => {
        const detailUi = await import('./js/ui/detail-ui.js');
        detailUi.renderDetailModal({
          name: 'Smoke Meal',
          type: 'breakfast',
          healthScore: 8,
          items: [
            { name: 'Soy Milk', weight: '250ml' },
            { name: 'Omelette', weight: '1 serving' }
          ],
          nutri: {
            calories: 420,
            protein: 24,
            fat: 16,
            carbohydrate: 38,
            sugar: 10,
            sodium: 780,
            saturatedFat: 4,
            transFat: 0,
            fiber: 3
          }
        });
      })()`);
      await delay(300);
      const itemDetailModal = await client.evaluate(`
        (() => ({
          open: document.getElementById('detail-modal').style.display === 'flex',
          reactVisible: !document.getElementById('detail-react-root')?.hidden,
          legacyContentExists: Boolean(document.getElementById('detail-content')),
          legacyTitleExists: Boolean(document.getElementById('detail-modal-title-wrap')),
          summaryCount: document.querySelectorAll('#detail-react-root .woof-detail__summary-card').length,
          sectionCount: document.querySelectorAll('#detail-react-root .woof-detail__section').length,
          focusVisible: Boolean(document.querySelector('#detail-react-root .woof-detail__panel--focus'))
        }))()
      `);
      assert(itemDetailModal.open, 'Item detail should open the detail modal.');
      assert(itemDetailModal.reactVisible, 'Item detail should render from the React detail surface.');
      assert(!itemDetailModal.legacyContentExists, 'Item detail should not expose the legacy detail content.');
      assert(!itemDetailModal.legacyTitleExists, 'Item detail should not expose the legacy modal title wrapper.');
      assert(itemDetailModal.summaryCount === 3, `Item detail should show 3 summary cards, got ${itemDetailModal.summaryCount}.`);
      assert(itemDetailModal.sectionCount === 2, `Item detail should show 2 nutrition sections, got ${itemDetailModal.sectionCount}.`);
      assert(!itemDetailModal.focusVisible, 'Item detail should not show the weekly focus panel.');
      results.push('Item detail routes through the React detail surface');
      await client.evaluate(`document.getElementById('btn-detail-close').click()`);

      await client.evaluate(`window.__woofUiBridge?.openDashboardView?.()`);
      await delay(350);
      const dashboardViewState = await getActiveViewState(client);
      assert(dashboardViewState.dashboard, 'Dashboard view should remain reachable from the React home shell.');
      const dashboardSurface = await client.evaluate(`(() => ({
        chartCanvasCount: document.querySelectorAll('#view-dashboard canvas').length,
        rhythmCardVisible: !document.getElementById('dashboard-rhythm-card')?.hidden,
        nutritionFocusVisible: !document.getElementById('dashboard-nutrition-focus-card')?.hidden,
        chart7Active: document.getElementById('btn-chart-7d')?.classList.contains('active-range') || false
      }))()`);
      assert(dashboardSurface.chartCanvasCount >= 5, `Dashboard should keep its chart canvases mounted, got ${dashboardSurface.chartCanvasCount}.`);
      assert(dashboardSurface.rhythmCardVisible, 'Dashboard rhythm card should remain visible.');
      assert(dashboardSurface.nutritionFocusVisible, 'Dashboard nutrition focus card should remain visible.');
      assert(dashboardSurface.chart7Active, 'Dashboard should default to the 7-day chart range.');
      results.push('Dashboard/charts view remains usable');

      await client.evaluate(`window.__woofUiBridge?.openAIView?.()`);
      await delay(350);
      const aiViewState = await getActiveViewState(client);
      assert(aiViewState.ai, 'AI view should remain reachable from the React home shell.');
      const aiSurface = await client.evaluate(`(() => ({
        analyzeButtonVisible: Boolean(document.getElementById('analyze-btn')),
        turnstileWidgetVisible: Boolean(document.getElementById('turnstile-widget')),
        statusNoteVisible: Boolean(document.getElementById('turnstile-status-note') && !document.getElementById('turnstile-status-note').hidden)
      }))()`);
      assert(aiSurface.analyzeButtonVisible, 'AI analysis surface should remain mounted.');
      assert(aiSurface.turnstileWidgetVisible, 'AI view should expose the Turnstile widget container.');
      assert(aiSurface.statusNoteVisible || aiSurface.turnstileWidgetVisible, 'AI view should expose a visible verification surface or note.');
      results.push('AI view remains usable');

      if (RUN_REAL_AI) {
        await exerciseRealAiFlow(client, results, { requireResult: false });

        const aiOutcome = await readAiSmokeState(client);
        if (DUMP_AI && aiOutcome.modalOpen && aiOutcome.tempAIResult) {
          const aiDetails = await client.evaluate(`
            (() => {
              const root = document.getElementById('analysis-content');
              return {
                title: root?.querySelector('h3')?.innerText?.trim() || '',
                score: root?.querySelector('.score-badge')?.innerText?.trim() || '',
                nutritionCards: [...root?.querySelectorAll('.ai-nutri-item') || []].map((item) => ({
                  label: item.querySelector('.ai-n-lbl')?.innerText?.trim() || '',
                  value: item.querySelector('.ai-n-val')?.innerText?.trim() || ''
                }))
              };
            })()
          `);
          console.log('AI_DETAILS_START');
          console.log(JSON.stringify(aiDetails, null, 2));
          console.log('AI_DETAILS_END');
        }
      }

      await client.evaluate(`window.__woofUiBridge?.openSettingsView?.()`);
      await delay(350);
      const settingsViewState = await getActiveViewState(client);
      assert(settingsViewState.settings, 'Settings/profile view should remain reachable from the React home shell.');
      const settingsSurface = await client.evaluate(`(() => ({
        languageButtonVisible: Boolean(document.getElementById('btn-open-lang-setting')),
        profileControlsVisible: Boolean(document.getElementById('goal-type') && document.getElementById('meal-mode') && document.getElementById('btn-calc'))
      }))()`);
      assert(settingsSurface.languageButtonVisible, 'Settings should expose the language action.');
      assert(settingsSurface.profileControlsVisible, 'Settings/profile content should remain mounted.');
      results.push('Settings/profile flow remains usable');

      await client.evaluate(`(async () => {
        const ui = await import('./js/ui.js');
        ui.switchView('view-daily');
      })()`);
      await delay(350);
      const returnedHomeViewState = await getActiveViewState(client);
      assert(returnedHomeViewState.daily, 'Should be able to navigate back to the daily/home view from settings.');
      const returnedHomeSurface = await client.evaluate(`(() => ({
        reactHomeMounted: document.getElementById('view-daily')?.classList.contains('react-home-enabled') || false,
        heroActionCount: document.querySelectorAll('#home-react-root .woof-home__action-button').length,
        todayVisible: Boolean(document.querySelector('#home-react-root .woof-home__today'))
      }))()`);
      assert(returnedHomeSurface.reactHomeMounted, 'Home React island should remain mounted after navigation back from settings.');
      assert(returnedHomeSurface.heroActionCount === 3, 'Home quick actions should remain available after navigating back from settings.');
      assert(returnedHomeSurface.todayVisible, 'Home summary surface should remain visible after navigation back from settings.');
      results.push('Navigation back to the daily view remains usable');

      const baselineTotal = await client.evaluate(`
        (() => {
          const state = window.__woofAppStateBridge?.getAppState?.() || {};
          return (Array.isArray(state.foodItems) ? state.foodItems : [])
            .reduce((sum, item) => sum + Number(item?.nutri?.calories || item?.nutri?.cal || 0), 0);
        })()
      `);
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
        (async () => {
          const actionModule = await import('./js/state/app-actions.js');
          actionModule.dispatchAppAction('SET_SELECTED_DATE', { date: '${nextDate}' });
          return window.__woofAppStateBridge?.getAppState?.()?.selectedDate || '';
        })()
      `);
      await delay(300);
      assert(switchedForward === nextDate, `Could not switch date forward. Value became ${switchedForward}`);
      assert(
        (await client.evaluate(`
          (() => {
            const state = window.__woofAppStateBridge?.getAppState?.() || {};
            return (Array.isArray(state.foodItems) ? state.foodItems : [])
              .reduce((sum, item) => sum + Number(item?.nutri?.calories || item?.nutri?.cal || 0), 0);
          })()
        `)) === 0,
        'Date switch did not reset to empty day.'
      );
      const switchedBack = await client.evaluate(`
        (async () => {
          const actionModule = await import('./js/state/app-actions.js');
          actionModule.dispatchAppAction('SET_SELECTED_DATE', { date: '${today}' });
          return window.__woofAppStateBridge?.getAppState?.()?.selectedDate || '';
        })()
      `);
      await delay(300);
      assert(switchedBack === today, `Could not switch date back. Value became ${switchedBack}`);
      const restoredTotal = await client.evaluate(`
        (() => {
          const state = window.__woofAppStateBridge?.getAppState?.() || {};
          return (Array.isArray(state.foodItems) ? state.foodItems : [])
            .reduce((sum, item) => sum + Number(item?.nutri?.calories || item?.nutri?.cal || 0), 0);
        })()
      `);
      const debugState = await client.evaluate(`
        (() => ({
          selectedDate: window.__woofAppStateBridge?.getAppState?.()?.selectedDate || '',
          localStorageKeys: Object.keys(localStorage).sort(),
          todayRecord: localStorage.getItem('record_${today}'),
          tomorrowRecord: localStorage.getItem('record_${nextDate}')
        }))()
      `);
      assert(
        restoredTotal === baselineTotal,
        `Date switch back did not restore record. Actual total: ${restoredTotal}. Debug: ${JSON.stringify(debugState)}`
      );
      results.push('Date switching works');

      assert(await client.evaluate(`typeof window.__woofUiBridge?.openRhythmView === 'function'`), 'Rhythm view bridge should exist.');
      await client.evaluate(`window.__woofUiBridge?.openRhythmView?.()`);
      await delay(300);
      results.push('Rhythm view bridge is callable');
    }

    if (URL_ARG && RUN_REAL_AI) {
      await exerciseRealAiFlow(client, results, { requireResult: true });
    }

    const themeBefore = await client.evaluate(`document.documentElement.getAttribute('data-theme')`);
    await client.evaluate(`document.getElementById('btn-toggle-theme-setting').click()`);
    await delay(300);
    const themeAfter = await client.evaluate(`document.documentElement.getAttribute('data-theme')`);
    results.push(`Theme toggle reachable (${themeBefore || 'unset'} -> ${themeAfter || 'unset'})`);

    await client.evaluate(`
      document.getElementById('btn-open-lang-setting').click();
      document.querySelector('.lang-option[data-lang="en"]').click();
    `);
    await delay(600);
    const englishNavLabel = await client.evaluate(`document.getElementById('nav-settings')?.innerText || ''`);
    assert(Boolean(englishNavLabel), 'Language switch should keep the settings nav label readable.');
    await client.evaluate(`
      document.getElementById('btn-open-lang-setting').click();
      document.querySelector('.lang-option[data-lang="ar"]').click();
    `);
    await delay(600);
    const arabicNavLabel = await client.evaluate(`document.getElementById('nav-settings')?.innerText || ''`);
    assert(Boolean(arabicNavLabel), 'Arabic language switch should keep the settings nav label readable.');
    results.push('Language switch commands execute without throwing');

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
    if (!chrome && process.platform === 'win32' && Number.isFinite(browserPid)) {
      try {
        process.kill(browserPid);
      } catch {}
    }
    if (server) server.close();
    await fs.rm(userDataDir, { recursive: true, force: true }).catch(() => {});
  }
}

run().catch(error => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
