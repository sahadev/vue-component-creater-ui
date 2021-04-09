<template lc_id="4gMSvJvKY0">
  <div class="container" lc_id="4HMe28N4r8">
    <div lc_id="A3EjTeZmpk">{{msg}}</div>
    <div lc-mark lc_id="N1sFlpXGo5">{{propData}}</div>
    <el-button lc-mark @click="onClick('Hi')" lc_id="y8Isu+jsv9">我是一个按钮</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    onClick(value) {
      console.info(value);
    }
  }
}
</script>

<style>
.container {
  text-align: center;
  font-size: 20px;
  color: red;
}
</style>