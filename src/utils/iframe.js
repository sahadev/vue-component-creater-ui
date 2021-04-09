/**
 * From: https://github.com/egoist/codepan/blob/2c22bb3d7a7a4e31fd99fc640d320f7ec24d2951/src/utils/iframe.js
 */
import { Loading } from 'element-ui';
class Iframe {
  constructor({ container, el, sandboxAttributes = [] }) {
    if (!el) {
      throw new Error('Expect "el" to mount iframe to!');
    }
    this.$container = container;
    this.$el = el;
    this.sandboxAttributes = sandboxAttributes;
  }

  setHTML(obj) {
    let html;

    if (typeof obj === 'string') {
      html = obj;
    } else {
      const { head = '', body = '' } = obj;
      html = `<!DOCTYPE html><html><head>${head}</head><body>${body}</body></html>`;
    }

    // 关闭上一个实例引起的loading
    if (this.loadingInstance) {
      this.loadingInstance.close();
    }

    this.loadingInstance = Loading.service({
      target: this.$container,
      text: '渲染中，请稍后...'
    });

    const iframe = this.createIframe();
    iframe.addEventListener('load', () => {
      this.loadingInstance.close();
    })

    this.$el.parentNode.replaceChild(iframe, this.$el);
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html);
    iframe.contentWindow.document.close();

    this.$el = iframe;
  }

  createIframe() {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('sandbox', this.sandboxAttributes.join(' '));
    iframe.setAttribute('scrolling', 'yes');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0';
    return iframe;
  }
}

export default (...args) => new Iframe(...args);
