import { defineComponent, type PropType } from 'vue';
import type { SceneNode } from '../core/types';
import { renderCanvasNode } from './CanvasNode';

/**
 * 示例区里的只读预览：和画布用同一套渲染函数，保证"看到的就是拖进去的"。
 * 不挂交互状态，也不带事件绑定。
 */
export const SamplePreview = defineComponent({
  name: 'SamplePreview',
  props: {
    node: { type: Object as PropType<SceneNode>, required: true },
  },
  setup(props) {
    return () =>
      renderCanvasNode(props.node, { selectedId: null, dropTargetId: null, dropMode: null });
  },
});

export default SamplePreview;
