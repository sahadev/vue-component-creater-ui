<template>
  <div class="vant-class">
    <lc-button></lc-button>
    <lc-icon></lc-icon>
    <lc-layout></lc-layout>
    <lc-form></lc-form>
    <lc-display></lc-display>
    <lc-nav></lc-nav>
  </div>
</template>
<script>
import button from "./button";
import icon from "./icon";
import layout from "./layout";
import form from "./form";
import display from "./display";
import nav from "./nav";

import { deepLCEle } from "@/utils/initRawComponent";


export default {
  data() {
    return {};
  },
  mounted() {
    this.$emit('mounted');
    // 对所有拥有lc-mark的元素进行初始化
    deepLCEle(document.querySelector('.vant-class'), () => {
    });
  },
  methods: {},
  components: {
    "lc-button": button,
    "lc-icon": icon,
    "lc-layout": layout,
    "lc-form": form,
    "lc-display": display,
    "lc-nav": nav,
  },
};
</script>
<style scoped>

</style>

<style>
.demonstration-vant {
  font-size: 12px;
  color: #1f2f3d;
  padding: 10px 0 10px 0;
  vertical-align: middle;
}

.demonstration-vant::before {
  content: "";
  background-color: #0004ff;
  display: inline-block;
  height: 1em;
  margin-right: 4px;
  width: 3px;
  border-radius: 2px;
  vertical-align: middle;
  position: relative;
  top: -1px;
}

.demonstration-vant::after {
  content: " :";
  font-weight: 600;
}

.element-class [lc-mark] {
  margin-bottom: 10px;
}
</style>
