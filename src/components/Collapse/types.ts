import type { Ref, InjectionKey} from 'vue'

export type NameType = string | number;

export interface CollapseItemProps {
  name: NameType;
  title?: string;
  disabled?: boolean;
}

// 父子组件通信类型
export interface CollapseContext {
  activeNames: Ref<NameType[]>;
  handleItemClick: (name: NameType) => void;
}

// 双向绑定类型
export interface CollapseProps {
  modelValue?: NameType[];
  accordion?: boolean; // 是否手风琴模式
}

// 双向绑定事件类型
export interface CollapseEmits {
  (e: 'update:modelValue', value: NameType[]): void;
  // 点击Collapse的Title的change事件
  (e: 'change', value: NameType[]): void;
}

// 创建唯一的（Symbol）具有类型安全的（InjectionKey)的
export const collapseContextKey: InjectionKey<CollapseContext> = Symbol('collapseContextKey')