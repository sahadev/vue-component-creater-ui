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
