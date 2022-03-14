<template>
  <el-dialog title="代码预览" v-model="codeDialogVisible" width="70%" top="10vh" :before-close="handleClose" :center=true>
    <!-- 这里加v-if是因为CodeEditor内部不支持watch数据监测 -->
    <CodeEditor v-if="codeDialogVisible" style="max-height: 55vh;" ref="codeEditor" :initCode="outputCode"
      mode="text/html"></CodeEditor>
    <div style="color: #666; font-size: 12px; text-align:center; margin: 5px;">使用代码前请确认相应的组件库已集成至项目</div>
    <div style="text-align:left;">
      <el-row>
        <el-col :span="6">
          输出形式：
          <el-radio-group v-model="outputMode" style="display: flex; flex-direction: column;">
            <el-radio label="vue">Vue</el-radio>
            <el-radio label="html">单页Html</el-radio>
          </el-radio-group>
        </el-col>

        <el-col :span="6" v-if="outputMode === 'html'">
          选择所使用的组件库：
          <el-checkbox-group v-model="checkList" style="display: flex; flex-direction: column;">
            <el-checkbox label="ele">Element UI</el-checkbox>
            <el-checkbox label="antd">Ant Design</el-checkbox>
            <el-checkbox label="vant">Vant</el-checkbox>
          </el-checkbox-group>
        </el-col>
        <el-col :span="10" style="display: flex; flex-direction: column;">
          代码获取方式：
          <div style="margin-top: 10px;">
            <el-tooltip effect="dark" content="拷贝" placement="left">
              <img class="round-icon" :src="iconCopy" alt="" @click="copyCheck">
            </el-tooltip>
            <el-tooltip effect="dark" content="下载" placement="right">
              <img class="round-icon" :src="iconDownload" alt="" @click="download">
            </el-tooltip>
          </div>
          <div style="margin-top: 10px;" v-if="outputMode === 'html'">
            <el-input v-model="fileName" placeholder="部署文件名" style="width: 150px; margin-right: 10px;" size="small"></el-input>
            <el-button size="small" type="danger" :loading="loading" @click="release">
              一键部署至VCC静态页面托管服务</el-button>
            <div v-if="accessUrl">部署成功：<a :href="accessUrl" target="_blank">{{accessUrl}}</a></div>
          </div>
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
import { createUniqueId } from '@/utils/common';

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
      loading: false,
      accessUrl: '',
      fileName: '',
      checkList: ['ele']
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
    release() {
      this.loading = true;
      axios.post('https://apis.sahadev.tech/v1/file/upload', { "id": `index${this.fileName ? this.fileName : createUniqueId()}`, "content": this.singleIndex }).then(res => {
        this.accessUrl = res.data.data;
        this.loading = false;
      }).catch(err => {
        this.loading = false;
        this.$message.error('发布失败，可能服务暂时不可用.');
      });
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