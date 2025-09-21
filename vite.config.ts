import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { tanstackStart } from '@tanstack/react-start-plugin';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import viteReact from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    paraglideVitePlugin({
      project: './i18n',
      outdir: './src/i18n',
      strategy: ["localStorage", "cookie", "preferredLanguage", "baseLocale"],
    }),
    tsConfigPaths({ projects: ['./tsconfig.json'] }),
    tanstackStart({ customViteReactPlugin: true }),
    viteReact(),
  ],
});
