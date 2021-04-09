import Vue from 'vue';
import { stringify } from 'query-string';

const API = 'https://text.cinwell.xyz';

export async function upload(text) {
  Vue.toasted.show('Saving...');

  try {
    const result = await fetch(API, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: stringify({
        text,
        hash: 1
      })
    });

    Vue.toasted.clear();

    return await result.text();
  } catch (e) {
    Vue.toasted.clear();
    Vue.toasted.show('Failed: ' + e.message, {
      type: 'error',
      duration: 2000
    });
  }
}

export function downloadURL(hash) {
  return `${API}/${hash}`;
}
