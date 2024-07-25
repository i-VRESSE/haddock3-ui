import { defineConfig, UserConfig } from 'vite'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import dts from "vite-plugin-dts";

const build: UserConfig['build'] = {
  sourcemap: true,
  lib: {
    entry: resolve(__dirname, 'src/index.tsx'),
    formats: ['es'],
    name: '@i-vresse/haddock3-ui',
    fileName: 'index',
  },
  rollupOptions: {
    external: ['react', 'react/jsx-runtime', 'ngl', 'clsx', 'tailwind-merge'],
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: resolve(__dirname,'./tsconfig.app.json'),
    })
  ],
  // Ladle does not work in vite library mode, so we drop its config when ladle runs
  // vite commands set NODE_ENV to development or production
  // ladle commands do not set NODE_ENV
  build: process.env.NODE_ENV === undefined ? undefined : build,
  server: {
    open: false
  }
})
