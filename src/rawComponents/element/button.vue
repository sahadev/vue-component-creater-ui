  <template lc_id="h951btrjIz">
      <div lc_id="Wys3+gAG6o">
          <div lc_id="xz+q4JsE0H">
              <div class="demonstration-element" lc_id="QOAgJcuNgl">Button 默认按钮</div>
              <el-button lc-mark lc_id="CsCNd5VsAG">默认按钮</el-button>
              <el-button lc-mark type="primary" lc_id="86aZgUKBRW">主要按钮</el-button>
              <el-button lc-mark type="success" lc_id="i9rRR1vGUu">成功按钮</el-button>
              <el-button lc-mark type="info" lc_id="KNdblHt7v/">信息按钮</el-button>
              <el-button lc-mark type="warning" lc_id="6xzwRUzCpX">警告按钮</el-button>
              <el-button lc-mark type="danger" lc_id="n/gRbf1hnb">危险按钮</el-button>
          </div>
          <div lc_id="aS+4+fs63u">
              <div class="demonstration-element" lc_id="eZqzsVXDsz">Button 朴素按钮</div>
              <el-button lc-mark plain lc_id="BC7OoDacJj">朴素按钮</el-button>
              <el-button lc-mark type="primary" plain lc_id="bWC9CeWjjY">主要按钮</el-button>
              <el-button lc-mark type="success" plain lc_id="sVBJspZDuU">成功按钮</el-button>
              <el-button lc-mark type="info" plain lc_id="YUbh6jGrjF">信息按钮</el-button>
              <el-button lc-mark type="warning" plain lc_id="LOykTx4Sf0">警告按钮</el-button>
              <el-button lc-mark type="danger" plain lc_id="0hBjU/hwbY">危险按钮</el-button>
          </div>
          <div lc_id="TIyAo1YWH2">
              <div class="demonstration-element" lc_id="ci4hr/TXbi">Button 圆角按钮</div>
              <el-button lc-mark round lc_id="JGOxzRnIcl">圆角按钮</el-button>
              <el-button lc-mark type="primary" round lc_id="GOolXgPQ8i">主要按钮</el-button>
              <el-button lc-mark type="success" round lc_id="QpK7RbxSP1">成功按钮</el-button>
              <el-button lc-mark type="info" round lc_id="rPNRcyrUBY">信息按钮</el-button>
              <el-button lc-mark type="warning" round lc_id="MCBR6sxh+2">警告按钮</el-button>
              <el-button lc-mark type="danger" round lc_id="KCAVqthQwo">危险按钮</el-button>
          </div>
          <div lc_id="RdvVbD8tRt">
              <div class="demonstration-element" lc_id="MCe1tz7lec">Button 文字按钮</div>
              <el-button lc-mark type="text" lc_id="VzeBeEyMRU">文字按钮</el-button>
              <el-button lc-mark type="text" disabled lc_id="gGBAHuLrE2">文字按钮</el-button>
          </div>
          <div lc_id="fiJ0b+a2C7">
              <div class="demonstration-element" lc_id="NadQOxXAQD">Button 按钮组</div>
              <el-button-group lc-mark lc_id="zPylslsF8c">
                  <el-button type="primary" lc_id="YcgENB34wv">上一页</el-button>
                  <el-button type="primary" lc_id="7ZtWxMoRg5">下一页</el-button>
              </el-button-group>
          </div>
          <div lc_id="x1oSPpUpOu">
              <div class="demonstration-element" lc_id="uVL6JgP+Au">Link 文字链接</div>
              <el-link lc-mark lc_id="dsEhJ0nNvP">默认链接</el-link>
              <el-link lc-mark type="primary" lc_id="b0ksqSWND7">主要链接</el-link>
              <el-link lc-mark type="success" lc_id="n0JFscE5rV">成功链接</el-link>
              <el-link lc-mark type="warning" lc_id="xZ3qu7QdEE">警告链接</el-link>
              <el-link lc-mark type="danger" lc_id="DxB6pyqUDJ">危险链接</el-link>
              <el-link lc-mark type="info" lc_id="oWXSle5p3a">信息链接</el-link>
          </div>
          <div lc_id="XE215BO7ZG">
              <div class="demonstration-element" lc_id="dIss2fOIh1">Tag 标签</div>
              <el-tag lc-mark lc_id="srSB/cYw2J">标签一</el-tag>
              <el-tag lc-mark type="success" lc_id="LRJZ1ZP4ZH">标签二</el-tag>
              <el-tag lc-mark type="info" lc_id="B+b33TM6FV">标签三</el-tag>
              <el-tag lc-mark type="warning" lc_id="VRus6unUUj">标签四</el-tag>
              <el-tag lc-mark type="danger" lc_id="7MofqTTFPE">标签五</el-tag>
          </div>
          <div lc_id="MWF8TZpYmQ">
              <div class="demonstration-element" lc_id="ILdDu9StTB">Avatar 头像</div>
              <el-avatar lc-mark :size="50" :src="circleUrl" lc_id="fRttsgKaqk"></el-avatar>
              <el-avatar lc-mark shape="square" :size="50" :src="squareUrl" lc_id="m8hK+IsKji"></el-avatar>
          </div>
      </div>
  </template>
  <script>
export default {
  data() {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
    };
  },
  methods: {},
};  </script>
  <style scoped>.row {
  margin-bottom: 10px;
}

.icon {
  margin-right: 10px;
  margin-left: 10px;
  font-size: 18px;
}</style>
