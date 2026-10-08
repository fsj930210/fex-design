import { stepIndicatorClassName } from '@fex-design/components-styles/steps'
import { cn } from '@fex-design/utils'
import {
  splitProps,
  type JSX,
  type ParentProps,
} from 'solid-js'
import { CheckIcon } from '@fex-design/solid/icons/check'
import { useStepContext } from './steps-context'

export function StepIndicator(props: ParentProps<JSX.HTMLAttributes<HTMLSpanElement>>) {
  const context = useStepContext('StepIndicator')
  const [local, rest] = splitProps(props, ['class', 'children'])
  return (
    <span {...rest} class={cn(stepIndicatorClassName, local.class)}>
      {local.children ?? (context.info().status === 'finish' ? <CheckIcon /> : context.position())}
    </span>
  )
}
