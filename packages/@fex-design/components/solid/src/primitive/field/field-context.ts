import { createContext, useContext, type JSX } from 'solid-js'

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
    'aria-required'?: true | undefined
    'aria-invalid'?: true | undefined
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

export const FieldContext = createContext<FieldContextValue>()
export const FormFieldNameContext = createContext<string>()

export let renderingFieldName: string | undefined

export function withRenderingFieldName(fieldName: string, render: () => JSX.Element) {
  const previousFieldName = renderingFieldName
  renderingFieldName = fieldName
  try {
    return render()
  } finally {
    renderingFieldName = previousFieldName
  }
}

export function useFieldContext(component: string) {
  const context = useContext(FieldContext)
  if (!context) throw new Error(`${component} must be used inside FieldRoot.`)
  return context
}
