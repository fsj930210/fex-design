export { useFormActions } from '../../primitive/form/form-actions'
import { type ComponentProps, type CSSProperties, type ReactNode } from 'react'
import {
  FormDescription as PrimitiveFormDescription,
  FormError as PrimitiveFormError,
  FormField as PrimitiveFormField,
  FormLabel as PrimitiveFormLabel,
  FormRoot,
  FormControl,
  FormGroup as PrimitiveFormGroup,
  FormLegend as PrimitiveFormLegend,
  FormSubscribe,
} from '@fex-design/react/primitive/form'
import type { FormFieldOptions } from '@fex-design/react/primitive/form'
import { cn } from '@fex-design/utils'
export { FormSubscribe }

export function FormGroup({
  legend,
  classNames,
  styles,
  children,
  ...props
}: ComponentProps<typeof PrimitiveFormGroup> & {
  legend?: ReactNode
  classNames?: { root?: string; legend?: string }
  styles?: { root?: CSSProperties; legend?: CSSProperties }
}) {
  return (
    <PrimitiveFormGroup
      {...props}
      className={cn(classNames?.root, props.className)}
      style={{ ...styles?.root, ...props.style }}
    >
      {legend !== undefined ? (
        <PrimitiveFormLegend className={classNames?.legend} style={styles?.legend}>
          {legend}
        </PrimitiveFormLegend>
      ) : null}
      {children}
    </PrimitiveFormGroup>
  )
}
export type FormProps = ComponentProps<typeof FormRoot>

export interface FormClassNames {
  root?: string
  field?: string
  label?: string
  description?: string
  error?: string
}
export interface FormStyles {
  root?: CSSProperties
  field?: CSSProperties
  label?: CSSProperties
  description?: CSSProperties
  error?: CSSProperties
}

export function Form({
  className,
  classNames,
  styles,
  children,
  ...props
}: FormProps & { classNames?: FormClassNames; styles?: FormStyles }) {
  return (
    <FormRoot
      {...props}
      data-slot="form"
      className={cn(classNames?.root, className)}
      style={{ ...styles?.root, ...props.style }}
    >
      {children}
    </FormRoot>
  )
}

export interface FormFieldProps<
  TData,
  TName extends import('@tanstack/react-form').DeepKeys<TData>,
> extends FormFieldOptions<TData, TName> {
  label?: ReactNode
  description?: ReactNode
  error?: ReactNode | ((errors: readonly unknown[]) => ReactNode)
  showError?: boolean
  required?: boolean
  className?: string
  style?: CSSProperties
  children?:
    | ReactNode
    | ((field: import('@fex-design/react/primitive/form').FormFieldApi<TData, TName>) => ReactNode)
  classNames?: Pick<FormClassNames, 'field' | 'label' | 'description' | 'error'>
  styles?: Pick<FormStyles, 'field' | 'label' | 'description' | 'error'>
}

export function FormField<
  TData = Record<string, unknown>,
  TName extends import('@tanstack/react-form').DeepKeys<TData> =
    import('@tanstack/react-form').DeepKeys<TData>,
>({
  label,
  description,
  error,
  showError = true,
  required = false,
  className,
  style,
  children,
  classNames,
  styles,
  ...options
}: FormFieldProps<TData, TName>) {
  return (
    <PrimitiveFormField
      {...options}
      className={cn(classNames?.field, className)}
      style={{ ...styles?.field, ...style }}
    >
      {(field) => (
        <>
          {label !== undefined ? (
            <PrimitiveFormLabel
              required={required}
              className={classNames?.label}
              style={styles?.label}
            >
              {label}
            </PrimitiveFormLabel>
          ) : null}
          <FormControl>{typeof children === 'function' ? children(field) : children}</FormControl>
          {description !== undefined ? (
            <PrimitiveFormDescription
              className={classNames?.description}
              style={styles?.description}
            >
              {description}
            </PrimitiveFormDescription>
          ) : null}
          {showError ? (
            <PrimitiveFormError className={classNames?.error} style={styles?.error}>
              {error}
            </PrimitiveFormError>
          ) : null}
        </>
      )}
    </PrimitiveFormField>
  )
}
