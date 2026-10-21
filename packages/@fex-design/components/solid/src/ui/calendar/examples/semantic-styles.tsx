import { Calendar } from '@fex-design/solid/ui/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
export function SemanticStylesExample() {
  return (
    <Calendar
      headerProps={{
        yearSelectTriggerProps: { class: 'border-violet-300 bg-white text-violet-800 rounded-md' },
        monthSelectTriggerProps: { class: 'border-violet-300 bg-white text-violet-800 rounded-md' },
        yearSelectContentProps: {
          class:
            'border-violet-300 bg-white text-violet-800 [--primary:#6d28d9] [--muted-background:#f5f3ff]',
        },
        monthSelectContentProps: {
          class:
            'border-violet-300 bg-white text-violet-800 [--primary:#6d28d9] [--muted-background:#f5f3ff]',
        },
      }}
      defaultValue={calendarDemoDate}
      defaultViewDate={calendarDemoDate}
      classNames={{
        header: 'bg-muted-background',
        cell: 'bg-muted-background/20 data-[today=true]:!bg-success/20 data-[selected=true]:!bg-primary/20',
        cellContent: 'flex flex-col gap-1',
      }}
      styles={{ footer: { borderTop: '2px solid var(--primary)' } }}
      footerRender={() => <span>语义区域样式</span>}
    />
  )
}
