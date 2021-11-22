<template>
  <el-dialog title="Vue二次编辑" :visible.sync="vueDialogVisible" width="70%" top="10vh" :before-close="handleClose"
    :center=true>
    <CodeEditor style="max-height: 65vh;" ref="codeEditor" :initCode="code" mode="text/html"></CodeEditor>

    <div style="text-align:center;padding: 10px;">
      <el-button type="primary" @click="compile">开始解析</el-button>
      <div style="color: #6c6c6c; font-size:12px; margin-top:5px;">Tips: 解析成功后VCC将展示解析后的效果</div>
      <div v-if="error" style="color: red; font-size:12px; margin-top:5px;">请检查语法错误：{{error}}</div>
    </div>
  </el-dialog>

</template>

<script>
import dedent from 'dedent'
import CodeEditor from './CodeEditor.vue'
import { html2Json } from '../libs/bundle-html2json-esm';
import { ergodic, findAObject } from '../utils/common';

export default {
  props: ['vueDialogVisible'],
  components: {
    CodeEditor
  },

  data() {
    return {
      error: '',
      code: dedent`
  /**
   *  请在此文本框贴入完整的Vue代码，并点击“开始解析”按钮。
   *  目前仅支持简单的Vue文件。如果代码中包含其它组件，则不会正常展示，但依旧支持二次编辑。
   */
`
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
    handleClose() {
      this.$emit("update:vueDialogVisible", false);
    },
    async compile() {
      try {
        const code = this.$refs.codeEditor.getEditorCode();
        // 去掉注释，注释的替换逻辑并不健壮，用的是贪心方式
        // const temp = code.replace(/.+\*\/\s*/gs, "");
        const temp = code;

        if (temp) {
          // 解析Vue
          const obj = await html2Json(temp);
          // 取出template结构
          const template = findAObject(obj.root.__children, 'template');

          if (template) {
            // 为每个节点增加lc_id
            ergodic(template);
            // 通知VCC渲染此结构
            this.$emit("codeParseSucess", template);
            this.handleClose();
          } else {
            this.error = 'Vue解析失败，请检查是不是完整的Vue结构';
          }
        } else {
          this.error = '请输入Vue代码';
        }
      } catch (error) {
        console.warn(error);
        this.error = error;
      }
    },
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

::v-deep .el-dialog__body {
  padding: 0 30px !important;
}
</style>