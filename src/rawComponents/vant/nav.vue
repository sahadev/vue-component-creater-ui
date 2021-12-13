  <template lc_id="cXvT1i980p">
      <div lc_id="X0BwmaUAxL">
          <div lc_id="n4yYeTlfY4">
              <div class="demonstration" lc_id="BOnp97LdtY">Grid 宫格:</div>
              <van-grid lc-mark lc_id="KIRH5zo4f+">
                  <van-grid-item icon="photo-o" text="文字" lc_id="6YkIklY8ta"></van-grid-item>
                  <van-grid-item icon="photo-o" text="文字" lc_id="gyTy8f9nCD"></van-grid-item>
                  <van-grid-item icon="photo-o" text="文字" lc_id="FFcQt8w+4R"></van-grid-item>
                  <van-grid-item icon="photo-o" text="文字" lc_id="u+YiM7S0jY"></van-grid-item>
              </van-grid>
          </div>
          <div lc_id="grQOCzxbL5">
              <div class="demonstration" lc_id="GtLNeycbRR">NavBar 导航栏:</div>
              <van-nav-bar lc-mark title="标题" left-text="返回" right-text="按钮" left-arrow @click-left="onClickLeft" @click-right="onClickRight" lc_id="o2Bx7VRupj"></van-nav-bar>
          </div>
          <div lc_id="aZfDbteP8j">
              <div class="demonstration" lc_id="gOwjJFiVHX">Pagination 分页:</div>
              <van-pagination lc-mark v-model="currentPage13" :total-items="24" :items-per-page="5" lc_id="JPSbzVOqgO"></van-pagination>
          </div>
          <div lc_id="bCbmHKbI4C">
              <div class="demonstration" lc_id="IDaSkB87oz">Sidebar 侧边导航:</div>
              <van-sidebar v-model="activeKey" lc-mark lc_id="cd4yhlW7dc">
                  <van-sidebar-item title="标签名称" lc_id="WEtUoMeZRw"></van-sidebar-item>
                  <van-sidebar-item title="标签名称" lc_id="dWgUFMU7QR"></van-sidebar-item>
                  <van-sidebar-item title="标签名称" lc_id="vgc/DSO3og"></van-sidebar-item>
              </van-sidebar>
          </div>
          <div lc_id="20kdf/wHf2">
              <div class="demonstration" lc_id="RhlhJnJlZ/">Tab 标签页:</div>
              <van-tabs v-model="active14" lc-mark lc_id="x8BVTEVknI">
                  <van-tab title="标签 1" lc_id="Lu3R2bRF6w">内容 1</van-tab>
                  <van-tab title="标签 2" lc_id="SGRrNbkZFH">内容 2</van-tab>
                  <van-tab title="标签 3" lc_id="fiHxwXV8sJ">内容 3</van-tab>
                  <van-tab title="标签 4" lc_id="5jbS7SyIuT">内容 4</van-tab>
              </van-tabs>
          </div>
          <div lc_id="pRxqHtWksq">
              <div class="demonstration" lc_id="r6Qy4cUMZH">AddressEdit 地址编辑:</div>
              <van-address-edit :area-list="areaList" show-postal lc-mark show-delete show-set-default show-search-result :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete" @change-detail="onChangeDetail" lc_id="JSiWJi2Jzx"></van-address-edit>
          </div>
          <div lc_id="+hc18rAu2j">
              <div class="demonstration" lc_id="1Afn2SvF1w">AddressList 地址列表:</div>
              <van-address-list v-model="chosenAddressId" :list="list15" lc-mark :disabled-list="disabledList" disabled-text="以下地址超出配送范围" default-tag-text="默认" @add="onAdd" @edit="onEdit" lc_id="r3IXN9UTnm"></van-address-list>
          </div>
          <div lc_id="4z0Td0HLQT">
              <div class="demonstration" lc_id="n4/MdzZ0cQ">Card 商品卡片:</div>
              <van-card num="2" lc-mark price="2" desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/ipad.jpeg" lc_id="euVRsjNydZ"></van-card>
          </div>
          <div lc_id="OoRJeoqMiv">
              <div class="demonstration" lc_id="N5I4uAdZ2j">GoodsAction 商品导航:</div>
              <van-goods-action lc-mark lc_id="So8UtQrmBd">
                  <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" lc_id="mClYYrSaDz"></van-goods-action-icon>
                  <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon" lc_id="4w4PyCAiMx"></van-goods-action-icon>
                  <van-goods-action-icon icon="shop-o" text="店铺" @click="onClickIcon" lc_id="5lLRWSSG6s"></van-goods-action-icon>
                  <van-goods-action-button type="danger" text="立即购买" @click="onClickButton" lc_id="nNiv7kfP30"></van-goods-action-button>
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
