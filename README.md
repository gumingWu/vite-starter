# vite-starter

This template should help get you started developing with Vue 3 in Vite.

一个vite的基础模板，main分支不用于开发，请新建分支进行开发

## 步骤
- `git checkout -b feat/xxx`
- `git push origin feat/xxx`

## vite环境文件

### 设置与环境相关的配置

- envDir
  - type: string
  - default: root 设置读取环境文件的路径，默认跟`vite.config.ts`文件所在目录
- envPrefix
  - type: string | string[]
  - default: `VITE_`自定义环境变量前缀，默认为`VITE_`前缀，符合该前缀的环境变量才会暴露在`import.meta.env`中


当启动指令为：`dev: vite --mode demo`时，应该执行哪个`.env.demo`配置呢

这时候就需要用`envDir`配置来指定了

通过`import.meta.env`可以获取环境配置

当不指定`envDir`或`envDir: ./`时，输出

```json
{ "VITE_NODE_ENV": "demo", "VITE_OWNER": "Outer", "VITE_POSITION": ".env.demo", "BASE_URL": "/", "MODE": "demo", "DEV": true, "PROD": false, "SSR": false }
```

当指定为`envDir: ./viteEnv`时

```json
{ "VITE_NODE_ENV": "demo", "VITE_OWNER": "Inner", "VITE_POSITION": "viteEnv/.env.demo", "BASE_URL": "/", "MODE": "demo", "DEV": true, "PROD": false, "SSR": false }
```

可以看到只暴露了`VITE_`开头的配置，如果希望自定义前缀，可以使用`envPrefix`，指定`envPrefix: ['VITE_', 'MY_', 'YOUR_']`

```json
{ "VITE_NODE_ENV": "demo", "VITE_OWNER": "Inner", "VITE_POSITION": "viteEnv/.env.demo", "MY_PARAM1": "内部的变量1", "YOUR_PARAM2": "内部的变量2", "BASE_URL": "/", "MODE": "demo", "DEV": true, "PROD": false, "SSR": false }
```

可以看到自定义前缀的变量也暴露了

## 运行时获取配置

如何在`vite.config.ts`中就能获取到当前的运行模式，和环境变量呢

将`defineConfig`写成函数形式就能获取运行模式

```js
export default defineConfig((options) => {
  console.log(options); // { mode: 'demo', command: 'serve', ssrBuild: false }
  
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
```

vite内置函数`loadEnv`能获取环境变量

```js
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
```