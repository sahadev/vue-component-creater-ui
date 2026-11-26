<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useEditorStore } from '../store/editor';
import { findSpec, type PropEditor } from '../core/registry';
import { formatFreeFormText, parseFreeFormText } from '../core/attrs';
import { findPath, getNode } from '../core/tree';
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

  const undeclared: Field[] = Object.keys(current.props)
    .filter((key) => !schemaKeys.has(key))
    .map((key) => ({ key, label: key, editor: 'text' as PropEditor }));

  return [...declared, ...undeclared];
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
  const value = readValue(key);
  if (value === undefined) return '';
  return typeof value === 'string' ? value : JSON.stringify(value);
}

function commit(key: string, raw: unknown, editor: PropEditor) {
  const current = node.value;
  if (!current) return;
  if (editor !== 'expr' && editor !== 'boolean' && raw === '') {
    store.updateProps(current.id, { [key]: undefined } as never);
    return;
  }
  store.updateProps(current.id, { [key]: raw as PropValue });
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

function copyBrother() {
  const current = node.value;
  if (current) store.duplicate(current.id);
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
  } else if (key === 'c') {
    if (isTypingTarget(event.target)) return;
    event.preventDefault();
    copyBrother();
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown));
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown));
</script>

<template>
  <el-card v-if="node" class="attr-card" :class="{ 'attr-card--compact': props.compact }" shadow="never">
    <div class="attr-head">
      <span class="attr-name">{{ spec?.name ?? (node.kind === 'text' ? '文本' : node.tag) }}</span>
      <code class="attr-tag">{{ node.kind === 'text' ? 'text' : node.tag }}</code>
    </div>

    <div class="attr-switch">
      <el-switch
        v-model="freeMode"
        active-text="自由编辑"
        inactive-text="约束编辑"
        active-color="#13ce66"
        inactive-color="#13ce66"
      />
    </div>

    <div v-if="node.kind === 'text'" class="attr-body">
      <label class="field">
        <span class="field__label">文本</span>
        <textarea v-model="textValue" class="field__input" rows="4" @change="save" />
      </label>
    </div>

    <div v-else-if="freeMode" class="attr-body">
      <el-input
        v-model="freeText"
        type="textarea"
        :autosize="{ minRows: 6 }"
        placeholder="请输入属性, 以 key: value 的形式（每行一条）"
      />
    </div>

    <div v-else class="attr-body">
      <label v-for="field in fields" :key="field.key" class="field">
        <span class="field__label">
          {{ field.label }}
          <code v-if="field.label !== field.key" class="field__key">{{ field.key }}</code>
        </span>

        <el-select
          v-if="field.editor === 'select'"
          :model-value="String(readValue(field.key) ?? '')"
          size="small"
          @update:model-value="commit(field.key, $event, field.editor)"
        >
          <el-option
            v-for="option in field.options"
            :key="String(option.value)"
            :label="option.label"
            :value="String(option.value)"
          />
        </el-select>

        <el-switch
          v-else-if="field.editor === 'boolean'"
          :model-value="readValue(field.key) === true"
          size="small"
          @update:model-value="commit(field.key, $event, field.editor)"
        />

        <el-input-number
          v-else-if="field.editor === 'number'"
          :model-value="Number(readValue(field.key) ?? 0)"
          :controls="false"
          size="small"
          @update:model-value="commit(field.key, $event ?? 0, field.editor)"
        />

        <el-input
          v-else-if="field.editor === 'textarea'"
          :model-value="readText(field.key)"
          type="textarea"
          :rows="3"
          size="small"
          @update:model-value="commit(field.key, $event, field.editor)"
        />

        <el-input
          v-else
          :model-value="readText(field.key)"
          size="small"
          :placeholder="field.editor === 'expr' ? 'Vue 表达式，如 form.name' : ''"
          @update:model-value="commit(field.key, $event, field.editor)"
        />
      </label>

      <div v-if="addOpen" class="attr-add">
        <el-input v-model="newKey" size="small" placeholder="key" />
        <el-input v-model="newValue" size="small" placeholder="value" @keyup.enter="commitNew" />
        <el-button size="small" type="primary" @click="commitNew">加</el-button>
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
          <span class="glyph">×</span>
        </el-button>
      </el-tooltip>
      <el-tooltip effect="dark" content="复制一个兄弟组件 ctrl+c" placement="bottom">
        <el-button type="primary" circle size="small" @click="copyBrother">
          <span class="glyph">⧉</span>
        </el-button>
      </el-tooltip>
    </div>
    <p class="attr-hint">支持快捷键操作</p>
  </el-card>

  <el-card v-else class="attr-card attr-card--empty" shadow="never">
    请先选中要编辑的组件
  </el-card>
</template>

<style scoped>
.attr-card {
  border-radius: 10px;
  border: 1px solid var(--vcc-border);
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
  gap: var(--vcc-gap);
  padding-bottom: var(--vcc-gap);
  border-bottom: 1px solid var(--vcc-border);
}

.attr-name {
  font-weight: 600;
}

.attr-tag,
.field__key {
  font-family: var(--vcc-mono);
  font-size: 11px;
  color: var(--vcc-text-weak);
}

.attr-switch {
  text-align: center;
  padding: var(--vcc-gap) 0;
}

.attr-body {
  display: flex;
  flex-direction: column;
  gap: var(--vcc-gap);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.field__label {
  font-size: 12px;
  color: var(--vcc-text-weak);
  display: flex;
  justify-content: space-between;
}

.field__input {
  width: 100%;
  border: 1px solid var(--vcc-border);
  border-radius: var(--vcc-radius-sm);
  padding: 6px 8px;
  font-family: inherit;
  font-size: 12px;
  color: var(--vcc-text);
  resize: vertical;
}

.attr-add {
  display: flex;
  gap: 4px;
  align-items: center;
}

.attr-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: var(--vcc-gap-lg);
}

.glyph {
  font-size: 14px;
  line-height: 1;
}

.attr-hint {
  text-align: center;
  font-size: 11px;
  color: var(--vcc-text-weak);
  margin: var(--vcc-gap) 0 0;
}
</style>
