  <template lc_id="anH31Ve4it">
      <div lc_id="jGXHcHiq3e">
          <div lc_id="91CnIXMNmu">
              <div class="demonstration" lc_id="21KL5PSw4l">Ajax请求状态栏:</div>
              <q-ajax-bar ref="bar" position="bottom" color="accent" size="10px" lc-mark skip-hijack lc_id="JVlU6cP5TA"></q-ajax-bar>
              <q-btn color="primary" label="试用" @click="trigger" lc_id="J2ht164ML6"></q-btn>
          </div>
          <div lc_id="XP6rQhp7oM">
              <q-avatar color="red" text-color="white" icon="directions" lc_id="pwj8GFBVQv"></q-avatar>
              <q-avatar color="primary" text-color="white" lc_id="0qf3+FbFs6">J</q-avatar>
              <q-avatar size="24px" color="orange" lc_id="L8Q3j85Pyl">J</q-avatar>
              <q-avatar lc_id="krL7LBFqr/">
                  <img src="https://cdn.quasar.dev/img/avatar.png" lc_id="etxQu7jtza"/>              </q-avatar>
          </div>
      </div>
  </template>
  <script lc_id="MXAPuur7w+">import {
  fabApple,
  fasSignal,
  fasWifi,
  fasBatteryFull
} from '@quasar/extras/fontawesome-v5'
export default {
  data() {
    return {
      // 在此自动生成
      fabApple,
      fasSignal,
      fasWifi,
      fasBatteryFull
    };
  },
  beforeCreate() { },
  created() { },
  beforeMount() { },
  mounted() { },
  beforeUpdate() { },
  updated() { },
  destroyed() { },
  methods: {
    // 在此自动生成
    request() {
      // 网络请求，可选
    },
    trigger() {
      const bar = this.$refs.bar
      bar.start()
      this.timer = setTimeout(() => {
        if (this.$refs.bar) {
          this.$refs.bar.stop()
        }
      }, Math.random() * 3000 + 1000)
    },
  },
  watch: {},
  computed: {},
  fillter: {},
};</script>
  <style scoped lc_id="oeMLlYmnCS"></style>
