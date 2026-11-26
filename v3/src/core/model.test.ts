import { beforeEach, describe, expect, it } from 'vitest';
import { installBuiltinSpecs } from './registry';
import { acceptsChildren, canAcceptChildren } from './capabilities';
import { modeFromPointer, resolveDrop } from './drop';
import { encodeDocument, decodeDocument, createEmptyDocument, readStateFromUrl } from './document';
import { validateDocument, isValidDocument, DocumentInvalidError } from './validate';
import type { VccDocument } from './types';

beforeEach(() => {
  installBuiltinSpecs();
});

function makeDoc(): VccDocument {
  return {
    version: 1,
    name: 'd',
    root: {
      kind: 'element',
      id: 'root',
      tag: 'div',
      props: {},
      children: [
        { kind: 'element', id: 'box', tag: 'div', props: {}, children: [] },
        {
          kind: 'component',
          id: 'btn',
          library: 'element-plus',
          tag: 'el-button',
          props: {},
          children: [],
        },
      ],
    },
    styles: [],
  };
}

describe('capabilities', () => {
  it('元素可接子节点，el-button 不可', () => {
    const doc = makeDoc();
    expect(canAcceptChildren(doc, [0])).toBe(true);
    expect(canAcceptChildren(doc, [1])).toBe(false);
    expect(acceptsChildren(doc.root.children[1]!)).toBe(false);
  });
});

describe('resolveDrop', () => {
  it('空落点追加到根末尾', () => {
    const doc = makeDoc();
    expect(resolveDrop(doc, null, null)).toEqual({ parentPath: [], index: 2 });
  });

  it('into 落到容器内末尾', () => {
    const doc = makeDoc();
    expect(resolveDrop(doc, [0], 'into')).toEqual({ parentPath: [0], index: 0 });
  });

  it('into 落到不可接子节点的节点时退化为 after', () => {
    const doc = makeDoc();
    expect(resolveDrop(doc, [1], 'into')).toEqual({ parentPath: [], index: 2 });
  });

  it('before / after 落在同层', () => {
    const doc = makeDoc();
    expect(resolveDrop(doc, [1], 'before')).toEqual({ parentPath: [], index: 1 });
    expect(resolveDrop(doc, [1], 'after')).toEqual({ parentPath: [], index: 2 });
  });
});

describe('modeFromPointer', () => {
  const rect = { top: 100, height: 100 };
  it('上四分之一是 before，下四分之一是 after，中间是 into', () => {
    expect(modeFromPointer(rect, 110)).toBe('before');
    expect(modeFromPointer(rect, 150)).toBe('into');
    expect(modeFromPointer(rect, 195)).toBe('after');
  });
});

describe('validate', () => {
  it('接受合法文档', () => {
    expect(isValidDocument(makeDoc())).toBe(true);
  });

  it('拒绝字符串里的函数属性', () => {
    const bad = { ...makeDoc(), root: { ...makeDoc().root, props: { onClick: () => 1 } } };
    expect(() => validateDocument(bad)).toThrow(DocumentInvalidError);
  });

  it('拒绝未知节点类型', () => {
    const bad = makeDoc() as unknown as Record<string, unknown>;
    (bad.root as Record<string, unknown>).children = [{ kind: 'script', id: 'x' }];
    expect(isValidDocument(bad)).toBe(false);
  });

  it('拒绝样式值里的分号注入', () => {
    const bad = { ...makeDoc(), styles: [{ id: 's', selector: '.a', declarations: { color: 'red} body{display:none' } }] };
    expect(isValidDocument(bad)).toBe(false);
  });
});

describe('document 序列化', () => {
  it('编解码往返一致', () => {
    const original = makeDoc();
    const restored = decodeDocument(encodeDocument(original));
    expect(restored).toEqual(original);
  });

  it('坏 token 返回 null 而不是抛错', () => {
    expect(decodeDocument('not-a-doc')).toBeNull();
  });

  it('从 URL 读回稿件与宽度', () => {
    const original = makeDoc();
    const search = `?d=${encodeDocument(original)}&w=375`;
    const state = readStateFromUrl(search);
    expect(state.doc).toEqual(original);
    expect(state.viewportWidth).toBe(375);
  });

  it('空 URL 返回空状态', () => {
    expect(readStateFromUrl('')).toEqual({ doc: null, viewportWidth: null });
  });

  it('createEmptyDocument 是合法文档', () => {
    expect(isValidDocument(createEmptyDocument())).toBe(true);
  });
});
