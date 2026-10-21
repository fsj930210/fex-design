<script setup lang="ts">
import { DatePicker } from '@fex-design/vue/ui/date-picker'

defineOptions({ name: 'DatePickerContainerExample' })
</script>
<template>
  <div class="flex flex-wrap items-start gap-4">
    <DatePicker :default-open="true">
      <template #container="{ content, state }">
        <div
          class="flex flex-col items-start gap-2 data-[open=false]:[&_[data-slot=date-picker-content]]:hidden"
          :data-open="state.open.value ? 'true' : 'false'"
        >
          <component :is="content" />
        </div>
      </template>
    </DatePicker>
  </div>
</template>
