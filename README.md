# lcg-vcc介绍

vcc是Low Code Generator中独立的Vue组件代码编辑器。可以独立运行。

**通过它可以通过拖拽快速完成Vue组件代码骨架的搭建。详见后文视频介绍链接。** 

点击这里快速预览效果:
[https://vcc.sahadev.tech/](https://vcc.sahadev.tech/)

使用示例：
```vue
<template>
  <vcc :initCodeEntity="codeStructure" @updateCodeEntity="onCodeUpdate"></vcc>
</template>

<script>
// 以这样一段结构初始化VCC组件
const initCodeStr = '{"template":{"lc_id":"root","__children":[{"div":{"class":"container","style":"min-height: 100%; padding-bottom: 100px;","lc_id":"container","__text__":"Hello，欢迎使用LCG，请往此区域拖拽组件","__children":[{"el-button":{"lc-mark":"","type":"danger","lc_id":"COAAYXizyI","__children":[],"__text__":"危险按钮","@click":"onButtonClick","size":"small"}}]}}]}}'

export default {
  components: {
    vcc: () => import('lcg-vcc')
  },
  data() {
    return {
      codeStructure: JSON.parse(initCodeStr),
    }
  },
  mounted() {
  },
  methods: {
    onCodeUpdate(newCodeEntity) {
      // 编辑后新的代码结构
    }
  }
}
</script>
```

## 本地如何运行

首先进行安装:
```sh
npm i
```

再进行启动:
```
npm run serve
```

运行完成后，就可以访问[http://localhost:8008/](http://localhost:8008/)预览效果了.

## 使用介绍

此前在B站上录了两段视频。可以通过这两段视频简单了解如何使用它:
[【拖拽式Vue组件代码生成平台(LCG)介绍视频-哔哩哔哩】https://b23.tv/FInuZ8](https://b23.tv/FInuZ8)
[【LCG近期功能更新介绍-哔哩哔哩】https://b23.tv/SAHwVq](https://b23.tv/SAHwVq)

## 有疑问？

可以通过sahadev@foxmail.com给我发送邮件，我会及时回复的。

另外我也特别希望可以和大家一起做这个项目。这个项目目前主要面对的是前端开发者。后期可以面向后端开发者与产品与UE。
