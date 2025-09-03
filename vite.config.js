import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import fs from 'fs'

export default defineConfig(() => {
  let httpsConfig = false

  try {
    const keyPath = path.resolve(__dirname, 'localhost-key.pem')
    const certPath = path.resolve(__dirname, 'localhost.pem')

    if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
      httpsConfig = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      }
    }
  } catch (err) {
    console.warn("⚠️ No se encontraron certificados SSL, el servidor se levantará en HTTP.")
  }

  return {
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
      https: httpsConfig,
      port: 5173,
      host: true,
    },
  }
})
