<script lang="ts">
  import {
    DatePicker,
    createDatePickerDateTime,
  } from "@fex-design/svelte/ui/date-picker";
  import type { DatePickerSelectionValue } from "@fex-design/svelte/primitive/date-picker";
  import { Button } from "@fex-design/svelte/ui/button";
  const initial = createDatePickerDateTime(2026, 10, 15, 9, 30, 0);
  let value = $state<DatePickerSelectionValue>(initial);
  let open = $state(false);
</script>

<div class="flex w-full min-w-0 flex-col gap-6">
  <div class="flex flex-wrap gap-2">
    <Button
      onclick={() =>
        (value = createDatePickerDateTime(2026, 10, 16, 14, 45, 30))}
      >外部设置 10-16 14:45:30</Button
    ><Button onclick={() => (value = null)}>清空</Button><Button
      onclick={() => (open = true)}>打开</Button
    ><Button onclick={() => (open = false)}>关闭</Button>
  </div>
  <DatePicker
    showTime
    {value}
    {open}
    onChange={(next) => (value = next)}
    onOpenChange={(next) => (open = next)}
  />
  <output class="text-sm text-muted-foreground"
    >已提交值：{value?.toString() ?? "未选择"}</output
  >
</div>
