<script setup lang="ts">
import { RangePicker } from '@fex-design/vue/ui/date-picker'

import { getCalendarToday } from '@fex-design/core/calendar'
const today = getCalendarToday()
defineOptions({ name: 'DatePickerRangeExample' })

</script>
<template>
<div class="flex flex-wrap items-start gap-4">
  <RangePicker :default-value="{ start: today, end: today.add({ days: 7 }) }">
  </RangePicker>
</div>
</template>
