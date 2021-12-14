  <template lc_id="mUQG+E4AcV">
  <div lc_id="AacFAo8xlp">
    <div lc_id="H8AE6/LSfT">
      <div class="demonstration-vant" lc_id="BW6xbV1Jkz">Button 按钮</div>
      <div id="vant-button" lc_id="0xAc0+UTl0">
        <van-button lc-mark type="primary" lc_id="O1Kc1IjqyA">主要按钮</van-button>
        <van-button lc-mark type="success" lc_id="LWUrTRjiN3">成功按钮</van-button>
        <van-button lc-mark type="default" lc_id="Lor6xJLyXO">默认按钮</van-button>
        <van-button lc-mark type="warning" lc_id="B2mwHpjnn4">警告按钮</van-button>
        <van-button lc-mark type="danger" lc_id="g8aJMV07tv">危险按钮</van-button>
        <van-button lc-mark plain type="primary" lc_id="B6Z0HCAfII">朴素按钮</van-button>
        <van-button lc-mark plain type="primary" lc_id="Kl0A4kmfxN">朴素按钮</van-button>
        <van-button lc-mark loading type="primary" lc_id="H7ASlo2i6q">
          <van-button lc-mark loading type="primary" loading-type="spinner" lc_id="DYCEFZzcgc">
            <van-button lc-mark loading type="primary" loading-text="加载中..." lc_id="SS7BJIzMsg">
              <van-button lc-mark square type="primary" lc_id="S7BYt/eLuR">方形按钮</van-button>
              <van-button lc-mark round type="primary" lc_id="xqEMwr1sRA">圆形按钮</van-button>
              <van-button lc-mark icon="plus" type="primary" lc_id="7ja7xPbWmm">
                <van-button lc-mark icon="plus" type="primary" lc_id="XG3GYBBrEU">按钮</van-button>
                <van-button lc-mark icon="https://img.yzcdn.cn/vant/user-active.png" type="primary" lc_id="X//pnSGqLF">
                  按钮</van-button>
                <van-button lc-mark type="primary" size="large" lc_id="pwjoF9kQPG">大号按钮</van-button>
                <van-button lc-mark type="primary" size="normal" lc_id="1ShXXx6uM0">普通按钮</van-button>
                <van-button lc-mark type="primary" size="small" lc_id="NJoWdzL3ps">小型按钮</van-button>
                <van-button lc-mark type="primary" size="mini" lc_id="hOCsi5Nd7f">迷你按钮</van-button>
                <van-button lc-mark type="primary" block lc_id="0MRQ5LCYcF">块级元素</van-button>
                <van-button lc-mark color="#7232dd" lc_id="nrrWnpVDmN">单色按钮</van-button>
                <van-button lc-mark color="#7232dd" plain lc_id="l0tFmVZGj9">单色按钮</van-button>
                <van-button lc-mark color="linear-gradient(to right, #ff6034, #ee0a24)" lc_id="RXwG5PrfLY">渐变色按钮
                </van-button>
              </van-button>
            </van-button>
          </van-button>
        </van-button>
      </div>
    </div>
    <div lc_id="an/3DkuLE6">
      <div class="demonstration-vant" lc_id="w8jEqp6M5d">Cell 单元格</div>
      <van-cell-group lc-mark lc_id="YIna8H61Ze">
        <van-cell title="单元格" value="内容" lc_id="TFcKdvoBUi">
          <van-cell title="单元格" value="内容" label="描述信息" lc_id="wCy+AFO6oA"></van-cell>
        </van-cell>
      </van-cell-group>
      <br>
      <van-cell-group inset lc-mark lc_id="GDUu8grqyq">
        <van-cell title="单元格" value="内容" lc_id="R/yvDgWEzu">
          <van-cell title="单元格" value="内容" label="描述信息" lc_id="nH8Z1dpWkB"></van-cell>
        </van-cell>
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
  <style scoped>
button + button {
  margin-top: 10px;
}

#vant-button > * {
  margin: 0 5px 5px 0;
}
</style>
