<script setup lang="ts">
import type { InputProps, InputEmits } from "./types";
import type {Ref} from "vue"
import { ref, watch, computed, useAttrs } from "vue";
import Icon from "../Icon/Icon.vue";

// 定义组件属性
defineOptions({
  name: "xxInput",
  inheritAttrs: false,
});

// 接收父组件值
const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
  autocomplete: "off",
});

const isFocus = ref(false);
const passwordVisible = ref(false);
const innerValue = ref(props.modelValue);
const inputRef = ref() as Ref<HTMLInputElement>;
// 获取到父组件在子组件标签上写的所有属性
const attrs = useAttrs();

// 注册自定义事件
const emits = defineEmits<InputEmits>();

// 更新输入值
const handleInput = () => {
  emits("update:modelValue", innerValue.value);
  emits("input", innerValue.value);
};

// 处理change事件
const handleChange = () => {
  emits("change", innerValue.value);
};

// 监听modelValue值变化
watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue;
  }
);

// 判断什么时候显示清空按钮
const showClear = computed(
  () =>
    props.clearable &&
    !props.disabled &&
    !!innerValue.value &&
    isFocus.value &&
    props.type !== "textarea"
);

// 处理focus值
const handleFocus = (event: FocusEvent) => {
  isFocus.value = true;
  emits("focus", event);
};
const handleBlur = (event: FocusEvent) => {
  isFocus.value = false;
  emits("blur", event);
};

// 处理清空按钮点击
const clear = () => {
  innerValue.value = "";
  emits("update:modelValue", "");
  emits("clear");
  emits("change", "");
  emits("input", "");
};

// 处理密码显示
const showPasswordArea = computed(
  () => props.showPassword && !props.disabled && !!innerValue.value
);

// 处理密码显示切换
const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value;
};

// 暴露组件
defineExpose({
  ref: inputRef,
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
          v-bind="attrs"
          ref="inputRef"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :disabled="disabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          v-model="innerValue"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />

        <!-- suffix slot -->
        <span
          v-if="$slots.suffix || showClear || showPasswordArea"
          class="xx-input__suffix"
        >
          <slot name="suffix" />
          <!-- clear button -->
          <Icon
            icon="circle-xmark"
            v-if="showClear"
            class="xx-input__clear"
            @click="clear"
          />
          <!-- password button -->
          <Icon
            icon="eye"
            v-if="showPasswordArea && passwordVisible"
            class="xx-input__password"
            @click="togglePasswordVisible"
          />
          <Icon
            icon="eye-slash"
            v-if="showPasswordArea && !passwordVisible"
            class="xx-input__password"
            @click="togglePasswordVisible"
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
        ref="inputRef"
        v-bind="attrs"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        v-model="innerValue"
        @input="handleInput"
        @change="handleChange"
      />
    </template>
  </div>
</template>
