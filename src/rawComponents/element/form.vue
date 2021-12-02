  <template lc_id="dONI+eltfy">
      <div lc_id="pYW7lbQNBm">
          <div lc_id="Q9ouPvVCDr">
              <div class="demonstration-element" lc_id="QS2gym2BZJ">Form 行内表单</div>
              <el-form inline lc-mark :model="formInline" class="demo-form-inline" lc_id="WsfIP160bw">
                  <el-form-item label="审批人" lc_id="nwnVQASGS0" lc-mark>
                      <el-input v-model="formInline.user" placeholder="审批人" lc_id="fyTWqa6xR3"></el-input>
                  </el-form-item>
                  <el-form-item label="活动区域" lc_id="eofsdbRMjx" lc-mark>
                      <el-select v-model="formInline.region" placeholder="活动区域" lc_id="+2rUZ3W3aC">
                          <el-option label="区域一" value="shanghai" lc_id="IHvRkwasBm"></el-option>
                          <el-option label="区域二" value="beijing" lc_id="TR+GgYcJ6L"></el-option>
                      </el-select>
                  </el-form-item>
              </el-form>
          </div>
          <div lc_id="RDjCjjhD6t">
              <div class="demonstration-element" lc_id="rfAmqnOfPE">Form 表单</div>
              <span lc-mark lc_id="RAHdW2D6Om">
                  <span lc_id="c4he125BD/">Key:</span>
                  <span lc_id="XQkdV8NCZs">Value</span>
              </span>
              <span lc-mark lc_id="7aLYLrp+/S">
                  <b lc_id="rO/kiINZrQ">Key:</b>
                  <span lc_id="6hy1WShna9">Value</span>
              </span>
              <span lc-mark lc_id="PJogpEwg0Q">
                  <b lc_id="BVD6vZZXln">Key:</b>
                  <div lc_id="9PkvdAl5Pg" label-lc-mark></div>
              </span>
          </div>
          <div lc_id="mL5ltGQ2+1">
              <div class="demonstration-element" lc_id="2ckgf6ruBF">Form 容器</div>
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" lc-mark label-width="100px" class="demo-border" lc_id="gUzm9BtYBr"></el-form>
          </div>
          <div lc_id="4tNJzbfZpl">
              <div class="demonstration-element" lc_id="q2A/v0bGPa">Form 典型表单</div>
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" lc-mark label-width="100px" class="demo-border" lc_id="+J7wuw2kfG">
                  <el-form-item label="活动名称" prop="name" lc_id="8zJ3QynhGf" lc-mark>
                      <el-input v-model="ruleForm.name" lc_id="+0z/Usri5w"></el-input>
                  </el-form-item>
                  <el-form-item label="活动区域" prop="region" lc_id="BQknWoGJD1" lc-mark>
                      <el-select v-model="ruleForm.region" placeholder="请选择活动区域" lc_id="BsYEO5rf2i">
                          <el-option label="区域一" value="shanghai" lc_id="WZgkAhC9vv"></el-option>
                          <el-option label="区域二" value="beijing" lc_id="q96ygTFk/B"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="活动时间" required lc_id="3hYK5tYClq" lc-mark>
                      <el-col :span="11" lc_id="2/zvr1UBRS">
                          <el-form-item prop="date1" lc_id="SRsyrJFuY7">
                              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%" lc_id="ut4BH5tRjv"></el-date-picker>
                          </el-form-item>
                      </el-col>
                      <el-col class="line" :span="2" lc_id="cYnewYwc7x">-</el-col>
                      <el-col :span="11" lc_id="CDem+Jbdu6">
                          <el-form-item prop="date2" lc_id="mU9tDRBd+N">
                              <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%" lc_id="IgAhjz/1Sa"></el-time-picker>
                          </el-form-item>
                      </el-col>
                  </el-form-item>
                  <el-form-item label="即时配送" prop="delivery" lc_id="BSjAgD4RBz" lc-mark>
                      <el-switch v-model="ruleForm.delivery" lc_id="dHzXy9Kd9/"></el-switch>
                  </el-form-item>
                  <el-form-item label="文件上传" prop="delivery" lc_id="bO0otoJGdo" lc-mark>
                      <el-button type="primary" size="small" lc_id="be1qikAvG/">
上传                          <i class="el-icon-upload el-icon--right" lc_id="7wBx/Um7eK"></i>
                      </el-button>
                  </el-form-item>
                  <el-form-item label="自定义form-item" prop="delivery" lc_id="QJ3NN+wUEW" lc-mark>
                      <div class="demo-border" lc_id="gWcKKmRXlJ"></div>
                  </el-form-item>
                  <el-form-item label="活动性质" prop="type" lc_id="oLunX/GRuH" lc-mark>
                      <el-checkbox-group v-model="ruleForm.type" lc_id="++4Bda/NVN">
                          <el-checkbox label="美食/餐厅线上活动" name="type" lc_id="+wC1g9MHna"></el-checkbox>
                          <el-checkbox label="地推活动" name="type" lc_id="sdCzrXAT2y"></el-checkbox>
                          <el-checkbox label="线下主题活动" name="type" lc_id="gTsBARyLOu"></el-checkbox>
                          <el-checkbox label="单纯品牌曝光" name="type" lc_id="TDBRWL+ui/"></el-checkbox>
                      </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="特殊资源" prop="resource" lc_id="AIVW6a+WMo" lc-mark>
                      <el-radio-group v-model="ruleForm.resource" lc_id="arM0Xl8Ow8">
                          <el-radio label="线上品牌商赞助" lc_id="kFYdyqdoNE"></el-radio>
                          <el-radio label="线下场地免费" lc_id="9NfIeEmiWw"></el-radio>
                      </el-radio-group>
                  </el-form-item>
                  <el-form-item label="活动形式" prop="desc" lc_id="b5oLJSA9VW" lc-mark>
                      <el-input type="textarea" v-model="ruleForm.desc" lc_id="Kjz00qg2bm"></el-input>
                  </el-form-item>
                  <el-form-item lc_id="8uphY++lpC">
                      <el-button type="primary" @click="submitForm" lc_id="iaY/zpWjSS">立即创建</el-button>
                      <el-button @click="resetForm" lc_id="KxBu2mPKhs">重置</el-button>
                  </el-form-item>
              </el-form>
          </div>
          <div lc_id="dyK4shOTgK">
              <div class="demonstration-element" lc_id="OPhwbT6T5C">Descriptions 描述列表</div>
              <el-descriptions title="用户信息" lc-mark lc_id="UcepzqrI8T">
                  <el-descriptions-item label="用户名" lc-mark lc_id="61qM0Gdqq3">kooriookami</el-descriptions-item>
                  <el-descriptions-item label="手机号" lc_id="p9NL7l0+yS">18100000000</el-descriptions-item>
                  <el-descriptions-item label="居住地" lc_id="gA+SOSpqT1">苏州市</el-descriptions-item>
                  <el-descriptions-item label="备注" lc_id="MpLSTs1V1a">
                      <el-tag size="small" lc_id="x+3JGPZLjM">学校</el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="联系地址" lc_id="OoN2WiOmV9">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
              </el-descriptions>
              <el-descriptions title="垂直带边框列表" direction="vertical" :column="4" border lc-mark lc_id="szloMrlo+J">
>                  <el-descriptions-item label="用户名" lc_id="eiu+5s736W">kooriookami</el-descriptions-item>
                  <el-descriptions-item label="手机号" lc_id="5jN1FMg0JM">18100000000</el-descriptions-item>
                  <el-descriptions-item label="居住地" :span="2" lc_id="0kqZ2EOUJ/">苏州市</el-descriptions-item>
                  <el-descriptions-item label="备注" lc_id="iSiDebVpZg">
                      <el-tag size="small" lc_id="gy68yv4szb">学校</el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item label="联系地址" lc_id="FOfDHeKGh6">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
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
