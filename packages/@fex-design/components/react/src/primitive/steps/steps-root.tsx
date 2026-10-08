import {
  stepsClassName,
} from '@fex-design/components-styles/steps'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes, ReactNode } from 'react'
import { StepsContext } from './steps-context'
import { useSteps, type UseStepsOptions } from './use-steps'

export interface StepsProps<TData = unknown>
  extends UseStepsOptions<TData>, Omit<HTMLAttributes<HTMLOListElement>, 'onChange'> {
  children?: ReactNode
}

export function Steps<TData = unknown>({
  children,
  className,
  style,
  ...options
}: StepsProps<TData>) {
  const steps = useSteps(options)
  return (
    <StepsContext value={steps}>
      <ol
        className={cn(
          stepsClassName({ orientation: steps.orientation, responsive: steps.responsive }),
          className,
        )}
        data-orientation={steps.orientation}
        style={style}
      >
        {children}
      </ol>
    </StepsContext>
  )
}

export { Steps as StepsRoot, type StepsProps as StepsRootProps }
