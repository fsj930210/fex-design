<script setup lang="ts">
import { Calendar } from '@fex-design/vue/ui/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
</script>
<template>
<div style="--calendar-hover-background:var(--success);--calendar-selected-background:var(--primary);--calendar-selected-foreground:var(--primary-foreground);--calendar-today-color:var(--danger)"><Calendar :default-view-date="calendarDemoDate" /></div>
</template>
