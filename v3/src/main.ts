import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import './styles/tokens.css';
import App from './ui/App.vue';
import { installBuiltinSpecs } from './core/registry';
import { createEmptyDocument, readStateFromUrl } from './core/document';
import { useEditorStore } from './store/editor';

installBuiltinSpecs();

const app = createApp(App);
app.use(createPinia());
app.use(ElementPlus);
app.mount('#app');

// URL 里带了稿件就还原，否则从空文档开始
const store = useEditorStore();
const { doc, viewportWidth } = readStateFromUrl(window.location.search);

if (doc && viewportWidth) store.viewportWidth = viewportWidth;
store.reset(doc ?? createEmptyDocument());
