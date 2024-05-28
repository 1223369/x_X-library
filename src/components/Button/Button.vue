<!-- 定义组件属性 -->
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  // 定义组件名称
  name: "xxButton",
});
</script>

<script setup lang="ts">
import { ref } from "vue";
import type { ButtonProps } from "./types";
import Icon from "../Icon/Icon.vue";

// 设置组件默认值
withDefaults(defineProps<ButtonProps>(), {
  nativeType: "button",
});

// 获取Dom元素
const _ref = ref<HTMLButtonElement>();
// 暴露组件实例
defineExpose({
  ref: _ref,
});
</script>

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
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <Icon icon="spinner" spin v-if="loading"></Icon>
    <Icon :icon="icon" v-if="icon"></Icon>
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<style></style>
