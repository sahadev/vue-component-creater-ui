<!-- 组件引导文件 -->
<template>
  <div class="antd-class">
    <a-button></a-button>
  </div>
</template>

<script>
import button from './button.vue';
import { deepLCEle } from "@/utils/initRawComponent";

export default {
  props: [],
  components: {
    AButton: button
  },
  data() {
    return {}
  },
  watch: {},
  computed: {},
  beforeCreate() { },
  created() { },
  beforeMount() { },
  mounted() {
    this.$emit('mounted');
    // 对所有拥有lc-mark的元素进行初始化
    deepLCEle(document.querySelector('.antd-class'), () => {
    });
  },
  beforeUpdate() { },
  updated() { },
  destoryed() { },
  methods: {
    request() { },
    onButtonClick() { },
  },
  fillter: {},
}
</script>

<style>
.demonstration-antd {
  font-size: 12px;
  color: #1f2f3d;
  padding: 10px 0 10px 0;
  vertical-align: middle;
}

.demonstration-antd::before {
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

.demonstration-antd::after {
  content: " :";
  font-weight: 600;
}

.antd-class [lc-mark] {
  margin-bottom: 10px;
}
</style>