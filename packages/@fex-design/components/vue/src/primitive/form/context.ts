import { inject, type InjectionKey } from 'vue'
import type { AnyFieldApi, AnyFormApi } from '@tanstack/vue-form'
import type { FormTargets } from '@fex-design/core/form/field-targets'
import type { createFormFieldAssociation } from '@fex-design/core/form/field-association'
export interface RootScope {
  form: AnyFormApi
  targets: FormTargets
}
export interface FieldScope {
  field: AnyFieldApi
  association: ReturnType<typeof createFormFieldAssociation>
}
export const rootKey: InjectionKey<RootScope> = Symbol('FormRoot')
export const fieldKey: InjectionKey<FieldScope> = Symbol('FormField')
export function useRootContext() {
  const value = inject(rootKey)
  if (!value) throw new Error('Form parts must be used inside FormRoot.')
  return value
}
export function useFieldContext() {
  const value = inject(fieldKey)
  if (!value) throw new Error('This form part must be used inside FormField.')
  return value
}
