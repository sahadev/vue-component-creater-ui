<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useEditorStore } from '../store/editor';
import { findSpec, type PropEditor } from '../core/registry';
import { formatFreeFormText, parseFreeFormText } from '../core/attrs';
import { findPath, getNode } from '../core/tree';
import { newNodeId } from '../core/ids';
import type { PropValue } from '../core/types';

const props = withDefaults(
  defineProps<{ nodeId?: string | null; compact?: boolean }>(),
  { nodeId: null, compact: false },
);

const store = useEditorStore();

const node = computed(() => {
  const id = props.nodeId ?? store.selectedId;
  if (!id) return null;
  const path = findPath(store.doc, id);
  return path ? getNode(store.doc, path) : null;
});

const spec = computed(() => (node.value ? findSpec(node.value) : undefined));

interface Field {
  key: string;
  label: string;
  editor: PropEditor;
  options?: { label: string; value: PropValue }[];
}

/** 组件/元素上的文本内容，按旧版习惯当成 __text__ 属性 */
const textChild = computed(() => {
  const current = node.value;
  if (!current || current.kind === 'text') return null;
  const child = current.children.find((item) => item.kind === 'text');
  return child && child.kind === 'text' ? child : null;
});

const fields = computed<Field[]>(() => {
  const current = node.value;
  if (!current || current.kind === 'text') return [];

  const schema = spec.value?.props ?? [];
  const schemaKeys = new Set(schema.map((prop) => prop.key));

  const declared: Field[] = schema.map((prop) => ({
    key: prop.key,
    label: prop.label,
    editor: prop.editor,
    options: prop.options,
  }));

  // props 里存在但 schema 没声明的，原样列出来，免得改不回来
  const undeclared: Field[] = Object.keys(current.props)
    .filter((key) => !schemaKeys.has(key))
    .map((key) => ({ key, label: key, editor: 'text' as PropEditor }));

  const textField: Field[] = textChild.value
    ? [{ key: '__text__', label: '__text__', editor: 'textarea' as PropEditor }]
    : [];

  return [...textField, ...declared, ...undeclared];
});

const freeMode = ref(false);
const freeText = ref('');
const textValue = ref('');
const addOpen = ref(false);
const newKey = ref('');
const newValue = ref('');

watch(
  node,
  (current) => {
    freeText.value = current && current.kind !== 'text' ? formatFreeFormText(current.props) : '';
    textValue.value = current?.kind === 'text' ? current.text : '';
    addOpen.value = false;
  },
  { immediate: true },
);

function readValue(key: string): PropValue | undefined {
  const current = node.value;
  if (!current || current.kind === 'text') return undefined;
  return current.props[key];
}

function readText(key: string): string {
  if (key === '__text__') return textChild.value?.text ?? '';
  const value = readValue(key);
  if (value === undefined) return '';
  return typeof value === 'string' ? value : JSON.stringify(value);
}

function commit(key: string, raw: unknown, editor: PropEditor) {
  const current = node.value;
  if (!current) return;
  if (key === '__text__') {
    if (textChild.value) store.setText(textChild.value.id, String(raw));
    return;
  }
  if (editor !== 'expr' && editor !== 'boolean' && raw === '') {
    store.updateProps(current.id, { [key]: undefined } as never);
    return;
  }
  store.updateProps(current.id, { [key]: raw as PropValue });
}

function removeAttr(key: string) {
  const current = node.value;
  if (!current) return;
  if (key === '__text__') {
    if (textChild.value) store.removeById(textChild.value.id);
    return;
  }
  store.updateProps(current.id, { [key]: undefined } as never);
}

function save() {
  const current = node.value;
  if (!current) return;
  if (current.kind === 'text') {
    if (current.text !== textValue.value) store.setText(current.id, textValue.value);
    return;
  }
  if (freeMode.value) {
    store.applyAttrs(current.id, parseFreeFormText(freeText.value));
  }
}

function createNew() {
  addOpen.value = true;
}

function commitNew() {
  const current = node.value;
  const key = newKey.value.trim();
  if (!current || !key) return;
  store.updateProps(current.id, { [key]: newValue.value });
  newKey.value = '';
  newValue.value = '';
  addOpen.value = false;
}

function remove() {
  const current = node.value;
  if (current) store.removeById(current.id);
}

/** 快捷属性：原版那三个绿 tag */
const quickAttrs = computed(() => {
  const current = node.value;
  if (!current || current.kind === 'text') return [];
  const keys = Object.keys(current.props);
  const candidates = [
    { key: 'class', label: 'Class' },
    { key: '@click', label: '点击事件' },
    { key: '__text__', label: '文本内容' },
  ].filter((item) => item.key !== '__text__' || !textChild.value);
  return candidates.filter((item) => !keys.includes(item.key));
});

function addQuickAttr(key: string) {
  const current = node.value;
  if (!current) return;
  if (key === '__text__') {
    store.appendChildOf(current.id, { kind: 'text', id: newNodeId(), text: '' });
    return;
  }
  store.updateProps(current.id, { [key]: '' });
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName.toLowerCase();
  return tag === 'input' || tag === 'textarea' || target.isContentEditable;
}

function onKeydown(event: KeyboardEvent) {
  if (!node.value) return;
  const meta = event.metaKey || event.ctrlKey;
  if (!meta) return;
  const key = event.key.toLowerCase();

  if (key === 'a') {
    event.preventDefault();
    createNew();
  } else if (key === 's') {
    event.preventDefault();
    save();
  } else if (key === 'd') {
    if (isTypingTarget(event.target)) return;
    event.preventDefault();
    remove();
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown));
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown));
</script>

<template>
  <el-card v-if="node" class="attr-card" :class="{ 'attr-card--compact': props.compact }" shadow="never">
    <div class="attr-switch">
      <span class="attr-switch__label">约束编辑</span>
      <el-switch v-model="freeMode" active-color="#13ce66" inactive-color="#13ce66" size="small" />
      <span class="attr-switch__label">自由编辑</span>
    </div>

    <div v-if="node.kind === 'text'" class="attr-body">
      <div class="row">
        <span class="row__key">__text__</span>
        <span class="row__colon">:</span>
        <textarea v-model="textValue" class="row__value" rows="3" @change="save" />
      </div>
    </div>

    <div v-else-if="freeMode" class="attr-body">
      <el-input
        v-model="freeText"
        type="textarea"
        :autosize="{ minRows: 6 }"
        placeholder="请输入属性, 以 key: value 的形式（每行一条，冒号后要有空格）"
      />
    </div>

    <div v-else class="attr-body">
      <div v-for="field in fields" :key="field.key" class="row">
        <span class="row__key">{{ field.key }}</span>
        <span class="row__colon">:</span>

        <el-select
          v-if="field.editor === 'select'"
          class="row__value"
          :model-value="String(readValue(field.key) ?? '')"
          size="small"
          @update:model-value="commit(field.key, $event, field.editor)"
        >
          <el-option
            v-for="option in field.options"
            :key="String(option.value)"
            :label="String(option.value) || option.label"
            :value="String(option.value)"
          />
        </el-select>

        <div v-else-if="field.editor === 'boolean'" class="row__value row__value--center">
          <el-switch
            :model-value="readValue(field.key) === true"
            size="small"
            @update:model-value="commit(field.key, $event, field.editor)"
          />
        </div>

        <el-input-number
          v-else-if="field.editor === 'number'"
          class="row__value"
          :model-value="Number(readValue(field.key) ?? 0)"
          :controls="false"
          size="small"
          @update:model-value="commit(field.key, $event ?? 0, field.editor)"
        />

        <textarea
          v-else-if="field.editor === 'textarea'"
          class="row__value"
          rows="2"
          :value="readText(field.key)"
          @change="commit(field.key, ($event.target as HTMLTextAreaElement).value, field.editor)"
        />

        <input
          v-else
          class="row__value row__value--input"
          type="text"
          :value="readText(field.key)"
          :placeholder="field.editor === 'expr' ? '如 {{ showValue }} 或 form.name' : ''"
          @change="commit(field.key, ($event.target as HTMLInputElement).value, field.editor)"
        />

        <button type="button" class="row__remove" title="删除该属性" @click="removeAttr(field.key)">
          −
        </button>
      </div>

      <div v-if="addOpen" class="row">
        <input v-model="newKey" class="row__key row__key--input" placeholder="key" />
        <span class="row__colon">:</span>
        <input
          v-model="newValue"
          class="row__value row__value--input"
          placeholder="value"
          @keyup.enter="commitNew"
        />
        <button type="button" class="row__remove" @click="commitNew">✓</button>
      </div>

      <div v-if="quickAttrs.length > 0" class="quick">
        <div class="quick__hint">快速增加一些属性:</div>
        <div class="quick__tags">
          <button
            v-for="item in quickAttrs"
            :key="item.key"
            type="button"
            class="quick__tag"
            @click="addQuickAttr(item.key)"
          >
            {{ item.label }}
          </button>
        </div>
      </div>
    </div>

    <div class="attr-actions">
      <el-tooltip effect="dark" content="新增属性 ctrl+a" placement="bottom">
        <el-button type="primary" circle size="small" @click="createNew">
          <span class="glyph">+</span>
        </el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="保存属性 ctrl+s" placement="bottom">
        <el-button type="success" circle size="small" @click="save">
          <span class="glyph">↻</span>
        </el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="移除该组件 ctrl+d" placement="bottom">
        <el-button type="danger" circle size="small" @click="remove">
          <span class="glyph">🗑</span>
        </el-button>
      </el-tooltip>
    </div>
    <p class="attr-hint">支持快捷键操作</p>
  </el-card>

  <el-card v-else class="attr-card attr-card--empty" shadow="never">请先选中要编辑的组件</el-card>
</template>

<style scoped>
.attr-card {
  border-radius: 10px;
  border: 1px solid #ebeef5;
}

.attr-card--compact {
  height: 100%;
  overflow-y: auto;
}

.attr-card--empty {
  color: var(--vcc-text-weak);
}

.attr-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid #f0f0f0;
}

.attr-name {
  font-weight: 600;
}

.attr-tag {
  font-family: var(--vcc-mono);
  font-size: 11px;
  color: #a8abb2;
}

.attr-switch {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 0;
  color: #409eff;
  font-size: 13px;
}

.attr-switch__label {
  color: #409eff;
}

.attr-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.row {
  display: flex;
  align-items: flex-start;
  gap: 6px;
}

.row__key {
  flex: 0 0 84px;
  font-family: var(--vcc-mono);
  font-size: 12px;
  color: #606266;
  text-align: right;
  padding-top: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}

.row__key--input {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 4px 6px;
  text-align: left;
}

.row__colon {
  padding-top: 6px;
  color: #909399;
}

.row__value {
  flex: 1;
  min-width: 0;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 5px 8px;
  font-family: var(--vcc-mono);
  font-size: 12px;
  color: #303133;
  background: #fff;
  resize: vertical;
  box-sizing: border-box;
}

.row__value:focus {
  outline: none;
  border-color: #13ce66;
}

.row__value--input {
  height: 30px;
}

.row__value--center {
  border: 0;
  padding: 4px 0;
}

.row__remove {
  flex: 0 0 20px;
  border: 0;
  background: transparent;
  color: #909399;
  font-size: 14px;
  line-height: 30px;
  cursor: pointer;
  padding: 0;
}

.row__remove:hover {
  color: #f56c6c;
}

.quick {
  border: 1px dashed #dcdfe6;
  border-radius: 4px;
  padding: 8px;
  color: #909399;
  font-size: 12px;
}

.quick__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}

.quick__tag {
  border: 1px solid #13ce66;
  border-radius: 4px;
  background: #fff;
  color: #13ce66;
  font-family: inherit;
  font-size: 12px;
  padding: 1px 6px;
  cursor: pointer;
}

.quick__tag:hover {
  background: #f0fbf5;
}

.attr-actions {
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-top: 14px;
}

.glyph {
  font-size: 13px;
  line-height: 1;
}

.attr-hint {
  text-align: center;
  font-size: 11px;
  color: #909399;
  margin: 6px 0 0;
}
</style>
