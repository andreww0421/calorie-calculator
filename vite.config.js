import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = __dirname;
const reactRoot = path.resolve(projectRoot, 'src/react');

export default defineConfig(({ mode }) => {
  const common = {
    plugins: [react()],
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode === 'development' ? 'development' : 'production')
    },
    server: {
      fs: {
        allow: [projectRoot]
      }
    },
    resolve: {
      alias: {
        '@react': reactRoot
      }
    }
  };

  if (mode === 'island') {
    return {
      ...common,
      build: {
        lib: {
          entry: path.resolve(reactRoot, 'runtime-entry.jsx'),
          formats: ['es'],
          fileName: () => 'react-home-island.js'
        },
        outDir: path.resolve(projectRoot, 'js/react-home'),
        emptyOutDir: true,
        cssCodeSplit: false,
        rollupOptions: {
          output: {
            assetFileNames: (assetInfo) => {
              if (assetInfo.name?.endsWith('.css')) {
                return 'react-home-island.css';
              }
              return '[name][extname]';
            }
          }
        }
      }
    };
  }

  return {
    ...common,
    root: reactRoot,
    build: {
      outDir: path.resolve(projectRoot, 'dist-react'),
      emptyOutDir: true
    }
  };
});
