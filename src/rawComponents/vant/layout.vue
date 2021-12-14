  <template lc_id="oV+qpNVI6k">
  <div lc_id="m5KY8rTxt1">
    <div lc_id="5CmAJnEb1P">
      <div class="demonstration-vant" lc_id="SM70eEXO+9">Field 输入框</div>
      <div lc-mark style="padding: 10px;" lc_id="f/reOjq1IJ">
        <van-field lc-mark v-model="text" label="文本" lc_id="DIxZNSoiax"></van-field>
        <van-field lc-mark v-model="tel" type="tel" label="手机号" lc_id="mmGmLLyGW5"></van-field>
        <van-field lc-mark v-model="digit" type="digit" label="整数" lc_id="T+vzBFNZhS"></van-field>
        <van-field lc-mark v-model="number" type="number" label="数字" lc_id="O36q2Fx7Xv"></van-field>
        <van-field lc-mark v-model="password" type="password" label="密码" lc_id="dk6ah1vXDq"></van-field>
      </div>
    </div>
    <div lc_id="L5fPGRqjYZ">
      <div class="demonstration-vant" lc_id="3qMdltHE4i">DatetimePicker 时间选择 ❌</div>
      <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" lc-mark :min-date="minDate"
        :max-date="maxDate" lc_id="14vPN9ntBV"></van-datetime-picker>
    </div>
    <div lc_id="ODgqdaL6ED">
      <div class="demonstration-vant" lc_id="hrPSBFZ6Hh">Checkbox 复选框</div>
      <van-checkbox-group lc-mark v-model="result" lc_id="F2p5QIbo3W">
        <van-checkbox name="a" lc_id="90jCPURt8o">复选框 a</van-checkbox>
        <van-checkbox lc-mark name="b" lc_id="bvtnBJfQnk">复选框 b</van-checkbox>
      </van-checkbox-group>
    </div>
    <div lc_id="V9/vkUb/HX">
      <div class="demonstration-vant" lc_id="hnZi6s2mpt">Checkbox 复选框(全选与反选)</div>
      <div lc-mark lc_id="JHg6xi7Ws5">
        <van-checkbox-group v-model="result" ref="checkboxGroup" lc_id="8EUt8S6cIj">
          <van-checkbox name="a" lc_id="vAZDx+cKaQ">复选框 a</van-checkbox>
          <van-checkbox name="b" lc_id="lNhFITM1W/">复选框 b</van-checkbox>
          <van-checkbox lc-mark name="c" lc_id="BVLbIHoPpi">复选框 c</van-checkbox>
        </van-checkbox-group>
        <br lc_id="lEi0tbIvkM" />
        <van-button type="primary" size="small" @click="checkAll" lc_id="azfVg1jydO">全选</van-button>
        <van-button plain size="small" @click="toggleAll" lc_id="FxjbFUMiWD">反选</van-button>
      </div>
    </div>
    <div lc_id="jl0/Xq6pS6">
      <div class="demonstration-vant" lc_id="5GzBrVy4XX">Radio 单选框</div>
      <div lc_id="TT2Onqet2I">
        <van-radio-group lc-mark v-model="radio10" lc_id="Fq7xqCU/Ul">
          <van-radio name="1" lc_id="eX5Wd5A8M+">单选框 1</van-radio>
          <van-radio lc-mark name="2" lc_id="QN9H1HdL7S">单选框 2</van-radio>
        </van-radio-group>
        <br lc_id="5uaRLSgQ+B" />
        <van-radio-group lc-mark v-model="radio10" lc_id="p/WdWJotYb">
          <van-cell-group lc_id="7SU7k9W/RI">
            <van-cell title="单选框 1" clickable @click="radio10 = '1'" lc-mark lc_id="cu2BQ/D1Gt">
              <template #right-icon lc_id="yLUfrpVFId">
                <van-radio name="1" lc_id="9sKStrXAMF"></van-radio>
              </template>
            </van-cell>
            <van-cell title="单选框 2" clickable @click="radio10 = '2'" lc_id="KnbWE2AKwX">
              <template #right-icon lc_id="vSyCi55TWO">
                <van-radio name="2" lc_id="gDzRZVWQxz"></van-radio>
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
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
