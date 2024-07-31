<script setup lang="ts">
import type { Ref } from "vue";
import { ref, reactive } from "vue";
import type { SelectProps, SelectEmits, SelectOption, SelectState } from "./types";
import Tooltip from "../Tooltip/Tooltip.vue";
import Input from "../Input/Input.vue";
import type { TooltipInstance } from '../Tooltip/types'

defineOptions({
  name: "XxSelect",
});

// 找到option对象
const findOption = (value: string) => {
  const option = props.options.find((option) => option.value === value)
  return option ? option :null
}

const props = defineProps<SelectProps>();
const emits = defineEmits<SelectEmits>();


// 初始状态下，默认的option选中值
const initialOption = findOption(props.modelValue) || props.options[0]


const tooltipRef = ref() as Ref<TooltipInstance>
// drowdown状态-是否被打开
const isDropdownShow = ref(false);

const states = reactive<SelectState>({
  //输入框的值
  inputValue: initialOption ? initialOption.label : '',
  selectedOption: initialOption,
})


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

// option点击事件
const itemSelect = (e: SelectOption) => {
  console.log('e', e)
  if (e.disabled) return
  states.inputValue = e.label
  states.selectedOption = e
  emits('change', e.value)
  emits('update:modelValue', e.value)
  controlDropdown(false)
}

</script>

<template>
  <div class="xx-select" :class="{ 'is-disabled': disabled }" @click="toggleDropdown">
    <Tooltip placement="bottom-start" manual ref="tooltipRef">
      <Input
        v-model="states.inputValue"
        :disabled="disabled"
        :placeholder="placeholder"
      />

      <!-- 下拉菜单的内容 -->
      <template #content>
        <ul class="xx-select__menu">
          <template v-for="(item, index) in options" :key="index">
            <li
              class="xx-select__menu-item"
              :class="{ 'is-disabled': item.disabled, 'is-selected': states.selectedOption?.value === item.value }"
              :id="`select-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              {{ item.label }}
              <span v-if="states.selectedOption?.value === item.value"> Selected! </span>
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>
