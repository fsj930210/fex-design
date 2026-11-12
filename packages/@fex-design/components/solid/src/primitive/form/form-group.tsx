import { splitProps, type JSX } from 'solid-js'
import { formGroupClassName } from '@fex-design/components-styles/form'
import { cn } from '@fex-design/utils'
import { useRootContext } from './context'
export function FormGroup(props: JSX.FieldsetHTMLAttributes<HTMLFieldSetElement>) {
  useRootContext()
  const [local, rest] = splitProps(props, ['class'])
  return <fieldset {...rest} data-slot="form-group" class={cn(formGroupClassName, local.class)} />
}
