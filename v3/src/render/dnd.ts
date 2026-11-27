/**
 * 拖拽协议。
 *
 * 拖拽时 dataTransfer 里只放「来源描述」：
 *  - 新建组件：{ type: 'spec', library, tag }
 *  - 从示例区拖入：{ type: 'template', node }（节点模板，落点换新 id）
 *  - 画布内移动：{ type: 'node', id }
 */
import type { SceneNode } from '../core/types';
import { legacyNodeToScene } from '../legacy/adapter';

/** 旧示例区拖拽时用的分隔符 */
export const LEGACY_SPLIT = '@#$!';

export const DND_MIME = 'application/x-vcc';

export type DragPayload =
  | { type: 'spec'; library: string; tag: string }
  | { type: 'template'; node: SceneNode }
  | { type: 'node'; id: string };

export function writePayload(event: DragEvent, payload: DragPayload): void {
  if (!event.dataTransfer) return;
  event.dataTransfer.setData(DND_MIME, JSON.stringify(payload));
  event.dataTransfer.effectAllowed = 'copyMove';
}

/**
 * 旧界面（legacy/rawComponents 那套活文档示例）拖拽时只写 text/plain，
 * 格式是 `tag@#$!text@#$!0@#$!style@#$!<结构JSON>`，第 5 段才是结构。
 */
export function readLegacyPayload(event: DragEvent): DragPayload | null {
  const plain = event.dataTransfer?.getData('text/plain');
  if (!plain || !plain.includes(LEGACY_SPLIT)) return null;
  const parts = plain.split(LEGACY_SPLIT);
  const structure = parts[4];
  if (!structure) return null;
  try {
    const node = legacyNodeToScene(JSON.parse(structure));
    return node ? { type: 'template', node } : null;
  } catch {
    return null;
  }
}

export function hasLegacyPayload(event: DragEvent): boolean {
  return event.dataTransfer?.types.includes('text/plain') ?? false;
}

export function readPayload(event: DragEvent): DragPayload | null {
  const legacy = readLegacyPayload(event);
  if (legacy) return legacy;

  const raw = event.dataTransfer?.getData(DND_MIME);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed?.type === 'spec' && typeof parsed.library === 'string' && typeof parsed.tag === 'string') {
      return { type: 'spec', library: parsed.library, tag: parsed.tag };
    }
    if (parsed?.type === 'template' && parsed.node) {
      return { type: 'template', node: parsed.node as SceneNode };
    }
    if (parsed?.type === 'node' && typeof parsed.id === 'string') {
      return { type: 'node', id: parsed.id };
    }
    return null;
  } catch {
    return null;
  }
}
