/**
 * 编辑器状态。文档是唯一真相，且只在这一处被修改。
 *
 * 撤销栈保存文档快照——因为树更新是不可变的，快照之间共享未改动部分，
 * 不需要深拷贝。之前那套「每次改动全量深拷贝 + cloneNode 替换 DOM」的代价没有了。
 */
import { defineStore } from 'pinia';
import { computed, ref, shallowRef } from 'vue';
import type { NodePath, PropRecord, SceneNode, VccDocument } from '../core/types';
import { isContainer } from '../core/types';
import {
  createEmptyDocument,
  syncUrl,
} from '../core/document';
import {
  findPath,
  getNode,
  insertNode,
  moveNode as moveNodeAt,
  removeNode,
  updateNode,
  updateProps as updatePropsAt,
  updateText,
} from '../core/tree';
import { normalizeAttrs } from '../core/attrs';

const HISTORY_LIMIT = 100;

export const useEditorStore = defineStore('editor', () => {
  const doc = shallowRef<VccDocument>(createEmptyDocument());
  const selectedId = ref<string | null>(null);
  const viewportWidth = ref(375);
  const hoverId = ref<string | null>(null);

  const undoStack = shallowRef<VccDocument[]>([]);
  const redoStack = shallowRef<VccDocument[]>([]);

  const selectedPath = computed<NodePath | null>(() =>
    selectedId.value ? findPath(doc.value, selectedId.value) : null,
  );

  const selectedNode = computed<SceneNode | null>(() => {
    const path = selectedPath.value;
    return path ? getNode(doc.value, path) : null;
  });

  const canUndo = computed(() => undoStack.value.length > 0);
  const canRedo = computed(() => redoStack.value.length > 0);

  /** 所有修改都必须走这里，保证撤销栈和 URL 同步 */
  function commit(next: VccDocument, options: { syncUrl?: boolean } = {}) {
    if (next === doc.value) return;
    undoStack.value = [...undoStack.value, doc.value].slice(-HISTORY_LIMIT);
    redoStack.value = [];
    doc.value = next;
    if (options.syncUrl !== false) syncUrl(next, viewportWidth.value);
  }

  /** 不产生历史记录的替换，用于初始化、加载、URL 还原 */
  function reset(next: VccDocument) {
    doc.value = next;
    undoStack.value = [];
    redoStack.value = [];
    selectedId.value = null;
    syncUrl(next, viewportWidth.value);
  }

  function select(id: string | null) {
    selectedId.value = id;
  }

  function undo() {
    const previous = undoStack.value[undoStack.value.length - 1];
    if (!previous) return;
    undoStack.value = undoStack.value.slice(0, -1);
    redoStack.value = [...redoStack.value, doc.value];
    doc.value = previous;
    syncUrl(previous, viewportWidth.value);
  }

  function redo() {
    const next = redoStack.value[redoStack.value.length - 1];
    if (!next) return;
    redoStack.value = redoStack.value.slice(0, -1);
    undoStack.value = [...undoStack.value, doc.value];
    doc.value = next;
    syncUrl(next, viewportWidth.value);
  }

  function insertAt(parentPath: NodePath, index: number, node: SceneNode) {
    commit(insertNode(doc.value, parentPath, index, node));
    selectedId.value = node.id;
  }

  function appendChildOf(parentId: string, node: SceneNode) {
    const path = findPath(doc.value, parentId);
    if (!path) return;
    const parent = getNode(doc.value, path);
    if (!isContainer(parent)) return;
    insertAt(path, parent.children.length, node);
  }

  function removeById(id: string) {
    const path = findPath(doc.value, id);
    if (!path || path.length === 0) return;
    commit(removeNode(doc.value, path));
    if (selectedId.value === id) selectedId.value = null;
  }

  function moveNode(fromId: string, toParentId: string, index: number) {
    const from = findPath(doc.value, fromId);
    const toParent = findPath(doc.value, toParentId);
    if (!from || !toParent) return;
    commit(moveNodeAt(doc.value, from, toParent, index));
  }

  function updateProps(id: string, patch: PropRecord) {
    const path = findPath(doc.value, id);
    if (!path) return;
    commit(updatePropsAt(doc.value, path, patch));
  }

  /** 属性面板提交的是一整组 key=value 文本，归一化按 registry 的 schema 判定类型 */
  function applyAttrs(id: string, attrs: { key: string; value: string }[]): string[] {
    const path = findPath(doc.value, id);
    if (!path) return [];
    const node = getNode(doc.value, path);
    if (!isContainer(node)) return [];
    const context =
      node.kind === 'component'
        ? { library: node.library, tag: node.tag }
        : undefined;
    const { props, warnings } = normalizeAttrs(attrs, context);
    commit(updatePropsAt(doc.value, path, props));
    return warnings;
  }

  function setText(id: string, text: string) {
    const path = findPath(doc.value, id);
    if (!path) return;
    commit(updateText(doc.value, path, text));
  }

  function renameNode(id: string, label: string) {
    const path = findPath(doc.value, id);
    if (!path) return;
    commit(updateNode(doc.value, path, { meta: { label } }));
  }

  function setViewportWidth(width: number) {
    viewportWidth.value = width;
    syncUrl(doc.value, width);
  }

  function setDocumentName(name: string) {
    commit({ ...doc.value, name });
  }

  function setScript(script: string) {
    commit({ ...doc.value, script });
  }

  return {
    doc,
    selectedId,
    selectedPath,
    selectedNode,
    hoverId,
    viewportWidth,
    undoStack,
    redoStack,
    canUndo,
    canRedo,
    commit,
    reset,
    select,
    undo,
    redo,
    insertAt,
    appendChildOf,
    removeById,
    moveNode,
    updateProps,
    applyAttrs,
    setText,
    renameNode,
    setViewportWidth,
    setDocumentName,
    setScript,
  };
});
