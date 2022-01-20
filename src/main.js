import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "ant-design-vue/dist/antd.css";

import APP from "./App.vue";

Vue.use(ElementUI);

// 内部需要同样配置的全局Vue
self.Vue = Vue;

new Vue({
  el: "#app",
  render: (h) => h(APP),
});
 