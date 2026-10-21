import { splitProps, type JSX } from 'solid-js'
import { callEventHandler } from '@fex-design/solid/primitives/call-event-handler'
import { paginationButtonClassName } from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'
import { usePaginationContext } from './context'

export type PaginationPageButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  page: number
}
export function PaginationPageButton(props: PaginationPageButtonProps) {
  const [local, rest] = splitProps(props, ['page', 'disabled', 'class', 'children', 'onClick'])
  const { controller, snapshot, size } = usePaginationContext()
  const blocked = () =>
    local.disabled ||
    snapshot().disabled ||
    !Number.isInteger(local.page) ||
    local.page < 1 ||
    local.page > snapshot().pageCount
  return (
    <button
      {...rest}
      type={rest.type ?? 'button'}
      disabled={blocked()}
      aria-label={rest['aria-label'] ?? snapshot().labels.page(local.page)}
      aria-current={local.page === snapshot().page ? 'page' : undefined}
      data-slot="pagination-page-button"
      data-active={local.page === snapshot().page || undefined}
      class={cn(paginationButtonClassName({ size: size() }), local.class)}
      onClick={(event) => {
        callEventHandler(local.onClick, event)
        if (!event.defaultPrevented && !blocked()) controller.setPage(local.page)
      }}
    >
      {local.children ?? local.page}
    </button>
  )
}
