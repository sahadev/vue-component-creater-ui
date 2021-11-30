import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import ViteRequireContext from "@originjs/vite-plugin-require-context";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteRequireContext(),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
      {
        find: "vue",
        replacement: "vue/dist/vue.esm-bundler.js"
      }
    ],
    extensions: [".vue", ".js"],
  },
  server: {
    fs: {
      // 可以为项目根目录的上一级提供服务
      allow: [".."],
    },
  },
});
