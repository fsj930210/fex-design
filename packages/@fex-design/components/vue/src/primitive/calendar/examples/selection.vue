<script setup lang="ts">
import { CalendarRoot } from '@fex-design/vue/primitive/calendar'
import { getCalendarUIOptions, type CalendarUIOptions } from '@fex-design/core/calendar'
import { calendarUIRootClassName } from '@fex-design/components-styles/calendar'
import ExampleContent from './_parts/content.vue'
import { calendarDemoDate } from '@fex-design/docs-shared/calendar-demo-data'
import { computed, ref } from 'vue'
import type { CalendarDate } from '@fex-design/core/calendar'
const value = ref<CalendarDate | null>(null)
const options = computed<CalendarUIOptions>(() => ({
  defaultViewDate: calendarDemoDate,
  value: value.value,
}))
</script>
<template>
  <p>选中：{{ value?.toString() ?? '未选择' }}</p>
  <CalendarRoot
    v-bind="getCalendarUIOptions(options)"
    :class="calendarUIRootClassName"
    :data-fullscreen="true"
    @change="value = $event"
    ><ExampleContent :options="options"
  /></CalendarRoot>
</template>
