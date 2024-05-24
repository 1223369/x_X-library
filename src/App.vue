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
  <h1>hello world</h1>
  <h2>hello world</h2>
  <h3>hello world</h3>
  <hr />
  
</template>

<style scoped></style>
