  <template lc_id="7cADZ+9vIL">
      <div lc_id="paR1gkzb2P">
          <div lc_id="xpLawHH5Ks">
              <div class="demonstration" lc_id="LXAb8pRrmp">Button 按钮:</div>
              <van-button lc-mark type="primary" lc_id="SrEHhpiQFn">Primary</van-button>
              <van-button lc-mark type="info" lc_id="y5KpXFwN4Y">Info</van-button>
              <van-button lc-mark type="default" lc_id="lys06/4mtk">Default</van-button>
              <van-button lc-mark type="danger" lc_id="vYu5fg0ITt">Danger</van-button>
              <van-button lc-mark type="warning" lc_id="gKMFNxDPu4">Warning</van-button>
              <van-button lc-mark plain type="primary" lc_id="5ggxtP8mY7">朴素按钮</van-button>
              <van-button lc-mark plain type="info" lc_id="J2aDU2i24z">朴素按钮</van-button>
              <van-button lc-mark loading type="primary" lc_id="hrHD1DGPGe"></van-button>
              <van-button lc-mark loading type="primary" loading-type="spinner" lc_id="fezG6odQJ0"></van-button>
              <van-button lc-mark loading type="info" loading-text="加载中..." lc_id="xvgVvk/peN"></van-button>
          </div>
          <div lc_id="nQa+C7dPYW">
              <div class="demonstration" lc_id="hvf2MQVJPH">Cell 单元格:</div>
              <van-cell-group lc-mark lc_id="9r3MUvTPyx">
                  <van-cell title="单元格" value="内容" lc_id="yCbsNk6GF+"></van-cell>
                  <van-cell title="单元格" value="内容" label="描述信息" lc_id="+30wYnfplY"></van-cell>
                  <van-cell title="单元格" icon="location-o" lc_id="hxvJ+bSzIM"></van-cell>
                  <van-cell title="单元格" is-link arrow-direction="down" value="内容" lc_id="vXMVp6xR7q"></van-cell>
              </van-cell-group>
          </div>
      </div>
  </template>
  <script>
export default {
  data() {
    return {};
  },
  methods: {},
};  </script>
  <style scoped>button + button {
  margin-top: 10px;
}</style>
