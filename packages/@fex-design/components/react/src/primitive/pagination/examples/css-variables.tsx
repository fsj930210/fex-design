import {
  PaginationRoot,
  PaginationContent,
  PaginationPageButton,
  PaginationNavigationButton,
  PaginationEllipsis,
  PaginationPageSizeSelect,
  PaginationQuickJumper,
} from '@fex-design/react/primitive/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'
import {
  paginationTotalClassName,
  paginationJumperGroupClassName,
} from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'

export default function PaginationCssVariablesExample() {
  return (
    <div className="grid w-full gap-space-lg">
      <PaginationRoot
        total={200}
        labels={paginationDemoLabels}
        defaultPage={8}
        className={cn(
          '[--pagination-control-height:38px] [--pagination-font-size:14px] [--pagination-gap:12px] [--pagination-item-gap:6px] [--pagination-radius:12px] [--pagination-color:#5b21b6] [--pagination-active-background:#ede9fe] [--pagination-active-color:#6d28d9] [--pagination-active-border-color:#8b5cf6] [--pagination-hover-background:#f5f3ff]',
        )}
      >
        {(snapshot) => (
          <>
            <span data-slot="pagination-total" className={paginationTotalClassName}>
              {snapshot.labels.total(snapshot.total)}
            </span>
            <PaginationContent>
              <PaginationNavigationButton direction="prev" />
              {snapshot.pages.map((item) =>
                item.type === 'page' ? (
                  <PaginationPageButton key={item.key} page={item.page} />
                ) : (
                  <PaginationEllipsis key={item.key} />
                ),
              )}
              <PaginationNavigationButton direction="next" />
            </PaginationContent>
            <PaginationPageSizeSelect
              selectTriggerProps={{
                className:
                  '[--input-border-color:#c4b5fd] [--input-background:#ffffff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]',
              }}
              selectContentProps={{
                className:
                  '[--border:#c4b5fd] [--elevated-background:#ffffff] [--elevated-foreground:#6d28d9] [--primary:#6d28d9] [--muted-background:#f5f3ff]',
              }}
            />
            <div data-slot="pagination-jumper" className={paginationJumperGroupClassName}>
              <span>{snapshot.labels.jumpPrefix}</span>
              <PaginationQuickJumper
                inputNumberProps={{
                  className:
                    '[--input-border-color:#c4b5fd] [--input-background:#ffffff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]',
                }}
                incrementProps={{ className: 'text-purple-700' }}
                decrementProps={{ className: 'text-purple-700' }}
              />
              <span>{snapshot.labels.jumpSuffix}</span>
            </div>
          </>
        )}
      </PaginationRoot>
    </div>
  )
}
