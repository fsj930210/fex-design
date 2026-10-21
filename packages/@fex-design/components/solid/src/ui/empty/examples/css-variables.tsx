import { Empty } from '@fex-design/solid/ui/empty'
export function EmptyCssVariablesExample() {
  return (
    <Empty
      class="[--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]"
      title="暂无数据"
      description="当前没有可展示的数据。"
    />
  )
}
