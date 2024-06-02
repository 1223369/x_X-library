<script setup lang="ts">
import { ref, watch } from "vue";
import type { Instance } from '@popperjs/core'
import type { TooltipProps, TooltipEmits } from "./types";
import { createPopper } from '@popperjs/core'

const isOpen = ref(false);
const popperNode = ref<HTMLElement>(); // 弹出框节点
const triggerNode = ref<HTMLElement>(); // 触发器节点
let popperInstance: null | Instance; // 弹出框实例

// 声明接受的参数
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: "bottom",
});

// 声明发出的事件
const emit = defineEmits<TooltipEmits>();

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

// 点击触发器显示/隐藏弹出框
const togglerPopper = () => {
  isOpen.value = !isOpen.value;
  emit("visible-change", isOpen.value);
};
</script>

<template>
  <div class="xx-tooltip">
    <div class="xx-tooltip__trigger" ref="triggerNode" @click="togglerPopper">
      <slot></slot>
    </div>
    <div v-if="isOpen" class="xx-tooltip__popper" ref="popperNode">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>