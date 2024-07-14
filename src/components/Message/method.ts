// 组件Render到Dom节点上的方法
import { render, h } from "vue";
import type { createMessageProps } from "./types";
import MessageConstructor from "./Message.vue";

export const createMessage = (props: createMessageProps) => {
  // 创建dom节点-容器
  const container = document.createElement("div");

  // 组价注销时移除dom节点
  const destory = () => {
    render(null, container);
  };

  // 自动获取新属性
  const newProps = {
    ...props,
    onDestory: destory,
  };
  // 创建vNode
  const vnode = h(MessageConstructor, newProps);

  // 挂载到dom节点
  render(vnode, container);

  // 插入到body
  document.body.appendChild(container.firstElementChild!);
};
