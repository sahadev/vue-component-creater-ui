import { parseComponent } from 'vue-template-compiler/browser';

const outputVue2Template = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>VCC预览</title>
  <!-- import CSS -->
  <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
  <style stype="text/css">#styleTemplate</style>
</head>
<body>
  <div id="app">
    #templateHolder
  </div>
</body>
  <!-- import Vue before Element -->
  <script src="https://unpkg.com/vue/dist/vue.js"></script>
  <!-- import JavaScript -->
  <script src="https://unpkg.com/element-ui/lib/index.js"></script>
  <script>
    new Vue(#logicHolder).$mount("#app");
  </script>
</html>`

export default function (vueCode) {
  const { template, script, styles, customBlocks } = parseComponent(vueCode);

  let newScript = script.content.replace(/\s*export default\s*/, "");

  let output = outputVue2Template;

  output = output.replace("#templateHolder", template.content);
  output = output.replace("#logicHolder", newScript);
  output = output.replace("#styleTemplate", styles[0].content);

  return output;
}

