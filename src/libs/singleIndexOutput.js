import { parseComponent } from "vue-template-compiler/browser";
import ejs from "ejs";

const outputVueTemplate = `
<!DOCTYPE html>
<!-- 此页面通过VCC进行搭建: https://vcc3.sahadev.tech/ -->
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page</title>
  <style stype="text/css">
    <%= style %>
  </style>
  <% for(var i = 0; i < cssLibs.length; ++i) { %>
  <link href="<%= cssLibs[i] %>" rel="stylesheet"><% } %>
</head>
<body>
  <div id="app">
    <%- templateHolder %>
  </div>
</body>
<% for(var i = 0; i < scriptLibs.length; ++i) { %>
<script src="<%= scriptLibs[i] %>"></script><% } %>
<script>

  <% if(vue3) {%>Vue.createApp(<%-logicHolder%>)<% for(var i = 0; i < vue3UseLib.length; ++i) { %>
      .use(<%= vue3UseLib[i] %>)<%}%>
      .mount("#app"); %>
  <% } else {%>new Vue(<%- logicHolder %>).$mount("#app")<%}%>
</script>
</html>`;

const libAddressMap = {
  vue: {
    js: ["https://cdn.bootcdn.net/ajax/libs/vue/3.2.31/vue.global.min.js"],
    css: "",
  },
  ele: {
    js: ["https://cdn.bootcdn.net/ajax/libs/element-plus/2.1.0/index.full.min.js"],
    css: "https://cdn.bootcdn.net/ajax/libs/element-plus/2.1.0/theme-chalk/index.min.css",
    libName: "ElementPlus",
  },
  antd: {
    js: [
      "https://cdn.bootcdn.net/ajax/libs/dayjs/1.10.8/dayjs.min.js",
      "https://cdn.bootcdn.net/ajax/libs/ant-design-vue/3.0.0-alpha.14/antd.min.js",
    ],
    css: "https://cdn.bootcdn.net/ajax/libs/ant-design-vue/3.0.0-alpha.14/antd.min.css",
    libName: "antd",
  },
  vant: {
    js: ["https://cdn.bootcdn.net/ajax/libs/vant/3.3.7/vant.min.js"],
    css: "https://cdn.bootcdn.net/ajax/libs/vant/3.3.7/index.min.css",
    libName: "vant",
  },
};

export default function (vueCode, dependenciesLibs, vue3 = true) {
  const { template, script, styles, customBlocks } = parseComponent(vueCode);

  let newScript = script.content.replace(/\s*export default\s*/, "");

  const tempDependenciesLibs = dependenciesLibs.slice();
  const tempLibAddressMap = vue3 ? libAddressMap: libAddressMapForVue2

  tempDependenciesLibs.unshift("vue");

  const output = ejs.render(outputVueTemplate, {
    cssLibs: tempDependenciesLibs.map((item) => tempLibAddressMap[item].css).filter((item) => !!item),
    scriptLibs: tempDependenciesLibs
      .map((item) => tempLibAddressMap[item].js)
      .flat()
      .filter((item) => !!item),
    vue3,
    vue3UseLib: tempDependenciesLibs
      .filter((item) => item != "vue")
      .map((item) => tempLibAddressMap[item].libName),
    style: styles[0].content,
    templateHolder: template.content,
    logicHolder: newScript,
  });

  return output;
}

const libAddressMapForVue2 = {
  vue: {
    js: ["https://cdn.bootcdn.net/ajax/libs/vue/2.6.14/vue.min.js"],
    css: "",
  },
  ele: {
    js: ["https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.7/index.min.js"],
    css: "https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.7/theme-chalk/index.min.css",
  },
  antd: {
    js: [
      "https://cdn.bootcdn.net/ajax/libs/moment.js/2.29.1/moment.min.js",
      "https://cdn.bootcdn.net/ajax/libs/ant-design-vue/1.7.8/antd.js",
    ],
    css: "https://cdn.bootcdn.net/ajax/libs/ant-design-vue/1.7.8/antd.css",
  },
  vant: {
    js: ["https://cdn.bootcdn.net/ajax/libs/vant/2.12.44/vant.min.js"],
    css: "https://cdn.bootcdn.net/ajax/libs/vant/2.12.44/index.min.css",
  },
};
