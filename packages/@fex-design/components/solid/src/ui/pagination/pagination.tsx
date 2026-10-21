import type { PaginationClassNames, PaginationStyles } from '@fex-design/core/pagination/types'
import { mergeStyle } from '@fex-design/solid/primitives/merge-style'
import { For, Show, splitProps, type JSX } from 'solid-js'
import { cn } from '@fex-design/utils'
import {
  paginationTotalClassName,
  paginationSimpleClassName,
  paginationJumperGroupClassName,
  paginationHideOnSinglePageClassName,
} from '@fex-design/components-styles/pagination'
import {
  PaginationRoot,
  PaginationContent,
  PaginationPageButton,
  PaginationNavigationButton,
  PaginationEllipsis,
  PaginationPageSizeSelect,
  PaginationQuickJumper,
  type PaginationRootProps,
  type PaginationSnapshot,
  type PaginationPageSizeSelectProps,
  type PaginationQuickJumperProps,
} from '@fex-design/solid/primitive/pagination'

export type PaginationProps = Omit<PaginationRootProps, 'children'> & {
  classNames?: PaginationClassNames
  styles?: PaginationStyles<JSX.CSSProperties | string>
  showTotal?: boolean | ((snapshot: PaginationSnapshot) => JSX.Element)
  showSizeChanger?: boolean
  pageSizeOptions?: readonly number[]
  showQuickJumper?: boolean
  simple?: boolean
  hideOnSinglePage?: boolean
  pageRender?: (page: number, current: boolean) => JSX.Element
  previous?: JSX.Element
  next?: JSX.Element
  ellipsis?: JSX.Element
  pageSizeSelectProps?: Pick<
    PaginationPageSizeSelectProps,
    | 'class'
    | 'style'
    | 'disabled'
    | 'inputProps'
    | 'selectRootProps'
    | 'selectTriggerProps'
    | 'selectContentProps'
  >
  quickJumperProps?: Pick<
    PaginationQuickJumperProps,
    | 'class'
    | 'style'
    | 'disabled'
    | 'inputProps'
    | 'inputNumberProps'
    | 'inputActionsProps'
    | 'incrementProps'
    | 'decrementProps'
  >
}

export function Pagination(props: PaginationProps) {
  const [local, rest] = splitProps(props, [
    'showTotal',
    'showSizeChanger',
    'pageSizeOptions',
    'showQuickJumper',
    'simple',
    'hideOnSinglePage',
    'pageRender',
    'previous',
    'next',
    'ellipsis',
    'pageSizeSelectProps',
    'quickJumperProps',
    'classNames',
    'styles',
    'style',
    'class',
  ])
  return (
    <PaginationRoot
      {...rest}
      class={cn(
        local.hideOnSinglePage && paginationHideOnSinglePageClassName,
        local.classNames?.root,
        local.class,
      )}
      style={mergeStyle(local.styles?.root, local.style)}
    >
      {(snapshot) => (
        <>
          <Show when={local.showTotal}>
            <span
              data-slot="pagination-total"
              class={cn(paginationTotalClassName, local.classNames?.total)}
              style={local.styles?.total}
            >
              {typeof local.showTotal === 'function'
                ? local.showTotal(snapshot())
                : snapshot().labels.total(snapshot().total)}
            </span>
          </Show>
          <PaginationContent class={local.classNames?.content} style={local.styles?.content}>
            <PaginationNavigationButton
              class={local.classNames?.navigationButton}
              style={local.styles?.navigationButton}
              direction="prev"
            >
              {local.previous}
            </PaginationNavigationButton>
            <Show
              when={local.simple}
              fallback={
                <For each={snapshot().pages}>
                  {(item) => (
                    <Show
                      when={item.type === 'page' ? item : undefined}
                      keyed
                      fallback={
                        <PaginationEllipsis
                          class={local.classNames?.ellipsis}
                          style={local.styles?.ellipsis}
                        >
                          {local.ellipsis}
                        </PaginationEllipsis>
                      }
                    >
                      {(pageItem) => (
                        <PaginationPageButton
                          class={local.classNames?.pageButton}
                          style={local.styles?.pageButton}
                          page={pageItem.page}
                        >
                          {local.pageRender?.(pageItem.page, pageItem.page === snapshot().page)}
                        </PaginationPageButton>
                      )}
                    </Show>
                  )}
                </For>
              }
            >
              <span
                data-slot="pagination-simple"
                class={cn(paginationSimpleClassName, local.classNames?.simple)}
                style={local.styles?.simple}
              >
                {snapshot().pageCount === 0 ? 0 : snapshot().page} / {snapshot().pageCount}
              </span>
            </Show>
            <PaginationNavigationButton
              class={local.classNames?.navigationButton}
              style={local.styles?.navigationButton}
              direction="next"
            >
              {local.next}
            </PaginationNavigationButton>
          </PaginationContent>
          <Show when={local.showSizeChanger}>
            <PaginationPageSizeSelect
              {...local.pageSizeSelectProps}
              class={cn(local.classNames?.pageSizeSelect, local.pageSizeSelectProps?.class)}
              style={mergeStyle(local.styles?.pageSizeSelect, local.pageSizeSelectProps?.style)}
              options={local.pageSizeOptions}
            />
          </Show>
          <Show when={local.showQuickJumper}>
            <div
              data-slot="pagination-jumper"
              class={cn(paginationJumperGroupClassName, local.classNames?.jumper)}
              style={local.styles?.jumper}
            >
              <span>{snapshot().labels.jumpPrefix}</span>
              <PaginationQuickJumper
                {...local.quickJumperProps}
                class={cn(local.classNames?.quickJumper, local.quickJumperProps?.class)}
                style={mergeStyle(local.styles?.quickJumper, local.quickJumperProps?.style)}
              />
              <span>{snapshot().labels.jumpSuffix}</span>
            </div>
          </Show>
        </>
      )}
    </PaginationRoot>
  )
}
