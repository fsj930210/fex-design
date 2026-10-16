<script setup lang="ts">
import { CalendarRoot, CalendarCellTrigger } from '@fex-design/vue/primitive/calendar'
import { getCalendarUIOptions, type CalendarUIOptions } from '@fex-design/core/calendar'
import { calendarUIRootClassName } from '@fex-design/components-styles/calendar'
import ExampleContent from './_parts/content.vue'
import { calendarDemoDate, calendarDemoLunar } from '@fex-design/docs-shared/calendar-demo-data'

const options: CalendarUIOptions = { defaultViewDate: calendarDemoDate }
</script>
<template>
<CalendarRoot v-bind="getCalendarUIOptions(options)" :class="calendarUIRootClassName" :data-fullscreen="true"><ExampleContent :options="options"><template #fullCell="{ cell }"><CalendarCellTrigger :cell="cell" class="flex-col items-center"><span>{{ cell.label }}</span><small>{{ calendarDemoLunar(cell) }}</small></CalendarCellTrigger></template></ExampleContent></CalendarRoot>
</template>

