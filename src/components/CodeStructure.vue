<template>
  <el-drawer v-model="drawer" :with-header="false" size="70%" direction="btt">
    <div class="container">

      <div style="text-algin: center;">组件结构检视图
        <br>
        <span style="font-size:12px;">Components
          Structure</span>
      </div>

      <el-row :gutter="20" style="height:0px;flex-grow:1;">
        <el-col :span="16" style="height: 100%;">
          <div style="overflow: scroll;height:100%; margin: 0 20px;padding: 10px;">

            <vue-nestable v-model="treeData" @change="onLevelChange">
              <template v-slot="{ item }">
                <vue-nestable-handle :item="item">
                  <i class="el-icon-rank icon-s"></i>
                </vue-nestable-handle>

                <span @click="onNodeClick(item)">{{ item.text }}</span>
              </template>

              <template v-slot:placeholder>
                <div><b>The editor is empty.</b></div>
              </template>
            </vue-nestable>

          </div>
        </el-col>
        <el-col :span="8">
          <attribute-input ref="attributeInput" :enableRemoveButton="true" v-if="currentEditRawInfo && drawer"
            @save="onSaveAttr" shortcutInitMode="auto" @remove="onRemove" @codeRefresh="codeRefresh"
            :__rawVueInfo__="currentEditRawInfo">
          </attribute-input>
        </el-col>
      </el-row>
    </div>

  </el-drawer>
</template>

<script>
import "./halower-tree.min.css";
import "@/assets/nestable.css"
import { isObject, getRawComponentKey, getRawComponentContent } from "@/utils/common";
import { VueNestable, VueNestableHandle } from 'vue-nestable';

export default {
  props: ['visible'],
  components: {
    AttributeInput: resolve => { require(["./AttributeInput"], resolve) },
    VueNestable,
    VueNestableHandle
  },

  data() {
    return {
      // 在此自动生成
      treeData: [],
      currentEditRawInfo: null
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
    codeRefresh() {
      this.$emit('codeRefresh');
    },
    onLevelChange(value, options) {
      this.$emit('onLevelChange', value.id, options.pathTo);
    },

    convertStructure(rawInfo) {
      const title = getRawComponentKey(rawInfo);
      const object = rawInfo[title];
      const children = [];
      if (isObject(object)) {
        for (const key in object) {
          if (object.hasOwnProperty(key)) {
            if (key === '__children') {
              const element = object[key];

              element.forEach(item => {
                const temp = this.convertStructure(item);
                temp && children.push(temp);
              })
            } else if (isObject(object[key])) {
              // 组成一个新的结构，适配只有一个子节点的数据结构
              const __obj = {};
              __obj[key] = object[key];
              const child = this.convertStructure(__obj);
              child && children.push(child);
            }
          }
        }

        return {
          text: title,
          expanded: true,
          children: children,
          rawInfo: rawInfo,
          id: getRawComponentContent(rawInfo).lc_id
        }
      } else {
        return null;
      }
    },

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
      this.treeData = [this.convertStructure(codeRawInfo)];
    },

  },
  watch: {
    canInitShortcut(newValue) {
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
    canInitShortcut() {
      return this.currentEditRawInfo !== null && this.drawer;
    }
  },
  fillter: {},
};
</script>

<style scoped>
/*  在此自动生成 */

center {
  padding: 20px;
}

::v-deep .el-drawer__body {
  height: 100%;
}

.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>