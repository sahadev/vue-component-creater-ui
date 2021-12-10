  <template lc_id="T4QTBulnfw">
      <div lc_id="51vNFGmvh3">
          <div lc_id="65mfinsz9a">
              <div class="demonstration-element" lc_id="trHvmrS793">Drawer 抽屉</div>
              <div lc-mark lc_id="GT58r4P5Wk">
                  <el-radio-group v-model="direction" lc_id="A9TjD47V/m">
                      <el-radio label="ltr" lc_id="3JnIViDWTD">从左往右开</el-radio>
                      <el-radio label="rtl" lc_id="//V9WuHsrh">从右往左开</el-radio>
                      <el-radio label="ttb" lc_id="QiPEQRv+sx">从上往下开</el-radio>
                      <el-radio label="btt" lc_id="iP/9XjMVBe">从下往上开</el-radio>
                  </el-radio-group>
                  <el-button @click="drawer = true" type="primary" style="margin-left: 16px;" disabled lc_id="hrOAKkng+k">点我打开</el-button>
                  <el-drawer title="我是标题" v-model="drawer" :direction="direction" :before-close="handleDrawerClose" lc_id="rXvMMLyeYl">
                      <span lc_id="mc44ZyLRo7">我来啦!</span>
                  </el-drawer>
              </div>
          </div>
          <div lc_id="YR/wK0bfUo">
              <div class="demonstration-element" lc_id="E3WQ46Qh+3">Popconfirm 气泡确认框</div>
              <div lc-mark lc_id="BV2HA7n4nF">
                  <el-popconfirm title="这是一段内容确定删除吗？" lc_id="7E1QCXlcDx">
                      <template #reference>
                        <el-button lc_id="L3NACLWO2F">删除</el-button>
                      </template>
                  </el-popconfirm>
              </div>
          </div>
          <div lc_id="N4IfEZ7Epi">
              <div class="demonstration-element" lc_id="IKCjwiwx+W">Popover 弹出框</div>
              <div lc-mark lc_id="HNyqxKw9lC">
                  <el-popover placement="bottom" title="标题" width="200" trigger="click" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。" lc_id="hZL/Yh0bMe">
                      <template #reference>
                        <el-button lc_id="1pN5tai2mM">click 激活</el-button>
                      </template>
                  </el-popover>
              </div>
          </div>
          <div lc_id="/Cu2Xq/CwH">
              <div class="demonstration-element" lc_id="HgnHrhiDVx">Tooltip 文字提示</div>
              <div lc-mark lc_id="Zucoe7eh64">
                  <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start" lc_id="wk1LWx4f2K">
                      <el-button lc_id="njQ+Vlz5uK">上左</el-button>
                  </el-tooltip>
              </div>
          </div>
          <div lc_id="EkQH0AzvZs">
              <div class="demonstration-element" lc_id="qV+/Ma51v8">Transfer 穿梭框</div>
              <div lc-mark lc_id="mNxdbVDp7U">
                  <el-transfer v-model="transferValue" :data="transferData" lc_id="8RAvvEZGCO"></el-transfer>
              </div>
          </div>
      </div>
  </template>
  <script>
export default {
  data() {
    return {
      drawer: false,
      direction: 'rtl',
      count: 0,
      transferData: [{
        key: 0,
        label: `备选项 ${0}`,
      }, {
        key: 1,
        label: `备选项 ${1}`,
      }, {
        key: 2,
        label: `备选项 ${2}`,
      }, {
        key: 3,
        label: `备选项 ${3}`,
      }, {
        key: 4,
        label: `备选项 ${4}`,
      }],
      transferValue: [1, 4]
    };
  },
  methods: {
    handleDrawerClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    load() {
      this.count += 2
    },
  },
};  </script>
  <style scoped></style>
