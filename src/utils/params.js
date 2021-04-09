import qs from 'query-string';
import deepmerge from 'deepmerge';

const DEFAULT_PARAMS = {
  pkgs: ['https://static.imonkey.xueersi.com/vue-creater-platform/resource/vue.js', 'https://static.imonkey.xueersi.com/vue-creater-platform/resource/element-ui/index.js'],
  css: ['https://static.imonkey.xueersi.com/vue-creater-platform/resource/element-ui/index.css'],
};

let params = DEFAULT_PARAMS;

function getArr(str) {
  if (Array.isArray(str)) {
    return str;
  }
  if (typeof str === 'string') {
    return str.split(',');
  }
  return [];
}

export function clear() {
  params = DEFAULT_PARAMS;
}

export function parse(str) {
  try {
    merge(JSON.parse(str));
  } catch (e) {
    console.error('error', e.message);
  }
}

export function queryParse(str) {
  const query = qs.parse(str);
  const pkgs = getArr(query.pkg);
  const css = getArr(query.css);
  const options = { pkgs, css };

  if (query.cdn) {
    options.cdn = query.cdn;
  }
  if (query.vue) {
    options.vue = query.vue;
  }

  merge(options);
}

export function get() {
  return deepmerge(DEFAULT_PARAMS, params);
}

export function merge(opts) {
  params = deepmerge(params, opts);
}
