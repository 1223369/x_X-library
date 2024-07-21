import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from './Input.vue'

describe('Input', () => {
  it('基本展示', () => {
    // 针对动态 class，查看 classes 是否正确
    const wrapper = mount(Input, {
      props: {
        size: 'small',
        type: 'text'
      },
      slots: {
        prepend: 'prepend',
        prefix: 'prefix'
      }
    })
    console.log(wrapper.html())
    expect(wrapper.classes()).toContain('xx-input--small')
    expect(wrapper.classes()).toContain('is-prepend')

    // 针对 v-if 是否渲染正确的标签以及内容
    expect(wrapper.find('input').exists()).toBeTruthy()
    expect(wrapper.get('input').attributes('type')).toBe('text')

    // 针对 slots，是否渲染对应的 slots 内容
    expect(wrapper.find('.xx-input__prepend').exists()).toBeTruthy()
    expect(wrapper.get('.xx-input__prepend').text()).toBe('prepend')
    expect(wrapper.find('.xx-input__prefix').exists()).toBeTruthy()
    expect(wrapper.get('.xx-input__prefix').text()).toBe('prefix')


    // 测试textarea
    const wrapper2 = mount(Input, {
      props: {
        type: 'textarea',
        modelValue: ''
      }
    })
    expect(wrapper2.find('textarea').exists()).toBeTruthy()
  })
})