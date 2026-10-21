import { paginationEllipsisClassName } from '@fex-design/components-styles/pagination'
import { usePaginationContext } from './context'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'
import { MoreIcon } from '@fex-design/react/icons/more'

export function PaginationEllipsis({ className, children, ...props }: ComponentProps<'span'>) {
  const { size } = usePaginationContext()
  return (
    <span
      {...props}
      data-slot="pagination-ellipsis"
      className={cn(paginationEllipsisClassName({ size: size }), className)}
      aria-hidden="true"
    >
      {children ?? <MoreIcon />}
    </span>
  )
}
