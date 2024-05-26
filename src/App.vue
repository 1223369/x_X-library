<script setup lang="ts">
import Button from "./components/Button/Button.vue";
import Collapse from "./components/Collapse/Collapse.vue";
import CollapseItem from "./components/Collapse/CollapseItem.vue";
import { ref } from "vue";
import type { ButtonInstance } from "./components/Button/types";

// Collapse被打开的项
const openedValue = ref(["a"]);

// 获取子组件实例|Button
const buttonRef = ref<ButtonInstance | null>(null);
</script>

<template>
  <h3>Button</h3>
  <Button ref="buttonRef">Test Button</Button>
  <Button plain>Plain Button</Button>
  <Button round>Round Button</Button>
  <Button circle>VK</Button>
  <Button disabled>Disabled Button</Button><br /><br />

  <Button type="primary">Primary</Button>
  <Button type="success">Success</Button>
  <Button type="info">Info</Button>
  <Button type="warning">Warning</Button>
  <Button type="danger">Danger</Button><br /><br />
  <Button type="primary" plain>Primary</Button>
  <Button type="success" plain>Success</Button>
  <Button type="info" plain>Info</Button>
  <Button type="warning" plain>Warning</Button>
  <Button type="danger" plain>Danger</Button><br /><br />
  <Button size="large">Large</Button>
  <Button size="small">Small</Button><br /><br />

  <h3>Collapse</h3>
  <Collapse v-model="openedValue">
    <CollapseItem name="a">
      <template #title>
        <h1>nice Title</h1>
      </template>
      <h1>headline title</h1>
      <div>this is content a aaa</div>
    </CollapseItem>
    <CollapseItem name="b" title="Title B">
      <div>this is content bbb</div>
    </CollapseItem>
    <CollapseItem name="c" title="Disabled Title" disabled>
      <div>this is cccc test</div>
    </CollapseItem>
  </Collapse>
</template>

<style scoped></style>
