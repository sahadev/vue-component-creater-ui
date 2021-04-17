<template>
  <div class="top-tools-bar">

    <div class="edit">
      <el-tooltip class="item" effect="dark" content="ctrl + z" placement="bottom-start">
        <el-link type="primary" @click="$emit('undo')">撤销(Undo)</el-link>
      </el-tooltip>
      <el-link type="primary" @click="$emit('redo')">重做(Redo)</el-link>
    </div>

    <div style="display:inline-block;">
      <span>View Mode: </span>
      <el-switch v-model="previewMode" active-color="#13ce66" inactive-color="#13ce66"
        active-icon-class="el-icon-mobile" inactive-icon-class="el-icon-monitor" name="预览模式"
        @change="$emit('onPreviewModeChange', $event)">
      </el-switch>
    </div>

    <div style="display:inline-block;">
      <span>Edit Mode: </span>
      <el-switch v-model="editMode" active-color="#13ce66" name="编辑模式" @change="$emit('onEditModeChange', $event)">
      </el-switch>
    </div>

    <el-link :underline="false" style="margin-left: 10px;" @click="$emit('structureVisible')"><img
        style="width: 20px;vertical-align: bottom;margin-right:5px;" :src="iconTreeStructure">Inspect Components
      Structure</el-link>
  </div>
</template>

<script>
export default {
  props: [],
  components: {},
  data() {
    return {
      previewMode: false,
      editMode: true,
      iconTreeStructure: ("https://static.imonkey.xueersi.com/download/vcc-resource/icon/tree-structure.png"),
    };
  },
  watch: {},
  computed: {
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
    logout() {
      window.ssoLogin.logout()
    },
  },
  fillter: {},
};
</script>

<style scoped>
/*  在此自动生成 */

.top-tools-bar {
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 500;
  color: #606266;
  background-color: white;
  border-radius: 0px;
  align-content: center;
  border-bottom: 1px solid #f0f0f0;
  > * {
    margin-right: 5px;
  }
}

.edit {
  display: inline-block;
}
</style>