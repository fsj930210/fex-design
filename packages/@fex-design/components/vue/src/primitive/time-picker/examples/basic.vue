<script setup lang="ts">
import { TimePickerRoot, TimePickerTrigger, TimePickerPortal, TimePickerContent, TimePickerPanel, TimePickerHourColumn, TimePickerMinuteColumn, TimePickerSecondColumn, TimePickerPeriodColumn } from '@fex-design/vue/primitive/time-picker'
defineOptions({ name: 'TimePickerBasicExample' })
</script>
<template>
<div class="flex w-full min-w-0 flex-col gap-4">
<TimePickerRoot :default-value="{ hour: 9, minute: 30, second: 0 }" ><TimePickerTrigger></TimePickerTrigger><TimePickerPortal><TimePickerContent><TimePickerPanel><TimePickerHourColumn></TimePickerHourColumn><TimePickerMinuteColumn /><TimePickerSecondColumn /></TimePickerPanel></TimePickerContent></TimePickerPortal></TimePickerRoot>
</div>
</template>
