/**
 * 文档模型。
 *
 * 唯一真相是这份 JSON，不是生成的代码文本。
 * 画布由 h() 直接渲染这份 JSON，SFC 文本只在「导出」时生成一次。
 */

export type NodeId = string;

export type LibraryId = 'html' | 'element-plus' | 'ant-design-vue' | 'vant';

/** 属性值限定为可 JSON 序列化的值，避免把函数这类不可导出物塞进文档 */
export type PropValue =
  | string
  | number
  | boolean
  | null
  | PropValue[]
  | { [key: string]: PropValue };

export type PropRecord = Record<string, PropValue>;

interface CommonNode {
  id: NodeId;
  /** 可选展示信息，不参与代码生成 */
  meta?: {
    label?: string;
    locked?: boolean;
  };
}

/** 普通 HTML 元素，例如 div / span / section */
export interface ElementNode extends CommonNode {
  kind: 'element';
  tag: string;
  props: PropRecord;
  children: SceneNode[];
}

/** 组件库组件，例如 el-button / a-input */
export interface ComponentNode extends CommonNode {
  kind: 'component';
  library: LibraryId;
  tag: string;
  props: PropRecord;
  children: SceneNode[];
}

/** 纯文本 */
export interface TextNode extends CommonNode {
  kind: 'text';
  text: string;
}

export type SceneNode = ElementNode | ComponentNode | TextNode;

/** 容器节点 = 可以放子节点的节点 */
export type ContainerNode = ElementNode | ComponentNode;

export function isContainer(node: SceneNode): node is ContainerNode {
  return node.kind === 'element' || node.kind === 'component';
}

export interface StyleRule {
  id: string;
  /** 只允许 class 选择器，::v-deep 由 codegen 处理 */
  selector: string;
  declarations: Record<string, string>;
}

export interface VccDocument {
  version: 1;
  name: string;
  root: ElementNode;
  styles: StyleRule[];
  /** 用户自定义逻辑，只在导出时写进 script setup */
  script?: string;
}

/** 从 root.children 起的索引路径；空路径代表 root 本身 */
export type NodePath = number[];

export type NodeRef = {
  path: NodePath;
  node: SceneNode;
};
