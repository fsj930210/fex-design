export { useFormActions } from '../../primitive/form/form-actions'
import type { FormLayoutOptions } from '@fex-design/core/form/types'
import type { ParentProps, JSX } from 'solid-js'
import { Show, splitProps } from 'solid-js'
import {
  FormDescription as PrimitiveFormDescription,
  FormError as PrimitiveFormError,
  FormControl,
  FormField as PrimitiveFormField,
  FormGroup as PrimitiveFormGroup,
  FormLegend as PrimitiveFormLegend,
  FormSubscribe as PrimitiveFormSubscribe,
  FormLabel as PrimitiveFormLabel,
  FormRoot,
  type FormFieldApi,
  type FormFieldOptions,
} from '@fex-design/solid/primitive/form'
import { cn } from '@fex-design/utils'
import { mergeStyle } from '../../primitives/merge-style'

export function FormGroup(
  props: ParentProps<
    {
      legend?: JSX.Element
      classNames?: { root?: string; legend?: string }
      styles?: { root?: JSX.CSSProperties; legend?: JSX.CSSProperties }
    } & JSX.FieldsetHTMLAttributes<HTMLFieldSetElement>
  >,
) {
  const [local, rest] = splitProps(props, ['legend', 'children', 'classNames', 'styles'])
  return (
    <PrimitiveFormGroup
      {...rest}
      class={cn(local.classNames?.root, rest.class)}
      style={{ ...local.styles?.root, ...rest.style }}
    >
      <Show when={local.legend !== undefined}>
        <PrimitiveFormLegend class={local.classNames?.legend} style={local.styles?.legend}>
          {local.legend}
        </PrimitiveFormLegend>
      </Show>
      {local.children}
    </PrimitiveFormGroup>
  )
}

export { PrimitiveFormSubscribe as FormSubscribe }

export type FormProps = ParentProps<
  JSX.FormHTMLAttributes<HTMLFormElement> &
    FormLayoutOptions & {
      form: Parameters<typeof FormRoot>[0]['form']
      component?: 'form' | false
      scrollToFirstError?: boolean | object
      classNames?: FormClassNames
      styles?: FormStyles
    }
>
export interface FormClassNames {
  root?: string
  field?: string
  label?: string
  description?: string
  error?: string
}
export interface FormStyles {
  root?: JSX.CSSProperties
  field?: JSX.CSSProperties
  label?: JSX.CSSProperties
  description?: JSX.CSSProperties
  error?: JSX.CSSProperties
}

export function Form(props: FormProps) {
  const [local, rest] = splitProps(props, ['classNames', 'styles', 'class', 'style', 'children'])
  return (
    <FormRoot
      {...rest}
      class={cn(local.classNames?.root, local.class)}
      style={{ ...local.styles?.root, ...local.style }}
    >
      {local.children}
    </FormRoot>
  )
}

export type FormFieldProps<
  TData,
  TName extends import('@tanstack/solid-form').DeepKeys<TData>,
> = FormFieldOptions<TData, TName> & {
  label?: JSX.Element
  description?: JSX.Element
  error?: JSX.Element | ((errors: readonly unknown[]) => JSX.Element)
  showError?: boolean
  required?: boolean
  class?: string
  style?: JSX.CSSProperties
  children?: JSX.Element | ((field: () => FormFieldApi<TData, TName>) => JSX.Element)
  classNames?: Pick<FormClassNames, 'field' | 'label' | 'description' | 'error'>
  styles?: Pick<FormStyles, 'field' | 'label' | 'description' | 'error'>
}

export function FormField<
  TData = Record<string, unknown>,
  TName extends import('@tanstack/solid-form').DeepKeys<TData> =
    import('@tanstack/solid-form').DeepKeys<TData>,
>(props: FormFieldProps<TData, TName>) {
  const [local, rest] = splitProps(props, [
    'label',
    'description',
    'error',
    'showError',
    'required',
    'class',
    'style',
    'children',
    'classNames',
    'styles',
  ])
  return (
    <PrimitiveFormField
      {...rest}
      class={cn(local.classNames?.field, local.class)}
      style={mergeStyle(local.styles?.field, local.style)}
    >
      {(field) => (
        <>
          <Show when={local.label !== undefined}>
            <PrimitiveFormLabel
              required={local.required}
              class={local.classNames?.label}
              style={local.styles?.label}
            >
              {local.label}
            </PrimitiveFormLabel>
          </Show>
          <FormControl>
            {typeof local.children === 'function' ? local.children(field) : local.children}
          </FormControl>
          <Show when={local.description !== undefined}>
            <PrimitiveFormDescription
              class={local.classNames?.description}
              style={local.styles?.description}
            >
              {local.description}
            </PrimitiveFormDescription>
          </Show>
          <Show when={local.showError !== false}>
            <Show
              when={local.error !== undefined}
              fallback={
                <PrimitiveFormError class={local.classNames?.error} style={local.styles?.error} />
              }
            >
              <PrimitiveFormError class={local.classNames?.error} style={local.styles?.error}>
                {typeof local.error === 'function' ? local.error : () => local.error}
              </PrimitiveFormError>
            </Show>
          </Show>
        </>
      )}
    </PrimitiveFormField>
  )
}
