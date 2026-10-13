<script setup lang="ts">
import { CalendarRoot } from '@fex-design/vue/primitive/calendar'
import { getCalendarUIOptions, type CalendarUIOptions } from '@fex-design/core/calendar'
import { calendarUIRootClassName } from '@fex-design/components-styles/calendar'
import ExampleContent from './_parts/content.vue'
import { calendarDemoDate, calendarDemoNotices } from '@fex-design/docs-shared/calendar-demo-data'
const options: CalendarUIOptions = { defaultViewDate: calendarDemoDate }
</script>
<template>
<CalendarRoot v-bind="getCalendarUIOptions(options)" :class="calendarUIRootClassName" :data-fullscreen="true"><ExampleContent :options="options"><template #cell="{ cell }"><ul><li v-for="notice in calendarDemoNotices(cell)" :key="notice"><a href="#calendar-notice">{{ notice }}</a></li></ul></template></ExampleContent></CalendarRoot>
</template>

