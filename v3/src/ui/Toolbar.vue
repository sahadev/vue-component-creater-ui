<script setup lang="ts">
import { computed, ref } from 'vue';
import { useEditorStore } from '../store/editor';
import { buildShareUrl } from '../core/document';

const props = defineProps<{ codeVisible: boolean }>();
const emit = defineEmits<{ (event: 'toggleCode'): void }>();

const store = useEditorStore();
const notice = ref('');

const name = computed({
  get: () => store.doc.name,
  set: (value: string) => store.setDocumentName(value),
});

const widths = [375, 768, 0] as const;

function setWidth(width: number) {
  store.setViewportWidth(width);
}

async function share() {
  const url = buildShareUrl(window.location.href, store.doc, store.viewportWidth);
  if (!url) {
    notice.value = '稿件过大，链接放不下';
    return;
  }
  try {
    await navigator.clipboard.writeText(url);
    notice.value = '分享链接已复制';
  } catch {
    notice.value = '复制失败，请手动复制地址栏';
  }
  setTimeout(() => {
    notice.value = '';
  }, 2000);
}
</script>

<template>
  <header class="toolbar">
    <div class="toolbar__group">
      <input v-model="name" class="toolbar__name" aria-label="组件名" />
      <span v-if="notice" class="toolbar__notice">{{ notice }}</span>
    </div>

    <div class="toolbar__group">
      <button
        type="button"
        class="toolbar__button"
        :disabled="!store.canUndo"
        title="撤销 (⌘Z)"
        @click="store.undo()"
      >
        撤销
      </button>
      <button
        type="button"
        class="toolbar__button"
        :disabled="!store.canRedo"
        title="重做 (⇧⌘Z)"
        @click="store.redo()"
      >
        重做
      </button>
    </div>

    <div class="toolbar__group toolbar__group--segmented">
      <button
        v-for="width in widths"
        :key="width"
        type="button"
        class="toolbar__segment"
        :class="{ 'is-active': store.viewportWidth === width }"
        @click="setWidth(width)"
      >
        {{ width === 0 ? '自适应' : `${width}px` }}
      </button>
    </div>

    <div class="toolbar__group">
      <button type="button" class="toolbar__button" @click="share">分享链接</button>
      <button type="button" class="toolbar__button" @click="emit('toggleCode')">
        {{ props.codeVisible ? '收起代码' : '查看代码' }}
      </button>
    </div>
  </header>
</template>

<style scoped>
.toolbar {
  height: var(--vcc-header-height);
  flex: 0 0 var(--vcc-header-height);
  display: flex;
  align-items: center;
  gap: var(--vcc-gap-lg);
  padding: 0 var(--vcc-gap-lg);
  background: var(--vcc-surface);
  border-bottom: 1px solid var(--vcc-border);
}

.toolbar__group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.toolbar__group--segmented {
  border: 1px solid var(--vcc-border);
  border-radius: var(--vcc-radius-sm);
  overflow: hidden;
  gap: 0;
}

.toolbar__name {
  border: 1px solid transparent;
  border-radius: var(--vcc-radius-sm);
  padding: 4px 8px;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  color: var(--vcc-text);
  width: 160px;
}

.toolbar__name:hover,
.toolbar__name:focus {
  border-color: var(--vcc-border);
  outline: none;
}

.toolbar__notice {
  font-size: 12px;
  color: var(--vcc-accent);
}

.toolbar__button {
  border: 1px solid var(--vcc-border);
  background: var(--vcc-surface);
  border-radius: var(--vcc-radius-sm);
  padding: 5px 10px;
  font-family: inherit;
  font-size: 12px;
  color: var(--vcc-text);
  cursor: pointer;
}

.toolbar__button:hover:not(:disabled) {
  border-color: var(--vcc-accent);
  color: var(--vcc-accent);
}

.toolbar__button:disabled {
  color: var(--vcc-border-strong);
  cursor: not-allowed;
}

.toolbar__segment {
  border: 0;
  background: var(--vcc-surface);
  padding: 5px 10px;
  font-family: inherit;
  font-size: 12px;
  color: var(--vcc-text-weak);
  cursor: pointer;
}

.toolbar__segment.is-active {
  background: var(--vcc-accent-weak);
  color: var(--vcc-accent);
}
</style>
