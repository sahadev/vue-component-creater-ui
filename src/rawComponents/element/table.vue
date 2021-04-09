  <template lc_id="BHClb68uyL">
      <div lc_id="4wLY9fQl2E">
          <div lc_id="Ko17F4IQXP">
              <div class="demonstration-element" lc_id="vYOpmmF/R0">Table 表格</div>
              <el-table :data="tableData" style="width: 100%" lc-mark lc_id="T6T7c1p16B">
                  <el-table-column prop="date" label="日期" width="180" lc_id="oG9cZ3BlCT"></el-table-column>
                  <el-table-column prop="name" label="姓名" width="180" lc_id="LkLHx3aqOa"></el-table-column>
                  <el-table-column prop="address" label="地址" lc_id="lsXfyqD4Er"></el-table-column>
              </el-table>
          </div>
          <div lc_id="taXbrp1lKH">
              <div class="demonstration-element" lc_id="l2+MLlmW8Y">Table 动态表格👍</div>
              <el-table :data="tableData" style="width: 100%" lc-mark lc_id="Pndn3Vp6Rx">
                  <el-table-column :prop="propItem.prop" :label="propItem.label" v-for="propItem in propList" :key="propItem.prop" lc_id="neIrh92kHU">
                      <template v-slot="{ row }" lc_id="sKUOEvY82H">
                          <span v-if="!propItem.component" lc_id="8Jox7iwljY">{{
              row[propItem.prop]
            }}</span>
                          <component v-else v-bind:is="propItem.component" :rowinfo="row" lc_id="aMR4DSYBZz"></component>
                      </template>
                  </el-table-column>
              </el-table>
          </div>
          <div lc_id="LSgcsWU12G">
              <div class="demonstration-element" lc_id="RW6uK0v/uQ">Pagination 分页</div>
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" lc-mark layout="prev, pager, next" :total="400" lc_id="r+K0+FJnu3"></el-pagination>
          </div>
      </div>
  </template>
  <script>
export default {
  data() {
    return {
      currentPage: 1,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      propList: [
        {
          label: "姓名",
          prop: "name",
        },
        {
          label: "日期",
          prop: "date",
        },
        {
          label: "地址",
          prop: "address",
        },
        {
          label: "动态组件",
          prop: "lc-component",
          component: "el-switch"
        },
      ],
    };
  },
  methods: {
    handleSizeChange() { },
    handleCurrentChange() { },
  },
};  </script>
  <style scoped></style>
