import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Proxy only needed for local development
    // For production, API calls go directly to the backend
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
