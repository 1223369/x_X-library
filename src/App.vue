<script setup lang="ts">
import Button from "./components/Button/Button.vue";
import Collapse from "./components/Collapse/Collapse.vue";
import CollapseItem from "./components/Collapse/CollapseItem.vue";
import Icon from "./components/Icon/Icon.vue";
import { ref, h } from "vue";
import type { ButtonInstance } from "./components/Button/types";
import type { TooltipInstance } from "./components/Tooltip/types";
import Dropdown from './components/Dropdown/Dropdown.vue'
import { createMessage } from "./components/Message/method";
import type { MenuOption } from './components/Dropdown/types'
import { onMounted } from "vue";

// 测试数据
const size = ref<any>("4x");

// Collapse被打开的项
const openedValue = ref(["a"]);

// 获取子组件实例|Button | Tooltip
const buttonRef = ref<ButtonInstance | null>(null);
const tooltipRef = ref<TooltipInstance | null>(null);

onMounted(() => {
  createMessage({ message: "hello world", duration: 0 })
  createMessage({ message: "hello world asain"})
})

// 测试Tooltip动态事件
const trigger = ref<any>("click");
const open = () => {
  tooltipRef.value?.show();
}
const close = () => {
  tooltipRef.value?.hide();
}
// 测试Tooltip的popper配置项
// const options: Partial<Options> = {
//   placement: "right-end",
//   strategy: "fixed",
// }

// 测试Dropdown
const options: MenuOption[] = [
  { key: 1, label: h('b', 'this is bold'),divided: true },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4',divided: true }
]

// const inlineConsole = (...args: any) => {
//   console.log(...args);
// }

// 测试行为
// setTimeout(() => {
//   size.value = "2xl";
//   trigger.value = "click";
// }, 2000);
</script>

<template>

  <header>    
    <Dropdown 
      placement="bottom" 
      :trigger="trigger" 
      :menu-options="options"
    >
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125"/>
      <template #content>
        <h1>This is a tooltip</h1>
      </template>
    </Dropdown> 
  </header>

  <h3>Button</h3>
  <Button ref="buttonRef" @click="open">Test Button</Button>
  <Button plain @click="close">Plain Button</Button>
  <Button round>Round Button</Button>
  <Button circle>XX</Button>
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
  <Button size="large" loading>loading</Button>
  <Button size="large" icon="arrow-up">Icon</Button><br /><br />

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

  <!-- Icon -->
  <h3>Icon</h3>
  <Icon icon="user-secret" :size="size" color="blue"></Icon>


</template>

<style>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  border: 1px solid green;
}
.xx-tooltip__popper {
  border: 1px solid red;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
