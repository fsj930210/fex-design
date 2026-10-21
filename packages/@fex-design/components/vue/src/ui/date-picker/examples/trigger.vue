<script setup lang="ts">
import { DatePicker } from '@fex-design/vue/ui/date-picker'

defineOptions({ name: 'DatePickerTriggerExample' })
</script>
<template>
  <div class="flex flex-wrap items-start gap-4">
    <DatePicker>
      <template #trigger="{ props, ref, state }">
        <button v-bind="props" :ref="ref" type="button">
          {{ state.displayValue.value || '选择日期' }}
        </button>
      </template>
    </DatePicker>
  </div>
</template>
