<script setup lang="ts">
import { Calendar } from '@fex-design/vue/ui/calendar'
import { calendarDemoDate, calendarDemoLunar } from '@fex-design/docs-shared/calendar-demo-data'
import { CalendarCellTrigger } from '@fex-design/vue/primitive/calendar'
</script>
<template>
<Calendar :default-view-date="calendarDemoDate"><template #fullCell="{ cell }"><CalendarCellTrigger :cell="cell" class="flex-col items-center"><span>{{ cell.label }}</span><small>{{ calendarDemoLunar(cell) }}</small></CalendarCellTrigger></template></Calendar>
</template>
