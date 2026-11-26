/**
 * 文档 props → 画布渲染用的 props。
 *
 * 这里是安全边界：
 *  - expr 类型的值（v-model 目标、事件处理器）不上画布，画布永不执行用户表达式
 *  - 事件绑定整体丢弃，预览里的点击只用于选中
 */
import type { SceneNode } from '../core/types';
import { getSpec } from '../core/registry/registry';
import { normalizeEventKey } from '../core/codegen/sfc';

export function toCanvasProps(node: SceneNode): Record<string, unknown> {
  if (node.kind === 'text') return {};

  const spec = node.kind === 'component' ? getSpec(node.library, node.tag) : undefined;
  const exprKeys = new Set(
    (spec?.props ?? []).filter((prop) => prop.editor === 'expr').map((prop) => prop.key),
  );

  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(node.props)) {
    if (normalizeEventKey(key)) continue;
    if (exprKeys.has(key)) continue;
    if (key === 'modelValue') continue;
    if (key === 'style' && typeof value === 'object' && value !== null) {
      result.style = value;
      continue;
    }
    result[key] = value;
  }

  return result;
}

/** 画布上展示节点名用的角标文案 */
export function displayName(node: SceneNode): string {
  if (node.kind === 'text') return '文本';
  if (node.meta?.label) return node.meta.label;
  if (node.kind === 'element') return node.tag;
  return getSpec(node.library, node.tag)?.name ?? node.tag;
}
