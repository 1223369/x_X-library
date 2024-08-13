import type { InjectionKey } from 'vue';
import type { RuleItem, ValidateError, ValidateFieldsError } from 'async-validator'

export interface FormItemProps {
  label: string;
  prop?: string;
}

export interface FormItemRule extends RuleItem {
  trigger?: string;
}

export type FormRules =  Record<string, FormItemRule[]>;

/**
 * @model 表单数据
 * @rules 表单校验规则
 */
export interface FormProps {
  model: Record<string, any>;
  rules: FormRules;
}

//Form组件传递给FormItem的props
export interface FormContext extends FormProps{}

export interface FormItemContext {
  validate: (trigger?: string) => any
}

export interface FormValidataFailure {
  errors: ValidateError[] | null;
  fields: ValidateFieldsError;
}

export const formContextKey: InjectionKey<FormContext> = Symbol('formContextKey');
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContextKey');