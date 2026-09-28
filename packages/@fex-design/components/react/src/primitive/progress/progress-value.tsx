import { progressValueClassName } from '@fex-design/components-styles/progress'
import { cn } from '@fex-design/utils'
import { type ComponentProps, type ReactNode, type Ref } from 'react'
import { useProgressContext } from './progress-context'
export interface ProgressValueProps extends ComponentProps<'span'> {
  ref?: Ref<HTMLSpanElement>
  children?:
    | ReactNode
    | ((context: { value: number | null; percentage: number | null }) => ReactNode)
}
export function ProgressValue({ ref, className, children, ...props }: ProgressValueProps) {
  const context = useProgressContext('ProgressValue')
  const display = typeof children === 'function'
    ? children({ value: context.value, percentage: context.percentage })
    : children
  return (
    <span
      {...props}
      ref={ref}
      data-slot="progress-value"
      data-status={context.status}
      className={cn(progressValueClassName, className)}
    >
      {display}
    </span>
  )
}
