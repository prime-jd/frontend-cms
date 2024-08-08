import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    strictPort: true,
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://cms-eight-navy.vercel.app', // or your API server URL
        changeOrigin: true,
        secure: true, // This disables SSL verification
      },
    },
  },
  plugins: [react()],
})
