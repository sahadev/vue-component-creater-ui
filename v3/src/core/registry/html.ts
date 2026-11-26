import type { ComponentSpec } from './registry';

/**
 * 基础布局元素。这些不依赖任何组件库，导出后是原生 HTML。
 */
export const htmlSpecs: ComponentSpec[] = [
  {
    library: 'html',
    tag: 'div',
    name: '容器',
    category: '布局',
    acceptsChildren: true,
    props: [
      { key: 'class', label: 'class', editor: 'text', default: 'box' },
    ],
  },
  {
    library: 'html',
    tag: 'section',
    name: '区块',
    category: '布局',
    acceptsChildren: true,
    props: [],
  },
  {
    library: 'html',
    tag: 'span',
    name: '行内容器',
    category: '布局',
    acceptsChildren: true,
    props: [],
    defaultText: '文本',
  },
  {
    library: 'html',
    tag: 'h1',
    name: '标题 1',
    category: '排版',
    acceptsChildren: true,
    props: [],
    defaultText: '标题',
  },
  {
    library: 'html',
    tag: 'h2',
    name: '标题 2',
    category: '排版',
    acceptsChildren: true,
    props: [],
    defaultText: '标题',
  },
  {
    library: 'html',
    tag: 'p',
    name: '段落',
    category: '排版',
    acceptsChildren: true,
    props: [],
    defaultText: '一段文字',
  },
  {
    library: 'html',
    tag: 'a',
    name: '链接',
    category: '排版',
    acceptsChildren: true,
    props: [
      { key: 'href', label: 'href', editor: 'text', default: '#' },
      { key: 'target', label: 'target', editor: 'select', default: '_self', options: [
        { label: '当前窗口', value: '_self' },
        { label: '新窗口', value: '_blank' },
      ] },
    ],
    defaultText: '链接文字',
  },
  {
    library: 'html',
    tag: 'img',
    name: '图片',
    category: '媒体',
    acceptsChildren: false,
    props: [
      { key: 'src', label: 'src', editor: 'text', default: '' },
      { key: 'alt', label: 'alt', editor: 'text', default: '' },
    ],
  },
  {
    library: 'html',
    tag: 'ul',
    name: '无序列表',
    category: '排版',
    acceptsChildren: true,
    props: [],
  },
  {
    library: 'html',
    tag: 'li',
    name: '列表项',
    category: '排版',
    acceptsChildren: true,
    props: [],
    defaultText: '列表项',
  },
  {
    library: 'html',
    tag: 'button',
    name: '按钮',
    category: '表单',
    acceptsChildren: true,
    props: [{ key: 'type', label: 'type', editor: 'select', default: 'button', options: [
      { label: 'button', value: 'button' },
      { label: 'submit', value: 'submit' },
      { label: 'reset', value: 'reset' },
    ] }],
    defaultText: '按钮',
  },
];
