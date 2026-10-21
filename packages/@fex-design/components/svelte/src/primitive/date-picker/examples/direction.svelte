<script lang="ts">
  import {
    DatePickerRoot,
    DatePickerTrigger,
    DatePickerContent,
    DatePickerPanel,
    RangePickerRoot,
    RangePickerTrigger,
    RangePickerContent,
    RangePickerPanelGroup,
    DatePickerFooter,
  } from "@fex-design/svelte/primitive/date-picker";
  import { createCalendarDate } from "@fex-design/core/calendar/temporal";
  const date = createCalendarDate(2026, 10, 15);
  const range = { start: date, end: date.add({ days: 7 }) };
  const popupAppearance = {
    getPopupContainer: (reference: HTMLElement | null) =>
      reference?.closest<HTMLElement>("[dir]") ?? document.body,
  };
</script>

<div class="flex w-full min-w-0 flex-col gap-6">
  <section class="flex w-full min-w-0 flex-col gap-2" dir="ltr">
    <p class="text-sm font-medium">LTR</p>
    <DatePickerRoot defaultValue={date} popoverProps={popupAppearance}>
      <DatePickerTrigger />
      <DatePickerContent>
        <DatePickerPanel />
        <DatePickerFooter />
      </DatePickerContent>
    </DatePickerRoot>
    <RangePickerRoot defaultValue={range} popoverProps={popupAppearance}>
      <RangePickerTrigger />
      <RangePickerContent>
        <RangePickerPanelGroup />
        <DatePickerFooter />
      </RangePickerContent>
    </RangePickerRoot>
  </section>
  <section class="flex w-full min-w-0 flex-col gap-2" dir="rtl">
    <p class="text-sm font-medium">RTL</p>
    <DatePickerRoot defaultValue={date} popoverProps={popupAppearance}>
      <DatePickerTrigger />
      <DatePickerContent>
        <DatePickerPanel />
        <DatePickerFooter />
      </DatePickerContent>
    </DatePickerRoot>
    <RangePickerRoot defaultValue={range} popoverProps={popupAppearance}>
      <RangePickerTrigger />
      <RangePickerContent>
        <RangePickerPanelGroup />
        <DatePickerFooter />
      </RangePickerContent>
    </RangePickerRoot>
  </section>
</div>
