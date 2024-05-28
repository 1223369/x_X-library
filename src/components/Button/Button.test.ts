import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button.vue', () => {
  test('base button', () => {
     const wrapper = mount(Button, {
       props: {
         type: 'primary',
       },
       slots: {
         default: 'Hello World',
       },
     })
     console.log('wrapper', wrapper.html())
  })
})