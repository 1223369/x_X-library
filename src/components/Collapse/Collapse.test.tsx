import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'
import CollapseItem from './CollapseItem.vue'

describe('Collapse.vue', () => {
  test('basic collapse', async () => {
    const wrapper = mount(() =>
      <Collapse modelValue={['a']}>
        <CollapseItem name="a" title="title a">
          content a
        </CollapseItem>
        <CollapseItem name="b" title="title b">
          content b
        </CollapseItem>
        <CollapseItem name="c" title="title c" disabled>
          content c
        </CollapseItem>
      </Collapse>
      , {
        global: {
          stubs: ['Icon']
        },
        // 解决jsdom v.21bug
        attachTo: document.body
      })
    // 获取对应class
    const headers = wrapper.findAll('.xx-collapse-item__header')
    const contents = wrapper.findAll('.xx-collapse-item__wrapper')

    // 长度
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)

    // 文本
    const firstHeader = headers[0]
    expect(firstHeader.text()).toBe('title a')

    // 内容
    const firstContent = contents[0]
    const disabledContent = contents[2]
    expect(firstContent.text()).toBe('content a')
    expect(firstContent.isVisible()).toBeTruthy()

    // 行为
    await firstHeader.trigger('click')
    expect(firstContent.isVisible()).toBeFalsy()

    // disabled
    const disabledHeader = headers[2]
    expect(disabledHeader.classes()).toContain('is-disabled')
    await disabledHeader.trigger('click')
    expect(disabledContent.isVisible()).toBeFalsy()
  })
})