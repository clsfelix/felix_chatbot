import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const imageAssets = ['apng', 'png', 'jpe?g', 'jfif', 'pjpeg', 'pjp', 'gif', 'svg', 'ico', 'webp', 'avif'];


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude:imageAssets
})
