import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// vite.config.ts - no proxy needed, Nginx handles it
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000
  }
})