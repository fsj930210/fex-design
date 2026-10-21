import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@fex-design/react/primitive/empty'

export function EmptyCssVariablesExample() {
  return (
    <Empty className="[--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]">
      <EmptyHeader className="[--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]">
        <EmptyMedia className="[--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <rect width="48" height="48" rx="12" fill="currentColor" opacity="0.1" />
            <path
              d="M14 19.5h8l2.5 3H34v10.5a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2V19.5Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M20 28h8" stroke="currentColor" strokeWidth="2" />
          </svg>
        </EmptyMedia>
        <EmptyTitle className="[--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]">
          暂无数据
        </EmptyTitle>
        <EmptyDescription className="[--primary:#7c3aed] [--border:#c4b5fd] [--muted-background:#ede9fe] [--foreground:#6d28d9] [--muted-foreground:#8b5cf6]">
          当前没有可展示的数据。
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
