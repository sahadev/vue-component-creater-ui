/**
 * 界面交互验收。
 *
 * 单测只覆盖纯函数，覆盖不到「点了没反应」这类问题——单页 HTML 那个 bug 就是
 * parseComponent 抛错打断渲染，radio 看着正常但点不动。所以关键交互走真浏览器。
 *
 *   pnpm e2e              # 需要先 pnpm dev
 *   BASE_URL=... pnpm e2e
 *
 * 用系统 Chrome，不额外下载浏览器。
 */
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL || 'http://127.0.0.1:5173/';

const results = [];
let failures = 0;

function check(name, ok, detail = '') {
  results.push({ name, ok, detail });
  if (!ok) failures += 1;
  console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ' — ' + detail : ''}`);
}

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });

const pageErrors = [];
page.on('pageerror', (error) => pageErrors.push(error.message));

await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);

// 1. 界面骨架（默认停在原生标签库，它本来就没有分类导航）
check('左栏示例区有可拖元素', (await page.locator('.base-component-container [lc-mark]').count()) > 0);
await page.locator('.main-icon-container').nth(1).click();
await page.waitForTimeout(1200);
check('切换到 Element 后有分类导航', (await page.locator('.second-nav').count()) > 0);
check('画布挂载', (await page.locator('.vcc-canvas').count()) === 1);

// 2. 拖拽：示例区活文档元素 → 画布
const before = await page.locator('.vcc-canvas [data-vcc-id]').count();
await page.locator('.base-component-container [lc-mark]').nth(1).dragTo(page.locator('.vcc-canvas'));
await page.waitForTimeout(1000);
const after = await page.locator('.vcc-canvas [data-vcc-id]').count();
check('从示例区拖拽进画布', after > before, `${before} → ${after}`);

// 3. 选中 → 属性面板滑出
await page.locator('.vcc-canvas [data-vcc-id]').nth(1).click();
await page.waitForTimeout(800);
const panelRight = await page
  .locator('.attribute')
  .evaluate((el) => getComputedStyle(el).right)
  .catch(() => 'missing');
check('选中元素后属性面板滑出', panelRight === '10px', `right=${panelRight}`);

// 4. 改属性 → 画布更新
const rows = page.locator('.attribute-container .item');
let textRow = -1;
for (let i = 0; i < (await rows.count()); i += 1) {
  if ((await rows.nth(i).locator('textarea').first().inputValue()) === '__text__') {
    textRow = i;
    break;
  }
}
if (textRow >= 0) {
  const area = rows.nth(textRow).locator('textarea').nth(1);
  const original = await area.inputValue();
  await area.fill('e2e 改动');
  await page.locator('.attribute-container .el-button--success').click();
  await page.waitForTimeout(900);
  const canvasText = await page.locator('.vcc-canvas').innerText();
  check('改 __text__ 后画布更新', canvasText.includes('e2e 改动'));

  // 5. 撤销回滚
  await page.locator('.top-tools-bar').getByText('Undo').click();
  await page.waitForTimeout(800);
  const reverted = await page.locator('.vcc-canvas').innerText();
  check('撤销后回到原值', !reverted.includes('e2e 改动') && reverted.includes(original.slice(0, 4)));
} else {
  check('找到 __text__ 属性行', false, '未找到');
}

// 6. 代码预览：Vue 模式
await page.locator('.vcc-canvas').click({ position: { x: 400, y: 600 } });
await page.waitForTimeout(400);
await page.locator('.round-icon').nth(2).click();
await page.waitForTimeout(1500);
const vueCode = await page.locator('.el-dialog').first().innerText();
check('代码弹窗给出 Vue 代码', vueCode.includes('<template>'));

// 7. 切「单页 Html」——这里曾经整块点不动
// 点 label 会被上面的 CodeMirror 挡（滚动位置相关），直接操作 input 更稳
await page.locator('input[value="html"]').check({ force: true });
await page.waitForTimeout(1500);
check('单页Html 单选可选中', await page.locator('input[value="html"]').isChecked());
check(
  '切换后出现组件库选择',
  (await page.getByText('选择所使用的组件库').count()) > 0,
);
const htmlCode = await page.locator('.el-dialog').first().innerText();
check('生成完整单页 HTML', htmlCode.includes('<!DOCTYPE html>'));

// 8. 结构抽屉
await page.keyboard.press('Escape');
await page.waitForTimeout(800);
await page.locator('.top-tools-bar').getByText('Inspect Components Structure').click();
await page.waitForTimeout(1500);
check('结构抽屉打开', await page.locator('.el-drawer .cs-container').isVisible().catch(() => false));
check('抽屉里树有节点', (await page.locator('.el-drawer .itemArea').count()) > 0);

// 9. 全程没有未捕获异常
check('无页面级异常', pageErrors.length === 0, pageErrors.slice(0, 2).join(' | '));

await browser.close();

console.log(`\n${results.length - failures}/${results.length} 通过`);
if (failures > 0) process.exit(1);
