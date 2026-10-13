<script setup lang="ts">
import { Calendar } from '@fex-design/vue/ui/calendar'
import { calendarDemoDate, calendarDemoEvent } from '@fex-design/docs-shared/calendar-demo-data'
</script>
<template>
<Calendar :default-view-date="calendarDemoDate" :class-names="{ cell: 'px-0', cellContent: 'overflow-visible' }"><template #cell="{ cell }"><div v-if="calendarDemoEvent(cell)" class="bg-primary text-primary-foreground px-2" :data-segment="calendarDemoEvent(cell)?.segment">{{ calendarDemoEvent(cell)?.label }}</div></template></Calendar>
</template>
