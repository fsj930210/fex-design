import { createContext, use } from 'react'
import type { AnyFieldApi, AnyFormApi } from '@tanstack/react-form'
import type { createFormFieldAssociation } from '@fex-design/core/form/field-association'
import type { FormTargets } from '@fex-design/core/form/field-targets'

export interface RootContextValue {
  form: AnyFormApi
  targets: FormTargets
}
export interface FieldContextValue {
  field: AnyFieldApi
  association: ReturnType<typeof createFormFieldAssociation>
}
export const RootContext = createContext<RootContextValue | null>(null)
export const FieldContext = createContext<FieldContextValue | null>(null)
export function useRootContext() {
  const value = use(RootContext)
  if (!value) throw new Error('Form parts must be used inside FormRoot.')
  return value
}
export function useFieldContext() {
  const value = use(FieldContext)
  if (!value) throw new Error('This form part must be used inside FormField.')
  return value
}
