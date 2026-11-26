// @vitest-environment jsdom
import { describe, expect, it, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import CanvasRoot from './CanvasRoot';
import { installBuiltinSpecs } from '../core/registry';
import type { VccDocument } from '../core/types';

beforeEach(() => {
  installBuiltinSpecs();
});

function docWithButton(): VccDocument {
  return {
    version: 1,
    name: 'canvas',
    root: {
      kind: 'element',
      id: 'root',
      tag: 'div',
      props: { class: 'page' },
      children: [
        {
          kind: 'component',
          id: 'btn',
          library: 'element-plus',
          tag: 'el-button',
          props: { type: 'primary', onClick: 'save()', modelValue: 'form.name' },
          children: [{ kind: 'text', id: 'label', text: '保存' }],
        },
      ],
    },
    styles: [],
  };
}

const idleState = { selectedId: null, dropTargetId: null, dropMode: null } as const;

describe('CanvasRoot', () => {
  it('递归渲染整棵树并给每个节点打上定位标记', () => {
    const wrapper = mount(CanvasRoot, { props: { doc: docWithButton(), state: idleState } });

    const button = wrapper.find('[data-vcc-id="btn"]');
    expect(button.exists()).toBe(true);
    expect(button.attributes('data-vcc-id')).toBe('btn');
    expect(wrapper.find('[data-vcc-id="label"]').text()).toBe('保存');
    expect(wrapper.find('[data-vcc-id="root"]').exists()).toBe(true);
  });

  it('不把事件绑定和表达式值渲染到画布上', () => {
    const wrapper = mount(CanvasRoot, { props: { doc: docWithButton(), state: idleState } });
    const html = wrapper.html();
    expect(html).not.toContain('save()');
    expect(html).not.toContain('form.name');
    expect(html).toContain('primary');
  });

  it('选中与落点状态以属性形式暴露给样式层', () => {
    const wrapper = mount(CanvasRoot, {
      props: {
        doc: docWithButton(),
        state: { selectedId: 'btn', dropTargetId: 'root', dropMode: 'into' },
      },
    });

    expect(wrapper.find('[data-vcc-id="btn"]').attributes('data-vcc-selected')).toBe('true');
    expect(wrapper.find('[data-vcc-id="root"]').attributes('data-vcc-drop')).toBe('into');
  });

  it('空容器渲染出不带子节点的元素', () => {
    const doc: VccDocument = {
      version: 1,
      name: 'empty',
      root: { kind: 'element', id: 'root', tag: 'div', props: {}, children: [] },
      styles: [],
    };
    const wrapper = mount(CanvasRoot, { props: { doc, state: idleState } });
    expect(wrapper.find('[data-vcc-id="root"]').element.children.length).toBe(0);
  });
});
