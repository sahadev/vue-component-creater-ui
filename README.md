# VCC

VCC(Vue Compontent Creator)是Low Code Generator中独立的Vue组件代码编辑器。可以独立运行。

> 当前已经升级至Vue3 + Vite。

**通过它可以通过拖拽快速完成Vue组件代码骨架的搭建。详见后文视频介绍链接。** 

> 点击这里快速预览效果：[https://vcc.sahadev.tech/](https://vcc.sahadev.tech/)

#### 使用示例
##### 示例1
直接在html中引用：
```html
<meta charset="utf-8">
<title>vcc demo</title>
<script src="https://unpkg.com/vue"></script>
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
<!-- 引入组件库 -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<!-- 必须通过这种方式引入 -->
<script src="https://static.imonkey.xueersi.com/vcc/vcc.umd.min.js"></script>


<div id="app">
  <vcc :initCodeEntity="codeStructure" @updateCodeEntity="onCodeUpdate"></vcc>
</div>

<script>
// 以这样一段结构初始化VCC组件
const initCodeStr = '{"template":{"lc_id":"root","__children":[{"div":{"class":"container","style":"min-height: 100%; padding-bottom: 100px;","lc_id":"container","__text__":"Hello，欢迎使用LCG，请往此区域拖拽组件","__children":[{"el-button":{"lc-mark":"","type":"danger","lc_id":"COAAYXizyI","__children":[],"__text__":"危险按钮","@click":"onButtonClick","size":"small"}}]}}]}}'
new Vue({
  components: {
    vcc: vcc
  },
  data() {
    return {
      codeStructure: JSON.parse(initCodeStr),
    }
  },
  methods: {
    onCodeUpdate(newCodeEntity) {
      // 编辑后新的代码结构
    }
  }
}).$mount('#app')
</script>
```

##### 示例2
在Vue文件中引用：
```vue
<template>
  <vcc :initCodeEntity="codeStructure" @updateCodeEntity="onCodeUpdate"></vcc>
</template>

<script>
// 以这样一段结构初始化VCC组件
const initCodeStr = '{"template":{"lc_id":"root","__children":[{"div":{"class":"container","style":"min-height: 100%; padding-bottom: 100px;","lc_id":"container","__text__":"Hello，欢迎使用LCG，请往此区域拖拽组件","__children":[{"el-button":{"lc-mark":"","type":"danger","lc_id":"COAAYXizyI","__children":[],"__text__":"危险按钮","@click":"onButtonClick","size":"small"}}]}}]}}'

export default {
  data() {
    return {
      codeStructure: JSON.parse(initCodeStr),
    }
  },
  methods: {
    onCodeUpdate(newCodeEntity) {
      // 编辑后新的代码结构，可以进行保存
    }
  }
}
</script>
```
注意不需要专门在components引入，而需要在index.html通过script引入（像示例1的引入方式）。这是因为VCC里面的组件采用了分包加载策略，子包依赖主包的相对路径。

另外还需要将Vue变为全局可访问的，例如：
```js
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import APP from "./App.vue";

Vue.use(ElementUI);

// 内部需要同样配置的全局Vue
self.Vue = Vue;

new Vue({
  el: "#app",
  render: (h) => h(APP),
});
 
```

注意ElementUI组件也是需要项目中安装好的。
## 本地如何运行此项目

首先进行安装:
```sh
npm i
```

再进行启动(Vite):
```
npm run vite
```

运行完成后，就可以访问[http://localhost:8008/](http://localhost:8008/)预览效果了.

## 使用介绍

此前在B站上录了两段视频。可以通过这两段视频简单了解如何使用它:
[【拖拽式Vue组件代码生成平台(LCG)介绍视频-哔哩哔哩】https://b23.tv/FInuZ8](https://b23.tv/FInuZ8)
[【LCG近期功能更新介绍-哔哩哔哩】https://b23.tv/SAHwVq](https://b23.tv/SAHwVq)

## 贡献

1. Fork 仓库
2. 创建分支 (`git checkout -b my-new-feature`)
3. 提交修改 (`git commit -am 'Add some feature'`)
4. 推送 (`git push origin my-new-feature`)
5. 创建 PR

## 欢迎 fork 和反馈

如有建议或意见，欢迎在 github [issues](https://github.com/sahadev/vue-component-creater-ui/issues) 区提问

## 协议

本仓库遵循 [MIT 协议](http://www.opensource.org/licenses/MIT)

## 有疑问？

可以通过sahadev@foxmail.com给我发送邮件，我会及时回复的。

或者加群和大家一起讨论吧：

<img width="300" src="https://static.imonkey.xueersi.com/vcc/wechat_group.jpg">

如果遇到群二维码过期的情况，可以加我微信：SAHADEV-smile，我拉你入群。加我微信时请备注VCC。

另外我也特别希望可以和大家一起做这个项目。这个项目目前主要面对的是前端开发者。后期可以面向后端开发者与产品与UE。
