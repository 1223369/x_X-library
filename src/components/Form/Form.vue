<script setup lang="ts">
import { provide } from "vue";
import type { FormProps } from "./types";
import { formContextKey } from "./types"

defineOptions({
  name: "XxForm",
});

const props = defineProps<FormProps>();

// 向子组件传递props
provide(formContextKey, props)

</script>

<template>
  <form class="xx-form">
    <slot />
  </form>
</template>
