/**
 * 示例库。
 *
 * 原版的左栏不是"组件列表"，而是把每个组件的真实渲染摆出来当拖拽源。
 * 这里按 registry 的 schema 自动生成示例变体：找到第一个枚举属性，
 * 每个选项出一个变体；没有枚举属性就只出一个默认变体。
 */
import type { LibraryId, PropRecord, SceneNode } from './types';
import { createNodeFromSpec, listSpecs, type ComponentSpec, type PropSchema } from './registry/registry';
import { cloneWithFreshIds } from './ids';

export interface SampleVariant {
  /** 变体名，用于示例区展示 */
  label: string;
  /** 拖到画布时要插入的节点模板（插入前会换新 id） */
  node: SceneNode;
}

export interface SampleGroup {
  specKey: string;
  titleZh: string;
  titleEn: string;
  category: string;
  variants: SampleVariant[];
}

function firstEnumProp(spec: ComponentSpec): PropSchema | undefined {
  return spec.props.find(
    (prop) => prop.editor === 'select' && (prop.options?.length ?? 0) > 1,
  );
}

function buildVariants(spec: ComponentSpec): SampleVariant[] {
  const enumProp = firstEnumProp(spec);

  if (!enumProp?.options) {
    const node = createNodeFromSpec(spec);
    return [{ label: spec.name, node }];
  }

  // 空值选项用组件本名代替，避免出现空白的示例
  return enumProp.options
    .filter((option) => option.value !== '')
    .map((option) => {
      const node = createNodeFromSpec(spec);
      if (node.kind === 'component') {
        node.props[enumProp.key] = option.value;
      }
      const label = option.value === '' ? spec.name : option.label;
      return { label, node };
    });
}

/** 单个组件组的展示名，例如“Button 默认按钮” */
export function groupTitle(spec: ComponentSpec): { zh: string; en: string } {
  return { zh: spec.name, en: spec.tag };
}

const BUTTON_TYPES = [
  { label: '默认按钮', value: '' },
  { label: '主要按钮', value: 'primary' },
  { label: '成功按钮', value: 'success' },
  { label: '信息按钮', value: 'info' },
  { label: '警告按钮', value: 'warning' },
  { label: '危险按钮', value: 'danger' },
];

/**
 * 旧版把按钮拆成"默认 / 朴素 / 圆角 / 文字"四组摆示例，
 * 这里对得上，其余组件仍走自动生成的单组。
 */
function buttonGroups(spec: ComponentSpec): SampleGroup[] {
  const build = (
    titleZh: string,
    preset: PropRecord,
    labels: { label: string; value: string }[],
    textOf: (label: string) => string = (label) => label,
  ): SampleGroup => ({
    specKey: `${spec.library}:${spec.tag}:${titleZh}`,
    titleZh,
    titleEn: 'Button',
    category: spec.category,
    variants: labels.map(({ label, value }) => {
      const node = createNodeFromSpec(spec);
      if (node.kind === 'component') {
        Object.assign(node.props, preset);
        if (value) node.props.type = value;
        else delete node.props.type;
        // 示例上的文字用变体名（原版“默认按钮 / 主要按钮 / 成功按钮…”）
        for (const child of node.children) {
          if (child.kind === 'text') child.text = textOf(label);
        }
      }
      return { label, node: cloneWithFreshIds(node as unknown as { id: string; children?: unknown[] }) as SceneNode };
    }),
  });

  return [
    build('默认按钮', {}, BUTTON_TYPES),
    build('朴素按钮', { plain: true }, BUTTON_TYPES),
    build('圆角按钮', { round: true }, BUTTON_TYPES),
    build('文字按钮', { text: true }, BUTTON_TYPES.slice(0, 2), () => '按钮'),
  ];
}

const GROUP_OVERRIDES: Record<string, (spec: ComponentSpec) => SampleGroup[]> = {
  'element-plus:el-button': buttonGroups,
};

export function buildSampleGroups(library: LibraryId): SampleGroup[] {
  return listSpecs(library)
    .filter((spec) => spec.library === library)
    // 只能作为子组件存在的东西没法单独摆在示例区
    .filter((spec) => spec.standalone !== false)
    .flatMap((spec) => {
      const override = GROUP_OVERRIDES[`${spec.library}:${spec.tag}`];
      if (override) return override(spec);
      return [
        {
          specKey: `${spec.library}:${spec.tag}`,
          titleZh: spec.name,
          titleEn: spec.tag,
          category: spec.category,
          variants: buildVariants(spec),
        },
      ];
    });
}
