import isEqual from "lodash-es/isEqual";
import { customAlphabet, nanoid } from 'nanoid';

export function getRawComponentKey(__rawVueInfo__) {
    return Object.keys(__rawVueInfo__)[0];
}

export function getRawComponentContent(__rawVueInfo__) {
    return __rawVueInfo__[getRawComponentKey(__rawVueInfo__)];
}

/**
 * 比较两个对象是否完全相等
 */
export function compareTwoObjectIsEqual(o1, o2) {
    return isEqual(o1, o2);
}

export function isArray(arr) {
    return Object.prototype.toString.apply(arr) === "[object Array]";
}

export function isObject(obj) {
    return Object.prototype.toString.apply(obj) === "[object Object]";
}

/**
 * @description 生成唯一ID
 */
 export function createUniqueId() {
  const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);
  return nanoid();
}

 /**
* 遍历对象，添加ID
* @param {*} jsonObj
*/
export function ergodic(jsonObj) {
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
     jsonObj["lc_id"] = createUniqueId();
   }
 }
}

/**
 * 从解析后的Vue结构中找到关键的根节点
 * 根节点分包是：template/script/style
 * 
 * @param {*} array 
 * @param {*} propertyName 
 * @returns 
 */
export function findAObject(array, propertyName) {
  const module = array.find(function (ele) {
    return ele[propertyName];
  });
  return module || null;
}