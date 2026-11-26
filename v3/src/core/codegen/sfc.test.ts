import { beforeEach, describe, expect, it } from 'vitest';
import { generateSfc, normalizeEventKey, renderText, renderProps } from './sfc';
import { installBuiltinSpecs } from '../registry';
import type { VccDocument } from '../types';

beforeEach(() => {
  installBuiltinSpecs();
});

function doc(children: VccDocument['root']['children'], styles: VccDocument['styles'] = []): VccDocument {
  return {
    version: 1,
    name: 'demo',
    root: { kind: 'element', id: 'root', tag: 'div', props: { class: 'page' }, children },
    styles,
  };
}

describe('renderText', () => {
  it('转义 HTML 但保留插值', () => {
    expect(renderText('a < b {{ count }} c')).toBe('a &lt; b {{ count }} c');
  });
});

describe('normalizeEventKey', () => {
  it('onClick 归一为 @click', () => {
    expect(normalizeEventKey('onClick')).toBe('@click');
    expect(normalizeEventKey('@click')).toBe('@click');
    expect(normalizeEventKey('one')).toBeNull();
  });
});

describe('renderProps', () => {
  it('字符串当字面量，非字符串当表达式', () => {
    const pairs = renderProps('html', 'a', { href: '/x', target: '_blank' });
    expect(pairs.map((p) => `${p.key}=${p.value}`)).toEqual([
      'href="/x"',
      'target="_blank"',
    ]);
  });

  it('modelValue 生成 v-model，expr 属性生成绑定', () => {
    const pairs = renderProps('element-plus', 'el-input', { modelValue: 'form.name' });
    expect(pairs).toEqual([{ key: 'v-model', value: 'form.name' }]);
  });

  it('布尔 false 与空字符串省略', () => {
    expect(renderProps('element-plus', 'el-button', { plain: false, type: '' })).toEqual([]);
  });

  it('布尔 true 生成绑定表达式', () => {
    expect(renderProps('element-plus', 'el-button', { round: true })).toEqual([
      { key: ':round', value: 'true' },
    ]);
  });

  it('class 排在最前', () => {
    const pairs = renderProps('element-plus', 'el-button', { type: 'primary', class: 'cta' });
    expect(pairs[0]?.key).toBe('class');
  });
});

describe('generateSfc', () => {
  it('生成自闭合组件与 scoped 样式', () => {
    const code = generateSfc(
      doc(
        [
          {
            kind: 'component',
            id: 'b1',
            library: 'element-plus',
            tag: 'el-button',
            props: { type: 'primary' },
            children: [{ kind: 'text', id: 't1', text: '提交' }],
          },
        ],
        [{ id: 's1', selector: '.page', declarations: { padding: '16px' } }],
      ),
    );

    expect(code).toContain('<el-button type="primary">');
    expect(code).toContain('提交');
    expect(code).toContain('<style scoped>');
    expect(code).toContain('.page {');
    expect(code).toContain('padding: 16px;');
  });

  it('空容器输出自闭合', () => {
    const code = generateSfc(doc([{ kind: 'element', id: 'e1', tag: 'div', props: {}, children: [] }]));
    expect(code).toContain('<div />');
  });

  it('嵌套结构缩进稳定', () => {
    const code = generateSfc(
      doc([
        {
          kind: 'element',
          id: 'outer',
          tag: 'div',
          props: {},
          children: [{ kind: 'element', id: 'inner', tag: 'span', props: {}, children: [{ kind: 'text', id: 't', text: 'x' }] }],
        },
      ]),
    );
    expect(code).toContain('      <span>\n        x\n      </span>');
  });
});
