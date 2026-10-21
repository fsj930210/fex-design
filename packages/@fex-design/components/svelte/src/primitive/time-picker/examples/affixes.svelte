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
  <section class="grid gap-2">
    <p>默认时钟后缀</p>
    <TimePickerRoot defaultValue={{ hour: 9, minute: 30, second: 0 }}
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
  </section>
  <section class="grid gap-2">
    <p>自定义前缀与后缀</p>
    <TimePickerRoot defaultValue={{ hour: 9, minute: 30, second: 0 }}
      ><TimePickerTrigger
        >{#snippet prefix()}预约{/snippet}{#snippet suffix()}时{/snippet}</TimePickerTrigger
      ><TimePickerPortal
        ><TimePickerContent
          ><TimePickerPanel
            ><TimePickerHourColumn
            ></TimePickerHourColumn><TimePickerMinuteColumn
            /><TimePickerSecondColumn /></TimePickerPanel
          ></TimePickerContent
        ></TimePickerPortal
      ></TimePickerRoot
    >
  </section>
  <section class="grid gap-2">
    <p>自定义时区后缀</p>
    <TimePickerRoot defaultValue={{ hour: 9, minute: 30, second: 0 }}
      ><TimePickerTrigger
        >{#snippet prefix()}时间{/snippet}{#snippet suffix()}UTC{/snippet}</TimePickerTrigger
      ><TimePickerPortal
        ><TimePickerContent
          ><TimePickerPanel
            ><TimePickerHourColumn
            ></TimePickerHourColumn><TimePickerMinuteColumn
            /><TimePickerSecondColumn /></TimePickerPanel
          ></TimePickerContent
        ></TimePickerPortal
      ></TimePickerRoot
    >
  </section>
</div>
