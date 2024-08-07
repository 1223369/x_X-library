<script setup lang="ts">
import type { Ref } from "vue";
import { ref, reactive, computed, watch } from "vue";
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
import { isFunction, debounce } from "lodash-es";

defineOptions({
  name: "XxSelect",
});

// 找到option对象
const findOption = (value: string) => {
  const option = props.options.find((option) => option.value === value);
  return option ? option : null;
};

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
});
const emits = defineEmits<SelectEmits>();

// 初始状态下，默认的option选中值
const initialOption = findOption(props.modelValue);

const tooltipRef = ref() as Ref<TooltipInstance>;
const inputRef = ref() as Ref<InputInstance>;
// drowdown状态-是否被打开
const isDropdownShow = ref(false);
// 搜索后的选项
const fillterOptions = ref(props.options);

const states = reactive<SelectState>({
  //输入框的值
  inputValue: initialOption ? initialOption.label : "",
  selectedOption: initialOption,
  mouseHover: false,
  loading: false,
  highlightIndex: -1,
});

// 过滤输入框的placeholder
const filteredPlaceholder = computed(() => {
  return props.filterable && states.selectedOption && isDropdownShow.value
    ? states.selectedOption.label
    : props.placeholder;
});

// 控制drowdown的显示与隐藏
const controlDropdown = (show: boolean) => {
  if (show) {
    // fillter模式
    // 之前选择过对应的值
    if (states.selectedOption && props.filterable) {
      states.inputValue = "";
    }
    tooltipRef.value.show();
    // 进行一次默认选项的生成
    if (props.filterable) {
      generateFilterOptions(states.inputValue);
    }
  } else {
    tooltipRef.value.hide();
    //blur时,将之前已选的值回灌到input中
    if (props.filterable) {
      states.inputValue = states.selectedOption
        ? states.selectedOption.label
        : "";
    }
    states.highlightIndex = -1;
  }
  isDropdownShow.value = show;
  emits("visible-change", show);
};

// 根据条件展示clear按钮
const showClearIcon = computed(() => {
  // 条件： hover状态下; props,clearable为true; 必须在已选择状态以及输入框有值时展示
  return (
    props.clearable &&
    states.mouseHover &&
    states.selectedOption &&
    states.inputValue.trim() !== ""
  );
});

// 点击clear按钮事件
const onClear = () => {
  states.selectedOption = null;
  states.inputValue = "";
  emits("change", "");
  emits("clear");
  emits("update:modelValue", "");
};

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

// 防抖搜索-只有远程搜索时才生效
const timeout = computed(() => (props.remote ? 300 : 0));

// 监听键盘并处理
const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case "Enter":
      if (!isDropdownShow.value) {
        controlDropdown(true);
      } else {
        if (states.highlightIndex > -1 && fillterOptions.value[states.highlightIndex]) {
          itemSelect(fillterOptions.value[states.highlightIndex]);
        } else {
          controlDropdown(false);
        }
        
      }
      break;
    case "Escape":
      if (isDropdownShow.value) {
        controlDropdown(false);
      }
      break;
    case "ArrowUp":
      e.preventDefault();
      if (fillterOptions.value.length > 0){
        if (states.highlightIndex === -1 || states.highlightIndex === 0) {
          // 在最开始时，此时向上，光标将置于最后一行
          states.highlightIndex = fillterOptions.value.length - 1;
        } else {
          states.highlightIndex--;
        }
      }
      break;
    case "ArrowDown":
      e.preventDefault()
      if (fillterOptions.value.length > 0) {
        if (states.highlightIndex === -1 || states.highlightIndex === fillterOptions.value.length - 1) {
          // 在最开始时，此时向下，光标将逐行向下
          states.highlightIndex = 0;
        } else {
          states.highlightIndex++;
        }
      }
      break;
    default:
      break;
  }
};

const NOOP = () => {};

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

// 更新搜索后的选项
watch(
  () => props.options,
  (newOptions) => {
    fillterOptions.value = newOptions;
  }
);

// 生成对应的搜索后的选项
const generateFilterOptions = async (searchValue: string) => {
  if (!props.filterable) return;
  if (props.filterMethod && isFunction(props.filterMethod)) {
    // 自定义过滤方法
    fillterOptions.value = props.filterMethod(searchValue);
  } else if (
    props.remote &&
    props.remoteMethod &&
    isFunction(props.remoteMethod)
  ) {
    // 远程搜索
    states.loading = true;
    try {
      fillterOptions.value = await props.remoteMethod(searchValue);
    } catch (error) {
      console.error(error);
      fillterOptions.value = [];
    } finally {
      states.loading = false;
    }
  } else {
    // 本地搜索
    fillterOptions.value = props.options.filter((option) =>
      option.label.includes(searchValue)
    );
  }
  states.highlightIndex = -1;
};
// INPUT框值变化时，更新搜索后的选项
const onFilter = () => {
  generateFilterOptions(states.inputValue);
};

const debounceOnFilter = debounce(() => {
  onFilter();
}, timeout.value);
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
        :placeholder="filteredPlaceholder"
        :readonly="!filterable || !isDropdownShow"
        @input="debounceOnFilter"
        @keydown="handleKeyDown"
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
            :class="{ 'is-active': isDropdownShow }"
          />
        </template>
      </Input>

      <!-- 下拉菜单的内容 -->
      <template #content>
        <!-- loading状态 -->
        <div v-if="states.loading" class="xx-select__loading">
          <Icon icon="spinner-third" spin />
        </div>

        <!-- 没有搜索结果 -->
        <div
          v-else-if="filterable && fillterOptions.length === 0"
          class="xx-select__nodata"
        >
          <span>No matching results</span>
        </div>

        <ul class="xx-select__menu" v-else>
          <template v-for="(item, index) in fillterOptions" :key="index">
            <li
              class="xx-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': states.selectedOption?.value === item.value,
                'is-lighlighted': states.highlightIndex === index,
              }"
              :id="`select-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              <RenderVnode
                :vNode="renderLabel ? renderLabel(item) : item.label"
              />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>
