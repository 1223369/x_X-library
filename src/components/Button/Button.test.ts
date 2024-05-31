import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Button from "./Button.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Icon from "../Icon/Icon.vue";

describe("Button.vue", () => {
  // button基本测试
  test("base button", () => {
    const wrapper = mount(Button, {
      props: {
        type: "primary",
      },
      slots: {
        default: "Hello World",
      },
    });
    //  测试组件是否能挂载
    console.log("wrapper", wrapper.html());
    //  测试组件是否有对应的class
    expect(wrapper.classes()).toContain("xx-button--primary");
    // 测试slot是否渲染成功
    expect(wrapper.get('button').text()).toBe('Hello World')
    //  测试点击事件是否正常
    wrapper.get('button').trigger('click')
    console.log('wrapper.emitted', wrapper.emitted())
    // 测试object里是否有对应的属性
    expect(wrapper.emitted()).toHaveProperty('click')
  });

  // button disabled测试
  test("disabled button", () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
      slots: {
        default: "disable",
      },
    });
    // 判断disabled属性是否生效
    expect(wrapper.attributes('disabled')).toBeDefined();
    expect(wrapper.find('button').element.disabled).toBeDefined();
    //  测试点击事件是否触发
    wrapper.get('button').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('click')
  });

  // button icon测试
  test('icon', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'arrow-up',
      },
      slots: {
        default: "icon",
      },
      global: {
        stubs: ['FontAwesomeIcon']
      }
    });
    // console.log('wrapper', wrapper.html())
    const iconElement = wrapper.findComponent(FontAwesomeIcon)
    expect(iconElement.exists()).toBe(true)
    // 判断属性是否正确
    expect(iconElement.attributes('icon')).toBe('arrow-up')
  })

  // button loading测试
  test('loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      },
      slots: {
        default: 'loading'
      },
      global: {
        stubs: ['Icon']
      }
    })
    console.log(wrapper.html())
    const iconElement = wrapper.findComponent(Icon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('spinner')
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
});
