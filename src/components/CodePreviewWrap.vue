<template>
  <preview :value="preview" class="panel"></preview>
</template>

<script>
import Preview from '@/components/Preview';
import { parseComponent } from 'vue-template-compiler/browser';
import getImports from '@/utils/get-imports';
import getPkgs from '@/utils/get-pkgs';
import isAbsouteUrl from 'is-absolute-url';
import * as params from '@/utils/params';

export default {
  props: ['code'],

  components: {
    Preview
  },

  data: () => ({
    preview: '',
  }),

  watch: {
    code: {
      handler: function (newValue) {
        this.compile(newValue);
      },
      immediate: true
    }
  },

  methods: {
    async compile(code) {

      if (!code) {
        return;
      }
      const imports = [];
      const { template, script, styles, customBlocks } = parseComponent(code);
      let config;

      if ((config = customBlocks.find(n => n.type === 'config'))) {
        params.clear();
        params.parse(config.content);
      }

      let compiled;
      const pkgs = [];
      let scriptContent = 'exports = { default: {} }';

      if (script) {
        try {
          compiled = window.Babel.transform(script.content, {
            presets: ['es2015', 'es2016', 'es2017', 'stage-0'],
            plugins: [[getImports, { imports }]]
          }).code;
        } catch (e) {
          this.preview = `<pre style="color: red">${e.message}</pre>`;
          return;
        }
        scriptContent = await getPkgs(compiled, imports, pkgs);
      }

      const heads = this.genHeads();
      const scripts = [];

      pkgs.forEach(pkg => {
        scripts.push(
          `<script src=//packd.now.sh/${pkg.module}${pkg.path}?name=${pkg.name
          }><\/script>`
        );
      });

      styles.forEach(style => {
        heads.push(`<style>${style.content}</style>`);
      });

      scripts.push(`
      <script>
        var exports = {};
        ${scriptContent}
        var component = exports.default;
        component.template = component.template || ${JSON.stringify(
        template.content
      )}

        new Vue(component).$mount('#app')
      <\/script>`);

      this.preview = {
        head: heads.join('\n'),
        body: '<div lc_id="app"></div>' + scripts.join('\n')
      };
    },

    genHeads() {
      let heads = [];

      const { pkgs, css } = params.get();

      return [].concat(
        []
          .concat(pkgs)
          .map(
            pkg =>
              `<script src="${isAbsouteUrl(pkg) ? '' : prefix}${pkg}"><\/script>`
          ),
        css.map(
          item =>
            `<link rel=stylesheet href="${isAbsouteUrl(item) ? '' : prefix
            }${item}">`
        )
      );
    },
  }
};
</script>

<style src="modern-normalize"></style>
<style scoped>
.panel {
  background-color: white;
}
</style>
