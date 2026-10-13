<script setup lang="ts">
import { Calendar } from '@fex-design/vue/ui/calendar'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
</script>
<template>
<Calendar :default-view-date="calendarDemoDate"><template #header="{ state, controller }"><div class="flex w-full items-center justify-between"><button type="button" @click="controller.navigate('previous-panel')">上一页</button><strong>{{ state.viewDate.year }} / {{ state.viewDate.month }}</strong><button type="button" @click="controller.navigate('next-panel')">下一页</button></div></template></Calendar>
</template>
