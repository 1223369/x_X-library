import type { VNode, ComponentInternalInstance } from 'vue';

/**
 * @message 展示的消息内容，可以是字符串或 VNode为插入的节点
 * @duration 展示的时长，单位为毫秒
 * @showClose 是否显示关闭按钮
 * @type 类型，可选值为 success、warning、info、error
 * @onDestory 关闭时的回调
 */
export interface MessageProps {
  message?: string | VNode;
  duration?: number;
  showClose?: boolean;
  type?: 'success' | 'warning' | 'info' | 'error';
  onDestory: () => void;
  offset?: number;
  id: string;
}

// 存储各个组建的信息
export interface MessageContext {
  id: string;
  vnode: VNode;
  vm: ComponentInternalInstance;
  props: MessageProps;
}

// 忽略某个属性的类型检查的类型别名
export type createMessageProps = Omit<MessageProps, 'onDestory' | 'id'>;

