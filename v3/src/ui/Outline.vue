<script setup lang="ts">
import { computed } from 'vue';
import { useEditorStore } from '../store/editor';
import { walk } from '../core/tree';
import { displayName } from '../render/canvas-props';
import type { NodePath, SceneNode } from '../core/types';

const store = useEditorStore();

interface Row {
  id: string;
  path: NodePath;
  depth: number;
  node: SceneNode;
  label: string;
}

const rows = computed<Row[]>(() => {
  const collected: Row[] = [];
  walk(store.doc, (node, path) => {
    if (path.length === 0) return; // 根节点不进大纲
    collected.push({
      id: node.id,
      path,
      depth: path.length,
      node,
      label: node.meta?.label ?? displayName(node),
    });
  });
  return collected;
});
</script>

<template>
  <aside class="outline">
    <h2 class="outline__title">结构</h2>
    <p v-if="rows.length === 0" class="outline__empty">画布还是空的，从左侧拖一个组件进来。</p>
    <ul class="outline__list">
      <li v-for="row in rows" :key="row.id">
        <button
          type="button"
          class="outline__row"
          :class="{ 'is-active': store.selectedId === row.id }"
          :data-depth="Math.min(row.depth, 8)"
          @click="store.select(row.id)"
        >
          <span class="outline__label">{{ row.label }}</span>
          <code class="outline__tag">{{ row.node.kind === 'text' ? 'text' : row.node.tag }}</code>
        </button>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.outline {
  width: 200px;
  flex: 0 0 200px;
  overflow-y: auto;
  background: var(--vcc-surface);
  border-left: 1px solid var(--vcc-border);
  padding: var(--vcc-gap) 0;
}

.outline__title {
  font-size: 12px;
  font-weight: 600;
  color: var(--vcc-text-weak);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0;
  padding: 0 var(--vcc-gap-lg) var(--vcc-gap);
}

.outline__empty {
  color: var(--vcc-text-weak);
  padding: 0 var(--vcc-gap-lg);
  line-height: 1.6;
  margin: 0;
}

.outline__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.outline__row {
  display: flex;
  align-items: center;
  gap: var(--vcc-gap);
  width: 100%;
  border: 0;
  background: transparent;
  padding: 4px 8px;
  font-family: inherit;
  font-size: 12px;
  text-align: left;
  cursor: pointer;
  color: var(--vcc-text);
}

.outline__row:hover {
  background: var(--vcc-bg);
}

.outline__row[data-depth='1'] { padding-left: 8px; }
.outline__row[data-depth='2'] { padding-left: 20px; }
.outline__row[data-depth='3'] { padding-left: 32px; }
.outline__row[data-depth='4'] { padding-left: 44px; }
.outline__row[data-depth='5'] { padding-left: 56px; }
.outline__row[data-depth='6'] { padding-left: 68px; }
.outline__row[data-depth='7'] { padding-left: 80px; }
.outline__row[data-depth='8'] { padding-left: 92px; }

.outline__row.is-active {
  background: var(--vcc-accent-weak);
  color: var(--vcc-accent);
}

.outline__label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.outline__tag {
  font-family: var(--vcc-mono);
  font-size: 11px;
  color: var(--vcc-text-weak);
}
</style>
