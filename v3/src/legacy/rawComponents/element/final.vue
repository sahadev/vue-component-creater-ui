  <template lc_id="tcjDDP7Fub">
      <div lc_id="qEWQVtO4HV">
          <div lc_id="ryB2czrr/o">
              <div class="demonstration-element" lc_id="1XMeUcBuC6">Drawer 抽屉</div>
              <div lc-mark lc_id="iopQBcTsL/">
                  <el-radio-group v-model="direction" lc_id="oBXOGHBjIr">
                      <el-radio label="ltr" lc_id="sOtBkShpnA">从左往右开</el-radio>
                      <el-radio label="rtl" lc_id="npclPhSAAr">从右往左开</el-radio>
                      <el-radio label="ttb" lc_id="r21dYPRqlH">从上往下开</el-radio>
                      <el-radio label="btt" lc_id="eNbrmYhimD">从下往上开</el-radio>
                  </el-radio-group>
                  <el-button @click="drawer = true" type="primary" style="margin-left: 16px;" disabled lc_id="LKDidefo88">点我打开</el-button>
                  <el-drawer title="我是标题" v-model="drawer" :direction="direction" :before-close="handleDrawerClose" lc_id="QMf8/82LI6">
                      <span lc_id="wtfxsNwyPw">我来啦!</span>
                  </el-drawer>
              </div>
          </div>
          <div lc_id="VsANkPibgZ">
              <div class="demonstration-element" lc_id="61ILio7Yfy">Popconfirm 气泡确认框</div>
              <div lc-mark lc_id="tipD3v4v0E">
                  <el-popconfirm title="这是一段内容确定删除吗？" lc_id="8wIQQ5fsm0">
                      <template #reference lc_id="VRks4FGAp4">
                          <el-button lc_id="UfoVVwFlH8">删除</el-button>
                      </template>
                  </el-popconfirm>
              </div>
          </div>
          <div lc_id="wLPA+POQar">
              <div class="demonstration-element" lc_id="ViuBm3mn/O">Popover 弹出框</div>
              <div lc-mark lc_id="tk2qy+nwU2">
                  <el-popover placement="bottom" title="标题" width="200" trigger="click" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。" lc_id="E3FQnEvqcg">
                      <template #reference lc_id="w1CDln4qFc">
                          <el-button lc_id="fuAYnHW69Y">click 激活</el-button>
                      </template>
                  </el-popover>
              </div>
          </div>
          <div lc_id="0PvfhG+ZYr">
              <div class="demonstration-element" lc_id="4K55zxXUgL">Tooltip 文字提示</div>
              <div lc-mark lc_id="hxejw7uzbB">
                  <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start" lc_id="XXoofblsAn">
                      <el-button lc_id="C27qPtyTjp">上左</el-button>
                  </el-tooltip>
              </div>
          </div>
          <div lc_id="kDLIM+qGMq">
              <div class="demonstration-element" lc_id="9LXwSf1r1p">Transfer 穿梭框</div>
              <div lc-mark lc_id="Mfn7m1Nz4k">
                  <el-transfer v-model="transferValue" :data="transferData" lc_id="FIK2q2sQGP"></el-transfer>
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
