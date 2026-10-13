<script setup lang="ts">
import { Calendar } from '@fex-design/vue/ui/calendar'
import { calendarDemoDate, calendarDemoEnglish } from '@fex-design/docs-shared/calendar-demo-data'
</script>
<template>
<Calendar :default-view-date="calendarDemoDate" :locale="calendarDemoEnglish" show-week />
</template>
