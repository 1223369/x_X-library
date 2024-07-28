<script setup lang="ts">
import type { SwitchProps, SwitchEmits } from "./types";
import { ref, computed, onMounted, watch } from "vue";

defineOptions({
  name: "XxSwitch",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false,
});
const emits = defineEmits<SwitchEmits>();

const input = ref<HTMLInputElement>();
const innerValue = ref(props.modelValue);
const checked = computed(() => innerValue.value === props.activeValue);

// switch点击事件
const switchValue = () => {
  if (props.disabled) return
  const newValue = checked.value ? props.inactiveValue : props.activeValue
  innerValue.value = newValue
  emits('update:modelValue', newValue)
  emits('change', newValue)
}

onMounted(() => {
  input.value!.checked = checked.value
})

watch(checked, (val) => {
  input.value!.checked = val
})

watch(() => props.modelValue, (newValue) => {
  innerValue.value = newValue
})

</script>

<template>
  <div
    class="xx-switch"
    :class="{
      [`xx-switch--${size}`]: size,
      'is-disabled': disabled,
      'is-checked': checked,
    }"
    @click="switchValue"
  >
    <!-- switch主体 -->
    <input
      class="xx-switch__input"
      type="checkbox"
      role="switch"
      ref="input"
      :name="name"
      :disabled="disabled"
      @keydown.enter="switchValue"
    />

    <!-- switch滑块 -->
    <div class="xx-switch__core">
      <!-- 描述文字 -->
      <div class="xx-switch__core-inner">
        <span v-if="activeText || inactiveText" class="xx-switch__core-inner-text">
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>

      <div class="xx-switch__core-action">
      </div>
    </div>

  </div>
</template>
