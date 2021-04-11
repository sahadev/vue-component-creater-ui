<template>
  <div id="app" class="con">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>

    <h1 class="n">曙光？</h1>

    <el-button>Button</el-button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss" scoped>
.con {
  font-size: 10px;
  .n {
    font-weight: 600;
    color: red;
  }
}
</style>

<style >
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
