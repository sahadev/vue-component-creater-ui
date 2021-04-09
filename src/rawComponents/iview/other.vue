  <template lc_id="FUHvEr+64t">
      <div lc_id="hDeJlV4Aht">
          <div lc_id="TcZzK5OcZA">
              <div class="demonstration" lc_id="X5P8vx3FuD">Spin 加载中:</div>
              <spin lc-mark size="large" lc_id="3zvDcghGr3"></spin>
          </div>
          <div lc_id="9JQripHWkU">
              <div class="demonstration" lc_id="yVCfd2SVQG">Timeline 时间轴:</div>
              <timeline lc-mark lc_id="pnxm3z6PUG">
                  <timelineitem color="green" lc_id="7rLMrLAVQu">发布1.0版本</timelineitem>
                  <timelineitem color="green" lc_id="BNFTR06XXk">发布2.0版本</timelineitem>
                  <timelineitem color="red" lc_id="lOroFKEXO1">严重故障</timelineitem>
                  <timelineitem color="blue" lc_id="/uRiQq2nN1">发布3.0版本</timelineitem>
              </timeline>
          </div>
          <div lc_id="VT+ftm3OOc">
              <div class="demonstration" lc_id="PdMd3ZNZh+">Time 相对时间:</div>
              <time :time="time1" lc_id="wmaefvQ6MN" lc-mark></time>
              <time :time="time2" lc-mark lc_id="hlPKHZk0FB"></time>
          </div>
          <div lc_id="hcX1ZmduVG">
              <div class="demonstration" lc_id="8gaUbWiEwx">Circle 进度环:</div>
              <div lc-mark style="display: inline-block;" lc_id="uHKoZ2HJK/">
                  <circle :percent="80" lc_id="jOLaht00x3">
                      <span class="demo-Circle-inner" style="font-size:24px" lc_id="QP+NrGuz4N">80%</span>
                  </circle>
              </div>
              <div lc-mark style="display: inline-block;" lc_id="o47Zo8FncN">
                  <circle :percent="100" stroke-color="#5cb85c" lc_id="mue2J1z5Bd">
                      <icon type="ios-checkmark" size="60" style="color:#5cb85c" lc_id="vg7cORULOJ"></icon>
                  </circle>
              </div>
              <div lc-mark style="display: inline-block;" lc_id="Z/xNVoWyqf">
                  <circle :percent="35" stroke-color="#ff5500" lc_id="BIRqI/YS9P">
                      <span class="demo-Circle-inner" lc_id="6G4CSIudJ9">
                          <icon type="ios-close" size="50" style="color:#ff5500" lc_id="Rf2kfzAdZB"></icon>
                      </span>
                  </circle>
              </div>
          </div>
      </div>
  </template>
  <script>
export default {
  data() {
    return { time1: (new Date()).getTime() - 60 * 3 * 1000, time2: (new Date()).getTime() - 86400 * 3 * 1000 };
  },
  methods: {},
};  </script>
  <style scoped></style>
