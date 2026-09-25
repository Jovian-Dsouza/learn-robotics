import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    // The three.js/@react-three ecosystem lands in its own chunk (see
    // src/components/three/) that's lazy-loaded only for WebGL-capable,
    // motion-preferring visitors — it's expected to be well over the default
    // 500kB warning threshold and is never part of the main bundle.
    chunkSizeWarningLimit: 1000,
  },
})
