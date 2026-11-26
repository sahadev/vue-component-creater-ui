/**
 * 组件注册表。
 *
 * 每个可拖拽的东西都必须在表里登记：标签名、归属库、可编辑属性 schema。
 * 画布渲染、属性面板、代码生成三处都只读这份元数据，不再各自维护一份清单。
 */
import type { ComponentNode, ElementNode, LibraryId, PropRecord, PropValue, SceneNode } from '../types';
import { newNodeId } from '../ids';

/** expr: 值按 Vue 表达式处理（v-model 目标、事件处理器等） */
export type PropEditor = 'text' | 'textarea' | 'number' | 'boolean' | 'select' | 'color' | 'expr';

export interface PropSchema {
  key: string;
  label: string;
  editor: PropEditor;
  default?: PropValue;
  options?: { label: string; value: PropValue }[];
}

export interface ComponentSpec {
  library: LibraryId;
  tag: string;
  name: string;
  /** 英文名，用于左栏分类项的副标题（旧版是 Button/Link/Tag 这种） */
  nameEn?: string;
  category: string;
  acceptsChildren: boolean;
  props: PropSchema[];
  /** 拖入时的初始 props，覆盖不到 schema 默认值时使用 */
  defaultProps?: PropRecord;
  /** 拖入时是否自动带一个子文本节点 */
  defaultText?: string;
  /** 拖入时自动带的子结构（表格、表单这类靠子节点才成立） */
  defaultChildren?: () => SceneNode[];
  /**
   * 能否脱离父组件单独渲染。
   * el-option 这类必须在 el-select 里，单独渲染会直接抛错，
   * 所以示例区会跳过它们。
   */
  standalone?: boolean;
}

export type SpecKey = `${LibraryId}:${string}`;

const registry = new Map<SpecKey, ComponentSpec>();

export function specKey(library: LibraryId, tag: string): SpecKey {
  return `${library}:${tag}`;
}

export function registerSpec(spec: ComponentSpec): void {
  const key = specKey(spec.library, spec.tag);
  if (registry.has(key)) throw new Error(`重复注册组件: ${key}`);
  registry.set(key, spec);
}

export function registerSpecs(specs: ComponentSpec[]): void {
  specs.forEach(registerSpec);
}

export function getSpec(library: LibraryId, tag: string): ComponentSpec | undefined {
  return registry.get(specKey(library, tag));
}

export function findSpec(node: SceneNode): ComponentSpec | undefined {
  if (node.kind !== 'component') return undefined;
  return getSpec(node.library, node.tag);
}

export function listSpecs(library?: LibraryId): ComponentSpec[] {
  const all = [...registry.values()];
  return library ? all.filter((spec) => spec.library === library) : all;
}

/** 按 category 分组，供左侧面板渲染 */
export function groupSpecsByCategory(library?: LibraryId): Map<string, ComponentSpec[]> {
  const grouped = new Map<string, ComponentSpec[]>();
  for (const spec of listSpecs(library)) {
    const bucket = grouped.get(spec.category) ?? [];
    bucket.push(spec);
    grouped.set(spec.category, bucket);
  }
  return grouped;
}

/** 由 spec 造一个新节点，不负责插入 */
export function createNodeFromSpec(spec: ComponentSpec): ComponentNode {
  const props: PropRecord = {};
  for (const prop of spec.props) {
    if (prop.default !== undefined) props[prop.key] = prop.default;
  }
  Object.assign(props, spec.defaultProps ?? {});

  const children: SceneNode[] = spec.defaultChildren
    ? spec.defaultChildren()
    : spec.defaultText
      ? [{ kind: 'text', id: newNodeId(), text: spec.defaultText }]
      : [];

  return {
    kind: 'component',
    id: newNodeId(),
    library: spec.library,
    tag: spec.tag,
    props,
    children,
  };
}

/** 造一个纯 HTML 元素节点 */
export function createElementNode(
  tag: string,
  props: PropRecord = {},
  children: SceneNode[] = [],
): ElementNode {
  return { kind: 'element', id: newNodeId(), tag, props, children };
}

export function createTextNode(text: string): SceneNode {
  return { kind: 'text', id: newNodeId(), text };
}
