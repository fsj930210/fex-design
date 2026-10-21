import { Pagination } from '@fex-design/react/ui/pagination'
import { paginationDemoLabels } from '@fex-design/docs-shared/pagination-demo'

export default function PaginationCssVariablesExample() {
  return (
    <div className="grid w-full gap-space-lg">
      <Pagination
        pageSizeSelectProps={{
          selectTriggerProps: {
            className:
              '[--input-border-color:#c4b5fd] [--input-background:#ffffff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]',
          },
          selectContentProps: {
            className:
              '[--border:#c4b5fd] [--elevated-background:#ffffff] [--elevated-foreground:#6d28d9] [--primary:#6d28d9] [--muted-background:#f5f3ff]',
          },
        }}
        quickJumperProps={{
          inputNumberProps: {
            className:
              '[--input-border-color:#c4b5fd] [--input-background:#ffffff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]',
          },
          incrementProps: { className: 'text-purple-700' },
          decrementProps: { className: 'text-purple-700' },
        }}
        total={200}
        labels={paginationDemoLabels}
        defaultPage={8}
        showTotal
        showSizeChanger
        showQuickJumper
        className="[--pagination-control-height:38px] [--pagination-font-size:14px] [--pagination-gap:12px] [--pagination-item-gap:6px] [--pagination-radius:12px] [--pagination-color:#5b21b6] [--pagination-active-background:#ede9fe] [--pagination-active-color:#6d28d9] [--pagination-active-border-color:#8b5cf6] [--pagination-hover-background:#f5f3ff]"
      />
    </div>
  )
}
