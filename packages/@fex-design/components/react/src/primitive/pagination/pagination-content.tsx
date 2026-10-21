import { paginationContentClassName } from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'

export function PaginationContent({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      data-slot="pagination-content"
      className={cn(paginationContentClassName, className)}
    />
  )
}
