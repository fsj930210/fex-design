import {
  stepContentClassName,
} from '@fex-design/components-styles/steps'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes, ReactNode } from 'react'

export interface StepContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export function StepContent({ className, ...props }: StepContentProps) {
  return <div {...props} className={cn(stepContentClassName, className)} />
}
