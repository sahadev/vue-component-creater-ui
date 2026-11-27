/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
    // 旧界面里有 import('./ToolsBar') 这种省略扩展名的写法
    extensions: ['.vue', '.ts', '.js', '.json'],
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
