import type { VNode } from "vue";
import type { TooltipProps } from '../Tooltip/types'

export interface DropdownProps extends TooltipProps {
  menuOptions: MenuOption[]; // 菜单选项
}

/**
 * 菜单选项
 * @param label 菜单项的文本
 * @param key 菜单项的唯一标识
 * @param disabled 是否禁用该菜单项
 * @param divided 是否显示分割线
 */
export interface MenuOption {
  label: string | VNode;
  key: string | number;
  disabled?: boolean;
  divided?: boolean;
}

/**
 * Dropdown 事件
 * @param visible-change 菜单显示状态变化时触发
 * @param select 菜单项被选中时触发
 */
export interface DropdownEmits {
  (e:'visible-change', value: boolean) : void;
  (e:'select', value: MenuOption) : void;
}

/**
 * Dropdown 实例
 * @param show 显示菜单
 * @param hide 隐藏菜单
 */
export interface DropdownInstance {
  show: () => void;
  hide: () => void;
}