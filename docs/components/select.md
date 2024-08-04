---
title: Select | V-Element
description: Select 组件的文档
---
## 选择器

当选项过多时，使用下拉菜单展示并选择内容。

#### 基础用法

适用广泛的基础单选 v-model 的值为当前被选中的 option 的 value 属性值。

<preview path="../demo/Select/Basic.vue" title="基础选择器" description="Select 基础选择器"></preview>

#### 可清空选项

您可以使用清空图标来清空选择。
设置 **clearable** 属性即可开启清空功能。

<preview path="../demo/Select/Clearable.vue" title="基础选择器" description="Select 可清空选项"></preview>

#### 自定义模板

您可以自定义如何来渲染每一个选项，使用 `renderLabel` 属性，它接受一个回调函数，返回vNode类型。

<preview path="../demo/Select/CustomRender.vue" title="自定义模板" description="Select 自定义模板"></preview>

#### 筛选选项

添加 `filterable` 属性可以开启选项筛选搜索功能。默认情况下， Select 会根据选项的 label 进行搜索，如果需要使用其他搜索逻辑。可以通过 `filter-method` 属性来指定自定义的搜索逻辑。`filter-method` 为一个Function，它会在输入时调用，参数为当前值。

<preview path="../demo/Select/Filter.vue" title="筛选选项" description="Select 筛选选项"></preview>

