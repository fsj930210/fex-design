<script setup lang="ts">
import { cn } from '@fex-design/utils'
import { normalizeClass, useAttrs, useTemplateRef } from 'vue'
import { calendarRowClassName } from '@fex-design/components-styles/calendar'
import { useCalendarContext } from './context'

const attrs = useAttrs()
defineOptions({ name: 'CalendarRow', inheritAttrs: false })
const context = useCalendarContext('CalendarRow')

const element = useTemplateRef<HTMLDivElement>('element')
defineExpose({ element })
</script>
<template>
  <div
    v-bind="attrs"
    ref="element"
    data-slot="calendar-row"
    :class="cn(calendarRowClassName, normalizeClass(attrs.class))"
    role="row"
    :data-panel="context.state.value.panel"
  >
    <slot />
  </div>
</template>
