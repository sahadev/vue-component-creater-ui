<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useEditorStore } from '../store/editor';

const props = defineProps<{ visible: boolean }>();
const emit = defineEmits<{ (event: 'update:visible', value: boolean): void }>();

const store = useEditorStore();
const draft = ref('');

const open = computed({
  get: () => props.visible,
  set: (value: boolean) => emit('update:visible', value),
});

watch(
  () => props.visible,
  (visible) => {
    if (visible) draft.value = store.doc.script ?? '';
  },
);

function save() {
  store.setScript(draft.value);
  open.value = false;
}
</script>

<template>
  <el-dialog v-model="open" title="编辑 JS 逻辑" width="60%" top="8vh">
    <p class="js-dialog__hint">
      这里写的内容会原样进入导出组件的 <code>&lt;script setup&gt;</code>，不参与画布渲染。
    </p>
    <el-input
      v-model="draft"
      type="textarea"
      :autosize="{ minRows: 14 }"
      placeholder="const visible = ref(false)&#10;function onSave() { ... }"
    />
    <template #footer>
      <el-button @click="open = false">取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.js-dialog__hint {
  color: var(--vcc-text-weak);
  font-size: 12px;
  margin: 0 0 var(--vcc-gap);
}
</style>
