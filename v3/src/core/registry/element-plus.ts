import type { ComponentSpec } from './registry';

const sizeOptions = [
  { label: '默认', value: 'default' },
  { label: '大', value: 'large' },
  { label: '小', value: 'small' },
];

const typeOptions = [
  { label: 'primary', value: 'primary' },
  { label: 'success', value: 'success' },
  { label: 'warning', value: 'warning' },
  { label: 'danger', value: 'danger' },
  { label: 'info', value: 'info' },
];

/**
 * Element Plus 常用组件。
 * props 里出现的 key 与 Element Plus 的 props 同名，
 * modelValue 会被 codegen 翻译成 v-model。
 */
export const elementPlusSpecs: ComponentSpec[] = [
  {
    library: 'element-plus',
    tag: 'el-button',
    name: '按钮',
    category: '按钮',
    acceptsChildren: false,
    props: [
      { key: 'type', label: '类型', editor: 'select', default: '', options: [{ label: '无', value: '' }, ...typeOptions] },
      { key: 'size', label: '尺寸', editor: 'select', default: 'default', options: sizeOptions },
      { key: 'plain', label: '朴素', editor: 'boolean', default: false },
      { key: 'round', label: '圆角', editor: 'boolean', default: false },
      { key: 'disabled', label: '禁用', editor: 'boolean', default: false },
    ],
    defaultText: '按钮',
  },
  {
    library: 'element-plus',
    tag: 'el-input',
    name: '输入框',
    category: '表单',
    acceptsChildren: false,
    props: [
      { key: 'modelValue', label: '绑定值', editor: 'expr', default: '' },
      { key: 'placeholder', label: '占位符', editor: 'text', default: '请输入' },
      { key: 'clearable', label: '可清空', editor: 'boolean', default: false },
      { key: 'disabled', label: '禁用', editor: 'boolean', default: false },
      { key: 'size', label: '尺寸', editor: 'select', default: 'default', options: sizeOptions },
    ],
  },
  {
    library: 'element-plus',
    tag: 'el-switch',
    name: '开关',
    category: '表单',
    acceptsChildren: false,
    props: [
      { key: 'modelValue', label: '绑定值', editor: 'expr', default: '' },
      { key: 'activeText', label: '开启文案', editor: 'text', default: '' },
      { key: 'inactiveText', label: '关闭文案', editor: 'text', default: '' },
    ],
  },
  {
    library: 'element-plus',
    tag: 'el-checkbox',
    name: '多选框',
    category: '表单',
    acceptsChildren: false,
    props: [
      { key: 'modelValue', label: '绑定值', editor: 'expr', default: '' },
      { key: 'label', label: '标签', editor: 'text', default: '选项' },
      { key: 'disabled', label: '禁用', editor: 'boolean', default: false },
    ],
  },
  {
    library: 'element-plus',
    tag: 'el-select',
    name: '下拉选择',
    category: '表单',
    acceptsChildren: true,
    props: [
      { key: 'modelValue', label: '绑定值', editor: 'expr', default: '' },
      { key: 'placeholder', label: '占位符', editor: 'text', default: '请选择' },
      { key: 'clearable', label: '可清空', editor: 'boolean', default: false },
    ],
  },
  {
    library: 'element-plus',
    tag: 'el-option',
    name: '选项',
    category: '表单',
    acceptsChildren: false,
    standalone: false,
    props: [
      { key: 'label', label: '文案', editor: 'text', default: '选项' },
      { key: 'value', label: '值', editor: 'text', default: '1' },
    ],
  },
  {
    library: 'element-plus',
    tag: 'el-card',
    name: '卡片',
    category: '容器',
    acceptsChildren: true,
    props: [
      { key: 'header', label: '标题', editor: 'text', default: '卡片' },
      { key: 'shadow', label: '阴影', editor: 'select', default: 'always', options: [
        { label: '总是', value: 'always' },
        { label: '悬停', value: 'hover' },
        { label: '从不', value: 'never' },
      ] },
    ],
  },
  {
    library: 'element-plus',
    tag: 'el-row',
    name: '行',
    category: '布局',
    acceptsChildren: true,
    props: [
      { key: 'gutter', label: '列间距', editor: 'number', default: 0 },
      { key: 'justify', label: '水平对齐', editor: 'select', default: 'start', options: [
        { label: 'start', value: 'start' },
        { label: 'center', value: 'center' },
        { label: 'end', value: 'end' },
        { label: 'space-between', value: 'space-between' },
        { label: 'space-around', value: 'space-around' },
      ] },
      { key: 'align', label: '垂直对齐', editor: 'select', default: 'top', options: [
        { label: 'top', value: 'top' },
        { label: 'middle', value: 'middle' },
        { label: 'bottom', value: 'bottom' },
      ] },
    ],
  },
  {
    library: 'element-plus',
    tag: 'el-col',
    name: '列',
    category: '布局',
    acceptsChildren: true,
    props: [{ key: 'span', label: '栅格数 (1-24)', editor: 'number', default: 12 }],
  },
  {
    library: 'element-plus',
    tag: 'el-divider',
    name: '分割线',
    category: '布局',
    acceptsChildren: false,
    props: [{ key: 'contentPosition', label: '文案位置', editor: 'select', default: 'center', options: [
      { label: 'left', value: 'left' },
      { label: 'center', value: 'center' },
      { label: 'right', value: 'right' },
    ] }],
  },
  {
    library: 'element-plus',
    tag: 'el-tag',
    name: '标签',
    category: '展示',
    acceptsChildren: false,
    props: [
      { key: 'type', label: '类型', editor: 'select', default: 'primary', options: typeOptions },
      { key: 'effect', label: '主题', editor: 'select', default: 'light', options: [
        { label: 'light', value: 'light' },
        { label: 'dark', value: 'dark' },
        { label: 'plain', value: 'plain' },
      ] },
      { key: 'closable', label: '可关闭', editor: 'boolean', default: false },
    ],
    defaultText: '标签',
  },
  {
    library: 'element-plus',
    tag: 'el-alert',
    name: '提示',
    category: '展示',
    acceptsChildren: false,
    props: [
      { key: 'title', label: '标题', editor: 'text', default: '提示文案' },
      { key: 'type', label: '类型', editor: 'select', default: 'info', options: typeOptions },
      { key: 'description', label: '描述', editor: 'textarea', default: '' },
      { key: 'closable', label: '可关闭', editor: 'boolean', default: true },
    ],
  },
  {
    library: 'element-plus',
    tag: 'el-progress',
    name: '进度条',
    category: '展示',
    acceptsChildren: false,
    props: [
      { key: 'percentage', label: '百分比', editor: 'number', default: 50 },
      { key: 'status', label: '状态', editor: 'select', default: '', options: [
        { label: '无', value: '' },
        { label: 'success', value: 'success' },
        { label: 'warning', value: 'warning' },
        { label: 'exception', value: 'exception' },
      ] },
    ],
  },
];
