declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
  export default component;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.css';

declare module '@/legacy/libs/store' {
  export const store: {
    state: Record<string, unknown>;
    commit: (type: string, payload?: unknown) => void;
  };
}

declare module '@/legacy/libs/bundle-html2json-esm' {
  export function html2Json(html: string): Promise<{ root: { __children: Record<string, unknown>[] } }>;
}

declare module '@/legacy/utils/common' {
  export function ergodic(json: unknown): void;
  export function getRawComponentKey(info: Record<string, unknown>): string;
  export function getRawComponentContent(info: Record<string, unknown>): Record<string, unknown>;
}

declare module '@/legacy/libs/singleIndexOutput' {
  export default function singleIndexOutput(
    vueCode: string,
    dependenciesLibs: string[],
    vue3?: boolean,
  ): string;
}

declare module 'vue-template-compiler/browser' {
  export interface SfcBlock {
    content: string;
    attrs: Record<string, string>;
  }
  export function parseComponent(source: string): {
    template: SfcBlock | null;
    script: SfcBlock | null;
    styles: SfcBlock[];
    customBlocks: SfcBlock[];
  };
}
