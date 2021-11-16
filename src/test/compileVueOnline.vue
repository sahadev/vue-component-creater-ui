<template>
  <div class="container" style="min-height: 100%; padding-bottom: 100px;">

    <div>

      <el-input v-model="code" type="textarea" :rows="4" />
      <el-button lc-mark @click="compile">解析</el-button>

    </div>
    <vcc :initCodeEntity="codeStructure" @updateCodeEntity="onCodeUpdate"></vcc>
  </div>
</template>

<script>
import { html2Json } from '../libs/bundle-html2json-esm';
import vcc from '../components-v2/VCC.vue';
import { ergodic } from '../utils/common';

function findAObject(array, propertyName) {
  const module = array.find(function (ele) {
    return ele[propertyName];
  });
  return module || null;
}

export default {
  props: [],
  components: {
    vcc,
  },
  data: () => {
    return {
      code: '',
      codeStructure: ""
    }
  },
  watch: {},
  computed: {},
  beforeCreate: () => { },
  created: () => { },
  beforeMount: () => { },
  mounted: async () => {
  },
  beforeUpdate: () => { },
  updated: () => { },
  destoryed: () => { },
  methods: {
    async compile() {
      const obj = await html2Json(this.code);

      const template = findAObject(obj.root.__children, 'template');

      ergodic(template);

      this.codeStructure = template;

    },
    onCodeUpdate(newCodeEntity) {
      // 编辑后新的代码结构
    }
  },
  fillter: {},
}
</script>

<style scoped>
.container {
}
</style>