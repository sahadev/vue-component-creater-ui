  <template lc_id="9ADKEG1pY1">
      <div lc_id="5yOg2+GvFT">
          <div lc_id="oZO8tz/dyX">
              <div class="demonstration" lc_id="45N942KLtV">Field 输入框:</div>
              <div lc-mark lc_id="UqYjYx/KBX">
                  <van-field lc-mark v-model="text" label="文本" lc_id="b7MgunEmTq"></van-field>
                  <van-field lc-mark v-model="tel" type="tel" label="手机号" lc_id="Y7LZUxjdlN"></van-field>
                  <van-field lc-mark v-model="digit" type="digit" label="整数" lc_id="5ewPYrE4HK"></van-field>
                  <van-field lc-mark v-model="number" type="number" label="数字" lc_id="n0p/SokGmz"></van-field>
                  <van-field lc-mark v-model="password" type="password" label="密码" lc_id="V9yh+GQKaQ"></van-field>
              </div>
          </div>
          <div lc_id="Ab1jH0X4NI">
              <div class="demonstration" lc_id="3AJt8tNokQ">DatetimePicker 时间选择:</div>
              <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" lc-mark :min-date="minDate" :max-date="maxDate" lc_id="rezVLuvlUG"></van-datetime-picker>
          </div>
          <div lc_id="3BePuwECBJ">
              <div class="demonstration" lc_id="+fzSFTPIQF">Checkbox 复选框:</div>
              <van-checkbox-group lc-mark v-model="result" lc_id="XThMoK/vZb">
                  <van-checkbox name="a" lc_id="xdXR9sKCbd">复选框 a</van-checkbox>
                  <van-checkbox lc-mark name="b" lc_id="vFKoi6Funy">复选框 b</van-checkbox>
              </van-checkbox-group>
          </div>
          <div lc_id="7R09njyB3T">
              <div class="demonstration" lc_id="/HvpCxdspK">Checkbox 复选框(全选与反选):</div>
              <div lc-mark lc_id="YgXXhE7W+9">
                  <van-checkbox-group lc-mark v-model="result" ref="checkboxGroup" lc_id="OiAgei1EXV">
                      <van-checkbox lc-mark name="a" lc_id="sjbFCxxz/p">复选框 a</van-checkbox>
                      <van-checkbox name="b" lc_id="yYVOOb/1RZ">复选框 b</van-checkbox>
                      <van-checkbox name="c" lc_id="Rvj67audAF">复选框 c</van-checkbox>
                  </van-checkbox-group>
                  <van-button type="primary" @click="checkAll" lc_id="U9K6s0pyvI">全选</van-button>
                  <van-button type="info" @click="toggleAll" lc_id="eZ3mkc4ICh">反选</van-button>
              </div>
          </div>
          <div lc_id="LBjqkyrXOs">
              <van-radio-group lc-mark v-model="radio10" lc_id="ovdGBkUOvJ">
                  <van-radio name="1" lc_id="DbM//NurKd">单选框 1</van-radio>
                  <van-radio lc-mark name="2" lc_id="VPyOFHQGBT">单选框 2</van-radio>
              </van-radio-group>
              <van-radio-group lc-mark v-model="radio10" lc_id="J084nRkBWL">
                  <van-cell-group lc_id="WGL/0JlEj5">
                      <van-cell title="单选框 1" clickable @click="radio10 = '1'" lc-mark lc_id="HzMpjZ1KWJ">
                          <template #right-icon lc_id="Z0oAjYoh4X">
                              <van-radio name="1" lc_id="KC5SvVU1VV"></van-radio>
                          </template>
                      </van-cell>
                      <van-cell title="单选框 2" clickable @click="radio10 = '2'" lc_id="8mHXYj/eYJ">
                          <template #right-icon lc_id="qZNXcxntEt">
                              <van-radio name="2" lc_id="qTnex0Yi0c"></van-radio>
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
