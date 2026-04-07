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
const URL_ARG = process.argv.find(arg => arg.startsWith('--url='));
const UPLOAD_ARG = process.argv.find(arg => arg.startsWith('--upload-image='));
const PORT_ARG = process.argv.find(arg => arg.startsWith('--port='));
const DEBUG_PORT_ARG = process.argv.find(arg => arg.startsWith('--debug-port='));
const PORT = Number.parseInt(PORT_ARG?.slice('--port='.length) || '4173', 10);
const DEBUG_PORT = Number.parseInt(DEBUG_PORT_ARG?.slice('--debug-port='.length) || '9222', 10);
const BASE_URL = URL_ARG ? URL_ARG.slice('--url='.length).replace(/\/$/, '') : `http://127.0.0.1:${PORT}`;
const UPLOAD_IMAGE_PATH = UPLOAD_ARG ? UPLOAD_ARG.slice('--upload-image='.length) : '';
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

async function run() {
  const chromePath = await findChrome();
  const userDataDir = await fs.mkdtemp(path.join(os.tmpdir(), 'woof-cal-browser-'));
  const server = URL_ARG ? null : await startStaticServer();

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
      const details = params.exceptionDetails || {};
      const description = details.exception?.description || details.exception?.value || '';
      exceptions.push(description || details.text || 'Runtime exception');
    }]);

    const targetUrl = URL_ARG ? BASE_URL : `${BASE_URL}/index.html`;
    const loaded = client.waitForEvent('Page.loadEventFired', () => true, 15000);
    await client.send('Page.navigate', { url: targetUrl });
    await loaded;
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
      const reloaded = client.waitForEvent('Page.loadEventFired', () => true, 15000);
      await client.evaluate(`
        localStorage.clear();
        location.reload();
      `);
      await reloaded;
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
      assert(onboardingState.onboardingVisible, 'Onboarding card should be visible before region setup is completed.');
      assert(Boolean(onboardingState.coachTitle), 'Coach card should render a title.');
      assert(Boolean(onboardingState.coachHeadline), 'Coach card should render a headline.');
      assert(!onboardingState.goalProgressPresent, 'Goal progress card should not render on the daily view.');
      results.push('Onboarding and coach card render on an empty day');

      await client.evaluate(`document.getElementById('btn-open-onboarding').click()`);
      await delay(300);
      assert(await client.evaluate(`document.getElementById('view-settings').classList.contains('active-view')`), 'Onboarding CTA should open settings.');
      await client.evaluate(`document.querySelector('.nav-item[data-target="view-daily"]').click()`);
      await delay(200);
      results.push('Onboarding CTA opens settings');

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
          reactMealSectionVisible: Boolean(document.querySelector('#home-react-root .woof-home__meal-group-list, #home-react-root .woof-home__empty-state')),
          coachOnHome: Boolean(document.querySelector('#view-daily #daily-coach-card')),
          weightOnHome: Boolean(document.querySelector('#view-daily #daily-weight-input')),
          homeLogCardPresent: Boolean(document.querySelector('#view-daily .home-log-card')),
          legacyPetVisible: getComputedStyle(document.getElementById('pet-section')).display !== 'none',
          legacySummaryVisible: getComputedStyle(document.getElementById('daily-summary-card')).display !== 'none',
          legacyTodayMealsVisible: getComputedStyle(document.getElementById('today-meals-card')).display !== 'none',
          legacyQuickActionsVisible: getComputedStyle(document.querySelector('#view-daily .quick-action-strip')).display !== 'none',
          launcherCount: document.querySelectorAll('#home-log-modal .home-log-launcher-card').length
        }))()
      `);
      assert(homeQuickState.reactHomeMounted, `Home React island should mount into the live daily shell. Status: ${homeQuickState.reactHomeStatus}. Error: ${homeQuickState.reactHomeError}. Tag: ${homeQuickState.reactBundleTagPresent}. Requested: ${homeQuickState.reactBundleRequested}. Reachable: ${homeQuickState.reactBundleReachable}. Console: ${consoleErrors.join(' | ')}. Exceptions: ${exceptions.join(' | ')}`);
      assert(homeQuickState.reactRootVisible, `Home React root should be visible after mount. Status: ${homeQuickState.reactHomeStatus}. Error: ${homeQuickState.reactHomeError}. Tag: ${homeQuickState.reactBundleTagPresent}. Requested: ${homeQuickState.reactBundleRequested}. Reachable: ${homeQuickState.reactBundleReachable}. Console: ${consoleErrors.join(' | ')}. Exceptions: ${exceptions.join(' | ')}`);
      assert(!homeQuickState.regionVisible, 'Home should not expose the preset region selector.');
      assert(!homeQuickState.manualFieldsOnHome, 'Home should not expose advanced manual input fields.');
      assert(homeQuickState.reactMealSectionVisible, 'Home should render today meals from the React island.');
      assert(!homeQuickState.coachOnHome, 'Home should not keep the coach card inline.');
      assert(!homeQuickState.weightOnHome, 'Home should not keep the weight editor inline.');
      assert(!homeQuickState.homeLogCardPresent, 'Home should not keep a dedicated logging card.');
      assert(!homeQuickState.legacyPetVisible, 'Legacy pet section should be hidden once the React Home island mounts.');
      assert(!homeQuickState.legacySummaryVisible, 'Legacy daily summary card should be hidden once the React Home island mounts.');
      assert(!homeQuickState.legacyTodayMealsVisible, 'Legacy today meals card should be hidden once the React Home island mounts.');
      assert(!homeQuickState.legacyQuickActionsVisible, 'Legacy quick action strip should be hidden once the React Home island mounts.');
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

      await client.evaluate(`
        document.getElementById('btn-home-log-common').click();
      `);
      await delay(300);
      const presetModalState = await client.evaluate(`
        (() => ({
          open: document.getElementById('food-preset-modal').style.display === 'flex',
          regionVisible: Boolean(document.querySelector('#food-preset-modal #food-preset-region')),
          selectedPreset: document.getElementById('food-preset-select')?.value || '',
          baselineCalories: Number(document.getElementById('total-cal-display').innerText || '0'),
          baselineSugar: Number(document.getElementById('sum-sugar').innerText || '0')
        }))()
      `);
      assert(presetModalState.open, 'Common foods action should open the preset modal.');
      assert(!presetModalState.regionVisible, 'Preset modal should not expose region selection.');
      assert(Boolean(presetModalState.selectedPreset), 'Preset modal should have a default selected preset.');
      const expectedPresetDraft = await client.evaluate(`
        (async () => {
          const { readManualFoodPresetSelection } = await import('./js/ui/food-preset-ui.js');
          const { createFoodPresetManualDraft } = await import('./js/domain/food-preset-domain.js');
          const { findFoodPresetById } = await import('./js/repositories/food-preset-repository.js');

          const selection = readManualFoodPresetSelection();
          const preset = findFoodPresetById(selection.presetId);
          const draft = preset
            ? createFoodPresetManualDraft(preset, {
                lang: document.documentElement.lang || 'en',
                selectedModifiers: selection.modifiers
              })
            : null;

          return {
            name: draft?.name || '',
            type: draft?.type || preset?.suggestedMealType || '',
            calories: Number(draft?.nutri?.calories || 0),
            sugar: Number(draft?.nutri?.sugar || 0),
            fiber: Number(draft?.nutri?.fiber || 0)
          };
        })()
      `);

      await client.evaluate(`document.getElementById('btn-quick-add-food-preset').click()`);
      let presetQuickAddState = null;
      for (let attempt = 0; attempt < 10; attempt += 1) {
        await delay(200);
        presetQuickAddState = await client.evaluate(`
          (() => ({
            totalCalories: document.getElementById('total-cal-display').innerText,
            sugar: document.getElementById('sum-sugar').innerText,
            reactMealNames: [...document.querySelectorAll('#home-react-root .woof-home__meal-name')].map((node) => node.innerText.trim()),
            storedMeals: JSON.parse(localStorage.getItem(\`record_${today}\`) || '[]')
          }))()
        `);
        if (presetQuickAddState.reactMealNames.length > 0) break;
      }
      const expectedPresetCalories = presetModalState.baselineCalories + expectedPresetDraft.calories;
      const expectedPresetSugar = presetModalState.baselineSugar + expectedPresetDraft.sugar;
      assert(
        Number(presetQuickAddState.totalCalories) === expectedPresetCalories,
        `Preset quick add should update total calories to ${expectedPresetCalories}, got ${presetQuickAddState.totalCalories}.`
      );
      assert(
        Number(presetQuickAddState.sugar) === expectedPresetSugar,
        `Preset quick add should update sugar total to ${expectedPresetSugar}, got ${presetQuickAddState.sugar}.`
      );
      const presetRecord = presetQuickAddState.storedMeals.find((item) => item.name === expectedPresetDraft.name) || null;
      assert(Boolean(presetRecord), `Preset quick add should persist the food record. State: ${JSON.stringify(presetQuickAddState)}`);
      assert(
        presetQuickAddState.reactMealNames.some((name) => name === expectedPresetDraft.name),
        `React home meals section should update after preset quick add. State: ${JSON.stringify(presetQuickAddState)}`
      );
      assert(
        new RegExp(expectedPresetDraft.type || 'snack', 'i').test(presetRecord.type)
        || /Breakfast|早餐|Lunch|午餐|Dinner|晚餐|Snack|點心|榛炲績/i.test(presetRecord.type || ''),
        `Preset quick add should persist the expected meal type, got ${presetRecord?.type}.`
      );
      results.push('Common foods quick add works from a secondary modal while meals stay visible on Home');

      await client.evaluate(`
        document.getElementById('btn-home-log-hub').click();
      `);
      await delay(150);
      await client.evaluate(`document.getElementById('btn-home-log-manual').click()`);
      await delay(150);

      await client.evaluate(`
        document.getElementById('manual-name').value = 'Smoke Apple';
        document.getElementById('manual-cal').value = '123';
        document.getElementById('manual-pro').value = '1.1';
        document.getElementById('manual-fat').value = '0.5';
        document.getElementById('manual-carb').value = '30';
        document.getElementById('manual-fiber').value = '4.2';
        document.getElementById('btn-add-record').click();
      `);
      await delay(400);
      assert(
        Number(await client.evaluate(`document.getElementById('total-cal-display').innerText`)) === expectedPresetCalories + 123,
        'Manual add should stack on top of the quick-added common food.'
      );
      assert(
        Number(await client.evaluate(`document.getElementById('sum-fiber').innerText`)) === expectedPresetDraft.fiber + 4.2,
        'Manual fiber did not update dashboard total.'
      );
      const homeStateAfterManual = await client.evaluate(`
        (() => ({
          manualModalClosed: document.getElementById('manual-entry-modal').style.display !== 'flex'
        }))()
      `);
      assert(homeStateAfterManual.manualModalClosed, 'Manual modal should close after saving a record.');
      results.push('Manual add works through the secondary modal flow');

      const rhythmState = await client.evaluate(`
        (() => ({
          visible: !document.getElementById('meal-rhythm-card').hidden,
          signalCount: document.querySelectorAll('#meal-rhythm-card .rhythm-signal').length,
          headline: document.querySelector('#meal-rhythm-card .rhythm-headline')?.innerText?.trim() || ''
        }))()
      `);
      assert(rhythmState.visible, 'Meal rhythm card should render on the daily view.');
      assert(rhythmState.signalCount === 4, `Meal rhythm card should show 4 signal blocks, got ${rhythmState.signalCount}.`);
      assert(Boolean(rhythmState.headline), 'Meal rhythm card should render a headline.');
      results.push('Meal rhythm summary card renders on Home');

      const dashboardState = await client.evaluate(`
        (() => ({
          heroActionCount: document.querySelectorAll('#home-react-root .woof-home__action-button').length,
          summarySignalCount: document.querySelectorAll('#home-react-root .woof-home__overview .woof-home__insight-card').length,
          petSrc: document.getElementById('pet-img')?.getAttribute('src') || '',
          petLoaded: (document.getElementById('pet-img')?.naturalWidth || 0) > 0
        }))()
      `);
      assert(dashboardState.heroActionCount === 3, `Home companion hero should show 3 quick actions, got ${dashboardState.heroActionCount}.`);
      assert(dashboardState.summarySignalCount >= 2, `React Home overview should show at least 2 insight cards, got ${dashboardState.summarySignalCount}.`);
      assert(dashboardState.petLoaded, `Pet image failed to load: ${dashboardState.petSrc}`);
      assert(/dog_animation\/dog_[a-z]+\.gif$/i.test(dashboardState.petSrc), `Pet image should point to a bundled gif, got ${dashboardState.petSrc}.`);
      results.push('Companion hero and lighter summary render correctly');

      await client.evaluate(`document.getElementById('daily-summary-card').click()`);
      await delay(300);
      const dailySummaryModal = await client.evaluate(`
        (() => ({
          open: document.getElementById('detail-modal').style.display === 'flex',
          statCount: document.querySelectorAll('#detail-content .ai-nutri-item').length,
          sectionCount: document.querySelectorAll('#detail-content .nutrition-panel-section').length
        }))()
      `);
      assert(dailySummaryModal.open, 'Daily summary card did not open the detail modal.');
      assert(dailySummaryModal.statCount === 12, `Daily summary detail should show 12 stat tiles, got ${dailySummaryModal.statCount}.`);
      assert(dailySummaryModal.sectionCount === 2, `Daily summary detail should show 2 nutrition sections, got ${dailySummaryModal.sectionCount}.`);
      results.push('Daily summary card opens the full nutrition modal');
      await client.evaluate(`document.getElementById('btn-detail-close').click()`);

      await client.evaluate(`
        document.getElementById('btn-home-log-hub').click();
      `);
      await delay(150);
      await client.evaluate(`document.getElementById('btn-home-log-manual').click()`);
      await delay(150);
      await client.evaluate(`
        document.getElementById('manual-name').value = 'Smoke Apple';
        document.getElementById('manual-cal').value = '123';
        document.getElementById('manual-fiber').value = '4.2';
        document.getElementById('btn-fav-save-main').click();
      `);
      await delay(400);
      const favoriteSnapshot = await client.evaluate(`JSON.parse(localStorage.getItem('myFavorites') || '[]')`);
      assert(favoriteSnapshot.length === 1, 'Favorite save did not persist.');
      assert(favoriteSnapshot[0]?.nutri?.fiber === 4.2, 'Manual favorite did not preserve fiber.');
      results.push('Favorite save works');

      await client.evaluate(`
        (() => {
          const favorites = JSON.parse(localStorage.getItem('myFavorites') || '[]');
          favorites.push({
            name: 'Smoke Seed Bowl',
            nutri: {
              calories: 222,
              protein: 12.3,
              fat: 7.4,
              carbohydrate: 28.1,
              sugar: 3.5,
              sodium: 410,
              saturatedFat: 1.2,
              transFat: 0.2,
              fiber: 9.5
            },
            items: [
              { name: 'Oats', weight: '60' },
              { name: 'Chia Seeds', weight: '15' }
            ],
            healthScore: 8.1
          });
          localStorage.setItem('myFavorites', JSON.stringify(favorites));
        })();
      `);
      const reloadAfterFavoriteSeed = client.waitForEvent('Page.loadEventFired', () => true, 15000);
      await client.evaluate(`location.reload()`);
      await reloadAfterFavoriteSeed;
      await delay(2500);

      await client.evaluate(`document.getElementById('btn-home-log-hub').click()`);
      await delay(150);
      await client.evaluate(`document.getElementById('btn-home-log-favorites').click()`);
      await delay(300);
      assert(await client.evaluate(`document.getElementById('fav-modal').style.display === 'flex'`), 'Favorite modal did not open.');
      assert(await client.evaluate(`document.querySelectorAll('#fav-list-container .fav-item-row').length === 2`), 'Favorite modal list is incorrect.');
      results.push('Favorite modal works');

      await client.evaluate(`
        (() => {
          const rows = [...document.querySelectorAll('#fav-list-container .fav-item-row')];
          rows[1].querySelector('button').click();
        })();
      `);
      await delay(300);
      assert(await client.evaluate(`document.getElementById('favorite-meal-modal').style.display === 'flex'`), 'Favorite meal picker did not open.');
      await client.evaluate(`document.querySelector('#favorite-meal-buttons .meal-btn').click()`);
      await delay(400);

      const favoriteAddedRecord = await client.evaluate(`
        (() => {
          const records = JSON.parse(localStorage.getItem('record_${today}') || '[]');
          return records.find(item => item.name === 'Smoke Seed Bowl') || null;
        })()
      `);
      assert(Boolean(favoriteAddedRecord), 'Favorite quick add did not create a record.');
      assert(favoriteAddedRecord?.nutri?.fiber === 9.5, 'Favorite quick add lost fiber data.');
      assert(favoriteAddedRecord?.nutri?.transFat === 0.2, 'Favorite quick add lost trans fat data.');
      assert(favoriteAddedRecord?.items?.length === 2, 'Favorite quick add lost item breakdown.');
      assert(favoriteAddedRecord?.healthScore === 8.1, 'Favorite quick add lost health score.');
      results.push('Favorite quick add preserves full nutrition data');

      await client.evaluate(`
        (async () => {
          const records = JSON.parse(localStorage.getItem('record_${today}') || '[]');
          const targetIndex = records.findIndex(item => item.name === 'Smoke Seed Bowl');
          const detailModule = await import('./js/ui/detail-ui.js');
          detailModule.showDetailModal(targetIndex >= 0 ? targetIndex : 0);
        })();
      `);
      await delay(300);
      const detailState = await client.evaluate(`
        (() => {
          const headerText = document.querySelector('#detail-modal h3')?.innerText || '';
          const contentTitle = document.querySelector('#detail-content h3')?.innerText || '';
          const nutriCount = document.querySelectorAll('#detail-content .ai-nutri-item').length;
          const sectionCount = document.querySelectorAll('#detail-content .nutrition-panel-section').length;
          const clipboardCount = (headerText.match(/📋/g) || []).length;
          const contentText = document.getElementById('detail-content')?.innerText || '';
          return { headerText, contentTitle, nutriCount, sectionCount, clipboardCount, contentText };
        })()
      `);
      assert(detailState.nutriCount === 9, `Detail modal should show 9 nutrition fields, got ${detailState.nutriCount}. State: ${JSON.stringify(detailState)}`);
      assert(detailState.sectionCount === 2, `Detail modal should show 2 grouped nutrition sections, got ${detailState.sectionCount}. State: ${JSON.stringify(detailState)}`);
      assert(detailState.clipboardCount <= 1, `Detail modal title icon is duplicated: ${detailState.headerText}`);
      assert(/60 g/.test(detailState.contentText), `Detail modal should show gram units for ingredients. Got: ${detailState.contentText}`);
      assert(/15 g/.test(detailState.contentText), `Detail modal should show gram units for ingredients. Got: ${detailState.contentText}`);
      results.push('Detail modal shows full nutrition info without duplicate icon');
      await client.evaluate(`document.getElementById('btn-detail-close').click()`);
      await client.evaluate(`document.getElementById('btn-fav-close').click()`);

      await client.evaluate(`
        document.getElementById('daily-weight-input').value = '61.2';
        document.getElementById('btn-save-weight').click();
      `);
      await delay(300);
      assert((await client.evaluate(`localStorage.getItem('weight_${today}')`)) === '61.2', 'Weight save did not persist.');
      results.push('Weight save works');

      await client.evaluate(`
        (() => {
          document.getElementById('gender').value = 'female';
          document.getElementById('age').value = '31';
          document.getElementById('height').value = '165';
          document.getElementById('weight').value = '61.2';
          document.getElementById('activity').value = '1.375';
          document.getElementById('goal-type').value = 'lose';
          document.getElementById('region').value = 'hong-kong';
          document.getElementById('dining-out-frequency').value = 'often';
          document.getElementById('meal-mode').value = '3';
          document.getElementById('btn-calc').click();
        })();
      `);
      await delay(400);
      const goalBefore = await client.evaluate(`
        Number(document.getElementById('target-cal-val')?.innerText || 0)
      `);
      await client.evaluate(`
        (() => {
          const goalSelect = document.getElementById('goal-type');
          goalSelect.value = 'gain';
          document.getElementById('btn-calc').click();
        })();
      `);
      await delay(400);
      const goalState = await client.evaluate(`
        (() => ({
          selected: document.getElementById('goal-type')?.value || '',
          target: Number(document.getElementById('target-cal-val')?.innerText || 0),
          macroText: document.getElementById('macro-goals')?.innerText?.trim() || '',
          goalCardPresent: Boolean(document.getElementById('goal-insights-card')),
          onboardingHidden: document.getElementById('onboarding-card').hidden,
          presetRegion: document.getElementById('food-preset-panel')?.dataset?.selectedRegion || '',
          themeLabel: document.getElementById('btn-toggle-theme-setting')?.innerText?.trim() || '',
          savedGoalType: JSON.parse(localStorage.getItem('myProfile_v5') || '{}').goalType || '',
          savedRegion: JSON.parse(localStorage.getItem('myProfile_v5') || '{}').region || '',
          savedDiningOutFrequency: JSON.parse(localStorage.getItem('myProfile_v5') || '{}').diningOutFrequency || ''
        }))()
      `);
      assert(goalState.selected === 'gain', `Goal type select did not switch to gain: ${JSON.stringify(goalState)}`);
      assert(goalState.savedGoalType === 'gain', `Goal type was not persisted: ${JSON.stringify(goalState)}`);
      assert(goalState.savedRegion === 'hong-kong', `Region was not persisted: ${JSON.stringify(goalState)}`);
      assert(goalState.savedDiningOutFrequency === 'often', `Dining-out frequency was not persisted: ${JSON.stringify(goalState)}`);
      assert(goalState.target > goalBefore, `Gain goal should increase target calories. Before ${goalBefore}, after ${goalState.target}. State: ${JSON.stringify(goalState)}`);
      assert(!goalState.goalCardPresent, 'Goal progress card should stay removed after goal recalculation.');
      assert(goalState.onboardingHidden, 'Onboarding card should hide after profile setup is completed.');
      assert(goalState.presetRegion === 'hong-kong', `Preset panel should follow the saved profile region. State: ${JSON.stringify(goalState)}`);
      assert(/增肌/.test(goalState.macroText), `Macro goal copy should reflect build-muscle mode: ${goalState.macroText}`);
      assert(!/[馃裸保]/.test(goalState.themeLabel), `Settings row should not include garbled prefix text: ${goalState.themeLabel}`);
      results.push('Onboarding preferences persist and drive goal setup defaults');

      const baselineTotal = await client.evaluate(`document.getElementById('total-cal-display').innerText`);
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
          return document.getElementById('current-date')?.value;
        })()
      `);
      await delay(300);
      assert(switchedForward === nextDate, `Could not switch date forward. Value became ${switchedForward}`);
      assert((await client.evaluate(`document.getElementById('total-cal-display').innerText`)) === '0', 'Date switch did not reset to empty day.');
      const switchedBack = await client.evaluate(`
        (async () => {
          const actionModule = await import('./js/state/app-actions.js');
          actionModule.dispatchAppAction('SET_SELECTED_DATE', { date: '${today}' });
          return document.getElementById('current-date')?.value;
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
        restoredTotal === baselineTotal,
        `Date switch back did not restore record. Actual total: ${restoredTotal}. Debug: ${JSON.stringify(debugState)}`
      );
      results.push('Date switching works');

      await client.evaluate(`document.querySelector('.nav-item[data-target="view-dashboard"]').click()`);
      let dashboardChartState = null;
      for (let attempt = 0; attempt < 12; attempt += 1) {
        await delay(500);
        dashboardChartState = await client.evaluate(`
          (() => ({
            active: document.getElementById('view-dashboard').classList.contains('active-view'),
            chartReady: typeof window.Chart === 'function',
            loaderInserted: Boolean(document.querySelector('script[data-chartjs-loader="true"]')),
            canvasWidth: document.getElementById('macroChart')?.width || 0,
            canvasHeight: document.getElementById('macroChart')?.height || 0
          }))()
        `);
        if (dashboardChartState?.active && (dashboardChartState?.chartReady || dashboardChartState?.loaderInserted)) break;
      }
      assert(dashboardChartState.active, 'Dashboard view did not activate.');
      const dashboardRhythmState = await client.evaluate(`
        (() => ({
          visible: !document.getElementById('dashboard-rhythm-card').hidden,
          signalCount: document.querySelectorAll('#dashboard-rhythm-card .rhythm-signal').length,
          nutritionVisible: !document.getElementById('dashboard-nutrition-focus-card').hidden,
          nutritionSignalCount: document.querySelectorAll('#dashboard-nutrition-focus-card .nutrition-focus-signal').length
        }))()
      `);
      assert(dashboardRhythmState.visible, 'Meal rhythm card should render on the dashboard view.');
      assert(dashboardRhythmState.signalCount === 4, `Dashboard meal rhythm card should show 4 signal blocks, got ${dashboardRhythmState.signalCount}.`);
      assert(dashboardRhythmState.nutritionVisible, 'Dashboard nutrition focus card should render on the dashboard view.');
      assert(dashboardRhythmState.nutritionSignalCount === 3, `Dashboard nutrition focus card should show 3 signal blocks, got ${dashboardRhythmState.nutritionSignalCount}.`);
      if (dashboardChartState.chartReady) {
        assert(dashboardChartState.canvasWidth > 0 && dashboardChartState.canvasHeight > 0, 'Dashboard chart canvas did not render.');
      }
      results.push(
        dashboardChartState.chartReady || dashboardChartState.loaderInserted
          ? 'Dashboard charts lazy-load when the view is opened'
          : 'Dashboard view opens even when external chart loading is unavailable'
      );

      await client.evaluate(`document.querySelector('.nav-item[data-target="view-daily"]').click()`);
      await delay(300);
    }

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
    await delay(600);
    assert((await client.evaluate(`document.getElementById('nav-settings').innerText`)) === 'Settings', 'Language switch to English failed.');
    const englishLanguageState = await client.evaluate(`
      (() => ({
        logHubLabel: document.getElementById('btn-home-log-hub-label')?.innerText?.trim() || '',
        favoritesLabel: document.getElementById('btn-home-favorites-label')?.innerText?.trim() || '',
        summaryStatus: document.getElementById('daily-summary-status')?.innerText?.trim() || '',
        summaryHint: document.getElementById('txt-daily-summary-hint')?.innerText?.trim() || '',
        goalLabel: document.getElementById('lbl-goal-type')?.innerText?.trim() || '',
        macroGoals: document.getElementById('macro-goals')?.innerText?.trim() || '',
        breakfastTitle: document.querySelector('.mission-card .mission-title')?.innerText?.trim() || '',
        breakfastGoal: document.querySelector('.mission-card .mission-goal')?.innerText?.trim() || '',
        foodSummary: document.querySelector('#list-breakfast .detail')?.innerText?.trim() || ''
      }))()
    `);
    assert(englishLanguageState.logHubLabel === "Add a meal", `Home log CTA should switch to English, got ${englishLanguageState.logHubLabel}`);
    assert(englishLanguageState.favoritesLabel === "Favorites", `Favorites CTA should switch to English, got ${englishLanguageState.favoritesLabel}`);
    assert(/\d+\s*kcal left today/i.test(englishLanguageState.summaryStatus), `English summary status is wrong: ${englishLanguageState.summaryStatus}`);
    assert(englishLanguageState.summaryHint === 'Tap for the full nutrition details', `English summary hint is wrong: ${englishLanguageState.summaryHint}`);
    assert(englishLanguageState.goalLabel === 'Goal', `Goal label should switch to English, got ${englishLanguageState.goalLabel}`);
    assert(/Current Goal:\s*Build Muscle/i.test(englishLanguageState.macroGoals), `Macro goal summary should switch to English, got ${englishLanguageState.macroGoals}`);
    assert(/Breakfast/.test(englishLanguageState.breakfastTitle), `Breakfast section title did not switch to English: ${englishLanguageState.breakfastTitle}`);
    assert(/\d+\s*kcal/i.test(englishLanguageState.breakfastGoal), `Breakfast goal text should be a numeric kcal target in English: ${englishLanguageState.breakfastGoal}`);
    assert(/Calories:\s*\d+\s*\|\s*Protein:\s*[\d.]+g\s*\|\s*Fat:\s*[\d.]+g\s*\|\s*Carb:\s*[\d.]+g/i.test(englishLanguageState.foodSummary), `Food summary should be localized in English: ${englishLanguageState.foodSummary}`);

    await client.evaluate(`
      document.getElementById('btn-open-lang-setting').click();
      document.querySelector('.lang-option[data-lang="ar"]').click();
    `);
    await delay(600);
    const arabicLanguageState = await client.evaluate(`
      (() => ({
        logHubLabel: document.getElementById('btn-home-log-hub-label')?.innerText?.trim() || '',
        favoritesLabel: document.getElementById('btn-home-favorites-label')?.innerText?.trim() || '',
        summaryStatus: document.getElementById('daily-summary-status')?.innerText?.trim() || '',
        summaryHint: document.getElementById('txt-daily-summary-hint')?.innerText?.trim() || '',
        goalLabel: document.getElementById('lbl-goal-type')?.innerText?.trim() || '',
        breakfastTitle: document.querySelector('.mission-card .mission-title')?.innerText?.trim() || '',
        breakfastGoal: document.querySelector('.mission-card .mission-goal')?.innerText?.trim() || '',
        foodSummary: document.querySelector('#list-breakfast .detail')?.innerText?.trim() || ''
      }))()
    `);
    assert(arabicLanguageState.logHubLabel.length > 0 && arabicLanguageState.logHubLabel !== englishLanguageState.logHubLabel, `Home log CTA should switch to Arabic, got ${arabicLanguageState.logHubLabel}`);
    assert(arabicLanguageState.favoritesLabel.length > 0 && arabicLanguageState.favoritesLabel !== englishLanguageState.favoritesLabel, `Favorites CTA should switch to Arabic, got ${arabicLanguageState.favoritesLabel}`);
    assert(/تبقّى\s+\d+\s*kcal\s+لليوم/.test(arabicLanguageState.summaryStatus), `Arabic summary status is wrong: ${arabicLanguageState.summaryStatus}`);
    assert(/[\u0600-\u06FF]/.test(arabicLanguageState.summaryHint), `Arabic summary hint is wrong: ${arabicLanguageState.summaryHint}`);
    assert(/[\u0600-\u06FF]/.test(arabicLanguageState.goalLabel), `Goal label should switch to Arabic: ${arabicLanguageState.goalLabel}`);
    assert(/فطور/.test(arabicLanguageState.breakfastTitle), `Breakfast section title did not switch to Arabic: ${arabicLanguageState.breakfastTitle}`);
    assert(/\d+\s*kcal/.test(arabicLanguageState.breakfastGoal), `Breakfast goal text should keep a numeric kcal target in Arabic: ${arabicLanguageState.breakfastGoal}`);
    assert(!/[A-Za-z\u4e00-\u9fff]/.test(arabicLanguageState.logHubLabel.replace(/\s/g, '')), `Arabic home log CTA still contains non-Arabic leftovers: ${arabicLanguageState.logHubLabel}`);
    assert(/[\u0600-\u06FF]/.test(arabicLanguageState.foodSummary), `Food summary should contain Arabic labels: ${arabicLanguageState.foodSummary}`);
    results.push('Language switch updates dynamic UI text');

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

    const recalcState = await client.evaluate(`
      (async () => {
        const actionModule = await import('./js/state/app-actions.js');
        const analysisModule = await import('./js/ui/analysis-ui.js');
        const originalFetch = window.fetch;
        const originalTurnstile = window.turnstile;

        window.turnstile = {
          getResponse: () => 'smoke-token',
          reset: () => {},
          execute: () => {}
        };

        window.fetch = async () => new Response(JSON.stringify({
          candidates: [{
            content: {
              parts: [{
                text: JSON.stringify({
                  foodName: 'Smoke Recalc Bowl',
                  calories: 320,
                  protein: 18,
                  fat: 7,
                  carbohydrate: 41,
                  sugar: 6,
                  sodium: 380,
                  saturatedFat: 1.5,
                  transFat: 0,
                  fiber: 5,
                  healthScore: 8,
                  items: [
                    { name: 'Rice', weight: '120' },
                    { name: 'Chicken', weight: '80' }
                  ]
                })
              }]
            }
          }]
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

        actionModule.dispatchAppAction('SET_TEMP_AI_RESULT', {
          result: {
            name: 'Pending Bowl',
            nutri: {
              calories: 100,
              protein: 1,
              fat: 1,
              carbohydrate: 1,
              sugar: 1,
              sodium: 1,
              saturatedFat: 1,
              transFat: 0,
              fiber: 1
            },
            items: [{ name: 'Rice', weight: '100' }],
            healthScore: 7
          },
          saved: false,
          openModal: true
        });

        const recalcPromise = analysisModule.recalculateAI();
        const pending = {
          askVisible: getComputedStyle(document.getElementById('txt-modal-ask')).display !== 'none',
          mealVisible: getComputedStyle(document.getElementById('modal-meal-buttons')).display !== 'none',
          favVisible: getComputedStyle(document.getElementById('btn-ai-fav-save')).display !== 'none',
          loadingText: document.getElementById('analysis-content').innerText.trim()
        };

        await recalcPromise;

        const resolved = {
          askVisible: getComputedStyle(document.getElementById('txt-modal-ask')).display !== 'none',
          mealVisible: getComputedStyle(document.getElementById('modal-meal-buttons')).display !== 'none',
          favVisible: getComputedStyle(document.getElementById('btn-ai-fav-save')).display !== 'none',
          title: document.querySelector('#analysis-content h3')?.innerText || ''
        };

        document.getElementById('analysis-modal').style.display = 'none';
        actionModule.dispatchAppAction('CLEAR_TEMP_AI_RESULT');
        window.fetch = originalFetch;
        window.turnstile = originalTurnstile;

        return { pending, resolved };
      })()
    `);
    assert(!recalcState.pending.askVisible, 'Meal question should be hidden while recalculation is running.');
    assert(!recalcState.pending.mealVisible, 'Meal selector should be hidden while recalculation is running.');
    assert(!recalcState.pending.favVisible, 'Favorite button should be hidden while recalculation is running.');
    assert(/AI/i.test(recalcState.pending.loadingText), `Recalculation should show an AI loading message. Got: ${recalcState.pending.loadingText}`);
    assert(recalcState.resolved.askVisible, 'Meal question should return after recalculation succeeds.');
    assert(recalcState.resolved.mealVisible, 'Meal selector should return after recalculation succeeds.');
    assert(recalcState.resolved.favVisible, 'Favorite button should return after recalculation succeeds.');
    assert(recalcState.resolved.title === 'Smoke Recalc Bowl', `Recalculation result did not refresh modal content. Got: ${recalcState.resolved.title}`);
    results.push('AI recalculation hides meal actions until the new result is ready');

    if (RUN_REAL_AI) {
      const baselineToastCount = await client.evaluate(`document.querySelectorAll('.toast').length`);
      if (UPLOAD_IMAGE_PATH) {
        await client.setFileInputFiles('#image-upload', [UPLOAD_IMAGE_PATH]);
        await delay(1500);
        await client.evaluate(`
          if (document.getElementById('ai-desc')) {
            document.getElementById('ai-desc').value = 'Steak photo test';
          }
          document.getElementById('analyze-btn').click();
        `);
      } else {
        await client.evaluate(`
          document.getElementById('ai-text-desc').value = 'banana and boiled egg';
          document.getElementById('analyze-btn').click();
        `);
      }
      let aiOutcome = null;
      for (let attempt = 0; attempt < 30; attempt += 1) {
        await delay(1000);
        aiOutcome = await client.evaluate(`
          (() => {
            const toasts = [...document.querySelectorAll('.toast')];
            const token = typeof turnstile !== 'undefined'
              ? (turnstile.getResponse('#turnstile-widget') || '')
              : '';
            return {
              modalOpen: document.getElementById('analysis-modal').style.display === 'flex',
              latestToast: toasts.length ? toasts[toasts.length - 1].innerText : '',
              newToast: toasts.length > ${baselineToastCount},
              loadingVisible: document.getElementById('ai-loading').style.display !== 'none',
              previewVisible: document.getElementById('image-preview').style.display !== 'none',
              analyzeBtnVisible: document.getElementById('analyze-btn').style.display !== 'none',
              tokenLength: token.length
            };
          })()
        `);
        if (aiOutcome.modalOpen || aiOutcome.newToast || !aiOutcome.loadingVisible) break;
      }
      if (
        aiOutcome &&
        !aiOutcome.modalOpen &&
        /安全防護載入中|Security verification is in progress|Turnstile/i.test(aiOutcome.latestToast || '')
      ) {
        await delay(2500);
        await client.evaluate(`document.getElementById('analyze-btn').click()`);
        for (let attempt = 0; attempt < 30; attempt += 1) {
          await delay(1000);
          aiOutcome = await client.evaluate(`
            (() => {
              const toasts = [...document.querySelectorAll('.toast')];
              const token = typeof turnstile !== 'undefined'
                ? (turnstile.getResponse('#turnstile-widget') || '')
                : '';
              return {
                modalOpen: document.getElementById('analysis-modal').style.display === 'flex',
                latestToast: toasts.length ? toasts[toasts.length - 1].innerText : '',
                newToast: toasts.length > ${baselineToastCount},
                loadingVisible: document.getElementById('ai-loading').style.display !== 'none',
                previewVisible: document.getElementById('image-preview').style.display !== 'none',
                analyzeBtnVisible: document.getElementById('analyze-btn').style.display !== 'none',
                tokenLength: token.length
              };
            })()
          `);
          if (aiOutcome.modalOpen || aiOutcome.newToast || !aiOutcome.loadingVisible) break;
        }
      }
      aiOutcome = aiOutcome || {
        modalOpen: false,
        previewVisible: false,
        loadingVisible: false,
        analyzeBtnVisible: true,
        tokenLength: 0,
        newToast: false,
        latestToast: ''
      };
      results.push(`AI live submit outcome: modalOpen=${aiOutcome.modalOpen}, previewVisible=${aiOutcome.previewVisible}, loadingVisible=${aiOutcome.loadingVisible}, analyzeBtnVisible=${aiOutcome.analyzeBtnVisible}, tokenLength=${aiOutcome.tokenLength}, newToast=${aiOutcome.newToast}, toast="${aiOutcome.latestToast || 'n/a'}"`);
      if (DUMP_AI && aiOutcome.modalOpen) {
        const aiDetails = await client.evaluate(`
          (() => {
            const root = document.getElementById('analysis-content');
            const getText = selector => root.querySelector(selector)?.innerText?.trim() || '';
            const nutriItems = [...root.querySelectorAll('.ai-nutri-item')].map(item => ({
              value: item.querySelector('.ai-n-val')?.innerText?.trim() || '',
              label: item.querySelector('.ai-n-lbl')?.innerText?.trim() || ''
            }));
            const rows = [...root.querySelectorAll('#ai-items-container .ai-item-row')].map(row => ({
              name: row.querySelector('.ai-item-name')?.value?.trim() || '',
              weight: row.querySelector('.ai-item-weight')?.value?.trim() || ''
            }));
            return {
              title: getText('h3'),
              score: getText('span[style*="font-size:2em"]'),
              nutrition: nutriItems,
              items: rows
            };
          })()
        `);
        console.log('AI_DETAILS_START');
        console.log(JSON.stringify(aiDetails, null, 2));
        console.log('AI_DETAILS_END');
      }
    }

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
    if (server) server.close();
    await fs.rm(userDataDir, { recursive: true, force: true }).catch(() => {});
  }
}

run().catch(error => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
