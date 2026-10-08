import { fieldDescriptionClassName } from '@fex-design/components-styles/field'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX } from 'solid-js'
import { useFieldContext } from './field-context'

export function FieldDescription(props: JSX.HTMLAttributes<HTMLParagraphElement>) {
  const context = useFieldContext('FieldDescription')
  const [local, rest] = splitProps(props, ['id', 'class'])
  return (
    <p
      {...rest}
      id={local.id ?? context.descriptionId}
      data-slot="field-description"
      class={cn(fieldDescriptionClassName, local.class)}
    />
  )
}
