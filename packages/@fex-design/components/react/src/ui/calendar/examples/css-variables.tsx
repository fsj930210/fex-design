import type { CSSProperties } from 'react'
import { Calendar } from '@fex-design/react/ui/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
export function CssVariablesExample() {
  return (
    <div
      style={
        {
          '--calendar-hover-background': 'var(--success)',
          '--calendar-selected-background': 'var(--primary)',
          '--calendar-selected-foreground': 'var(--primary-foreground)',
          '--calendar-today-color': 'var(--danger)',
        } as CSSProperties
      }
    >
      <Calendar
        headerProps={{
          yearSelectTriggerProps: {
            className:
              '[--input-border-color:#c4b5fd] [--input-background:#ffffff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]',
          },
          monthSelectTriggerProps: {
            className:
              '[--input-border-color:#c4b5fd] [--input-background:#ffffff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]',
          },
          yearSelectContentProps: {
            className:
              '[--border:#c4b5fd] [--elevated-background:#ffffff] [--elevated-foreground:#6d28d9] [--primary:#6d28d9] [--muted-background:#f5f3ff]',
          },
          monthSelectContentProps: {
            className:
              '[--border:#c4b5fd] [--elevated-background:#ffffff] [--elevated-foreground:#6d28d9] [--primary:#6d28d9] [--muted-background:#f5f3ff]',
          },
        }}
        defaultViewDate={calendarDemoDate}
      />
    </div>
  )
}
