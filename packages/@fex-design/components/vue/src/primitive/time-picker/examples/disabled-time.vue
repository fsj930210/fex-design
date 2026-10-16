<script setup lang="ts">
import { TimePickerRoot, TimePickerTrigger, TimePickerPortal, TimePickerContent, TimePickerPanel, TimePickerHourColumn, TimePickerMinuteColumn, TimePickerSecondColumn, TimePickerPeriodColumn } from '@fex-design/vue/primitive/time-picker'
defineOptions({ name: 'TimePickerDisabledTimeExample' })
const disabledTime = () => ({ disabledHours: () => [0, 1, 2], disabledMinutes: (hour: number) => hour === 9 ? [15, 45] : [] })
</script>
<template>
<div class="flex w-full min-w-0 flex-col gap-4">
<TimePickerRoot :default-value="{ hour: 9, minute: 30, second: 0 }" :disabled-time="disabledTime" ><TimePickerTrigger></TimePickerTrigger><TimePickerPortal><TimePickerContent><TimePickerPanel><TimePickerHourColumn></TimePickerHourColumn><TimePickerMinuteColumn /><TimePickerSecondColumn /></TimePickerPanel></TimePickerContent></TimePickerPortal></TimePickerRoot>
</div>
</template>
