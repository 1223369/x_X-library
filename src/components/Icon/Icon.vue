<script setup lang="ts">
import type { IconProps } from './types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineOptions({
  name: 'XxIcon',
  inheritAttrs: false,
})

const props = defineProps<IconProps>()

// 注册全局组件

</script>

<template>
  <i class="xx-icon">
    <font-awesome-icon v-bind="$props"/>
  </i>
</template>