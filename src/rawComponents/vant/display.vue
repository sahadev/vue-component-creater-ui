  <template lc_id="FWZlgoIz7k">
      <div lc_id="CdEbPqzS8u">
          <div lc_id="al4wtaXOth">
              <div class="demonstration" lc_id="GAD8lyrh/F">Collapse 折叠面板:</div>
              <van-collapse v-model="activeNames" lc-mark lc_id="NHP1m713Sm">
                  <van-collapse-item title="标题1" name="1" lc_id="lou8M7Vw0z">内容</van-collapse-item>
                  <van-collapse-item title="标题2" name="2" lc_id="hZfYjF9hBj">内容</van-collapse-item>
                  <van-collapse-item title="标题3" name="3" disabled lc_id="zCEWpIo3xy">内容</van-collapse-item>
              </van-collapse>
          </div>
          <div lc_id="LG+wBn9DxK">
              <div class="demonstration" lc_id="ends06lq8z">CountDown 倒计时:</div>
              <van-count-down :time="time" lc-mark lc_id="m67+4YqOi1"></van-count-down>
              <van-count-down :time="time" lc-mark format="DD 天 HH 时 mm 分 ss 秒" lc_id="cYkyET7swF"></van-count-down>
              <van-count-down :time="time" lc-mark lc_id="0BocO60ey7">
                  <template #default="timeData" lc_id="MrSEGClpbH">
                      <span class="block" lc_id="lwOgGWZcTq">{{ timeData.hours }}</span>
                      <span class="colon" lc_id="bX09EDadV1">:</span>
                      <span class="block" lc_id="bRg5exh+1A">{{ timeData.minutes }}</span>
                      <span class="colon" lc_id="XZIzdLoV0d">:</span>
                      <span class="block" lc_id="YXN3Eu/Nrh">{{ timeData.seconds }}</span>
                  </template>
              </van-count-down>
          </div>
          <div lc_id="irMWGI+oc0">
              <div class="demonstration" lc_id="5CKMbNpOOf">Divider 分割线:</div>
              <van-divider lc-mark lc_id="l6ixnSFszh"></van-divider>
              <van-divider lc-mark lc_id="KZcfOXu8at">文字</van-divider>
              <van-divider lc-mark content-position="left" lc_id="FACZ0whera">文字</van-divider>
              <van-divider lc-mark content-position="right" lc_id="Ulii4eFuq8">文字</van-divider>
              <van-divider lc-mark :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }" lc_id="c95rKKqGx6">文字</van-divider>
          </div>
          <div lc_id="VmlWtppk47">
              <div class="demonstration" lc_id="2d4eERH3DJ">Empty 空状态:</div>
              <van-empty image="error" lc-mark description="描述文字" lc_id="ik4guY1GkT"></van-empty>
              <van-empty image="network" lc-mark description="描述文字" lc_id="dr9w9iLyrK"></van-empty>
              <van-empty image="search" lc-mark description="描述文字" lc_id="JLZXvoxSqX"></van-empty>
          </div>
          <div lc_id="PlS2ExVWhS">
              <div class="demonstration" lc_id="QfAN97i96n">List 列表:</div>
              <van-list v-model="loading" :finished="finished" lc-mark finished-text="没有更多了" @load="onLoad" lc_id="sU8RIzXdxk">
                  <van-cell v-for="item in list" :key="item" :title="item" lc_id="RirHKyqpY5"></van-cell>
              </van-list>
          </div>
          <div lc_id="/0en3vywfE">
              <div class="demonstration" lc_id="K/JhhqbxQ4">NoticeBar 通知栏:</div>
              <van-notice-bar left-icon="volume-o" lc-mark text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" lc_id="gfR1/wu0aO"></van-notice-bar>
              <van-notice-bar scrollable text="技术是开发它的人的共同灵魂。" lc-mark lc_id="4uJf0N5Opt"></van-notice-bar>
              <van-notice-bar :scrollable="false" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" lc-mark lc_id="RbNhbBFW41"></van-notice-bar>
          </div>
          <div lc_id="1ZmJrFMNPB">
              <div class="demonstration" lc_id="ZOAOy/ZhNz">Progress 进度条:</div>
              <div style="margin: 20px 0" lc_id="akMoDkcvIw">
                  <van-progress :percentage="50" lc-mark lc_id="WvuO2CojO+"></van-progress>
              </div>
          </div>
          <div lc_id="ww0l2we4Xp">
              <div class="demonstration" lc_id="i2BQjLfhVO">Skeleton 骨架屏:</div>
              <van-skeleton title :row="3" lc-mark lc_id="O7DJWipRjy"></van-skeleton>
              <van-skeleton title avatar :row="3" lc-mark lc_id="y+0+csYfVG"></van-skeleton>
          </div>
          <div lc_id="144C3rfsPt">
              <div class="demonstration" lc_id="bj/f0lu4Ne">Steps 步骤条:</div>
              <van-steps :active="active" lc-mark lc_id="wlUGMhnXhW">
                  <van-step lc_id="X5E9gZMxKj">买家下单</van-step>
                  <van-step lc_id="2rf27HL1kB">商家接单</van-step>
                  <van-step lc_id="IFUaIPvVqz">买家提货</van-step>
                  <van-step lc_id="r4je8758eH">交易完成</van-step>
              </van-steps>
              <van-steps direction="vertical" :active="0" lc-mark lc_id="GxnmtPTwCF">
                  <van-step lc_id="WDmILFHgLD">
                      <h3 lc_id="r90H33q4wY">【城市】物流状态1</h3>
                      <p lc_id="fvToG/qsgu">2016-07-12 12:40</p>
                  </van-step>
                  <van-step lc_id="MJWiQtkmSy">
                      <h3 lc_id="fNLQIlHYv7">【城市】物流状态2</h3>
                      <p lc_id="+c6wEtOUg9">2016-07-11 10:00</p>
                  </van-step>
                  <van-step lc_id="QI9TlJqg4d">
                      <h3 lc_id="SNxEhUtkgJ">快件已发货</h3>
                      <p lc_id="ylgm0GRWef">2016-07-10 09:30</p>
                  </van-step>
              </van-steps>
          </div>
          <div lc_id="x6DAGm8RUd">
              <div class="demonstration" lc_id="f+IJrjShjq">Swipe 轮播:</div>
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
    onLoad() {},
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
