import type { ComponentProps } from 'react'
import { paginationButtonClassName } from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'
import { usePaginationContext } from './context'

export type PaginationPageButtonProps = ComponentProps<'button'> & { page: number }
export function PaginationPageButton({
  page,
  disabled,
  className,
  children,
  onClick,
  ...props
}: PaginationPageButtonProps) {
  const { controller, snapshot, size } = usePaginationContext()
  const blocked =
    disabled ||
    snapshot.disabled ||
    !Number.isInteger(page) ||
    page < 1 ||
    page > snapshot.pageCount
  return (
    <button
      {...props}
      type={props.type ?? 'button'}
      disabled={blocked}
      aria-label={props['aria-label'] ?? snapshot.labels.page(page)}
      aria-current={page === snapshot.page ? 'page' : undefined}
      data-slot="pagination-page-button"
      data-active={page === snapshot.page || undefined}
      className={cn(paginationButtonClassName({ size: size }), className)}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented && !blocked) controller.setPage(page)
      }}
    >
      {children ?? page}
    </button>
  )
}
