import type { Placement, Options } from "@popperjs/core";

export interface TooltipProps {
    content?: string;
    trigger?: 'hover' | 'click';
    placement?: Placement;
    manual?: boolean; // 是否手动控制显示隐藏
    popperOptions?: Partial<Options>; // popper.js 的配置项 | Partial-将必选转换为可选
}

// 事件类型
export interface TooltipEmits {
  (e: 'visible-change', value: boolean):void;
}

export interface TooltipInstance {
  show: () => void;
  hide: () => void;
}