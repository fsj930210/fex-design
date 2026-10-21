<script setup lang="ts">
import { CalendarRoot } from '@fex-design/vue/primitive/calendar'
import { getCalendarUIOptions, type CalendarUIOptions } from '@fex-design/core/calendar'
import { calendarUIRootClassName } from '@fex-design/components-styles/calendar'
import ExampleContent from './_parts/content.vue'
import { calendarDemoDate, calendarDemoEnglish } from '@fex-design/docs-shared/calendar-demo-data'
const options: CalendarUIOptions = {
  defaultViewDate: calendarDemoDate,
  locale: calendarDemoEnglish,
  showWeek: true,
}
</script>
<template>
  <CalendarRoot
    v-bind="getCalendarUIOptions(options)"
    :class="calendarUIRootClassName"
    :data-fullscreen="true"
    ><ExampleContent :options="options"
  /></CalendarRoot>
</template>
