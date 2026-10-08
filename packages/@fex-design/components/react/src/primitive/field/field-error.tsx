import { fieldErrorClassName } from '@fex-design/components-styles/field'
import { cn } from '@fex-design/utils'
import type { ComponentProps, ReactNode } from 'react'
import { useFieldContext } from './field-context'

export interface FieldErrorProps extends ComponentProps<'div'> {
  errors?: readonly ReactNode[] | undefined
}

export function FieldError({ errors, className, children, ...props }: FieldErrorProps) {
  const context = useFieldContext('FieldError')
  const uniqueErrors = errors?.filter(
    (error, index, values) =>
      values.findIndex((value) => String(value) === String(error)) === index,
  )
  const content =
    children ??
    uniqueErrors?.map((error, index) => (
      <div key={typeof error === 'string' ? error : index}>{error}</div>
    ))
  if (!content) return null
  return (
    <div
      {...props}
      id={props.id ?? context.errorId}
      role="alert"
      aria-live="polite"
      data-slot="field-error"
      className={cn(fieldErrorClassName, className)}
    >
      {content}
    </div>
  )
}
