import isEqual from "lodash/isEqual";
import cryptoRandomString from "crypto-random-string";

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
     jsonObj["lc_id"] = cryptoRandomString({ length: 10, type: "base64" });
   }
 }
}