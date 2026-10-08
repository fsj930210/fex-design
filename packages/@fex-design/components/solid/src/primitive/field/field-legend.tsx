import { fieldLegendClassName } from '@fex-design/components-styles/field'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX } from 'solid-js'

export function FieldLegend(props: JSX.HTMLAttributes<HTMLLegendElement>) {
  const [local, rest] = splitProps(props, ['class'])
  return <legend {...rest} data-slot="field-legend" class={cn(fieldLegendClassName, local.class)} />
}
