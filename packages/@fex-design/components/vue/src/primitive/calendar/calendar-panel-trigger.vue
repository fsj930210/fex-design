<script setup lang="ts">
import { callCalendarHandler } from './events'
import { cn } from '@fex-design/utils'
import { normalizeClass, useAttrs, useTemplateRef } from 'vue'
import type { CalendarPanel } from '@fex-design/core/calendar'
import { calendarPanelTriggerClassName } from '@fex-design/components-styles/calendar'
import { useCalendarContext } from './context'
defineOptions({ name: 'CalendarPanelTrigger', inheritAttrs: false })
const props = defineProps<{ panel: CalendarPanel }>()
const attrs = useAttrs()
function nativeAttrs() {
  const { onClick, ...remaining } = attrs
  return remaining
}
const context = useCalendarContext('CalendarPanelTrigger')
function click(event: MouseEvent) {
  callCalendarHandler(attrs.onClick, event)
  if (!event.defaultPrevented) context.controller.setPanel(props.panel)
}
const element = useTemplateRef<HTMLButtonElement>('element')
defineExpose({ element })
</script>
<template><button v-bind="nativeAttrs()" ref="element" type="button" data-slot="calendar-panel-trigger" :data-panel="panel" :class="cn(calendarPanelTriggerClassName, normalizeClass(attrs.class))" @click="click"><slot /></button></template>
