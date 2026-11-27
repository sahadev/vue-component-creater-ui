// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { html2Json } from '@/legacy/libs/bundle-html2json-esm';
import { ergodic } from '@/legacy/utils/common';
import { legacyStructureToRoot } from './adapter';
import { useEditorStore, resetEditor } from '../store/editor';
import { MainPanelProvider } from './libs/main-panel';
import { generateSfc } from '../core/codegen/sfc';
import { installBuiltinSpecs } from '../core/registry';
import type { ElementNode, SceneNode } from '../core/types';

beforeEach(() => {
  installBuiltinSpecs();
  resetEditor();
  window.history.replaceState(null, '', '/');
});

function container(node: SceneNode): ElementNode | Extract<SceneNode, { kind: 'component' }> {
  if (node.kind === 'text') throw new Error('expected container');
  return node;
}

const SFC = `
<template>
  <div class="wrapper">
    <el-button type="primary">提交</el-button>
    <span>说明文字</span>
  </div>
</template>

<script>
export default {
  name: 'Demo',
};
</script>
`;

describe('Vue 二次编辑：代码 → 结构', () => {
  it('把 SFC 里的 template 解析成可渲染的结构', async () => {
    const tree = await html2Json(SFC);
    const templateEntry = (tree.root.__children as Record<string, unknown>[]).find(
      (item) => 'template' in item,
    );
    expect(templateEntry).toBeTruthy();

    const template = templateEntry!.template as Record<string, unknown>;
    ergodic(template);

    const root = legacyStructureToRoot(template as never);
    expect(root).not.toBeNull();
    expect(root!.tag).toBe('div');
    expect(root!.props.class).toBe('wrapper');
    expect(container(root!).children).toHaveLength(2);
  });

  it('组件节点识别成 component 并保留属性', async () => {
    const tree = await html2Json(SFC);
    const templateEntry = (tree.root.__children as Record<string, unknown>[]).find(
      (item) => 'template' in item,
    );
    const template = templateEntry!.template as Record<string, unknown>;
    ergodic(template);
    const root = legacyStructureToRoot(template as never)!;

    const button = container(root).children[0]!;
    expect(button.kind).toBe('component');
    if (button.kind !== 'component') return;
    expect(button.tag).toBe('el-button');
    expect(button.library).toBe('element-plus');
    expect(button.props.type).toBe('primary');
  });

  it('ergodic 给每个节点补 lc_id，能被适配层当成节点 id', async () => {
    const tree = await html2Json(SFC);
    const templateEntry = (tree.root.__children as Record<string, unknown>[]).find(
      (item) => 'template' in item,
    );
    const template = templateEntry!.template as Record<string, unknown>;
    ergodic(template);

    const root = legacyStructureToRoot(template as never)!;
    expect(root.id).toBeTruthy();
    expect(container(root).children.every((child) => child.id)).toBe(true);
  });

  it('没有 template 的代码解析不出结构，不会抛错', async () => {
    const tree = await html2Json('<script>export default {}</script>');
    const templateEntry = (tree.root.__children as Record<string, unknown>[]).find(
      (item) => 'template' in item,
    );
    expect(templateEntry).toBeUndefined();
  });

  it('解析后的结构能渲染进画布并导出成 SFC', async () => {
    const tree = await html2Json(SFC);
    const templateEntry = (tree.root.__children as Record<string, unknown>[]).find(
      (item) => 'template' in item,
    );
    const template = templateEntry!.template as Record<string, unknown>;
    ergodic(template);

    const provider = new MainPanelProvider();
    provider.render(template as never);

    const doc = useEditorStore().doc;
    expect(doc.root.tag).toBe('div');
    expect(doc.root.children).toHaveLength(2);

    const sfc = generateSfc(doc);
    expect(sfc).toContain('<el-button type="primary">');
    expect(sfc).toContain('提交');
    provider.destroy();
  });
});

describe('JS 逻辑编辑：逻辑 → 导出', () => {
  const LOGIC = 'methods:{request(){axios.get("/x")}}';

  it('保存的逻辑会写进导出的 script', () => {
    const provider = new MainPanelProvider();
    provider.saveJSCode(LOGIC);

    const doc = useEditorStore().doc;
    expect(doc.script).toBe(LOGIC);

    const sfc = generateSfc(doc, { script: doc.script });
    expect(sfc).toContain('axios.get');
    provider.destroy();
  });

  it('VCC.vue 传进来的是去掉注释、压掉空白的原文', () => {
    const provider = new MainPanelProvider();
    // 旧界面 onSave 会先 .replace(/.+\*\/\s*/gs, "").replace(/\s+/g, "")
    provider.saveJSCode('methods:{request(){axios.get("/x")}}');
    const doc = useEditorStore().doc;
    expect(generateSfc(doc, { script: doc.script })).toContain('axios.get("/x")');
    provider.destroy();
  });
});
