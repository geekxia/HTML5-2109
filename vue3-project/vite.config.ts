import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    ViteComponents({
      customComponentResolvers: [AntDesignVueResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://cnodejs.org/',
        changeOrigin: true
      }
    }
  }
})
