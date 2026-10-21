<script lang="ts">
  import { TimePicker } from "@fex-design/svelte/ui/time-picker";
  import type { TimeValue } from "@fex-design/svelte/primitive/time-picker";
  import { Button } from "@fex-design/svelte/ui/button";
  import { format } from "@fex-design/core/date/utils";
  const initialValue: TimeValue = { hour: 9, minute: 30, second: 0 };
  const afternoonValue: TimeValue = { hour: 14, minute: 45, second: 30 };
  const formatValue = (value: TimeValue | null) =>
    value ? format(value, "HH:mm:ss") : "未选择";
  let value = $state<TimeValue | null>(initialValue);
  let open = $state(false);
  let uncontrolledValue = $state<TimeValue | null>(initialValue);
</script>

<div class="flex w-full min-w-0 flex-col gap-6">
  <div class="flex flex-wrap gap-2">
    <Button onclick={() => (value = afternoonValue)}>设置 14:45:30</Button>
    <Button onclick={() => (value = initialValue)}>恢复初始时间</Button>
    <Button onclick={() => (value = null)}>清空外部值</Button>
    <Button onclick={() => (open = true)}>打开受控面板</Button>
    <Button onclick={() => (open = false)}>关闭受控面板</Button>
  </div>
  <section class="flex w-full min-w-0 flex-col gap-2">
    <p class="text-sm font-medium">受控：value / open</p>
    <p class="text-sm text-muted-foreground">
      外部按钮设置、清空时间，并控制面板开关。
    </p>
    <TimePicker
      {value}
      {open}
      onchange={(next) => (value = next)}
      onOpenChange={(next) => (open = next)}
    />
    <output class="text-sm text-muted-foreground"
      >外部值：{formatValue(value)}；面板：{open ? "打开" : "关闭"}</output
    >
  </section>
  <section class="flex w-full min-w-0 flex-col gap-2">
    <p class="text-sm font-medium">非受控：defaultValue</p>
    <p class="text-sm text-muted-foreground">
      defaultValue 仅初始化读取；上方外部值变化不会覆盖这里的选择。
    </p>
    <TimePicker
      defaultValue={value}
      onchange={(next) => (uncontrolledValue = next)}
    />
    <output class="text-sm text-muted-foreground"
      >选择结果：{formatValue(uncontrolledValue)}</output
    >
  </section>
</div>
