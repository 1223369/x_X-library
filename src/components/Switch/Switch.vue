<script setup lang="ts">
import type { SwitchProps, SwitchEmits } from "./types";
import { ref, computed } from "vue";

defineOptions({
  name: "XxSwitch",
  inheritAttrs: false,
});

const props = defineProps<SwitchProps>();
const emits = defineEmits<SwitchEmits>();

const innerValue = ref(props.modelValue);
const checked = computed(() => innerValue.value);

// switch点击事件
const switchValue = () => {
  if (props.disabled) return
  innerValue.value =!checked.value;
  emits('update:modelValue', innerValue.value)
  emits('change', innerValue.value)
}

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
      :name="name"
      :disabled="disabled"
    />

    <!-- switch滑块 -->
    <div class="xx-switch__core">
      <div class="xx-switch__core-action">

      </div>
    </div>

  </div>
</template>
