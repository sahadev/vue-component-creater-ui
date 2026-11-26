<script setup lang="ts">
import { computed, ref } from 'vue';
import { useEditorStore } from '../store/editor';
import { generateSfc } from '../core/codegen/sfc';

const store = useEditorStore();
const copyState = ref<'idle' | 'ok' | 'fail'>('idle');

const code = computed(() => generateSfc(store.doc, { script: store.doc.script }));

async function copy() {
  try {
    await navigator.clipboard.writeText(code.value);
    copyState.value = 'ok';
  } catch {
    copyState.value = 'fail';
  }
  setTimeout(() => {
    copyState.value = 'idle';
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
  <section class="code">
    <header class="code__header">
      <span class="code__title">导出的 SFC</span>
      <div class="code__actions">
        <button type="button" class="code__button" @click="copy">
          {{ copyState === 'ok' ? '已复制' : copyState === 'fail' ? '复制失败' : '复制' }}
        </button>
        <button type="button" class="code__button" @click="download">下载 .vue</button>
      </div>
    </header>
    <pre class="code__body"><code>{{ code }}</code></pre>
  </section>
</template>

<style scoped>
.code {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--vcc-surface);
}

.code__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--vcc-gap) var(--vcc-gap-lg);
  border-bottom: 1px solid var(--vcc-border);
}

.code__title {
  font-size: 12px;
  font-weight: 600;
  color: var(--vcc-text-weak);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.code__actions {
  display: flex;
  gap: 6px;
}

.code__button {
  border: 1px solid var(--vcc-border);
  background: var(--vcc-surface);
  border-radius: var(--vcc-radius-sm);
  padding: 4px 10px;
  font-family: inherit;
  font-size: 12px;
  cursor: pointer;
}

.code__button:hover {
  border-color: var(--vcc-accent);
  color: var(--vcc-accent);
}

.code__body {
  flex: 1;
  margin: 0;
  padding: var(--vcc-gap-lg);
  overflow: auto;
  font-family: var(--vcc-mono);
  font-size: 12px;
  line-height: 1.6;
  white-space: pre;
  color: var(--vcc-text);
}
</style>
