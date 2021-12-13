  <template lc_id="pF5ZSBfZwR">
      <div lc_id="svh5gymRbT">
          <div lc_id="aklN6TcgSi">
              <div class="demonstration-element" lc_id="H9Bt++Jp23">Container 布局容器</div>
              <el-container lc-mark lc_id="skVZmFc8Z0">
                  <el-header lc_id="ReeksChIDL">Header</el-header>
                  <el-main lc_id="RhO3CzVON+">Main</el-main>
              </el-container>
              <el-container lc-mark lc_id="OiFYUhn3lV">
                  <el-header lc_id="+FKCmp4cKF">Header</el-header>
                  <el-main lc_id="YpteesQGLz">Main</el-main>
                  <el-footer lc_id="KXY8exJPcM">Footer</el-footer>
              </el-container>
              <el-container lc-mark lc_id="wk/2g93ahS">
                  <el-aside width="200px" lc_id="l9E3pIb+2h">Aside</el-aside>
                  <el-main lc_id="bBKBRWXDOx">Main</el-main>
              </el-container>
              <el-container lc-mark lc_id="gbNSQP45GT">
                  <el-header lc_id="HF1qQoD4PL">Header</el-header>
                  <el-container lc_id="ASkvJKvxcV">
                      <el-aside width="200px" lc_id="9KXTLE0CeH">Aside</el-aside>
                      <el-main lc_id="7daXKj/Gvs">Main</el-main>
                  </el-container>
              </el-container>
              <el-container lc-mark lc_id="36KOMxGIdH">
                  <el-header lc_id="Sw6GvGV0eS">Header</el-header>
                  <el-container lc_id="GHVYjFrX+h">
                      <el-aside width="200px" lc_id="uw9FF7J6aL">Aside</el-aside>
                      <el-container lc_id="KvwMo2IxFx">
                          <el-main lc_id="Fk+eYCCPV2">Main</el-main>
                          <el-footer lc_id="dUWCQrWVeT">Footer</el-footer>
                      </el-container>
                  </el-container>
              </el-container>
              <el-container lc-mark lc_id="tL2ICEso4A">
                  <el-aside width="200px" lc_id="csjsUzA+9Y">Aside</el-aside>
                  <el-container lc_id="iZYbDNFziC">
                      <el-header lc_id="vpuQLdTE6A">Header</el-header>
                      <el-main lc_id="mgPG8ueRqA">Main</el-main>
                  </el-container>
              </el-container>
              <el-container lc-mark lc_id="SycDYJbUh8">
                  <el-aside width="200px" lc_id="eCOdbsua/g">Aside</el-aside>
                  <el-container lc_id="RUKLeBxhhi">
                      <el-header lc_id="82WGwD/cl3">Header</el-header>
                      <el-main lc_id="CtffCo/8Cy">Main</el-main>
                      <el-footer lc_id="g0Jcmm2r+P">Footer</el-footer>
                  </el-container>
              </el-container>
          </div>
          <div lc_id="Lg787FEsDw">
              <div class="demonstration-element" lc_id="jlEgJZCE+i">Skeleton 骨架屏</div>
              <el-skeleton lc-mark :rows="6" animated lc_id="4O9hfMet5s"></el-skeleton>
          </div>
          <div lc_id="D3MK6Iq3TG">
              <div class="demonstration-element" lc_id="D6xQ5qpO4B">Empty 空状态</div>
              <el-empty lc-mark description="描述文字" lc_id="sFeXbcNwIE"></el-empty>
          </div>
          <div lc_id="tpbaaOn5XS">
              <div class="demonstration-element" lc_id="6Mnu6i7QPx">Result 结果</div>
              <el-row lc_id="FMdEXTrYSx">
                  <el-col :sm="12" :lg="6" lc_id="deKtOM/g2K">
                      <el-result icon="success" lc-mark title="成功提示" subtitle="请根据提示进行操作" lc_id="iF6n6EUcmn">
                          <template #extra lc_id="iJQp/8XeSP">
                              <el-button type="primary" size="medium" lc_id="UCFmR9EP+q">返回</el-button>
                          </template>
                      </el-result>
                  </el-col>
                  <el-col :sm="12" :lg="6" lc_id="1smWMRRuZr">
                      <el-result icon="warning" lc-mark title="警告提示" subtitle="请根据提示进行操作" lc_id="NIEZCy3gG0">
                          <template #extra lc_id="c6Unj7eQIv">
                              <el-button type="primary" size="medium" lc_id="MDEtfbmEZd">返回</el-button>
                          </template>
                      </el-result>
                  </el-col>
                  <el-col :sm="12" :lg="6" lc_id="2zio5J9ljq">
                      <el-result icon="error" lc-mark title="错误提示" subtitle="请根据提示进行操作" lc_id="kLASzKidTD">
                          <template #extra lc_id="rnIhJqKRjQ">
                              <el-button type="primary" size="medium" lc_id="MhrCBFBHlN">返回</el-button>
                          </template>
                      </el-result>
                  </el-col>
                  <el-col :sm="12" :lg="6" lc_id="h7xNXozZ0s">
                      <el-result icon="info" lc-mark title="信息提示" subtitle="请根据提示进行操作" lc_id="aDXqAjXsST">
                          <template #extra lc_id="nHgp3LGSea">
                              <el-button type="primary" size="medium" lc_id="VURe3Zlhq0">返回</el-button>
                          </template>
                      </el-result>
                  </el-col>
              </el-row>
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
  <style scoped>.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}</style>
