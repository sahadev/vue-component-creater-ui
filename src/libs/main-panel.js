/**
 *  这个文件主要用于将结构渲染出来，并提供一些辅助的能力
 * 
 *  这个过程的核心可以简化为：
 *      结构 -> vue代码 -> html 
 * 
 */
import { parseComponent } from 'vue-template-compiler/browser';
import { merge, insertPresetAttribute, getSplitTag, replaceRowID, updateLinkTree, findCodeElemNode, findRawVueInfo, removeAllID } from "@/utils/forCode";
import { getRawComponentContent, getRawComponentKey, isObject } from '@/utils/common';
import { createNewCodeGenerator } from "@/libs/code-generator-factory";
const EventEmitter = require('eventemitter3');
const { cloneDeep } = require('lodash');
import scope from 'css-scoped';

/**
 * 主控制面板辅助类，用于代码的生成与绘制
 */
export class MainPanelProvider {

    constructor() {
        // 开启编辑模式
        this.editMode = true;
        this.eventEmitter = new EventEmitter();
        this.currentPointPositionAfterIndex = -1;

        // 存储所有的渲染记录, 保存副本
        this.renderStack = [];
        this.redoStack = [];

        this.externalJS = {};
    }

    /**
     * 对内渲染
     * @param {*} rawDataStructure 
     */
    _render(rawDataStructure) {
        this._rawDataStructure = rawDataStructure;
        // 对外只提供副本，防止外面污染内部
        const codeStructureCopy = cloneDeep(rawDataStructure);
        this.eventEmitter.emit('codeStructureUpdated', codeStructureCopy);

        this.initCodeGenerator();

        console.groupCollapsed('---> for code generator warn <---');

        // 生成原始代码
        let code = this.codeGenerator.outputVueCodeWithJsonObj(rawDataStructure);

        // 将xxx: () => {} 转换为xxx(){}
        code = code.replace(/:\s*\(([\w\s]*)\)\s*=>/g,"\($1\)");

        // 生成展示代码
        let codeForShow = code.replace(/\s{1}lc_id=".+?"/g, '');
        codeForShow = codeForShow.replace(/\s{1}lc-mark/g, "");
        this.eventEmitter.emit("codeCreated", codeForShow);

        console.groupEnd();

        const { template, script, styles, customBlocks } = parseComponent(code);

        this.loadStyle(styles);

        let newScript = script.content.replace(/\s*export default\s*/, "")

        const componentOptions = (new Function(`return ${newScript}`))();

        const res = Vue.compile(template.content);

        componentOptions.render = function () {
            const rootVNode = res.render.apply(this, arguments);
            return rootVNode;
        };
        componentOptions.staticRenderFns = res.staticRenderFns;

        const readyForMoutedElement = this.createMountedElement();
        // 渲染当前代码
        new Vue(componentOptions).$mount(readyForMoutedElement);

        // 拍平数据结构
        this.editMode && this.flatDataStructure(rawDataStructure);

        // 开启编辑模式
        this.editMode && this.enableEditMode();

        return this;
    }

    /**
     * 对外渲染函数：将一个指定的数据结构渲染出来，并会保存这次的渲染记录
     * @param {*} rawDataStructure 
     */
    render(rawDataStructure) {
        this._render(rawDataStructure);
        return this;
    }

    setEditMode(editMode) {
        this.editMode = editMode;
        this.reRender();
    }

    loadStyle(styles) {
        if (styles.length > 0) {
            const scopedStyle = styles[0];

            this.styleNodeName = `cssScoped${Date.now()}`;

            const scopedCss = scope(scopedStyle.content.replace(/::v-deep/g, ''), this.styleNodeName);
            const styleNode = document.createElement('style');
            styleNode.innerText = scopedCss;

            // 这个会导致越来越卡
            document.head.appendChild(styleNode);
        }
    }

    /**
     * 初始化代码编译
     */
    initCodeGenerator() {
        this.codeGenerator = createNewCodeGenerator();
        this.codeGenerator.setExternalJS(this.externalJS);
    }

    getControlPanelRoot() {
        return document.getElementById('render-control-panel');
    }

    saveJSCode(code) {
        this.saveJSCodeOnly(code);
        this.codeGenerator && this.codeGenerator.setExternalJS(code);
        this.reRender();
    }

    saveJSCodeOnly(code) {
        this.externalJS = code || {};
        return this;
    }

    /**
     * 生成一个新的待挂载容器
     */
    createMountedElement() {
        const renderControlPanel = this.getControlPanelRoot();
        if(this.styleNodeName) {
            renderControlPanel.setAttribute('class', this.styleNodeName);
        }

        const child = document.createElement('div');

        // 清空子节点
        while (renderControlPanel.firstChild) {
            renderControlPanel.removeChild(renderControlPanel.firstChild)
        }

        renderControlPanel.appendChild(child);

        return child;
    }

    /**
     * 初始化组件的一些事件
     */
    initComonentsEvent() {
        const renderControlPanel = this.getControlPanelRoot();
        const elements = renderControlPanel.querySelectorAll("[lc_id]");
        elements.forEach(element => {
            element.addEventListener("click", event => {
                event.stopPropagation();
                this.markElement(element);
            })
        })

        this.initDropEvent();
    }

    /**
     * 高亮当前编辑元素等处理，并将当前编辑的元素指针指向这个节点
     */
    markElement(realNode) {
        // 处理之前的状态
        if (this.currentEditElement) {
            this.currentEditElement.classList.remove("mark-element");
        }

        if (realNode) {
            this.currentEditElement = realNode;

            const rawVueInfo = this.markElementInner(realNode);

            // 对外只提供副本，防止外面污染内部
            const codeRawInfoCopy = cloneDeep(rawVueInfo);
            this.eventEmitter.emit("selected", codeRawInfoCopy);
        } else {
            this.eventEmitter.emit("selected", null);
        }
    }

    /**
     * 这个方法会返回节点所对应的代码结构
     * @param {*} realNode 
     * @returns 
     */
    markElementInner(realNode) {
        realNode.classList.add("mark-element");
        const rawVueInfo = findRawVueInfo(realNode);
        // 显示当前组件的名称
        realNode.setAttribute('lc-component-name', getRawComponentKey(rawVueInfo));
        return rawVueInfo;
    }

    /**
     * 清除选中
     */
    clearElementSelect() {
        this.markElement(null);
    }

    /**
     * 设置新组建要放入的位置与对象
     * @param {*} index 
     */
    setDropInfo(dropInfo) {
        this.currentPointDropInfo = dropInfo;
    }

    /**
     * 初始化拖拽事件
     */
    initDropEvent() {
        const renderControlPanel = this.getControlPanelRoot();

        renderControlPanel.addEventListener("dragenter", (event) => {
            event.preventDefault();
        });

        renderControlPanel.addEventListener("dragleave", (event) => {
            event.preventDefault();
        });

        renderControlPanel.addEventListener("dragover", (event) => {
            // Specifying Drop Targets
            event.preventDefault();
        });

        // 拖入预览容器释放时的处理
        renderControlPanel.addEventListener("drop", (event) => {
            if (!this.currentPointDropInfo.target) {
                return;
            }

            const data = event.dataTransfer.getData("text/plain");
            const [, , , , rawInfo] = data.split(getSplitTag());

            const newDropObj = JSON.parse(rawInfo);

            // 插入预设属性
            insertPresetAttribute(newDropObj);

            // 使新拖入的代码与原来的做脱离
            replaceRowID(newDropObj, '');

            // 更新到一个Map上面，维持引用，由于render中统一做了处理，所以这段代码是可以删除的 2021年02月04日11:59:10
            updateLinkTree(newDropObj);

            // 更新代码结构关系
            const codeTargetElement = findCodeElemNode(this.currentPointDropInfo.target);
            if (codeTargetElement) {
                let temp = findRawVueInfo(codeTargetElement);

                this.backup();
                // 合并
                merge(getRawComponentContent(temp), newDropObj, this.currentPointDropInfo.index, () => {
                    this.eventEmitter.emit('onMerged');
                });

                this.render(this._rawDataStructure);
            }
        });
    }

    /**
     * 开启编辑模式，并禁用默认的事件，添加编辑事件
     */
    enableEditMode() {
        const renderControlPanel = this.getControlPanelRoot();
        // 加一个延迟的作用是：给el-table这种绘制需要时间的组件留出充足的时间，否则会造成el-table渲染不到页面上
        
        if (this.enableDelayTask) {
            clearTimeout(this.enableDelayTask);
        }
        
        this.enableDelayTask = setTimeout(() => {
            // 这种方式可以禁用原节点所有的事件
            const elClone = renderControlPanel.cloneNode(true);
            renderControlPanel.parentNode.replaceChild(elClone, renderControlPanel);
            this.eventEmitter.emit("mounted", elClone);
            // 事件初始化
            this.initComonentsEvent();
        }, 500);
    }

    /**
     * 将数据拍平，以id: data 的方式联结
     * @param {*} rawDataStructure 
     */
    flatDataStructure(rawDataStructure) {
        updateLinkTree(rawDataStructure);
    }

    /**
     * 选中某个一个元素时
     */
    onSelectElement(callback) {
        this.subscribeEventListener("selected", callback);
        return this;
    }

    /**
     * 当根节点挂载后
     * @param {*} callback 
     */
    onRootElementMounted(callback) {
        this.subscribeEventListener("mounted", callback);
        return this;
    }


    /**
     * 当Vue代码生成后
     * @param {*} callback 
     */
    onCodeCreated(callback) {
        this.subscribeEventListener("codeCreated", callback);
        return this;
    }


    /**
     * 当代码结构更新后
     * @param {*} callback 
     */
    onCodeStructureUpdated(callback) {
        this.subscribeEventListener("codeStructureUpdated", callback);
        return this;
    }

    /**
     * 当代码合并完成后
     * @param {*} callback 
     */
    onMerged(callback) {
        this.subscribeEventListener("onMerged", callback);
        return this;
    }

    /**
     * 当节点删除后
     * @param {*} callback 
     */
    onNodeDeleted(callback) {
        this.subscribeEventListener("onNodeDeleted", callback);
        return this;
    }

    /**
     * 重新渲染
     */
    reRender() {
        this._render(this._rawDataStructure);
        return this;
    }

    /**
     * 保存属性
     * @param {*} resultList 
     * @param {*} rawInfo 
     */
    saveAttribute(resultList, lc_id) {
        const param = resultList;
        const object = getRawComponentContent(window.tree[lc_id]);

        this.backup();
        // 这里是为了满足当有属性删除的情况，保留保留属性：__children lc-mark lc_id
        for (const key in object) {
            if (object.hasOwnProperty(key) &&
                key != "__children" && key != "lc-mark" && key != "lc_id" &&
                !isObject(object[key]/** 值为Object的情况目前已经没有了2021年02月04日11:56:28 */)) {
                delete object[key];
            }
        }

        param.forEach((element) => {
            object[element.key] = element.value;
        });
        // 渲染当前的变更
        this.render(this._rawDataStructure);
        return this;
    }

    /**
     * 移动一个节点到另一个节点
     * @param {*} removeID 被移动的节点
     * @param {*} movePath 移动的路径
     */
    onLevelChange(removeID, movePath) {
        this.backup();

        const removedNodeArray = this.remove(removeID, false);
        // 去除根节点路径，以便完全匹配
        movePath.splice(0, 1)

        let rootNode = this._rawDataStructure;
        let lastIndex = -1;
        for (let i = 0; i < movePath.length - 1; i++) {
            rootNode = getRawComponentContent(rootNode).__children[movePath[i]];
            lastIndex = movePath[i + 1];
        }

        if (rootNode && removedNodeArray.length > 0) {
            getRawComponentContent(rootNode).__children.splice(lastIndex, 0, removedNodeArray[0]);
        }

        // 渲染当前的变更
        this.render(this._rawDataStructure);
    }

    /**
     * 移除一个节点
     * @param {*} lc_id 
     */
    remove(lc_id, backup = true) {
        let removeNodes = null;
        const readyForDeleteElement = document.querySelector(`[lc_id="${lc_id}"]`);
        if (readyForDeleteElement) {
            const parentElementNode = findCodeElemNode(readyForDeleteElement.parentElement);

            if (parentElementNode) {
                const parentRawInfo = findRawVueInfo(parentElementNode);

                const attributes = getRawComponentContent(parentRawInfo);
                if (attributes) {
                    const childrenArray = attributes.__children;

                    const index = childrenArray.findIndex((item) => {
                        return getRawComponentContent(item).lc_id == lc_id;
                    });

                    backup && this.backup();
                    removeNodes = childrenArray.splice(index, 1);
                    this.eventEmitter.emit("onNodeDeleted");

                    // 渲染当前的变更
                    this.render(this._rawDataStructure);
                } else {
                    console.warn(`没有发现原始代码属性：lc_id: ${lc_id}`);
                }
            } else {
                console.warn(`没有发现lc_id: ${lc_id}所对应的父Dom节点`);
            }
        } else {
            console.warn(`没有发现lc_id: ${lc_id}所对应的Dom节点`);
        }

        return removeNodes;
    }

    /**
     * 事件订阅
     * @param {*} event -> mounted:当新的根节点被挂载 | selected:选择了某个节点 | codeCreated:生成了代码 | codeStructureUpdated:代码结构更新
     * @param {*} listener 
     */
    subscribeEventListener(event, listener) {
        this.eventEmitter.on(event, listener);
    }

    /**
     * 备份当前结构
     */
    backup() {
        this.renderStack.push(cloneDeep(this._rawDataStructure));
        // 当重新变更结构时，重做栈要置空
        this.redoStack = [];
    }

    /**
     * 撤销
     */
    undo() {
        if (this.renderStack.length > 0) {
            // 存储当前的渲染到重做栈中
            this.redoStack.push(cloneDeep(this._rawDataStructure));

            const readyForRender = this.renderStack.pop();
            this._render(readyForRender);
        }
    }

    /**
     * 重做
     */
    redo() {
        if (this.redoStack.length > 0) {
            this.renderStack.push(cloneDeep(this._rawDataStructure));

            const readyForRender = this.redoStack.pop();
            this._render(readyForRender);
        }
    }
}


