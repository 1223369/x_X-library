<script setup lang="ts">
import { ref, provide, watch } from "vue";
import type { NameType, CollapseProps, CollapseEmits } from "./types";
import { collapseContextKey } from "./types";

defineOptions({
  name: "XxCollapse",
});

const props = defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();

// 监听modelValue变化
watch(
  () => props.modelValue,
  () => {
    activeNames.value = props.modelValue || [];
  })

// 被打开的项
const activeNames = ref<NameType[]>(props.modelValue || []);

// 点击事件
const handleItemClick = (item: NameType) => {
  // 判断是否存在
  const index = activeNames.value.indexOf(item);

  // 手风琴效果实现
  if (props.accordion) {
    // 手风琴效果，只保留第一个激活项
    activeNames.value = [activeNames.value[0] === item ? "" : item];
  } else {
    if (index > -1) {
      // 存在则删除
      activeNames.value.splice(index, 1);
    } else {
      // 不存在则新增
      activeNames.value.push(item);
    }
  }

  // 发射触发事件
  emits("update:modelValue", activeNames.value);
  emits("change", activeNames.value);
};

// 判断是否能使用手风琴效果
if (props.accordion && activeNames.value.length > 1) {
  console.warn("accordion mode should only have one acitve item");
}

// 向子组件通信
provide(collapseContextKey, {
  activeNames,
  handleItemClick,
});
</script>

<template>
  <div class="xx-collapse">
    <slot></slot>
  </div>
</template>

