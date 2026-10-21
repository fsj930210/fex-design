<script setup lang="ts">
import { callCalendarHandler } from './events'
import { cn } from '@fex-design/utils'
import { normalizeClass, useAttrs, useTemplateRef } from 'vue'
import type { CalendarNavigationAction } from '@fex-design/core/calendar'
import { calendarNavigationButtonClassName } from '@fex-design/components-styles/calendar'
import { useCalendarContext } from './context'
import { ChevronLeftIcon, ChevronRightIcon } from '../../icons/chevron'
defineOptions({ name: 'CalendarNavigationButton', inheritAttrs: false })
const props = defineProps<{ action: CalendarNavigationAction }>()
const attrs = useAttrs()
function nativeAttrs() {
  const { onClick, ...remaining } = attrs
  return remaining
}
const context = useCalendarContext('CalendarNavigationButton')
function click(event: MouseEvent) {
  callCalendarHandler(attrs.onClick, event)
  if (!event.defaultPrevented) context.controller.navigate(props.action)
}
const element = useTemplateRef<HTMLButtonElement>('element')
defineExpose({ element })
</script>
<template>
  <button
    v-bind="nativeAttrs()"
    ref="element"
    type="button"
    data-slot="calendar-navigation-button"
    :data-action="action"
    :class="cn(calendarNavigationButtonClassName, normalizeClass(attrs.class))"
    @click="click"
  >
    <slot
      ><ChevronLeftIcon
        v-if="action.startsWith('previous')"
        class="size-4 rtl:rotate-180" /><ChevronRightIcon
        v-else-if="action.startsWith('next')"
        class="size-4 rtl:rotate-180"
    /></slot>
  </button>
</template>
