  <template >
      <div >
          <div >
              <div class="demonstration-vant" >Field 输入框:</div>
              <div lc-mark >
                  <van-field lc-mark v-model="text" label="文本" ></van-field>
                  <van-field lc-mark v-model="tel" type="tel" label="手机号" ></van-field>
                  <van-field lc-mark v-model="digit" type="digit" label="整数" ></van-field>
                  <van-field lc-mark v-model="number" type="number" label="数字" ></van-field>
                  <van-field lc-mark v-model="password" type="password" label="密码" ></van-field>
              </div>
          </div>
          <div >
              <div class="demonstration-vant" >DatetimePicker 时间选择:</div>
              <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" lc-mark :min-date="minDate" :max-date="maxDate" ></van-datetime-picker>
          </div>
          <div >
              <div class="demonstration-vant" >Checkbox 复选框:</div>
              <van-checkbox-group lc-mark v-model="result" >
                  <van-checkbox name="a" >复选框 a</van-checkbox>
                  <van-checkbox lc-mark name="b" >复选框 b</van-checkbox>
              </van-checkbox-group>
          </div>
          <div >
              <div class="demonstration-vant" >Checkbox 复选框(全选与反选):</div>
              <div lc-mark >
                  <van-checkbox-group lc-mark v-model="result" ref="checkboxGroup" >
                      <van-checkbox lc-mark name="a" >复选框 a</van-checkbox>
                      <van-checkbox name="b" >复选框 b</van-checkbox>
                      <van-checkbox name="c" >复选框 c</van-checkbox>
                  </van-checkbox-group>
                  <van-button type="primary" @click="checkAll" >全选</van-button>
                  <van-button type="info" @click="toggleAll" >反选</van-button>
              </div>
          </div>
          <div >
              <van-radio-group lc-mark v-model="radio10" >
                  <van-radio name="1" >单选框 1</van-radio>
                  <van-radio lc-mark name="2" >单选框 2</van-radio>
              </van-radio-group>
              <van-radio-group lc-mark v-model="radio10" >
                  <van-cell-group >
                      <van-cell title="单选框 1" clickable @click="radio10 = '1'" lc-mark >
                          <template #right-icon >
                              <van-radio name="1" ></van-radio>
                          </template>
                      </van-cell>
                      <van-cell title="单选框 2" clickable @click="radio10 = '2'" >
                          <template #right-icon >
                              <van-radio name="2" ></van-radio>
                          </template>
                      </van-cell>
                  </van-cell-group>
              </van-radio-group>
          </div>
      </div>
  </template>
  <script>
export default {
  data() {
    return {
      date: "",
      show: false,
      checked9: true,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      tel: "",
      text: "",
      digit: "",
      number: "",
      password: "",
      result: [],
      radio10: "1",
    };
  },
  methods: {
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm8(date) {
      this.show = false;
      this.date = this.formatDate(date);
    },
    checkAll() {
      this.$refs.checkboxGroup.toggleAll(true);
    },
    toggleAll() {
      this.$refs.checkboxGroup.toggleAll();
    },
  },
};  </script>
  <style scoped></style>
