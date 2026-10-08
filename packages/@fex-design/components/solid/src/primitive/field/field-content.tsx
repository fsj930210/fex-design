import { fieldContentClassName } from '@fex-design/components-styles/field'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX } from 'solid-js'

export function FieldContent(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, rest] = splitProps(props, ['class'])
  return <div {...rest} data-slot="field-content" class={cn(fieldContentClassName, local.class)} />
}
