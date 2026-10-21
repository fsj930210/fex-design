<script setup lang="ts">
import { Calendar } from '@fex-design/vue/ui/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
import { ref } from 'vue'
import type { CalendarDate } from '@fex-design/core/calendar'
const value = ref<CalendarDate | null>(null)
</script>
<template>
  <p>选中：{{ value?.toString() ?? '未选择' }}</p>
  <Calendar :default-view-date="calendarDemoDate" :value="value" @change="value = $event" />
</template>
