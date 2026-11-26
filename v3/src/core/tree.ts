/**
 * 文档树的读写。全部是纯函数：输入文档 + 参数，返回新文档，绝不原地修改。
 *
 * 不可变更新采用「沿路径浅拷贝」：只复制被改动的那条链，
 * 因此撤销栈里保存整份文档引用也是便宜的。
 */
import type { ContainerNode, NodePath, SceneNode, VccDocument } from './types';
import { isContainer } from './types';

export class TreeError extends Error {}

function assertPath(path: NodePath) {
  for (const segment of path) {
    if (!Number.isInteger(segment) || segment < 0) {
      throw new TreeError(`非法路径段: ${segment}`);
    }
  }
}

/** 取节点；空路径返回 root */
export function getNode(doc: VccDocument, path: NodePath): SceneNode {
  assertPath(path);
  let current: SceneNode = doc.root;
  for (const index of path) {
    if (!isContainer(current)) {
      throw new TreeError(`节点 ${current.id} 不是容器，无法继续下钻`);
    }
    const next: SceneNode | undefined = current.children[index];
    if (!next) throw new TreeError(`路径越界: ${path.join('/')}`);
    current = next;
  }
  return current;
}

/** 取父容器；空路径返回 null */
export function getParent(doc: VccDocument, path: NodePath): ContainerNode | null {
  if (path.length === 0) return null;
  const parent = getNode(doc, path.slice(0, -1));
  if (!isContainer(parent)) throw new TreeError('父节点不是容器');
  return parent;
}

export function pathEquals(a: NodePath, b: NodePath): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

/** a 是否是 b 的严格祖先 */
export function isAncestorPath(a: NodePath, b: NodePath): boolean {
  if (a.length >= b.length) return false;
  return a.every((v, i) => v === b[i]);
}

/** 对指定容器做 children 变换；path 为空表示 root */
function mapChildrenAt(
  node: ContainerNode,
  path: NodePath,
  transform: (children: SceneNode[]) => SceneNode[],
): ContainerNode {
  if (path.length === 0) {
    return { ...node, children: transform(node.children) } as ContainerNode;
  }
  const head = path[0]!;
  const rest = path.slice(1);
  const child = node.children[head];
  if (!child) throw new TreeError(`路径越界: ${path.join('/')}`);
  if (!isContainer(child)) throw new TreeError('路径段指向的节点不是容器');
  const children = node.children.slice();
  children[head] = mapChildrenAt(child, rest, transform);
  return { ...node, children } as ContainerNode;
}

/** 对指定节点做变换；path 为空表示 root */
function mapNodeAt(
  node: SceneNode,
  path: NodePath,
  transform: (node: SceneNode) => SceneNode,
): SceneNode {
  if (path.length === 0) return transform(node);
  if (!isContainer(node)) throw new TreeError('路径段指向的节点不是容器');
  const head = path[0]!;
  const rest = path.slice(1);
  const child = node.children[head];
  if (!child) throw new TreeError(`路径越界: ${path.join('/')}`);
  const children = node.children.slice();
  children[head] = mapNodeAt(child, rest, transform);
  return { ...node, children } as ContainerNode;
}

function withRoot(doc: VccDocument, root: SceneNode): VccDocument {
  return { ...doc, root: root as VccDocument['root'] };
}

/** 在 parentPath 的第 index 位插入节点 */
export function insertNode(
  doc: VccDocument,
  parentPath: NodePath,
  index: number,
  node: SceneNode,
): VccDocument {
  const parent = getNode(doc, parentPath);
  if (!isContainer(parent)) throw new TreeError('目标节点不接受子节点');
  if (index < 0 || index > parent.children.length) {
    throw new TreeError(`插入位置越界: ${index}`);
  }
  const rebuilt = mapChildrenAt(parent, [], (children) => {
    const copy = children.slice();
    copy.splice(index, 0, node);
    return copy;
  });
  return withRoot(doc, mapNodeAt(doc.root, parentPath, () => rebuilt));
}

/** 删除节点 */
export function removeNode(doc: VccDocument, path: NodePath): VccDocument {
  if (path.length === 0) throw new TreeError('不能删除根节点');
  const parent = getNode(doc, path.slice(0, -1));
  if (!isContainer(parent)) throw new TreeError('父节点不是容器');
  const index = path[path.length - 1]!;
  const rebuilt = mapChildrenAt(parent, [], (children) => {
    const copy = children.slice();
    copy.splice(index, 1);
    return copy;
  });
  return withRoot(doc, mapNodeAt(doc.root, path.slice(0, -1), () => rebuilt));
}

/** 就地替换节点 */
export function replaceNode(
  doc: VccDocument,
  path: NodePath,
  next: SceneNode,
): VccDocument {
  return withRoot(doc, mapNodeAt(doc.root, path, () => next));
}

export function updateNode(
  doc: VccDocument,
  path: NodePath,
  patch: Record<string, unknown>,
): VccDocument {
  return withRoot(
    doc,
    mapNodeAt(doc.root, path, (node) => ({ ...node, ...patch }) as SceneNode),
  );
}

export function updateProps(
  doc: VccDocument,
  path: NodePath,
  patch: Record<string, unknown>,
): VccDocument {
  const node = getNode(doc, path);
  if (!isContainer(node)) throw new TreeError('文本节点没有属性');
  const props: Record<string, unknown> = { ...node.props };
  for (const [key, value] of Object.entries(patch)) {
    if (value === undefined) delete props[key];
    else props[key] = value;
  }
  return updateNode(doc, path, { props });
}

export function updateText(doc: VccDocument, path: NodePath, text: string): VccDocument {
  const node = getNode(doc, path);
  if (node.kind !== 'text') throw new TreeError('不是文本节点');
  return updateNode(doc, path, { text });
}

/** 移动节点。禁止把节点移进自己的子树。 */
export function moveNode(
  doc: VccDocument,
  from: NodePath,
  toParent: NodePath,
  toIndex: number,
): VccDocument {
  if (from.length === 0) throw new TreeError('不能移动根节点');
  if (pathEquals(from, toParent)) throw new TreeError('不能移动到自身');
  if (isAncestorPath(from, toParent)) throw new TreeError('不能把节点移进自己的子树');

  const node = getNode(doc, from);
  const sameParent = pathEquals(from.slice(0, -1), toParent);
  const adjusted =
    sameParent && from[from.length - 1]! < toIndex ? toIndex - 1 : toIndex;

  const removed = removeNode(doc, from);
  return insertNode(removed, toParent, adjusted, node);
}

/** 深度优先遍历，回调返回 false 可剪枝 */
export function walk(
  doc: VccDocument,
  visit: (node: SceneNode, path: NodePath) => void | false,
): void {
  const step = (node: SceneNode, path: NodePath) => {
    if (visit(node, path) === false) return;
    if (!isContainer(node)) return;
    node.children.forEach((child, index) => step(child, [...path, index]));
  };
  step(doc.root, []);
}

export function findPath(doc: VccDocument, id: string): NodePath | null {
  let found: NodePath | null = null;
  walk(doc, (node, path) => {
    if (node.id === id) {
      found = path;
      return false;
    }
    return undefined;
  });
  return found;
}

/** 节点是否接受子节点，拖拽落点合法性判断用 */
export function canDropInto(doc: VccDocument, targetPath: NodePath): boolean {
  try {
    return isContainer(getNode(doc, targetPath));
  } catch {
    return false;
  }
}

export function countNodes(doc: VccDocument): number {
  let total = 0;
  walk(doc, () => {
    total += 1;
  });
  return total;
}
