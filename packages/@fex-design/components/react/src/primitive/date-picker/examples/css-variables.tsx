import {
  DatePickerRoot,
  DatePickerTrigger,
  DatePickerContent,
  DatePickerPanel,
  DatePickerFooter,
} from '@fex-design/react/primitive/date-picker'
export function DatePickerCssVariablesExample() {
  return (
    <div className="flex w-full min-w-0 flex-col items-stretch gap-4">
      <DatePickerRoot>
        <DatePickerTrigger
          className="w-full min-w-0 [--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe] [--popover-background:#faf5ff] [--popover-foreground:#6d28d9] [--calendar-selected-background:#7c3aed] [--calendar-selected-foreground:#ffffff] [--calendar-hover-background:#ede9fe]"
          placeholder="请选择日期"
        />
        <DatePickerContent className="[--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe] [--popover-background:#faf5ff] [--popover-foreground:#6d28d9] [--calendar-selected-background:#7c3aed] [--calendar-selected-foreground:#ffffff] [--calendar-hover-background:#ede9fe]">
          <DatePickerPanel className="[--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe] [--popover-background:#faf5ff] [--popover-foreground:#6d28d9] [--calendar-selected-background:#7c3aed] [--calendar-selected-foreground:#ffffff] [--calendar-hover-background:#ede9fe]" />
          <DatePickerFooter className="[--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe] [--popover-background:#faf5ff] [--popover-foreground:#6d28d9] [--calendar-selected-background:#7c3aed] [--calendar-selected-foreground:#ffffff] [--calendar-hover-background:#ede9fe]" />
        </DatePickerContent>
      </DatePickerRoot>
      <DatePickerRoot multiple>
        <DatePickerTrigger className="w-full min-w-0 [--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe] [--popover-background:#faf5ff] [--popover-foreground:#6d28d9] [--calendar-selected-background:#7c3aed] [--calendar-selected-foreground:#ffffff] [--calendar-hover-background:#ede9fe]" />
        <DatePickerContent className="[--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe] [--popover-background:#faf5ff] [--popover-foreground:#6d28d9] [--calendar-selected-background:#7c3aed] [--calendar-selected-foreground:#ffffff] [--calendar-hover-background:#ede9fe]">
          <DatePickerPanel className="[--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe] [--popover-background:#faf5ff] [--popover-foreground:#6d28d9] [--calendar-selected-background:#7c3aed] [--calendar-selected-foreground:#ffffff] [--calendar-hover-background:#ede9fe]" />
          <DatePickerFooter className="[--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe] [--popover-background:#faf5ff] [--popover-foreground:#6d28d9] [--calendar-selected-background:#7c3aed] [--calendar-selected-foreground:#ffffff] [--calendar-hover-background:#ede9fe]" />
        </DatePickerContent>
      </DatePickerRoot>
    </div>
  )
}
