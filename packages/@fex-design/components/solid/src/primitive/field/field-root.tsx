import { fieldRootClassName, type FieldStyleProps } from '@fex-design/components-styles/field'
import { cn } from '@fex-design/utils'
import { createUniqueId, splitProps, useContext, type JSX, type ParentProps } from 'solid-js'
import { FieldContext, FormFieldNameContext, renderingFieldName, type FieldContextValue } from './field-context'

export interface FieldRootProps
  extends ParentProps<Omit<JSX.HTMLAttributes<HTMLDivElement>, 'id'>>, FieldStyleProps {
  id?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  invalid?: boolean
  hasDescription?: boolean
  hasError?: boolean
}

export function FieldRoot(props: FieldRootProps) {
  const generatedId = createUniqueId()
  const fieldName = useContext(FormFieldNameContext) ?? renderingFieldName
  const [local, rest] = splitProps(props, [
    'id',
    'orientation',
    'disabled',
    'readOnly',
    'required',
    'invalid',
    'hasDescription',
    'hasError',
    'class',
    'children',
  ])
  const baseId = () => local.id ?? fieldName ?? generatedId
  const context: FieldContextValue = {
    get controlId() {
      return `${baseId()}-control`
    },
    get descriptionId() {
      return `${baseId()}-description`
    },
    get errorId() {
      return `${baseId()}-error`
    },
    get disabled() {
      return local.disabled ?? false
    },
    get invalid() {
      return local.invalid ?? false
    },
    get readOnly() {
      return local.readOnly ?? false
    },
    get required() {
      return local.required ?? false
    },
    get hasDescription() {
      return local.hasDescription ?? false
    },
    get hasError() {
      return local.hasError ?? false
    },
  }
  return (
    <FieldContext.Provider value={context}>
      <div
        {...rest}
        data-slot="field-root"
        data-field-name={fieldName}
        data-orientation={local.orientation ?? 'vertical'}
        data-disabled={context.disabled || undefined}
        data-readonly={context.readOnly || undefined}
        data-required={context.required || undefined}
        data-invalid={context.invalid || undefined}
        class={cn(
          fieldRootClassName({ orientation: local.orientation ?? 'vertical' }),
          local.class,
        )}
      >
        {local.children}
      </div>
    </FieldContext.Provider>
  )
}
