<template lc_id="Bb1LYS7hJm">
  <div class="echart-class" lc_id="OT0KmxfA/e">
    <div style="font-size: 12px">
      Tips: Vcc使用的是vue-echarts，因此实际使用时也需要将vue-echarts集成至项目中使用。
      另外由于渲染器本身的原因，在将eChart拖入到面板之后，<span style="color: red">会有无法正常展示的问题</span>。
      代码本身是没有问题的，在预览模式下也可以正常渲染。
    </div>
    <v-chart
      class="chart"
      style="height: 300px; width: 500px"
      :option="echartPieOption"
      autoresize
      lc-mark
      lc_id="4C2wEjQs0u"
    ></v-chart>
    <v-chart
      class="chart"
      style="height: 300px; width: 500px"
      :option="echartBarOption"
      autoresize
      lc-mark
      lc_id="zQ9T9YQOw3"
    ></v-chart>
  </div>
</template>
<script>
export default {
  data() {
    return {
      echartPieOption: {
        title: {
          text: 'Traffic Sources',
          left: 'center',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines'],
        },
        series: [
          {
            name: 'Traffic Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: 'Direct' },
              { value: 310, name: 'Email' },
              { value: 234, name: 'Ad Networks' },
              { value: 135, name: 'Video Ads' },
              { value: 1548, name: 'Search Engines' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      },
      echartBarOption: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
          },
        ],
      },
    };
  },
  mounted() {},
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
  width: 100% !important;
  border: 1px dashed #c6c6c6;
  border-radius: 5px;
}
</style>
