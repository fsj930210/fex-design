<script lang="ts">
  import {
    DatePickerRoot,
    DatePickerTrigger,
    DatePickerContent,
    DatePickerPanel,
    DatePickerFooter,
    createDatePickerDateTime,
  } from "@fex-design/svelte/primitive/date-picker";
  const initial = createDatePickerDateTime(2026, 10, 15, 9, 30, 0);
</script>

<div class="flex w-full min-w-0 flex-col gap-6">
  <section class="flex w-full min-w-0 flex-col gap-2">
    <p class="text-sm font-medium">YYYY-MM-DD HH:mm</p>
    <DatePickerRoot
      format="YYYY-MM-DD HH:mm"
      showTime={true}
      defaultValue={initial}
    >
      <DatePickerTrigger />
      <DatePickerContent
        ><DatePickerPanel /><DatePickerFooter /></DatePickerContent
      >
    </DatePickerRoot>
  </section>
  <section class="flex w-full min-w-0 flex-col gap-2">
    <p class="text-sm font-medium">YYYY-MM-DD HH:mm:ss</p>
    <DatePickerRoot
      format="YYYY-MM-DD HH:mm:ss"
      showTime={true}
      defaultValue={initial}
    >
      <DatePickerTrigger />
      <DatePickerContent
        ><DatePickerPanel /><DatePickerFooter /></DatePickerContent
      >
    </DatePickerRoot>
  </section>
  <section class="flex w-full min-w-0 flex-col gap-2">
    <p class="text-sm font-medium">YYYY-MM-DD hh:mm A</p>
    <DatePickerRoot
      format="YYYY-MM-DD hh:mm A"
      showTime={{ use12Hours: true, step: { minute: 5 } }}
      defaultValue={initial}
    >
      <DatePickerTrigger />
      <DatePickerContent
        ><DatePickerPanel /><DatePickerFooter /></DatePickerContent
      >
    </DatePickerRoot>
  </section>
  <section class="flex w-full min-w-0 flex-col gap-2">
    <p class="text-sm font-medium">选择日期时默认使用 08:30</p>
    <DatePickerRoot
      format="YYYY-MM-DD HH:mm"
      showTime={{
        format: "HH:mm",
        defaultOpenValue: { hour: 8, minute: 30, second: 0 },
      }}
    >
      <DatePickerTrigger />
      <DatePickerContent
        ><DatePickerPanel /><DatePickerFooter /></DatePickerContent
      >
    </DatePickerRoot>
  </section>
</div>
