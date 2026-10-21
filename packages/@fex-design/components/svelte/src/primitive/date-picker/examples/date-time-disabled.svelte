<script lang="ts">
  import {
    DatePickerRoot,
    DatePickerTrigger,
    DatePickerContent,
    DatePickerPanel,
    DatePickerFooter,
    RangePickerRoot,
    RangePickerTrigger,
    RangePickerContent,
    RangePickerPanelGroup,
    createDatePickerDateTime,
  } from "@fex-design/svelte/primitive/date-picker";
  import type { DatePickerDisabledTime } from "@fex-design/svelte/primitive/date-picker";
  const initial = createDatePickerDateTime(2026, 10, 15, 9, 30, 0);
  const end = createDatePickerDateTime(2026, 10, 15, 17, 45, 0);
  const disabledTime: DatePickerDisabledTime = (date, info) => ({
    disabledHours: () =>
      date.day === 15
        ? Array.from(
            { length: info.activePart === "end" ? 17 : 9 },
            (_, hour) => hour,
          )
        : [],
  });
</script>

<div class="flex w-full min-w-0 flex-col gap-6">
  <section class="flex w-full min-w-0 flex-col gap-2">
    <p class="text-sm font-medium">日期时间：确认后提交</p>
    <DatePickerRoot showTime defaultValue={initial} {disabledTime}>
      <DatePickerTrigger />
      <DatePickerContent
        ><DatePickerPanel /><DatePickerFooter /></DatePickerContent
      >
    </DatePickerRoot>
  </section>
  <section class="flex w-full min-w-0 flex-col gap-2">
    <p class="text-sm font-medium">日期时间范围：分别确认开始和结束</p>
    <RangePickerRoot
      showTime
      defaultValue={{ start: initial, end }}
      {disabledTime}
    >
      <RangePickerTrigger />
      <RangePickerContent
        ><RangePickerPanelGroup /><DatePickerFooter /></RangePickerContent
      >
    </RangePickerRoot>
  </section>
</div>
