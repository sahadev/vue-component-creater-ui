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
    <el-alert class="floating__alert" title="遇到问题？" type="info" :closable="false">
      <a
        class="floating__link"
        href="https://github.com/sahadev/vue-component-creater-ui"
        target="_blank"
        rel="noreferrer"
      >
        点击我查看帮助文档
      </a>
    </el-alert>

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
  align-items: center;
  gap: 10px;
  z-index: 3;
}

.floating__alert {
  width: 220px;
  padding: 6px 10px;
}

.floating__link {
  font-size: 12px;
  color: #409eff;
  text-decoration: none;
}

.floating__link:hover {
  text-decoration: underline;
}

.round {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 0;
  background: #4dba87;
  padding: 0;
  box-sizing: border-box;
  cursor: pointer;
  color: #fff;
}

.round--text {
  font-family: var(--vcc-font);
  font-size: 12px;
  font-weight: 600;
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
