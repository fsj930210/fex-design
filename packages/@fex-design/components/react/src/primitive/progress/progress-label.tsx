import { progressLabelClassName } from '@fex-design/components-styles/progress'
import { cn } from '@fex-design/utils'
import { type ComponentProps, type Ref } from 'react'
export interface ProgressLabelProps extends ComponentProps<'span'> {
  ref?: Ref<HTMLSpanElement>
}
export function ProgressLabel({ ref, className, ...props }: ProgressLabelProps) {
  return (
    <span
      {...props}
      ref={ref}
      data-slot="progress-label"
      className={cn(progressLabelClassName, className)}
    />
  )
}
