import type { PaginationClassNames, PaginationStyles } from '@fex-design/core/pagination/types'
import type { CSSProperties, ReactNode } from 'react'
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
} from '@fex-design/react/primitive/pagination'

export type PaginationProps = Omit<PaginationRootProps, 'children'> & {
  classNames?: PaginationClassNames
  styles?: PaginationStyles<CSSProperties>
  showTotal?: boolean | ((snapshot: PaginationSnapshot) => ReactNode)
  showSizeChanger?: boolean
  pageSizeOptions?: readonly number[]
  showQuickJumper?: boolean
  simple?: boolean
  hideOnSinglePage?: boolean
  pageRender?: (page: number, current: boolean) => ReactNode
  previous?: ReactNode
  next?: ReactNode
  ellipsis?: ReactNode
  pageSizeSelectProps?: Pick<
    PaginationPageSizeSelectProps,
    | 'className'
    | 'style'
    | 'disabled'
    | 'inputProps'
    | 'selectRootProps'
    | 'selectTriggerProps'
    | 'selectContentProps'
  >
  quickJumperProps?: Pick<
    PaginationQuickJumperProps,
    | 'className'
    | 'style'
    | 'disabled'
    | 'inputProps'
    | 'inputNumberProps'
    | 'inputActionsProps'
    | 'incrementProps'
    | 'decrementProps'
  >
}

export function Pagination({
  showTotal = false,
  showSizeChanger = false,
  pageSizeOptions,
  showQuickJumper = false,
  simple = false,
  hideOnSinglePage = false,
  pageRender,
  previous,
  next,
  ellipsis,
  pageSizeSelectProps,
  quickJumperProps,
  classNames,
  styles,
  style,
  className,
  ...props
}: PaginationProps) {
  return (
    <PaginationRoot
      {...props}
      className={cn(
        hideOnSinglePage && paginationHideOnSinglePageClassName,
        classNames?.root,
        className,
      )}
      style={{ ...styles?.root, ...style }}
    >
      {(snapshot) => (
        <>
          {showTotal && (
            <span
              data-slot="pagination-total"
              className={cn(paginationTotalClassName, classNames?.total)}
              style={styles?.total}
            >
              {typeof showTotal === 'function'
                ? showTotal(snapshot)
                : snapshot.labels.total(snapshot.total)}
            </span>
          )}
          <PaginationContent className={classNames?.content} style={styles?.content}>
            <PaginationNavigationButton
              className={classNames?.navigationButton}
              style={styles?.navigationButton}
              direction="prev"
            >
              {previous}
            </PaginationNavigationButton>
            {simple ? (
              <span
                data-slot="pagination-simple"
                className={cn(paginationSimpleClassName, classNames?.simple)}
                style={styles?.simple}
              >
                {snapshot.pageCount === 0 ? 0 : snapshot.page} / {snapshot.pageCount}
              </span>
            ) : (
              snapshot.pages.map((item) =>
                item.type === 'page' ? (
                  <PaginationPageButton
                    className={classNames?.pageButton}
                    style={styles?.pageButton}
                    key={item.key}
                    page={item.page}
                  >
                    {pageRender?.(item.page, item.page === snapshot.page)}
                  </PaginationPageButton>
                ) : (
                  <PaginationEllipsis
                    className={classNames?.ellipsis}
                    style={styles?.ellipsis}
                    key={item.key}
                  >
                    {ellipsis}
                  </PaginationEllipsis>
                ),
              )
            )}
            <PaginationNavigationButton
              className={classNames?.navigationButton}
              style={styles?.navigationButton}
              direction="next"
            >
              {next}
            </PaginationNavigationButton>
          </PaginationContent>
          {showSizeChanger && (
            <PaginationPageSizeSelect
              {...pageSizeSelectProps}
              className={cn(classNames?.pageSizeSelect, pageSizeSelectProps?.className)}
              style={{ ...styles?.pageSizeSelect, ...pageSizeSelectProps?.style }}
              options={pageSizeOptions}
            />
          )}
          {showQuickJumper && (
            <div
              data-slot="pagination-jumper"
              className={cn(paginationJumperGroupClassName, classNames?.jumper)}
              style={styles?.jumper}
            >
              <span>{snapshot.labels.jumpPrefix}</span>
              <PaginationQuickJumper
                {...quickJumperProps}
                className={cn(classNames?.quickJumper, quickJumperProps?.className)}
                style={{ ...styles?.quickJumper, ...quickJumperProps?.style }}
              />
              <span>{snapshot.labels.jumpSuffix}</span>
            </div>
          )}
        </>
      )}
    </PaginationRoot>
  )
}
