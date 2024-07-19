/**
  测试函数式声明组件
*/
import { describe,expect,test } from "vitest";
import {nextTick } from 'vue'
import { createMessage,closeAll } from './method'

// 等待执行动画完毕的函数
export const rAF = async () => {
  return new Promise((res) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null)
        await nextTick()
      })
    })
  })
}

// 获取元素的top值
const getTopValue = (element: Element) => {
  const styles = window.getComputedStyle(element)
  const topValue = styles.getPropertyValue('top')
  return Number.parseFloat(topValue)
}

describe('createMessage', () => {
  test('调用方法应该创建对应的Message组件', async () => {
    const instance = createMessage({ message: 'Hello World', duration:0 })
    await rAF()
    console.log('html', document.body.innerHTML)
    expect(document.querySelector('.xx-message')).toBeTruthy()
    // 测试销毁
    instance.destory()
    await rAF()
    console.log('html2', document.body.innerHTML)
    expect(document.querySelector('.xx-message')).toBeFalsy()
  })

  test('多次调用方法应该创建多个实例', async () => {
    createMessage({ message: 'hello world', duration: 0 })
    createMessage({ message: 'hello world 2', duration: 0 })
    await rAF()
    const elements = document.querySelectorAll('.xx-message')
    expect(elements.length).toBe(2)
    closeAll()
    await rAF()
    expect(document.querySelector('.xx-message')).toBeFalsy()
  })

  test('创建多个实例应该设置正确的offset', async () => {
    createMessage({ message: 'hello world', duration: 0, offset: 100 })
    createMessage({ message: 'hello world 2', duration: 0, offset: 50 })
    await rAF()
    const elements = document.querySelectorAll('.xx-message')
    expect(elements.length).toBe(2)
    const firstElementTop = getTopValue(elements[0])
    const secondElementTop = getTopValue(elements[1])
    // https://github.com/jsdom/jsdom/issues/1590
    // 在JS-dom 中，对应的 height 返回为零
    expect(firstElementTop).toBe(100)
    expect(secondElementTop).toBe(150)
  })


})