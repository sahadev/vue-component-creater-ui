import { beforeEach, describe, expect, it } from 'vitest';
import {
  legacyIdOf,
  legacyNodeToScene,
  legacyStructureToRoot,
  legacyTagOf,
  libraryOfTag,
  rootToLegacyStructure,
  sceneToLegacy,
} from '../legacy/adapter';
import { installBuiltinSpecs } from '../core/registry';
import type { SceneNode } from '../core/types';

/** 测试里断言是容器节点 */
function container(node: SceneNode) {
  if (node.kind === 'text') throw new Error('expected container');
  return node;
}

beforeEach(() => {
  installBuiltinSpecs();
});

const oldButton = {
  'el-button': {
    'lc-mark': '',
    type: 'danger',
    size: 'small',
    lc_id: 'btn1',
    __children: [],
    __text__: '开启预览模式后',
  },
};

const oldTree = {
  div: {
    class: 'container',
    lc_id: 'root',
    __children: [
      { span: { lc_id: 's1', __text__: '文本一' } },
      { 'el-button': { type: 'primary', lc_id: 'b1', __children: [], __text__: '按钮' } },
    ],
  },
};

describe('libraryOfTag', () => {
  it('按前缀判定归属库', () => {
    expect(libraryOfTag('el-input')).toBe('element-plus');
    expect(libraryOfTag('van-button')).toBe('vant');
    expect(libraryOfTag('a-button')).toBe('ant-design-vue');
    expect(libraryOfTag('div')).toBe('html');
    expect(libraryOfTag('a')).toBe('html');
  });
});

describe('legacyNodeToScene', () => {
  it('组件节点转成 component，内部键不进入 props', () => {
    const node = legacyNodeToScene(oldButton)!;
    expect(node.kind).toBe('component');
    if (node.kind !== 'component') return;
    expect(node.library).toBe('element-plus');
    expect(node.tag).toBe('el-button');
    expect(node.id).toBe('btn1');
    expect(node.props).toEqual({ type: 'danger', size: 'small' });
  });

  it('__text__ 变成文本子节点', () => {
    const node = legacyNodeToScene(oldButton)!;
    expect(container(node).children).toHaveLength(1);
    expect(container(node).children[0]).toMatchObject({ kind: 'text', text: '开启预览模式后' });
  });

  it('递归转换 __children', () => {
    const node = legacyNodeToScene(oldTree)!;
    expect(container(node).children).toHaveLength(2);
    expect(container(node).children[0]).toMatchObject({ kind: 'element', tag: 'span' });
    expect(container(node).children[1]).toMatchObject({ kind: 'component', tag: 'el-button' });
  });

  it('保留 class 这类普通属性', () => {
    const node = legacyNodeToScene(oldTree)!;
    expect(node.kind === 'element' && node.props.class).toBe('container');
  });

  it('丢弃函数值', () => {
    const node = legacyNodeToScene({ div: { lc_id: 'x', onClick: () => 1, class: 'c' } })!;
    expect(node.kind === 'element' && node.props).toEqual({ class: 'c' });
  });

  it('空结构返回 null', () => {
    expect(legacyNodeToScene({})).toBeNull();
    expect(legacyNodeToScene(null)).toBeNull();
  });
});

describe('legacyStructureToRoot', () => {
  it('剥掉 template 外壳', () => {
    const root = legacyStructureToRoot({ template: oldTree })!;
    expect(root.kind).toBe('element');
    expect(root.tag).toBe('div');
    expect(root.children).toHaveLength(2);
  });
});

describe('sceneToLegacy', () => {
  it('生成旧结构，文本回到 __text__', () => {
    const node = legacyNodeToScene(oldButton)!;
    const legacy = sceneToLegacy(node);
    const attrs = legacy['el-button']!;
    expect(attrs.type).toBe('danger');
    expect(attrs.lc_id).toBe('btn1');
    expect(attrs.__text__).toBe('开启预览模式后');
    expect(legacyTagOf(legacy)).toBe('el-button');
    expect(legacyIdOf(legacy)).toBe('btn1');
  });

  it('往返转换不丢结构', () => {
    const node = legacyNodeToScene(oldTree)!;
    const back = legacyNodeToScene((rootToLegacyStructure(node as never) as { template: unknown }).template)!;
    expect(container(back).children).toHaveLength(2);
    expect((container(back).children[1] as { tag: string }).tag).toBe('el-button');
  });
});
