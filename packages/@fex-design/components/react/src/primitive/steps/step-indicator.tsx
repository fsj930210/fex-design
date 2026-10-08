import {
  stepIndicatorClassName,
} from '@fex-design/components-styles/steps'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes, ReactNode } from 'react'
import { CheckIcon } from '@fex-design/react/icons/check'
import { useStepContext } from './steps-context'

export interface StepIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode
}

export function StepIndicator({ children, className, ...props }: StepIndicatorProps) {
  const step = useStepContext('StepIndicator')
  return (
    <span {...props} className={cn(stepIndicatorClassName, className)}>
      {children ?? (step.status === 'finish' ? <CheckIcon /> : step.position)}
    </span>
  )
}
