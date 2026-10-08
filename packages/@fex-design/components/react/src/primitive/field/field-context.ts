import { createContext, use } from 'react'

export interface FieldState {
  disabled: boolean
  invalid: boolean
  readOnly: boolean
  required: boolean
}

export interface FieldControlBinding {
  props: {
    id: string
    disabled?: true | undefined
    readOnly?: true | undefined
    'aria-invalid'?: true | undefined
    'aria-required'?: true | undefined
    'aria-describedby'?: string | undefined
    'aria-errormessage'?: string | undefined
    'data-field-name'?: string | undefined
  }
  state: FieldState
}

export interface FieldContextValue extends FieldState {
  controlId: string
  descriptionId: string
  errorId: string
  hasDescription: boolean
  hasError: boolean
}

export const FieldContext = createContext<FieldContextValue | null>(null)
export const FormFieldNameContext = createContext<string | null>(null)

export function useFieldContext(component: string) {
  const context = use(FieldContext)
  if (!context) throw new Error(`${component} must be used inside FieldRoot.`)
  return context
}
