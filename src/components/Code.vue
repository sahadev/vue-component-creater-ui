<template>
  <el-dialog title="代码预览" v-model="codeDialogVisible" width="70%" top="10vh" :before-close="handleClose" :center=true>
    <!-- 这里加v-if是因为CodeEditor内部不支持watch数据监测 -->
    <CodeEditor v-if="codeDialogVisible" style="max-height: 65vh;" ref="codeEditor" :initCode="outputCode"
      mode="text/html"></CodeEditor>
    <div style="color: #666; font-size: 12px; text-align:center; margin: 5px;">使用代码前请确认相应的组件库已集成至项目</div>
    <div style="text-align:center;">
      <el-row>
        <el-col :span="12">
          输出形式：
          <el-radio-group v-model="outputMode">
            <el-radio label="vue">Vue</el-radio>
            <el-radio label="html">单页Html</el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="12">
          <el-tooltip effect="dark" content="拷贝" placement="left">
            <img class="round-icon" :src="iconCopy" alt="" @click="copyCheck">
          </el-tooltip>
          <el-tooltip effect="dark" content="下载" placement="right">
            <img class="round-icon" :src="iconDownload" alt="" @click="download">
          </el-tooltip>
        </el-col>
      </el-row>
    </div>
  </el-dialog>

</template>

<script>
import './prism.css'
import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";
import copy from 'copy-to-clipboard';
import { saveAs } from "file-saver";

import CodeEditor from './CodeEditor.vue'
import singleIndexOutput from '../libs/singleIndexOutput.js';

export default {
  props: ['rawCode', 'codeDialogVisible'],
  components: {
    CodeEditor
  },

  data() {
    return {
      // 在此自动生成
      outputMode: "vue",
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
      if (copy(this.outputCode)) {
        this.$message.success("代码已复制到剪贴板");
      } else {
        this.$message.error("代码复制有点问题?");
      }
    },
    download() {
      let blob = new Blob([this.outputCode], {
        type: "text/plain;charset=utf-8",
      });

      if (this.isVueMode) {
        saveAs(blob, "VueComponent.vue");
      } else {
        saveAs(blob, "vcc.html");
      }
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
    isVueMode() {
      return this.outputMode === 'vue';
    },
    outputCode() {
      return this.isVueMode ? this.prettyCode : this.singleIndex;
    },


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

    singleIndex() {
      const htmlCode = singleIndexOutput(this.rawCode);
      try {
        return prettier.format(htmlCode, {
          parser: "html",
          plugins: [parserHtml],
          vueIndentScriptAndStyle: true,
        });
      } catch (error) {
        return htmlCode;
      }
    }
  },
  fillter: {},
};
</script>

<style scoped>
/*  在此自动生成 */

:v-deep(.el-dialog__body) {
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