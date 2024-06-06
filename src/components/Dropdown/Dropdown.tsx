// 使用tsx开发drowdown组件
import { computed, defineComponent, Fragment, ref } from 'vue'
import type { PropType } from 'vue'
import type { Placement, Options } from '@popperjs/core'
import type { MenuOption } from './types'
import Tooltip from '../Tooltip/Tooltip.vue'
import type { TooltipInstance } from '../Tooltip/types'

export default defineComponent({
  name: 'XxDropdown',

  props: {
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom'
    },
    trigger: {
      type: String as PropType<'hover' | 'click'>,
      default: 'hover'
    },
    transition: {
      type: String,
      default: 'fade'
    },
    openDelay: {
      type: Number,
      default: 0
    },
    closeDelay: {
      type: Number,
      default: 0,
    },
    popperOptions: {
      type: Object as PropType<Options>,
    },
    menuOptions: {
      type: Array as PropType<MenuOption[]>,
      required: true
    },
    hideAfterClick: {
      type: Boolean,
      default: true
    },
    manual: {
      type: Boolean
    }
  },

  // 定义需要向父组件发送的事件
  emits: ['visible-change', 'select'],


  setup(props, { slots, emit, expose }) {
    const tooltipRef = ref<TooltipInstance | null>()

    // dropdown选项的点击事件
    const itemClick = (e: MenuOption) => {
      if (e.disabled) return
      emit('select', e)
      if (props.hideAfterClick) {
        tooltipRef.value?.hide()
      }
    }

    // 监听tooltip的显示隐藏状态
    const visibleChange = (e:boolean) => {
      emit('visible-change', e)
    }

    // 向外暴露实例
    expose({
      show: () => tooltipRef.value?.show(),
      hide: () => tooltipRef.value?.hide()
    })

    /**
     * 选项列表
     */
    const options = computed(() => {
      return props.menuOptions.map(item => {
        return (
          <Fragment key={item.key}>
            {item.divided ? <li role="separator" class="divided-placeholder" /> : ''}
            <li
              class={{ 'xx-dropdown__item': true, 'is-disabled': item.disabled, 'is-divided': item.divided }}
              id={`dropdown-item-${item.key}`}
              onClick={() => itemClick(item)}
            >
              {item.label}
            </li>
          </Fragment>
        )
      })
    })

    return () => (
      <div class="xx-dropdown">
        <Tooltip
          trigger={props.trigger}
          placement={props.placement}
          popperOptions={props.popperOptions}
          openDelay={props.openDelay}
          closeDelay={props.closeDelay}
          manual={props.manual}
          ref={tooltipRef}
          onVisibleChange={visibleChange}
        >
          {/* 插槽内容 */}
          {{
            default: () => slots.default?.(),
            content: () => (
              <ul class="xx-dropdown__menu">
                {options.value}
              </ul>
            )
          }}
        </Tooltip>
      </div>
    )
  }
})