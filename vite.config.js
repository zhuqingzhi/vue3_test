import { fileURLToPath, URL } from 'node:url'

import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createHtmlPlugin } from 'vite-plugin-html'

const getViteEnv = (mode, target) => {
  return loadEnv(mode,process.cwd())[target]
}

// https://vitejs.dev/config/
export default ({mode})=>defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    createHtmlPlugin({
      inject: {
        data: {
          title:getViteEnv(mode,'VITE_APP_TITLE')
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/local': {
        target: 'http://172.17.54.128:1024',
        changeOrigin: true,
        rewrite: (path) => {
          console.log(path, path.replace(/^\/local/, ''))
          return path.replace(/^\/local/, '')
      }
      }
    }
  }
})
