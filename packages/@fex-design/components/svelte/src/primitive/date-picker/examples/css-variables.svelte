<script lang="ts">
  import {
    DatePickerRoot,
    DatePickerTrigger,
    DatePickerContent,
    DatePickerPanel,
    DatePickerFooter,
  } from "@fex-design/svelte/primitive/date-picker";
</script>

<div class="flex w-full min-w-0 flex-col items-stretch gap-4">
  <DatePickerRoot>
    <DatePickerTrigger
      class="w-full min-w-0 [--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe] [--popover-background:#faf5ff] [--popover-foreground:#6d28d9] [--calendar-selected-background:#7c3aed] [--calendar-selected-foreground:#ffffff] [--calendar-hover-background:#ede9fe]"
      placeholder="请选择日期"
    ></DatePickerTrigger>
    <DatePickerContent
      class="[--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe] [--popover-background:#faf5ff] [--popover-foreground:#6d28d9] [--calendar-selected-background:#7c3aed] [--calendar-selected-foreground:#ffffff] [--calendar-hover-background:#ede9fe]"
    >
      <DatePickerPanel
        class="[--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe] [--popover-background:#faf5ff] [--popover-foreground:#6d28d9] [--calendar-selected-background:#7c3aed] [--calendar-selected-foreground:#ffffff] [--calendar-hover-background:#ede9fe]"
      />
      <DatePickerFooter
        class="[--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe] [--popover-background:#faf5ff] [--popover-foreground:#6d28d9] [--calendar-selected-background:#7c3aed] [--calendar-selected-foreground:#ffffff] [--calendar-hover-background:#ede9fe]"
      ></DatePickerFooter>
    </DatePickerContent>
  </DatePickerRoot>
  <DatePickerRoot multiple>
    <DatePickerTrigger
      class="w-full min-w-0 [--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe] [--popover-background:#faf5ff] [--popover-foreground:#6d28d9] [--calendar-selected-background:#7c3aed] [--calendar-selected-foreground:#ffffff] [--calendar-hover-background:#ede9fe]"
    ></DatePickerTrigger>
    <DatePickerContent
      class="[--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe] [--popover-background:#faf5ff] [--popover-foreground:#6d28d9] [--calendar-selected-background:#7c3aed] [--calendar-selected-foreground:#ffffff] [--calendar-hover-background:#ede9fe]"
    >
      <DatePickerPanel
        class="[--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe] [--popover-background:#faf5ff] [--popover-foreground:#6d28d9] [--calendar-selected-background:#7c3aed] [--calendar-selected-foreground:#ffffff] [--calendar-hover-background:#ede9fe]"
      />
      <DatePickerFooter
        class="[--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe] [--popover-background:#faf5ff] [--popover-foreground:#6d28d9] [--calendar-selected-background:#7c3aed] [--calendar-selected-foreground:#ffffff] [--calendar-hover-background:#ede9fe]"
      ></DatePickerFooter>
    </DatePickerContent>
  </DatePickerRoot>
</div>
