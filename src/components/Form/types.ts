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
export interface FormContext extends FormProps{
  addField: (field: FormItemContext) => void;
  removeField: (field: FormItemContext) => void;
}

export interface validateStatusProp {
  state: 'init' | 'success' | 'error';
  errorMsg: string;
  loading: boolean;
}

export interface FormItemContext {
  prop: string;
  validate: (trigger?: string) => Promise<any>;
  resetField: () => void;
  clearValidate: () => void;
}

export interface FormValidataFailure {
  errors: ValidateError[] | null;
  fields: ValidateFieldsError;
}

export interface FormInstance {
  validate: () => Promise<any>;
  resetField: (peops?: string[]) => void;
  clearValidate: (peops?: string[]) => void;
}

export interface FormItemInstance {
  validateStatus: validateStatusProp;
  validate: (trigger?: string) => Promise<any>;
  resetField: () => void;
  clearValidate: () => void;
}
export const formContextKey: InjectionKey<FormContext> = Symbol('formContextKey');
export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('formItemContextKey');