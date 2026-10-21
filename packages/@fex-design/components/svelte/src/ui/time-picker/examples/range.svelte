<script lang="ts">
  import { format } from "@fex-design/core/date/utils";
  import type { TimeRangeValue } from "@fex-design/svelte/primitive/time-picker";
  import { TimeRangePicker } from "@fex-design/svelte/ui/time-picker";
  const initial: TimeRangeValue = [
    { hour: 9, minute: 30, second: 0 },
    { hour: 17, minute: 30, second: 0 },
  ];
  const display = (value: TimeRangeValue | null) =>
    value
      ? `${format(value[0], "HH:mm:ss")} → ${format(value[1], "HH:mm:ss")}`
      : "未选择";
  let confirmed = $state<TimeRangeValue | null>(initial);
  let immediate = $state<TimeRangeValue | null>(initial);
</script>

<div class="grid w-full gap-6">
  <section class="grid gap-2">
    <p>默认确认后提交</p>
    <TimeRangePicker
      defaultValue={initial}
      onchange={(value) => (confirmed = value)}
    /><output aria-live="polite">已提交：{display(confirmed)}</output>
  </section>
  <section class="grid gap-2">
    <p>关闭确认，完整有效区间即时提交</p>
    <TimeRangePicker
      defaultValue={initial}
      needConfirm={false}
      onchange={(value) => (immediate = value)}
    /><output aria-live="polite">已提交：{display(immediate)}</output>
  </section>
</div>
