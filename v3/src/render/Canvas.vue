<script setup lang="ts">
import { computed, ref } from 'vue';
import { useEditorStore } from '../store/editor';
import CanvasRoot from './CanvasRoot';
import type { DropMode } from './CanvasNode';
import { findPath, getNode } from '../core/tree';
import { modeFromPointer, resolveDrop } from '../core/drop';
import { DND_MIME, hasLegacyPayload, readPayload, writePayload } from './dnd';
import { createNodeFromSpec, getSpec } from '../core/registry';
import { cloneWithFreshIds } from '../core/ids';
import type { LibraryId, NodePath } from '../core/types';

const store = useEditorStore();

const dropTargetId = ref<string | null>(null);
const dropMode = ref<DropMode | null>(null);
const isDraggingOver = ref(false);

const canvasState = computed(() => ({
  selectedId: store.selectedId,
  dropTargetId: dropTargetId.value,
  dropMode: dropMode.value,
}));

function hitTest(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof HTMLElement)) return null;
  return target.closest('[data-vcc-id]');
}

function pathOf(el: HTMLElement): NodePath | null {
  const id = el.dataset.vccId;
  return id ? findPath(store.doc, id) : null;
}

function clearDropState() {
  dropTargetId.value = null;
  dropMode.value = null;
  isDraggingOver.value = false;
}

function onDragOver(event: DragEvent) {
  // 新示例区用自定义 MIME，旧界面的活文档示例只写 text/plain，两种都要接
  const supported = event.dataTransfer?.types.includes(DND_MIME) || hasLegacyPayload(event);
  if (!supported) return;
  event.preventDefault();
  isDraggingOver.value = true;

  const el = hitTest(event.target);
  if (!el) {
    dropTargetId.value = null;
    dropMode.value = null;
    return;
  }
  dropTargetId.value = el.dataset.vccId ?? null;
  dropMode.value = modeFromPointer(el.getBoundingClientRect(), event.clientY);
}

function onDragLeave(event: DragEvent) {
  const el = hitTest(event.target);
  const related = event.relatedTarget;
  if (el && related instanceof Node && el.contains(related)) return;
  if (!el) clearDropState();
}

function onDrop(event: DragEvent) {
  event.preventDefault();

  const payload = readPayload(event);
  const el = hitTest(event.target);
  const targetPath = el ? pathOf(el) : null;
  const { parentPath, index } = resolveDrop(store.doc, targetPath, dropMode.value);
  clearDropState();

  if (!payload) return;

  if (payload.type === 'spec') {
    const spec = getSpec(payload.library as LibraryId, payload.tag);
    if (!spec) return;
    store.insertAt(parentPath, index, createNodeFromSpec(spec));
    return;
  }

  if (payload.type === 'template') {
    store.insertAt(parentPath, index, cloneWithFreshIds(payload.node));
    return;
  }

  const parentNode = getNode(store.doc, parentPath);
  store.moveNode(payload.id, parentNode.id, index);
}

/** 画布内的节点本身也是拖拽源：拖自己 = 移动 */
function onDragStart(event: DragEvent) {
  const el = hitTest(event.target);
  const id = el?.dataset.vccId;
  if (!id) return;
  writePayload(event, { type: 'node', id });
}

function onClick(event: MouseEvent) {
  const el = hitTest(event.target);
  const id = el?.dataset.vccId ?? null;
  // 旧界面在 body 上挂了「点空白取消选中」，命中元素时必须阻止冒泡，
  // 否则刚选中就被清掉（旧引擎里也是这么做的）
  if (id) event.stopPropagation();
  store.select(id);
}
</script>

<template>
  <div
    class="vcc-canvas"
    :class="{ 'is-dragging-over': isDraggingOver }"
    @click="onClick"
    @dragstart="onDragStart"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @dragend="clearDropState"
    @drop="onDrop"
  >
    <CanvasRoot :doc="store.doc" :state="canvasState" />
  </div>
</template>

<style scoped>
.vcc-canvas {
  min-height: 100%;
  position: relative;
}

.vcc-canvas.is-dragging-over {
  outline: 2px dashed var(--vcc-accent);
  outline-offset: -4px;
}

.vcc-canvas :deep([data-vcc-id]) {
  position: relative;
}

.vcc-canvas :deep([data-vcc-id]:hover) {
  outline: 1px dashed var(--vcc-border-strong);
  outline-offset: -1px;
}

.vcc-canvas :deep([data-vcc-selected='true']) {
  outline: 2px solid #13ce66 !important;
  outline-offset: -2px;
}

/* 空容器在画布上要看得见，否则拖进去的东西像丢了 */
.vcc-canvas :deep([data-vcc-id]:empty) {
  min-height: 24px;
  min-width: 40px;
  outline: 1px dashed #c0c4cc;
  outline-offset: -1px;
}

.vcc-canvas :deep([data-vcc-drop='into']) {
  outline: 2px solid #13ce66 !important;
  background: color-mix(in srgb, #13ce66 8%, transparent);
}

.vcc-canvas :deep([data-vcc-drop='before']) {
  box-shadow: inset 0 3px 0 #13ce66;
}

.vcc-canvas :deep([data-vcc-drop='after']) {
  box-shadow: inset 0 -3px 0 #13ce66;
}

.vcc-canvas :deep([data-vcc-locked='true']) {
  pointer-events: none;
  opacity: 0.6;
}

.vcc-canvas :deep(.vcc-text) {
  white-space: pre-wrap;
}
</style>
