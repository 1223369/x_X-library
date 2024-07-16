// 组件Render到Dom节点上的方法
import { render, h, shallowReactive } from "vue";
import type { createMessageProps, MessageContext } from "./types";
import MessageConstructor from "./Message.vue";
import useZIndex from "@/hooks/useZIndex";

// 存储各个message组件数组
const instances: MessageContext[] = shallowReactive([]);
// 存储message组件的id
let seed = 1;

export const createMessage = (props: createMessageProps) => {

  // 每次创建message组件时，id自增1
  const id = `message_${seed++}`;

  const { nextZIndex } = useZIndex();

  // 创建dom节点-容器
  const container = document.createElement("div");

  // 组价注销时移除dom节点
  const destory = () => {
    // 删除实例数组中的实例
    const idx = instances.findIndex(instance => instance.id === id)
    if (idx === -1) return;
    instances.splice(idx, 1);
    // 移除dom节点
    render(null, container);
  };

  // 手动删除组件实例, 其实就是手动改变visible的值
  // visible是通过expose传出去的
  const manualDestory = () => {
    const instance = instances.find(instance => instance.id === id);
    if (instance) {
      instance.vm.exposed!.visible.value = false;
    }
  }

  // 自动获取新属性
  const newProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestory: destory,
  };
  // 创建vNode
  const vnode = h(MessageConstructor, newProps);

  // 挂载到dom节点
  render(vnode, container);
  // 插入到body - 非空断言操作符
  document.body.appendChild(container.firstElementChild!);
  
  // 获取节点传出的值
  const vm = vnode.component!;

  // 存储message组件实例
  const instance = {
    id,
    vnode,
    vm,
    props: newProps,
    destory: manualDestory
  }
  instances.push(instance);

  return instance;
  
};

// 暴露实例函数
export const getLastInstance = () => {
  return instances[instances.length - 1];
}

// 获取上一个message组建的bottomoffset
export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex(instance => instance.id === id);
  console.log('idx', id,idx, instances.length)
  if (idx <= 0) {
    return 0;
  } else {
    const prev = instances[idx - 1];
    return prev.vm.exposed!.bottomOffset.value;
  }
  
}