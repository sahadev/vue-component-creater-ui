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
pnpm test       # 50 个用例，含真实挂载渲染
pnpm typecheck
pnpm build
```

## 尚未接入

- 行内文本编辑、绝对定位/自由布局
- Ant Design Vue 与 Vant 的组件表（registry 已支持多库，只是还没录）
- 样式面板（数据结构 `styles` 已就位，codegen 已能输出）
- 组件级自定义属性（`static` 区之外的表达式面板）
- Element Plus 目前是全量注册以保证动态标签可解析，需要按需化
