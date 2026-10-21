import type { ComponentProps } from 'react'
import type { PaginationDirection } from '@fex-design/core/pagination/types'
import { ChevronLeftIcon, ChevronRightIcon } from '@fex-design/react/icons/chevron'
import { paginationButtonClassName } from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'
import { usePaginationContext } from './context'

export type PaginationNavigationButtonProps = ComponentProps<'button'> & {
  direction: PaginationDirection
}
export function PaginationNavigationButton({
  direction,
  disabled,
  className,
  children,
  onClick,
  ...props
}: PaginationNavigationButtonProps) {
  const { controller, snapshot, size } = usePaginationContext()
  const blocked = disabled || !(direction === 'prev' ? snapshot.canPrevious : snapshot.canNext)
  return (
    <button
      {...props}
      type={props.type ?? 'button'}
      disabled={blocked}
      aria-label={
        props['aria-label'] ??
        (direction === 'prev' ? snapshot.labels.previous : snapshot.labels.next)
      }
      data-slot="pagination-navigation-button"
      data-direction={direction}
      className={cn(paginationButtonClassName({ size: size }), className)}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented && !blocked) {
          if (direction === 'prev') controller.previousPage()
          else controller.nextPage()
        }
      }}
    >
      {children ??
        (direction === 'prev' ? (
          <ChevronLeftIcon className="rtl:rotate-180" />
        ) : (
          <ChevronRightIcon className="rtl:rotate-180" />
        ))}
    </button>
  )
}
