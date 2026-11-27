/**
 * 旧界面的引擎接口。
 *
 * 旧 VCC.vue 和属性面板只认这几个方法和事件，这里用新引擎实现同样的接口，
 * 界面组件一行都不用改。和旧版的区别在于：
 *  - 不再「生成整份 SFC 文本 → parseComponent → new Function → 重新挂载」
 *  - 不再 cloneNode 整棵树替换 DOM
 *  - 不再往 head 里追加 style
 * 改文档就只改文档，画布靠响应式自己更新。
 */
import { createApp, effectScope, watch, type App } from 'vue';
import EventEmitter from 'eventemitter3';
import Canvas from '@/render/Canvas.vue';
import { useEditorStore } from '@/store/editor';
import { installPlugins } from '@/app-plugins';
import { findPath, getNode, walk } from '@/core/tree';
import { generateSfc } from '@/core/codegen/sfc';
import type { SceneNode } from '@/core/types';
import { legacyStructureToRoot, legacyTagOf, sceneToLegacy, type LegacyStructure } from '../adapter';
import { store as legacyStore } from '@/legacy/libs/store';

type Callback = (payload?: unknown) => void;

export class MainPanelProvider {
  private emitter = new EventEmitter();
  private editor = useEditorStore();
  private scope = effectScope();
  private canvasApp: App | null = null;
  private container: HTMLElement | null = null;
  private emitTimer: number | null = null;

  constructor() {
    this.scope.run(() => {
      // 选中变化 → 通知属性面板（旧格式）
      watch(
        () => this.editor.selectedId,
        (id) => {
          const node = id ? this.findNodeById(id) : null;
          const legacy = node ? sceneToLegacy(node) : null;
          // 结构抽屉读的是 { vccData: 属性对象 }，这里保持同样的形状
          const vccData = legacy && node ? legacy[legacyTagOf(legacy)] : null;
          legacyStore.commit('storeCurrentEditComp', vccData ? { vccData } : null);
          this.emitter.emit('selected', legacy);
        },
      );

      // 文档变化 → 通知宿主与「查看代码」弹窗，并维护旧工具函数依赖的 window.tree
      watch(
        () => this.editor.doc,
        (doc) => {
          this.syncLegacyTree();
          this.emitter.emit('codeStructureUpdated', sceneToLegacy(doc.root));
          this.emitter.emit('codeCreated', generateSfc(doc, { script: doc.script }));
        },
        { immediate: true },
      );
    });
  }

  /**
   * 旧界面的 lineHelper / common.js / 结构树都从 window.tree[lc_id] 取节点结构，
   * 这里把文档映射过去，省得改那几处旧代码。
   */
  private syncLegacyTree(): void {
    const tree: Record<string, unknown> = {};
    walk(this.editor.doc, (node) => {
      tree[node.id] = sceneToLegacy(node);
    });
    (window as unknown as { tree: Record<string, unknown> }).tree = tree;
  }

  private findNodeById(id: string): SceneNode | null {
    const path = findPath(this.editor.doc, id);
    return path ? getNode(this.editor.doc, path) : null;
  }

  private subscribe(name: string, callback: Callback): this {
    this.emitter.on(name, callback as never);
    return this;
  }

  onRootElementMounted(callback: Callback): this {
    return this.subscribe('rootMounted', callback);
  }

  onMerged(callback: Callback): this {
    return this.subscribe('merged', callback);
  }

  onCodeCreated(callback: Callback): this {
    return this.subscribe('codeCreated', callback);
  }

  onCodeStructureUpdated(callback: Callback): this {
    return this.subscribe('codeStructureUpdated', callback);
  }

  onNodeDeleted(callback: Callback): this {
    return this.subscribe('nodeDeleted', callback);
  }

  onSelectElement(callback: Callback): this {
    return this.subscribe('selected', callback);
  }

  /** 把画布挂到旧界面留的容器上 */
  private ensureMounted(): void {
    if (this.canvasApp) return;
    const container = document.getElementById('render-control-panel');
    if (!container) {
      console.warn('[vcc] 找不到画布容器 #render-control-panel');
      return;
    }
    container.innerHTML = '';
    this.container = container;
    this.canvasApp = installPlugins(createApp(Canvas));
    this.canvasApp.mount(container);
    this.emitter.emit('rootMounted', container);
  }

  /** 旧结构 → 文档根 并渲染。用于初始化、清空、二次编辑回填 */
  render(structure: LegacyStructure): this {
    const root = legacyStructureToRoot(structure);
    if (!root) return this;

    this.ensureMounted();
    this.editor.reset({
      version: 1,
      name: this.editor.doc.name,
      root,
      styles: this.editor.doc.styles ?? [],
      script: this.editor.doc.script,
    });
    return this;
  }

  /** 旧版需要重建 DOM，新版文档变了画布自己会更新 */
  reRender(): this {
    this.ensureMounted();
    return this;
  }

  setEditMode(editMode: boolean): this {
    // 只读模式由画布自己控制选中；旧版在这里会 cloneNode 替换 DOM
    if (!editMode) this.editor.select(null);
    return this;
  }

  /** 落点由画布自己算，这里保留接口兼容 */
  setDropInfo(): this {
    return this;
  }

  clearElementSelect(): this {
    this.editor.select(null);
    return this;
  }

  saveJSCodeOnly(code: unknown): this {
    if (typeof code === 'string') this.editor.setScript(code);
    return this;
  }

  saveJSCode(code: unknown): this {
    return this.saveJSCodeOnly(code);
  }

  saveAttribute(attributes: { key: string; value: string }[], lcId: string): this {
    if (!lcId) return this;
    this.editor.applyAttrs(lcId, attributes);
    return this;
  }

  remove(lcId: string): this {
    if (!lcId) return this;
    this.editor.removeById(lcId);
    this.emitter.emit('nodeDeleted', lcId);
    return this;
  }

  undo(): this {
    this.editor.undo();
    return this;
  }

  redo(): this {
    this.editor.redo();
    return this;
  }

  destroy(): void {
    this.scope.stop();
    if (this.emitTimer !== null) window.clearTimeout(this.emitTimer);
    this.canvasApp?.unmount();
    this.canvasApp = null;
    this.container = null;
    this.emitter.removeAllListeners();
  }
}

export default MainPanelProvider;
