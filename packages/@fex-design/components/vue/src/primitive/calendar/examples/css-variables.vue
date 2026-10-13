<script setup lang="ts">
import { CalendarRoot } from '@fex-design/vue/primitive/calendar'
import { getCalendarUIOptions, type CalendarUIOptions } from '@fex-design/core/calendar'
import { calendarUIRootClassName } from '@fex-design/components-styles/calendar'
import ExampleContent from './_parts/content.vue'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
const options: CalendarUIOptions = { defaultViewDate: calendarDemoDate }
</script>
<template>
<div style="--calendar-hover-background:var(--success);--calendar-selected-background:var(--primary);--calendar-selected-foreground:var(--primary-foreground);--calendar-today-color:var(--danger)"><CalendarRoot v-bind="getCalendarUIOptions(options)" :class="calendarUIRootClassName" :data-fullscreen="true"><ExampleContent :options="options" /></CalendarRoot></div>
</template>

