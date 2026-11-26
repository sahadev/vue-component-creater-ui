import type { ComponentSpec } from './registry';
import type { SceneNode } from '../types';
import { newNodeId } from '../ids';

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

const textNode = (text: string): SceneNode => ({ kind: 'text', id: newNodeId(), text });

const column = (label: string, prop: string): SceneNode => ({
  kind: 'component',
  id: newNodeId(),
  library: 'element-plus',
  tag: 'el-table-column',
  props: { label, prop },
  children: [],
});

const formItem = (label: string, text: string): SceneNode => ({
  kind: 'component',
  id: newNodeId(),
  library: 'element-plus',
  tag: 'el-form-item',
  props: { label },
  children: [textNode(text)],
});

/**
 * Element Plus 常用组件。顺序刻意照旧版左栏的排布：
 * 按钮 → 链接 → 标签 → 头像 → 表格 → 分页 → 表单 → 其余。
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
    tag: 'el-button-group',
    name: '按钮组',
    category: '按钮',
    acceptsChildren: true,
    props: [],
    defaultChildren: () => [
      {
        kind: 'component',
        id: newNodeId(),
        library: 'element-plus',
        tag: 'el-button',
        props: { type: 'primary' },
        children: [textNode('上一页')],
      },
      {
        kind: 'component',
        id: newNodeId(),
        library: 'element-plus',
        tag: 'el-button',
        props: { type: 'primary' },
        children: [textNode('下一页')],
      },
    ],
  },
  {
    library: 'element-plus',
    tag: 'el-link',
    nameEn: 'Link',
    name: '文字链接',
    category: '按钮',
    acceptsChildren: false,
    props: [
      { key: 'type', label: '类型', editor: 'select', default: '', options: [{ label: '默认', value: '' }, ...typeOptions] },
      { key: 'underline', label: '下划线', editor: 'boolean', default: false },
      { key: 'disabled', label: '禁用', editor: 'boolean', default: false },
    ],
    defaultText: '文字链接',
  },
  {
    library: 'element-plus',
    tag: 'el-tag',
    nameEn: 'Tag',
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
    tag: 'el-avatar',
    nameEn: 'Avatar',
    name: '头像',
    category: '展示',
    acceptsChildren: false,
    props: [
      { key: 'size', label: '尺寸', editor: 'number', default: 40 },
      { key: 'shape', label: '形状', editor: 'select', default: 'circle', options: [
        { label: '圆形', value: 'circle' },
        { label: '方形', value: 'square' },
      ] },
      { key: 'src', label: '图片地址', editor: 'text', default: '' },
    ],
  },
  {
    library: 'element-plus',
    tag: 'el-table',
    name: '表格',
    category: '数据',
    acceptsChildren: true,
    props: [{ key: 'border', label: '边框', editor: 'boolean', default: false }],
    defaultProps: {
      data: [
        { date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
        { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' },
        { date: '2016-05-01', name: '王小虎', address: '上海市普陀区金沙江路 1519 弄' },
      ],
    },
    defaultChildren: () => [
      column('日期', 'date'),
      column('姓名', 'name'),
      column('地址', 'address'),
    ],
  },
  {
    library: 'element-plus',
    tag: 'el-table-column',
    nameEn: 'TableColumn',
    name: '表格列',
    category: '数据',
    acceptsChildren: false,
    standalone: false,
    props: [
      { key: 'label', label: '列名', editor: 'text', default: '列' },
      { key: 'prop', label: '字段', editor: 'text', default: '' },
    ],
  },
  {
    library: 'element-plus',
    tag: 'el-pagination',
    nameEn: 'Pagination',
    name: '分页',
    category: '数据',
    acceptsChildren: false,
    props: [
      { key: 'total', label: '总条数', editor: 'number', default: 100 },
      { key: 'pageSize', label: '每页条数', editor: 'number', default: 10 },
      { key: 'layout', label: '布局', editor: 'text', default: 'prev, pager, next' },
    ],
  },
  {
    library: 'element-plus',
    tag: 'el-form',
    name: '表单',
    category: '表单',
    acceptsChildren: true,
    props: [
      { key: 'inline', label: '行内', editor: 'boolean', default: false },
      { key: 'labelWidth', label: '标签宽度', editor: 'text', default: '' },
    ],
    defaultChildren: () => [formItem('姓名', '王小虎'), formItem('地区', '上海市')],
  },
  {
    library: 'element-plus',
    tag: 'el-form-item',
    nameEn: 'FormItem',
    name: '表单项',
    category: '表单',
    acceptsChildren: true,
    props: [{ key: 'label', label: '标签', editor: 'text', default: '标签' }],
    defaultText: '内容',
  },
  {
    library: 'element-plus',
    tag: 'el-input',
    nameEn: 'Input',
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
    tag: 'el-select',
    nameEn: 'Select',
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
    nameEn: 'Option',
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
    tag: 'el-switch',
    nameEn: 'Switch',
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
    nameEn: 'Checkbox',
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
    tag: 'el-card',
    nameEn: 'Card',
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
    nameEn: 'Row',
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
    nameEn: 'Col',
    name: '列',
    category: '布局',
    acceptsChildren: true,
    props: [{ key: 'span', label: '栅格数 (1-24)', editor: 'number', default: 12 }],
  },
  {
    library: 'element-plus',
    tag: 'el-divider',
    nameEn: 'Divider',
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
    tag: 'el-alert',
    nameEn: 'Alert',
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
    nameEn: 'Progress',
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
