import type { ComponentProps } from 'react'
import { formLegendClassName } from '@fex-design/components-styles/form'
import { cn } from '@fex-design/utils'
import { useRootContext } from './context'

export function FormLegend({ className, ...props }: ComponentProps<'legend'>) {
  useRootContext()
  return (
    <legend {...props} data-slot="form-legend" className={cn(formLegendClassName, className)} />
  )
}
