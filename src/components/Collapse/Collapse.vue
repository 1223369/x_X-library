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
  // 解决点击事件冒泡导致activeNames更新两次--由响应式数据转换成响应式数组 
  let _activeNames = [...activeNames.value];
  // 判断是否存在
  const index = _activeNames.indexOf(item);

  // 手风琴效果实现
  if (props.accordion) {
    // 手风琴效果，只保留第一个激活项
    _activeNames = [activeNames.value[0] === item ? "" : item]
    activeNames.value = _activeNames
  } else {
    if (index > -1) {
      // 存在则删除
      _activeNames.splice(index, 1);
    } else {
      // 不存在则新增
      _activeNames.push(item);
    }
    activeNames.value = _activeNames;
  }

  // 发射触发事件
  emits("update:modelValue", _activeNames);
  emits("change", _activeNames);
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

