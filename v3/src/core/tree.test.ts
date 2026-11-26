import { describe, expect, it } from 'vitest';
import type { ElementNode, SceneNode, VccDocument } from './types';
import {
  findPath,
  getNode,
  insertNode,
  isAncestorPath,
  moveNode,
  removeNode,
  TreeError,
  updateProps,
  updateText,
  walk,
} from './tree';

function el(id: string, children: SceneNode[] = [], props = {}): ElementNode {
  return { kind: 'element', id, tag: 'div', props, children };
}

function text(id: string, value: string): SceneNode {
  return { kind: 'text', id, text: value };
}

function makeDoc(): VccDocument {
  return {
    version: 1,
    name: 'test',
    root: el('root', [el('a', [el('a1'), el('a2')]), el('b')]),
    styles: [],
  };
}

describe('tree', () => {
  it('按路径取节点', () => {
    const doc = makeDoc();
    expect(getNode(doc, []).id).toBe('root');
    expect(getNode(doc, [0]).id).toBe('a');
    expect(getNode(doc, [0, 1]).id).toBe('a2');
  });

  it('路径越界抛错', () => {
    const doc = makeDoc();
    expect(() => getNode(doc, [9])).toThrow(TreeError);
  });

  it('插入不改原文档', () => {
    const doc = makeDoc();
    const next = insertNode(doc, [0], 1, el('new'));
    expect(next).not.toBe(doc);
    expect(doc.root.children[0]).toMatchObject({ id: 'a' });
    expect((next.root.children[0] as ElementNode).children.map((c) => c.id)).toEqual([
      'a1',
      'new',
      'a2',
    ]);
  });

  it('插入时未改动的兄弟节点保持引用，便于撤销栈共享', () => {
    const doc = makeDoc();
    const next = insertNode(doc, [0], 0, el('new'));
    expect(next.root.children[1]).toBe(doc.root.children[1]);
  });

  it('删除节点', () => {
    const doc = makeDoc();
    const next = removeNode(doc, [0, 0]);
    expect((next.root.children[0] as ElementNode).children.map((c) => c.id)).toEqual(['a2']);
  });

  it('不能删除根', () => {
    expect(() => removeNode(makeDoc(), [])).toThrow(TreeError);
  });

  it('移动到另一个父级', () => {
    const doc = makeDoc();
    const next = moveNode(doc, [0, 0], [1], 0);
    expect((next.root.children[0] as ElementNode).children.map((c) => c.id)).toEqual(['a2']);
    expect((next.root.children[1] as ElementNode).children.map((c) => c.id)).toEqual(['a1']);
  });

  it('同一父级内前移修正下标', () => {
    const doc = makeDoc();
    const next = moveNode(doc, [0, 0], [0], 2);
    expect((next.root.children[0] as ElementNode).children.map((c) => c.id)).toEqual(['a2', 'a1']);
  });

  it('禁止移进自己的子树', () => {
    expect(() => moveNode(makeDoc(), [0], [0, 0], 0)).toThrow(TreeError);
  });

  it('更新属性与删除空属性', () => {
    const doc = makeDoc();
    const next = updateProps(doc, [0], { class: 'x', title: undefined as never });
    expect((next.root.children[0] as ElementNode).props).toEqual({ class: 'x' });
  });

  it('文本节点不可写属性', () => {
    const doc: VccDocument = { ...makeDoc(), root: el('root', [text('t', 'hi')]) };
    expect(() => updateProps(doc, [0], { a: 1 })).toThrow(TreeError);
    expect((updateText(doc, [0], 'bye').root.children[0] as never as { text: string }).text).toBe('bye');
  });

  it('findPath 与 walk 顺序一致', () => {
    const doc = makeDoc();
    expect(findPath(doc, 'a2')).toEqual([0, 1]);
    const ids: string[] = [];
    walk(doc, (node) => {
      ids.push(node.id);
    });
    expect(ids).toEqual(['root', 'a', 'a1', 'a2', 'b']);
  });

  it('祖先判断', () => {
    expect(isAncestorPath([0], [0, 1])).toBe(true);
    expect(isAncestorPath([0], [0])).toBe(false);
    expect(isAncestorPath([1], [0, 1])).toBe(false);
  });
});
