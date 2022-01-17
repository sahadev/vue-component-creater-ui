// 代码生成对象工厂，每次初始化需要获取一个新的实例，所以工厂方法模式最为适用
import { CodeGenerator } from "./bundle-core-esm";
import { checkIsDataDirectives, checkIsMethodDirectives } from '@/libs/directiveCheck';

const stringifyObject = require("stringify-object");

export function createNewCodeGenerator() {
    return new CodeGenerator({
        convertDataResult: function (dataCodeArr) {
            let result = dataCodeArr;
            // 干扰数据结果
            if (dataCodeArr.length > 0) {
                result = dataCodeArr.map((item) => {
                    const kav = item.split(":");
                    const key = kav[0];
                    // 这里获取的是原始data数据
                    if (window.dataSourceMap[key] || window.dataSourceMap[key] == 0) {
                        return `${key}: ${stringifyObject(window.dataSourceMap[key], {
                            indent: "  ",
                            singleQuotes: false,
                        })}`;
                    } else {
                        return item;
                    }
                });
            }

            return result;
        },
        convertMethodResult(methodCodeArr) {
            let result = methodCodeArr;
            if (methodCodeArr && methodCodeArr.length > 0) {
                result = methodCodeArr.map(methodItem => {
                    const kav = methodItem.split(":");
                    const key = kav[0];
                    // 这里获取的是原始data数据
                    if (window.methodSourceMap && window.methodSourceMap[key]) {
                        return `${key}: ${window.methodSourceMap[key]}`;
                    } else {
                        return methodItem;
                    }
                })
            }
            return result;
        },
        preConvertStyleResult(selectorSet) {
            let result = '';
            const selectorValues = selectorSet.values();
            const selectorKeys = Object.keys(window.styleSourceMap);

            for (const selector of selectorValues) {
                // styleSourceMap中保留了所有的原始选择器，这里只处理class的
                const findResults = selectorKeys.filter(key => {
                    return key === `.${selector}` || key.indexOf(`.${selector} `) >= 0 || key.indexOf(` .${selector}`) >= 0;
                })

                if (findResults && findResults.length > 0) {
                    findResults.forEach(findResult => {
                        result += `${findResult} { ${window.styleSourceMap[findResult]} }\n`;
                    })
                    selectorSet.delete(selector);
                }
            }
            return result;
        },
        checkIsDataDirectives,
        checkIsMethodDirectives,
        unSupportedKey: function (key, value) {
            // 对于这一类需要警示，因为可能是被遗漏的
            if (/^v-/g.test(key) || /^:+/g.test(key)) {
                console.warn(`可能遗漏了这些: ${key}: ${value}`);
            } else {
                console.info(`unsupport key: ${key}: ${value}`);
            }
        }
    });
}