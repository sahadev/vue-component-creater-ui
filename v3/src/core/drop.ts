/**
 * 落点计算。纯函数，输入「鼠标命中的节点路径 + 落点模式」，输出「插入到哪个容器的第几位」。
 *
 * 拖到节点上三分之一 → 插到该节点之前
 * 拖到下三分之一 → 插到该节点之后
 * 拖到中间 → 作为子节点追加
 * 节点不接受子节点时，中间自动退化为「之后」
 */
import type { NodePath, VccDocument } from './types';
import { canAcceptChildren } from './capabilities';
import { getNode } from './tree';
import { isContainer } from './types';

export type DropMode = 'into' | 'before' | 'after';

export interface DropResolution {
  parentPath: NodePath;
  index: number;
}

export function resolveDrop(
  doc: VccDocument,
  targetPath: NodePath | null,
  mode: DropMode | null,
): DropResolution {
  // 没有落点 → 追加到根末尾；落点就是根（path 为空）则要按上下沿决定插到首尾
  if (targetPath === null) {
    return { parentPath: [], index: doc.root.children.length };
  }
  if (targetPath.length === 0) {
    return mode === 'before'
      ? { parentPath: [], index: 0 }
      : { parentPath: [], index: doc.root.children.length };
  }

  const effectiveMode: DropMode =
    mode === 'into' && !canAcceptChildren(doc, targetPath) ? 'after' : (mode ?? 'into');

  if (effectiveMode === 'into') {
    const node = getNode(doc, targetPath);
    if (!isContainer(node)) return { parentPath: targetPath.slice(0, -1), index: 0 };
    return { parentPath: targetPath, index: node.children.length };
  }

  const parentPath = targetPath.slice(0, -1);
  const index = targetPath[targetPath.length - 1]! + (effectiveMode === 'after' ? 1 : 0);
  return { parentPath, index };
}

/** 根据鼠标在节点内的纵向位置判定落点模式 */
export function modeFromPointer(rect: { top: number; height: number }, clientY: number): DropMode {
  if (rect.height <= 0) return 'into';
  const ratio = (clientY - rect.top) / rect.height;
  if (ratio < 0.25) return 'before';
  if (ratio > 0.75) return 'after';
  return 'into';
}
