import { fieldGroupClassName, type FieldGroupStyleProps } from '@fex-design/components-styles/field'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX } from 'solid-js'

export function FieldGroup(props: JSX.HTMLAttributes<HTMLDivElement> & FieldGroupStyleProps) {
  const [local, rest] = splitProps(props, ['class', 'orientation'])
  return (
    <div
      {...rest}
      role={props.role ?? 'group'}
      data-slot="field-group"
      data-orientation={local.orientation}
      class={cn(fieldGroupClassName({ orientation: local.orientation }), local.class)}
    />
  )
}
