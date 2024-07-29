<script setup lang="ts">
import type { Ref } from "vue";
import { ref, reactive } from "vue";
import type { SelectProps, SelectEmits, SelectOption } from "./types";
import Tooltip from "../Tooltip/Tooltip.vue";
import Input from "../Input/Input.vue";
import type { TooltipInstance } from '../Tooltip/types'

defineOptions({
  name: "XxSelect",
});

const props = defineProps<SelectProps>();
const emits = defineEmits<SelectEmits>();

const innerValue = ref("");
const tooltipRef = ref() as Ref<TooltipInstance>
// drowdown状态-是否被打开
const isDropdownShow = ref(false);
// 控制drowdown的显示与隐藏
const controlDropdown = (show: boolean) => {
  if (show) {
    tooltipRef.value.show()
  } else {
    tooltipRef.value.hide()
  }
  isDropdownShow.value = show
  emits('visible-change', show)
}
// 触发change事件--触发controlDropdown
const toggleDropdown = () => {
  if (props.disabled) return
  if (isDropdownShow.value) {
    controlDropdown(false)
  } else {
    controlDropdown(true)
  }
}

</script>

<template>
  <div class="xx-select" :class="{ 'is-disabled': disabled }" @click="toggleDropdown">
    <Tooltip placement="bottom-start" manual ref="tooltipRef">
      <Input
        v-model="innerValue"
        :disabled="disabled"
        :placeholder="placeholder"
      />

      <!-- 下拉菜单的内容 -->
      <template #content>
        <ul class="xx-select__menu">
          <template v-for="(item, index) in options" :key="index">
            <li
              class="xx-select__menu-item"
              :class="{ 'is-disabled': item.disabled }"
              :id="`select-item-${item.value}`"
            >
              {{ item.label }}
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>
