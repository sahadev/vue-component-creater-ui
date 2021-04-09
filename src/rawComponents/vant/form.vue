  <template lc_id="DR/FNHZJqZ">
      <div lc_id="24bH5rQl2F">
          <div lc_id="atBtJKLyCm">
              <div class="demonstration" lc_id="3y9z9Z47GS">Form 表单:</div>
              <van-form @submit="onSubmit6" lc-mark lc_id="EoPM2ATNpm">
                  <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" lc_id="O6Fgj8w4n+"></van-field>
                  <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" lc_id="Nl0MYM/g3c"></van-field>
                  <div style="margin: 16px" lc_id="vYJ3BRtChR">
                      <van-button round block type="info" native-type="submit" lc_id="12PZA2vD3h">提交</van-button>
                  </div>
              </van-form>
          </div>
          <div lc_id="lxVHrXq9mC">
              <div class="demonstration" lc_id="3OFndHfiK5">Picker 选择器:</div>
              <van-picker title="标题" show-toolbar lc-mark :columns="columns" @confirm="onConfirm" @cancel="onCancel" @change="onChange" lc_id="4+c49EB0uo"></van-picker>
          </div>
          <div lc_id="weNmiZPmfp">
              <div class="demonstration" lc_id="nTCCJPPe/n">Rate 评分:</div>
              <van-rate v-model="value" lc-mark lc_id="g+Kzy5x4Kr"></van-rate>
              <van-rate v-model="value" lc-mark icon="like" void-icon="like-o" lc_id="MxdWTpo7dJ"></van-rate>
              <van-rate v-model="value" :size="25" lc-mark color="#ffd21e" void-icon="star" void-color="#eee" lc_id="eQFS/jI9vN"></van-rate>
          </div>
          <div lc_id="3zFCS7kerR">
              <div class="demonstration" lc_id="oAwKiWnxZl">Search 搜索:</div>
              <div style="padding: 10px 0" lc_id="qfsGkTShZq">
                  <van-search v-model="search" lc-mark placeholder="请输入搜索关键词" lc_id="l075Jtm/om"></van-search>
              </div>
          </div>
          <div lc_id="ItLEbBM1rI">
              <div class="demonstration" lc_id="XZBPfFQ+uy">Slider 滑块:</div>
              <div style="margin: 10px" lc_id="tYe6SFm8Yu">
                  <van-slider v-model="slideValue" @change="onChange" lc-mark lc_id="vk2lGyAeE6"></van-slider>
              </div>
          </div>
          <div lc_id="EJVe3qzssi">
              <div class="demonstration" lc_id="LsYGCLb+Ts">Stepper 步进器:</div>
              <van-stepper lc-mark v-model="stepValue" lc_id="g3HFG/X7Yd"></van-stepper>
          </div>
          <div lc_id="ixWu59Yzjp">
              <div class="demonstration" lc_id="k/ISKKGI7j">Switch 开关:</div>
              <van-switch v-model="checked" lc-mark lc_id="hejXKpBb9D"></van-switch>
          </div>
          <div lc_id="t7NvJp/fcO">
              <div class="demonstration" lc_id="jMArnyqQ+6">Uploader 文件上传:</div>
              <van-uploader :after-read="afterRead" lc-mark lc_id="DO92W3pSnQ"></van-uploader>
          </div>
      </div>
  </template>
  <script>
export default {
  data() {
    return {
      stepValue: 1,
      username: "",
      password: "",
      slideValue: 30,
      slideArrValue: [10, 60],
      search: "",
      show: false,
      columns: ["杭州", "宁波", "温州", "绍兴", "湖州", "嘉兴", "金华", "衢州"],
      value: 3,
      checked: true,
    };
  },
  methods: {
    onSubmit6(values) {
      console.log("submit", values);
    },
    onConfirm(value, index) {},
    onChange(picker, value, index) {},
    onCancel() {},
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
  },
};  </script>
  <style scoped></style>
