<template>
  <el-drawer v-model="drawer" :with-header="false" size="70%" direction="btt">
    <div class="cs-container">

      <div class="center">组件结构检视图
        <br>
        <span style="font-size:12px;">Components
          Structure</span>
      </div>

      <el-row :gutter="20" style="height:0px;flex-grow:1;">
        <el-col :span="16" style="height: 100%;">
          <div style="overflow: scroll;height:100%; margin: 0 20px;padding: 10px;">

            <nested-draggable :data="treeData" />

          </div>
        </el-col>
        <el-col :span="8">
          <attribute-input ref="attributeInput" :enableRemoveButton="true" v-if="currentEditRawInfo" @save="onSaveAttr"
            shortcutInitMode="auto" @remove="onRemove" :__rawVueInfo__="currentEditRawInfo">
          </attribute-input>
        </el-col>
      </el-row>
    </div>

  </el-drawer>
</template>

<script>
import { getRawComponentContent } from "@/utils/common";
import nestedDraggable from './nested.vue'
import { defineAsyncComponent } from 'vue'
import { store as _store } from "@/libs/store.js";

export default {
  props: ['visible', 'initStructure'],
  emits: ['onLevelChange', 'remove', 'save', 'update:visible', 'reRender'],
  components: {
    AttributeInput: defineAsyncComponent(() => import("@/components/AttributeInput.vue")),
    nestedDraggable
  },

  data() {
    return {
      // 在此自动生成
      treeData: [],
    };
  },
  beforeCreate() { },
  created() { },
  beforeMount() { },
  mounted() {
    this.updateCode(this.initStructure);
  },
  beforeUpdate() { },
  updated() { },
  destoryed() { },
  methods: {

    onNodeClick(nodeInfo) {
      this.currentEditRawInfo = nodeInfo.rawInfo;
    },

    onRemove({ lc_id }) {
      this.$emit("remove", { lc_id });
      // 为了降低复杂性，这里先不做删除失败的处理
      this.currentEditRawInfo = null;
    },
    onSaveAttr(resultList) {
      this.$emit("save", resultList);
    },

    updateCode(codeRawInfo) {
      if (codeRawInfo) {
        this._codeRawInfo = codeRawInfo;
        const content = getRawComponentContent(codeRawInfo);
        const children = content.__children;
        this.treeData = children;
      }
    },

  },
  watch: {
    renderCount() {
      // 这里利用了vuedraggable v-model的特性，它会更改对象本身的引用
      this.$emit('reRender', this._codeRawInfo);
    }
  },
  computed: {
    drawer: {
      get() {
        return this.visible;
      },
      set() {
        this.$emit('update:visible', false);
      }
    },

    renderCount() {
      return _store.state.renderCount;
    },

    canInitShortcut() {
      return this.currentEditRawInfo !== null && this.drawer;
    },
    currentEditRawInfo() {
      if (_store.state.currentEditComp) {
        const vccData = _store.state.currentEditComp.vccData;
        return window.tree[vccData.lc_id];
      } else {
        return null;
      }
    }
  },
  fillter: {},
};
</script>

<style scoped>
/*  在此自动生成 */

.center {
  padding: 20px;
  text-align: center;
}

:v-deep(.el-drawer__body) {
  height: 100%;
}

.cs-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>