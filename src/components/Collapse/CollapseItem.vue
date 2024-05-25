<script setup lang="ts">
import type { CollapseItemProps } from "./types";

defineOptions({
  name: "XxCollapseItem",
});
defineProps<CollapseItemProps>();
</script>

<template>
  <div
    class="xx-collapse-item"
    :class="{
      'is-disabled': disabled,
    }"
  >
    <!-- 标题 -->
    <div class="xx_collapse-item__header" :id="`item-header-${name}`">
      <slot name="title">{{ title }}</slot>
    </div>

    <!-- 内容 -->
    <div class="xx_collapse-item__content" :id="`item-content-${name}`">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="less"></style>
