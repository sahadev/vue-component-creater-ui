  <template lc_id="1FrH/bXxoo">
      <div lc_id="jhcqX3j75w">
          <div lc_id="Tu4in0CaIW">
              <div class="demonstration-element" lc_id="oxVsd4rXLl">Radio 单选框</div>
              <el-radio-group v-model="radio" lc-mark lc_id="0vrFpPvU4H">
                  <el-radio :label="3" lc_id="7sB/IHgMEP">备选项</el-radio>
                  <el-radio :label="6" lc_id="iUKVuE/8U4">备选项</el-radio>
                  <el-radio :label="9" lc-mark lc_id="YKnWJ/dyc+">备选项</el-radio>
              </el-radio-group>
          </div>
          <div lc_id="XIuuMTW+0j">
              <div class="demonstration-element" lc_id="UJkx2Yas25">Checkbox 多选框</div>
              <el-checkbox-group lc-mark v-model="checkList" lc_id="5Ej1enwgPV">
                  <el-checkbox label="复选框 A" lc_id="UjSwDuUvwN"></el-checkbox>
                  <el-checkbox label="复选框 B" lc_id="Lh5ruzddpf"></el-checkbox>
                  <el-checkbox lc-mark label="复选框 C" lc_id="9I+2SXunYS"></el-checkbox>
              </el-checkbox-group>
          </div>
          <div lc_id="t5nTZdVOYh">
              <el-input v-model="input" placeholder="请输入内容" lc-mark lc_id="oQTDIZ45WD"></el-input>
              <el-input type="textarea" lc-mark :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textarea2" lc_id="0Lb1i+lJ+e"></el-input>
          </div>
          <div lc_id="5XvABKZyMr">
              <div class="demonstration-element" lc_id="P4RAkEgdAX">InputNumber 计数器</div>
              <div style="display:inline-block;width:200px;" lc-mark lc_id="33vSscOdJg">
                  <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字" lc_id="ok2OSKYUlS"></el-input-number>
              </div>
              <div style="display:inline-block;width:200px;" lc-mark lc_id="kZfDuqPsUe">
                  <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10" lc_id="ZLZ2cuIsQX"></el-input-number>
              </div>
          </div>
          <div lc_id="zexMdT18+i">
              <div class="demonstration-element" lc_id="RUghSMgJOW">Select 选择器</div>
              <el-select v-model="value" lc-mark placeholder="请选择" lc_id="H9t9iMrAPl">
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" lc_id="GF42PHtHg8"></el-option>
              </el-select>
          </div>
          <div lc_id="V4l/IYxRw8">
              <div class="demonstration-element" lc_id="ASIXtb8VYa">Cascader 级联选择器</div>
              <el-cascader lc-mark v-model="value2" :options="options2" @change="handleChange" lc_id="pPI4GNJgyK"></el-cascader>
          </div>
          <div lc_id="nP4qIv2zGf">
              <div class="demonstration-element" lc_id="CLnpHQZ3Cb">Switch 开关</div>
              <el-switch lc-mark v-model="value3" active-text="按月付费" inactive-text="按年付费" lc_id="QS2PN4VAu6"></el-switch>
          </div>
          <div lc_id="+X3HFNOUDN">
              <div class="demonstration-element" lc_id="duxYsm2Bqk">Slider 滑块</div>
              <el-slider lc-mark v-model="value4" lc_id="pZrnjv27e0"></el-slider>
          </div>
          <div lc_id="0CqPUH7Loi">
              <div class="demonstration-element" lc_id="Kn94f+Qtq6">TimePicker 时间选择器</div>
              <el-time-select v-model="value5" lc-mark :picker-options="{ start: '08:30', step: '00:15', end: '18:30' }" placeholder="选择时间" lc_id="ocidZ8kNvi"></el-time-select>
              <el-time-picker lc-mark is-range v-model="value1" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围" lc_id="ul4df4BXqL"></el-time-picker>
          </div>
          <div lc_id="vIkUj/Mdx4">
              <div class="demonstration-element" lc_id="9BXiYtOw1H">DatePicker 日期选择器</div>
              <el-date-picker v-model="value6" lc-mark type="date" placeholder="选择日期" lc_id="aF5L+DvW8P"></el-date-picker>
              <el-date-picker v-model="dateValue1" lc-mark type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" lc_id="KsspMcw+vf"></el-date-picker>
          </div>
          <div lc_id="z/NsnEmneM">
              <div class="demonstration-element" lc_id="31TQ4nvcpw">Upload 上传</div>
              <div lc_id="XTNxQoBU4c">
                  <el-upload action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple lc-mark :limit="3" :on-exceed="handleExceed" :file-list="fileList" lc_id="koVshztGXe">
                      <el-button size="small" type="primary" lc_id="8K/MngdcDq">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip" lc_id="JhGGSZvOOw">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
              </div>
              <div lc-mark style="max-width:400px;font-size:12px;" lc_id="uVTyfuZHcZ">
用户头像上传:                  <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" lc_id="ggkspVsxtO">
                      <img v-if="imageUrl" :src="imageUrl" class="avatar" lc_id="Xq6mKxhmD2"/>                      <i v-else class="el-icon-plus avatar-uploader-icon" lc_id="yMQJeTHV0Q"></i>
                  </el-upload>
              </div>
              <div lc-mark style="max-width:400px;font-size:12px;" lc_id="oLOYzhC3OV">
图片列表缩略图:                  <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture" lc_id="q2XrT8yeX0">
                      <el-button size="small" type="primary" lc_id="5u/ST0LLg3">点击上传</el-button>
                      <div slot="tip" class="el-upload__tip" lc_id="jtqWimxhcH">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
              </div>
              <div lc_id="+p5NODNW9x">
                  <el-upload class="upload-demo" lc-mark drag action="https://jsonplaceholder.typicode.com/posts/" multiple lc_id="xBGaLT6/i0">
                      <i class="el-icon-upload" lc_id="IYJxHubhoK"></i>
                      <div class="el-upload__text" lc_id="XlmNpvTMq9">
将文件拖到此处，或                          <em lc_id="F1wzfewKQd">点击上传</em>
                      </div>
                      <div class="el-upload__tip" slot="tip" lc_id="kLNHsmuBIJ">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
              </div>
          </div>
          <div lc_id="rmSgFvvDvt">
              <div class="demonstration-element" lc_id="h5uo8CrShR">Rate 评分</div>
              <el-rate v-model="value7" lc-mark show-text lc_id="UK81nB7671"></el-rate>
          </div>
          <div lc_id="G7LuObrLMZ">
              <div class="demonstration-element" lc_id="HeOPHNf8Ew">ColorPicker 颜色选择器</div>
              <el-color-picker lc-mark v-model="color1" lc_id="1pcEEM5BsF"></el-color-picker>
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
