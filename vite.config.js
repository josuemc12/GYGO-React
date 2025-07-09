import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "components": path.resolve(__dirname, "./src/components"),
      "examples": path.resolve(__dirname, "./src/examples"),
      "assets": path.resolve(__dirname, "./src/assets"), 
      "layouts": path.resolve(__dirname, "./src/layouts"), 


    },
  },
  server: {
    https: false,
    port: 5173,
    host: true,
  },
})