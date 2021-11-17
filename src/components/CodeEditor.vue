<template>
  <div class="codemirror">
    <codemirror v-model="code" :options="cmOption" @cursorActivity="onCmCursorActivity" @ready="onCmReady"
      @focus="onCmFocus" @blur="onCmBlur" />
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'

// base style
import 'codemirror/lib/codemirror.css'

// theme css
import 'codemirror/theme/monokai.css'

// language
import 'codemirror/mode/vue/vue.js'

// active-line.js
import 'codemirror/addon/selection/active-line.js'

// styleSelectedText
import 'codemirror/addon/selection/mark-selection.js'
import 'codemirror/addon/search/searchcursor.js'

// highlightSelectionMatches
import 'codemirror/addon/scroll/annotatescrollbar.js'
import 'codemirror/addon/search/matchesonscrollbar.js'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/match-highlighter.js'

// keyMap
import 'codemirror/mode/clike/clike.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/comment/comment.js'
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/search.js'
import 'codemirror/keymap/sublime.js'

// foldGutter
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/comment-fold.js'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/indent-fold.js'
import 'codemirror/addon/fold/markdown-fold.js'
import 'codemirror/addon/fold/xml-fold.js'

require(['axios'], axios => {
  self.axios = axios.create({
    baseURL: '',
    timeout: 1000,
  });
});

export default {
  props: ['initCode'],
  name: 'code-editor',
  title: 'Mode: text/x-vue & Theme: monokai',
  components: {
    codemirror
  },
  computed: {
    code: {
      get() {
        return this.codeStore;
      },
      set(newVal) {
        this.codeStore = newVal;
      }
    }
  },
  data() {
    return {
      codeStore: this.initCode,
      cmOption: {
        tabSize: 4,
        foldGutter: true,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        keyMap: "sublime",
        mode: 'text/javascript',
        theme: 'monokai',
        extraKeys: {
          'F11'(cm) {
            cm.setOption("fullScreen", !cm.getOption("fullScreen"))
          },
          'Esc'(cm) {
            if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false)
          }
        }
      }
    }
  },
  methods: {
    onCmCursorActivity(codemirror) {
    },
    onCmReady(codemirror) {
    },
    onCmFocus(codemirror) {
    },
    onCmBlur(codemirror) {
    },

    getEditorCode() {
      return this.codeStore;
    }
  }
}
</script>

<style lang="scss" scoped>
.codemirror,
.pre {
  height: 100%;
  margin: 0;
  overflow: auto;
}

.pre {
  display: block;
  padding: 1rem;
  font-size: 14px;
  line-height: 1.6;
  word-break: break-all;
  word-wrap: break-word;
}
</style>

<style>
.CodeMirror {
  height: 100% !important;
  min-height: 50vh;
}

.vue-codemirror {
  height: 100% !important;
}
</style>