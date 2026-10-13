<script setup lang="ts">
import { CalendarRoot } from '@fex-design/vue/primitive/calendar'
import { getCalendarUIOptions, type CalendarUIOptions } from '@fex-design/core/calendar'
import { calendarUIRootClassName } from '@fex-design/components-styles/calendar'
import ExampleContent from './_parts/content.vue'
import { calendarDemoDate, calendarDemoEvent } from '@fex-design/docs-shared/calendar-demo-data'
const options: CalendarUIOptions = { defaultViewDate: calendarDemoDate }
</script>
<template>
<CalendarRoot v-bind="getCalendarUIOptions(options)" :class="calendarUIRootClassName" :data-fullscreen="true"><ExampleContent :options="options" :class-names="{ cell: 'px-0', cellContent: 'overflow-visible' }"><template #cell="{ cell }"><div v-if="calendarDemoEvent(cell)" class="bg-primary text-primary-foreground px-2" :data-segment="calendarDemoEvent(cell)?.segment">{{ calendarDemoEvent(cell)?.label }}</div></template></ExampleContent></CalendarRoot>
</template>

