import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import AntdUI from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import APP from "./App.vue";

import "./assets/nestable.css"

Vue.use(ElementUI);
Vue.use(AntdUI);

new Vue({
  el: "#app",
  render: (h) => h(APP),
});
 