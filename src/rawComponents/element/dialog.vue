  <template lc_id="BQq7/HDDE/">
      <div lc_id="YUxWjuPyzo">
          <div lc_id="G+CBCq3DYP">
              <div class="demonstration-element" lc_id="tr6tZHyaax" @click="dialogVisible = true">Dialog 对话框</div>
              <div lc-mark lc_id="KqRoagSJYH">
                  <el-button type="text" lc_id="IbBWKHUvQx">直接拖我看结果</el-button>
                  <el-dialog title="提示" v-model="dialogVisible" width="30%" :before-close="handleClose" lc_id="kl38EP183o">
                      <span lc_id="o7tyPWHtXQ">这是一段信息</span>
                      <span footer class="dialog-footer" lc_id="4xYQZAAk6B">
                          <el-button @click="dialogVisible = false" lc_id="nlc9K6Rhcp">取 消</el-button>
                          <el-button type="primary" @click="dialogVisible = false" lc_id="mgZZJ553WQ">确 定</el-button>
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
