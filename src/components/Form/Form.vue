<script setup lang="ts">
import { provide } from "vue";
import type { FormProps, FormItemContext,FormContext,FormValidataFailure, FormInstance } from "./types";
import { formContextKey } from "./types"
import type { ValidateFieldsError } from 'async-validator'

defineOptions({
  name: "XxForm",
});

const props = defineProps<FormProps>();

const fields: FormItemContext[] = []
// 为父组件提供的添加校验规则的方法
const addField: FormContext['addField'] = (field) => {
  fields.push(field);
}
// 为父组件提供的删除校验规则的方法
const removeField: FormContext['removeField'] = (field) => {
  if(field.prop) {
    fields.slice(fields.indexOf(field),1);
  }
}
const validate = async() => {
  let validationErrors:ValidateFieldsError = {}
  for(const field of fields) {
    try {
      await field.validate('');
    } catch (e) {
      const error = e as FormValidataFailure
      validationErrors = {
        ...validationErrors as any,
        ...error.errors
      }
    }
  }
  if(Object.keys(validationErrors).length === 0) return true
  return Promise.reject(validationErrors)
}


// 向子组件传递props
provide(formContextKey, {
  ...props,
  addField,
  removeField
})

defineExpose<FormInstance>({
  validate
})

</script>

<template>
  <form class="xx-form">
    <slot />
    <button @click.prevent="validate">validate all</button>
  </form>
</template>
