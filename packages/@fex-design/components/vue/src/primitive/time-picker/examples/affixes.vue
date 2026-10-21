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
defineOptions({ name: 'TimePickerAffixesExample' })
</script>
<template>
  <div class="flex w-full min-w-0 flex-col gap-4">
    <section class="grid gap-2">
      <p>默认时钟后缀</p>
      <TimePickerRoot :default-value="{ hour: 9, minute: 30, second: 0 }"
        ><TimePickerTrigger></TimePickerTrigger
        ><TimePickerPortal
          ><TimePickerContent
            ><TimePickerPanel
              ><TimePickerHourColumn></TimePickerHourColumn
              ><TimePickerMinuteColumn /><TimePickerSecondColumn /></TimePickerPanel></TimePickerContent></TimePickerPortal
      ></TimePickerRoot>
    </section>
    <section class="grid gap-2">
      <p>自定义前缀与后缀</p>
      <TimePickerRoot :default-value="{ hour: 9, minute: 30, second: 0 }"
        ><TimePickerTrigger
          ><template #prefix>预约</template><template #suffix>时</template></TimePickerTrigger
        ><TimePickerPortal
          ><TimePickerContent
            ><TimePickerPanel
              ><TimePickerHourColumn></TimePickerHourColumn
              ><TimePickerMinuteColumn /><TimePickerSecondColumn /></TimePickerPanel></TimePickerContent></TimePickerPortal
      ></TimePickerRoot>
    </section>
    <section class="grid gap-2">
      <p>自定义时区后缀</p>
      <TimePickerRoot :default-value="{ hour: 9, minute: 30, second: 0 }"
        ><TimePickerTrigger
          ><template #prefix>时间</template><template #suffix>UTC</template></TimePickerTrigger
        ><TimePickerPortal
          ><TimePickerContent
            ><TimePickerPanel
              ><TimePickerHourColumn></TimePickerHourColumn
              ><TimePickerMinuteColumn /><TimePickerSecondColumn /></TimePickerPanel></TimePickerContent></TimePickerPortal
      ></TimePickerRoot>
    </section>
  </div>
</template>
