import { defineConfig, Plugin } from 'vite'
import preact from '@preact/preset-vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import removeConsole from 'vite-plugin-remove-console'
import GlobalsPolyfills from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

export default defineConfig({
  plugins: [preact(), tsconfigPaths()],
  resolve: { alias: { assert: 'assert-browserify' } },
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          gzipSize: true,
          brotliSize: true,
        }),
        nodePolyfills(),
        removeConsole(),
      ] as unknown[] as Plugin[],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        GlobalsPolyfills({
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ] as any[],
    },
  },
  server: { port: 3000 },
})
