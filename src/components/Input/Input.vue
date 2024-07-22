<script setup lang="ts">
import type { InputProps, InputEmits } from './types'
import { ref, watch } from 'vue'

// 定义组件属性
defineOptions({
  name: 'xxInput',
})

// 接收父组件值
const props = withDefaults(defineProps<InputProps>(), {type: 'text'})

// 注册自定义事件
const emits = defineEmits<InputEmits>()

const innerValue = ref(props.modelValue)

// 更新输入值
const handleInput = () => {
  emits('update:modelValue', innerValue.value)
}

// 监听modelValue值变化
watch(() => props.modelValue, (newValue) => {
  innerValue.value = newValue
})

</script>

<template>

<div
  class="xx-input"
  :class="{
    [`xx-input--${type}`]: type,
    [`xx-input--${size}`]: size,
    'is-disabled': disabled,
    'is-prepend': $slots.prepend,
    'is-append': $slots.append,
    'is-prefix': $slots.prefix,
    'is-suffix': $slots.suffix,
  }"
>
  <!-- input -->
  <template v-if="type !== 'textarea'">
    <!-- prepend slot -->
    <div v-if="$slots.prepend" class="xx-input__prepend">
      <slot name="prepend" />
    </div>

    <!-- input wrapper -->
    <div class="xx-input__wrapper">
      <!-- prefix slot -->
      <span v-if="$slots.prefix" class="xx-input__prefix">
          <slot name="prefix" />
      </span>

      <input
        class="xx-input__inner"
        :type="type"
        :disabled="disabled"
        v-model="innerValue"
        @input="handleInput"
      />

      <!-- suffix slot -->
      <span v-if="$slots.suffix" class="xx-input__suffix">
        <slot name="suffix" />
      </span>
    </div>

    <!-- append slot -->
    <div v-if="$slots.append" class="xx-input__append">
      <slot name="append" />
    </div>

  </template>

  <!-- textarea -->
  <template v-else>
    <textarea
      class="xx-input__wrapper"
      :disabled="disabled"
      v-model="innerValue"
      @input="handleInput"
    />
  </template>
</div>

</template>