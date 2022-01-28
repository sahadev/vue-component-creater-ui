<template>
  <vcc :initCodeEntity="codeInfoEntity" @updateCodeEntity="onCodeUpdate" @onLoadFinish="onLoadFinish"></vcc>
</template>

<script>
import { defineAsyncComponent } from 'vue'
// 以这样一段结构初始化VCC组件
const initCodeStr = '{"template":{"lc_id":"root","__children":[{"div":{"class":"container","style":"min-height: 100%; padding-bottom: 100px;","lc_id":"container","__text__":"Hello，欢迎使用LCG，请往此区域拖拽组件","__children":[{"div": {"__text__": "{{showText}}", "lc_id": "text"}},{"el-button":{"lc-mark":"","type":"danger","lc_id":"COAAYXizyI","__children":[],"__text__":"{{showValue}}","@click":"hello","size":"small"}}]}}]}}'

export default {
  components: {
    vcc: defineAsyncComponent(() => import('./components-v2/VCC.vue')),
  },
  data() {
    return {
      codeInfoEntity: {
        codeStructure: JSON.parse(initCodeStr),
        JSCode: `
{
  data() {
    return { 
      showValue: "开启预览模式后,点击我显示预设逻辑", 
      showText: "这里的值声明于预设JS代码" 
    };
  },
  methods: {
    hello() {
      alert("来自预设逻辑代码的问候");
    },
  },
}`
      },
    }
  },
  mounted() {
  },
  methods: {
    onCodeUpdate({ codeRawVueInfo, JSCode }) {
      // 编辑后新的代码结构
      // codeRawVueInfo为template对象表示结构
      // JSCode为显式输入的JS逻辑
    },
    onLoadFinish(){
      
    }
  }
}
</script>