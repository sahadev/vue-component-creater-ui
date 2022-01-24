<template>
  <el-dialog title="JS逻辑编辑" v-model="codeDialogVisible" width="70%" top="10vh" :before-close="handleClose"
    :center=true>
    <CodeEditor style="max-height: 65vh;" ref="codeEditor" :initCode="code" mode="text/javascript"></CodeEditor>

    <div style="padding: 10px; display:flex;justify-content: flex-end;align-items: center;">
      <div>
        <el-button type="primary" @click="onSave">确认修改</el-button>
        <div v-if="error" style="color: red; font-size:12px; margin-top:5px;">请检查语法错误：{{error}}</div>
      </div>

      <div style="margin-left: 5px;">
        <el-link href="https://vcc.sahadev.tech/doc/#/improve/logic?id=%e9%80%bb%e8%be%91%e6%a8%a1%e6%9d%bf"
          target="_blank" icon="el-icon-question">帮助与说明</el-link>
        <div style="color: #6c6c6c; font-size:12px; margin-top:5px;">Tips: 建议看一下使用说明</div>
      </div>
    </div>
  </el-dialog>

</template>

<script>
import dedent from 'dedent'
import CodeEditor from './CodeEditor.vue'

import prettier from "prettier/standalone";
import babel from "prettier/parser-babel";

const example = dedent`
  /**
   *  以下代码中的方法会被注入到最终的代码中，如果命名与源代码有相同的，则会替换源代码
   *  内部集成了axios，开发者可以直接通过axios发起网络请求，不过接口需要允许跨域。
   *  可以通过https://apis.sahadev.tech/exchange?url=的方式访问实际地址可以解决跨域问题。
   *  axios官方文档：https://www.npmjs.com/package/axios
   */
  {
      data() {
        return {

        };
      },
      watch: {

      },

      computed: {

      },

      methods: {
        request(){
          axios.get('https://apis.sahadev.tech/exchange?url=https://www.baidu.com').then(res => console.info(res), err => console.error(err));
        }
      },
  };
      `

export default {
  props: ['codeDialogVisible'],
  emits: ['saveJSCode', 'update:codeDialogVisible'],
  components: {
    CodeEditor
  },

  data() {
    return {
      error: '',
      code: example,
      example: `${example}`
    };
  },
  beforeCreate() { },
  created() { },
  beforeMount() { },
  mounted() { },
  beforeUpdate() { },
  updated() { },
  destoryed() { },
  methods: {
    updateLogicCode(newCode) {
      if (newCode) {
        const pre = "const a = ";
        this.code = prettier.format(pre + newCode, {
          plugins: [babel],
        }).replace(pre, "");
      }
    },
    handleClose() {
      this.$emit("update:codeDialogVisible", false);
    },
    onSave() {
      const code = this.$refs.codeEditor.getEditorCode();
      // 去掉注释
      const temp = code.replace(/.+\*\/\s*/gs, "").replace(/\s+/g, "");
      try {
        // 转换为对象
        const JSCodeInfo = eval(`(function(){return ${temp}})()`);
        this.$emit("saveJSCode", {
          JSCodeInfo,
          JSCode: temp
        });
        this.handleClose();
        this.error = '';
      } catch (error) {
        console.warn(error);
        this.error = error;
      }
    }
  },
  watch: {
  },
  computed: {
  },
  fillter: {},
};
</script>

<style scoped>
/*  在此自动生成 */

:v-deep(.el-dialog__body) {
  padding: 0 30px !important;
}
</style>