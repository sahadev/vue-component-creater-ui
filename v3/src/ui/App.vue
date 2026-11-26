<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useEditorStore } from '../store/editor';
import Palette from './Palette.vue';
import Toolbar from './Toolbar.vue';
import Inspector from './Inspector.vue';
import FloatingActions from './FloatingActions.vue';
import CodeDialog from './CodeDialog.vue';
import JsDialog from './JsDialog.vue';
import StructureDrawer from './StructureDrawer.vue';
import Canvas from '../render/Canvas.vue';
import CanvasRoot from '../render/CanvasRoot';

const store = useEditorStore();

const previewMode = ref(false);
const editMode = ref(true);
const codeVisible = ref(false);
const jsVisible = ref(false);
const vueVisible = ref(false);
const structureVisible = ref(false);

watch(
  previewMode,
  (mobile) => {
    store.setViewportWidth(mobile ? 375 : 0);
  },
  { immediate: true },
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

  if (event.key === 'Escape' && !editMode.value) {
    editMode.value = true;
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
  <div class="vcc-root">
    <nav class="base-component-container">
      <Palette />
    </nav>

    <div class="main-container">
      <Toolbar
        :preview-mode="previewMode"
        :edit-mode="editMode"
        @undo="store.undo()"
        @redo="store.redo()"
        @toggle-preview="previewMode = !previewMode"
        @toggle-edit="editMode = !editMode"
        @open-structure="structureVisible = true"
      />

      <div class="preview-container">
        <div class="render-control-panel" :data-width="previewMode ? 'mobile' : 'full'">
          <Canvas />
        </div>
      </div>

      <Inspector />
    </div>

    <FloatingActions
      @open-vue="vueVisible = true"
      @open-js="jsVisible = true"
      @open-code="codeVisible = true"
    />

    <CodeDialog v-model:visible="codeVisible" />
    <JsDialog v-model:visible="jsVisible" />
    <StructureDrawer v-model:visible="structureVisible" />

    <el-dialog v-model="vueVisible" title="二次编辑 Vue 代码" width="480px">
      <p class="vcc-note">
        旧版这个入口是把粘贴进来的 Vue 代码解析回结构。新引擎里结构才是源头，这条路径要反过来做成「导入代码 →
        生成结构」，目前还没接入。
      </p>
    </el-dialog>

    <div v-if="!editMode" class="fullscreen">
      <div class="fullscreen__hint">按下 ESC 退出预览模式</div>
      <div class="fullscreen__canvas">
        <CanvasRoot :doc="store.doc" :state="{ selectedId: null, dropTargetId: null, dropMode: null }" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.vcc-root {
  display: flex;
  height: 100%;
  background: #f0f0f0;
  overflow: hidden;
}

.base-component-container {
  flex: 0 0 700px;
  background: white;
  border-right: 1px solid #f0f0f0;
}

.main-container {
  position: relative;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
}

.preview-container {
  flex: 1;
  min-height: 0;
  display: flex;
  justify-content: center;
  background: #f0f0f0;
}

.render-control-panel {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: #f5f5f5;
  padding: 10px;
  transition: width 1s;
}

.render-control-panel[data-width='mobile'] {
  width: 375px;
  background-color: #fff;
}

/* 编辑区水印，和原版一致 */
.render-control-panel::after {
  content: '编辑区域';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 600;
  font-size: 40px;
  color: #d6d6d6;
  pointer-events: none;
}

.fullscreen {
  position: fixed;
  inset: 0;
  z-index: 4;
  background: white;
  overflow: auto;
}

.fullscreen__hint {
  margin: 20px;
  font-weight: bold;
}

.fullscreen__canvas {
  border: 1px dashed rgb(126 126 128);
  border-radius: 10px;
  margin: 20px;
  padding: 10px;
}

.vcc-note {
  line-height: 1.7;
  color: var(--vcc-text-weak);
  margin: 0;
}
</style>
