  <template >
  <div>
    <div>
      <div class="demonstration-vant">Collapse 折叠面板</div>
      <van-collapse v-model="activeNames" lc-mark>
        <van-collapse-item title="标题1" name="1">内容</van-collapse-item>
        <van-collapse-item title="标题2" name="2">内容</van-collapse-item>
        <van-collapse-item title="标题3" name="3" disabled>内容</van-collapse-item>
      </van-collapse>
    </div>
    <div>
      <div class="demonstration-vant">CountDown 倒计时</div>
      <van-count-down :time="time" lc-mark></van-count-down>
      <van-count-down :time="time" lc-mark format="DD 天 HH 时 mm 分 ss 秒"></van-count-down>
      <van-count-down :time="time" lc-mark>
        <template #default="timeData">
          <span class="block">{{ timeData.hours }}</span>
          <span class="colon">:</span>
          <span class="block">{{ timeData.minutes }}</span>
          <span class="colon">:</span>
          <span class="block">{{ timeData.seconds }}</span>
        </template>
      </van-count-down>
    </div>
    <div>
      <div class="demonstration-vant">Divider 分割线</div>
      <van-divider lc-mark></van-divider>
      <van-divider lc-mark>文字</van-divider>
      <van-divider lc-mark content-position="left">文字</van-divider>
      <van-divider lc-mark content-position="right">文字</van-divider>
      <van-divider lc-mark :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">文字</van-divider>
    </div>
    <div>
      <div class="demonstration-vant">Empty 空状态</div>
      <van-empty image="error" lc-mark description="描述文字"></van-empty>
      <van-empty image="network" lc-mark description="描述文字"></van-empty>
      <van-empty image="search" lc-mark description="描述文字"></van-empty>
    </div>
    <div>
      <div class="demonstration-vant">List 列表</div>
      <van-list v-model="loading" :finished="finished" lc-mark finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in list" :key="item" :title="item"></van-cell>
      </van-list>
    </div>
    <div>
      <div class="demonstration-vant">NoticeBar 通知栏</div>
      <van-notice-bar left-icon="volume-o" lc-mark text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"></van-notice-bar>
      <van-notice-bar scrollable text="技术是开发它的人的共同灵魂。" lc-mark></van-notice-bar>
      <van-notice-bar :scrollable="false" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" lc-mark></van-notice-bar>
    </div>
    <div>
      <div class="demonstration-vant">Progress 进度条</div>
      <div style="margin: 20px 0">
        <van-progress :percentage="50" lc-mark></van-progress>
      </div>
    </div>
    <div>
      <div class="demonstration-vant">Skeleton 骨架屏</div>
      <van-skeleton title :row="3" lc-mark></van-skeleton>
      <br>
      <van-skeleton title avatar :row="3" lc-mark></van-skeleton>
    </div>
    <div>
      <div class="demonstration-vant">Steps 步骤条</div>
      <van-steps :active="active" lc-mark>
        <van-step>买家下单</van-step>
        <van-step>商家接单</van-step>
        <van-step>买家提货</van-step>
        <van-step>交易完成</van-step>
      </van-steps>
      <van-steps direction="vertical" :active="0" lc-mark>
        <van-step>
          <h3>【城市】物流状态1</h3>
          <p>2016-07-12 12:40</p>
        </van-step>
        <van-step>
          <h3>【城市】物流状态2</h3>
          <p>2016-07-11 10:00</p>
        </van-step>
        <van-step>
          <h3>快件已发货</h3>
          <p>2016-07-10 09:30</p>
        </van-step>
      </van-steps>
    </div>
    <div>
      <div class="demonstration-vant">Swipe 轮播</div>
      <div>
        <van-swipe lc-mark class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item>1</van-swipe-item>
          <van-swipe-item>2</van-swipe-item>
          <van-swipe-item>3</van-swipe-item>
          <van-swipe-item>4</van-swipe-item>
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
  <style scoped>
.colon {
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
}
</style>
