<script setup lang="ts">
import { computed, ref } from 'vue';
import { useEditorStore } from '../store/editor';
import { walk } from '../core/tree';
import { displayName } from '../render/canvas-props';
import AttrForm from './AttrForm.vue';
import type { NodePath, SceneNode } from '../core/types';

const props = defineProps<{ visible: boolean }>();
const emit = defineEmits<{ (event: 'update:visible', value: boolean): void }>();

const store = useEditorStore();
const structureTarget = ref<string | null>(null);

const open = computed({
  get: () => props.visible,
  set: (value: boolean) => emit('update:visible', value),
});

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
    if (path.length === 0) return;
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

function selectRow(id: string) {
  structureTarget.value = id;
  store.select(id);
}
</script>

<template>
  <el-drawer v-model="open" direction="btt" size="70%" :with-header="false">
    <div class="structure">
      <div class="structure__title">
        组件结构检视图
        <br />
        <span class="structure__subtitle">Components Structure</span>
      </div>

      <div class="structure__body">
        <div class="structure__tree">
          <p v-if="rows.length === 0" class="structure__empty">画布还是空的。</p>
          <ul class="tree">
            <li v-for="row in rows" :key="row.id">
              <button
                type="button"
                class="tree__row"
                :class="{ 'is-active': store.selectedId === row.id }"
                :data-depth="Math.min(row.depth, 8)"
                @click="selectRow(row.id)"
              >
                <span class="tree__label">{{ row.label }}</span>
              </button>
            </li>
          </ul>
        </div>

        <div class="structure__attr">
          <AttrForm compact />
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<style scoped>
.structure {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.structure__title {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  padding-bottom: var(--vcc-gap);
}

.structure__subtitle {
  font-size: 12px;
  font-weight: 400;
  color: var(--vcc-text-weak);
}

.structure__body {
  flex: 1;
  display: flex;
  gap: var(--vcc-gap-lg);
  min-height: 0;
}

.structure__tree {
  flex: 1;
  overflow: auto;
  padding: 0 var(--vcc-gap-lg);
}

.structure__attr {
  width: 380px;
  flex: 0 0 380px;
  overflow: auto;
}

.structure__empty {
  color: var(--vcc-text-weak);
}

.tree {
  list-style: none;
  margin: 0;
  padding: 0;
}

.tree__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--vcc-gap);
  width: 100%;
  border: 0;
  background: transparent;
  padding: 4px 8px;
  font-family: inherit;
  font-size: 12px;
  text-align: left;
  color: var(--vcc-text);
  cursor: pointer;
  border-radius: var(--vcc-radius-sm);
}

.tree__row:hover {
  background: var(--vcc-bg);
}

.tree__row.is-active {
  background: var(--vcc-accent-weak);
  color: var(--vcc-accent);
}

.tree__row[data-depth='1'] { padding-left: 8px; }
.tree__row[data-depth='2'] { padding-left: 20px; }
.tree__row[data-depth='3'] { padding-left: 32px; }
.tree__row[data-depth='4'] { padding-left: 44px; }
.tree__row[data-depth='5'] { padding-left: 56px; }
.tree__row[data-depth='6'] { padding-left: 68px; }
.tree__row[data-depth='7'] { padding-left: 80px; }
.tree__row[data-depth='8'] { padding-left: 92px; }

.tree__tag {
  font-family: var(--vcc-mono);
  font-size: 11px;
  color: var(--vcc-text-weak);
}
</style>
