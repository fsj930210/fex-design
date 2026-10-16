<script setup lang="ts">
import { TimePicker } from '@fex-design/vue/ui/time-picker'
defineOptions({ name: 'TimePickerDirectionExample' })
</script>
<template>
<div class="flex w-full min-w-0 flex-col gap-4">
<div class="grid gap-4"><div dir="ltr"><TimePicker :default-value="{ hour: 9, minute: 30, second: 0 }" ></TimePicker></div><div dir="rtl"><TimePicker :default-value="{ hour: 9, minute: 30, second: 0 }" ></TimePicker></div></div>
</div>
</template>
