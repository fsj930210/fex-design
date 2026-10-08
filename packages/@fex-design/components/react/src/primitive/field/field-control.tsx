import { use, type ReactNode } from 'react'
import { FormFieldNameContext, useFieldContext, type FieldControlBinding } from './field-context'

export function FieldControl({
  children,
}: {
  children: (binding: FieldControlBinding) => ReactNode
}) {
  const context = useFieldContext('FieldControl')
  const fieldName = use(FormFieldNameContext)
  const describedBy =
    [
      context.hasDescription ? context.descriptionId : null,
      context.hasError ? context.errorId : null,
    ]
      .filter(Boolean)
      .join(' ') || undefined
  return children({
    props: {
      id: context.controlId,
      disabled: context.disabled || undefined,
      readOnly: context.readOnly || undefined,
      'aria-required': context.required || undefined,
      'aria-invalid': context.invalid || undefined,
      'aria-describedby': describedBy,
      'aria-errormessage': context.invalid && context.hasError ? context.errorId : undefined,
      'data-field-name': fieldName ?? undefined,
    },
    state: context,
  })
}
