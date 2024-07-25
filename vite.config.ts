import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es'],
      name: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'ngl', 'clsx', 'tailwind-merge'],
    }
  },
})
