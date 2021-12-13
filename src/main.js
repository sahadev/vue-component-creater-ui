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

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

function createBaseApp(renderComponent = {}) {
  const app = createApp(renderComponent);
  app.use(ElementPlus);
  app.use(Antd);

  app.component("question-filled", QuestionFilled);
  app.component("circle-plus", CirclePlus);
  app.component("refresh", Refresh);
  app.component("delete", Delete);
  app.component("document-copy", DocumentCopy);
  app.component("minus", Minus);

  return app;
}

const globalApp = createBaseApp(APP);
globalApp.mount("#app");

// 内部需要同样配置的全局Vue
self.createBaseApp = createBaseApp;
self.globalApp = globalApp; // 内部需要使用Vuex

import("@/libs/store.js");

function loadVant() {
  const vantLoadPromise = (() => import("vant"))();
  (() => import("vant/lib/index.css"))();
  vantLoadPromise.then((vantModule) => {
    self.globalApp.use(vantModule);
  });
}

loadVant();
