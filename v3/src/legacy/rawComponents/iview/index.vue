<template lc_id="dAurBCE8my">
  <div lc_id="GljJrYaVGn">
    <lc-button lc_id="kyDd9hBXVR"></lc-button>
    <lc-icon lc_id="K7kyO4c23B"></lc-icon>
    <lc-layout lc_id="PWarPxnEQM"></lc-layout>
    <lc-other lc_id="PWarPxnEQM"></lc-other>
  </div>
</template>
<script>
import button from "./button";
import icon from "./icon";
import layout from "./layout";
import other from "./other";

export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    "lc-button": button,
    "lc-icon": icon,
    "lc-layout": layout,
    "lc-other": other,
  },
};
</script>
<style scoped></style>

<style>
.demonstration {
  font-size: 12px;
  color: #1f2f3d;
  padding: 10px 0 10px 0;
  vertical-align: middle;
}

.demonstration::before {
  content: "";
  background-color: #4dba87;
  display: inline-block;
  height: 1em;
  margin-right: 3px;
  width: 3px;
  vertical-align: middle;
}
</style>
