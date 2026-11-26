import { registerSpecs } from './registry';
import { htmlSpecs } from './html';
import { elementPlusSpecs } from './element-plus';

let installed = false;

/** 幂等注册全部内置组件 */
export function installBuiltinSpecs(): void {
  if (installed) return;
  installed = true;
  registerSpecs(htmlSpecs);
  registerSpecs(elementPlusSpecs);
}

export * from './registry';
export { htmlSpecs } from './html';
export { elementPlusSpecs } from './element-plus';
