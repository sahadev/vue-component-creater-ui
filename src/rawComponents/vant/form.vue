  <template >
      <div >
          <div >
              <div class="demonstration-vant" >Form 表单:</div>
              <van-form @submit="onSubmit6" lc-mark >
                  <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" ></van-field>
                  <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码" :rules="[{ required: true, message: '请填写密码' }]" ></van-field>
                  <div style="margin: 16px" >
                      <van-button round block type="info" native-type="submit" >提交</van-button>
                  </div>
              </van-form>
          </div>
          <div >
              <div class="demonstration-vant" >Picker 选择器:</div>
              <van-picker title="标题" show-toolbar lc-mark :columns="columns" @confirm="onConfirm" @cancel="onCancel" @change="onChange" ></van-picker>
          </div>
          <div >
              <div class="demonstration-vant" >Rate 评分:</div>
              <van-rate v-model="value" lc-mark ></van-rate>
              <van-rate v-model="value" lc-mark icon="like" void-icon="like-o" ></van-rate>
              <van-rate v-model="value" :size="25" lc-mark color="#ffd21e" void-icon="star" void-color="#eee" ></van-rate>
          </div>
          <div >
              <div class="demonstration-vant" >Search 搜索:</div>
              <div style="padding: 10px 0" >
                  <van-search v-model="search" lc-mark placeholder="请输入搜索关键词" ></van-search>
              </div>
          </div>
          <div >
              <div class="demonstration-vant" >Slider 滑块:</div>
              <div style="margin: 10px" >
                  <van-slider v-model="slideValue" @change="onChange" lc-mark ></van-slider>
              </div>
          </div>
          <div >
              <div class="demonstration-vant" >Stepper 步进器:</div>
              <van-stepper lc-mark v-model="stepValue" ></van-stepper>
          </div>
          <div >
              <div class="demonstration-vant" >Switch 开关:</div>
              <van-switch v-model="checked" lc-mark ></van-switch>
          </div>
          <div >
              <div class="demonstration-vant" >Uploader 文件上传:</div>
              <van-uploader :after-read="afterRead" lc-mark ></van-uploader>
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
