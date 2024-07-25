<script setup lang="ts">
import type { InputProps, InputEmits } from './types'
import { ref, watch, computed } from 'vue'
import Icon from '../Icon/Icon.vue'

// 定义组件属性
defineOptions({
  name: 'xxInput',
})

const isFocus = ref(false)

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

// 判断什么时候显示清空按钮
const showClear = computed(() => 
  props.clearable && 
  !props.disabled && 
  !!innerValue.value && 
  isFocus.value &&
  props.type !== 'textarea'
)

// 处理focus值
const handleFocus = () => {
  isFocus.value = true
}
const handleBlur = () => {
  isFocus.value = false
}

// 处理清空按钮点击
const clear = () => {
  innerValue.value = ''
  emits('update:modelValue', '')
}

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
    'is-focus': isFocus,
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
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- suffix slot -->
      <span v-if="$slots.suffix || showClear" class="xx-input__suffix">
        <slot name="suffix" />
        <Icon 
          icon="circle-xmark"
          v-if="showClear"
          class="xx-input__clear"
          @click="clear"
        />
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