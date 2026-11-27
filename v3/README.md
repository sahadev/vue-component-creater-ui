# VCC 3 引擎重写（v3/）

这份目录是编辑器的新实现，和仓库根部的旧 `src/` 并存。旧的保留作参照，不再演进。

## 为什么重写

旧实现的核心回路是：

```
结构 JSON → 拼出整份 SFC 文本 → 运行时 parseComponent → new Function 求值
          → 挂载新 app → cloneNode(true) 整棵树替换 DOM → setTimeout 500ms 等渲染完
```

这一个回路同时造成了：每次改属性整棵树重建、撤销栈全量深拷贝、每渲染一次往 `<head>` 追加一个 `<style>` 且不清理、状态散落在 `window.dataSourceMap` / `window.methodSourceMap` / `window.styleSourceMap` / `window.tree` 四个全局 map 上、没有任何一层能脱离浏览器验证。

新实现把方向反过来：

```
结构 JSON（唯一真相） ──h()──> 画布 VNode
                     └─纯函数─> SFC 文本（只在导出时生成一次，不再回读）
```

代码文本从"渲染路径"降级为"导出产物"。因此不再需要运行时编译器、不需要 `eval`、不需要二次挂载，也不再需要往 head 里塞样式。

## 目录

| 路径 | 职责 |
|-|-|
| `src/core/types.ts` | 文档模型。判别联合，非法状态不可表达 |
| `src/core/tree.ts` | 树的读写。全部纯函数，沿路径浅拷贝 |
| `src/core/registry/` | 组件注册表。画布、属性面板、代码生成共用同一份元数据 |
| `src/core/codegen/sfc.ts` | 结构 → SFC 文本，单向导出 |
| `src/core/validate.ts` | 不可信输入校验（URL / 剪贴板） |
| `src/core/document.ts` | 文档创建、序列化、URL 承载 |
| `src/core/drop.ts` | 落点计算，纯函数 |
| `src/render/` | 结构 → VNode，画布交互 |
| `src/store/editor.ts` | 唯一的状态写入点 + 撤销栈 + URL 同步 |
| `src/ui/` | 面板 |

## 关键约定

- 文档只在 `store.commit` 里被替换，其他任何地方都不写文档。
- 属性面板提交文本，类型由 registry 的 `editor` 字段决定，不靠文本长相猜。
- 画布不执行用户表达式：`expr` 类型属性和事件绑定在渲染时被丢弃（见 `render/canvas-props.ts`）。
- 稿件状态进 URL（`?d=<base64url>&w=<宽度>`），刷新、后退、分享都能还原。
- 样式只有一套机制：设计令牌 + 组件内 scoped，零行内样式。

## 运行

```bash
cd v3
pnpm install
pnpm dev        # http://localhost:5173
pnpm e2e        # 界面交互验收，需先 pnpm dev（用系统 Chrome）
pnpm test       # 54 个用例，含真实挂载渲染与整界面冒烟
pnpm typecheck
pnpm build
```

## 界面

界面是旧版原样搬过来的（`src/legacy/`），一行 UI 组件都没重写。新引擎通过 `legacy/libs/main-panel.ts` 提供旧版那套 `MainPanelProvider` 接口，界面组件调用方式不变。

适配层 `legacy/adapter.ts` 负责「旧结构 ↔ 新文档模型」的双向转换：旧结构形如
`{ div: { lc_id, __children: [...], __text__ } }`，新模型是判别联合的 SceneNode。

所以下面这些界面全部是一次性拿到的，不用逐个重录：

- 七套组件库的示例区（raw / element / vant / antd / iview / quasar / echart），
  左侧是真实渲染的可拖示例，共一千多行现成数据
- 结构检视图（底部抽屉）
- 代码预览弹窗、JS 逻辑编辑弹窗、Vue 二次编辑弹窗
- 属性面板的约束编辑 / 自由编辑双模式与快捷键

与旧版的差别只在这些：

- 画布渲染不再「生成 SFC 文本 → parseComponent → new Function → 重新挂载 + cloneNode 替换 DOM」，
  改文档就只改文档，画布靠响应式更新
- 不再往 `<head>` 追加 `<style>`
- 撤销栈是不可变快照，不是全量深拷贝
- 稿件状态进 URL

已知降级：结构检视图里的树不再支持拖拽排序（原版依赖 vuedraggable 4.1，
与当前 Vue 版本不兼容），只保留展示与选中。

## 尚未接入
- 行内文本编辑、绝对定位/自由布局
- Vue 代码导入（反向解析）
- Ant Design Vue 与 Vant 的组件表（registry 已支持多库，只是还没录）
- 样式面板（数据结构 `styles` 已就位，codegen 已能输出）
- 组件级自定义属性（`static` 区之外的表达式面板）
- Element Plus 目前是全量注册以保证动态标签可解析，需要按需化

## 界面

不靠肉眼。用两个脚本对着线上原版量：

- 像素 diff：同视口截图，逐像素求差，按区域（品牌列 / 分类列 / 示例区 / 工具栏 / 编辑区）统计差异率
- 计算样式比对：同一组语义元素在两边取 `getBoundingClientRect` + `computedStyle`，逐项比数值

当前结果（1440×900，原版 vs 本实现）：

| 区域 | 差异率 |
|---|---:|
| 品牌列 | 1.9% |
| 分类列 | 4.2% |
| 示例区 | 12.1% |
| 工具栏 | 3.8% |
| 编辑区 | 0.5% |
| 全图 | 5.2% |

所有容器的 rect 已逐项相等：品牌列 58px、品牌项 54×54 @(2,0)、分类项 130×64 @(58,63)、示例区起点 199、工具栏 722×58、编辑区起点 (722,58)、竖排标题 80×306 @(-11,534)。
