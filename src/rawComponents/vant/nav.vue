  <template lc_id="/QY7monDLp">
      <div lc_id="/ntrNy7wOc">
          <div lc_id="ta6EIAh72H">
              <div class="demonstration-vant" lc_id="ZMbTJO4efl">Grid 宫格</div>
              <van-grid lc-mark lc_id="X08eZY9vTs">
                  <van-grid-item icon="photo-o" text="文字" lc_id="X7rCKONAIT"></van-grid-item>
                  <van-grid-item icon="photo-o" text="文字" lc_id="LMykLYqUkC"></van-grid-item>
                  <van-grid-item icon="photo-o" text="文字" lc_id="E2Hd160o5Q"></van-grid-item>
                  <van-grid-item icon="photo-o" text="文字" lc_id="d34lSEesuk"></van-grid-item>
              </van-grid>
          </div>
          <div lc_id="dS3rIMgHEa">
              <div class="demonstration-vant" lc_id="PMja4pIbgj">NavBar 导航栏</div>
              <van-nav-bar lc-mark title="标题" left-text="返回" right-text="按钮" left-arrow @click-left="onClickLeft" @click-right="onClickRight" lc_id="REnoRWpVUY"></van-nav-bar>
          </div>
          <div lc_id="UhV4g9qnPl">
              <div class="demonstration-vant" lc_id="GEoGgaEQRn">Pagination 分页</div>
              <van-pagination lc-mark v-model="currentPage13" :total-items="24" :items-per-page="5" lc_id="IOGXwSfLUN"></van-pagination>
          </div>
          <div lc_id="DY3MQ06idt">
              <div class="demonstration-vant" lc_id="Y/UGT4oFUC">Sidebar 侧边导航</div>
              <van-sidebar v-model="activeKey" lc-mark lc_id="7AlKZZMGtG">
                  <van-sidebar-item title="标签名称" lc_id="YGZitVPi4d"></van-sidebar-item>
                  <van-sidebar-item title="标签名称" lc_id="hWh5LOl2oL"></van-sidebar-item>
                  <van-sidebar-item title="标签名称" lc_id="TshkJd38qC"></van-sidebar-item>
              </van-sidebar>
          </div>
          <div lc_id="6QKkhZ8evV">
              <div class="demonstration-vant" lc_id="U6vxh2loAk">Tab 标签页</div>
              <van-tabs v-model="active14" lc-mark lc_id="rohxtUBk/l">
                  <van-tab title="标签 1" lc_id="MSSxMZ2ebB">内容 1</van-tab>
                  <van-tab title="标签 2" lc_id="f+cAezYPuU">内容 2</van-tab>
                  <van-tab title="标签 3" lc_id="N36xJv03F6">内容 3</van-tab>
                  <van-tab title="标签 4" lc_id="iy8oej8ecZ">内容 4</van-tab>
              </van-tabs>
          </div>
          <div lc_id="HFSjLBSjr4">
              <div class="demonstration-vant" lc_id="5zilvW7BTu">ActionBar 动作栏</div>
              <div style="position: relative;" lc-mark lc_id="Pt76lmgRrB">
                  <van-action-bar lc_id="9ToRhiLix2">
                      <van-action-bar-icon icon="chat-o" text="客服" @click="onClickIcon" lc_id="+KLvcHu+dq"></van-action-bar-icon>
                      <van-action-bar-icon icon="cart-o" text="购物车" @click="onClickIcon" lc_id="jmPWsraNbw"></van-action-bar-icon>
                      <van-action-bar-icon icon="shop-o" text="店铺" @click="onClickIcon" lc_id="9nvKcSlBKx"></van-action-bar-icon>
                      <van-action-bar-button type="danger" text="立即购买" @click="onClickButton" lc_id="SxUbF/TzkY"></van-action-bar-button>
                  </van-action-bar>
              </div>
          </div>
          <div lc_id="kzIjwCrNnO">
              <div class="demonstration-vant" lc_id="8dbio3vxQH">AddressEdit 地址编辑</div>
              <van-address-edit :area-list="areaList" show-postal lc-mark show-delete show-set-default show-search-result :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @delete="onDelete" @change-detail="onChangeDetail" lc_id="Tn1/r0M9YC"></van-address-edit>
          </div>
          <div lc_id="wa8o497uS2">
              <div class="demonstration-vant" lc_id="eUXBZScEN8">Card 商品卡片</div>
              <van-card num="2" lc-mark price="2" desc="描述信息" title="商品标题" thumb="https://img.yzcdn.cn/vant/ipad.jpeg" lc_id="cBHYsOWBw2"></van-card>
          </div>
          <div lc_id="8m37ZW49xJ">
              <div class="demonstration-vant" lc_id="WFfLIn2BMo">ActionBar 行动栏</div>
              <van-submit-bar style="position: relative;" lc-mark :price="3050" button-text="提交订单" @submit="onSubmit" lc_id="iGAW34dMaI"></van-submit-bar>
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
    onSubmit11() { },
    onClickEditAddress() { },
  },
};  </script>
  <style scoped>:v-deep(.van-tabbar--fixed) {
  position: initial;
}
:v-deep(.van-address-list__bottom) {
  position: relative;
}
:v-deep(.van-submit-bar) {
  position: initial;
}
</style>

<style>
.van-action-bar {
  position: relative;
  padding-bottom: 0;
}

.van-submit-bar {
  z-index: 0;
}
</style>
