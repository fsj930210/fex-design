import { paginationRootClassName } from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'
import type { Accessor, JSX } from 'solid-js'
import { splitProps } from 'solid-js'
import type {
  PaginationOptions,
  PaginationSnapshot,
  PaginationSize,
} from '@fex-design/core/pagination/types'
import { usePagination } from './use-pagination'
import { PaginationContext } from './context'

export type PaginationRootProps = Omit<JSX.HTMLAttributes<HTMLElement>, 'onChange' | 'children'> &
  PaginationOptions & {
    size?: PaginationSize | undefined
    children?: JSX.Element | ((snapshot: Accessor<PaginationSnapshot>) => JSX.Element)
  }
export function PaginationRoot(props: PaginationRootProps) {
  const [local, rest] = splitProps(props, [
    'total',
    'page',
    'defaultPage',
    'pageSize',
    'defaultPageSize',
    'siblingCount',
    'boundaryCount',
    'disabled',
    'labels',
    'onChange',
    'class',
    'size',
    'children',
  ])
  const pagination = usePagination(() => ({
    total: local.total,
    page: local.page,
    defaultPage: local.defaultPage,
    pageSize: local.pageSize,
    defaultPageSize: local.defaultPageSize,
    siblingCount: local.siblingCount,
    boundaryCount: local.boundaryCount,
    disabled: local.disabled,
    labels: local.labels,
    onChange: local.onChange,
  }))
  return (
    <PaginationContext.Provider value={{ ...pagination, size: () => local.size ?? 'md' }}>
      <nav
        {...rest}
        aria-label={rest['aria-label'] ?? pagination.snapshot().labels.navigation}
        data-slot="pagination-root"
        data-size={local.size ?? 'md'}
        data-page-count={pagination.snapshot().pageCount}
        data-disabled={pagination.snapshot().disabled || undefined}
        class={cn(paginationRootClassName({ size: local.size ?? 'md' }), local.class)}
      >
        {typeof local.children === 'function'
          ? local.children(pagination.snapshot)
          : local.children}
      </nav>
    </PaginationContext.Provider>
  )
}
