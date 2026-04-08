import path from 'node:path';
import { access } from 'node:fs/promises';
import { constants as fsConstants } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
export const projectRoot = path.resolve(scriptDir, '..');
export const configFile = path.join(projectRoot, 'vite.config.js');
export const outDir = path.join(projectRoot, 'js', 'react-home');
export const expectedArtifacts = [
  path.join(outDir, 'react-home-island.js'),
  path.join(outDir, 'react-home-island.css')
];

export async function ensureExpectedArtifactsExist(artifacts = expectedArtifacts) {
  for (const artifact of artifacts) {
    try {
      await access(artifact, fsConstants.F_OK);
    } catch {
      throw new Error(`Expected React home island artifact was not produced: ${artifact}`);
    }
  }
}

export async function buildReactHomeIsland() {
  await build({
    configFile,
    mode: 'island'
  });

  await ensureExpectedArtifactsExist();

  return {
    outDir,
    artifacts: expectedArtifacts
  };
}

const isDirectExecution = process.argv[1]
  && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirectExecution) {
  const result = await buildReactHomeIsland();
  console.log(`React home island built at ${result.outDir}`);
}
