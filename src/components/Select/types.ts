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
  options: SelectOption[];
  // 一些基本表单属性
  placeholder: string;
  disabled: boolean;
  clearable?: boolean;
  renderLabel?: RenderLabelFunc;
}

/**
 * 选中的状态
 */
export interface SelectState {
  inputValue: string;
  selectedOption: null | SelectOption;
  mouseHover: boolean;
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