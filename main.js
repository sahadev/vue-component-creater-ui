import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import AntdUI from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import Main from "./dist/vcc.common.js";

Vue.use(ElementUI);
Vue.use(AntdUI);

new Vue({
  el: "#app",
  render: (h) => h(Main),
});
 