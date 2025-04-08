import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Anotador de Truco',
        short_name: 'Truco',
        description: 'Anotador de truco desarrollado en React JS.',
        theme_color: '#242424',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/cartas.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/cartas.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})
