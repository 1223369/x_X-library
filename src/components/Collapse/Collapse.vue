<script setup lang="ts">
import { ref, provide } from 'vue'
import type { NameType, CollapseProps, CollapseEmits } from './types'
import { collapseContextKey } from './types'

defineOptions({
  name: "XxCollapse",
})

// 被打开的项
const activeNames = ref<NameType[]>([])

// 点击事件
const handleItemClick = (item: NameType) => {
  // 判断是否存在
  const index = activeNames.value.indexOf(item)
  
  if (index > -1) {
    // 存在则删除
    activeNames.value.splice(index, 1)
  } else {
    // 不存在则新增
    activeNames.value.push(item)
  }
}

// 向子组件通信
provide(collapseContextKey, {
  activeNames,
  handleItemClick
})
</script>

<template>
  <div
    class="xx-collapse">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">

</style>
