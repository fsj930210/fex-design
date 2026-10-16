<script setup lang="ts">
import { useTimePicker } from '@fex-design/vue/primitive/time-picker'
defineOptions({ name: 'TimePickerLogicExample' })
const { controller, snapshot } = useTimePicker({ defaultValue: { hour: 9, minute: 30, second: 0 } })
</script>
<template>
<div class="flex w-full min-w-0 flex-col gap-4">
<div class="flex items-center gap-3"><button type="button" @click="controller.selectHour(12)">选择 12 时</button><output>{{ snapshot.inputValue }}</output></div>
</div>
</template>
