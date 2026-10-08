import { fieldRequiredIndicatorClassName } from '@fex-design/components-styles/field'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'

export function FieldRequiredIndicator(props: ParentProps<JSX.HTMLAttributes<HTMLSpanElement>>) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  return (
    <span
      {...rest}
      aria-hidden="true"
      data-slot="field-required-indicator"
      class={cn(fieldRequiredIndicatorClassName, local.class)}
    >
      {local.children ?? '*'}
    </span>
  )
}
