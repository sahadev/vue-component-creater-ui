  <template lc_id="6qRH3lc1dt">
      <div lc_id="nqlS2COw0N">
          <div lc_id="D9kF2S4UlD">
              <div class="demonstration-element" lc_id="DH8WXyx5Hd">Radio 单选框</div>
              <el-radio-group v-model="radio" lc-mark lc_id="f0v5GqbM8W">
                  <el-radio :label="3" lc_id="iS/l/lS7uE">备选项</el-radio>
                  <el-radio :label="6" lc_id="PwMXXlWapK">备选项</el-radio>
                  <el-radio :label="9" lc-mark lc_id="kgp2vfR6ti">备选项</el-radio>
              </el-radio-group>
          </div>
          <div lc_id="wwgDyr1OR2">
              <div class="demonstration-element" lc_id="6KW/uZOTEM">Checkbox 多选框</div>
              <el-checkbox-group lc-mark v-model="checkList" lc_id="Uen92zl/6G">
                  <el-checkbox label="复选框 A" lc_id="FgCPjGEWNa"></el-checkbox>
                  <el-checkbox label="复选框 B" lc_id="FAGQbE5NjH"></el-checkbox>
                  <el-checkbox lc-mark label="复选框 C" lc_id="vp/RVl8A/3"></el-checkbox>
              </el-checkbox-group>
          </div>
          <div lc_id="VEDRtauvNm">
              <el-input v-model="input" placeholder="请输入内容" lc-mark lc_id="ffFxjUysQl"></el-input>
              <el-input type="textarea" lc-mark :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textarea2" lc_id="l7XPAnIanl"></el-input>
          </div>
          <div lc_id="4JbZ+JNrQw">
              <div class="demonstration-element" lc_id="qBSKct8boj">InputNumber 计数器</div>
              <div style="display:inline-block;width:200px;" lc-mark lc_id="xBXsSYROtm">
                  <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字" lc_id="6UG1vTaWBN"></el-input-number>
              </div>
              <div style="display:inline-block;width:200px;" lc-mark lc_id="ma8NcOpTT7">
                  <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10" lc_id="UBHeHrcbVw"></el-input-number>
              </div>
          </div>
          <div lc_id="cug4WVKxu9">
              <div class="demonstration-element" lc_id="BkPeGYgetZ">Select 选择器</div>
              <el-select v-model="value" lc-mark placeholder="请选择" lc_id="qB59tUf6Gc">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" lc_id="whLrgIdezr"></el-option>
              </el-select>
          </div>
          <div lc_id="nDNR0MoKZA">
              <div class="demonstration-element" lc_id="p4yqbL8QdC">Cascader 级联选择器</div>
              <el-cascader lc-mark v-model="value2" :options="options2" @change="handleChange" lc_id="nMEiBnay+d"></el-cascader>
          </div>
          <div lc_id="H/A6J6KXiY">
              <div class="demonstration-element" lc_id="1ly5rIkWVS">Switch 开关</div>
              <el-switch lc-mark v-model="value3" active-text="按月付费" inactive-text="按年付费" lc_id="xKdVt8uBzg"></el-switch>
          </div>
          <div lc_id="PnI1SUBtFH">
              <div class="demonstration-element" lc_id="xEukfWny/6">Slider 滑块</div>
              <el-slider lc-mark v-model="value4" lc_id="6y/Uiwq0ZN"></el-slider>
          </div>
          <div lc_id="5dyMzD3j06">
              <div class="demonstration-element" lc_id="ERiurnsreT">TimePicker 时间选择器</div>
              <el-time-select v-model="value5" lc-mark :picker-options="{ start: '08:30', step: '00:15', end: '18:30' }" placeholder="选择时间" lc_id="Sz3vn5DAbX"></el-time-select>
              <el-time-picker lc-mark is-range v-model="value1" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" lc_id="o2nM93CmIm"></el-time-picker>
          </div>
          <div lc_id="xWW1lIgrLe">
              <div class="demonstration-element" lc_id="Sm6zFTno79">DatePicker 日期选择器</div>
              <el-date-picker v-model="value6" lc-mark type="date" placeholder="选择日期" lc_id="5S5Yzx2fXs"></el-date-picker>
              <el-date-picker v-model="dateValue1" lc-mark type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" lc_id="3D+CY23B2Q"></el-date-picker>
          </div>
          <div lc_id="SFEe1Ua3f3">
              <div class="demonstration-element" lc_id="EDwU3s0SZ6">Upload 上传</div>
              <div lc_id="Cco/MVefy1">
                  <el-upload action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple lc-mark :limit="3" :on-exceed="handleExceed" :file-list="fileList" lc_id="7frE/pSrYE">
                      <el-button size="small" type="primary" lc_id="c/5KHeT+LU">点击上传</el-button>
                      <template #tip lc_id="cEzrM0eEXc">
                          <div class="el-upload__tip" lc_id="Vh2iLMvT2c">只能上传jpg/png文件，且不超过500kb</div>
                      </template>
                  </el-upload>
              </div>
              <div lc-mark style="max-width:400px;font-size:12px;" lc_id="NwHRrU2JEM">
图片列表缩略图:                  <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture" lc_id="+hJ7DSkPgT">
                      <el-button size="small" type="primary" lc_id="y3uZKsl9b/">点击上传</el-button>
                      <template #tip lc_id="0JB5ZbGk3I">
                          <div class="el-upload__tip" lc_id="esyAhLLNGI">只能上传jpg/png文件，且不超过500kb</div>
                      </template>
                  </el-upload>
              </div>
              <div lc_id="g/E9ZNwP9E">
                  <el-upload class="upload-demo" lc-mark drag action="https://jsonplaceholder.typicode.com/posts/" multiple lc_id="ADzwW/1hsX">
                      <i class="el-icon-upload" lc_id="FsQAFizcWf"></i>
                      <div class="el-upload__text" lc_id="CCys4DMWDP">
将文件拖到此处，或                          <em lc_id="TbbfPE9Hu+">点击上传</em>
                      </div>
                      <template #tip lc_id="K65M529P0Z">
                          <div class="el-upload__tip" lc_id="4GA0T+3HDL">只能上传jpg/png文件，且不超过500kb</div>
                      </template>
                  </el-upload>
              </div>
          </div>
          <div lc_id="X/f9Q6XT+l">
              <div class="demonstration-element" lc_id="7NKyW9NxNM">Rate 评分</div>
              <el-rate v-model="value7" lc-mark show-text lc_id="gWm2+ckHWm"></el-rate>
          </div>
          <div lc_id="unZHE/lFYS">
              <div class="demonstration-element" lc_id="9gDxl8XOEm">ColorPicker 颜色选择器</div>
              <el-color-picker lc-mark v-model="color1" lc_id="V+9zRMsjFK"></el-color-picker>
          </div>
      </div>
  </template>
  <script>
export default {
  data() {
    return {
      textarea2: "",
      value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      dateValue1: '',
      num: 1,
      imageUrl: '',
      color1: "#409EFF",
      checkList: ["选中且禁用", "复选框 A"],
      radio: 3,
      input: "",
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: 0,

      value2: [],
      options2: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致",
                },
                {
                  value: "fankui",
                  label: "反馈",
                },
                {
                  value: "xiaolv",
                  label: "效率",
                },
                {
                  value: "kekong",
                  label: "可控",
                },
              ],
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航",
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航",
                },
              ],
            },
          ],
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局",
                },
                {
                  value: "color",
                  label: "Color 色彩",
                },
                {
                  value: "typography",
                  label: "Typography 字体",
                },
                {
                  value: "icon",
                  label: "Icon 图标",
                },
                {
                  value: "button",
                  label: "Button 按钮",
                },
              ],
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框",
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框",
                },
                {
                  value: "input",
                  label: "Input 输入框",
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器",
                },
                {
                  value: "select",
                  label: "Select 选择器",
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器",
                },
                {
                  value: "switch",
                  label: "Switch 开关",
                },
                {
                  value: "slider",
                  label: "Slider 滑块",
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器",
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器",
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器",
                },
                {
                  value: "upload",
                  label: "Upload 上传",
                },
                {
                  value: "rate",
                  label: "Rate 评分",
                },
                {
                  value: "form",
                  label: "Form 表单",
                },
              ],
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格",
                },
                {
                  value: "tag",
                  label: "Tag 标签",
                },
                {
                  value: "progress",
                  label: "Progress 进度条",
                },
                {
                  value: "tree",
                  label: "Tree 树形控件",
                },
                {
                  value: "pagination",
                  label: "Pagination 分页",
                },
                {
                  value: "badge",
                  label: "Badge 标记",
                },
              ],
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告",
                },
                {
                  value: "loading",
                  label: "Loading 加载",
                },
                {
                  value: "message",
                  label: "Message 消息提示",
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框",
                },
                {
                  value: "notification",
                  label: "Notification 通知",
                },
              ],
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单",
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页",
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑",
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单",
                },
                {
                  value: "steps",
                  label: "Steps 步骤条",
                },
              ],
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框",
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示",
                },
                {
                  value: "popover",
                  label: "Popover 弹出框",
                },
                {
                  value: "card",
                  label: "Card 卡片",
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯",
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板",
                },
              ],
            },
          ],
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components",
            },
            {
              value: "sketch",
              label: "Sketch Templates",
            },
            {
              value: "jiaohu",
              label: "组件交互文档",
            },
          ],
        },
      ],
      value3: true,
      value4: 28,
      value5: "",
      value6: "",
      value7: 1,
    };
  },
  methods: {
    handleChange(value) { },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
    },

    next() { },
    goBack() {
      console.log("go back");
    },
  },
};  </script>
  <style scoped>.avatar-uploader :v-deep(.el-upload) {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}</style>
