<script setup lang="ts">
import { TimePicker } from '@fex-design/vue/ui/time-picker'
import { TimePickerPanel, TimePickerHourColumn, TimePickerMinuteColumn, TimePickerSecondColumn } from '@fex-design/vue/primitive/time-picker'
defineOptions({ name: 'TimePickerItemExample' })
</script>
<template>
<div class="flex w-full min-w-0 flex-col gap-4">
<TimePicker :default-value="{ hour: 9, minute: 30, second: 0 }" ><template #panel><TimePickerPanel><TimePickerHourColumn><template #item="{ item, selected }"><span>{{ selected ? "✓ " : "" }}{{ item.label }}</span></template></TimePickerHourColumn><TimePickerMinuteColumn /><TimePickerSecondColumn /></TimePickerPanel></template></TimePicker>
</div>
</template>
