import { getContext, setContext } from 'svelte'
import type { AnyFieldApi, AnyFormApi } from '@tanstack/svelte-form'
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
const rootKey = Symbol('FormRoot')
const fieldKey = Symbol('FormField')
export function provideRoot(scope: RootScope) {
  setContext(rootKey, scope)
}
export function provideField(scope: FieldScope) {
  setContext(fieldKey, scope)
}
export function getRoot() {
  const scope = getContext<RootScope | undefined>(rootKey)
  if (!scope) throw new Error('Form parts must be used inside FormRoot.')
  return scope
}
export function getFieldScope() {
  const scope = getContext<FieldScope | undefined>(fieldKey)
  if (!scope) throw new Error('This form part must be used inside FormField.')
  return scope
}
