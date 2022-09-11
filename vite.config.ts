import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
// export default defineConfig({
//   envDir: './viteEnv',
//   envPrefix: ['VITE_', 'MY_', 'YOUR_'],
//   plugins: [vue(), vueJsx()],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   }
// })
export default defineConfig((options) => {
  console.log(options); // { mode: 'demo', command: 'serve', ssrBuild: false }
  const env = loadEnv(options.mode, './viteEnv', ['VITE_', 'MY_', 'YOUR_'])

  console.log(env);
  /**
   * {
      VITE_NODE_ENV: 'demo',
      VITE_OWNER: 'Inner',
      VITE_POSITION: 'viteEnv/.env.demo',
      MY_PARAM1: '内部的变量1',
      YOUR_PARAM2: '内部的变量2'
    }
   */
  
  return {
      envDir: './viteEnv',
      envPrefix: ['VITE_', 'MY_', 'YOUR_'],
      plugins: [vue(), vueJsx()],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      }
    }
})