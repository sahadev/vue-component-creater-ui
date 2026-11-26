/**
 * 拖拽协议。
 *
 * 拖拽时 dataTransfer 里只放「来源描述」，不放结构本体：
 *  - 新建：{ type: 'spec', library, tag }
 *  - 移动：{ type: 'node', id }
 * 落点结构在 drop 时才从文档里查。
 */
export const DND_MIME = 'application/x-vcc';

export type DragPayload =
  | { type: 'spec'; library: string; tag: string }
  | { type: 'node'; id: string };

export function writePayload(event: DragEvent, payload: DragPayload): void {
  if (!event.dataTransfer) return;
  event.dataTransfer.setData(DND_MIME, JSON.stringify(payload));
  event.dataTransfer.effectAllowed = 'copyMove';
}

export function readPayload(event: DragEvent): DragPayload | null {
  const raw = event.dataTransfer?.getData(DND_MIME);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed?.type === 'spec' && typeof parsed.library === 'string' && typeof parsed.tag === 'string') {
      return { type: 'spec', library: parsed.library, tag: parsed.tag };
    }
    if (parsed?.type === 'node' && typeof parsed.id === 'string') {
      return { type: 'node', id: parsed.id };
    }
    return null;
  } catch {
    return null;
  }
}
