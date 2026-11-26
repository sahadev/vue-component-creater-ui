<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useEditorStore } from '../store/editor';
import { findSpec, type PropEditor } from '../core/registry';
import type { PropValue } from '../core/types';

const store = useEditorStore();

interface Field {
  key: string;
  label: string;
  editor: PropEditor;
  options?: { label: string; value: PropValue }[];
}

const node = computed(() => store.selectedNode);
const spec = computed(() => (node.value ? findSpec(node.value) : undefined));

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

function readValue(key: string): PropValue | undefined {
  const current = node.value;
  if (!current || current.kind === 'text') return undefined;
  return current.props[key];
}

function readText(key: string): string {
  const value = readValue(key);
  if (value === undefined) return '';
  if (typeof value === 'string') return value;
  return JSON.stringify(value);
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

const textValue = ref('');
watch(
  node,
  (current) => {
    textValue.value = current?.kind === 'text' ? current.text : '';
  },
  { immediate: true },
);

function commitText() {
  const current = node.value;
  if (!current || current.kind !== 'text') return;
  if (current.text === textValue.value) return;
  store.setText(current.id, textValue.value);
}

const newKey = ref('');
const newValue = ref('');

function addAttr() {
  const current = node.value;
  const key = newKey.value.trim();
  if (!current || !key) return;
  store.updateProps(current.id, { [key]: newValue.value });
  newKey.value = '';
  newValue.value = '';
}

function removeSelected() {
  const current = node.value;
  if (current) store.removeById(current.id);
}
</script>

<template>
  <aside class="inspector">
    <template v-if="node">
      <header class="inspector__header">
        <div>
          <div class="inspector__name">{{ spec?.name ?? (node.kind === 'text' ? '文本' : node.tag) }}</div>
          <code class="inspector__tag">{{ node.kind === 'text' ? 'text' : node.tag }}</code>
        </div>
        <button type="button" class="inspector__danger" @click="removeSelected">删除</button>
      </header>

      <div v-if="node.kind === 'text'" class="inspector__body">
        <label class="field">
          <span class="field__label">文本</span>
          <textarea v-model="textValue" class="field__input" rows="4" @change="commitText" />
        </label>
      </div>

      <div v-else class="inspector__body">
        <label v-for="field in fields" :key="field.key" class="field">
          <span class="field__label">
            {{ field.label }}
            <code v-if="field.label !== field.key" class="field__key">{{ field.key }}</code>
          </span>

          <select
            v-if="field.editor === 'select'"
            class="field__input"
            :value="String(readValue(field.key))"
            @change="commit(field.key, ($event.target as HTMLSelectElement).value, field.editor)"
          >
            <option v-for="option in field.options" :key="String(option.value)" :value="String(option.value)">
              {{ option.label }}
            </option>
          </select>

          <input
            v-else-if="field.editor === 'boolean'"
            class="field__checkbox"
            type="checkbox"
            :checked="readValue(field.key) === true"
            @change="commit(field.key, ($event.target as HTMLInputElement).checked, field.editor)"
          />

          <input
            v-else-if="field.editor === 'number'"
            class="field__input"
            type="number"
            :value="readValue(field.key)"
            @change="commit(field.key, Number(($event.target as HTMLInputElement).value), field.editor)"
          />

          <textarea
            v-else-if="field.editor === 'textarea'"
            class="field__input"
            rows="3"
            :value="readText(field.key)"
            @change="commit(field.key, ($event.target as HTMLTextAreaElement).value, field.editor)"
          />

          <input
            v-else
            class="field__input"
            type="text"
            :value="readText(field.key)"
            :placeholder="field.editor === 'expr' ? 'Vue 表达式，如 form.name' : ''"
            @change="commit(field.key, ($event.target as HTMLInputElement).value, field.editor)"
          />
        </label>

        <div class="inspector__add">
          <span class="field__label">新增属性</span>
          <div class="inspector__add-row">
            <input v-model="newKey" class="field__input" placeholder="key" />
            <input v-model="newValue" class="field__input" placeholder="value" />
            <button type="button" class="inspector__button" @click="addAttr">加</button>
          </div>
        </div>
      </div>
    </template>

    <p v-else class="inspector__empty">选中画布上的元素后在这里改属性。</p>
  </aside>
</template>

<style scoped>
.inspector {
  width: var(--vcc-inspector-width);
  flex: 0 0 var(--vcc-inspector-width);
  overflow-y: auto;
  background: var(--vcc-surface);
  border-left: 1px solid var(--vcc-border);
  padding: var(--vcc-gap-lg);
}

.inspector__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--vcc-gap);
  padding-bottom: var(--vcc-gap);
  border-bottom: 1px solid var(--vcc-border);
}

.inspector__name {
  font-weight: 600;
}

.inspector__tag,
.field__key {
  font-family: var(--vcc-mono);
  font-size: 11px;
  color: var(--vcc-text-weak);
}

.inspector__danger {
  border: 1px solid var(--vcc-border);
  background: var(--vcc-surface);
  color: var(--vcc-danger);
  border-radius: var(--vcc-radius-sm);
  padding: 4px 8px;
  font-family: inherit;
  font-size: 12px;
  cursor: pointer;
}

.inspector__danger:hover {
  border-color: var(--vcc-danger);
}

.inspector__body {
  display: flex;
  flex-direction: column;
  gap: var(--vcc-gap-lg);
  padding-top: var(--vcc-gap-lg);
}

.inspector__empty {
  color: var(--vcc-text-weak);
  line-height: 1.6;
  margin: 0;
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
  background: var(--vcc-surface);
  resize: vertical;
}

.field__input:focus {
  outline: none;
  border-color: var(--vcc-accent);
}

.field__checkbox {
  width: 16px;
  height: 16px;
}

.inspector__add {
  border-top: 1px dashed var(--vcc-border);
  padding-top: var(--vcc-gap-lg);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.inspector__add-row {
  display: flex;
  gap: 4px;
}

.inspector__button {
  border: 1px solid var(--vcc-border);
  background: var(--vcc-surface);
  border-radius: var(--vcc-radius-sm);
  padding: 0 10px;
  font-family: inherit;
  font-size: 12px;
  cursor: pointer;
}

.inspector__button:hover {
  border-color: var(--vcc-accent);
  color: var(--vcc-accent);
}
</style>
