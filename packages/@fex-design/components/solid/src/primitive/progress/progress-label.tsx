import { progressLabelClassName } from '@fex-design/components-styles/progress'
import { cn } from '@fex-design/utils'
import { splitProps, type JSX, type ParentProps } from 'solid-js'

export type ProgressLabelProps = JSX.HTMLAttributes<HTMLSpanElement>

export function ProgressLabel(props: ParentProps<ProgressLabelProps>) {
  const [local, others] = splitProps(props, ["class", "children"])

  return (
    <span
      {...others}
      data-slot="progress-label"
      class={cn(progressLabelClassName, local.class)}
    >
      {local.children}
    </span>
  )
}
