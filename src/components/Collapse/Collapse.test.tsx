import { describe, test, expect, vi, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'

describe('Collapse.vue', () => {
  test('basic collapse', () => {
    const wrapper = mount(Collapse, {
      slots: {
        default: '<Item name="a" title="Title A">content a</Item>'
      }
    })
    console.log(wrapper.html())
  })
})