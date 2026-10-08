import { separatorClassName } from '@fex-design/components-styles/separator'
import { cn } from '@fex-design/utils'
import type { SeparatorOptions } from '@fex-design/core/separator/types'
import type { ComponentProps } from 'react'
export type SeparatorProps = ComponentProps<'div'> & SeparatorOptions
export function Separator({ orientation = 'horizontal', className, ...props }: SeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      data-slot="separator"
      data-orientation={orientation}
      className={cn(separatorClassName, className)}
      {...props}
    />
  )
}
