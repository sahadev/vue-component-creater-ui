import type { NodePath, SceneNode, VccDocument } from './types';
import { getNode, getParent } from './tree';
import { getSpec } from './registry/registry';
import { isContainer } from './types';

/**
 * 节点能否接受子节点。
 * 由 registry 的 acceptsChildren 决定，而不是靠标签名猜。
 */
export function acceptsChildren(node: SceneNode): boolean {
  if (node.kind === 'element') return true;
  if (node.kind === 'text') return false;
  return getSpec(node.library, node.tag)?.acceptsChildren ?? false;
}

export function canAcceptChildren(doc: VccDocument, path: NodePath): boolean {
  try {
    return acceptsChildren(getNode(doc, path));
  } catch {
    return false;
  }
}

/** 最近的、能接受子节点的祖先路径（包含自身） */
export function nearestDropParent(doc: VccDocument, path: NodePath): NodePath | null {
  if (canAcceptChildren(doc, path)) return path;
  const parent = getParent(doc, path);
  if (!parent) return null;
  return path.length > 0 ? path.slice(0, -1) : null;
}
