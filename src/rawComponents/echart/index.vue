<template>
  <div class="echart-class">
    <Chart />
  </div>
</template>

<script>
import Chart from './chart.vue';
import { deepLCEle } from '@/utils/initRawComponent';

export default {
  components: {
    Chart,
  },
  data() {
    return {};
  },
  mounted() {
    this.$emit('mounted');
    // 对所有拥有lc-mark的元素进行初始化
    deepLCEle(document.querySelector('.echart-class'), () => {});
  },
  provide: {},
};
</script>

<style scoped>
.echart-class {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chart {
  height: 300px;
  width: 100%;
  border: 1px dashed #c6c6c6;
  border-radius: 5px;
}
</style>
