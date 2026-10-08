import { progressValueClassName } from '@fex-design/components-styles/progress'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX } from 'solid-js'
import { useProgressContext } from './progress-context'

export type ProgressValueProps = Omit<JSX.HTMLAttributes<HTMLSpanElement>, 'children'> & {
  children?: JSX.Element | ((context: { value: number | null; percentage: number | null }) => JSX.Element)
}

export function ProgressValue(props: ProgressValueProps) {
  const [local, others] = splitProps(props, ["class", "children"])
  const context = useProgressContext("ProgressValue")

  return (
    <span
      {...others}
      data-slot="progress-value"
      data-status={context().status}
      class={cn(progressValueClassName, local.class)}
    >
      {typeof local.children === 'function'
        ? local.children({ value: context().value, percentage: context().percentage })
        : local.children}
    </span>
  )
}

