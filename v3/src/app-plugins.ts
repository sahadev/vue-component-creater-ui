import type { App } from 'vue';
import ElementPlus from 'element-plus';
import Vant from 'vant';
import Antd from 'ant-design-vue';
import * as ElementPlusIcons from '@element-plus/icons-vue';

import 'element-plus/dist/index.css';
import 'vant/lib/index.css';
import 'ant-design-vue/dist/reset.css';

import Chart from '@/legacy/rawComponents/echart/init.vue';

/**
 * 画布和主应用需要同一套全局注册：旧界面的示例区里混着
 * el-* / van-* / a-* / VChart 四种东西，缺一个就渲染不出来。
 */
export function installPlugins(app: App): App {
  app.use(ElementPlus);
  app.use(Vant);
  app.use(Antd);
  app.component('VChart', Chart);

  // 旧界面模板里用的是 kebab-case 图标组件名
  const icons = ElementPlusIcons as unknown as Record<string, unknown>;
  const aliases: Record<string, string> = {
    'question-filled': 'QuestionFilled',
    'circle-plus': 'CirclePlus',
    'l-refresh': 'Refresh',
    'l-delete': 'Delete',
    'document-copy': 'DocumentCopy',
    'l-minus': 'Minus',
  };
  for (const [name, source] of Object.entries(aliases)) {
    const component = icons[source];
    if (component) app.component(name, component as never);
  }

  return app;
}
