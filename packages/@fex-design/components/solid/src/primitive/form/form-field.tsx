import { createUniqueId, Show, type JSX } from 'solid-js'
import { createFormFieldAssociation } from '@fex-design/core/form/field-association'
import type { DeepKeys } from '@tanstack/solid-form'
import type { FormFieldOptions, FormFieldApi } from './form-types'
import { FieldContext, useRootContext } from './context'
import { formFieldClassName } from '@fex-design/components-styles/form'

export type FormFieldProps<TData, TName extends DeepKeys<TData>> = FormFieldOptions<
  TData,
  TName
> & {
  class?: string
  style?: JSX.CSSProperties
  children?: JSX.Element | ((field: () => FormFieldApi<TData, TName>) => JSX.Element)
}

export function FormField<
  TData = Record<string, unknown>,
  TName extends DeepKeys<TData> = DeepKeys<TData>,
>(props: FormFieldProps<TData, TName>) {
  const root = useRootContext()
  const association = createFormFieldAssociation(`control-${createUniqueId()}`)
  return (
    // A field API owns one path; recreate its lifecycle when an array index changes.
    <Show when={props.name} keyed>
      {(name) => (
        <root.form.Field {...props} name={name}>
          {(field: () => FormFieldApi<TData, TName>) => (
            <FieldContext.Provider value={{ field, association }}>
              <div
                data-slot="form-field"
                class={`${formFieldClassName} ${props.class ?? ''}`}
                style={props.style}
              >
                {typeof props.children === 'function' ? props.children(field) : props.children}
              </div>
            </FieldContext.Provider>
          )}
        </root.form.Field>
      )}
    </Show>
  )
}
