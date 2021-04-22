# @lcg/vcc介绍

vcc是Low Code Generator中独立的Vue组件代码编辑器。可以独立运行。

使用示例：
```vue
<template>
  <vcc :initCodeEntity="codeStructure" @updateCodeEntity="onCodeUpdate"></vcc>
</template>

<script>
// 以这样一段结构初始化VCC组件
const initCodeStr = '{"template":{"lc_id":"root","__children":[{"div":{"class":"container","style":"min-height: 100%; padding-bottom: 100px;","lc_id":"container","__text__":"Hello，欢迎使用LCG，请往此区域拖拽组件","__children":[{"el-button":{"lc-mark":"","type":"danger","lc_id":"COAAYXizyI","__children":[],"__text__":"危险按钮","@click":"onButtonClick","size":"small"}}]}}]}}'

export default {
  components: {
    vcc: () => import('@lcg/vcc')
  },
  data() {
    return {
      codeStructure: JSON.parse(initCodeStr),
    }
  },
  mounted() {
  },
  methods: {
    onCodeUpdate(newCodeEntity) {
      // 编辑后新的代码结构
    }
  }
}
</script>
```

# 拖拽式Vue组件代码生成平台(LCG)介绍

## 它是什么
拖拽式Vue组件代码生成平台是一款小猴自研的Vue代码生成工具，英文全称：Low Code Generator，简称LCG。它也是一种LowCode解决方案。通过它可以快速完成Vue组件的代码骨架搭建，通过减少不必要的重复工作从而带来开发效率的提升。

> 体验地址：https://lc.100tal.com/

## 出现的背景
做前端久了就难免会发现有一些工作其实是繁复的，它们有一些共同的特点：

 - 频率高
 - 非常基础
 - 花费时间

而有一部分工作是可以通过技术手段解决的，例如在写Vue时会发现：

 - class的名称需要分别在template和style中定义。
 - v-on，v-bind，v-model，v-for等指令的值需要分别在template和script中定义。
 - 强烈依赖第三方组件库的需要打开官网拷贝某个组件所对应的代码。

上面三种场景占用了开发一个组件所需要使用的相当一部分时间。尤其是第三条，经常就是打开官网 -> 找到组件 -> 拷贝template -> 拷贝data -> 拷贝method -> 验证效果。如果遇到复杂组件时就不知不觉花了不少时间进去。而第一条也需要我们来回在上下文中定义class-name。而这些常见的基本操作如果可以将它们的共性提取出来，那么我们就有办法通过技术手段大幅缩短这部分时间。这就为LCG的出现提供了需求背景。

作者之前是写Android的，对Android的拖拽式布局印象很深刻。因为拖拽本身所需要花费的时间是所有编码操作中最少的。

所以想法一结合，诞生了LCG。
## 使用它可以完成什么
目前LCG集成了HTML5的基本元素以及Element UI常见的平面组件，所以目前可以通过LCG完成常见的表格与表单。这里列举一些具有代表性的页面：

> LCG同样支持搭建移动端的页面，只需要将相应的组件库集成即可。

快速生成一个这样的查询表格：

![](https://static.imonkey.xueersi.com/vue-creater-platform/resource/table.png)

<details>
<summary>查看表格代码</summary>

```vue
<template>
  <div>
    <el-form inline :model="formInline" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="onQueryButtonClick" size="small">查询</el-button>
      <el-button @click="onResetButtonClick" size="small">重置</el-button>
    </el-form>
    <el-button type="primary" @click="onCreateButtonClick" size="small">新增</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="234">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: [],
  components: {},
  data() {
    return {
      // 在此自动生成
      currentPage: 1,
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  watch: {},
  computed: {},
  beforeCreate() { },
  created() { },
  beforeMount() { },
  mounted() { },
  beforeUpdate() { },
  updated() { },
  destoryed() { },
  methods: {
    // 在此自动生成
    request() {
      // 网络请求，可选
    },
    handleCurrentChange() { },
    handleSizeChange() { },
    onButtonClick() { },
    onCreateButtonClick() { },
    onQueryButtonClick() { },
    onResetButtonClick() { }
  },
  fillter: {},
};
</script>

<style scoped>
/*  在此自动生成 */
.demo-form-inline {
}
</style>
```
</details>

也可以快速搭建一个这样的数据提交表单：

![](https://static.imonkey.xueersi.com/vue-creater-platform/resource/form.png)

<details>
<summary>查看表单代码</summary>

```vue
<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-border">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文件上传" prop="delivery">
        <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或 <em> 点击上传 </em>
          </div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
          <el-radio label="线上推广"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">立即创建</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: [],
  components: {},
  data() {
    return {
      // 在此自动生成
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: "blur"
          },
          {
            min: 3,
            max: 5,
            message: "长度在 3 到 5 个字符",
            trigger: "blur"
          }
        ],
        region: [
          {
            required: true,
            message: "请选择活动区域",
            trigger: "change"
          }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          {
            required: true,
            message: "请选择活动资源",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "请填写活动形式",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {},
  computed: {},
  beforeCreate() { },
  created() { },
  beforeMount() { },
  mounted() { },
  beforeUpdate() { },
  updated() { },
  destoryed() { },
  methods: {
    // 在此自动生成
    request() {
      // 网络请求，可选
    },
    goBack() { },
    resetForm() { },
    submitForm() { }
  },
  fillter: {},
};
</script>

<style scoped>
/*  在此自动生成 */
.demo-border {
}
.el-icon--right {
}
.el-icon-upload {
}
.el-upload__text {
}
.el-upload__tip {
}
.line {
}
.upload-demo {
}
</style>
```

</details>

当然，搭建成为什么样的页面完全取决于开发者，上面两张图只是一个效果示意。LCG的主要能力在于它所生成的代码。

> 通过图片下方的**展开按钮**可以看到代码。

LCG会自动将各个组件按照SFC文件的结构拼接在一起，并且会把data、method、class的声明也创建好。有了这样一个骨架结构，开发者便可以将代码下载至项目目录，在此基础上进行二次开发。

这个骨架创建过程完全不需要打开Element UI官网进行一个个组件代码拷贝这样繁复的过程，只需拖拽几下就搞定了。

## 使用它可以带来的收益
虽然带来了很明显的效率提升效果，但还是需要一个数据来表达一下究竟可以节约多少时间。

还是以上面的查询表格为例。作者分别通过常规的方式和通过LCG的方式做一下数据比对。

常规方式：

<video src="https://static.imonkey.xueersi.com/vue-creater-platform/resource/raw.mp4" width="640px" height="360px" controls="controls"></video>

LCG：

<video src="https://static.imonkey.xueersi.com/vue-creater-platform/resource/lcg.mp4" width="640px" height="360px" controls="controls"></video>

通过以上两个视频可以看到，LCG总共用时99秒，而常规方式总共用时205秒。因此LCG相比较常规方式提效至少在100%以上，因为LCG不要起本地服务就可以看到实时效果。两者的时间差值随着组件的复杂度增加而增加。
## 视频介绍
下面是一个基本版的视频介绍：

<video src="https://static.imonkey.xueersi.com/vue-creater-platform/lcg_introduction.mp4" width="640px" height="360px" controls="controls"></video>

## 基本原理

我们知道，在编写后的 vue 代码在运行时会生成实际的 Html 代码，而组件生成平台的职责是将这些 Html 再转换为 vue 代码，并组合在一起。

为了达到这样的目的，我们目前采用的思路是：将原始的代码文件进行预编译：对指定的vue组件分配一个随机 ID，并将这个vue文件的代码结构转换为以JavaScript对象表示的结构，以ID: Structure的形式存储于 JS文件中。在运行时，将此JS文件加载进内存。当拖动某个被lc-mark标记的元素时，我们可获得这个元素相应的ID，再通过这个ID查找对应的Structure。当拖入到某个元素中时，也通过相同的方式获得目标元素的原始代码，再将这两部分原始代码合并，并建立上下级关系。随后，通过新的代码结构，分析对应的@click、v-model、class等我们所关注的属性，然后再将其生成对应的代码插入到将要生成的Vue组件模板中。至此，便形成了一个较为完整的Vue组件代码。
## 现有的能力
可以从以下几个点来描述LCG现有的能力：
 - 组件库：目前LCG集成了常用的Html5元素以及Element UI大部分组件。
 - 组合形式：目前支持将一个组件插入到另一个组件的前面、里面、后面。
 - 生成结果：目前除了支持自动提取class之外还支持自动生成template中通过以下指令所声明的data以及method（包括但不限于）：
    - v-bind或:
    - v-for
    - v-if
    - v-model
    - v-on或@
    - {{ Mustache }}

- 属性预置：由于每个组件的属性繁多，无法将每种组合的组件都预置完全，所以有一部分组件预置了属性。比如el-pagination，它在组件库中是通过基础用法表示的，而当被拖入到操作区域后，它在预览区域展示的是完整功能。这是因为它被拖入后增加了一些预置属性。如果你不要它，则可以在属性编辑时将这些预置属性删除。
- 兄弟组件快速复制：有一些组件在使用时的个数是不确定的，比如el-radio、el-checkbox等，所以LCG提供了兄弟组件快速复制的能力。当把鼠标移动至这类组件上时，就会出现一个小加号(➕)，然后点击这个加号边可以快速复制一个兄弟组件。支持复制兄弟组件的组件有：
    - el-checkbox
    - el-radio
    - el-option (在检视图中复制)
    - el-table-column (在检视图中复制)

- 代码结构检视：有一些脱离文档流的组件是无法直接在操作区域看到的，比如el-option这种下拉选项。所以LCG提供了**结构检视图**的能力。通过结构检视图可以看到template中各个组件结构的层级关系。并且也可以对el-option这种看不到的组件进行属性编辑。在结构检视图中除了可以编辑组件的基本属性外，还可以对el-option、el-table-column这些组件进行兄弟组件复制。但需要注意的是：**在这种模式下不支持删除组件**。

### 特点
可以说LCG的特点是：

 - 组件库强大，支持各类Vue组件库。
 - 组合形式多样，支持各种组合。
 - 生成结果丰富，支持无限扩展各种指令以及v-bind、v-on。

## 做不到哪些以及需要注意的

因为实现机制的原因，有一些是目前LCG无法做到的：
 - 操作区域效果同步更新。这里是指如果编辑的是一个Html5元素的话，那么操作区域以及实时预览区域的效果都会更新。但如果是复杂的组件（实现层级超过两级），则只能在预览区域看到效果。
 - 无法组合非平面组件的结构。以Dialog举例，因为Dialog本身不是文档流的一部分，所以在对Dialog进行结构表示时获取不到本身的DOM结构，所以无法直接将内部的内容放入到Dialog中。而是需要将内容放置到Dialog前面或者后面，然后再在本地编辑器中调整其正确的结构。
 - 某些组件无法选中。部分组件因为实现逻辑的原因，没有将id属性挂载到组件的根节点上，所以会导致在操作区域点击这个组件出现无法选中的现象。这种情况可通过组件检视图更新该组件的属性。目前已知有这种现象的组件有：el-switch、el-time-select。

### 没有集成的ElementUI组件

 - Divider 分割线
 - InfiniteScroll 无限滚动
 - Notification 通知
 - MessageBox 弹框
 - Message 消息提示
 - Loading 加载
 - Backtop 回到顶部