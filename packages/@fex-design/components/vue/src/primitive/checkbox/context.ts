import type { CheckboxValue } from '@fex-design/core/checkbox/types'
import type { ComputedRef, InjectionKey } from 'vue'
export interface CheckboxRootContext {
  controlId: string
  value: ComputedRef<CheckboxValue | undefined>
  disabled: ComputedRef<boolean>
}
export interface CheckboxGroupContext {
  value: ComputedRef<CheckboxValue[]>
  disabled: ComputedRef<boolean>
  toggle(value: CheckboxValue): void
}
export const checkboxRootKey: InjectionKey<CheckboxRootContext> = Symbol('CheckboxRoot')
export const checkboxGroupKey: InjectionKey<CheckboxGroupContext> = Symbol('CheckboxGroup')
