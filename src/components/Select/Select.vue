<script setup lang="ts">
import type { Ref } from "vue";
import { ref, reactive, computed } from "vue";
import type {
  SelectProps,
  SelectEmits,
  SelectOption,
  SelectState,
} from "./types";
import Tooltip from "../Tooltip/Tooltip.vue";
import Input from "../Input/Input.vue";
import Icon from "../Icon/Icon.vue";
import type { TooltipInstance } from "../Tooltip/types";
import type { InputInstance } from "../Input/types";
import RenderVnode from "../Common/RenderVnode";

defineOptions({
  name: "XxSelect",
});

// 找到option对象
const findOption = (value: string) => {
  const option = props.options.find((option) => option.value === value);
  return option ? option : null;
};

const props = defineProps<SelectProps>();
const emits = defineEmits<SelectEmits>();

// 初始状态下，默认的option选中值
const initialOption = findOption(props.modelValue) || props.options[0];

const tooltipRef = ref() as Ref<TooltipInstance>;
const inputRef = ref() as Ref<InputInstance>;
// drowdown状态-是否被打开
const isDropdownShow = ref(false);

const states = reactive<SelectState>({
  //输入框的值
  inputValue: initialOption ? initialOption.label : "",
  selectedOption: initialOption,
  mouseHover: false,
});

// 控制drowdown的显示与隐藏
const controlDropdown = (show: boolean) => {
  if (show) {
    tooltipRef.value.show();
  } else {
    tooltipRef.value.hide();
  }
  isDropdownShow.value = show;
  emits("visible-change", show);
};

// 根据条件展示clear按钮
const showClearIcon = computed(() => {
  // 条件： hover状态下; props,clearable为true; 必须在已选择状态以及输入框有值时展示
  return props.clearable && states.mouseHover && states.selectedOption && states.inputValue.trim()!== "";
})

// 点击clear按钮事件
const onClear = () => {
  states.selectedOption = null;
  states.inputValue = "";
  emits("change", "");
  emits("clear");
  emits("update:modelValue", "");
}

// 触发change事件--触发controlDropdown
const toggleDropdown = () => {
  if (props.disabled) return;
  if (isDropdownShow.value) {
    controlDropdown(false);
  } else {
    controlDropdown(true);
  }
};

// option点击事件
const itemSelect = (e: SelectOption) => {
  if (e.disabled) return;
  states.inputValue = e.label;
  states.selectedOption = e;
  emits("change", e.value);
  emits("update:modelValue", e.value);
  controlDropdown(false);
  inputRef.value.ref.focus();
};

const NOOP = () => {}

// 弹出层与输入框宽度对齐
const popperOptions: any = {
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 9],
      },
    },
    {
      name: "sameWidth",
      enabled: true,
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      phase: "beforeWrite",
      requires: ["computeStyles"],
    },
  ],
};
</script>

<template>
  <div
    class="xx-select"
    :class="{ 'is-disabled': disabled }"
    @click="toggleDropdown"
    @mouseenter="() => (states.mouseHover = true)"
    @mouseleave="() => (states.mouseHover = false)"
  >
    <Tooltip
      placement="bottom-start"
      :popperOptions="popperOptions"
      manual
      @click-outside="controlDropdown(false)"
      ref="tooltipRef"
    >
      <Input
        v-model="states.inputValue"
        ref="inputRef"
        :disabled="disabled"
        :placeholder="placeholder"
        readonly
      >
        <template #suffix>
          <Icon 
            icon="circle-xmark"
            v-if="showClearIcon"
            class="xx-input__clear"
            @mousedown.stop="NOOP"
            @click.stop="onClear"
          />
          <Icon
            v-else
            icon="angle-down" 
            class="header-angle" 
            :class="{'is-active': isDropdownShow}"
          />
        </template>
      </Input>

      <!-- 下拉菜单的内容 -->
      <template #content>
        <ul class="xx-select__menu">
          <template v-for="(item, index) in options" :key="index">
            <li
              class="xx-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': states.selectedOption?.value === item.value,
              }"
              :id="`select-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              <RenderVnode :vNode="renderLabel ? renderLabel(item) : item.label" />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>
