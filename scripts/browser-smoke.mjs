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
      exceptions.push(params.exceptionDetails?.text || 'Runtime exception');
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

    if (!URL_ARG) {
      const migrationReload = client.waitForEvent('Page.loadEventFired', () => true, 15000);
      await client.evaluate(`
        (() => {
          const d = new Date();
          const y = d.getFullYear();
          const m = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');
          const today = \`\${y}-\${m}-\${day}\`;

          localStorage.setItem(\`record_\${today}\`, JSON.stringify([
            {
              type: 'breakfast',
              name: 'Legacy Oatmeal',
              cal: 80,
              protein: 3.5,
              fat: 1.2,
              carbohydrate: 14.8
            }
          ]));
          localStorage.setItem('myFavorites', JSON.stringify([
            {
              name: 'Legacy Soup',
              cal: 95,
              protein: 6,
              fat: 1.1,
              carbohydrate: 12
            }
          ]));
          localStorage.setItem('myProfile_v4', JSON.stringify({
            gender: 'female',
            age: 31,
            height: 165,
            weight: 54,
            activity: '1.375',
            mealMode: '3'
          }));
          localStorage.removeItem('woofCal_schema_version');
          location.reload();
        })();
      `);
      await migrationReload;
      await delay(2500);

      const migrationState = await client.evaluate(`
        (() => {
          const d = new Date();
          const y = d.getFullYear();
          const m = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');
          const today = \`\${y}-\${m}-\${day}\`;
          const records = JSON.parse(localStorage.getItem(\`record_\${today}\`) || '[]');
          const favorites = JSON.parse(localStorage.getItem('myFavorites') || '[]');
          return {
            schemaVersion: localStorage.getItem('woofCal_schema_version'),
            profileLegacyRemoved: localStorage.getItem('myProfile_v4') === null,
            profile: JSON.parse(localStorage.getItem('myProfile_v5') || 'null'),
            record: records[0] || null,
            favorite: favorites[0] || null,
            totalCalories: document.getElementById('total-cal-display').innerText
          };
        })()
      `);

      assert(migrationState.schemaVersion === '3', `Storage schema version should be 3, got ${migrationState.schemaVersion}`);
      assert(migrationState.profileLegacyRemoved, 'Legacy profile key was not removed during migration.');
      assert(migrationState.profile?.mealMode === '3', 'Legacy profile was not migrated to myProfile_v5.');
      assert(migrationState.record?.nutri?.calories === 80, 'Legacy record calories were not migrated.');
      assert(migrationState.record?.nutri?.fiber === 0, 'Legacy record fiber should default to 0.');
      assert(migrationState.favorite?.nutri?.calories === 95, 'Legacy favorite calories were not migrated.');
      assert(migrationState.favorite?.nutri?.transFat === 0, 'Legacy favorite trans fat should default to 0.');
      assert(migrationState.totalCalories === '80', `Migrated legacy record did not render on dashboard. Total was ${migrationState.totalCalories}.`);
      results.push('Legacy storage migration works');

      const resetReload = client.waitForEvent('Page.loadEventFired', () => true, 15000);
      await client.evaluate(`
        localStorage.clear();
        location.reload();
      `);
      await resetReload;
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
          emptyVisible: !document.getElementById('daily-empty-state').hidden,
          coachTitle: document.getElementById('txt-coach-title')?.innerText?.trim() || '',
          coachHeadline: document.getElementById('coach-headline')?.innerText?.trim() || '',
          goalProgressPresent: Boolean(document.getElementById('goal-insights-card'))
        }))()
      `);
      assert(onboardingState.emptyVisible, 'Quick-start empty state should be visible before the first log.');
      assert(Boolean(onboardingState.coachTitle), 'Coach card should render a title.');
      assert(Boolean(onboardingState.coachHeadline), 'Coach card should render a headline.');
      assert(!onboardingState.goalProgressPresent, 'Goal progress card should not render on the daily view.');
      results.push('Quick-start and coach card render on an empty day');

      const deferredChartState = await client.evaluate(`typeof window.Chart === 'function'`);
      assert(!deferredChartState, 'Chart.js should stay unloaded until the dashboard is opened.');
      results.push('Chart.js is deferred on the daily view');
    }

    if (!URL_ARG) {
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
      assert((await client.evaluate(`document.getElementById('total-cal-display').innerText`)) === '123', 'Manual add did not update total calories.');
      assert((await client.evaluate(`document.getElementById('sum-fiber').innerText`)) === '4.2', 'Manual fiber did not update dashboard total.');
      const coachState = await client.evaluate(`
        (() => ({
          emptyHidden: document.getElementById('daily-empty-state').hidden,
          tipCount: document.querySelectorAll('#coach-tips li').length,
          statCount: document.querySelectorAll('#coach-weekly-stats .coach-stat-chip').length
        }))()
      `);
      assert(coachState.emptyHidden, 'Quick-start empty state should hide after a meal is logged.');
      assert(coachState.tipCount >= 1, `Coach card should show at least one tip, got ${coachState.tipCount}.`);
      assert(coachState.statCount === 3, `Coach card should show 3 weekly stats, got ${coachState.statCount}.`);
      results.push('Manual add works');

      const dashboardState = await client.evaluate(`
        (() => ({
          metricCount: document.querySelectorAll('#daily-summary-card .nutrition-grid--summary .nutri-box').length,
          petSrc: document.getElementById('pet-img')?.getAttribute('src') || '',
          petLoaded: (document.getElementById('pet-img')?.naturalWidth || 0) > 0
        }))()
      `);
      assert(dashboardState.metricCount === 4, `Daily summary card should show 4 visible nutrients, got ${dashboardState.metricCount}.`);
      assert(dashboardState.petLoaded, `Pet image failed to load: ${dashboardState.petSrc}`);
      assert(/dog_animation\/dog_[a-z]+\.gif$/i.test(dashboardState.petSrc), `Pet image should point to a bundled gif, got ${dashboardState.petSrc}.`);
      results.push('Dashboard summary and pet image load correctly');

      await client.evaluate(`document.getElementById('daily-summary-card').click()`);
      await delay(300);
      const dailySummaryModal = await client.evaluate(`
        (() => ({
          open: document.getElementById('detail-modal').style.display === 'flex',
          statCount: document.querySelectorAll('#detail-content .ai-nutri-item').length
        }))()
      `);
      assert(dailySummaryModal.open, 'Daily summary card did not open the detail modal.');
      assert(dailySummaryModal.statCount === 12, `Daily summary detail should show 12 stat tiles, got ${dailySummaryModal.statCount}.`);
      results.push('Daily summary card opens the full nutrition modal');
      await client.evaluate(`document.getElementById('btn-detail-close').click()`);

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

      await client.evaluate(`document.getElementById('btn-fav-load-main').click()`);
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
        (() => {
          const rows = [...document.querySelectorAll('#list-breakfast li, #list-lunch li, #list-dinner li, #list-snack li')];
          const target = rows.find(row => row.querySelector('.name')?.innerText?.includes('Smoke Seed Bowl'));
          target?.querySelector('.food-info')?.click();
        })();
      `);
      await delay(300);
      const detailState = await client.evaluate(`
        (() => {
          const headerText = document.querySelector('#detail-modal h3')?.innerText || '';
          const nutriCount = document.querySelectorAll('#detail-content .ai-nutri-item').length;
          const clipboardCount = (headerText.match(/📋/g) || []).length;
          const itemWeights = [...document.querySelectorAll('#detail-content strong + div > div span:last-child')]
            .map(node => node.innerText.trim());
          return { headerText, nutriCount, clipboardCount, itemWeights };
        })()
      `);
      assert(detailState.nutriCount === 9, `Detail modal should show 9 nutrition fields, got ${detailState.nutriCount}.`);
      assert(detailState.clipboardCount <= 1, `Detail modal title icon is duplicated: ${detailState.headerText}`);
      assert(detailState.itemWeights.includes('60 g'), `Detail modal should show gram units for ingredients. Got: ${detailState.itemWeights.join(', ')}`);
      assert(detailState.itemWeights.includes('15 g'), `Detail modal should show gram units for ingredients. Got: ${detailState.itemWeights.join(', ')}`);
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
          savedGoalType: JSON.parse(localStorage.getItem('myProfile_v5') || '{}').goalType || ''
        }))()
      `);
      assert(goalState.selected === 'gain', `Goal type select did not switch to gain: ${JSON.stringify(goalState)}`);
      assert(goalState.savedGoalType === 'gain', `Goal type was not persisted: ${JSON.stringify(goalState)}`);
      assert(goalState.target > goalBefore, `Gain goal should increase target calories. Before ${goalBefore}, after ${goalState.target}. State: ${JSON.stringify(goalState)}`);
      assert(!goalState.goalCardPresent, 'Goal progress card should stay removed after goal recalculation.');
      assert(/增肌/.test(goalState.macroText), `Macro goal copy should reflect build-muscle mode: ${goalState.macroText}`);
      results.push('Goal type switching updates profile targets without restoring the daily progress card');

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
            canvasWidth: document.getElementById('macroChart')?.width || 0,
            canvasHeight: document.getElementById('macroChart')?.height || 0
          }))()
        `);
        if (dashboardChartState?.active && dashboardChartState?.chartReady) break;
      }
      assert(dashboardChartState.active, 'Dashboard view did not activate.');
      assert(dashboardChartState.chartReady, 'Chart.js did not lazy-load on dashboard open.');
      assert(dashboardChartState.canvasWidth > 0 && dashboardChartState.canvasHeight > 0, 'Dashboard chart canvas did not render.');
      results.push('Dashboard charts lazy-load when the view is opened');

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
        dateLabel: document.getElementById('display-date-text')?.innerText?.trim() || '',
        recordTitle: document.getElementById('txt-record-title')?.innerText?.trim() || '',
        summaryStatus: document.getElementById('daily-summary-status')?.innerText?.trim() || '',
        summaryHint: document.getElementById('txt-daily-summary-hint')?.innerText?.trim() || '',
        goalLabel: document.getElementById('lbl-goal-type')?.innerText?.trim() || '',
        macroGoals: document.getElementById('macro-goals')?.innerText?.trim() || '',
        breakfastTitle: document.querySelector('.meal-section .meal-title')?.innerText?.trim() || '',
        breakfastGoal: document.querySelector('.meal-section .meal-goal')?.innerText?.trim() || '',
        foodSummary: document.querySelector('#list-breakfast .detail')?.innerText?.trim() || ''
      }))()
    `);
    assert(englishLanguageState.dateLabel === 'Today', `Date label should switch to Today, got ${englishLanguageState.dateLabel}`);
    assert(englishLanguageState.recordTitle === 'Diet Record', `Record title should switch to Diet Record, got ${englishLanguageState.recordTitle}`);
    assert(/\d+\s*kcal left today/i.test(englishLanguageState.summaryStatus), `English summary status is wrong: ${englishLanguageState.summaryStatus}`);
    assert(englishLanguageState.summaryHint === 'Tap to view all nutrients', `English summary hint is wrong: ${englishLanguageState.summaryHint}`);
    assert(englishLanguageState.goalLabel === 'Goal', `Goal label should switch to English, got ${englishLanguageState.goalLabel}`);
    assert(/Current Goal:\s*Build Muscle/i.test(englishLanguageState.macroGoals), `Macro goal summary should switch to English, got ${englishLanguageState.macroGoals}`);
    assert(/Breakfast/.test(englishLanguageState.breakfastTitle), `Breakfast section title did not switch to English: ${englishLanguageState.breakfastTitle}`);
    assert(/Goal/i.test(englishLanguageState.breakfastGoal), `Breakfast goal text should be in English: ${englishLanguageState.breakfastGoal}`);
    assert(/Calories:\s*\d+\s*\|\s*Protein:\s*[\d.]+g\s*\|\s*Fat:\s*[\d.]+g\s*\|\s*Carb:\s*[\d.]+g/i.test(englishLanguageState.foodSummary), `Food summary should be localized in English: ${englishLanguageState.foodSummary}`);

    await client.evaluate(`
      document.getElementById('btn-open-lang-setting').click();
      document.querySelector('.lang-option[data-lang="ar"]').click();
    `);
    await delay(600);
    const arabicLanguageState = await client.evaluate(`
      (() => ({
        dateLabel: document.getElementById('display-date-text')?.innerText?.trim() || '',
        recordTitle: document.getElementById('txt-record-title')?.innerText?.trim() || '',
        summaryStatus: document.getElementById('daily-summary-status')?.innerText?.trim() || '',
        summaryHint: document.getElementById('txt-daily-summary-hint')?.innerText?.trim() || '',
        goalLabel: document.getElementById('lbl-goal-type')?.innerText?.trim() || '',
        breakfastTitle: document.querySelector('.meal-section .meal-title')?.innerText?.trim() || '',
        breakfastGoal: document.querySelector('.meal-section .meal-goal')?.innerText?.trim() || '',
        foodSummary: document.querySelector('#list-breakfast .detail')?.innerText?.trim() || ''
      }))()
    `);
    assert(arabicLanguageState.dateLabel === 'اليوم', `Date label should switch to Arabic today label, got ${arabicLanguageState.dateLabel}`);
    assert(arabicLanguageState.recordTitle === 'سجل الوجبات', `Record title should switch to Arabic, got ${arabicLanguageState.recordTitle}`);
    assert(/متبقي\s+\d+\s*kcal\s+لليوم/.test(arabicLanguageState.summaryStatus), `Arabic summary status is wrong: ${arabicLanguageState.summaryStatus}`);
    assert(arabicLanguageState.summaryHint === 'اضغط لعرض كل العناصر الغذائية والماء', `Arabic summary hint is wrong: ${arabicLanguageState.summaryHint}`);
    assert(/[\u0600-\u06FF]/.test(arabicLanguageState.goalLabel), `Goal label should switch to Arabic: ${arabicLanguageState.goalLabel}`);
    assert(/فطور/.test(arabicLanguageState.breakfastTitle), `Breakfast section title did not switch to Arabic: ${arabicLanguageState.breakfastTitle}`);
    assert(/[\u0600-\u06FF]/.test(arabicLanguageState.breakfastGoal), `Breakfast goal text should be in Arabic: ${arabicLanguageState.breakfastGoal}`);
    assert(!/[A-Za-z\u4e00-\u9fff]/.test(arabicLanguageState.recordTitle.replace(/\s/g, '')), `Arabic record title still contains non-Arabic leftovers: ${arabicLanguageState.recordTitle}`);
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
