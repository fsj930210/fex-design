import { cn } from '@/lib/utils'
import type { SeparatorOptions } from './utils'
import type { ComponentProps } from 'react'
export type SeparatorProps = ComponentProps<'div'> & SeparatorOptions
export function Separator({ orientation = 'horizontal', className, ...props }: SeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      data-slot="separator"
      data-orientation={orientation}
      className={cn("shrink-0 bg-border data-[orientation=horizontal]:block data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:inline-block data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px", className)}
      {...props}
    />
  )
}
