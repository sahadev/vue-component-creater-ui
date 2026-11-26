import { h, resolveDynamicComponent, type Component, type VNode } from 'vue';
import type { SceneNode } from '../core/types';
import { toCanvasProps } from './canvas-props';

export interface CanvasRenderState {
  selectedId: string | null;
  dropTargetId: string | null;
  dropMode: DropMode | null;
}

export type DropMode = 'into' | 'before' | 'after';

/**
 * 结构 → VNode。整个画布就是这一层递归，没有代码文本、没有 eval、没有二次挂载。
 */
export function renderCanvasNode(node: SceneNode, state: CanvasRenderState): VNode {
  const marks: Record<string, unknown> = { 'data-vcc-id': node.id };

  if (state.selectedId === node.id) marks['data-vcc-selected'] = 'true';
  if (node.meta?.locked) marks['data-vcc-locked'] = 'true';
  if (state.dropTargetId === node.id && state.dropMode) {
    marks['data-vcc-drop'] = state.dropMode;
  }

  if (node.kind === 'text') {
    // 文本不参与命中测试：点它应该选中父节点，文本内容在属性面板里以 __text__ 编辑，
    // 与旧版语义一致（旧版把文本存在父节点的 __text__ 属性上）。
    return h('span', { class: 'vcc-text' }, node.text);
  }

  const children = node.children.map((child) => renderCanvasNode(child, state));
  // 注意：h() 收到字符串 tag 时只会创建原生元素，不会去查已注册组件。
  // 必须走 resolveDynamicComponent，否则所有组件库组件都会退化成未知自定义元素。
  const component = (resolveDynamicComponent(node.tag) ?? node.tag) as string | Component;
  const props = { ...toCanvasProps(node), ...marks };

  // 原生元素吃 VNode 数组；组件必须吃 slots 对象，否则数组会被当成 slot 的值。
  if (typeof component === 'string') {
    return h(component, props, children.length > 0 ? children : undefined);
  }
  return h(component, props, children.length > 0 ? { default: () => children } : undefined);
}
