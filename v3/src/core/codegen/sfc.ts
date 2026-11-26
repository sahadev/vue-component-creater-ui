/**
 * 结构 → SFC 文本。
 *
 * 注意方向：这是单向导出，生成出来的文本不会再被解析回结构。
 * 画布渲染不经过这里。
 */
import type { PropRecord, PropValue, SceneNode, StyleRule, VccDocument } from '../types';
import { getSpec } from '../registry/registry';

const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'source', 'track', 'wbr',
]);

const ATTR_ORDER_HEAD = ['class', 'style'];

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeText(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** 文本里允许写 {{ expr }}，这类片段不转义 */
export function renderText(text: string): string {
  return text
    .split(/(\{\{[\s\S]*?\}\})/g)
    .map((chunk) => (chunk.startsWith('{{') && chunk.endsWith('}}') ? chunk : escapeText(chunk)))
    .join('');
}

/** 把 JS 值序列化成模板里的表达式源码 */
export function toExpression(value: PropValue): string {
  if (typeof value === 'string') return JSON.stringify(value);
  if (value === null) return 'null';
  return JSON.stringify(value);
}

/** 事件 key 归一：onClick → @click，@click 原样 */
export function normalizeEventKey(key: string): string | null {
  if (key.startsWith('@')) return key;
  const matched = /^on([A-Z][A-Za-z0-9]*)$/.exec(key);
  if (!matched) return null;
  return `@${matched[1]!.toLowerCase()}`;
}

interface AttrPair {
  key: string;
  value: string;
}

function sortAttrPairs(pairs: AttrPair[]): AttrPair[] {
  const rank = (key: string) => {
    const base = key.replace(/^[:@]/, '');
    const head = ATTR_ORDER_HEAD.indexOf(base);
    return head === -1 ? ATTR_ORDER_HEAD.length : head;
  };
  return pairs
    .map((pair, index) => ({ pair, index }))
    .sort((a, b) => rank(a.pair.key) - rank(b.pair.key) || a.index - b.index)
    .map((item) => item.pair);
}

/**
 * props → 模板属性。
 * 规则：
 *  - modelValue 生成 v-model
 *  - onXxx / @xxx 生成事件绑定，值为表达式
 *  - schema 里 editor 为 expr 的属性生成 :prop="表达式"
 *  - class/style 走静态与对象两种形式
 *  - 其余字符串当字面量，非字符串当表达式
 */
export function renderProps(
  library: string,
  tag: string,
  props: PropRecord,
): AttrPair[] {
  const spec = library === 'html' ? undefined : getSpec(library as never, tag);
  const editorOf = (key: string) =>
    spec?.props.find((prop) => prop.key === key)?.editor;

  const pairs: AttrPair[] = [];

  for (const [key, rawValue] of Object.entries(props)) {
    if (rawValue === undefined || rawValue === null || rawValue === '') continue;
    if (rawValue === false) continue;

    const eventKey = normalizeEventKey(key);
    if (eventKey) {
      pairs.push({ key: eventKey, value: String(rawValue) });
      continue;
    }

    if (key === 'v-model' || key === 'modelValue') {
      pairs.push({ key: 'v-model', value: String(rawValue) });
      continue;
    }

    if (key === 'style' && typeof rawValue === 'object') {
      pairs.push({ key: ':style', value: toExpression(rawValue) });
      continue;
    }

    if (/^v-/.test(key) && key.includes(':') === false) {
      pairs.push({ key, value: String(rawValue) });
      continue;
    }

    if (editorOf(key) === 'expr') {
      pairs.push({ key: `:${key}`, value: String(rawValue) });
      continue;
    }

    if (typeof rawValue === 'string') {
      pairs.push({ key, value: `"${escapeAttr(rawValue)}"` });
      continue;
    }

    pairs.push({ key: `:${key}`, value: toExpression(rawValue) });
  }

  return sortAttrPairs(pairs);
}

function formatAttrs(pairs: AttrPair[]): string {
  if (pairs.length === 0) return '';
  const rendered = pairs.map(({ key, value }) => {
    // 字面量在 renderProps 里已带上引号；表达式是裸值
    if (value.startsWith('"')) return `${key}=${value}`;
    return `${key}="${value}"`;
  });
  return ' ' + rendered.join(' ');
}

function pad(indent: number): string {
  return '  '.repeat(indent);
}

export function renderNode(node: SceneNode, indent: number): string {
  if (node.kind === 'text') {
    return `${pad(indent)}${renderText(node.text)}`;
  }

  const tag = node.tag;
  const attrs = formatAttrs(renderProps(node.kind === 'component' ? node.library : 'html', tag, node.props));
  const selfClosing = node.children.length === 0;

  if (selfClosing && (VOID_TAGS.has(tag) || node.kind === 'component')) {
    return `${pad(indent)}<${tag}${attrs} />`;
  }

  if (selfClosing) {
    return `${pad(indent)}<${tag}${attrs} />`;
  }

  const inner = node.children.map((child) => renderNode(child, indent + 1)).join('\n');
  return `${pad(indent)}<${tag}${attrs}>\n${inner}\n${pad(indent)}</${tag}>`;
}

export function renderStyles(styles: StyleRule[]): string {
  if (styles.length === 0) return '';
  return styles
    .map((rule) => {
      const decls = Object.entries(rule.declarations)
        .map(([prop, value]) => `  ${prop}: ${value};`)
        .join('\n');
      return `${rule.selector} {\n${decls}\n}`;
    })
    .join('\n\n');
}

export interface SfcOptions {
  /** 用户自定义的 script setup 内容 */
  script?: string;
  /** 是否带 scoped */
  scoped?: boolean;
}

export function generateSfc(doc: VccDocument, options: SfcOptions = {}): string {
  const { script = '', scoped = true } = options;
  const template = renderNode(doc.root, 1);
  const styles = renderStyles(doc.styles);

  const styleBlock = styles
    ? `\n<style${scoped ? ' scoped' : ''}>\n${styles}\n</style>\n`
    : '';

  const scriptBody = script.trim()
    ? `\n${script.trim()}\n`
    : '\n// 在这里追加组件逻辑\n';

  return `<template>\n${template}\n</template>\n\n<script setup lang="ts">${scriptBody}</script>\n${styleBlock}`;
}
