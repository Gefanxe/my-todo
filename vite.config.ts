import { fileURLToPath, URL } from 'node:url';
import { UserConfig, ConfigEnv, loadEnv, defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from 'unocss/vite';
import path from "path";
import * as pkg from './package.json';

const pathSrc = path.resolve(__dirname, "src");
// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
  console.log('mode: ', mode);
  console.log('process.cwd(): ', process.cwd());
  const env = loadEnv(mode, process.cwd());
  console.log('env: ', env);
  return {
    base: `/${pkg.name}/`,
    server: {
      // 允許IP訪問
      host: "0.0.0.0",
      // 應用端口 (默認:3000)
      port: Number(env.VITE_APP_PORT),
      // 運行是否自動打開瀏覽器
      open: true,
      proxy: {
        /**
         * 反向代理解決跨域配置
         * http://localhost:3000/dev-api/users (F12可見請求路徑) => http://localhost:8989/users (實際請求後端 API 路徑)
         *
         * env.VITE_APP_BASE_API: /dev-api
         * env.VITE_APP_TARGET_URL: http://localhost:8989
         * env.VITE_APP_TARGET_BASE_API: ""
         */
        [env.VITE_APP_BASE_API]: {
          changeOrigin: true,
          target: env.VITE_APP_TARGET_URL,
          rewrite: (path) =>
            path.replace(
              new RegExp("^" + env.VITE_APP_BASE_API),
              env.VITE_APP_TARGET_BASE_API
            ),
        },
      },
    },
    plugins: [
      vue(),
      UnoCSS(),
    ],
    resolve: {
      alias: {
        '@': pathSrc,
      },
    },
  }
});
