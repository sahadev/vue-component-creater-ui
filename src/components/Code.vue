<template>
  <el-dialog title="代码预览" v-model="codeDialogVisible" width="70%" top="10vh" :before-close="handleClose" :center=true>
    <pre style="max-height: 60vh;">
    <code v-html="formatCode"></code>
    </pre>
    <div>
      <div style="color: #666; font-size: 12px;text-align">使用代码前请确认相应的组件库已集成至项目</div>
    </div>
    <template v-slot:footer>
      <span>
        <el-tooltip effect="dark" content="拷贝" placement="left">
          <img class="round-icon" :src="iconCopy" alt="" @click="copyCheck">
        </el-tooltip>
        <el-tooltip effect="dark" content="下载" placement="right">
          <img class="round-icon" :src="iconDownload" alt="" @click="download">
        </el-tooltip>
      </span>
    </template>
  </el-dialog>

</template>

<script>
import './prism.css'
import Prism from "prismjs";
import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";
import copy from 'copy-to-clipboard';
import { saveAs } from "file-saver";

export default {
  props: ['rawCode', 'codeDialogVisible'],

  data() {
    return {
      // 在此自动生成

      iconCopy: ("https://static.imonkey.xueersi.com/download/vcc-resource/icon/copy-outline.svg"),
      iconDownload: ("https://static.imonkey.xueersi.com/download/vcc-resource/icon/code-download-outline.svg"),
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
    copyCheck() {
      this.copy();
    },
    copy() {
      if (copy(this.prettyCode)) {
        this.$message.success("代码已复制到剪贴板");
      } else {
        this.$message.error("代码复制有点问题?");
      }
    },
    download() {
      let blob = new Blob([this.prettyCode], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, "VueComponent.vue");
    },

  },
  watch: {
    codeDialogVisible(newValue) {
      if (newValue) {

      } else {

      }
    }
  },
  computed: {
    prettyCode() {
      try {
        return prettier.format(this.rawCode, {
          parser: "html",
          plugins: [parserHtml],
          vueIndentScriptAndStyle: true,
        });
      } catch (error) {
        return this.rawCode;
      }

    },

    formatCode() {
      return Prism.highlight(this.prettyCode, Prism.languages.markup, "html");
    }
  },
  fillter: {},
};
</script>

<style scoped>
/*  在此自动生成 */

::v-deep .el-dialog__body {
  padding: 0 30px !important;
}

.round-icon {
  background: #4dba87;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  padding: 10px;
  margin-left: 10px;
  box-sizing: border-box;
}
</style>