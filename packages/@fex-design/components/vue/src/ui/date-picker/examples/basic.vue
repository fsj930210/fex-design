<script setup lang="ts">
const props = defineProps<{ invalid?: boolean }>()
import { DatePicker } from '@fex-design/vue/ui/date-picker'

defineOptions({ name: 'DatePickerBasicExample' })
</script>
<template>
  <div class="flex w-full min-w-0 flex-col items-stretch gap-4">
    <DatePicker
      :aria-invalid="props.invalid || undefined"
      class="w-full min-w-0"
      placeholder="请选择日期"
    >
    </DatePicker>
    <DatePicker :aria-invalid="props.invalid || undefined" class="w-full min-w-0" :multiple="true">
    </DatePicker>
  </div>
</template>
