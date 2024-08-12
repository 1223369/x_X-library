<script setup lang="ts">
import type { FormItemProps } from "./types";

defineOptions({
  name: "XxFormItem",
});

defineProps<FormItemProps>();
</script>

<template>
  <form class="xx-form-item">
      <label class="xx-form-item__label">
        <slot name="label" :label="label">
          {{ label }}
        </slot>
      </label>
      <div class="xx-form-item__content">
        <slot />
      </div>
  </form>
</template>
