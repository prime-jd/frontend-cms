import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], 
  build: {
    outDir: 'dist', 
  },
  publicDir: 'public',
 // base : "/frontend/",
  server : {
    
      proxy :{
        "/api" :" http://localhost:8000"
      }
    
  }
})
