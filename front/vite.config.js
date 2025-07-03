import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173, // 💡 change de port pour éviter conflit avec le back
    proxy: {
      "/api": {
        target: "http://localhost:9000", // 💡 ton serveur Express local
        changeOrigin: true
      }
    }
  }
});
