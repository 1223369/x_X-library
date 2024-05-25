<script setup lang="ts">
import type { CollapseItemProps } from "./types";
import { inject, computed } from 'vue'
import { collapseContextKey } from './types'


defineOptions({
  name: "XxCollapseItem",
});
// 接收子组件参数
const props = defineProps<CollapseItemProps>();

// 接收父组件传值
const collapseContext = inject(collapseContextKey)

// 判断是否为展开状态 | 已存在=已打开
const isActive = computed(() => collapseContext.activeNames.value.includes(props.name))

// 处理函数
const handleClick = () => {
  if (props.disabled) return

  // 其他情况继续
  collapseContext.handleItemClick(props.name)
}

</script>

<template>
  <div
    class="xx-collapse-item"
    :class="{
      'is-disabled': disabled,
    }"
  >
    <!-- 标题 -->
    <div class="xx_collapse-item__header" :id="`item-header-${name}`" @click="handleClick">
      <slot name="title">{{ title }}</slot>
    </div>

    <!-- 内容 -->
    <div class="xx_collapse-item__content" :id="`item-content-${name}`" v-show="isActive">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.xx_collapse-item__header {
  font-size: 30px;
}
</style>
