import type { ReactNode } from 'react'
import { type AnyFieldApi, useForm as useTanStackForm } from '@tanstack/react-form'
import { useFormContext } from '../form'
import { FormFieldNameContext } from './field-context'

export type FieldProps = Parameters<ReturnType<typeof useTanStackForm>['Field']>[0]

/**
 * The only public field-state entry point. It binds a field to the nearest Form
 * and forwards native TanStack Field options without changing their semantics.
 */
export function Field({ children, ...props }: FieldProps) {
  const form = useFormContext()
  const TanStackField = form.Field as unknown as (fieldProps: FieldProps) => ReactNode

  return (
    <TanStackField {...props}>
      {(field: AnyFieldApi) => (
        <FormFieldNameContext value={String(field.name)}>{children(field)}</FormFieldNameContext>
      )}
    </TanStackField>
  )
}
