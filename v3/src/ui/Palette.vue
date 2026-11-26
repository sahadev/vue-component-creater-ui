<script setup lang="ts">
import { computed, ref } from 'vue';
import { listSpecs } from '../core/registry';
import { writePayload } from '../render/dnd';
import type { LibraryId } from '../core/types';

interface Brand {
  id: LibraryId | null;
  badge: string;
  label: string;
  enabled: boolean;
}

const brands: Brand[] = [
  { id: 'html', badge: 'HTML', label: '原生组件', enabled: true },
  { id: 'element-plus', badge: 'EL', label: 'Element Plus', enabled: true },
  { id: 'vant', badge: 'VANT', label: 'Vant', enabled: false },
  { id: null, badge: 'IV', label: 'iView', enabled: false },
  { id: null, badge: 'QS', label: 'Quasar', enabled: false },
  { id: null, badge: 'EC', label: 'ECharts', enabled: false },
  { id: 'ant-design-vue', badge: 'ANTD', label: 'Ant Design Vue', enabled: false },
];

const CATEGORY_ALIAS: Record<string, string> = {
  布局: 'Layout',
  排版: 'Typography',
  媒体: 'Media',
  表单: 'Form',
  按钮: 'Button',
  容器: 'Container',
  展示: 'Display',
};

const activeBrand = ref<LibraryId>('element-plus');
const activeCategory = ref<string | null>(null);
const keyword = ref('');

const availableSpecs = computed(() =>
  listSpecs(activeBrand.value).filter((spec) => spec.library === activeBrand.value),
);

const categories = computed(() => [...new Set(availableSpecs.value.map((spec) => spec.category))]);

const visibleSpecs = computed(() => {
  const search = keyword.value.trim().toLowerCase();
  return availableSpecs.value.filter((spec) => {
    if (activeCategory.value && spec.category !== activeCategory.value) return false;
    if (!search) return true;
    return (
      spec.name.toLowerCase().includes(search) ||
      spec.tag.toLowerCase().includes(search) ||
      spec.category.includes(search)
    );
  });
});

const componentCount = computed(() => listSpecs().length);

function selectBrand(brand: Brand) {
  if (!brand.enabled || !brand.id) return;
  activeBrand.value = brand.id;
  activeCategory.value = null;
}

function onDragStart(event: DragEvent, library: LibraryId, tag: string) {
  writePayload(event, { type: 'spec', library, tag });
}
</script>

<template>
  <aside class="palette">
    <nav class="brand-bar">
      <button
        v-for="brand in brands"
        :key="brand.badge"
        type="button"
        class="brand"
        :class="{ 'is-active': brand.enabled && activeBrand === brand.id, 'is-disabled': !brand.enabled }"
        :title="brand.enabled ? brand.label : `${brand.label} 暂未开放`"
        @click="selectBrand(brand)"
      >
        {{ brand.badge }}
      </button>

      <div class="brand-bar__bottom">
        <span class="brand-bar__title">Low Code Generator</span>
        <el-dropdown trigger="click">
          <span class="brand-bar__help">?</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item disabled>基础组件数: {{ componentCount }}</el-dropdown-item>
              <el-dropdown-item divided>VCC 3 · 结构驱动引擎</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </nav>

    <div class="list-pane">
      <div class="search">
        <div class="search__hint">快速查找需要的</div>
        <el-input v-model="keyword" size="small" placeholder="请输入..." clearable />
      </div>

      <nav class="category-nav">
        <div
          class="category"
          :class="{ 'is-active': activeCategory === null }"
          @click="activeCategory = null"
        >
          <div class="category__zh">全部</div>
          <div class="category__en">All</div>
        </div>
        <div
          v-for="category in categories"
          :key="category"
          class="category"
          :class="{ 'is-active': activeCategory === category }"
          @click="activeCategory = category"
        >
          <div class="category__zh">{{ category }}</div>
          <div class="category__en">{{ CATEGORY_ALIAS[category] ?? category }}</div>
        </div>
      </nav>

      <div class="spec-list">
        <button
          v-for="spec in visibleSpecs"
          :key="`${spec.library}:${spec.tag}`"
          type="button"
          class="spec"
          draggable="true"
          :title="`${spec.tag} — 拖到画布`"
          @dragstart="onDragStart($event, spec.library, spec.tag)"
        >
          <span class="spec__name">{{ spec.name }}</span>
          <code class="spec__tag">{{ spec.tag }}</code>
        </button>
        <p v-if="visibleSpecs.length === 0" class="spec-list__empty">没有匹配的组件</p>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.palette {
  display: flex;
  height: 100%;
  background: var(--vcc-surface);
}

.brand-bar {
  width: 56px;
  flex: 0 0 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #f0f0f0;
  padding-top: var(--vcc-gap);
}

.brand {
  width: 34px;
  height: 34px;
  margin: 4px 0;
  border: 1px solid var(--vcc-border);
  border-radius: 5px;
  background: var(--vcc-surface);
  font-family: var(--vcc-font);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--vcc-text-weak);
  cursor: pointer;
  transition: border-color 120ms, color 120ms;
}

.brand:hover:not(.is-disabled) {
  border-color: #4dba87;
  color: #4dba87;
}

.brand.is-active {
  border-right: 3px solid #13ce66;
  color: #4dba87;
  box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
}

.brand.is-disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.brand-bar__bottom {
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  padding-bottom: var(--vcc-gap);
  position: relative;
}

.brand-bar__title {
  position: absolute;
  left: 0;
  bottom: 40px;
  transform: rotate(-90deg) translateY(29px);
  transform-origin: 0 50%;
  white-space: nowrap;
  font-size: 26px;
  font-weight: 700;
  color: #4dba87;
  pointer-events: none;
}

.brand-bar__help {
  font-size: 18px;
  font-weight: 700;
  color: #4dba87;
  cursor: pointer;
}

.list-pane {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
}

.search {
  padding: var(--vcc-gap) 0;
  text-align: center;
}

.search__hint {
  padding-bottom: 5px;
  font-size: 12px;
  color: gray;
}

.category-nav {
  display: flex;
  flex-direction: column;
  max-height: 40%;
  overflow-y: auto;
}

.category {
  width: 130px;
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 5px;
}

.category:hover {
  background: #ecf5ff;
  color: #409eff;
}

.category.is-active {
  background: #ecf5ff;
  color: #409eff;
}

.category__zh {
  font-size: 13px;
  font-weight: 600;
}

.category__en {
  font-size: 11px;
  color: gray;
}

.spec-list {
  flex: 1;
  overflow-y: auto;
  padding: var(--vcc-gap) 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.spec {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  border: 1px solid var(--vcc-border);
  border-radius: var(--vcc-radius-sm);
  background: var(--vcc-surface);
  padding: 6px 8px;
  font-family: inherit;
  font-size: 12px;
  color: var(--vcc-text);
  cursor: grab;
  text-align: left;
}

.spec:hover {
  border-color: #4dba87;
  background: #f2fbf6;
}

.spec__tag {
  font-family: var(--vcc-mono);
  font-size: 10px;
  color: var(--vcc-text-weak);
}

.spec-list__empty {
  color: var(--vcc-text-weak);
  font-size: 12px;
  text-align: center;
}
</style>
