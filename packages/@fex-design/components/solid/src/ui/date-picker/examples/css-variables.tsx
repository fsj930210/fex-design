import { DatePicker } from '@fex-design/solid/ui/date-picker'

export function DatePickerCssVariablesExample() {
  return (
    <div class="flex w-full min-w-0 flex-col items-stretch gap-4">
      <DatePicker
        inputProps={{
          classNames: {
            root: '[--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]',
          },
        }}
        calendarProps={{
          classNames: {
            header:
              '[--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]',
          },
        }}
        popoverProps={{
          classNames: {
            root: '[--popover-background:#faf5ff] [--popover-foreground:#6d28d9] [--calendar-selected-background:#7c3aed] [--calendar-selected-foreground:#ffffff] [--calendar-hover-background:#ede9fe]',
          },
        }}
        class="w-full min-w-0 [--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe] [--popover-background:#faf5ff] [--popover-foreground:#6d28d9] [--calendar-selected-background:#7c3aed] [--calendar-selected-foreground:#ffffff] [--calendar-hover-background:#ede9fe]"
        placeholder="请选择日期"
      />
      <DatePicker
        inputProps={{
          classNames: {
            root: '[--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]',
          },
        }}
        calendarProps={{
          classNames: {
            header:
              '[--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]',
          },
        }}
        popoverProps={{
          classNames: {
            root: '[--popover-background:#faf5ff] [--popover-foreground:#6d28d9] [--calendar-selected-background:#7c3aed] [--calendar-selected-foreground:#ffffff] [--calendar-hover-background:#ede9fe]',
          },
        }}
        class="w-full min-w-0 [--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe] [--popover-background:#faf5ff] [--popover-foreground:#6d28d9] [--calendar-selected-background:#7c3aed] [--calendar-selected-foreground:#ffffff] [--calendar-hover-background:#ede9fe]"
        multiple
      />
    </div>
  )
}
