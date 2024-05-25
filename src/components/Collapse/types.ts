import type { Ref, InjectionKey} from 'vue'

export type NameType = string | number;

export interface CollapseItemProps {
  name: NameType;
  title?: string;
  disabled?: boolean;
}

// 父子组件通信类型
export interface CollapseContext {
  activaNames: Ref<NameType[]>;
  handleItemClick: (name: NameType) => void;
}

// 创建唯一的（Symbol）具有类型安全的（InjectionKey)的
export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')