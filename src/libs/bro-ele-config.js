
import { getRawComponentKey } from '@/utils/common'
import { replaceRowID, removeAllID, updateLinkTree, linkRelationShip } from '@/utils/forCode'

export function brotherEleEnum() {
    return [{
        name: 'el-option',
        ifInDoc: false // 这个组件是否默认在Dom上展示，如果不展示，则添加后不需要更新Dom，否则需要更新Dom
    },
    {
        name: 'el-table-column',
        ifInDoc: false 
    },
    {
        name: 'el-checkbox',
        ifInDoc: true
    },
    {
        name: 'el-radio',
        ifInDoc: true
    }];
}

function checkIsInVaildElement(event) {
    return new Promise((resolve, reject) => {
        const target = event.path.find(item => item.attributes.lc_id.nodeValue);
        // 获取带有ID的原始结构，这个ID用于生成一个不同ID的副本
        const __rawVueInfo__ = window.treeWithID && window.treeWithID[target.attributes.lc_id.nodeValue];
        if (target && __rawVueInfo__) {
            const key = getRawComponentKey(__rawVueInfo__);
            const result = brotherEleEnum().find(item => item.name === key && item.ifInDoc);
            if (result) {
                resolve({ target, __rawVueInfo__ });
            } else {
                reject();
            }
        }
    })
}

export function copyBroCode(__rawVueInfo__){
    // 初始化原型
    let newDropObj = Object.create(__rawVueInfo__.__proto__);
    // 拷贝内部属性
    Object.assign(newDropObj, JSON.parse(JSON.stringify(__rawVueInfo__)));

    newDropObj.__proto__.parentCodeNode.__children.push(newDropObj);
}

/**
 * 这个方法是给控制区域使用的，增加兄弟组件时，控制区域会实时更新
 * @param {*} element 
 */
export function initElementHoverAction(element) {
    let currentBroInfo = null;

    const addBroIcon = document.querySelector('.add-bro');

    let isInBroIcon = false;
    addBroIcon.addEventListener('mouseover', event => {
        isInBroIcon = true;
    })
    addBroIcon.addEventListener('mouseout', event => {
        isInBroIcon = false;
    })

    element.addEventListener('mouseover', event => {
        event.stopPropagation();

        checkIsInVaildElement(event).then((callbackInfo) => {
            currentBroInfo = callbackInfo;
            const rect = callbackInfo.target.getBoundingClientRect();
            addBroIcon.style = `left:${rect.right + 0}px;top:${rect.top}px;`
        }, () => {
            setTimeout(() => {
                if (!isInBroIcon) {
                    addBroIcon.style = "top:-100px;"
                }
            });
        })
    })

    return function () {
        // 初始化原型
        let newDropObj = Object.create(currentBroInfo.__rawVueInfo__.__proto__);
        // 拷贝内部属性
        Object.assign(newDropObj, JSON.parse(JSON.stringify(currentBroInfo.__rawVueInfo__)));

        // 有__key__键可以使在通过updateLinkTree更新结构时，内部的原型指向外部的原型
        newDropObj.__key__ = "__children";

        // 使新拖入的代码与原来的做脱离
        const newHtmlCode = replaceRowID(newDropObj, currentBroInfo.target.outerHTML);
        // 这里不能是任意的target，必须是已存在代码树，有引用链的节点
        currentBroInfo.target.parentNode.insertAdjacentHTML("beforeend", newHtmlCode);

        newDropObj.__proto__.parentCodeNode.__children.push(newDropObj);

        // 将所有子节点指向父节点
        linkRelationShip(newDropObj);

        // 更新到一个tree上面，维持引用
        updateLinkTree(newDropObj);

        // 删除所有的ID
        removeAllID(newDropObj);
    }
}