import type { VNode } from 'vue';

/**
 * @message 展示的消息内容，可以是字符串或 VNode为插入的节点
 * @duration 展示的时长，单位为毫秒
 * @showClose 是否显示关闭按钮
 * @type 类型，可选值为 success、warning、info、error
 */
export interface MessageProps {
  message?: string | VNode;
  duration?: number;
  showClose?: boolean;
  type?: 'success' | 'warning' | 'info' | 'error';
}