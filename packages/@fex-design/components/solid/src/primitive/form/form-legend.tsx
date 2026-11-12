import { splitProps, type JSX } from 'solid-js'
import { formLegendClassName } from '@fex-design/components-styles/form'
import { cn } from '@fex-design/utils'
import { useRootContext } from './context'
export function FormLegend(props: JSX.HTMLAttributes<HTMLLegendElement>) {
  useRootContext()
  const [local, rest] = splitProps(props, ['class'])
  return <legend {...rest} data-slot="form-legend" class={cn(formLegendClassName, local.class)} />
}
