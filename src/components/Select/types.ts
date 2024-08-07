import type{ VNode } from "vue";
export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  // v-model
  modelValue: string;
  // 选项
  options?: SelectOption[];
  // 一些基本表单属性
  placeholder: string;
  disabled: boolean;
  clearable?: boolean;
  renderLabel?: RenderLabelFunc;
  // 是否可搜索
  filterable?: boolean;
  // 自定义过滤函数
  filterMethod?: CustomFilterFunc;
  remote?: boolean;
  remoteMethod?: CustomFilterRemoterFunc;
}

/**
 * 选中的状态
 */
export interface SelectState {
  inputValue: string;
  selectedOption: null | SelectOption;
  mouseHover: boolean;
  loading: boolean;
  // 当前已选中位置
  highlightIndex: number;
}

export interface SelectEmits {
  (e:'change', value: string) : void;
  (e:'update:modelValue', value: string) : void;
  // 代表打开和关闭
  (e: 'visible-change', value:boolean): void;
  (e: 'clear'): void;
}

// 渲染函数的类型
export type RenderLabelFunc = (option: SelectOption) => VNode
// 自定义过滤函数的类型
export type CustomFilterFunc = (value: string) => SelectOption[]
// 自定义搜索函数的类型
export type CustomFilterRemoterFunc = (value: string) => Promise<SelectOption[]>