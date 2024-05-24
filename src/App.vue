<script setup lang="ts">
import Button from "./components/Button/Button.vue";
import { ref, onMounted } from "vue";
import type { ButtonInstance } from "./components/Button/types"

// 获取子组件实例|Button
const buttonRef = ref<ButtonInstance | null>(null);
onMounted(() => {

});
</script>

<template>
  <Button type="primary" plain disabled ref="buttonRef">确认</Button>
</template>

<style scoped></style>
