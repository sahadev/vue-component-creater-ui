<script setup lang="ts">
import { useEditorStore } from '../store/editor';
import AttrForm from './AttrForm.vue';

const store = useEditorStore();
</script>

<template>
  <aside class="attribute" :class="{ 'is-open': !!store.selectedId }">
    <AttrForm />
  </aside>
</template>

<style scoped>
/* 旧的滑出式属性面板：默认停在右侧视野外，选中元素后滑进来 */
.attribute {
  --init-right: calc(-500px - 20px);
  position: absolute;
  top: 10px;
  right: var(--init-right);
  width: 400px;
  max-height: calc(80% - 20px);
  overflow-y: auto;
  z-index: 2;
  transition-property: right;
  transition-duration: 300ms;
  transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
}

.attribute.is-open {
  right: 10px;
}
</style>
