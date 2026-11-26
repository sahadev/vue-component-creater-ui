/**
 * 文档的创建、序列化与 URL 承载。
 *
 * 稿件状态进 URL：刷新、后退、分享都能还原同一个画布。
 * 独立运行时没有宿主来保存 token，这是唯一的持久化入口。
 */
import type { VccDocument } from './types';
import { newNodeId } from './ids';
import { validateDocument } from './validate';

export const DOC_QUERY_KEY = 'd';
export const VIEWPORT_QUERY_KEY = 'w';
export const MAX_URL_LENGTH = 12000;

export function createEmptyDocument(name = 'untitled'): VccDocument {
  return {
    version: 1,
    name,
    root: {
      kind: 'element',
      id: newNodeId(),
      tag: 'div',
      props: { class: 'page' },
      children: [],
    },
    styles: [],
  };
}

/** UTF-8 安全的 base64url */
function toBase64Url(input: string): string {
  const bytes = new TextEncoder().encode(input);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(input: string): string {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/');
  const pad = padded.length % 4 === 0 ? '' : '='.repeat(4 - (padded.length % 4));
  const binary = atob(padded + pad);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function encodeDocument(doc: VccDocument): string {
  return toBase64Url(JSON.stringify(doc));
}

/** 解析失败返回 null，调用方决定回退到什么 */
export function decodeDocument(token: string): VccDocument | null {
  try {
    const parsed = JSON.parse(fromBase64Url(token));
    return validateDocument(parsed);
  } catch {
    return null;
  }
}

export interface UrlState {
  doc: VccDocument | null;
  viewportWidth: number | null;
}

export function readStateFromUrl(search: string): UrlState {
  const params = new URLSearchParams(search);
  const token = params.get(DOC_QUERY_KEY);
  const width = Number(params.get(VIEWPORT_QUERY_KEY));
  return {
    doc: token ? decodeDocument(token) : null,
    viewportWidth: Number.isFinite(width) && width > 0 ? width : null,
  };
}

/** 生成完整 URL；超长时返回 null，避免分享出被截断的链接 */
export function buildShareUrl(
  base: string,
  doc: VccDocument,
  viewportWidth?: number,
): string | null {
  const url = new URL(base);
  url.searchParams.set(DOC_QUERY_KEY, encodeDocument(doc));
  if (viewportWidth) url.searchParams.set(VIEWPORT_QUERY_KEY, String(viewportWidth));
  return url.toString().length > MAX_URL_LENGTH ? null : url.toString();
}

/** 把当前状态写回地址栏，不产生历史记录 */
export function syncUrl(doc: VccDocument, viewportWidth?: number): void {
  const url = new URL(window.location.href);
  url.searchParams.set(DOC_QUERY_KEY, encodeDocument(doc));
  if (viewportWidth) url.searchParams.set(VIEWPORT_QUERY_KEY, String(viewportWidth));
  if (url.toString().length > MAX_URL_LENGTH) {
    url.searchParams.delete(DOC_QUERY_KEY);
  }
  window.history.replaceState(null, '', url.toString());
}
