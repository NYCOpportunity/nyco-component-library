import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// Shared asset renamer — used by both outputs so Vite 7 sees a single reference.
// Renames any CSS asset to style.css (there is only one CSS entry: src/styles.css).
const assetFileNames = (assetInfo: { name?: string }) =>
  assetInfo.name?.endsWith('.css') ? 'style.css' : (assetInfo.name ?? 'asset');

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
  ],
  build: {
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'UI',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.mjs' : 'index.cjs'),
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: [
        {
          format: 'es',
          entryFileNames: 'index.mjs',
          assetFileNames,
        },
        {
          format: 'cjs',
          entryFileNames: 'index.cjs',
          assetFileNames,
        },
      ],
    },
  },
});
