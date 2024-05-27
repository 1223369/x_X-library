<script setup lang="ts">
import { computed } from 'vue';
import { omit } from 'lodash-es'
import type { IconProps } from './types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineOptions({
  name: 'XxIcon',
  inheritAttrs: false,
})

const props = defineProps<IconProps>()

// 过滤掉除"type","color"以外的props | computed确保响应式
const fillteredProps = computed(() => omit(props,['type','color']))

// 接收父组件的color属性
const customStyle = computed(() =>{
  return props.color ? { color: props.color } : {}
})

</script>

<template>
  <i 
    class="xx-icon"
    :class="{[`xx-icon--${type}`] : type}"
    :style="customStyle"
  >
    <font-awesome-icon v-bind="fillteredProps"/>
  </i>
</template>