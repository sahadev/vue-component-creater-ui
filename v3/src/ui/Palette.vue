<script setup lang="ts">
import { computed } from 'vue';
import { groupSpecsByCategory, listSpecs } from '../core/registry';
import { writePayload } from '../render/dnd';
import type { LibraryId } from '../core/types';

const LIBRARY_LABELS: Record<LibraryId, string> = {
  html: '原生',
  'element-plus': 'Element Plus',
  'ant-design-vue': 'Ant Design Vue',
  vant: 'Vant',
};

const sections = computed(() => {
  const libraries = [...new Set(listSpecs().map((spec) => spec.library))];
  return libraries.map((library) => ({
    library,
    label: LIBRARY_LABELS[library] ?? library,
    groups: [...groupSpecsByCategory(library).entries()],
  }));
});

function onDragStart(event: DragEvent, library: LibraryId, tag: string) {
  writePayload(event, { type: 'spec', library, tag });
}
</script>

<template>
  <aside class="palette">
    <section v-for="section in sections" :key="section.library" class="palette__section">
      <h2 class="palette__title">{{ section.label }}</h2>
      <div v-for="[category, specs] in section.groups" :key="category" class="palette__group">
        <h3 class="palette__category">{{ category }}</h3>
        <div class="palette__grid">
          <button
            v-for="spec in specs"
            :key="`${spec.library}:${spec.tag}`"
            class="palette__item"
            type="button"
            draggable="true"
            :title="`${spec.tag} — 拖到画布`"
            @dragstart="onDragStart($event, spec.library, spec.tag)"
          >
            {{ spec.name }}
          </button>
        </div>
      </div>
    </section>
  </aside>
</template>

<style scoped>
.palette {
  width: var(--vcc-panel-width);
  flex: 0 0 var(--vcc-panel-width);
  overflow-y: auto;
  background: var(--vcc-surface);
  border-right: 1px solid var(--vcc-border);
  padding: var(--vcc-gap-lg);
}

.palette__title {
  font-size: 12px;
  font-weight: 600;
  margin: 0 0 var(--vcc-gap);
  color: var(--vcc-text-weak);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.palette__section + .palette__section {
  margin-top: var(--vcc-gap-lg);
  padding-top: var(--vcc-gap-lg);
  border-top: 1px solid var(--vcc-border);
}

.palette__category {
  font-size: 12px;
  font-weight: 500;
  color: var(--vcc-text-weak);
  margin: var(--vcc-gap) 0 var(--vcc-gap);
}

.palette__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
}

.palette__item {
  border: 1px solid var(--vcc-border);
  background: var(--vcc-surface);
  border-radius: var(--vcc-radius-sm);
  padding: 6px 4px;
  font-size: 12px;
  font-family: inherit;
  color: var(--vcc-text);
  cursor: grab;
  transition: border-color 120ms, background 120ms;
}

.palette__item:hover {
  border-color: var(--vcc-accent);
  background: var(--vcc-accent-weak);
}

.palette__item:active {
  cursor: grabbing;
}
</style>
