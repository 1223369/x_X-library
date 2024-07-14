// 组件Render到Dom节点上的方法
import { render, h } from "vue"
import type { MessageProps } from "./types"
import MessageConstructor from "./Message.vue"

export const createMessage = (props: MessageProps) => {
  // 创建dom节点-容器
  const container = document.createElement("div")
  // 创建vNode
  const vnode = h(MessageConstructor, props)
  // 挂载到dom节点
  render(vnode, container)
  // 插入到body
  document.body.appendChild(container.firstElementChild!)
}