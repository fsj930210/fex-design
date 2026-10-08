import { stepContentClassName } from '@fex-design/components-styles/steps'
import { cn } from '@fex-design/utils'
import {
  splitProps,
  type JSX,
  type ParentProps,
} from 'solid-js'

export function StepContent(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  return (
    <div {...rest} class={cn(stepContentClassName, local.class)}>
      {local.children}
    </div>
  )
}
