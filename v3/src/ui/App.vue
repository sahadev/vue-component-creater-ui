<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { useEditorStore } from '../store/editor';
import Palette from './Palette.vue';
import Outline from './Outline.vue';
import Inspector from './Inspector.vue';
import Toolbar from './Toolbar.vue';
import CodePanel from './CodePanel.vue';
import Canvas from '../render/Canvas.vue';

const store = useEditorStore();
const codeVisible = ref(false);

const frameWidth = computed(() =>
  store.viewportWidth > 0 ? `${store.viewportWidth}px` : '100%',
);

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName.toLowerCase();
  return tag === 'input' || tag === 'textarea' || target.isContentEditable;
}

function onKeydown(event: KeyboardEvent) {
  const meta = event.metaKey || event.ctrlKey;

  if (meta && event.key.toLowerCase() === 'z') {
    event.preventDefault();
    if (event.shiftKey) store.redo();
    else store.undo();
    return;
  }

  if ((event.key === 'Backspace' || event.key === 'Delete') && !isTypingTarget(event.target)) {
    if (!store.selectedId) return;
    event.preventDefault();
    store.removeById(store.selectedId);
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown));
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown));
</script>

<template>
  <div class="app">
    <Toolbar :code-visible="codeVisible" @toggle-code="codeVisible = !codeVisible" />

    <div class="app__body">
      <Palette />

      <main class="app__stage">
        <div class="app__frame" :data-frame-width="frameWidth">
          <Canvas :key="`${store.viewportWidth}`" />
        </div>
      </main>

      <CodePanel v-if="codeVisible" class="app__code" />
      <Outline />
      <Inspector />
    </div>
  </div>
</template>

<style scoped>
.app {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.app__body {
  flex: 1;
  display: flex;
  min-height: 0;
}

.app__stage {
  flex: 1;
  min-width: 0;
  overflow: auto;
  padding: var(--vcc-gap-lg);
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.app__frame {
  width: 100%;
  max-width: 100%;
  background: var(--vcc-surface);
  border-radius: var(--vcc-radius);
  box-shadow: 0 1px 3px rgb(0 0 0 / 8%);
  overflow: hidden;
}

.app__frame[data-frame-width='375px'] {
  width: 375px;
  flex: 0 0 375px;
}

.app__frame[data-frame-width='768px'] {
  width: 768px;
  flex: 0 0 768px;
}

.app__code {
  width: 420px;
  flex: 0 0 420px;
  border-left: 1px solid var(--vcc-border);
}
</style>
