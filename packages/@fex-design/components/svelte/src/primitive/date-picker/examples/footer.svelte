<script lang="ts">
  import {
    DatePickerRoot,
    DatePickerTrigger,
    DatePickerContent,
    DatePickerPanel,
    DatePickerFooter,
    DatePickerConfirm,
    RangePickerRoot,
    RangePickerTrigger,
    RangePickerContent,
    RangePickerPanelGroup,
  } from "@fex-design/svelte/primitive/date-picker";
</script>

<div class="flex flex-wrap items-start gap-4">
  <DatePickerRoot>
    <DatePickerTrigger></DatePickerTrigger>
    <DatePickerContent>
      <DatePickerPanel />
    </DatePickerContent>
  </DatePickerRoot>
  <DatePickerRoot>
    <DatePickerTrigger></DatePickerTrigger>
    <DatePickerContent>
      <DatePickerPanel />
      <DatePickerFooter>
        <span>自定义底部</span>
      </DatePickerFooter>
    </DatePickerContent>
  </DatePickerRoot>
  <RangePickerRoot needConfirm>
    <RangePickerTrigger></RangePickerTrigger>
    <RangePickerContent>
      <RangePickerPanelGroup />
      <DatePickerFooter>
        <DatePickerConfirm>提交范围</DatePickerConfirm>
      </DatePickerFooter>
    </RangePickerContent>
  </RangePickerRoot>
</div>
