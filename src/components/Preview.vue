<template>
  <div ref="container" id="container">
    <div ref="iframe"></div>
  </div>
</template>

<style scoped>
#container {
  height: 100%;
  width: 100%;
}
</style>

<script>
import createIframe from '@/utils/iframe';

const sandboxAttributes = [
  'allow-modals',
  'allow-forms',
  'allow-pointer-lock',
  'allow-popups',
  'allow-same-origin',
  'allow-scripts'
];

export default {
  props: ['value'],

  mounted() {
    this.iframe = createIframe({
      container: this.$refs.container,
      el: this.$refs.iframe,
      sandboxAttributes
    });
  },

  watch: {
    value(val) {
      this.iframe.setHTML(val);
    }
  }
};
</script>