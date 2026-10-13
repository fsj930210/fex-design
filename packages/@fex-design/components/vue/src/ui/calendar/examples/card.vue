<script setup lang="ts">
import { Calendar } from '@fex-design/vue/ui/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
</script>
<template>
<div class="max-w-sm"><Calendar :default-view-date="calendarDemoDate" :fullscreen="false" /></div>
</template>
