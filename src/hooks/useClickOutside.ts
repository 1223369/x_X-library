/**
 * 用于处理节点外侧点击事件的hooks
 * @param elementRef - 节点的ref
 * @param callback - 点击事件的回调函数
 */
import { onMounted, onUnmounted } from 'vue'
import type {Ref} from 'vue'

const useClickOutside = (elementRef: Ref<undefined | HTMLElement>, callback: (e: MouseEvent) => void) => {
  const handler = (e: MouseEvent) => {
    // e.target - 获取当前点击的dom节点
    if (elementRef.value && e.target) {
      // 判断当前点击的dom节点为不属于elementRef的子节点,则调用回调
      if (!elementRef.value.contains(e.target as HTMLElement)) {
        callback(e)
      }
    }
  }
  // 监听点击事件
  onMounted(() => {
    document.addEventListener('click', handler)
  })

  // 卸载事件
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
}

export default useClickOutside