<script setup lang="ts">
import type { CollapseItemProps } from "./types";
import { inject, computed } from "vue";
import { collapseContextKey } from "./types";
import Icon from '../Icon/Icon.vue'

defineOptions({
  name: "XxCollapseItem",
});
// 接收子组件参数
const props = defineProps<CollapseItemProps>();

// 接收父组件传值
const collapseContext = inject(collapseContextKey);

// 判断是否为展开状态 | 已存在=已打开
const isActive = computed(() =>
  collapseContext?.activeNames.value.includes(props.name)
);

// 处理函数
const handleClick = () => {
  if (props.disabled) return;

  // 其他情况继续
  collapseContext?.handleItemClick(props.name);
};

// 内容动画效果
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter: (el: HTMLElement) => {
    el.style.height = "0";
    el.style.overflow = "hidden";
  },
  enter: (el: HTMLElement) => {
    el.style.height = `${el.scrollHeight}px`;
  },
  afterEnter: (el: HTMLElement) => {
    el.style.height = "";
    el.style.overflow = "";
  },
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`;
    el.style.overflow = "hidden";
  },
  leave(el) {
    el.style.height = "0px";
  },
  afterLeave(el) {
    el.style.height = "";
    el.style.overflow = "";
  },
};
</script>

<template>
  <div
    class="xx-collapse-item"
    :class="{
      'is-disabled': disabled,
    }"
  >
    <!-- 标题 -->
    <div
      class="xx-collapse-item__header"
      :class="{
        'is-disabled': disabled,
        'is-active': isActive,
      }"
      :id="`item-header-${name}`"
      @click="handleClick"
    >
      <slot name="title">{{ title }}</slot>
      <Icon icon="angle-right" class="header-angle"></Icon>
    </div>

    <!-- 内容 -->
    <Transition name="slide" v-on="transitionEvents">
      <div class="xx-collapse-wrapper" v-show="isActive">
        <div class="xx-collapse-item__content" :id="`item-content-${name}`">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>
