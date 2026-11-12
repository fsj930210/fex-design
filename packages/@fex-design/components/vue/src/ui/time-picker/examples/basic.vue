<script setup lang="ts">
const props = defineProps<{ invalid?: boolean }>()
import { TimePicker } from '@fex-design/vue/ui/time-picker'
defineOptions({ name: 'TimePickerBasicExample' })
</script>
<template>
  <div class="flex w-full min-w-0 flex-col gap-4">
    <TimePicker
      :aria-invalid="props.invalid || undefined"
      :default-value="{ hour: 9, minute: 30, second: 0 }"
    ></TimePicker>
  </div>
</template>
