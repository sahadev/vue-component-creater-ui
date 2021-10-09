<template lc_id="RBFHni4iTs">
  <div lc_id="v91WiYWqPM" class="element-class">
    <lc-button lc_id="pclmcAeMlS"></lc-button>
    <lc-table lc_id="pclmcAeMlS"></lc-table>
    <lc-form lc_id="ZyKgG7bSXm"></lc-form>
    <lc-image></lc-image>
    <lc-form-base></lc-form-base>
    <lc-dialog></lc-dialog>
    <lc-icon lc_id="v31NGzWvBh"></lc-icon>
    <lc-layout lc_id="SBCyi1cZac"></lc-layout>
    <lc-container lc_id="ZyKgG7bSXm"></lc-container>
    <lc-final></lc-final>
  </div>
</template>
<script>
import button from "./button";
import icon from "./icon";
import layout from "./layout";
import container from "./container";
import form from "./form";
import table from "./table";
import formBase from "./form-base";
import dialog from "./dialog";
import image from "./image";
import final from "./final";

import { deepLCEle } from "@/utils/initRawComponent";

export default {
  data() {
    return {};
  },
  mounted() {
    this.$emit('mounted');
    // 对所有拥有lc-mark的元素进行初始化
    let countComponentCount = 0;
    deepLCEle(document.querySelector('.element-class'), () => {
      countComponentCount++;
    });
  },
  methods: {},
  components: {
    "lc-button": button,
    "lc-icon": icon,
    "lc-form": form,
    "lc-layout": layout,
    "lc-container": container,
    "lc-table": table,
    "lc-form-base": formBase,
    "lc-dialog": dialog,
    "lc-image": image,
    "lc-final": final,
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
