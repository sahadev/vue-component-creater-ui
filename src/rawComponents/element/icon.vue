  <template lc_id="GWGSFjvJGS">
      <div lc_id="mhJfF7mAeh">
          <div lc_id="OyEvjlhxKG">
              <div class="demonstration-element" lc_id="jS8CODuZ8w">Progress 进度条</div>
              <el-progress lc-mark :percentage="50" lc_id="5KIZ/gMvgA"></el-progress>
              <el-progress lc-mark :percentage="100" :format="format" lc_id="andEKznPJm"></el-progress>
              <el-progress lc-mark :percentage="100" status="success" lc_id="+c55Mhr6qb"></el-progress>
              <el-progress lc-mark :percentage="100" status="warning" lc_id="aVjnu79qzU"></el-progress>
              <el-progress lc-mark :percentage="50" status="exception" lc_id="BxPH8oVBkr"></el-progress>
          </div>
          <div lc_id="NZyu36Hfnv">
              <div class="demonstration-element" lc_id="KlaxLO85mW">Tree 树形控件</div>
              <el-tree lc-mark :data="data" :props="defaultProps" @node-click="handleNodeClick" lc_id="6tm3Um6sZv"></el-tree>
          </div>
          <div lc_id="EvD0rnh0sk">
              <div class="demonstration-element" lc_id="gunUjt4svK">Badge 标记</div>
              <el-badge lc-mark :value="12" class="item" lc_id="64M0gaQZnd">
                  <el-button size="small" lc_id="EwFjRB81yT">评论</el-button>
              </el-badge>
              <el-badge lc-mark :value="3" class="item" lc_id="haDOmCEsNH">
                  <el-button size="small" lc_id="iZtMs8mOnw">回复</el-button>
              </el-badge>
              <el-badge lc-mark :value="1" class="item" type="primary" lc_id="yraq608Lcr">
                  <el-button size="small" lc_id="B1N0ns/Uyn">评论</el-button>
              </el-badge>
              <el-badge lc-mark :value="2" class="item" type="warning" lc_id="h8tv/EwcbE">
                  <el-button size="small" lc_id="8NG966mGav">回复</el-button>
              </el-badge>
          </div>
          <div lc_id="sTqskem3tG">
              <div class="demonstration-element" lc_id="WP+GGVOxkS">Alert 警告</div>
              <el-alert lc-mark title="成功提示的文案" type="success" lc_id="x1p2XMUWDM"></el-alert>
              <el-alert lc-mark title="消息提示的文案" type="info" lc_id="gA2WmaOkII"></el-alert>
              <el-alert lc-mark title="警告提示的文案" type="warning" lc_id="0oa8HxAIjm"></el-alert>
              <el-alert lc-mark title="错误提示的文案" type="error" lc_id="okpJNZagox"></el-alert>
          </div>
          <div lc_id="U4YG27qq4s">
              <div class="demonstration-element" lc_id="tI02wMGVyX">NavMenu 导航菜单</div>
              <el-menu lc-mark :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @select="handleSelect" lc_id="ihtDhkfBO3">
                  <el-menu-item index="1" lc_id="VejVEahyRO">Processing Center</el-menu-item>
                  <el-sub-menu index="2" lc_id="b9dDZDEyzu">
                      <template #title lc_id="EOLCWq1ax8">Workspace</template>
                      <el-menu-item index="2-1" lc_id="waSAqnTnUK">item one</el-menu-item>
                      <el-menu-item index="2-2" lc_id="x7OA9OoX9M">item two</el-menu-item>
                      <el-menu-item index="2-3" lc_id="XoUxBjhh8r">item three</el-menu-item>
                      <el-sub-menu index="2-4" lc_id="kVYGkptqy3">
                          <template #title lc_id="TZAoib4i41">item four</template>
                          <el-menu-item index="2-4-1" lc_id="KPPi+2aCzR">item one</el-menu-item>
                          <el-menu-item index="2-4-2" lc_id="9HsVuJIBXT">item two</el-menu-item>
                          <el-menu-item index="2-4-3" lc_id="pb1fYeVfpT">item three</el-menu-item>
                      </el-sub-menu>
                  </el-sub-menu>
                  <el-menu-item index="3" disabled lc_id="OYs/KISq4y">Info</el-menu-item>
                  <el-menu-item index="4" lc_id="POtcpYxQZ9">Orders</el-menu-item>
              </el-menu>
          </div>
          <div lc_id="Hr+gUUgFTD">
              <div class="demonstration-element" lc_id="EAnxv9IwcJ">Tabs 标签页</div>
              <el-tabs lc-mark v-model="activeName" @tab-click="handleClick" lc_id="7TSxFc1h/T">
                  <el-tab-pane label="用户管理" name="first" lc_id="nESAhjJD5+">用户管理</el-tab-pane>
                  <el-tab-pane label="配置管理" name="second" lc_id="GS8HXVlmCM">配置管理</el-tab-pane>
                  <el-tab-pane label="角色管理" name="third" lc_id="/jr8Mrluge">角色管理</el-tab-pane>
                  <el-tab-pane label="定时任务补偿" name="fourth" lc_id="CYHnAsRUdX">定时任务补偿</el-tab-pane>
              </el-tabs>
          </div>
          <div lc_id="0MpXv/hB5o">
              <div class="demonstration-element" lc_id="cXJHcFnFGI">Breadcrumb 面包屑</div>
              <el-breadcrumb separator="/" lc-mark lc_id="2kbMFsaBlw">
                  <el-breadcrumb-item :to="{ path: '/' }" lc_id="Y24a1lsayw">首页</el-breadcrumb-item>
                  <el-breadcrumb-item lc_id="e7mudUt3T2">
                      <a href="/" lc_id="2fk4blwWt1">活动管理</a>
                  </el-breadcrumb-item>
                  <el-breadcrumb-item lc_id="0uAUe0LS1k">活动列表</el-breadcrumb-item>
                  <el-breadcrumb-item lc_id="vTAj15QynT">活动详情</el-breadcrumb-item>
              </el-breadcrumb>
          </div>
          <div lc_id="VliPzBWiIr">
              <div class="demonstration-element" lc_id="URE6411ToF">PageHeader 页头</div>
              <el-page-header lc-mark @back="goBack2" content="详情页面" lc_id="VeIIrZpasX"></el-page-header>
          </div>
          <div lc_id="q1K7UjfQRh">
              <div class="demonstration-element" lc_id="QRo+LiBcqY">Dropdown 下拉菜单</div>
              <el-dropdown lc-mark lc_id="eEugqtt2Ed">
                  <span class="el-dropdown-link" lc_id="T9RXOuEAsg">下拉菜单</span>
                  <template #dropdown lc_id="Jgi+BtUZkP">
                      <el-dropdown-menu lc_id="fyNKB1+0hw">
                          <el-dropdown-item lc_id="nCNWPghXw7">黄金糕</el-dropdown-item>
                          <el-dropdown-item lc_id="3moaMHtIVR">狮子头</el-dropdown-item>
                          <el-dropdown-item lc_id="zeDetbgzeN">螺蛳粉</el-dropdown-item>
                          <el-dropdown-item disabled lc_id="590JIX3HSV">双皮奶</el-dropdown-item>
                          <el-dropdown-item divided lc_id="Svb2tOdBg/">蚵仔煎</el-dropdown-item>
                      </el-dropdown-menu>
                  </template>
              </el-dropdown>
          </div>
          <div lc_id="qp0NNdlqXq">
              <div class="demonstration-element" lc_id="RGehF229fc">Steps 步骤条</div>
              <el-steps lc-mark :active="active" finish-status="success" lc_id="2yxeEC6GkQ">
                  <el-step title="步骤 1" lc_id="IA1KW5Gwpv"></el-step>
                  <el-step title="步骤 2" lc_id="sGjhJUaXCP"></el-step>
                  <el-step lc-mark title="步骤 3" lc_id="gS1/xHiigS"></el-step>
              </el-steps>
          </div>
          <div lc_id="EduDP6YT5B">
              <div class="demonstration-element" lc_id="5Ryo1lT9Ri">Card 卡片</div>
              <el-card lc-mark class="box-card" lc_id="f7u3JZOXiY">
                  <template #header lc_id="fcNx1E9u+l">
                      <div class="clearfix" lc_id="JjiI6DiLa8">
                          <span lc_id="HyznGRyy1o">卡片名称</span>
                          <el-button style="float: right; padding: 3px 0" type="text" lc_id="2BV+GEiJPf">操作按钮</el-button>
                      </div>
                      <div v-for="o in 4" :key="o" class="text item" lc_id="WrqZOeR62/">{{ "列表内容 " + o }}</div>
                  </template>
              </el-card>
          </div>
          <div lc_id="Ac3U6soq4v">
              <div class="demonstration-element" lc_id="yHQSJ5j0qr">Carousel 走马灯</div>
              <el-carousel height="150px" lc-mark lc_id="pf7cTX05Pe">
                  <el-carousel-item v-for="item in 4" :key="item" lc_id="LWxEwOsKCc">
                      <h3 class="small" lc_id="rY5AkL9779">{{ item }}</h3>
                  </el-carousel-item>
              </el-carousel>
          </div>
          <div lc_id="h98mxV67rm">
              <div class="demonstration-element" lc_id="YCdpR3F66X">Collapse 折叠面板</div>
              <el-collapse lc-mark v-model="collapseActiveNames" @change="handleChange3" lc_id="SxwGYgpIAH">
                  <el-collapse-item title="一致性 Consistency" name="1" lc_id="9tnnQx3Q6z">
                      <div lc_id="nEOQzKpL2r">与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                      <div lc_id="dAI8bwEYNq">在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                  </el-collapse-item>
                  <el-collapse-item title="反馈 Feedback" name="2" lc_id="B1Egey2IgT">
                      <div lc_id="XNb772hFlA">控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                      <div lc_id="p/6OnJUnHn">页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                  </el-collapse-item>
                  <el-collapse-item title="效率 Efficiency" name="3" lc_id="Xq2hL9btvR">
                      <div lc_id="fCqY57GW+o">简化流程：设计简洁直观的操作流程；</div>
                      <div lc_id="O1v1vIbqMk">清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                      <div lc_id="oXshK9bC/I">帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                  </el-collapse-item>
                  <el-collapse-item title="可控 Controllability" name="4" lc_id="POyL7FoSe4">
                      <div lc_id="DR+xM6f78t">用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                      <div lc_id="2g+ldln/84">结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                  </el-collapse-item>
              </el-collapse>
          </div>
          <div lc_id="0kee2BlFsA">
              <div class="demonstration-element" lc_id="0EBCjFbCyA">Timeline 时间线</div>
              <el-timeline :reverse="reverse" lc-mark lc_id="HcDb8BgA1w">
                  <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp" lc_id="lqCmZ7Zw9R">{{ activity.content }}</el-timeline-item>
              </el-timeline>
          </div>
          <div lc_id="G64C6Q7euE">
              <div class="demonstration-element" lc_id="DnbJwJg18E">Calendar 日历</div>
              <el-calendar lc-mark v-model="calendarValue" lc_id="yd4ddVWJ69"></el-calendar>
          </div>
          <div lc_id="BHDMhfXQP4"></div>
      </div>
  </template>
  <script>
export default {
  data() {
    return {
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      calendarValue: new Date(),
      reverse: true,
      activities: [
        {
          content: "活动按期开始",
          timestamp: "2018-04-15",
        },
        {
          content: "通过审核",
          timestamp: "2018-04-13",
        },
        {
          content: "创建成功",
          timestamp: "2018-04-11",
        },
      ],
      collapseActiveNames: ["1"],
      active: 0,
      activeName: "second",
      activeIndex2: "1",
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    format(percentage) {
      return percentage === 100 ? "满" : `${percentage}%`;
    },
    handleNodeClick() { },
    handleSelect() { },
    handleClick() { },
    goBack2() { },
    handleChange3(val) {
      console.log(val);
    },
  },
};  </script>
  <style scoped>.item {
  margin-top: 10px;
  margin-right: 40px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}</style>
