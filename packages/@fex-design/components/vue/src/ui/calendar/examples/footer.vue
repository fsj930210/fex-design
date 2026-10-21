<script setup lang="ts">
import { Calendar } from '@fex-design/vue/ui/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
</script>
<template>
  <Calendar :default-view-date="calendarDemoDate"
    ><template #footer="{ controller }"
      ><button type="button" @click="controller.navigate('today')">回到今天</button></template
    ></Calendar
  >
</template>
