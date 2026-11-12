import { type ReactNode, useId } from 'react'
import type { AnyFieldApi } from '@tanstack/react-form'
import { createFormFieldAssociation } from '@fex-design/core/form/field-association'
import { useLazyRef } from '../../hooks/use-lazy-ref'
import { useIsomorphicLayoutEffect } from '../../hooks/use-isomorphic-layout-effect'
import { FieldContext, useRootContext } from './context'
import type { FormFieldOptions } from './form-types'
import { formFieldClassName } from '@fex-design/components-styles/form'

export type FormFieldProps<
  TData,
  TName extends import('@tanstack/react-form').DeepKeys<TData>,
> = FormFieldOptions<TData, TName> & {
  className?: string
  style?: React.CSSProperties
  children?: ReactNode | ((field: import('./form-types').FormFieldApi<TData, TName>) => ReactNode)
}
export function FormField<
  TData = Record<string, unknown>,
  TName extends import('@tanstack/react-form').DeepKeys<TData> =
    import('@tanstack/react-form').DeepKeys<TData>,
>({ children, className, style, ...options }: FormFieldProps<TData, TName>) {
  const root = useRootContext()
  const id = useId()
  const association = useLazyRef(() => createFormFieldAssociation(`control-${id}`)).current
  // The mounted field owns this registration; name changes release the old path.
  useIsomorphicLayoutEffect(
    () => root.targets.claim(String(options.name)),
    [root.targets, options.name],
  )
  // Context erases only the provider's compile-time type; the public options remain typed.
  return (
    <root.form.Field {...options} name={String(options.name)}>
      {(field) => (
        <FieldContext
          value={{
            field,
            association,
          }}
        >
          <div
            data-slot="form-field"
            className={`${formFieldClassName} ${className ?? ''}`}
            style={style}
          >
            {typeof children === 'function' ? children(field) : children}
          </div>
        </FieldContext>
      )}
    </root.form.Field>
  )
}
