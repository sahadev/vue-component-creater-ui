import { createApp } from 'vue';

import './styles/tokens.css';
import './legacy/styles/legacy.css';

import VCC from './legacy/components-v2/VCC.vue';
import { installPlugins } from './app-plugins';
import { installBuiltinSpecs } from './core/registry';

installBuiltinSpecs();

const app = installPlugins(createApp(VCC));
app.mount('#app');

