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
