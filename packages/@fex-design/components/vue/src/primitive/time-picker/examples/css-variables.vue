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
defineOptions({ name: 'TimePickerCssVariablesExample' })
</script>
<template>
  <div class="flex w-full min-w-0 flex-col gap-4">
    <section class="flex flex-col gap-2">
      <p>默认</p>
      <TimePickerRoot :default-value="{ hour: 9, minute: 30, second: 0 }"
        ><TimePickerTrigger></TimePickerTrigger
        ><TimePickerPortal
          ><TimePickerContent
            class="[--border:#c4b5fd] [--elevated-background:#ffffff] [--elevated-foreground:#6d28d9] [--primary:#6d28d9] [--muted-background:#f5f3ff]"
            ><TimePickerPanel
              ><TimePickerHourColumn></TimePickerHourColumn
              ><TimePickerMinuteColumn /><TimePickerSecondColumn /></TimePickerPanel></TimePickerContent></TimePickerPortal
      ></TimePickerRoot>
    </section>
    <section class="flex flex-col gap-2">
      <p>紫色边框、聚焦光环与浅色背景</p>
      <TimePickerRoot :default-value="{ hour: 9, minute: 30, second: 0 }"
        ><TimePickerTrigger
          class="[--input-border-color:var(--color-purple-500)] [--focus-border:var(--color-purple-600)] [--input-ring-color:var(--color-purple-200)] [--input-background:var(--color-purple-50)] [--input-color:var(--color-purple-950)]"
        ></TimePickerTrigger
        ><TimePickerPortal
          ><TimePickerContent
            class="[--border:#c4b5fd] [--elevated-background:#ffffff] [--elevated-foreground:#6d28d9] [--primary:#6d28d9] [--muted-background:#f5f3ff]"
            ><TimePickerPanel
              ><TimePickerHourColumn></TimePickerHourColumn
              ><TimePickerMinuteColumn /><TimePickerSecondColumn /></TimePickerPanel></TimePickerContent></TimePickerPortal
      ></TimePickerRoot>
    </section>
  </div>
</template>
