<script setup lang="ts">
import { useEditorStore } from '../store/editor';
import { createEmptyDocument } from '../core/document';

const emit = defineEmits<{
  (event: 'openVue'): void;
  (event: 'openJs'): void;
  (event: 'openCode'): void;
}>();

const store = useEditorStore();

function clear() {
  store.reset(createEmptyDocument());
}
</script>

<template>
  <div class="floating">
    <div class="tip">
      <div class="tip__title">遇到问题？</div>
      <a
        class="tip__link"
        href="https://github.com/sahadev/vue-component-creater-ui"
        target="_blank"
        rel="noreferrer"
      >
        点击我查看帮助文档
      </a>
    </div>

    <el-tooltip effect="dark" content="二次编辑 Vue 代码" placement="top-start">
      <button type="button" class="round round--text" @click="emit('openVue')">Vue</button>
    </el-tooltip>

    <el-tooltip effect="dark" content="编辑 JS 逻辑" placement="top-start">
      <button type="button" class="round round--text" @click="emit('openJs')">JS</button>
    </el-tooltip>

    <el-tooltip effect="dark" content="查看导出的代码" placement="top-start">
      <button type="button" class="round round--text" @click="emit('openCode')">&lt;/&gt;</button>
    </el-tooltip>

    <el-popconfirm title="点我将清空所有编辑的内容, 确认吗?" confirm-button-text="确认" cancel-button-text="点错了" @confirm="clear">
      <template #reference>
        <button type="button" class="round round--text round--danger" title="清空画布">×</button>
      </template>
    </el-popconfirm>
  </div>
</template>

<style scoped>
.floating {
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: flex;
  align-items: flex-start;
  z-index: 3;
}

.tip {
  width: 156px;
  padding: 8px 16px;
  box-sizing: border-box;
  background: #f4f4f5;
  border-radius: 4px;
  line-height: 14px;
}

.tip__title {
  font-size: 13px;
  color: #909399;
}

.tip__link {
  font-size: 13px;
  color: #409eff;
  text-decoration: none;
}

.tip__link:hover {
  text-decoration: underline;
}

.round {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 0;
  background: #4dba87;
  padding: 10px 0;
  margin-left: 10px;
  box-sizing: border-box;
  cursor: pointer;
  color: #fff;
}

.round--text {
  font-family: var(--vcc-font);
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: center;
}

.round:hover {
  background: #3aa876;
}

.round--danger:hover {
  background: #d93f37;
}
</style>
