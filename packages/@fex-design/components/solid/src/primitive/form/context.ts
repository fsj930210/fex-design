import { createContext, useContext } from 'solid-js'
import type { AnyFormApi, AnyFieldApi } from '@tanstack/solid-form'
import type { FormTargets } from '@fex-design/core/form/field-targets'
import type { createFormFieldAssociation } from '@fex-design/core/form/field-association'
export interface RootScope {
  form: AnyFormApi
  targets: FormTargets
}
export interface FieldScope {
  field: () => AnyFieldApi
  association: ReturnType<typeof createFormFieldAssociation>
}
export const RootContext = createContext<RootScope>()
export const FieldContext = createContext<FieldScope>()
export function useRootContext() {
  const scope = useContext(RootContext)
  if (!scope) throw new Error('Form parts must be used inside FormRoot.')
  return scope
}
export function useFieldContext() {
  const scope = useContext(FieldContext)
  if (!scope) throw new Error('This form part must be used inside FormField.')
  return scope
}
