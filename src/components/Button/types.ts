import type { PropType } from "vue";

/**
 * ButtonType 按钮类型
 * ButtonSize 按钮大小
 * ButtonType 决定按钮的外观
 * NativeType 按钮的行为
 */
export type ButtonType = "primary" | "success" | "warning" | "danger" | "info";
export type ButtonSize = "large" | "small";
export type NativeType = "button" | "submit" | "reset";

export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  plain?: boolean; // 按钮是否为朴素按钮
  round?: boolean; // 按钮是否为圆角按钮
  circle?: boolean; // 按钮是否为圆形按钮
  disabled?: boolean; // 按钮是否禁用
}

// export const buttonProps = {
//   type: {
//     type: String as PropType<ButtonType>,
//   },
//   size: {
//     type: String as PropType<ButtonSize>,
//   },
//   plain: {
//     type: Boolean,
//   },
//   round: {
//     type: Boolean,
//   },
//   circle: {
//     type: Boolean,
//   },
//   disabled: {
//     type: Boolean,
//   },
// };
