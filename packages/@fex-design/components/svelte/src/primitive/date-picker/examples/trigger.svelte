<script lang="ts">
  import {
    DatePickerRoot,
    DatePickerTrigger,
    DatePickerContent,
    DatePickerPanel,
    DatePickerFooter,
  } from "@fex-design/svelte/primitive/date-picker";
</script>

<div class="flex flex-wrap items-start gap-4">
  <DatePickerRoot>
    <DatePickerTrigger>
      {#snippet children({ props, action, state })}<button
          {...props}
          use:action
          type="button">{state.getDisplayValue() || "选择日期"}</button
        >{/snippet}
    </DatePickerTrigger>
    <DatePickerContent>
      <DatePickerPanel />
      <DatePickerFooter></DatePickerFooter>
    </DatePickerContent>
  </DatePickerRoot>
</div>
