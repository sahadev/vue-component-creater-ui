import { describe, expect, it } from 'vitest';
import { parseComponent } from 'vue-template-compiler/browser';
import singleIndexOutput from '@/legacy/libs/singleIndexOutput';
import { generateSfc } from '../core/codegen/sfc';
import { createStarterDocument } from '../core/document';

describe('单页 HTML 导出', () => {
  it('parseComponent 能认出我们生成的 SFC', () => {
    const sfc = generateSfc(createStarterDocument());
    const parsed = parseComponent(sfc);
    expect(parsed).toBeTruthy();
    expect(parsed.script).toBeTruthy();
    expect(parsed.template).toBeTruthy();
  });

  it('导出单页 HTML 不抛错', () => {
    const sfc = generateSfc(createStarterDocument());
    const html = singleIndexOutput(sfc, ['ele'], true);
    expect(html).toContain('<!DOCTYPE html>');
  });
});

describe('单页 HTML 导出：内容正确性', () => {
  it('模板结构和组件都进了产物', () => {
    const doc = createStarterDocument();
    const html = singleIndexOutput(generateSfc(doc), ['ele'], true);
    expect(html).toContain('开启预览模式后');
    expect(html).toContain('element-plus');
  });

  it('带逻辑导出时逻辑在产物里', () => {
    const doc = { ...createStarterDocument(), script: '{methods:{save(){console.info(1)}}}' };
    const html = singleIndexOutput(generateSfc(doc, { script: doc.script }), ['ele'], true);
    expect(html).toContain('console.info(1)');
  });

  it('代码结构不完整时给明确报错，而不是 null.content', () => {
    expect(() => singleIndexOutput('<template><div/></template>', ['ele'], true)).toThrow(
      /template 和 script/,
    );
  });
});
