import { fieldRootClassName, type FieldStyleProps } from '@fex-design/components-styles/field'
import { cn } from '@fex-design/utils'
import { use, useId, type HTMLAttributes, type ReactNode, type Ref } from 'react'
import { FieldContext, FormFieldNameContext, type FieldContextValue } from './field-context'

export interface FieldRootProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'id'>, FieldStyleProps {
  id?: string | undefined
  disabled?: boolean | undefined
  readOnly?: boolean | undefined
  required?: boolean | undefined
  invalid?: boolean | undefined
  hasDescription?: boolean | undefined
  hasError?: boolean | undefined
  ref?: Ref<HTMLDivElement> | undefined
}

export function FieldRoot({
  id,
  orientation = 'vertical',
  disabled = false,
  readOnly = false,
  required = false,
  invalid = false,
  hasDescription = false,
  hasError = false,
  className,
  ref,
  children,
  ...props
}: FieldRootProps) {
  const generatedId = useId()
  const fieldName = use(FormFieldNameContext)
  const baseId = id ?? fieldName ?? generatedId
  const context: FieldContextValue = {
    controlId: `${baseId}-control`,
    descriptionId: `${baseId}-description`,
    errorId: `${baseId}-error`,
    disabled,
    invalid,
    readOnly,
    required,
    hasDescription,
    hasError,
  }

  return (
    <FieldContext value={context}>
      <div
        {...props}
        ref={ref}
        data-slot="field-root"
        data-field-name={fieldName ?? undefined}
        data-orientation={orientation}
        data-disabled={disabled ? 'true' : undefined}
        data-readonly={readOnly ? 'true' : undefined}
        data-required={required ? 'true' : undefined}
        data-invalid={invalid ? 'true' : undefined}
        className={cn(fieldRootClassName({ orientation }), className)}
      >
        {children}
      </div>
    </FieldContext>
  )
}
