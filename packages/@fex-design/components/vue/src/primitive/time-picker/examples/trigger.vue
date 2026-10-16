<script setup lang="ts">
import { TimePickerRoot, TimePickerTrigger, TimePickerPortal, TimePickerContent, TimePickerPanel, TimePickerHourColumn, TimePickerMinuteColumn, TimePickerSecondColumn, TimePickerPeriodColumn } from '@fex-design/vue/primitive/time-picker'
defineOptions({ name: 'TimePickerTriggerExample' })
</script>
<template>
<div class="flex w-full min-w-0 flex-col gap-4">
<TimePickerRoot :default-value="{ hour: 9, minute: 30, second: 0 }" ><TimePickerTrigger><template #default="{ props: bindings, ref: register }"><button v-bind="bindings" :ref="register" type="button" class="rounded-md border border-border px-3 py-2">选择时间</button></template></TimePickerTrigger><TimePickerPortal><TimePickerContent><TimePickerPanel><TimePickerHourColumn></TimePickerHourColumn><TimePickerMinuteColumn /><TimePickerSecondColumn /></TimePickerPanel></TimePickerContent></TimePickerPortal></TimePickerRoot>
</div>
</template>
