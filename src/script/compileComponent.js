// 本文件主要用于对原始组件文件进行预编译，生成新的源组件文件，与与之匹配的Json对象

const fse = require("fs-extra");
const fs = require("fs");
const { html2Json } = require("../libs/bundle-html2json-common.js");
const { Parser } = require("../libs/bundle-json2html-common.js");
const _path = require("path");
const process = require("process");
const cryptoRandomString = require("crypto-random-string");
const espree = require("espree");
const escodegen = require("escodegen");
const css = require('css');

const templateStructureMap = {};
const scriptDataMap = {};
const scriptMethodMap = {};
const styleSourceMap = {};

let repeatCounter = 1;

function isArray(arr) {
  return Object.prototype.toString.apply(arr) === "[object Array]";
}

function isObject(obj) {
  return Object.prototype.toString.apply(obj) === "[object Object]";
}

/**
 * 遍历对象，添加ID
 * @param {*} jsonObj
 */
function ergodic(jsonObj) {
  if (jsonObj) {
    for (const key in jsonObj) {
      if (jsonObj.hasOwnProperty(key)) {
        const element = jsonObj[key];

        if (isArray(element)) {
          element.forEach((item) => {
            if (isObject(item)) {
              ergodic(item);
              delete item.lc_id;
            }
          });
        } else if (isObject(element)) {
          ergodic(element);
        } else {
        }
      }
    }

    // 添加ID
    if (!jsonObj["lc_id"]) {
      jsonObj["lc_id"] = cryptoRandomString({ length: 10, type: "base64" });
    }
  }
}

/**
 * 遍历对象，生成Map
 * @param {*} jsonObj
 */
function convert2Map(jsonObj) {
  if (jsonObj) {
    for (const key in jsonObj) {
      if (jsonObj.hasOwnProperty(key)) {
        const element = jsonObj[key];

        if (isArray(element)) {
          element.forEach((item) => {
            if (isObject(item)) {
              // 给element知道自己的Key是什么
              item["__key__"] = key;
              convert2Map(item);
            }
          });
        } else if (isObject(element)) {
          // 给element知道自己的Key是什么
          element["__key__"] = key;
          convert2Map(element);
        } else {
        }

        if (key === "lc_id" && isObject(jsonObj) && jsonObj.hasOwnProperty("__key__")) {
          const outerKey = jsonObj["__key__"];
          const newObj = {};
          newObj[outerKey] = jsonObj;
          delete jsonObj.__key__;
          templateStructureMap[element] = newObj;
          // delete jsonObj["lc_id"];
        }
      }
    }
  }
}

// 对JS代码进行编译
function compileJsCode(code, onEncounterDuplicateDeclared = () => { }) {
  const ast = espree.parse(code, { ecmaVersion: 6, sourceType: "module" });
  // 提取data中返回的对象结构, 如果文件引入了其它文件, 则body[0]为import语句。
  if (ast.body[0].declaration) {
    const dataAst = ast.body[0].declaration.properties[0].value.body.body[0].argument;
    const newCode = escodegen.generate(dataAst);

    // 这里编译的组件内部应当只包含data和method，不应该包含其它属性
    if (ast.body[0].declaration.properties.length > 1) {
      const methodsAst = ast.body[0].declaration.properties[1].value.properties;
      methodsAst && methodsAst.forEach(methodAst => {

        let declaration = methodAst.key.name;

        if (scriptMethodMap[declaration]) {
          console.warn(`已定义方法${declaration}，请避免重复!`);

          declaration = generateNewDeclaration(declaration, onEncounterDuplicateDeclared);
        }
        scriptMethodMap[declaration] = escodegen.generate(methodAst.value);
      })
    }

    const object = eval(`(function(){return ${newCode}})()`)
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        const element = object[key];

        let declaration = key;

        if (scriptDataMap[declaration]) {
          console.warn(`已定义data声明${declaration}，请避免重复!`);

          declaration = generateNewDeclaration(declaration, onEncounterDuplicateDeclared);
        }
        scriptDataMap[declaration] = element;
      }
    }
  } else {
  }
}

/**
 * 生成一个新的声明
 * @param {*} declaration 
 */
function generateNewDeclaration(declaration, onEncounterDuplicateDeclared) {
  const newDeclaration = `${declaration}${repeatCounter++}`;
  if (onEncounterDuplicateDeclared) {
    onEncounterDuplicateDeclared(declaration, newDeclaration);
  }
  return newDeclaration;
}

// 将样式声明转换为css字符串
function mapStyleDecalaration(item) {
  return `${item.property}: ${item.value};`
}

function compileStyleCode(style, onEncounterDuplicateDeclared = () => { }) {
  const obj = css.parse(style);
  if (obj && obj.stylesheet) {
    const rules = obj.stylesheet.rules;
    rules && rules.forEach(rule => {
      rule.selectors.forEach(selector => {
        if (styleSourceMap[selector]) {
          console.warn(`已定义选择器${selector}，请避免重复!`);
          selector = generateNewDeclaration(selector, onEncounterDuplicateDeclared);
        }
        styleSourceMap[selector] = rule.declarations.map(mapStyleDecalaration).join(' ');
      })
    })
  }
}

function findAObject(array, propertyName) {
  const module = array.find(function (ele) {
    return ele[propertyName];
  });
  return module ? module[propertyName] : null;
}

module.exports = async function (path) {
  if (!_path.isAbsolute(path)) path = _path.join(process.cwd(), path);
  if (fse.pathExistsSync(path)) {
    const xmlData = fs.readFileSync(path, {
      encoding: "utf-8",
    });

    const obj = await html2Json(xmlData);

    // 对模板进行处理
    ergodic(findAObject(obj.root.__children, 'template'));

    // 被重复声明的data、method、css
    const repeatDecalations = [];

    // 解析默认Data
    const script = findAObject(obj.root.__children, 'script');
    if (script) {
      compileJsCode(script['__text__'], (oldD, newD) => {
        repeatDecalations.push({
          oldD,
          newD
        })
      });
    } else {
      console.warn(`以下文件没有Script内容:${path}`);
    }

    // 解析CSS
    const style = findAObject(obj.root.__children, 'style');
    if (style && style['__text__']) {
      compileStyleCode(style['__text__'], (oldD, newD) => {
        repeatDecalations.push({
          oldD,
          newD
        })
      });
    } else {
      console.warn(`以下文件没有Style内容:${path}`);
    }

    const defaultOptions = {
      attributeNamePrefix: "@_",
      attrNodeName: false, //default is false
      textNodeName: "#text",
      ignoreAttributes: false,
      cdataTagName: "__cdata", //default is false
      cdataPositionChar: "\\c",
      format: true,
      indentBy: "  ",
      supressEmptyNode: false,
    };

    const parser = new Parser(defaultOptions);
    let newVueContent = parser.parse(obj.root);

    // 对此文件做一次替换，替换那些已经重复声明过的属性
    repeatDecalations.forEach(repeatDecalation => {
      const regEx = new RegExp(`\\b${repeatDecalation.oldD}\\b`, 'gm');

      // 先将含有 '-word' 这类的替换为别的，等正常替换为别的之后再替换回来。这是为了解决\bxxx\b匹配到-xxx的问题
      const regExWithMiddle = new RegExp(`-\\b${repeatDecalation.oldD}\\b`, 'gm');
      const copyResult = `_${repeatDecalation.oldD}_`;
      newVueContent = newVueContent.replace(regExWithMiddle, copyResult);

      newVueContent = newVueContent.replace(regEx, `${repeatDecalation.newD}`);

      // 还原'_word_'为'-word'
      newVueContent = newVueContent.replace(new RegExp(`_${repeatDecalation.oldD}_`, 'gm'), `-${repeatDecalation.oldD}`);
    });


    // 将代码转换，再输出至原始文件
    const rawCodeOutputPath = path;
    fse.ensureFileSync(rawCodeOutputPath);
    fs.writeFileSync(rawCodeOutputPath, newVueContent);

    convert2Map(obj.root.__children[0].template);

    // 输出到template.index.js文件中
    outputToFile(templateStructureMap, "src/map/template.index.js");

    // data.index.js文件中
    outputToFile(scriptDataMap, "src/map/data.index.js")

    // method.index.js文件中
    outputToFile(scriptMethodMap, "src/map/method.index.js")

    // style.index.js文件中
    outputToFile(styleSourceMap, "src/map/style.index.js")
  } else {
    console.info(`路径不存在:${path}`);
  }
};

function outputToFile(sourceObject, path) {
  const outputPath = _path.join(process.cwd(), path);
  fse.ensureFileSync(outputPath);
  fs.writeFileSync(outputPath, `export default ${JSON.stringify(sourceObject)}`);
}