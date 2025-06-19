import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { componentTagger } from 'lovable-tagger'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig, Plugin } from 'vite'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

const isDev = process.env.NODE_ENV === 'development'

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindcss(),
    svgr(),
    isDev && componentTagger(),
  ],
  // base: '/rich-rekt/',
  server: {
    allowedHosts: ['.trycloudflare.com'],
  },
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          gzipSize: true,
          brotliSize: true,
        }) as Plugin,
      ],
    },
    outDir: 'dist',
  },
})
