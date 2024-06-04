<script setup lang="ts">
import { ref, reactive, watch, onUnmounted } from "vue";
import type { Instance } from '@popperjs/core'
import type { TooltipProps, TooltipEmits, TooltipInstance } from "./types";
import { createPopper } from '@popperjs/core'
import useClickOutside from "@/hooks/useClickOutside";

const isOpen = ref(false);
const popperNode = ref<HTMLElement>(); // 弹出框节点
const triggerNode = ref<HTMLElement>(); // 触发器节点
const popperContainerNode = ref<HTMLElement>(); // 弹出框容器节点
let popperInstance: null | Instance; // 弹出框实例
let events: Record<string, any> = reactive({}); // 事件集合
let outerEvents: Record<string, any> = reactive({}); // 外部事件集合

// 显示弹出框 -- hover
const open = () => {
  isOpen.value = true;
  emit("visible-change", true);
}

// 隐藏弹出框 -- hover
const close = () => {
  isOpen.value = false;
  emit("visible-change", false);
}

// 声明接受父组件的参数
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: "bottom",
  trigger: "hover",
});

// 声明发出的事件
const emit = defineEmits<TooltipEmits>();

// 声明要传给父组件的值
defineExpose<TooltipInstance>({
  'show': open,
  'hide': close,
})

// 监听props变化
watch(isOpen, (newValue) => {
  if (newValue) {
    // 显示弹出框
    if(popperNode.value && triggerNode.value) {
      popperInstance = createPopper(triggerNode.value, popperNode.value, {
        placement: props.placement,
      });
    } else {
      popperInstance?.destroy();
    }
  }
}, { flush: 'post' });

// 监听trigger变化
watch(() => props.trigger, (newTrigger, oldTrigger) =>{
  if (newTrigger!== oldTrigger) {
    // 清空事件列表
    events = {}
    outerEvents = {}
    // 重新绑定事件
    attachEvent();
  }
});

// 监听manual变化
watch(() => props.manual, (isManual) => {
  if (isManual) {
    events = {}
    outerEvents = {}
  } else {
    attachEvent();
  }
})

// 点击触发器显示/隐藏弹出框--click
const togglerPopper = () => {
  isOpen.value = !isOpen.value;
  emit("visible-change", isOpen.value);
};

// 根据trigger属性绑定事件- hover | click
const attachEvent = () => {
  if (props.trigger === "hover") {
    events['mouseenter'] = open;
    outerEvents['mouseleave'] = close;
  } else if (props.trigger === "click") {
    events['click'] = togglerPopper
  }
}

// 点击弹出框外部关闭弹出框
useClickOutside(popperContainerNode, () => {
  if (props.trigger === "click" && isOpen.value && !props.manual) {
    close();
  }
})

// 卸载组件操作
onUnmounted(() => {
  // 注销popperInstance
  popperInstance?.destroy();
})

// 函数调用
if (!props.manual) {
  attachEvent();
}
</script>

<template>
  <div class="xx-tooltip" v-on="outerEvents" ref="popperContainerNode">
    <div class="xx-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot></slot>
    </div>
    <div v-if="isOpen" class="xx-tooltip__popper" ref="popperNode">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>