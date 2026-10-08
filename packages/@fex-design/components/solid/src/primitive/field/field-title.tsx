import { fieldTitleClassName } from '@fex-design/components-styles/field'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX } from 'solid-js'

export function FieldTitle(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const [local, rest] = splitProps(props, ['class'])
  return <div {...rest} data-slot="field-title" class={cn(fieldTitleClassName, local.class)} />
}
