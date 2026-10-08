import { fieldGroupClassName, type FieldGroupStyleProps } from '@fex-design/components-styles/field'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'

export interface FieldGroupProps extends ComponentProps<'div'>, FieldGroupStyleProps {}

export function FieldGroup({ orientation, className, ...props }: FieldGroupProps) {
  return (
    <div
      {...props}
      role={props.role ?? 'group'}
      data-slot="field-group"
      data-orientation={orientation}
      className={cn(fieldGroupClassName({ orientation }), className)}
    />
  )
}
