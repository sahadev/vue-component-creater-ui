  <template lc_id="03KSNQZ/MV">
      <div lc_id="JoW6e9bEi+">
          <div lc_id="VGGG5BzJK+">
              <div class="demonstration-element" lc_id="LgRs8iauTY">Form 行内表单</div>
              <el-form inline lc-mark :model="formInline" class="demo-form-inline" lc_id="1WJLzNIqg/">
                  <el-form-item label="审批人" lc-mark lc_id="9iLdD7vRhd">
                      <el-input v-model="formInline.user" placeholder="审批人" lc_id="2N8NbmX1qy"></el-input>
                  </el-form-item>
                  <el-form-item label="活动区域" lc-mark lc_id="cuShpTy+7P">
                      <el-select v-model="formInline.region" placeholder="活动区域" lc_id="fblnBhXD33">
                          <el-option label="区域一" value="shanghai" lc_id="xEcFlTO5pD"></el-option>
                          <el-option label="区域二" value="beijing" lc_id="PjVhPT7HZa"></el-option>
                      </el-select>
                  </el-form-item>
              </el-form>
          </div>
          <div lc_id="tY5UywhfnK">
              <div class="demonstration-element" lc_id="Efto0Pndua">Form 表单</div>
              <span lc-mark lc_id="hqHTBq8YqG">
                  <span lc_id="EF8c2VPZRA">Key:</span>
                  <span lc_id="lWbqzj2kHH">Value</span>
              </span>
              <span lc-mark lc_id="cjIUIdSSsS">
                  <b lc_id="ADps8bfr5O">Key:</b>
                  <span lc_id="beSG8unZWU">Value</span>
              </span>
              <span lc-mark lc_id="y29nZqQNoJ">
                  <b lc_id="N9wWIaXqzx">Key:</b>
                  <div label-lc-mark lc_id="/ZBycQe5p/"></div>
              </span>
          </div>
          <div lc_id="PzuXdsu6kd">
              <div class="demonstration-element" lc_id="LdGjb6Df9M">Form 容器</div>
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" lc-mark label-width="100px" class="demo-border" lc_id="Zzz06+mzkO"></el-form>
          </div>
          <div lc_id="8ZewsTbRuD">
              <div class="demonstration-element" lc_id="cX5zh7f+RV">Form 典型表单</div>
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" lc-mark label-width="100px" class="demo-border" lc_id="gx5EBJU9WS">
                  <el-form-item label="活动名称" prop="name" lc-mark lc_id="6md1kDs8qa">
                      <el-input v-model="ruleForm.name" lc_id="QG5eYYTCSB"></el-input>
                  </el-form-item>
                  <el-form-item label="活动区域" prop="region" lc-mark lc_id="tnJTgI76Kp">
                      <el-select v-model="ruleForm.region" placeholder="请选择活动区域" lc_id="nrTlsTbxPM">
                          <el-option label="区域一" value="shanghai" lc_id="mXsEEs0/z0"></el-option>
                          <el-option label="区域二" value="beijing" lc_id="2GzfZP1Cbx"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="活动时间" required lc-mark lc_id="fz4dTVUbEb">
                      <el-col :span="11" lc_id="mmEYR54uQF">
                          <el-form-item prop="date1" lc_id="QkTT/2WWLK">
                              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%" lc_id="G3lxZTQsw5"></el-date-picker>
                          </el-form-item>
                      </el-col>
                      <el-col class="line" :span="2" lc_id="R2NmSO2FCi">-</el-col>
                      <el-col :span="11" lc_id="eOACIzQ+Dq">
                          <el-form-item prop="date2" lc_id="Ub+QEqDUGN">
                              <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%" lc_id="+tkG6VmYdM"></el-time-picker>
                          </el-form-item>
                      </el-col>
                  </el-form-item>
                  <el-form-item label="即时配送" prop="delivery" lc-mark lc_id="Lz8oPy38nU">
                      <el-switch v-model="ruleForm.delivery" lc_id="COO1BlBrjF"></el-switch>
                  </el-form-item>
                  <el-form-item label="文件上传" prop="delivery" lc-mark lc_id="eFNZ7B9jgX">
                      <el-button type="primary" size="small" lc_id="7ZjOmdz3Ur">
上传                          <i class="el-icon-upload el-icon--right" lc_id="IOumsfqV0c"></i>
                      </el-button>
                  </el-form-item>
                  <el-form-item label="自定义form-item" prop="delivery" lc-mark lc_id="g9ZQTRZogP">
                      <div class="demo-border" lc_id="bICnUogCxE"></div>
                  </el-form-item>
                  <el-form-item label="活动性质" prop="type" lc-mark lc_id="u5e4jMDa0Z">
                      <el-checkbox-group v-model="ruleForm.type" lc_id="4odzSgDoVc">
                          <el-checkbox label="美食/餐厅线上活动" name="type" lc_id="qRZK4l23q9"></el-checkbox>
                          <el-checkbox label="地推活动" name="type" lc_id="WbtFV7IdQ0"></el-checkbox>
                          <el-checkbox label="线下主题活动" name="type" lc_id="/fBZC9Wz76"></el-checkbox>
                          <el-checkbox label="单纯品牌曝光" name="type" lc_id="V+qui3Km7r"></el-checkbox>
                      </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="特殊资源" prop="resource" lc-mark lc_id="EfEJRxIgMc">
                      <el-radio-group v-model="ruleForm.resource" lc_id="UaAE0hW4YD">
                          <el-radio label="线上品牌商赞助" lc_id="eVUn2fPBO0"></el-radio>
                          <el-radio label="线下场地免费" lc_id="OhNxMXrfFs"></el-radio>
                      </el-radio-group>
                  </el-form-item>
                  <el-form-item label="活动形式" prop="desc" lc-mark lc_id="1J3SXxTQjA">
                      <el-input type="textarea" v-model="ruleForm.desc" lc_id="KndAAF/3Mu"></el-input>
                  </el-form-item>
                  <el-form-item lc_id="wSyCEJYjUD">
                      <el-button type="primary" @click="submitForm" lc_id="wp2oC1qxYN">立即创建</el-button>
                      <el-button @click="resetForm" lc_id="nWgxJ6a9v+">重置</el-button>
                  </el-form-item>
              </el-form>
          </div>
          <div lc_id="ZrfskHN6gD">
              <div class="demonstration-element" lc_id="dyf31Nksqb">Descriptions 描述列表</div>
              <el-descriptions title="用户信息" lc-mark lc_id="Ih7byjPMdZ">
                  <el-descriptions-item label="用户名" lc-mark lc_id="Hv9orUOCTm">kooriookami</el-descriptions-item>
                  <el-descriptions-item label="手机号" lc_id="Qdr3t2Hdqm">18100000000</el-descriptions-item>
                  <el-descriptions-item label="居住地" lc_id="IcVLWCz0QT">苏州市</el-descriptions-item>
                  <el-descriptions-item label="备注" lc_id="Far2sRRdAW">
                      <el-tag size="small" lc_id="CaE0YkJ1TB">学校</el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="联系地址" lc_id="P7eacW7mxC">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
              </el-descriptions>
              <el-descriptions title="垂直带边框列表" direction="vertical" :column="4" border lc-mark lc_id="k4Y9MNzVZb">
>                  <el-descriptions-item label="用户名" lc_id="YTqOj5iy95">kooriookami</el-descriptions-item>
                  <el-descriptions-item label="手机号" lc_id="qx7ONklayE">18100000000</el-descriptions-item>
                  <el-descriptions-item label="居住地" :span="2" lc_id="Gip/4MIafd">苏州市</el-descriptions-item>
                  <el-descriptions-item label="备注" lc_id="4wYkIRcdbX">
                      <el-tag size="small" lc_id="9iHUBLDbHY">学校</el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="联系地址" lc_id="zfJtvesctl">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
              </el-descriptions>
          </div>
      </div>
  </template>
  <script>
export default {
  data() {
    return {
      radio1: 3,
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
      formInline: {
        user: "",
        region: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    onReset() {
      console.log("submit!");
    },
    submitForm() {
      console.log("submit!");
    },
    resetForm() {
      console.log("submit!");
    },
  },
};  </script>
  <style scoped>.demo-border {
  border: 1px grey dashed;
  min-height: 1rem;
  border-radius: 5px;
}
[label-lc-mark] {
  display: inline-block;
  width: 200px;
  border: 1px grey dashed;
  min-height: 1rem;
  border-radius: 5px;
}</style>
