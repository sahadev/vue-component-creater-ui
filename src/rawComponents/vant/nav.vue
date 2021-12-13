  <template >
      <div >
          <div >
              <div class="demonstration-vant" >Grid 宫格:</div>
              <van-grid lc-mark >
                  <van-grid-item icon="photo-o" text="文字" ></van-grid-item>
                  <van-grid-item icon="photo-o" text="文字" ></van-grid-item>
                  <van-grid-item icon="photo-o" text="文字" ></van-grid-item>
                  <van-grid-item icon="photo-o" text="文字" ></van-grid-item>
              </van-grid>
          </div>
          <div >
              <div class="demonstration-vant" >NavBar 导航栏:</div>
              <van-nav-bar lc-mark title="标题" left-text="返回" right-text="按钮" left-arrow @click-left="onClickLeft" @click-right="onClickRight" ></van-nav-bar>
          </div>
          <div >
              <div class="demonstration-vant" >Pagination 分页:</div>
              <van-pagination lc-mark v-model="currentPage13" :total-items="24" :items-per-page="5" ></van-pagination>
          </div>
          <div >
              <div class="demonstration-vant" >Sidebar 侧边导航:</div>
              <van-sidebar v-model="activeKey" lc-mark >
                  <van-sidebar-item title="标签名称" ></van-sidebar-item>
                  <van-sidebar-item title="标签名称" ></van-sidebar-item>
                  <van-sidebar-item title="标签名称" ></van-sidebar-item>
              </van-sidebar>
          </div>
          <div >
              <div class="demonstration-vant" >Tab 标签页:</div>
              <van-tabs v-model="active14" lc-mark >
                  <van-tab title="标签 1" >内容 1</van-tab>
                  <van-tab title="标签 2" >内容 2</van-tab>
                  <van-tab title="标签 3" >内容 3</van-tab>
                  <van-tab title="标签 4" >内容 4</van-tab>
              </van-tabs>
          </div>
          <div >
              <div class="demonstration-vant" >AddressEdit 地址编辑:</div>
              <van-address-edit :area-list="areaList" show-postal lc-mark show-delete show-set-default show-search-result :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete" @change-detail="onChangeDetail" ></van-address-edit>
          </div>
          <div >
              <div class="demonstration-vant" >AddressList 地址列表:</div>
              <van-address-list v-model="chosenAddressId" :list="list15" lc-mark :disabled-list="disabledList" disabled-text="以下地址超出配送范围" default-tag-text="默认" @add="onAdd" @edit="onEdit" ></van-address-list>
          </div>
          <div >
              <div class="demonstration-vant" >Card 商品卡片:</div>
              <van-card num="2" lc-mark price="2" desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/ipad.jpeg" ></van-card>
          </div>
          <div >
              <div class="demonstration-vant" >ActionBar 行动栏:</div>
              <van-goods-action lc-mark >
                  <van-action-bar-icon icon="chat-o" text="客服" @click="onClickIcon" ></van-action-bar-icon>
                  <van-action-bar-icon icon="cart-o" text="购物车" @click="onClickIcon" ></van-action-bar-icon>
                  <van-action-bar-icon icon="shop-o" text="店铺" @click="onClickIcon" ></van-action-bar-icon>
                  <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" ></van-goods-action-button>
              </van-goods-action>
          </div>
      </div>
  </template>
  <script>
export default {
  data() {
    return {
      checked12: false,
      currentPage13: 1,
      activeKey: 0,
      active14: 2,
      areaList: {},
      searchResult: [],

      chosenAddressId: "1",
      list15: [
        {
          lc_id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          isDefault: true,
        },
        {
          lc_id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号",
        },
      ],
      disabledList: [
        {
          lc_id: "3",
          name: "王五",
          tel: "1320000000",
          address: "浙江省杭州市滨江区江南大道 15 号",
        },
      ],
    };
  },
  methods: {
    onClickIcon() {
      Toast("点击图标");
    },
    onClickButton() {
      Toast("点击按钮");
    },
    onAdd() {
      Toast("新增地址");
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index);
    },
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },
    onSave() {
      Toast("save");
    },
    onDelete() {
      Toast("delete");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
    onSubmit11(){},
    onClickEditAddress(){}
  },
};  </script>
  <style scoped>:v-deep(.van-tabbar--fixed) {
  position: initial;
}
:v-deep(.van-address-list__bottom) {
  position: initial;
}
:v-deep(.van-goods-action) {
  position: initial;
}
:v-deep(.van-submit-bar) {
  position: initial;
}</style>
