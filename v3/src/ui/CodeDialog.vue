<script setup lang="ts">
import { computed, ref } from 'vue';
import { useEditorStore } from '../store/editor';
import { generateSfc } from '../core/codegen/sfc';

const props = defineProps<{ visible: boolean }>();
const emit = defineEmits<{ (event: 'update:visible', value: boolean): void }>();

const store = useEditorStore();
const copyState = ref('复制');

const code = computed(() => generateSfc(store.doc, { script: store.doc.script }));

const open = computed({
  get: () => props.visible,
  set: (value: boolean) => emit('update:visible', value),
});

async function copy() {
  try {
    await navigator.clipboard.writeText(code.value);
    copyState.value = '已复制';
  } catch {
    copyState.value = '复制失败';
  }
  setTimeout(() => {
    copyState.value = '复制';
  }, 1500);
}

function download() {
  const blob = new Blob([code.value], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${store.doc.name || 'component'}.vue`;
  anchor.click();
  URL.revokeObjectURL(url);
}
</script>

<template>
  <el-dialog v-model="open" title="导出的 Vue 组件代码" width="70%" top="6vh">
    <div class="code-dialog__actions">
      <el-button size="small" @click="copy">{{ copyState }}</el-button>
      <el-button size="small" type="primary" @click="download">下载 .vue</el-button>
    </div>
    <pre class="code-dialog__body"><code>{{ code }}</code></pre>
  </el-dialog>
</template>

<style scoped>
.code-dialog__actions {
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  padding-bottom: var(--vcc-gap);
}

.code-dialog__body {
  margin: 0;
  max-height: 60vh;
  overflow: auto;
  background: #f7f8fa;
  border-radius: var(--vcc-radius-sm);
  padding: var(--vcc-gap-lg);
  font-family: var(--vcc-mono);
  font-size: 12px;
  line-height: 1.6;
  white-space: pre;
}
</style>
