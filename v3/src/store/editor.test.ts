// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useEditorStore } from './editor';
import { installBuiltinSpecs } from '../core/registry';
import { createEmptyDocument, decodeDocument, DOC_QUERY_KEY } from '../core/document';
import type { ElementNode } from '../core/types';

beforeEach(() => {
  installBuiltinSpecs();
  setActivePinia(createPinia());
  window.history.replaceState(null, '', '/');
});

function firstChild(store: ReturnType<typeof useEditorStore>): ElementNode {
  return store.doc.root.children[0] as ElementNode;
}

describe('editor store', () => {
  it('插入节点后可选中并撤销', () => {
    const store = useEditorStore();
    store.insertAt([], 0, { kind: 'element', id: 'a', tag: 'div', props: {}, children: [] });

    expect(store.doc.root.children).toHaveLength(1);
    expect(store.selectedId).toBe('a');
    expect(store.canUndo).toBe(true);

    store.undo();
    expect(store.doc.root.children).toHaveLength(0);
    expect(store.canRedo).toBe(true);

    store.redo();
    expect(store.doc.root.children).toHaveLength(1);
  });

  it('新操作清空重做栈', () => {
    const store = useEditorStore();
    store.insertAt([], 0, { kind: 'element', id: 'a', tag: 'div', props: {}, children: [] });
    store.undo();
    expect(store.canRedo).toBe(true);
    store.insertAt([], 0, { kind: 'element', id: 'b', tag: 'div', props: {}, children: [] });
    expect(store.canRedo).toBe(false);
  });

  it('删除选中节点后清空选中', () => {
    const store = useEditorStore();
    store.insertAt([], 0, { kind: 'element', id: 'a', tag: 'div', props: {}, children: [] });
    store.removeById('a');
    expect(store.selectedId).toBeNull();
    expect(store.doc.root.children).toHaveLength(0);
  });

  it('移动节点', () => {
    const store = useEditorStore();
    store.insertAt([], 0, {
      kind: 'element',
      id: 'outer',
      tag: 'div',
      props: {},
      children: [{ kind: 'element', id: 'inner', tag: 'span', props: {}, children: [] }],
    });
    store.moveNode('inner', 'outer', 0);
    expect(store.doc.root.children).toHaveLength(1);
  });

  it('属性按 schema 判定类型', () => {
    const store = useEditorStore();
    store.insertAt([], 0, {
      kind: 'component',
      id: 'col',
      library: 'element-plus',
      tag: 'el-col',
      props: {},
      children: [],
    });

    const warnings = store.applyAttrs('col', [{ key: 'span', value: '12' }]);
    expect(warnings).toEqual([]);
    expect(firstChild(store).props.span).toBe(12);
  });

  it('空属性名给出警告并跳过', () => {
    const store = useEditorStore();
    store.insertAt([], 0, { kind: 'element', id: 'a', tag: 'div', props: {}, children: [] });
    const warnings = store.applyAttrs('a', [{ key: '  ', value: 'x' }]);
    expect(warnings.length).toBe(1);
    expect(firstChild(store).props).toEqual({});
  });

  it('每次提交把文档写进 URL', () => {
    const store = useEditorStore();
    store.insertAt([], 0, { kind: 'element', id: 'a', tag: 'div', props: {}, children: [] });

    const token = new URLSearchParams(window.location.search).get(DOC_QUERY_KEY);
    expect(token).toBeTruthy();
    expect(decodeDocument(token!)?.root.children).toHaveLength(1);
  });

  it('reset 清空历史并重建 URL', () => {
    const store = useEditorStore();
    store.insertAt([], 0, { kind: 'element', id: 'a', tag: 'div', props: {}, children: [] });
    const fresh = createEmptyDocument('fresh');
    store.reset(fresh);

    expect(store.canUndo).toBe(false);
    expect(store.doc.name).toBe('fresh');
    const token = new URLSearchParams(window.location.search).get(DOC_QUERY_KEY);
    expect(decodeDocument(token!)?.name).toBe('fresh');
  });
});
