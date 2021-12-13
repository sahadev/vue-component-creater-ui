  <template lc_id="4TgPahC6u5">
      <div lc_id="vxLzr2xqjb">
          <div lc_id="tWzGb0zt3I">
              <div class="demonstration-element" @click="dialogVisible = true" lc_id="cjFRJjmxCw">Dialog 对话框</div>
              <div lc-mark lc_id="dIDt4KsNEb">
                  <el-button type="text" lc_id="cmG1+fI232">直接拖我看结果</el-button>
                  <el-dialog title="提示" v-model="dialogVisible" width="30%" :before-close="handleClose" lc_id="W4ORswcE/n">
                      <span lc_id="8Sb2dnGlHq">这是一段信息</span>
                      <span footer class="dialog-footer" lc_id="To3nLHp/kA">
                          <el-button @click="dialogVisible = false" lc_id="gd7Fps6eIs">取 消</el-button>
                          <el-button type="primary" @click="dialogVisible = false" lc_id="fXoFbUbf9l">确 定</el-button>
                      </span>
                  </el-dialog>
              </div>
          </div>
      </div>
  </template>
  <script>
export default {
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => { });
    },
  },
};  </script>
  <style scoped></style>
