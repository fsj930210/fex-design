import { Show, splitProps, type JSX } from 'solid-js'
import type { PaginationDirection } from '@fex-design/core/pagination/types'
import { callEventHandler } from '@fex-design/solid/primitives/call-event-handler'
import { ChevronLeftIcon, ChevronRightIcon } from '@fex-design/solid/icons/chevron'
import { paginationButtonClassName } from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'
import { usePaginationContext } from './context'

export type PaginationNavigationButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
  direction: PaginationDirection
}
export function PaginationNavigationButton(props: PaginationNavigationButtonProps) {
  const [local, rest] = splitProps(props, ['direction', 'disabled', 'class', 'children', 'onClick'])
  const { controller, snapshot, size } = usePaginationContext()
  const blocked = () =>
    local.disabled || !(local.direction === 'prev' ? snapshot().canPrevious : snapshot().canNext)
  return (
    <button
      {...rest}
      type={rest.type ?? 'button'}
      disabled={blocked()}
      aria-label={
        rest['aria-label'] ??
        (local.direction === 'prev' ? snapshot().labels.previous : snapshot().labels.next)
      }
      data-slot="pagination-navigation-button"
      data-direction={local.direction}
      class={cn(paginationButtonClassName({ size: size() }), local.class)}
      onClick={(event) => {
        callEventHandler(local.onClick, event)
        if (!event.defaultPrevented && !blocked()) {
          if (local.direction === 'prev') controller.previousPage()
          else controller.nextPage()
        }
      }}
    >
      {local.children ?? (
        <Show
          when={local.direction === 'prev'}
          fallback={<ChevronRightIcon class="rtl:rotate-180" />}
        >
          <ChevronLeftIcon class="rtl:rotate-180" />
        </Show>
      )}
    </button>
  )
}
