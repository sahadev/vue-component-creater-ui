import { createApp } from "vue";
import ElementPlus from "element-plus";
import {
  QuestionFilled,
  CirclePlus,
  DocumentCopy,
  Delete,
  Refresh,
  Minus,
} from "@element-plus/icons";
import "element-plus/dist/index.css";

import APP from "./App.vue";
import loadCompontents from "@/libs/UIComponentInit.js";
import loadStore from "@/libs/store.js";

function loadTemplate(renderComponent, loadFinished = () => {}) {
  const app = createApp(renderComponent);
  app.use(ElementPlus);
  loadCompontents().then((modules) => {
    for (let index = 0; index < modules.length; index++) {
      const module = modules[index];
      app.use(module);
      loadFinished(app);
    }
  });
  return app;
}

function createBaseAppSync(renderComponent = {}) {
  return loadTemplate(renderComponent);
}

function createBaseAppAsync(renderComponent = {}) {
  return new Promise((resolve, reject) => {
    loadTemplate(renderComponent, (app) => {
      resolve(app);
    });
  });
}

const app = createBaseAppSync(APP);

app.component("question-filled", QuestionFilled);
app.component("circle-plus", CirclePlus);
app.component("refresh", Refresh);
app.component("delete", Delete);
app.component("document-copy", DocumentCopy);
app.component("minus", Minus);

loadStore(app).mount("#app");

// 内部需要同样配置的全局Vue
self.createBaseAppAsync = createBaseAppAsync;
