import { paginationRootClassName } from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'
import type { ComponentProps, ReactNode } from 'react'
import type {
  PaginationOptions,
  PaginationSnapshot,
  PaginationSize,
} from '@fex-design/core/pagination/types'
import { PaginationContext } from './context'
import { usePagination } from './use-pagination'

export type PaginationRootProps = Omit<ComponentProps<'nav'>, 'onChange' | 'children'> &
  PaginationOptions & {
    size?: PaginationSize | undefined
    children?: ReactNode | ((snapshot: PaginationSnapshot) => ReactNode)
  }

export function PaginationRoot({
  total,
  page,
  defaultPage,
  pageSize,
  defaultPageSize,
  siblingCount,
  boundaryCount,
  disabled,
  labels,
  onChange,
  size = 'md',
  className,
  children,
  ...props
}: PaginationRootProps) {
  const pagination = usePagination({
    total,
    page,
    defaultPage,
    pageSize,
    defaultPageSize,
    siblingCount,
    boundaryCount,
    disabled,
    labels,
    onChange,
  })
  return (
    <PaginationContext value={{ ...pagination, size }}>
      <nav
        {...props}
        aria-label={props['aria-label'] ?? pagination.snapshot.labels.navigation}
        data-slot="pagination-root"
        data-size={size}
        data-page-count={pagination.snapshot.pageCount}
        data-disabled={pagination.snapshot.disabled || undefined}
        className={cn(paginationRootClassName({ size: size }), className)}
      >
        {typeof children === 'function' ? children(pagination.snapshot) : children}
      </nav>
    </PaginationContext>
  )
}
