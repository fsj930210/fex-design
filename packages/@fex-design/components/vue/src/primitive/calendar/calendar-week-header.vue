<script setup lang="ts">
import { cn } from '@fex-design/utils'
import { computed, normalizeClass, useAttrs, useTemplateRef } from 'vue'
import {
  getCalendarWeekHeaderItems,
  calendarDefaultWeekLabels,
  type CalendarWeekHeaderItem,
} from '@fex-design/core/calendar'
import { calendarWeekHeaderClassName } from '@fex-design/components-styles/calendar'
import { useCalendarContext } from './context'

defineOptions({ name: 'CalendarWeekHeader', inheritAttrs: false })
const props = withDefaults(defineProps<{ labels?: readonly string[] }>(), {
  labels: () => calendarDefaultWeekLabels,
})
defineSlots<{ default?: (item: CalendarWeekHeaderItem) => unknown }>()
const attrs = useAttrs()
const context = useCalendarContext('CalendarWeekHeader')
const items = computed(() =>
  getCalendarWeekHeaderItems(props.labels, context.state.value.weekStartsOn),
)
const element = useTemplateRef<HTMLDivElement>('element')
defineExpose({ element })
</script>

<template>
  <div
    v-bind="attrs"
    ref="element"
    data-slot="calendar-week-header"
    :class="cn(calendarWeekHeaderClassName, normalizeClass(attrs.class))"
  >
    <div v-for="item in items" :key="item.index" data-slot="calendar-week-head">
      <slot v-bind="item">{{ item.label }}</slot>
    </div>
  </div>
</template>
