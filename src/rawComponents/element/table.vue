  <template lc_id="f5Ag3iA9vi">
      <div lc_id="rC5FKIl93Q">
          <div lc_id="5hZQP7chtb">
              <div class="demonstration-element" lc_id="yKAcBIB8ML">Table 表格</div>
              <el-table :data="tableData" style="width: 100%" lc-mark lc_id="h1AxSuk1JX">
                  <el-table-column prop="date" label="日期" width="180" lc_id="N5KOR7kGoN"></el-table-column>
                  <el-table-column prop="name" label="姓名" width="180" lc_id="v3jApEZujz"></el-table-column>
                  <el-table-column prop="address" label="地址" lc_id="Ryei21Kxoy"></el-table-column>
              </el-table>
          </div>
          <div lc_id="FoIEdS4sgT">
              <div class="demonstration-element" lc_id="9MFKGxfvJ5">Table 动态表格👍</div>
              <el-table :data="tableData" style="width: 100%" lc-mark lc_id="+5AJzAYChF">
                  <el-table-column :prop="propItem.prop" :label="propItem.label" v-for="propItem in propList" :key="propItem.prop" lc_id="gfwgFzB3gO">
                      <template v-slot="{ row }" lc_id="WHqNxzDsFe">
                          <span v-if="!propItem.component" lc_id="isWGW9SLlm">{{
              row[propItem.prop]
            }}</span>
                          <component v-else v-bind:is="propItem.component" :rowinfo="row" lc_id="DktA4JZ5fs"></component>
                      </template>
                  </el-table-column>
              </el-table>
          </div>
          <div lc_id="GHEnA/+R+x">
              <div class="demonstration-element" lc_id="LphVmiAWKZ">Pagination 分页</div>
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" lc-mark layout="prev, pager, next" :total="400" lc_id="V3nz0Q3sZA"></el-pagination>
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
