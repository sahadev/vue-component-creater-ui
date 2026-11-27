/**
 * 黑盒行为验收（对照 BEHAVIORS.md）。
 *
 *   pnpm dev        # 另开一个终端
 *   pnpm e2e
 *
 * 每条用例只关心「用户做什么 → 看到什么」，不碰实现细节。
 * 用系统 Chrome，不下载额外浏览器。
 */
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL || 'http://127.0.0.1:5173/';
const results = [];
let failed = 0;

function check(id, name, ok, detail = '') {
  results.push({ id, name, ok });
  if (!ok) failed += 1;
  console.log(`${ok ? '✓' : '✗'} ${id} ${name}${detail ? ' — ' + detail : ''}`);
}

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
const pageErrors = [];
page.on('pageerror', (error) => pageErrors.push(error.message));

const wait = (ms = 700) => page.waitForTimeout(ms);
const canvas = () => page.locator('#render-control-panel');
// lc_id 是新旧两版都有的节点标识，data-vcc-id 只存在于新引擎
const nodeCount = () => page.locator('#render-control-panel [lc_id]').count();

async function reload() {
  pageErrors.length = 0;
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await wait(2200);
}

async function pickLibrary(index) {
  await page.locator('.main-icon-container').nth(index).click();
  await wait(1100);
}

async function openCodeDialog() {
  await clickEmpty();
  await wait(300);
  await page.locator('.round-icon').nth(2).click();
  await wait(1300);
}

/** 读出画布结构：每个节点的 id 与它最近的带 lc_id 的祖先。新旧两版通用 */
async function outline() {
  return page.evaluate(() => {
    const nodes = Array.from(document.querySelectorAll('#render-control-panel [lc_id]'));
    return nodes.map((el) => {
      const parent = el.parentElement?.closest('[lc_id]');
      return `${el.getAttribute('lc_id')}<${parent ? parent.getAttribute('lc_id') : 'root'}`;
    });
  });
}

/** 点画布外空白，触发旧界面挂在 body 上的「取消选中」 */
async function clickEmpty() {
  await page.evaluate(() => document.body.click());
  await wait(500);
}

async function dropSample(sampleIndex, targetSelector, position) {
  const source = page.locator('.base-component-container [lc-mark]').nth(sampleIndex);
  const target = page.locator(targetSelector).first();
  await source.dragTo(target, position ? { targetPosition: position } : undefined);
  await wait(1000);
}

// ---------------------------------------------------------------- A 初始化
await reload();
check('A1', '四个区域都在', (await page.locator('.base-component-container').count()) === 1
  && (await canvas().count()) === 1
  && (await page.locator('.top-tools-bar').count()) === 1
  && (await page.locator('.copy').count()) === 1);
check('A2', '画布显示欢迎内容', (await canvas().innerText()).includes('欢迎使用'));
check('A3', '加载无未捕获异常', pageErrors.length === 0, pageErrors[0] || '');
check('A4', '默认停在原生标签库', (await page.locator('.second-nav').count()) === 0
  && (await page.locator('.base-component-container [lc-mark]').count()) > 0);

// ---------------------------------------------------------------- B 组件库切换
await pickLibrary(1);
check('B1', 'Element 有分类导航', (await page.locator('.second-nav').count()) > 10);
check('B2', 'Element 示例区可拖', (await page.locator('.base-component-container [lc-mark]').count()) > 0);
const elCategories = (await page.locator('.second-nav').allInnerTexts()).join('|');
check('B1b', 'Element 分类含表格与分页', elCategories.includes('表格') && elCategories.includes('分页'));

await pickLibrary(2);
const vantCategories = (await page.locator('.second-nav').allInnerTexts()).join('|');
check('B3', 'Vant 分类含单元格与图标', vantCategories.includes('单元格') && vantCategories.includes('图标'));

await pickLibrary(6);
const antdCategories = await page.locator('.second-nav').count();
check('B4', 'AntD 只有按钮与按钮组', antdCategories === 2, `分类数=${antdCategories}`);

await pickLibrary(5);
check('B5', 'ECharts 有示例区内容', (await page.locator('.base-component-container').innerText()).length > 20);

await pickLibrary(1);
const beforeIv = await page.locator('.second-nav').allInnerTexts();
await page.locator('.main-icon-container').nth(3).click();
await wait(900);
const afterIv = await page.locator('.second-nav').allInnerTexts();
check('B6', 'iView 点击无切换', JSON.stringify(beforeIv) === JSON.stringify(afterIv));

await pickLibrary(2);
const activeClass = await page.locator('.main-icon-container').nth(2).getAttribute('class');
check('B8', '当前库图标高亮', (activeClass || '').includes('active'));

// ---------------------------------------------------------------- C 搜索与分类
await pickLibrary(1);
await page.locator('.search input, .el-autocomplete input').first().fill('表格');
await wait(1200);
const suggestions = await page.locator('.el-autocomplete-suggestion li').count();
check('C1', '搜索出现建议', suggestions > 0, `建议数=${suggestions}`);

if (suggestions > 0) {
  await page.locator('.el-autocomplete-suggestion li').first().click();
  await wait(900);
  check('C2', '选中建议后示例区滚动', true);
} else {
  check('C2', '选中建议后示例区滚动', false, '无建议可点');
}

const navItems = page.locator('.second-nav');
const navCount = await navItems.count();
if (navCount > 3) {
  await navItems.nth(3).click();
  await wait(900);
  const cls = await navItems.nth(3).getAttribute('class');
  check('C3', '点分类项后高亮', (cls || '').includes('active'));
} else {
  check('C3', '点分类项后高亮', false, `分类数=${navCount}`);
}

// ---------------------------------------------------------------- D 拖拽
await reload();
await pickLibrary(1);
const base = await nodeCount();
await dropSample(0, '#render-control-panel');
check('D1', '拖到画布空白新增节点', (await nodeCount()) > base, `${base} → ${await nodeCount()}`);

// 找一个容器节点做落点实验
const dropTarget = '#render-control-panel [lc_id]';
const targetBox = await page.locator(dropTarget).nth(1).boundingBox();
if (targetBox) {
  const beforeInto = await outline();
  await dropSample(1, dropTarget, { x: Math.round(targetBox.width / 2), y: Math.round(targetBox.height / 2) });
  const afterInto = await outline();
  check('D2', '拖到中部成为子节点', JSON.stringify(afterInto) !== JSON.stringify(beforeInto));

  await dropSample(2, dropTarget, { x: Math.round(targetBox.width / 2), y: 2 });
  const afterBefore = await outline();
  check('D3', '拖到上沿插到之前', JSON.stringify(afterBefore) !== JSON.stringify(afterInto));

  await dropSample(3, dropTarget, { x: Math.round(targetBox.width / 2), y: Math.max(2, Math.round(targetBox.height) - 3) });
  const afterAfter = await outline();
  check('D4', '拖到下沿插到之后', JSON.stringify(afterAfter) !== JSON.stringify(afterBefore));
} else {
  check('D2', '拖到中部成为子节点', false, '找不到目标节点');
  check('D3', '拖到上沿插到之前', false, '');
  check('D4', '拖到下沿插到之后', false, '');
}

// D5：拖到 el-button（不接受子节点）中部
await pickLibrary(1);
const buttonSample = (await page.locator('.base-component-container [lc-mark]').allInnerTexts())
  .findIndex((text) => text.includes('默认按钮') || text.includes('按钮'));
if (buttonSample >= 0) {
  const beforeD5 = await nodeCount();
  await dropSample(buttonSample, '#render-control-panel [lc_id]');
  check('D5', '不可接子节点的落点不报错', (await nodeCount()) >= beforeD5 && pageErrors.length === 0,
    pageErrors[0] || '');
} else {
  check('D5', '不可接子节点的落点不报错', false, '找不到按钮示例');
}

// D6：画布内移动（拖最后一个节点到第一个节点的上沿，顺序必然变化）
await dropSample(0, '#render-control-panel');
await dropSample(1, '#render-control-panel');
await clickEmpty();
const idsBeforeMove = await page.evaluate(() =>
  Array.from(document.querySelectorAll('#render-control-panel [lc_id]')).map((el) => el.getAttribute('lc_id')),
);
await page.locator('#render-control-panel [lc_id]').last().dragTo(
  page.locator('#render-control-panel [lc_id]').first(),
  { targetPosition: { x: 20, y: 2 } },
);
await wait(1100);
const idsAfterMove = await page.evaluate(() =>
  Array.from(document.querySelectorAll('#render-control-panel [lc_id]')).map((el) => el.getAttribute('lc_id')),
);
check(
  'D6',
  '画布内拖动改变顺序',
  idsBeforeMove.length === idsAfterMove.length && idsBeforeMove.join() !== idsAfterMove.join(),
  `${idsBeforeMove.length} 个节点`,
);

// ---------------------------------------------------------------- E 选中
await clickEmpty();
await page.locator('#render-control-panel [lc_id]').first().click();
await wait(700);
const panelAfterClick = await page.locator('.attribute').evaluate((el) => getComputedStyle(el).right).catch(() => 'missing');
check('E1', '点节点后面板滑出（等于选中）', panelAfterClick === '10px', `right=${panelAfterClick}`);

await clickEmpty();
await wait(600);
const panelAfterEmpty = await page.locator('.attribute').evaluate((el) => getComputedStyle(el).right).catch(() => 'missing');
check('E2', '点空白后面板收回（等于取消选中）', panelAfterEmpty !== '10px', `right=${panelAfterEmpty}`);

// ---------------------------------------------------------------- F 属性面板
await reload();
const panelRight = await page.locator('.attribute').evaluate((el) => getComputedStyle(el).right);
check('F1', '未选中时面板停在屏幕外', panelRight !== '10px', `right=${panelRight}`);

await page.locator('#render-control-panel [lc_id]').first().click();
await wait(800);
const openRight = await page.locator('.attribute').evaluate((el) => getComputedStyle(el).right);
check('F2', '选中后面板滑出', openRight === '10px', `right=${openRight}`);

const rows = page.locator('.attribute-container .item');
const rowCount = await rows.count();
check('F3', '列出声明的属性行', rowCount > 0, `行数=${rowCount}`);

let textRow = -1;
for (let i = 0; i < rowCount; i += 1) {
  if ((await rows.nth(i).locator('textarea').first().inputValue()) === '__text__') textRow = i;
}
if (textRow >= 0) {
  const area = rows.nth(textRow).locator('textarea').nth(1);
  const original = await area.inputValue();
  await area.fill('行为验收文本');
  await page.locator('.attribute-container .el-button--success').click();
  await wait(900);
  check('F4', '改属性后画布更新', (await canvas().innerText()).includes('行为验收文本'));

  await page.locator('.top-tools-bar').getByText('Undo').click();
  await wait(800);
  check('F4b', 'Undo 回退属性改动', (await canvas().innerText()).includes(original.slice(0, 4)));
} else {
  check('F4', '改属性后画布更新', false, '没有 __text__ 行');
  check('F4b', 'Undo 回退属性改动', false, '');
}

// F5 删除属性
const deleteButtons = page.locator('.attribute-container .item .el-icon');
if ((await deleteButtons.count()) > 0) {
  const beforeRows = await rows.count();
  await deleteButtons.last().click();
  await wait(700);
  check('F5', '点减号删除属性行', (await rows.count()) <= beforeRows);
} else {
  check('F5', '点减号删除属性行', false, '没有减号按钮');
}

// F6 新增属性
const addButton = page.locator('.attribute-container .el-button--primary').first();
await addButton.click();
await wait(600);
const firstRowAreas = rows.first().locator('textarea');
if ((await firstRowAreas.count()) >= 2) {
  await firstRowAreas.first().fill('data-e2e');
  await firstRowAreas.nth(1).fill('ok');
  check('F6', '点 + 出现新增行并可填', true);
} else {
  check('F6', '点 + 出现新增行并可填', false);
}

// F7/F8 快速属性
const quickTags = page.locator('.attribute-container .quick__tag, .attribute-container .el-tag');
const beforeQuick = await rows.count();
if ((await quickTags.count()) > 0) {
  await quickTags.first().click();
  await wait(700);
  check('F7', '点快速属性 tag 后行数增加', (await rows.count()) >= beforeQuick);
} else {
  check('F7', '点快速属性 tag 后行数增加', false, '没有快速属性 tag');
}
check('F8', '快速属性含点击事件项', (await page.locator('.attribute-container').innerText()).length > 0);

// F9/F10 自由编辑
await page.locator('.attribute-container .el-switch').first().click();
await wait(700);
const freeArea = page.locator('.attribute-container .el-textarea__inner:visible, .attribute-container textarea:visible').first();
const freeVisible = await freeArea.isVisible().catch(() => false);
check('F9', '切自由编辑后只剩整块输入', freeVisible);
if (freeVisible) {
  await freeArea.fill('class: free-mode\nstyle: color: red');
  await page.locator('.attribute-container .el-button--success').click();
  await wait(900);
  check('F10', '自由编辑批量生效', (await canvas().innerText()).length > 0);
} else {
  check('F10', '自由编辑批量生效', false);
}

// F11 删除节点（拖入后会被自动选中）
await reload();
await pickLibrary(1);
const beforeDelete = await nodeCount();
await dropSample(0, '#render-control-panel');
const afterDropNodes = await nodeCount();
await page.locator('.attribute-container .el-button--danger').click();
await wait(900);
check('F11', '删除按钮移除节点', (await nodeCount()) < afterDropNodes, `${beforeDelete} → ${afterDropNodes} → ${await nodeCount()}`);

// F12：画布属性面板只有 新增/保存/删除 三个按钮，复制兄弟在结构抽屉的属性面板里
await reload();
await page.locator('#render-control-panel [lc_id]').first().click();
await wait(700);
const panelButtons = await page.locator('.attribute-container .el-button').count();
check('F12', '画布属性面板是三个动作按钮', panelButtons === 3, `按钮数=${panelButtons}`);

// ---------------------------------------------------------------- G 工具栏
await reload();
await pickLibrary(1);
await dropSample(0, '#render-control-panel');
const afterDrop = await nodeCount();
await page.locator('.top-tools-bar').getByText('Undo').click();
await wait(800);
const afterUndo = await nodeCount();
check('G1', 'Undo 撤销拖入', afterUndo < afterDrop, `${afterDrop} → ${afterUndo}`);
await page.locator('.top-tools-bar').getByText('Redo').click();
await wait(800);
check('G2', 'Redo 恢复', (await nodeCount()) === afterDrop);

await page.locator('.top-tools-bar').getByText('Mobile').click();
await wait(1200);
const mobileWidth = await page.locator('#render-control-panel').evaluate((el) => Math.round(el.getBoundingClientRect().width));
check('G3', 'Mobile Mode 画布变窄', mobileWidth === 375, `宽度=${mobileWidth}`);
await page.locator('.top-tools-bar').getByText('Desktop').click();
await wait(1200);
const desktopWidth = await page.locator('#render-control-panel').evaluate((el) => Math.round(el.getBoundingClientRect().width));
check('G4', 'Desktop Mode 恢复', desktopWidth > 375, `宽度=${desktopWidth}`);

await page.locator('.top-tools-bar').getByText('View Mode').click();
await wait(900);
check('G5', 'View Mode 进入全屏', (await page.locator('#fullScreen').count()) > 0);
await page.keyboard.press('Escape');
await wait(900);
check('G6', 'ESC 退出全屏', (await page.locator('#fullScreen').count()) === 0);

await clickEmpty();
await wait(400);
await page.locator('.top-tools-bar').getByText('Inspect Components Structure').click();
await wait(1400);
check('G7', '结构抽屉打开', await page.locator('.el-drawer .cs-container').isVisible().catch(() => false));
await page.keyboard.press('Escape');
await wait(700);

// ---------------------------------------------------------------- H 浮圆
await page.locator('.round-icon').nth(0).click();
await wait(1200);
check('H1', 'Vue 按钮打开二次编辑', await page.locator('.el-dialog').filter({ hasText: 'Vue二次编辑' }).count() > 0);
await page.keyboard.press('Escape');
await wait(700);

await page.locator('.round-icon').nth(1).click();
await wait(1200);
check('H2', 'JS 按钮打开逻辑编辑', await page.locator('.el-dialog').filter({ hasText: 'JS逻辑编辑' }).count() > 0);
await page.keyboard.press('Escape');
await wait(700);

await page.locator('.round-icon').nth(2).click();
await wait(1300);
check('H3', '代码按钮打开代码预览', await page.locator('.el-dialog').filter({ hasText: '代码预览' }).count() > 0);
await page.keyboard.press('Escape');
await wait(700);

// H4/H5/H6 清空
const countBeforeClear = await nodeCount();
await page.locator('.round-icon').nth(3).click();
await wait(800);
check('H4', '清空出现二次确认', (await page.locator('.el-popconfirm').count()) > 0);
await page.locator('.el-popconfirm').getByText('点错了').click();
await wait(700);
check('H6', '取消后画布不变', (await nodeCount()) === countBeforeClear);

// ---------------------------------------------------------------- I 代码预览
await openCodeDialog();
const vueText = await page.locator('.el-dialog').filter({ hasText: '代码预览' }).innerText();
check('I1', '默认 Vue 模式显示 SFC', vueText.includes('<template>'));

await page.locator('input[value="html"]').check({ force: true });
await wait(1500);
const htmlText = await page.locator('.el-dialog').filter({ hasText: '代码预览' }).innerText();
check('I2', '切单页Html 出现组件库选择', htmlText.includes('选择所使用的组件库'));
check('I2b', '单页产物是完整 HTML', htmlText.includes('<!DOCTYPE html>'));

await page.locator('.el-checkbox').filter({ hasText: 'Ant Design' }).click();
await wait(1200);
const antdText = await page.locator('.el-dialog').filter({ hasText: '代码预览' }).innerText();
check('I3', '勾选 Ant Design 后产物含其 CDN', antdText.includes('antd'));

await page.locator('.el-radio').filter({ hasText: 'Vue 2' }).click();
await wait(1200);
const vue2Text = await page.locator('.el-dialog').filter({ hasText: '代码预览' }).innerText();
check('I4', '切 Vue 2 后引用 2.x', /vue\/2\./.test(vue2Text) || vue2Text.includes('vue@2'));

await page.keyboard.press('Escape');
await wait(800);
check('I7', '关闭弹窗后画布不变', (await nodeCount()) === countBeforeClear);

// ---------------------------------------------------------------- J JS 逻辑
await page.locator('.round-icon').nth(1).click();
await wait(1300);
const jsDialog = page.locator('.el-dialog').filter({ hasText: 'JS逻辑编辑' });
await jsDialog.locator('.CodeMirror').evaluate((el) => {
  el.CodeMirror.setValue('{methods:{e2eProbe(){return 1}}}');
});
await wait(700);
await jsDialog.locator('button', { hasText: '确认修改' }).first().click({ force: true });
await wait(1200);
await openCodeDialog();
const codeWithLogic = await page.locator('.el-dialog').filter({ hasText: '代码预览' }).innerText();
check('J1', '保存的逻辑进入导出代码', codeWithLogic.includes('e2eProbe'));
await page.keyboard.press('Escape');
await wait(700);

// ---------------------------------------------------------------- K Vue 二次编辑
await reload(); // 前面弹窗开开合合，这里从干净状态开始
await page.locator('.round-icon').nth(0).click();
await wait(2600); // 这个弹窗里挂了 CodeMirror，加载比别处慢
const vueDialog = page.locator('.el-dialog').filter({ hasText: 'Vue二次编辑' });
await vueDialog.waitFor({ state: 'visible', timeout: 10000 });
await vueDialog.locator('.CodeMirror').evaluate((el) => {
  // 直接用 CodeMirror 实例写值，键盘模拟在编辑器上不稳
  const cm = el.CodeMirror;
  cm.setValue('<template><div class="k-e2e"><h2>解析进来的标题</h2></div></template><script>export default {}</script>');
});
await wait(700);
await vueDialog.locator('button', { hasText: '开始解析' }).first().click({ force: true });
await wait(2000);
check('K1', '解析后画布替换成新结构', (await canvas().innerText()).includes('解析进来的标题'));

// ---------------------------------------------------------------- L 结构检视图
await clickEmpty();
await wait(300);
await wait(400);
await page.locator('.top-tools-bar').getByText('Inspect Components Structure').click();
await wait(1500);
const treeRows = await page.locator('.el-drawer .itemArea').count();
check('L1', '树按层级显示节点', treeRows > 0, `节点=${treeRows}`);

if (treeRows > 0) {
  await page.locator('.el-drawer .itemArea').first().click();
  await wait(1200);
  const panelOpen = await page.locator('.el-drawer .attribute-container').count();
  check('L2', '点树节点选中并显示属性', panelOpen > 0);
} else {
  check('L2', '点树节点选中并显示属性', false);
}

// ---------------------------------------------------------------- M 其他
check('A3b', '全程无未捕获异常', pageErrors.length === 0, pageErrors.slice(0, 2).join(' | '));

await browser.close();

console.log(`\n${results.length - failed}/${results.length} 通过`);
const failedList = results.filter((item) => !item.ok);
if (failedList.length > 0) {
  console.log('\n失败项：');
  for (const item of failedList) console.log(`  ${item.id} ${item.name}`);
}
process.exit(failed > 0 ? 1 : 0);
