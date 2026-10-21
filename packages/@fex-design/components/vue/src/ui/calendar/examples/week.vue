<script setup lang="ts">
import { Calendar } from '@fex-design/vue/ui/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
</script>
<template>
  <Calendar
    :default-view-date="calendarDemoDate"
    show-week
    :week-starts-on="1"
    :locale="{ firstWeekContainsDate: 4 }"
  />
</template>
