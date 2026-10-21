<script lang="ts">
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
</script>

<div class="flex w-full min-w-0 flex-col gap-4">
  <div class="grid gap-4">
    <TimePickerRoot defaultValue={{ hour: 9, minute: 30, second: 0 }} disabled
      ><TimePickerTrigger></TimePickerTrigger><TimePickerPortal
        ><TimePickerContent
          ><TimePickerPanel
            ><TimePickerHourColumn
            ></TimePickerHourColumn><TimePickerMinuteColumn
            /><TimePickerSecondColumn /></TimePickerPanel
          ></TimePickerContent
        ></TimePickerPortal
      ></TimePickerRoot
    ><TimePickerRoot defaultValue={{ hour: 9, minute: 30, second: 0 }} readOnly
      ><TimePickerTrigger></TimePickerTrigger><TimePickerPortal
        ><TimePickerContent
          ><TimePickerPanel
            ><TimePickerHourColumn
            ></TimePickerHourColumn><TimePickerMinuteColumn
            /><TimePickerSecondColumn /></TimePickerPanel
          ></TimePickerContent
        ></TimePickerPortal
      ></TimePickerRoot
    >
  </div>
</div>
