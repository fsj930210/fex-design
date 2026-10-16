<script setup lang="ts">
import { TimePicker } from '@fex-design/vue/ui/time-picker'
defineOptions({ name: 'TimePickerTriggerExample' })
</script>
<template>
<div class="flex w-full min-w-0 flex-col gap-4">
<TimePicker :default-value="{ hour: 9, minute: 30, second: 0 }" ><template #trigger="{ props: bindings, ref: register }"><button v-bind="bindings" :ref="register" type="button" class="rounded-md border border-border px-3 py-2">选择时间</button></template></TimePicker>
</div>
</template>
