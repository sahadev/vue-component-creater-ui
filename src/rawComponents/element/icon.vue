  <template lc_id="NEXOf/rfSM">
      <div lc_id="fsSLs868ck">
          <div lc_id="jnWZjBCN55">
              <div class="demonstration-element" lc_id="PZC8UwVIRd">Progress 进度条</div>
              <el-progress lc-mark :percentage="50" lc_id="GnymMLJ5C6"></el-progress>
              <el-progress lc-mark :percentage="100" :format="format" lc_id="8XsOow/7Xd"></el-progress>
              <el-progress lc-mark :percentage="100" status="success" lc_id="BtIbOuqpzF"></el-progress>
              <el-progress lc-mark :percentage="100" status="warning" lc_id="+CJ7f9MY/b"></el-progress>
              <el-progress lc-mark :percentage="50" status="exception" lc_id="nFfSplTrKn"></el-progress>
          </div>
          <div lc_id="y2hj6UPfBT">
              <div class="demonstration-element" lc_id="DQOP05V0ui">Tree 树形控件</div>
              <el-tree lc-mark :data="data" :props="defaultProps" @node-click="handleNodeClick" lc_id="PXooTPaGg5"></el-tree>
          </div>
          <div lc_id="5aKl6Rld80">
              <div class="demonstration-element" lc_id="APtM1RDdZm">Badge 标记</div>
              <el-badge lc-mark :value="12" class="item" lc_id="bflHMoagaW">
                  <el-button size="small" lc_id="tZgMa+7DS4">评论</el-button>
              </el-badge>
              <el-badge lc-mark :value="3" class="item" lc_id="4PZTLM5+e6">
                  <el-button size="small" lc_id="iqXfaLj3WQ">回复</el-button>
              </el-badge>
              <el-badge lc-mark :value="1" class="item" type="primary" lc_id="Q7RwbWdiDV">
                  <el-button size="small" lc_id="r3WfzbZasR">评论</el-button>
              </el-badge>
              <el-badge lc-mark :value="2" class="item" type="warning" lc_id="TtCe3s6ksj">
                  <el-button size="small" lc_id="cf1h5bzriK">回复</el-button>
              </el-badge>
          </div>
          <div lc_id="SSxseq47LR">
              <div class="demonstration-element" lc_id="HJm06h80jc">Alert 警告</div>
              <el-alert lc-mark title="成功提示的文案" type="success" lc_id="wqO+8uwuWX"></el-alert>
              <el-alert lc-mark title="消息提示的文案" type="info" lc_id="iYuvHuINE3"></el-alert>
              <el-alert lc-mark title="警告提示的文案" type="warning" lc_id="u4WeAw1AlU"></el-alert>
              <el-alert lc-mark title="错误提示的文案" type="error" lc_id="815zGBQ9hH"></el-alert>
          </div>
          <div lc_id="mF0TvIdV4V">
              <div class="demonstration-element" lc_id="mFVki7ZkHC">NavMenu 导航菜单</div>
              <el-menu lc-mark :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" lc_id="Q6iodKSeyA">
                  <el-menu-item index="1" lc_id="eiJtp9/zyQ">处理中心</el-menu-item>
                  <el-menu-item index="4" lc_id="GLfqTcPgMW">
                      <a target="_blank" lc_id="dil67qSs86">订单管理</a>
                  </el-menu-item>
                  <el-submenu index="2" lc_id="NY1ULa4P2Q">
                      <template #title lc_id="EwUd4efWhm">我的工作台</template>
                      <el-menu-item index="2-1" lc_id="zafhDPI5vE">选项1</el-menu-item>
                      <el-menu-item index="2-2" lc_id="WlfqjAfsIa">选项2</el-menu-item>
                      <el-menu-item index="2-3" lc_id="BA4wuaM6Zg">选项3</el-menu-item>
                      <el-submenu index="2-4" lc_id="/iWebaFsQq">
                          <template #title lc_id="V8UUKlvHnc">选项4</template>
                          <el-menu-item index="2-4-1" lc_id="hlaLFAfE7r">选项1</el-menu-item>
                          <el-menu-item index="2-4-2" lc_id="DJomhSf824">选项2</el-menu-item>
                          <el-menu-item index="2-4-3" lc_id="PoxAKU6k+S">选项3</el-menu-item>
                      </el-submenu>
                  </el-submenu>
              </el-menu>
          </div>
          <div lc_id="RG6XjsgnsE">
              <div class="demonstration-element" lc_id="gEZK3ogh8S">Tabs 标签页</div>
              <el-tabs lc-mark v-model="activeName" @tab-click="handleClick" lc_id="tuf2/9+j/e">
                  <el-tab-pane label="用户管理" name="first" lc_id="v/FOTtwlL9">用户管理</el-tab-pane>
                  <el-tab-pane label="配置管理" name="second" lc_id="FrknB8ZWZ2">配置管理</el-tab-pane>
                  <el-tab-pane label="角色管理" name="third" lc_id="YUREDANeTC">角色管理</el-tab-pane>
                  <el-tab-pane label="定时任务补偿" name="fourth" lc_id="txrrEJikwC">定时任务补偿</el-tab-pane>
              </el-tabs>
          </div>
          <div lc_id="ZNvwIyI0Gj">
              <div class="demonstration-element" lc_id="94nfjvP9P7">Breadcrumb 面包屑</div>
              <el-breadcrumb separator="/" lc-mark lc_id="IXjFDSAAbN">
                  <el-breadcrumb-item :to="{ path: '/' }" lc_id="+fglUCnnjc">首页</el-breadcrumb-item>
                  <el-breadcrumb-item lc_id="p3a/Mymfnm">
                      <a href="/" lc_id="JDk4WTNeok">活动管理</a>
                  </el-breadcrumb-item>
                  <el-breadcrumb-item lc_id="c0pBs9wfpq">活动列表</el-breadcrumb-item>
                  <el-breadcrumb-item lc_id="puOnAeoiUr">活动详情</el-breadcrumb-item>
              </el-breadcrumb>
          </div>
          <div lc_id="5x1yyr+pUS">
              <div class="demonstration-element" lc_id="oqU11GHCqz">PageHeader 页头</div>
              <el-page-header lc-mark @back="goBack2" content="详情页面" lc_id="bmCKcTmef6"></el-page-header>
          </div>
          <div lc_id="Ef/GYGM9Cn">
              <div class="demonstration-element" lc_id="XiK2EHOXSu">Dropdown 下拉菜单</div>
              <el-dropdown lc-mark lc_id="0pRExJy5Rd">
                  <span class="el-dropdown-link" lc_id="hOjhZVZGbR">
下拉菜单                      <i class="el-icon-arrow-down el-icon--right" lc_id="87SkUBPdnB"></i>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu lc_id="Fi6Q4IfNSE">
                        <el-dropdown-item lc_id="l8vkCE/8VH">黄金糕</el-dropdown-item>
                        <el-dropdown-item lc_id="gbNMkf9GXr">狮子头</el-dropdown-item>
                        <el-dropdown-item lc_id="uwaDtykZaN">螺蛳粉</el-dropdown-item>
                        <el-dropdown-item disabled lc_id="rI2d1vErJ+">双皮奶</el-dropdown-item>
                        <el-dropdown-item divided lc_id="6tbTs4xG9T">蚵仔煎</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
              </el-dropdown>
          </div>
          <div lc_id="aZMbV9+94Y">
              <div class="demonstration-element" lc_id="WGB5x2VKOK">Steps 步骤条</div>
              <el-steps lc-mark :active="active" finish-status="success" lc_id="QWDOzkcFUw">
                  <el-step title="步骤 1" lc_id="oFU9um/+li"></el-step>
                  <el-step title="步骤 2" lc_id="+x6e7YMRDM"></el-step>
                  <el-step lc-mark title="步骤 3" lc_id="AQTYrrbdjJ"></el-step>
              </el-steps>
          </div>
          <div lc_id="IiSr5DQBar">
              <div class="demonstration-element" lc_id="9vmJpfJXls">Card 卡片</div>
              <el-card lc-mark class="box-card" lc_id="JZ/f90Eao5">
                <template #header>
                  <div class="clearfix" lc_id="SvmakA0ZV4">
                      <span lc_id="DEDjfa97FG">卡片名称</span>
                      <el-button style="float: right; padding: 3px 0" type="text" lc_id="cCyRGdP1cA">操作按钮</el-button>
                  </div>
                  <div v-for="o in 4" :key="o" class="text item" lc_id="LA6GOdkvYg">{{ "列表内容 " + o }}</div>
                </template>
              </el-card>
          </div>
          <div lc_id="ee7f8zuUHN">
              <div class="demonstration-element" lc_id="qFhGdZydOI">Carousel 走马灯</div>
              <el-carousel height="150px" lc-mark lc_id="HveY4zRKm+">
                  <el-carousel-item v-for="item in 4" :key="item" lc_id="I/ur+JXX58">
                      <h3 class="small" lc_id="S84XIuqocQ">{{ item }}</h3>
                  </el-carousel-item>
              </el-carousel>
          </div>
          <div lc_id="j/8ovh0QgR">
              <div class="demonstration-element" lc_id="L0tVuKxcoS">Collapse 折叠面板</div>
              <el-collapse lc-mark v-model="collapseActiveNames" @change="handleChange3" lc_id="+stqpbZFyN">
                  <el-collapse-item title="一致性 Consistency" name="1" lc_id="EKpTUggLJB">
                      <div lc_id="kNpJOEODiD">与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                      <div lc_id="4DFMNwSyQ0">在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                  </el-collapse-item>
                  <el-collapse-item title="反馈 Feedback" name="2" lc_id="v1GKEI6eGp">
                      <div lc_id="WCUf4+uzX+">控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                      <div lc_id="fC7dq5C7Iq">页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
                  </el-collapse-item>
                  <el-collapse-item title="效率 Efficiency" name="3" lc_id="dfv++aEQZC">
                      <div lc_id="QOHvDd/wc2">简化流程：设计简洁直观的操作流程；</div>
                      <div lc_id="1oggmSCvHj">清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                      <div lc_id="5cDwsEzcNt">帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                  </el-collapse-item>
                  <el-collapse-item title="可控 Controllability" name="4" lc_id="1f8rwpll8a">
                      <div lc_id="Cf3MSfNKcp">用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                      <div lc_id="8n+IxORrVY">结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                  </el-collapse-item>
              </el-collapse>
          </div>
          <div lc_id="9+vkQKnoU9">
              <div class="demonstration-element" lc_id="wOG8h/0Mkn">Timeline 时间线</div>
              <el-timeline :reverse="reverse" lc-mark lc_id="0w+R8i3YSH">
                  <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp" lc_id="1F6u/VeFjn">{{ activity.content }}</el-timeline-item>
              </el-timeline>
          </div>
          <div lc_id="fIuGfE2t7Z">
              <div class="demonstration-element" lc_id="4RZBWs5HDh">Calendar 日历</div>
              <el-calendar lc-mark v-model="calendarValue" lc_id="GEH/lf9pJX"></el-calendar>
          </div>
          <div lc_id="0OT80VaZz/"></div>
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
    handleNodeClick() {},
    handleSelect() {},
    handleClick() {},
    goBack2() {},
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
