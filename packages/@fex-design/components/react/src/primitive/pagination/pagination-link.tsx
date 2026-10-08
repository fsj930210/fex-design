import {
  paginationLinkClassName,
  paginationTextLinkClassName,
} from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'

export type PaginationLinkProps = {
  isActive?: boolean
  size?: 'md' | 'icon'
} & ComponentProps<'a'>

export function PaginationLink({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive ? 'true' : undefined}
      className={cn(
        paginationLinkClassName,
        size === 'md' ? paginationTextLinkClassName : '',
        className,
      )}
      {...props}
    />
  )
}
