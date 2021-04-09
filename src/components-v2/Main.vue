<template>
  <div style="diplay:flex;height:100%;">
    <div class="main-main">
      <nav class="base-component-container">
        <raw-components></raw-components>
      </nav>

      <div class="main-container">
        <!--顶部工具栏-->
        <tools-bar @onPreviewModeChange="onPreviewModeChange" @onEditModeChange="onEditModeChange" @redo="redo"
          @undo="undo" @structureVisible="structureVisible = true"></tools-bar>

        <div class="preview-container">
          <div id="render-control-panel">
            <!--这里不能放任何东西，执行时会被清空-->
          </div>
        </div>
        <attribute-input :enableRemoveButton="true" class="attribute" @save="onSaveAttr" @remove="onRemove"
          ref="attributeInput" shortcutInitMode="hand" @codeRefresh="generateVueCode" style="display:none;"
          :__rawVueInfo__="currentEditRawInfo">
        </attribute-input>
      </div>
    </div>

    <div class="copy">
      <el-tooltip effect="dark" content="查看实时代码" placement="top-start">
        <img class="round-icon" :src="iconCode" alt="" @click="codeDialogVisible = true">
      </el-tooltip>
      <el-tooltip effect="dark" content="清空当前编辑内容" placement="top-start">
        <el-popconfirm confirmButtonText="确认" cancelButtonText="点错了" icon="el-icon-info" iconColor="red"
          title="点我将清空所有编辑的内容, 确认吗?" @onConfirm="clear">
          <img slot="reference" class="round-icon" :src="iconClear" alt="">
        </el-popconfirm>
      </el-tooltip>
    </div>

    <div>
      <lc-code :rawCode="code" :codeDialogVisible.sync="codeDialogVisible">
      </lc-code>
      <code-structure @save="onSaveAttr" @remove="onRemove" ref="codeStructure" :visible.sync="structureVisible"
        @codeRefresh="generateVueCode">
      </code-structure>
    </div>

    <!-- 辅助定位线 -->
    <div class="cross-flag">
      <div class="x"></div>
    </div>
  </div>
</template>

<script>
import ElementUI from "element-ui";
import Vue from "vue";
import AntdUI from "ant-design-vue";

Vue.use(AntdUI);
Vue.use(ElementUI);

import('element-ui/lib/theme-chalk/index.css');
import('ant-design-vue/dist/antd.css');

import RawComponents from "../components/RawComponents";
import { splitInit } from "../libs/split-init";
import { MainPanelProvider } from "../libs/main-panel";
import ToolsBar from "./ToolsBar";
import { initContainerForLine } from "@/utils/lineHelper";
const keymaster = require('keymaster');

export default {
  name: "vcc_ui",
  props: [],
  components: {
    RawComponents,
    ToolsBar,
    AttributeInput: resolve => { require(["../components/AttributeInput"], resolve) },
    CodeStructure: resolve => { require(["../components/CodeStructure"], resolve) },
    "lc-code": resolve => { require(["../components/Code"], resolve) },
  },
  data() {
    return {
      currentEditRawInfo: null,
      code: "",
      codeDialogVisible: false,
      structureVisible: false,
      iconCode: require("@/assets/icon/code-working-outline.svg"),
      iconClear: require("@/assets/icon/trash-outline.svg"),

      viewMode: false
    };
  },
  watch: {
    currentEditRawInfo(newValue) {
      const attributeContainter = document.querySelector(".attribute");
      if (newValue) {
        attributeContainter.style = "right:10px;";
        this.$refs['attributeInput'].onShow();
      } else {
        attributeContainter.style = "right: calc(-300px - 20px); display:none;";
        this.$refs['attributeInput'].onHide();
      }
    }
  },
  computed: {
  },
  beforeCreate() { },
  created() {
    this.appInit();
    this.mainPanelProvider = new MainPanelProvider();
    // 方便调试追踪
    window.mainPanelProvider = this.mainPanelProvider;
  },
  beforeMount() { },
  mounted() {
    splitInit();
    this.init();
    this.initShortcut();
  },
  beforeUpdate() { },
  updated() { },
  destoryed() { },
  methods: {

    async appInit() {
      window.templateSourceMap = await(await import("../map/template.index.js")).default;
      window.dataSourceMap = await(await import("../map/data.index.js")).default;
      window.methodSourceMap = await(await import("../map/method.index.js")).default;
      window.styleSourceMap = await(await import("../map/style.index.js")).default;
    },

    initShortcut() {
      keymaster('⌘+z, ctrl+z', () => {
        this.undo();
        return false
      });
    },

    init() {
      // 先订阅事件再渲染
      this.mainPanelProvider.onRootElementMounted(rootElement => {
        document.getElementsByTagName('body')[0].addEventListener("click", () => {
          this.mainPanelProvider.clearElementSelect();
        })

        // 只针对根div做事件监听
        initContainerForLine(rootElement.firstChild, this.currentPointer);

        document.querySelector(".x").style = "display:none;";

      }).onMerged(() => {
        this.currentPointer(null);
      }).onCodeCreated(code => {
        this.code = code;
      }).onCodeStructureUpdated(codeRawVueInfo => {
        if (this.$refs.codeStructure) {
          this.$refs.codeStructure.updateCode(codeRawVueInfo);
        }
      }).onNodeDeleted(() => {
        this.currentEditRawInfo = null;
      }).onSelectElement(rawInfo => {
        this.currentEditRawInfo = rawInfo;
      }).render(this.getFakeData());
    },

    // 指向将要插入哪个元素之前
    currentPointer(ele, index) {
      this.mainPanelProvider.setDropInfo({
        target: ele,
        index,
      });
    },

    /**获取一个模拟的实体对象 */
    getFakeData() {
      return {
        template: {
          lc_id: "root",
          __children: [{
            div: {
              class: "container",
              "lc_id": "container",
              "div-lc-mark": "",
              __text__: "Hello，欢迎使用LCG，请往此区域拖拽组件",
            }
          }]
        },
      }

    },

    onPreviewModeChange(newValue) {
      const previewElem = document.querySelector("#render-control-panel");
      if (newValue) {
        previewElem.style = "width:375px;";
      } else {
        previewElem.style = "width:100%;";
      }
    },

    onEditModeChange(newValue) {
      this.mainPanelProvider.setEditMode(newValue);
    },

    renderCode() {
      this.mainPanelProvider.reRender();
    },

    clear() {
      this.mainPanelProvider.render(this.getFakeData());
    },

    onSaveAttr({ resultList, lc_id }) {
      this.mainPanelProvider.saveAttribute(resultList, lc_id);
    },
    generateVueCode() { },
    onRemove({ lc_id }) {
      this.mainPanelProvider.remove(lc_id);
    },

    redo() {
      this.mainPanelProvider.redo();
    },
    undo() {
      this.mainPanelProvider.undo();
    },
  },
  fillter: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/* =============== 以下结果追加于: 2020/3/23 上午10:03:02 =============== */
.main-main {
  width: 100%;
  height: 0;
  flex-grow: 1;
  display: flex;
  background-color: #f0f0f0;
}

.base-component-container {
  border-radius: 0px;
  background-color: white;
}

.main-container {
  margin: 0px 0px 0 0;
  display: flex;
  max-height: 100vh;
  flex-direction: column;
}

.attribute {
  width: 300px;
  border-radius: 10px;
  margin-left: 10px;
  position: absolute;
  right: calc(-300px - 20px);
  top: 10px;
  background: white;
  max-height: calc(80% - 20px);
  transition: right 0.5s;
  overflow: scroll;
  z-index: 2;
}

#render-control-panel {
  height: 100%;
  width: 100%;
  border-radius: 0px;
  overflow: scroll;
  box-sizing: border-box;
  background-color: white;
  transition: width 1s;
  padding: 10px;
}

.preview-container {
  height: 0;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  background-color: #f0f0f0;
}

.copy {
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: flex;
  line-height: 0;
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

.cross-flag {
  position: fixed;
  right: 0;
  top: 0;
  .x {
    width: 20px;
    height: 2px;
    position: fixed;
    background-color: #4dba87;
    border-radius: 1px;
    top: 0;
    display: none;
    right: 0;
    pointer-events: none;
  }
  .y {
    width: 2px;
    height: 20px;
    position: fixed;
    background-color: #4dba87;
    top: 0;
    border-radius: 1px;
    display: none;
    right: 0;
    pointer-events: none;
  }
}
</style>

<!-- 以下的样式作用于渲染容器中-->
<style lang="scss">
#render-control-panel {
  position: relative;

  [div-lc-mark] {
    border: 1px grey dashed;
    min-height: 1rem;
    border-radius: 5px;
  }

  [lc_id] {
  }

  &::after {
    content: "编辑区域";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 600;
    font-size: 40px;
    color: #d6d6d6;
    pointer-events: none;
  }
}
</style>