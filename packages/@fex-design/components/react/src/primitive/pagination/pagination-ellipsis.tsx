import {
  paginationEllipsisClassName,
  paginationSrOnlyClassName,
} from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'
import { EllipsisIcon } from '@fex-design/react/icons/more'

export function PaginationEllipsis({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(paginationEllipsisClassName, className)}
      {...props}
    >
      <EllipsisIcon />
      <span className={paginationSrOnlyClassName}>More pages</span>
    </span>
  )
}
