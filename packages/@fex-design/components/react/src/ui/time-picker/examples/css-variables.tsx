import { TimePicker } from '@fex-design/react/ui/time-picker'

export function TimePickerCssVariablesExample() {
  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      <section className="flex flex-col gap-2 ">
        <p>默认</p>
        <TimePicker defaultValue={{ hour: 9, minute: 30, second: 0 }} />
      </section>
      <section className="flex flex-col gap-2 ">
        <p>紫色边框、聚焦光环与浅色背景</p>
        <TimePicker
          contentProps={{
            className:
              '[--border:#c4b5fd] [--elevated-background:#ffffff] [--elevated-foreground:#6d28d9] [--primary:#6d28d9] [--muted-background:#f5f3ff]',
          }}
          hourColumnProps={{
            columnProps: { scrollbarProps: { className: '[--scrollbar-thumb-color:#a78bfa]' } },
          }}
          defaultValue={{ hour: 9, minute: 30, second: 0 }}
          className="[--input-border-color:var(--color-purple-500)] [--focus-border:var(--color-purple-600)] [--input-ring-color:var(--color-purple-200)] [--input-background:var(--color-purple-50)] [--input-color:var(--color-purple-950)]"
        />
      </section>
    </div>
  )
}
