import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..', '..');
const outputDir = path.join(projectRoot, 'dist-capacitor');

const copyEntries = [
    'style.css',
    'manifest.json',
    'sw.js',
    'calorie_icon.png',
    'calorie_icon-128.png',
    'favicon.svg',
    'pet_placeholder.svg',
    'dog_animation',
    'js'
];

function withCapacitorRuntimeConfig(html) {
    const configScript = `    <script>
        window.__WOOF_CAL_CONFIG__ = Object.assign({}, window.__WOOF_CAL_CONFIG__, {
            turnstileAllowedHostnames: ['andreww0421.github.io', 'localhost']
        });
    </script>
`;

    return html.includes('window.__WOOF_CAL_CONFIG__')
        ? html
        : html.replace('</head>', `${configScript}</head>`);
}

async function copyEntry(entry) {
    await cp(path.join(projectRoot, entry), path.join(outputDir, entry), { recursive: true });
}

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

const indexSource = await readFile(path.join(projectRoot, 'index.html'), 'utf8');
await writeFile(path.join(outputDir, 'index.html'), withCapacitorRuntimeConfig(indexSource));

await Promise.all(copyEntries.map(copyEntry));

console.log(`Capacitor web assets written to ${outputDir}`);
