<script lang="ts">
  import { Button } from "@fex-design/svelte/primitive/button";
  import type { TimeValue } from "@fex-design/svelte/primitive/time-picker";
  import { format } from "@fex-design/core/date/utils";
  import {
    TimePickerRoot,
    TimePickerTrigger,
    TimePickerPortal,
    TimePickerContent,
    TimePickerPanel,
    TimePickerHourColumn,
    TimePickerMinuteColumn,
    TimePickerSecondColumn,
    TimePickerPeriodColumn,
  } from "@fex-design/svelte/primitive/time-picker";
  let committed = $state<TimeValue | null>({ hour: 9, minute: 30, second: 0 });
  let draft = $state<TimeValue | null>({ hour: 9, minute: 30, second: 0 });
  let open = $state(false);
  function changeOpen(next: boolean) {
    open = next;
    if (!next) draft = committed;
  }
  function confirm() {
    committed = draft;
    open = false;
  }
</script>

<div class="grid w-full gap-4">
  <p>调用方通过受控值保存待确认选择；确认后提交，取消或关闭恢复。</p>
  <TimePickerRoot
    value={draft}
    {open}
    onchange={(next) => (draft = next)}
    onOpenChange={changeOpen}
    ><TimePickerTrigger></TimePickerTrigger><TimePickerPortal
      ><TimePickerContent
        ><TimePickerPanel
          ><TimePickerHourColumn></TimePickerHourColumn><TimePickerMinuteColumn
          /><TimePickerSecondColumn /></TimePickerPanel
        >
        <div
          class="flex flex-wrap justify-end gap-2 border-t border-border p-2"
        >
          <Button
            type="button"
            size="sm"
            variant="text"
            onclick={() => changeOpen(false)}>取消</Button
          ><Button
            type="button"
            size="sm"
            color="primary"
            variant="solid"
            onclick={confirm}>确认</Button
          >
        </div></TimePickerContent
      ></TimePickerPortal
    ></TimePickerRoot
  ><output aria-live="polite"
    >已确认：{committed ? format(committed, "HH:mm:ss") : "未选择"}</output
  >
</div>
