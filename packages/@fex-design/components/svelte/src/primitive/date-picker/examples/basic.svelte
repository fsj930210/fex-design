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
    <DatePickerTrigger class="w-full min-w-0" placeholder="请选择日期"
    ></DatePickerTrigger>
    <DatePickerContent>
      <DatePickerPanel />
      <DatePickerFooter></DatePickerFooter>
    </DatePickerContent>
  </DatePickerRoot>
  <DatePickerRoot multiple>
    <DatePickerTrigger class="w-full min-w-0"></DatePickerTrigger>
    <DatePickerContent>
      <DatePickerPanel />
      <DatePickerFooter></DatePickerFooter>
    </DatePickerContent>
  </DatePickerRoot>
</div>
