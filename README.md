# lcg-vcc介绍

vcc是Low Code Generator中独立的Vue组件代码编辑器。可以独立运行。

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