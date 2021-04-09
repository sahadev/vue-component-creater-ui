import isEqual from "lodash/isEqual";

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