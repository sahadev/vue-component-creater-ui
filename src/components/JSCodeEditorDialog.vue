<template>
  <el-dialog title="JS逻辑编辑" :visible.sync="codeDialogVisible" width="70%" top="10vh" :before-close="handleClose"
    :center=true>
    <CodeEditor style="max-height: 65vh;" ref="codeEditor"></CodeEditor>

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
      this.$emit("saveJSCode", code);
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