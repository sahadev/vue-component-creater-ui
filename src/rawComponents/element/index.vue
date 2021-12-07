<template >
  <div class="element-class">
    <lc-button></lc-button>
    <lc-table></lc-table>
    <!-- <lc-form ></lc-form>
    <lc-image></lc-image>
    <lc-form-base></lc-form-base>
    <lc-dialog></lc-dialog>
    <lc-icon ></lc-icon>
    <lc-layout ></lc-layout>
    <lc-container ></lc-container>
    <lc-final></lc-final> -->
  </div>
</template>
<script>
import button from "./button.vue";
import table from "./table";
// import icon from "./icon";
// import layout from "./layout";
// import container from "./container";
// import form from "./form";
// import formBase from "./form-base";
// import dialog from "./dialog";
// import image from "./image";
// import final from "./final";

import { deepLCEle } from "@/utils/initRawComponent";

export default {
  data() {
    return {};
  },
  mounted() {
    this.$emit('mounted');
    // 对所有拥有lc-mark的元素进行初始化
    deepLCEle(document.querySelector('.element-class'), () => {
    });
  },
  methods: {},
  components: {
    "lc-button": button,
    "lc-table": table,
    // "lc-icon": icon,
    // "lc-form": form,
    // "lc-layout": layout,
    // "lc-container": container,
    // "lc-form-base": formBase,
    // "lc-dialog": dialog,
    // "lc-image": image,
    // "lc-final": final,
  },
};
</script>
<style scoped>
</style>
<style>
.demonstration-element {
  font-size: 12px;
  color: #1f2f3d;
  padding: 10px 0 10px 0;
  vertical-align: middle;
}

.demonstration-element::before {
  content: "";
  background-color: #4dba87;
  display: inline-block;
  height: 1em;
  margin-right: 4px;
  width: 3px;
  border-radius: 2px;
  vertical-align: middle;
  position: relative;
  top: -1px;
}

.demonstration-element::after {
  content: " :";
  font-weight: 600;
}

.element-class [lc-mark] {
  margin-bottom: 10px;
}
</style>
