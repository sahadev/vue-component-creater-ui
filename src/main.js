import { createApp, compile } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import APP from "./App.vue";

function createBaseApp(renderComponent = {}) {
  const app = createApp(renderComponent);
  app.use(ElementPlus);
  return app;
}

createBaseApp(APP).mount("#app");

// 内部需要同样配置的全局Vue
self.createBaseApp = createBaseApp;
self.compile = compile;
