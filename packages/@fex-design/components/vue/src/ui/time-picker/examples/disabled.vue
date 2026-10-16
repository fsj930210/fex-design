<script setup lang="ts">
import { TimePicker } from '@fex-design/vue/ui/time-picker'
defineOptions({ name: 'TimePickerDisabledExample' })
</script>
<template>
<div class="flex w-full min-w-0 flex-col gap-4">
<div class="grid gap-4"><TimePicker :default-value="{ hour: 9, minute: 30, second: 0 }" disabled></TimePicker><TimePicker :default-value="{ hour: 9, minute: 30, second: 0 }" read-only></TimePicker></div>
</div>
</template>
