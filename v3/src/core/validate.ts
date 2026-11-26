/**
 * 文档校验。
 *
 * URL、剪贴板、localStorage 都是不可信输入，进编辑器之前必须过一遍。
 * 手写校验而不是引入 zod：规则少，且需要给出精确的错误路径。
 */
import type { LibraryId, SceneNode, StyleRule, VccDocument } from './types';
import { isContainer } from './types';

const LIBRARIES: LibraryId[] = ['html', 'element-plus', 'ant-design-vue', 'vant'];
const MAX_DEPTH = 64;
const MAX_NODES = 5000;

export class DocumentInvalidError extends Error {
  constructor(
    message: string,
    readonly path: string,
  ) {
    super(`${path}: ${message}`);
    this.name = 'DocumentInvalidError';
  }
}

function fail(path: string, message: string): never {
  throw new DocumentInvalidError(message, path);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function validatePropValue(value: unknown, path: string, depth = 0): void {
  if (depth > 8) fail(path, '属性嵌套过深');
  if (value === null) return;
  const type = typeof value;
  if (type === 'string' || type === 'number' || type === 'boolean') return;
  if (Array.isArray(value)) {
    value.forEach((item, index) => validatePropValue(item, `${path}[${index}]`, depth + 1));
    return;
  }
  if (isPlainObject(value)) {
    for (const [key, item] of Object.entries(value)) {
      validatePropValue(item, `${path}.${key}`, depth + 1);
    }
    return;
  }
  fail(path, `属性值不可序列化: ${type}`);
}

let visitedCount = 0;

function validateNode(raw: unknown, path: string, depth: number): SceneNode {
  if (!isPlainObject(raw)) fail(path, '节点必须是对象');
  visitedCount += 1;
  if (visitedCount > MAX_NODES) fail(path, `节点数超过上限 ${MAX_NODES}`);
  if (depth > MAX_DEPTH) fail(path, `嵌套超过上限 ${MAX_DEPTH}`);

  const id = raw.id;
  if (typeof id !== 'string' || id.length === 0) fail(`${path}.id`, '缺少 id');

  if (raw.kind === 'text') {
    if (typeof raw.text !== 'string') fail(`${path}.text`, '文本节点缺少 text');
    return { kind: 'text', id, text: raw.text, meta: raw.meta as SceneNode['meta'] };
  }

  if (raw.kind === 'element') {
    if (typeof raw.tag !== 'string' || !/^[a-z][a-z0-9-]*$/.test(raw.tag)) {
      fail(`${path}.tag`, '非法标签名');
    }
    if (!isPlainObject(raw.props)) fail(`${path}.props`, 'props 必须是对象');
    for (const [key, value] of Object.entries(raw.props)) {
      validatePropValue(value, `${path}.props.${key}`);
    }
    if (!Array.isArray(raw.children)) fail(`${path}.children`, 'children 必须是数组');
    return {
      kind: 'element',
      id,
      tag: raw.tag,
      props: raw.props as Record<string, never>,
      children: raw.children.map((child, index) =>
        validateNode(child, `${path}.children[${index}]`, depth + 1),
      ),
      meta: raw.meta as SceneNode['meta'],
    };
  }

  if (raw.kind === 'component') {
    if (!LIBRARIES.includes(raw.library as LibraryId)) {
      fail(`${path}.library`, `未知组件库: ${String(raw.library)}`);
    }
    if (typeof raw.tag !== 'string' || raw.tag.length === 0) fail(`${path}.tag`, '缺少组件标签');
    if (!isPlainObject(raw.props)) fail(`${path}.props`, 'props 必须是对象');
    for (const [key, value] of Object.entries(raw.props)) {
      validatePropValue(value, `${path}.props.${key}`);
    }
    if (!Array.isArray(raw.children)) fail(`${path}.children`, 'children 必须是数组');
    return {
      kind: 'component',
      id,
      library: raw.library as LibraryId,
      tag: raw.tag,
      props: raw.props as Record<string, never>,
      children: raw.children.map((child, index) =>
        validateNode(child, `${path}.children[${index}]`, depth + 1),
      ),
      meta: raw.meta as SceneNode['meta'],
    };
  }

  return fail(`${path}.kind`, `未知节点类型: ${String(raw.kind)}`);
}

function validateStyles(raw: unknown): StyleRule[] {
  if (raw === undefined) return [];
  if (!Array.isArray(raw)) fail('styles', 'styles 必须是数组');
  return raw.map((rule, index) => {
    if (!isPlainObject(rule)) fail(`styles[${index}]`, '样式规则必须是对象');
    if (typeof rule.id !== 'string') fail(`styles[${index}].id`, '缺少 id');
    if (typeof rule.selector !== 'string' || !/^[.#]?[\w-]+(\s*[>+~]?\s*[.#]?[\w-]+)*$/.test(rule.selector)) {
      fail(`styles[${index}].selector`, '非法选择器');
    }
    if (!isPlainObject(rule.declarations)) fail(`styles[${index}].declarations`, '缺少 declarations');
    for (const [prop, value] of Object.entries(rule.declarations)) {
      if (typeof value !== 'string') fail(`styles[${index}].declarations.${prop}`, '只接受字符串');
      if (/[;}]/.test(value)) fail(`styles[${index}].declarations.${prop}`, '值里不允许出现分号或右花括号');
    }
    return {
      id: rule.id,
      selector: rule.selector,
      declarations: rule.declarations as Record<string, string>,
    };
  });
}

export function validateDocument(raw: unknown): VccDocument {
  if (!isPlainObject(raw)) fail('$', '文档必须是对象');
  if (raw.version !== 1) fail('version', `不支持的文档版本: ${String(raw.version)}`);
  if (typeof raw.name !== 'string') fail('name', 'name 必须是字符串');
  visitedCount = 0;
  const root = validateNode(raw.root, 'root', 0);
  if (!isContainer(root) || root.kind !== 'element') fail('root', '根节点必须是元素');
  const styles = validateStyles(raw.styles);
  return {
    version: 1,
    name: raw.name,
    root,
    styles,
    script: typeof raw.script === 'string' ? raw.script : undefined,
  } as VccDocument;
}

export function isValidDocument(raw: unknown): boolean {
  try {
    validateDocument(raw);
    return true;
  } catch {
    return false;
  }
}
