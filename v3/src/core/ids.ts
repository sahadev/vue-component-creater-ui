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
