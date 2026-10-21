import {
  PaginationRoot,
  PaginationContent,
  PaginationPageButton,
  PaginationNavigationButton,
  PaginationEllipsis,
  PaginationPageSizeSelect,
  PaginationQuickJumper,
} from '@fex-design/react/primitive/pagination'
import {
  paginationDemoLabels,
  paginationDemoClassNames,
} from '@fex-design/docs-shared/pagination-demo'
import {
  paginationTotalClassName,
  paginationSimpleClassName,
  paginationJumperGroupClassName,
} from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'
const classNames = paginationDemoClassNames
const styles = {
  root: { backgroundColor: '#faf5ff' },
  total: { color: '#6d28d9' },
  content: { columnGap: '6px' },
  pageButton: { borderColor: '#c4b5fd' },
  navigationButton: { color: '#6d28d9' },
  ellipsis: { color: '#8b5cf6' },
  simple: { color: '#6d28d9' },
  pageSizeSelect: { minWidth: '128px' },
  jumper: { color: '#6d28d9' },
  quickJumper: { width: '96px' },
}
const pageSizeProps = {
  selectTriggerProps: {
    style: {
      borderColor: '#c4b5fd',
      color: '#6d28d9',
      backgroundColor: '#ffffff',
      borderRadius: '6px',
      '--focus-border': '#8b5cf6',
      '--input-ring-width': '1px',
      '--input-ring-color': '#ddd6fe',
    },
  },
  selectContentProps: {
    style: {
      borderColor: '#c4b5fd',
      color: '#6d28d9',
      backgroundColor: '#ffffff',
      borderRadius: '6px',
      '--focus-border': '#8b5cf6',
      '--input-ring-width': '1px',
      '--input-ring-color': '#ddd6fe',
      '--primary': '#6d28d9',
      '--muted-background': '#f5f3ff',
    },
  },
}
const jumperProps = {
  inputNumberProps: {
    style: {
      borderColor: '#c4b5fd',
      color: '#6d28d9',
      backgroundColor: '#ffffff',
      borderRadius: '6px',
      '--focus-border': '#8b5cf6',
      '--input-ring-width': '1px',
      '--input-ring-color': '#ddd6fe',
    },
  },
  inputProps: { style: { color: '#6d28d9' } },
  incrementProps: { style: { color: '#6d28d9' } },
  decrementProps: { style: { color: '#6d28d9' } },
}
export function PaginationSemanticStylesExample() {
  return (
    <div className="grid w-full gap-space-lg">
      {[false, true].map((simple) => (
        <div key={String(simple)} className="contents">
          <PaginationRoot
            total={200}
            defaultPage={8}
            labels={paginationDemoLabels}
            className={classNames.root}
            style={styles.root}
          >
            {(snapshot) => (
              <>
                <span
                  data-slot="pagination-total"
                  className={cn(paginationTotalClassName, classNames.total)}
                  style={styles.total}
                >
                  {snapshot.labels.total(snapshot.total)}
                </span>
                <PaginationContent className={classNames.content} style={styles.content}>
                  <PaginationNavigationButton
                    direction="prev"
                    className={classNames.navigationButton}
                    style={styles.navigationButton}
                  />
                  {simple ? (
                    <span
                      data-slot="pagination-simple"
                      className={cn(paginationSimpleClassName, classNames.simple)}
                      style={styles.simple}
                    >
                      {snapshot.page} / {snapshot.pageCount}
                    </span>
                  ) : (
                    snapshot.pages.map((item) =>
                      item.type === 'page' ? (
                        <PaginationPageButton
                          key={item.key}
                          page={item.page}
                          className={classNames.pageButton}
                          style={styles.pageButton}
                        />
                      ) : (
                        <PaginationEllipsis
                          key={item.key}
                          className={classNames.ellipsis}
                          style={styles.ellipsis}
                        />
                      ),
                    )
                  )}
                  <PaginationNavigationButton
                    direction="next"
                    className={classNames.navigationButton}
                    style={styles.navigationButton}
                  />
                </PaginationContent>
                <PaginationPageSizeSelect
                  {...pageSizeProps}
                  className={classNames.pageSizeSelect}
                  style={styles.pageSizeSelect}
                />
                <div
                  data-slot="pagination-jumper"
                  className={cn(paginationJumperGroupClassName, classNames.jumper)}
                  style={styles.jumper}
                >
                  <span>{snapshot.labels.jumpPrefix}</span>
                  <PaginationQuickJumper
                    {...jumperProps}
                    className={classNames.quickJumper}
                    style={styles.quickJumper}
                  />
                  <span>{snapshot.labels.jumpSuffix}</span>
                </div>
              </>
            )}
          </PaginationRoot>
        </div>
      ))}
    </div>
  )
}
