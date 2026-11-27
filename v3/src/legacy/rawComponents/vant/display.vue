  <template lc_id="Q6tpxgu3Af">
      <div lc_id="SUq1dM6mx7">
          <div lc_id="bVMFhQWWZi">
              <div class="demonstration-vant" lc_id="aksDVgfMhj">Collapse 折叠面板</div>
              <van-collapse v-model="activeNames" lc-mark lc_id="npKi1y5bk5">
                  <van-collapse-item title="标题1" name="1" lc_id="wlqZiTcBQn">内容</van-collapse-item>
                  <van-collapse-item title="标题2" name="2" lc_id="lVEmjp4jgU">内容</van-collapse-item>
                  <van-collapse-item title="标题3" name="3" disabled lc_id="LJVFOApV8X">内容</van-collapse-item>
              </van-collapse>
          </div>
          <div lc_id="C3lXrwAiNI">
              <div class="demonstration-vant" lc_id="0boIDS47ol">CountDown 倒计时</div>
              <van-count-down :time="time" lc-mark lc_id="/EaLzL88MM"></van-count-down>
              <van-count-down :time="time" lc-mark format="DD 天 HH 时 mm 分 ss 秒" lc_id="lagIK/uwCC"></van-count-down>
              <van-count-down :time="time" lc-mark lc_id="Xyg4NSoxBX">
                  <template #default="timeData" lc_id="tPDMWuGJW6">
                      <span class="block" lc_id="64ZZJDy0a/">{{ timeData.hours }}</span>
                      <span class="colon" lc_id="uOEZ/JgPc8">:</span>
                      <span class="block" lc_id="JqxW3i6P8w">{{ timeData.minutes }}</span>
                      <span class="colon" lc_id="S8yWEUqu8P">:</span>
                      <span class="block" lc_id="uCI9UGXbjM">{{ timeData.seconds }}</span>
                  </template>
              </van-count-down>
          </div>
          <div lc_id="+TRSEJ64CC">
              <div class="demonstration-vant" lc_id="uaaKUshda6">Divider 分割线</div>
              <van-divider lc-mark lc_id="O+mmvHZU5g"></van-divider>
              <van-divider lc-mark lc_id="ZFHen1KfO4">文字</van-divider>
              <van-divider lc-mark content-position="left" lc_id="2YAd2q9KCC">文字</van-divider>
              <van-divider lc-mark content-position="right" lc_id="07IIi1+FZz">文字</van-divider>
              <van-divider lc-mark :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" lc_id="UtOxHb5Qfg">文字</van-divider>
          </div>
          <div lc_id="T6tvspYttI">
              <div class="demonstration-vant" lc_id="tQEA1/gYgR">Empty 空状态</div>
              <van-empty image="error" lc-mark description="描述文字" lc_id="LT8YsAR9bR"></van-empty>
              <van-empty image="network" lc-mark description="描述文字" lc_id="4Y26THSVSF"></van-empty>
              <van-empty image="search" lc-mark description="描述文字" lc_id="XG4M0i9r7v"></van-empty>
          </div>
          <div lc_id="7cp54ntFq/">
              <div class="demonstration-vant" lc_id="NlDW984NIX">List 列表</div>
              <van-list v-model="loading" :finished="finished" lc-mark finished-text="没有更多了" @load="onLoad" lc_id="lPqQztunQp">
                  <van-cell v-for="item in list" :key="item" :title="item" lc_id="5KzyZuonQL"></van-cell>
              </van-list>
          </div>
          <div lc_id="sl50gl586K">
              <div class="demonstration-vant" lc_id="2fzVlX0csX">NoticeBar 通知栏</div>
              <van-notice-bar left-icon="volume-o" lc-mark text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" lc_id="k61bYFFVQm"></van-notice-bar>
              <van-notice-bar scrollable text="技术是开发它的人的共同灵魂。" lc-mark lc_id="hVnGw6dGn5"></van-notice-bar>
              <van-notice-bar :scrollable="false" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" lc-mark lc_id="xlMfxzUiEv"></van-notice-bar>
          </div>
          <div lc_id="7E/zp4vYl5">
              <div class="demonstration-vant" lc_id="Z0VWmNgtun">Progress 进度条</div>
              <div style="margin: 20px 0" lc_id="ihlAnxtUTt">
                  <van-progress :percentage="50" lc-mark lc_id="iN1Pn4Vd84"></van-progress>
              </div>
          </div>
          <div lc_id="mllWNtm7WD">
              <div class="demonstration-vant" lc_id="XU1g37b7Bj">Skeleton 骨架屏</div>
              <van-skeleton title :row="3" lc-mark lc_id="B9ypSupDLY"></van-skeleton>
              <br lc_id="gJKqa1lhDD"/>              <van-skeleton title avatar :row="3" lc-mark lc_id="LH6oqOei+U"></van-skeleton>
          </div>
          <div lc_id="H2zy4AGqzd">
              <div class="demonstration-vant" lc_id="f2BUM74AC2">Steps 步骤条</div>
              <van-steps :active="active" lc-mark lc_id="wIsGLQipbg">
                  <van-step lc_id="wDpEEfwDFg">买家下单</van-step>
                  <van-step lc_id="0uH+uG0y/J">商家接单</van-step>
                  <van-step lc_id="7MxYVitFqU">买家提货</van-step>
                  <van-step lc_id="zmTz+icNFP">交易完成</van-step>
              </van-steps>
              <van-steps direction="vertical" :active="0" lc-mark lc_id="wfouplCxlS">
                  <van-step lc_id="IzJ4DePPuF">
                      <h3 lc_id="fM4sXWg+61">【城市】物流状态1</h3>
                      <p lc_id="plNiYCktIK">2016-07-12 12:40</p>
                  </van-step>
                  <van-step lc_id="EHQFSQQ7XN">
                      <h3 lc_id="+coqZkw2U2">【城市】物流状态2</h3>
                      <p lc_id="lNLIsZhFdm">2016-07-11 10:00</p>
                  </van-step>
                  <van-step lc_id="6L725lSdnl">
                      <h3 lc_id="wYQrSnGkOm">快件已发货</h3>
                      <p lc_id="EAMHuHntXW">2016-07-10 09:30</p>
                  </van-step>
              </van-steps>
          </div>
          <div lc_id="ag50o0J0rJ">
              <div class="demonstration-vant" lc_id="ZKGeQcO9+f">Swipe 轮播</div>
              <div lc_id="hGMjfspfr6">
                  <van-swipe lc-mark class="my-swipe" :autoplay="3000" indicator-color="white" lc_id="vAbfSeM0cO">
                      <van-swipe-item lc_id="kO0d+y55zE">1</van-swipe-item>
                      <van-swipe-item lc_id="WME2UWPHDF">2</van-swipe-item>
                      <van-swipe-item lc_id="ze6m85Fe/y">3</van-swipe-item>
                      <van-swipe-item lc_id="ugTofY2Spf">4</van-swipe-item>
                  </van-swipe>
              </div>
          </div>
      </div>
  </template>
  <script>
export default {
  data() {
    return {
      currentRate: 0,
      gradientColor: {
        "0%": "#3fecff",
        "100%": "#6149f6",
      },
      activeNames: ["1"],
      time: 30 * 60 * 60 * 1000,
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      loading: false,
      finished: false,
      active: 1,
    };
  },
  methods: {
    onLoad() { },
  },
};  </script>
  <style scoped>.colon {
  display: inline-block;
  margin: 0 4px;
  color: #ee0a24;
}
.block {
  display: inline-block;
  width: 22px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: #ee0a24;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}</style>
