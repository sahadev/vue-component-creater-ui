<template>
  <draggable class="dragArea" tag="ul" :list="data" @start="onStartDrag" @choose="onClick" :group="{ name: 'g1' }"
    v-bind="dragOptions" :item-key="getItemKey" @end="onEndDrag">
    <template #item="{ element }">
      <li class="itemArea">
        <p>{{ getRawComponentKey(element) }}</p>
        <nested-draggable :data="getChild(element)" />
      </li>
    </template>
  </draggable>
</template>
<script>
import draggable from "vuedraggable";
import { getRawComponentKey, getRawComponentContent } from "@/utils/common";

import { store as _store } from "@/libs/store.js";

export default {
  props: {
    data: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
    }
  },

  computed: {
    dragOptions() {
        return {
          animation: 200,
          group: "description",
          disabled: false,
          ghostClass: "ghost"
        };
      }
  },
  methods: {
    getItemKey(item) {
      return getRawComponentContent(item).lc_id;
    },
    getChild(item) {
      const content = getRawComponentContent(item);
      // 适用于没有子节点的节点，例如div，通过这样的操作后可以往一个空的div中拖入内容
      if (!content.__children) {
        content.__children = [];
      }
      return content.__children;
    },

    getRawComponentKey,
    getRawComponentContent,
    onStartDrag(event) {
      event.item.classList.add("is-dragging");
    },
    onClick(event) {
      if (_store.state.currentEditComp) {
        _store.state.currentEditComp.item.classList.remove("is-dragging");
      }

      event.item.classList.add("is-dragging");

      event.vccData = getRawComponentContent(this.data[event.oldIndex]);
      _store.commit('storeCurrentEditComp', event);
    },
    onEndDrag(event) {
      event.item.classList.remove("is-dragging");

      _store.commit('onDragEnd');
    }
  },

  components: {
    draggable
  },
  name: "nested-draggable"
};
</script>
<style scoped lang="scss">
.dragArea {
  min-height: 20px;
  border: 1px dashed rgb(126, 126, 128);
  border-radius: 5px;
  padding-inline-start: 30px;
  padding-right: 2px;
  padding-bottom: 2px;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

p {
  margin: 10px 0;
}

.itemArea {
  min-height: 20px;
  border: 1px dashed rgb(126, 126, 128);
  padding-right: 2px;
  padding-bottom: 2px;
  border-radius: 5px;
  padding-inline-start: 10px;
  margin: 10px 0 0;
}

.is-dragging {
  background-color: rgba(106, 127, 233, 0.274);
  border: 1px dashed rgb(73, 100, 241);
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
</style>