import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Input from "./Input.vue";

describe("Input", () => {
  it("基本展示", () => {
    // 针对动态 class，查看 classes 是否正确
    const wrapper = mount(Input, {
      props: {
        size: "small",
        type: "text",
        modelValue: "",
      },
      slots: {
        prepend: "prepend",
        prefix: "prefix",
      },
    });
    expect(wrapper.classes()).toContain("xx-input--small");
    expect(wrapper.classes()).toContain("is-prepend");

    // 针对 v-if 是否渲染正确的标签以及内容
    expect(wrapper.find("input").exists()).toBeTruthy();
    expect(wrapper.get("input").attributes("type")).toBe("text");

    // 针对 slots，是否渲染对应的 slots 内容
    expect(wrapper.find(".xx-input__prepend").exists()).toBeTruthy();
    expect(wrapper.get(".xx-input__prepend").text()).toBe("prepend");
    expect(wrapper.find(".xx-input__prefix").exists()).toBeTruthy();
    expect(wrapper.get(".xx-input__prefix").text()).toBe("prefix");

    // 测试textarea
    const wrapper2 = mount(Input, {
      props: {
        type: "textarea",
        modelValue: "",
      },
    });
    expect(wrapper2.find("textarea").exists()).toBeTruthy();
  });

  it("支持v-model", async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: "test",
        "onUpdate:modelValue": (e: any) => wrapper.setProps({ modelValue: e }),
      },
    });
    // 测试初始值
    const input = wrapper.get("input");
    expect(input.element.value).toBe("test");

    // 测试更新值
    // 注意 setValue 是组合事件会触发 input 以及 change
    await input.setValue("update");
    expect(wrapper.props("modelValue")).toBe("update");
    expect(input.element.value).toBe("update");

    // v-model 的异步更新
    await wrapper.setProps({ modelValue: "prop update" });
    expect(input.element.value).toBe("prop update");
  });
  it("支持clearable", async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: "test",
        clearable: true,
        type: "text",
      },
      global: {
        stubs: ["Icon"],
      },
    });
    // 不出现对应的 Icon 区域, 因为未focus
    expect(wrapper.find(".xx-input__clear").exists()).toBeFalsy();
    const input = wrapper.get("input");
    await input.trigger("focus");
    // 出现对应的 Icon 区域, 因为focus
    expect(wrapper.find(".xx-input__clear").exists()).toBeTruthy();
    // 点击 Icon 区域, 输入框清空
    await wrapper.find(".xx-input__clear").trigger("click");
    expect(input.element.value).toBe("");
  });

  it("支持切换密码显示", async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: "",
        showPassword: true,
        type: "text",
      },
      global: {
        stubs: ["Icon"],
      },
    });
    // 不出现对应的 Icon 区域, 因为当前值为空
    expect(wrapper.find('.xx-input__password').exists()).toBeFalsy()
    const input = wrapper.get('input')
    expect(input.element.type).toBe('password')
    //  出现 Icon 区域，并且 Icon 为特定的图标
    await input.setValue('123')
    const eyeIcon = wrapper.find('.xx-input__password')
    expect(eyeIcon.exists()).toBeTruthy()
    expect(eyeIcon.attributes('icon')).toBe('eye-slash')
    // 点击值变会切换input 类型，并且图标的 Icon 会切换
    await eyeIcon.trigger('click')
    expect(input.element.type).toBe('text')
    expect(wrapper.find('.xx-input__password').attributes('icon')).toBe('eye')
  });
});
