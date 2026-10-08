import { fieldSetClassName } from '@fex-design/components-styles/field'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX } from 'solid-js'

export function FieldSet(props: JSX.FieldsetHTMLAttributes<HTMLFieldSetElement>) {
  const [local, rest] = splitProps(props, ['class'])
  return <fieldset {...rest} data-slot="field-set" class={cn(fieldSetClassName, local.class)} />
}
