<script setup lang="ts">
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
} from '@fex-design/vue/primitive/time-picker'
defineOptions({ name: 'TimePickerAppearanceExample' })
</script>
<template>
  <div class="flex w-full min-w-0 flex-col gap-4">
    <section class="flex flex-col gap-2">
      <p>outlined</p>
      <TimePickerRoot :default-value="{ hour: 9, minute: 30, second: 0 }"
        ><TimePickerTrigger variant="outlined"></TimePickerTrigger
        ><TimePickerPortal
          ><TimePickerContent
            ><TimePickerPanel
              ><TimePickerHourColumn></TimePickerHourColumn
              ><TimePickerMinuteColumn /><TimePickerSecondColumn /></TimePickerPanel></TimePickerContent></TimePickerPortal
      ></TimePickerRoot>
    </section>
    <section class="flex flex-col gap-2">
      <p>filled</p>
      <TimePickerRoot :default-value="{ hour: 9, minute: 30, second: 0 }"
        ><TimePickerTrigger variant="filled"></TimePickerTrigger
        ><TimePickerPortal
          ><TimePickerContent
            ><TimePickerPanel
              ><TimePickerHourColumn></TimePickerHourColumn
              ><TimePickerMinuteColumn /><TimePickerSecondColumn /></TimePickerPanel></TimePickerContent></TimePickerPortal
      ></TimePickerRoot>
    </section>
    <section class="flex flex-col gap-2">
      <p>borderless</p>
      <TimePickerRoot :default-value="{ hour: 9, minute: 30, second: 0 }"
        ><TimePickerTrigger variant="borderless"></TimePickerTrigger
        ><TimePickerPortal
          ><TimePickerContent
            ><TimePickerPanel
              ><TimePickerHourColumn></TimePickerHourColumn
              ><TimePickerMinuteColumn /><TimePickerSecondColumn /></TimePickerPanel></TimePickerContent></TimePickerPortal
      ></TimePickerRoot>
    </section>
    <section class="flex flex-col gap-2">
      <p>underlined</p>
      <TimePickerRoot :default-value="{ hour: 9, minute: 30, second: 0 }"
        ><TimePickerTrigger variant="underlined"></TimePickerTrigger
        ><TimePickerPortal
          ><TimePickerContent
            ><TimePickerPanel
              ><TimePickerHourColumn></TimePickerHourColumn
              ><TimePickerMinuteColumn /><TimePickerSecondColumn /></TimePickerPanel></TimePickerContent></TimePickerPortal
      ></TimePickerRoot>
    </section>
  </div>
</template>
