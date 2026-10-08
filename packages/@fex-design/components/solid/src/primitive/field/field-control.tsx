import { useContext, type JSX } from 'solid-js'
import { FormFieldNameContext, renderingFieldName, useFieldContext, type FieldControlBinding } from './field-context'

export function FieldControl(props: { children: (binding: FieldControlBinding) => JSX.Element }) {
  const context = useFieldContext('FieldControl')
  const fieldName = useContext(FormFieldNameContext) ?? renderingFieldName
  const describedBy = () =>
    [context.hasDescription ? context.descriptionId : '', context.hasError ? context.errorId : '']
      .filter(Boolean)
      .join(' ') || undefined
  return props.children({
    props: {
      id: context.controlId,
      disabled: context.disabled || undefined,
      readOnly: context.readOnly || undefined,
      'aria-required': context.required || undefined,
      'aria-invalid': context.invalid || undefined,
      'aria-describedby': describedBy(),
      'aria-errormessage': context.invalid && context.hasError ? context.errorId : undefined,
      'data-field-name': fieldName,
    },
    state: context,
  })
}
