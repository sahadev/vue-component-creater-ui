<template >
  <div>
    <div>
      <div class="demonstration-vant">Button 按钮</div>
      <div id="vant-button">
        <van-button lc-mark type="primary">主要按钮</van-button>
        <van-button lc-mark type="success">成功按钮</van-button>
        <van-button lc-mark type="default">默认按钮</van-button>
        <van-button lc-mark type="warning">警告按钮</van-button>
        <van-button lc-mark type="danger">危险按钮</van-button>

        <van-button lc-mark plain type="primary">朴素按钮</van-button>
        <van-button lc-mark plain type="primary">朴素按钮</van-button>

        <van-button lc-mark loading type="primary" />
        <van-button lc-mark loading type="primary" loading-type="spinner" />
        <van-button lc-mark loading type="primary" loading-text="加载中..." />

        <van-button lc-mark square type="primary">方形按钮</van-button>
        <van-button lc-mark round type="primary">圆形按钮</van-button>

        <van-button lc-mark icon="plus" type="primary" />
        <van-button lc-mark icon="plus" type="primary">按钮</van-button>
        <van-button lc-mark icon="https://img.yzcdn.cn/vant/user-active.png" type="primary">
          按钮
        </van-button>

        <van-button lc-mark type="primary" size="large">大号按钮</van-button>
        <van-button lc-mark type="primary" size="normal">普通按钮</van-button>
        <van-button lc-mark type="primary" size="small">小型按钮</van-button>
        <van-button lc-mark type="primary" size="mini">迷你按钮</van-button>

        <van-button lc-mark type="primary" block>块级元素</van-button>

        <van-button lc-mark color="#7232dd">单色按钮</van-button>
        <van-button lc-mark color="#7232dd" plain>单色按钮</van-button>
        <van-button lc-mark color="linear-gradient(to right, #ff6034, #ee0a24)">
          渐变色按钮
        </van-button>
      </div>
    </div>
    <div>
      <div class="demonstration-vant">Cell 单元格</div>
      <van-cell-group lc-mark>
        <van-cell title="单元格" value="内容" />
        <van-cell title="单元格" value="内容" label="描述信息" />
      </van-cell-group>
      <br>
      <van-cell-group inset lc-mark>
        <van-cell title="单元格" value="内容" />
        <van-cell title="单元格" value="内容" label="描述信息" />
      </van-cell-group>
    </div>
  </div>
</template>
  <script>
export default {
  data() {
    return {};
  },
  methods: {},
};  </script>
  <style scoped>
button + button {
  margin-top: 10px;
}

#vant-button > * {
  margin: 0 5px 5px 0;
}
</style>
