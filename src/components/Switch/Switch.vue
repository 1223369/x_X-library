<script setup lang="ts">
import type { SwitchProps, SwitchEmits } from "./types";
import { ref, computed, onMounted, watch } from "vue";

defineOptions({
  name: "XxSwitch",
  inheritAttrs: false,
});

const props = defineProps<SwitchProps>();
const emits = defineEmits<SwitchEmits>();

const input = ref<HTMLInputElement>();
const innerValue = ref(props.modelValue);
const checked = computed(() => innerValue.value);

// switch点击事件
const switchValue = () => {
  if (props.disabled) return
  innerValue.value =!checked.value;
  emits('update:modelValue', innerValue.value)
  emits('change', innerValue.value)
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
      <div class="xx-switch__core-action">

      </div>
    </div>

  </div>
</template>
