<template>
  <el-dialog title="JS逻辑编辑" :visible.sync="codeDialogVisible" width="70%" top="10vh" :before-close="handleClose"
    :center=true>
    <div style="font-size:12px; margin-top:5px;">
      // 以下代码中的方法会被注入到最终的代码中，如果命名与源代码有相同的，则会替换源代码</div>
    <div style="font-size:12px; margin-top:5px;">
      // 内部集成了axios，开发者可以直接通过axios发起网络请求，不过接口需要允许跨域。</div>
    <div style="font-size:12px; margin-top:5px;">
      // axios官方文档：https://www.npmjs.com/package/axios</div>

    <CodeEditor ref="codeEditor"></CodeEditor>

    <div style="text-align:center;padding: 10px;">
      <el-button type="primary" @click="onSave">确认修改</el-button>
      <div style="color: #f5222d; font-size:12px; margin-top:5px;">Tips: 确认修改之后将会影响最终生成的代码逻辑</div>

    </div>
  </el-dialog>

</template>

<script>
import CodeEditor from './CodeEditor.vue'

export default {
  props: ['codeDialogVisible'],
  components: {
    CodeEditor
  },

  data() {
    return {
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
    // 在此自动生成
    request() {
      // 网络请求，可选
    },
    handleClose() {
      this.$emit("update:codeDialogVisible", false);
    },
    onSave() {
      const code = this.$refs.codeEditor.getEditorCode();
      const JSCodeInfo = eval(`(function(){return ${code}})()`);
      console.info(JSCodeInfo.methods.request.toString());
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

::v-deep .el-dialog__body {
  padding: 0 30px !important;
}
</style>