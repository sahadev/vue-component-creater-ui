/** 生成节点 id。可注入工厂，便于测试与快照稳定。 */
export function createIdFactory(prefix = ''): () => string {
  let counter = 0;
  return () => {
    counter += 1;
    const rand = Math.random().toString(36).slice(2, 6);
    return `${prefix}${counter.toString(36)}${rand}`;
  };
}

export const newNodeId: () => string = createIdFactory();

/** 深拷贝节点并给整棵子树换新 id */
export function cloneWithFreshIds<T extends { id: string; children?: unknown[] }>(node: T): T {
  const copy = structuredClone(node);
  const walk = (target: { id: string; children?: unknown[] }) => {
    target.id = newNodeId();
    const children = target.children;
    if (Array.isArray(children)) {
      for (const child of children) {
        if (child && typeof child === 'object') walk(child as { id: string; children?: unknown[] });
      }
    }
  };
  walk(copy);
  return copy;
}
