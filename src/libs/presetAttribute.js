export default {
  "el-button": {
    "@click": "onButtonClick",
    size: "small",
  },
  "el-radio-group": {
    "v-model": "radio",
  },
  "el-radio": {
    ":label": 0,
  },
  "el-checkbox-group": {
  },
  "el-link": {
    "@click": "onClickLink",
  },
  "el-select": {
    size: "small",
  },
  "el-input": {
    "v-model": "input",
    placeholder: "请输入内容",
    size: "small",
    class: "input",
  },
  "el-pagination": {
    "@size-change": "handleSizeChange",
    "@current-change": "handleCurrentChange",
    ":current-page": "currentPage",
    ":page-sizes": "[10, 20, 50, 100]",
    ":page-size": "10",
    layout: "total, sizes, prev, pager, next, jumper",
    ":total": "234",
  },
};
