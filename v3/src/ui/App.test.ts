// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import ElementPlus from 'element-plus';
import App from './App.vue';
import { installBuiltinSpecs } from '../core/registry';
import { useEditorStore } from '../store/editor';

beforeEach(() => {
  installBuiltinSpecs();
  setActivePinia(createPinia());
  window.history.replaceState(null, '', '/');
});

/**
 * 冒烟测试：整棵界面挂起来不抛错，旧壳子的关键区域都在。
 * 这里不验证视觉，只验证装配关系没断。
 */
describe('App 装配', () => {
  it('挂载后旧界面的各区域都存在', () => {
    const wrapper = mount(App, { global: { plugins: [ElementPlus] } });

    expect(wrapper.find('.vcc-root').exists()).toBe(true);
    expect(wrapper.find('.base-component-container').exists()).toBe(true);
    expect(wrapper.find('.top-tools-bar').exists()).toBe(true);
    expect(wrapper.find('.render-control-panel').exists()).toBe(true);
    expect(wrapper.find('.attribute').exists()).toBe(true);
    expect(wrapper.find('.floating').exists()).toBe(true);
  });

  it('工具栏文案与旧版一致', () => {
    const wrapper = mount(App, { global: { plugins: [ElementPlus] } });
    const text = wrapper.find('.top-tools-bar').text();
    expect(text).toContain('Undo');
    expect(text).toContain('Redo');
    expect(text).toContain('Mobile Mode');
    expect(text).toContain('View Mode');
    expect(text).toContain('Inspect Components Structure');
  });

  it('未选中元素时属性面板停在视野外，选中后滑入', async () => {
    const wrapper = mount(App, { global: { plugins: [ElementPlus] } });
    const panel = wrapper.find('.attribute');
    expect(panel.classes()).not.toContain('is-open');

    const store = useEditorStore();
    store.insertAt([], 0, { kind: 'element', id: 'x', tag: 'div', props: {}, children: [] });
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.attribute').classes()).toContain('is-open');
  });

  it('切到 Mobile Mode 后画布变窄', async () => {
    const wrapper = mount(App, { global: { plugins: [ElementPlus] } });
    const mobileButton = wrapper
      .findAll('.top-tools-bar button')
      .find((button) => button.text().includes('Mobile Mode'));

    expect(mobileButton).toBeTruthy();
    await mobileButton!.trigger('click');

    expect(wrapper.find('.render-control-panel').attributes('data-width')).toBe('mobile');
  });
});
