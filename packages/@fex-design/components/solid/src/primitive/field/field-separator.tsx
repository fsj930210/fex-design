import { fieldSeparatorClassName } from '@fex-design/components-styles/field'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX } from 'solid-js'

export function FieldSeparator(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, rest] = splitProps(props, ['class'])
  return (
    <div
      {...rest}
      role={props.role ?? 'separator'}
      data-slot="field-separator"
      class={cn(fieldSeparatorClassName, local.class)}
    />
  )
}
