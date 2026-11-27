/**
 * 旧结构 ↔ 新文档模型的适配层。
 *
 * 旧 UI 的拖拽源、属性面板、结构树全部用「旧结构」工作，形状是：
 *   { div: { class: 'x', lc_id: 'abc', __children: [ ... ], __text__: 'hi' } }
 * 即「一个对象只有一个键，键是标签名，值是属性对象」。
 *
 * 新引擎用判别联合的 SceneNode。两边在这一层转换，旧界面组件一行不用改。
 */
import type { ElementNode, LibraryId, PropRecord, PropValue, SceneNode } from '../core/types';
import { newNodeId } from '../core/ids';

/** 旧结构里不属于真实属性的内部键 */
const INTERNAL_KEYS = new Set([
  'lc_id',
  'lc-mark',
  'div-lc-mark',
  'lc-component-name',
  '__children',
  '__text__',
  '__key__',
]);

export type LegacyRawInfo = Record<string, Record<string, unknown>>;
export type LegacyStructure = Record<string, unknown>;

/** 旧结构里这个标签属于哪个库 */
export function libraryOfTag(tag: string): LibraryId {
  if (tag.startsWith('el-')) return 'element-plus';
  if (tag.startsWith('van-')) return 'vant';
  if (tag.startsWith('a-')) return 'ant-design-vue';
  return 'html';
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** 值要能进文档模型：函数、undefined 一律丢弃 */
function toPropValue(value: unknown): PropValue | undefined {
  if (value === undefined || value === null) return null;
  const type = typeof value;
  if (type === 'string' || type === 'number' || type === 'boolean') {
    return value as PropValue;
  }
  if (Array.isArray(value)) {
    return value.map((item) => toPropValue(item) ?? null) as PropValue;
  }
  if (isPlainObject(value)) {
    const out: Record<string, PropValue> = {};
    for (const [key, item] of Object.entries(value)) {
      const converted = toPropValue(item);
      if (converted !== undefined) out[key] = converted;
    }
    return out;
  }
  return undefined;
}

function propsFromOld(attrs: Record<string, unknown>): PropRecord {
  const props: PropRecord = {};
  for (const [key, value] of Object.entries(attrs)) {
    if (INTERNAL_KEYS.has(key)) continue;
    const converted = toPropValue(value);
    if (converted !== undefined) props[key] = converted;
  }
  return props;
}

function textNode(text: string): SceneNode {
  return { kind: 'text', id: newNodeId(), text };
}

/** 旧结构的一个「单键对象」→ SceneNode */
export function legacyNodeToScene(raw: unknown): SceneNode | null {
  if (!isPlainObject(raw)) return null;
  const keys = Object.keys(raw);
  if (keys.length === 0) return null;

  const tag = keys[0]!;
  const attrs = raw[tag];
  if (!isPlainObject(attrs)) {
    // `__text__: 'xx'` 这种裸文本条目
    return null;
  }

  const children: SceneNode[] = [];
  const rawChildren = attrs['__children'];
  if (Array.isArray(rawChildren)) {
    for (const child of rawChildren) {
      const converted = legacyNodeToScene(child);
      if (converted) children.push(converted);
    }
  }

  const text = attrs['__text__'];
  if (typeof text === 'string' && text.trim() !== '') {
    children.push(textNode(text));
  }

  const props = propsFromOld(attrs);
  const oldId = typeof attrs['lc_id'] === 'string' ? attrs['lc_id'] : newNodeId();
  const library = libraryOfTag(tag);

  if (library === 'html') {
    return { kind: 'element', id: oldId, tag, props, children };
  }
  return { kind: 'component', id: oldId, library, tag, props, children };
}

/**
 * 旧结构里有一层特例：顶层 template 直接是「属性对象」本身，
 * 没有包成 `{ div: {...} }`，例如
 *   { template: { lc_id: 'root', __children: [{ div: {...} }] } }
 * 这种要补一个 div 壳。
 */
function isBareAttrsObject(value: unknown): boolean {
  if (!isPlainObject(value)) return false;
  return '__children' in value || 'lc_id' in value || '__text__' in value;
}

/** 旧 codeStructure（顶层包了一层 template）→ 新文档根节点 */
export function legacyStructureToRoot(structure: LegacyStructure): ElementNode | null {
  const template = (structure as { template?: unknown }).template ?? structure;
  const normalized = isBareAttrsObject(template) ? { div: template as Record<string, unknown> } : template;
  const root = legacyNodeToScene(normalized);
  if (!root || root.kind !== 'element') return null;
  return root;
}

/** SceneNode → 旧结构，供属性面板和结构树使用 */
export function sceneToLegacy(node: SceneNode): LegacyRawInfo {
  if (node.kind === 'text') {
    return { '#text': { __text__: node.text, lc_id: node.id } };
  }

  const attrs: Record<string, unknown> = {
    ...(node.props as Record<string, unknown>),
    lc_id: node.id,
  };

  const childNodes = node.children.filter((child) => child.kind !== 'text');
  const texts = node.children
    .filter((child): child is Extract<SceneNode, { kind: 'text' }> => child.kind === 'text')
    .map((child) => child.text);

  if (childNodes.length > 0) {
    attrs['__children'] = childNodes.map((child) => sceneToLegacy(child));
  } else {
    attrs['__children'] = [];
  }

  if (texts.length > 0) {
    attrs['__text__'] = texts.join('');
  }

  if (node.kind === 'component') {
    attrs['lc-mark'] = '';
  }

  return { [node.tag]: attrs };
}

/** 整棵文档 → 旧 codeStructure */
export function rootToLegacyStructure(root: ElementNode): LegacyStructure {
  return { template: sceneToLegacy(root) };
}

/** 取节点在旧结构里的 tag */
export function legacyTagOf(raw: LegacyRawInfo): string {
  return Object.keys(raw)[0] ?? 'div';
}

/** 取旧结构里的 lc_id */
export function legacyIdOf(raw: LegacyRawInfo): string | null {
  const tag = legacyTagOf(raw);
  const attrs = raw[tag];
  if (!isPlainObject(attrs)) return null;
  const id = attrs['lc_id'];
  return typeof id === 'string' ? id : null;
}
