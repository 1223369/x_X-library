// 事件监听处理hook
import { onMounted, onBeforeUnmount, isRef, watch, unref } from "vue";
import type { Ref } from "vue";

/**
 *
 * @param target 目标
 * @param event 事件
 * @param handler 处理事件
 */
export default function useEventListener(
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handler: (e: Event) => any
) {
  // 响应式添加
  if (isRef(target)) {
    watch(target, (value, oldValue) => {
      oldValue?.removeEventListener(event, handler);
      value?.addEventListener(event, handler);
    })
  } else {
    // 挂载时添加
    onMounted(() => {
      target.addEventListener(event, handler);
    });
  }

  // 组件销毁时移除
  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(event, handler);
  });
}
