import { scrollbarCornerClassName } from '@fex-design/components-styles/scrollbar'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes, RefAttributes } from 'react'

export type ScrollbarCornerProps = HTMLAttributes<HTMLDivElement> & RefAttributes<HTMLDivElement>

export function ScrollbarCorner({ className, ...props }: ScrollbarCornerProps) {
  return (
    <div
      {...props}
      data-slot="scrollbar-corner"
      className={cn(scrollbarCornerClassName, className)}
    />
  )
}
