<template>
  <button
    ref="_ref"
    class="xx-button"
    :class="{
      [`xx-button--${type}`]: type,
      [`xx-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled
    }"
    :disabled="disabled"
    :autofocus="autofocus"
    :type="nativeType"
    >
     <span>
      <slot></slot>
    </span>
  </button>
</template>

<!-- 定义组件属性 -->
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
  // 定义组件名称
  name: 'XxButton',
  })
</script>

<script setup lang="ts">
import { ref } from 'vue'
import type { ButtonProps } from './types'

// 设置组件默认值
withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button',
})

// 获取Dom元素
const _ref = ref<HTMLButtonElement>()
// 暴露组件实例
defineExpose({
  ref: _ref,
})
</script>

<style>
.xx-button {
  --main-bg-color: yellow;
  background-color: var(--main-bg-color)
}
</style>
