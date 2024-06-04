import { describe, test, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Tooltip from './Tooltip.vue'

const onVisibleChange = vi.fn()
describe('Tooltip.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  test('basic tooltip', async () => {
    const wrapper = mount(() =>
      <div>
        <div id="outside">
          <Tooltip content="hello tooltip" trigger='click' onVisibleChange={onVisibleChange}>
            <button id="trigger">Trigger</button>
          </Tooltip>
        </div>
      </div>
      , {
        attachTo: document.body
      })
    // 静态测试 - 点击触发tooltip是否显示
    const triggerArea = wrapper.find('#trigger')
    expect(triggerArea.exists()).toBe(true)
    expect(wrapper.find('.xx-tooltip__popper').exists()).toBeFalsy()
    // 测试点击行为
    triggerArea.trigger('click')
    // 等待延时结束
    await vi.runAllTimers()
    expect(wrapper.find('.xx-tooltip__popper').exists()).toBe(true)
    // 测试有无展示
    expect(onVisibleChange).toHaveBeenCalledWith(true)
    // 测试再次点击行为
    triggerArea.trigger('click')
    // 等待延时结束
    await vi.runAllTimers()
    expect(wrapper.find('.xx-tooltip__popper').exists()).toBe(false)
    // 测试有无隐藏
    expect(onVisibleChange).toHaveBeenLastCalledWith(false)
    // 测试点击外侧区域
    wrapper.get('#outside').trigger('click')
    await vi.runAllTimers()
    expect(wrapper.find('.xx-tooltip__popper').exists()).toBeFalsy()
    expect(onVisibleChange).toHaveBeenLastCalledWith(false)
  })
})