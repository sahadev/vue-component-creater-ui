import { defineComponent, type PropType } from 'vue';
import type { VccDocument } from '../core/types';
import { renderCanvasNode, type CanvasRenderState } from './CanvasNode';

/**
 * 画布根。纯渲染组件：给一份文档 + 交互状态，返回 VNode 树。
 * 不持有状态、不碰 DOM。
 */
export const CanvasRoot = defineComponent({
  name: 'CanvasRoot',
  props: {
    doc: { type: Object as PropType<VccDocument>, required: true },
    state: { type: Object as PropType<CanvasRenderState>, required: true },
  },
  setup(props) {
    return () => renderCanvasNode(props.doc.root, props.state);
  },
});

export default CanvasRoot;
