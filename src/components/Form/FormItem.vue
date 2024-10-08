<script setup lang="ts">
import {
  inject,
  computed,
  reactive,
  provide,
  onMounted,
  onUnmounted,
} from "vue";
import { isNil } from "lodash-es";
import type {
  FormItemProps,
  FormValidataFailure,
  FormItemContext,
  validateStatusProp,
  FormItemInstance
} from "./types";
import { formContextKey, formItemContextKey } from "./types";
import Schema from "async-validator";

defineOptions({
  name: "XxFormItem",
});

const props = defineProps<FormItemProps>();
const formContext = inject(formContextKey);

const validateStatus:validateStatusProp = reactive({
  // 表单校验结果状态
  state: "init",
  // 校验错误信息
  errorMsg: "",
  loading: false,
});

// 保存初始值
let initialValue: null;

// 拿到输入框值
const innerValue = computed(() => {
  const model = formContext?.model;
  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop];
  } else {
    return null;
  }
});

// 拿到rules值
const itemRules = computed(() => {
  const rules = formContext?.rules;
  if (rules && props.prop && rules[props.prop]) {
    return rules[props.prop];
  } else {
    return [];
  }
});

const gerTriggerRules = (trigger?: string) => {
  const rules = itemRules.value;
  if (rules) {
    return rules.filter((rule) => {
      if (!rule.trigger || !trigger) return true;
      return rule.trigger && rule.trigger === trigger;
    });
  } else {
    return [];
  }
};

// 判断是否必选
const isRequired = computed(() => {
  return itemRules.value.some((rule) => rule.required);
})

// 验证rules
const validate = async(trigger?: string) => {
  const modelName = props.prop;
  const triggerRules = gerTriggerRules(trigger);
  if (triggerRules.length === 0) {
    return true;
  }
  if (modelName) {
    const validator = new Schema({
      [modelName]: triggerRules,
    });
    validateStatus.loading = true;
    return validator
      .validate({ [modelName]: innerValue.value })
      .then(() => {
        validateStatus.state = "success";
      })
      .catch((e: FormValidataFailure) => {
        const { errors } = e;
        validateStatus.state = "error";
        validateStatus.errorMsg =
          (errors && errors.length > 0) ? errors[0].message || "" : "";
          return Promise.reject(e);
      })
      .finally(() => {
        validateStatus.loading = false;
      });
  }
};

// 清楚验证状态
const clearValidate = () => {
  validateStatus.state = "init";
  validateStatus.errorMsg = "";
  validateStatus.loading = false;
}

// 回复初始值
const resetField = () => {
  clearValidate();
  const model = formContext?.model;
  if (model && props.prop && !isNil(model[props.prop])) {
    model[props.prop] = initialValue;
  }
}

const context: FormItemContext = {
  validate,
  prop: props.prop || "",
  clearValidate,
  resetField,
};

provide(formItemContextKey, context);

onMounted(() => {
  if (props.prop) {
    formContext?.addField(context);
    initialValue = innerValue.value;
  }
});

onUnmounted(() => {
  formContext?.removeField(context);
});

// 导出
defineExpose<FormItemInstance>({
  validateStatus,
  validate,
  resetField,
  clearValidate,
})

</script>

<template>
  <div
    class="xx-form-item"
    :class="{
      'is-error': validateStatus.state === 'error',
      'is-success': validateStatus.state === 'success',
      'is-loading': validateStatus.loading,
      'is-required': isRequired
    }"
  >
    <label class="xx-form-item__label">
      <slot name="label" :label="label">
        {{ label }}
      </slot>
    </label>
    <div class="xx-form-item__content">
      <slot :validate="validate" />
      <div class="xx-form-item__error" v-if="validateStatus.state === 'error'">
        {{ validateStatus.errorMsg }}
      </div>
    </div>
  </div>
</template>
