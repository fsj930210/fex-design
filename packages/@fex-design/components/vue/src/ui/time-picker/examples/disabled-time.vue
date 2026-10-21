<script setup lang="ts">
import { TimePicker } from '@fex-design/vue/ui/time-picker'
defineOptions({ name: 'TimePickerDisabledTimeExample' })
const disabledTime = () => ({
  disabledHours: () => [0, 1, 2],
  disabledMinutes: (hour: number) => (hour === 9 ? [15, 45] : []),
})
</script>
<template>
  <div class="flex w-full min-w-0 flex-col gap-4">
    <TimePicker
      :default-value="{ hour: 9, minute: 30, second: 0 }"
      :disabled-time="disabledTime"
    ></TimePicker>
  </div>
</template>
