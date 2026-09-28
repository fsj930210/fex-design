import { progressLineClassName } from '@fex-design/components-styles/progress'
import { cn } from '@fex-design/utils'
import { type ComponentProps, type Ref } from 'react'
import { useProgressContext } from './progress-context'

export interface ProgressTrackProps extends ComponentProps<'div'> {
  ref?: Ref<HTMLDivElement>
}
export function ProgressTrack({
  ref,
  className,
  style,
  children,
  ...props
}: ProgressTrackProps) {
  const context = useProgressContext('ProgressTrack')
  return (
    <div
      {...props}
      ref={ref}
      data-slot="progress-track"
      data-status={context.status}
      className={cn(progressLineClassName, className)}
      style={{ height: context.thickness, ...style }}
    >
      {children}
    </div>
  )
}
