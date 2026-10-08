import { paginationClassName } from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'

export function Pagination({ className, ...props }: ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn(paginationClassName, className)}
      {...props}
    />
  )
}

export { Pagination as PaginationRoot }
