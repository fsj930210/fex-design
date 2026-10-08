import { fieldLegendClassName } from '@fex-design/components-styles/field'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'

export function FieldLegend({ className, ...props }: ComponentProps<'legend'>) {
  return (
    <legend {...props} data-slot="field-legend" className={cn(fieldLegendClassName, className)} />
  )
}
