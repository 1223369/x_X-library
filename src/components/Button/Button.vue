<template>
  <button
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
import type { ButtonProps } from './types'
defineProps<ButtonProps>()
</script>

<style scoped>

</style>
