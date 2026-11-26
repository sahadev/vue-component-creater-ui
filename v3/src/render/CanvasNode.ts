import { h, type VNode } from 'vue';
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
    return h('span', { ...marks, class: 'vcc-text' }, node.text);
  }

  const children = node.children.map((child) => renderCanvasNode(child, state));
  return h(
    node.tag,
    { ...toCanvasProps(node), ...marks },
    children.length > 0 ? children : undefined,
  );
}
