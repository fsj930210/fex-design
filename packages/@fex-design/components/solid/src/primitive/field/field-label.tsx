import { fieldLabelClassName } from '@fex-design/components-styles/field'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX } from 'solid-js'
import { useFieldContext } from './field-context'

export function FieldLabel(props: JSX.LabelHTMLAttributes<HTMLLabelElement>) {
  const context = useFieldContext('FieldLabel')
  const [local, rest] = splitProps(props, ['for', 'class'])
  return (
    <label
      {...rest}
      for={local.for ?? context.controlId}
      data-slot="field-label"
      class={cn(fieldLabelClassName, local.class)}
    />
  )
}
