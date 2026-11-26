/**
 * 属性文本 ↔ props 对象的归一化。
 *
 * 属性面板里用户写的是纯文本（key / value 两列），
 * 类型由 registry 的 schema 决定，不由文本长相猜。
 */
import type { PropEditor } from './registry/registry';
import { getSpec } from './registry/registry';
import type { LibraryId, PropRecord, PropValue } from './types';

export interface AttrEntry {
  key: string;
  value: string;
}

export interface NormalizeResult {
  props: PropRecord;
  warnings: string[];
}

function editorOf(library: LibraryId | undefined, tag: string | undefined, key: string): PropEditor | undefined {
  if (!library || !tag) return undefined;
  return getSpec(library, tag)?.props.find((prop) => prop.key === key)?.editor;
}

export function coerceValue(editor: PropEditor | undefined, raw: string): PropValue {
  const trimmed = raw.trim();
  switch (editor) {
    case 'number': {
      const num = Number(trimmed);
      return Number.isFinite(num) ? num : 0;
    }
    case 'boolean':
      return trimmed === 'true';
    case 'expr':
      return raw;
    case 'select': {
      if (trimmed === 'true') return true;
      if (trimmed === 'false') return false;
      const num = Number(trimmed);
      return trimmed !== '' && Number.isFinite(num) ? num : raw;
    }
    default:
      return raw;
  }
}

export function normalizeAttrs(
  entries: AttrEntry[],
  context?: { library?: LibraryId; tag?: string },
): NormalizeResult {
  const props: PropRecord = {};
  const warnings: string[] = [];
  const seen = new Set<string>();

  for (const entry of entries) {
    const key = entry.key.trim();
    if (!key) {
      warnings.push('存在空属性名，已跳过');
      continue;
    }
    if (seen.has(key)) {
      warnings.push(`属性 ${key} 重复，后者覆盖前者`);
    }
    seen.add(key);
    props[key] = coerceValue(editorOf(context?.library, context?.tag, key), entry.value);
  }

  return { props, warnings };
}

/** props → 属性面板的两列文本，隐藏内部字段 */
export function attrsFromProps(props: PropRecord): AttrEntry[] {
  return Object.entries(props).map(([key, value]) => ({
    key,
    value: typeof value === 'string' ? value : JSON.stringify(value),
  }));
}

/**
 * 解析自由编辑模式的文本：每行一条 `key: value`。
 * 认第一个「: 」而不是第一个冒号，避免把 style 里的值切断。
 */
export function parseFreeFormText(text: string): AttrEntry[] {
  const entries: AttrEntry[] = [];
  for (const rawLine of text.split('\n')) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const separator = line.indexOf(':');
    if (separator === -1) {
      // 允许多个空格分隔，退而求其次
      const loose = line.split(/\s{2,}/);
      if (loose.length >= 2 && loose[0]) {
        entries.push({ key: loose[0], value: loose.slice(1).join(' ') });
      }
      continue;
    }
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    if (key) entries.push({ key, value });
  }
  return entries;
}

/** 自由编辑模式的初始文本 */
export function formatFreeFormText(props: PropRecord): string {
  return Object.entries(props)
    .map(([key, value]) => `${key}: ${typeof value === 'string' ? value : JSON.stringify(value)}`)
    .join('\n');
}
