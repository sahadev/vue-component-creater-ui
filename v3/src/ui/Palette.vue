<script setup lang="ts">
import { computed, ref } from 'vue';
import { buildSampleGroups, type SampleGroup } from '../core/samples';
import SamplePreview from '../render/SamplePreview';
import { writePayload } from '../render/dnd';
import { acceptsChildren } from '../core/capabilities';
import type { LibraryId, SceneNode } from '../core/types';

import elementLogo from '../assets/logo/element-n.png';
import vantLogo from '../assets/logo/vant-n.png';
import iviewLogo from '../assets/logo/iview-n.png';
import quasarLogo from '../assets/logo/quasar-n.png';
import antdLogo from '../assets/logo/antd-n.svg';

interface Brand {
  id: LibraryId | null;
  label: string;
  kind: 'img' | 'vue' | 'echarts';
  src?: string;
  enabled: boolean;
}

const brands: Brand[] = [
  { id: 'html', label: 'Vue', kind: 'vue', enabled: true },
  { id: 'element-plus', label: 'Element Plus', kind: 'img', src: elementLogo, enabled: true },
  { id: 'vant', label: 'Vant', kind: 'img', src: vantLogo, enabled: false },
  { id: null, label: 'ECharts', kind: 'echarts', enabled: false },
  { id: null, label: 'iView', kind: 'img', src: iviewLogo, enabled: false },
  { id: null, label: 'Quasar', kind: 'img', src: quasarLogo, enabled: false },
  { id: 'ant-design-vue', label: 'Ant Design Vue', kind: 'img', src: antdLogo, enabled: false },
];

const activeBrand = ref<LibraryId>('element-plus');
const activeGroup = ref<string | null>(null);
const scroller = ref<HTMLElement | null>(null);

const groups = computed<SampleGroup[]>(() => buildSampleGroups(activeBrand.value));

const totalComponents = computed(() => {
  const all = new Set<string>();
  for (const library of ['html', 'element-plus', 'vant', 'ant-design-vue'] as LibraryId[]) {
    for (const group of buildSampleGroups(library)) all.add(group.specKey);
  }
  return all.size;
});

function selectBrand(brand: Brand) {
  if (!brand.enabled || !brand.id) return;
  activeBrand.value = brand.id;
  activeGroup.value = null;
  scroller.value?.scrollTo({ top: 0 });
}

function focusGroup(group: SampleGroup) {
  activeGroup.value = group.specKey;
  const target = scroller.value?.querySelector<HTMLElement>(
    `[data-group="${group.specKey}"]`,
  );
  target?.scrollIntoView({ block: 'start', behavior: 'smooth' });
}

function isEmptyContainer(node: SceneNode): boolean {
  // 只有"本来能装东西但现在空着"的节点才需要占位框，
  // 输入框、开关这类叶子组件不算。
  if (node.kind === 'text') return false;
  return acceptsChildren(node) && node.children.length === 0;
}

function onDragStart(event: DragEvent, node: SceneNode) {
  writePayload(event, { type: 'template', node });
}
</script>

<template>
  <aside class="palette">
    <nav class="brand-bar">
      <button
        v-for="brand in brands"
        :key="brand.label"
        type="button"
        class="brand"
        :class="{ 'is-active': brand.enabled && activeBrand === brand.id, 'is-disabled': !brand.enabled }"
        :title="brand.enabled ? brand.label : `${brand.label} 暂未开放，敬请期待`"
        @click="selectBrand(brand)"
      >
        <svg v-if="brand.kind === 'vue'" class="brand__logo" viewBox="0 0 261.76 226.69">
          <path d="M161.096,0.001L130.53,52.94L99.964,0.001L-0.005,0.001L130.53,226.69L261.07,0.001H161.096z" fill="#41B883" />
          <path d="M161.096,0.001L130.53,52.94L99.964,0.001H51.7L130.53,136.53L209.36,0.001H161.096z" fill="#35495E" />
        </svg>
        <span v-else-if="brand.kind === 'echarts'" class="brand__rainbow" />
        <img v-else :src="brand.src" class="brand__logo" :alt="brand.label" />
      </button>

      <div class="brand-bar__bottom">
        <span class="brand-bar__title">Low Code Generator</span>
        <el-dropdown trigger="click">
          <span class="brand-bar__help">?</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item disabled>基础组件数: {{ totalComponents }}</el-dropdown-item>
              <el-dropdown-item divided>VCC 3 · 结构驱动引擎</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </nav>

    <nav class="category-nav">
      <div class="category-nav__hint">快速查找需要的</div>
      <div class="category-nav__list">
        <div
          v-for="group in groups"
          :key="group.specKey"
          class="category"
          :class="{ 'is-active': activeGroup === group.specKey }"
          @click="focusGroup(group)"
        >
          <div class="category__zh">{{ group.titleZh }}</div>
          <div class="category__en">{{ group.titleEn }}</div>
        </div>
      </div>
    </nav>

    <div ref="scroller" class="sample-pane">
      <section
        v-for="group in groups"
        :key="group.specKey"
        class="group"
        :data-group="group.specKey"
      >
        <div class="group__title">
          <span class="group__mark" />
          {{ group.titleEn }}
          {{ group.titleZh }}：
        </div>
        <div class="group__variants">
          <div
            v-for="variant in group.variants"
            :key="variant.label"
            class="sample"
            :class="{ 'sample--empty': isEmptyContainer(variant.node) }"
            draggable="true"
            :title="`${variant.label} — 拖到编辑区`"
            @dragstart="onDragStart($event, variant.node)"
          >
            <SamplePreview :node="variant.node" />
          </div>
        </div>
      </section>
    </div>
  </aside>
</template>

<style scoped>
.palette {
  display: flex;
  height: 100%;
  background: #fff;
}

/* ---- 品牌列 ---- */
.brand-bar {
  width: 56px;
  flex: 0 0 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #f0f0f0;
  padding-top: 8px;
}

.brand {
  width: 46px;
  height: 46px;
  margin: 3px 0;
  border: 0;
  border-radius: 5px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.brand:hover {
  background: #f5f7fa;
}

.brand.is-active {
  background: #fff;
  border-right: 3px solid #13ce66;
  box-shadow: 0 2px 4px rgb(0 0 0 / 12%), 0 0 6px rgb(0 0 0 / 4%);
}

.brand.is-disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.brand__logo {
  width: 34px;
  height: 34px;
  object-fit: contain;
}

.brand__rainbow {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: conic-gradient(#e74c3c, #f39c12, #2ecc71, #3498db, #9b59b6, #e74c3c);
}

.brand-bar__bottom {
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  padding-bottom: 12px;
  position: relative;
}

.brand-bar__title {
  position: absolute;
  left: 2px;
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

/* ---- 分类导航 ---- */
.category-nav {
  width: 165px;
  flex: 0 0 165px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #f0f0f0;
}

.category-nav__hint {
  padding: 8px 10px;
  text-align: center;
  font-size: 12px;
  color: gray;
  border-bottom: 1px solid #f5f5f5;
}

.category-nav__list {
  flex: 1;
  overflow-y: auto;
}

.category {
  padding: 8px 12px;
  border-left: 3px solid transparent;
  cursor: pointer;
}

.category:hover {
  background: #f7f8fa;
}

.category.is-active {
  background: #f2f2f2;
  border-left-color: #13ce66;
}

.category__zh {
  font-size: 14px;
  color: #303133;
}

.category__en {
  font-size: 12px;
  color: #909399;
}

/* ---- 示例区 ---- */
.sample-pane {
  flex: 1;
  min-width: 320px;
  overflow-y: auto;
  padding: 8px 10px 40px;
}

.group + .group {
  margin-top: 14px;
}

.group__title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #606266;
  padding: 4px 0;
  border-left: 3px solid #13ce66;
  padding-left: 8px;
  margin-bottom: 6px;
}

.group__tag {
  font-family: var(--vcc-mono);
  font-size: 11px;
  color: #a8abb2;
}

.group__variants {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: flex-start;
}

.sample {
  cursor: grab;
  padding: 2px;
  border-radius: 4px;
}

.sample:hover {
  outline: 1px dashed #13ce66;
  outline-offset: 2px;
}

.sample:active {
  cursor: grabbing;
}

/* 空容器示例：给个占位框，否则在示例区里是一片空白 */
.sample--empty > :deep(*) {
  display: inline-block;
  min-width: 60px;
  min-height: 24px;
  border: 1px dashed #c0c4cc;
}
</style>
