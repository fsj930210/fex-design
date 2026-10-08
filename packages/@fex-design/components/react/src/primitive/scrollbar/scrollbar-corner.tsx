import { scrollbarCornerClassName } from '@fex-design/components-styles/scrollbar'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes } from 'react'

export function ScrollbarCorner({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      data-slot="scrollbar-corner"
      className={cn(scrollbarCornerClassName, className)}
    />
  )
}
