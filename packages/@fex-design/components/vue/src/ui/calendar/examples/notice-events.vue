<script setup lang="ts">
import { Calendar } from '@fex-design/vue/ui/calendar'
import { calendarDemoDate, calendarDemoNotices } from '@fex-design/docs-shared/calendar-demo-data'
</script>
<template>
  <Calendar :default-view-date="calendarDemoDate"
    ><template #cell="{ cell }"
      ><ul>
        <li v-for="notice in calendarDemoNotices(cell)" :key="notice">
          <a href="#calendar-notice">{{ notice }}</a>
        </li>
      </ul></template
    ></Calendar
  >
</template>
