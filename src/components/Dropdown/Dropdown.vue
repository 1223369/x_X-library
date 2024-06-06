<script setup lang="ts">
import type {
  DropdownProps,
  DropdownInstance,
  DropdownEmits,
  MenuOption,
} from "./types";
import Tooltip from "../Tooltip/Tooltip.vue";
import type { TooltipInstance } from '../Tooltip/types'
import { ref } from "vue";
import RenderVnode from '../Common/RenderVnode'

const tooltipRef = ref<TooltipInstance | null>(null)

// 声明接受父组件的参数
const props = withDefaults(defineProps<DropdownProps>(), { hideAfterClick: true });
// 声明发出的事件
const emits = defineEmits<DropdownEmits>();

// 显示状态变化时触发的事件
const visibleChange = (e: boolean) => {
  emits('visible-change', e)
}

// 选项点击事件
const itemClick = (e: MenuOption) => {
  if (e.disabled) return;
  emits('select', e)
  if (props.hideAfterClick) {
    tooltipRef.value?.hide()
  }
}

// 声明要传给父组件的值
defineExpose<DropdownInstance>({
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide()
})

</script>

<template>
  <div class="xx-dropdown">
    <Tooltip
      :trigger="trigger"
      :placement="placement"
      :popper-options="popperOptions"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      :manual="manual"
      @visible-change="visibleChange"
      ref="tooltipRef"
    >
     <slot></slot>
     <template #content>
        <ul class="xx-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <!-- 分割线 -->
            <li     
            v-if="item.divided"
            role="separator"
            class="divided-placeholder"
          ></li>
          <!-- 选项 -->
          <li
            class="xx-dropdown__item"
            :class="{'is-disabled': item.disabled, 'is-divided': item.divided }"
            :id="`dropdown-item-${item.key}`"
            @click="itemClick(item)"
          >
            <RenderVnode :vNode="item.label"></RenderVnode>
          </li>
          </template>
        </ul>
     </template>
    </Tooltip>
  </div>
</template>
