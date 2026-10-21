<script setup lang="ts">
import { computed, normalizeClass, useAttrs, useTemplateRef } from 'vue'
import {
  getCalendarUIOptions,
  type CalendarUIOptions,
  type CalendarDate,
  type CalendarSelectInfo,
  type CalendarUIPanel,
  type CalendarCell,
  type CalendarRenderContext,
  type CalendarCellRenderContext,
} from '@fex-design/core/calendar'
import { calendarUIRootClassName } from '@fex-design/components-styles/calendar'
import { cn } from '@fex-design/utils'
import { CalendarRoot } from '../../primitive/calendar'
import CalendarContent from './calendar-content.vue'
import type { CalendarAppearance } from './types'
defineOptions({ name: 'Calendar', inheritAttrs: false })
const props = withDefaults(
  defineProps<
    Omit<
      CalendarUIOptions,
      | 'onChange'
      | 'onSelect'
      | 'onPanelChange'
      | 'onViewDateChange'
      | 'onCellSelect'
      | 'onCellHover'
    > &
      CalendarAppearance & { headerRender?: false | undefined }
  >(),
  { fullscreen: true, showWeek: false, headerRender: undefined },
)
const emit = defineEmits<{
  change: [value: CalendarDate]
  select: [value: CalendarDate, info: CalendarSelectInfo]
  panelChange: [panel: CalendarUIPanel]
  viewDateChange: [date: CalendarDate]
  cellSelect: [cell: CalendarCell]
  cellHover: [cell: CalendarCell]
}>()
defineSlots<{
  header?: (context: CalendarRenderContext) => unknown
  cell?: (context: CalendarCellRenderContext) => unknown
  fullCell?: (context: CalendarCellRenderContext) => unknown
  footer?: (context: CalendarRenderContext) => unknown
}>()
const attrs = useAttrs()
const root = useTemplateRef<{ element: HTMLDivElement | null }>('root')
const element = computed(() => root.value?.element ?? null)
defineExpose({ element })
const options = computed(() =>
  getCalendarUIOptions({
    ...props,
    onChange: (value) => emit('change', value),
    onSelect: (value, info) => emit('select', value, info),
    onPanelChange: (panel) => emit('panelChange', panel),
    onViewDateChange: (date) => emit('viewDateChange', date),
    onCellSelect: (cell) => emit('cellSelect', cell),
    onCellHover: (cell) => emit('cellHover', cell),
  }),
)
</script>
<template>
  <CalendarRoot
    ref="root"
    v-bind="{ ...attrs, ...options }"
    :class="cn(calendarUIRootClassName, normalizeClass(attrs.class))"
    :data-fullscreen="fullscreen !== false"
  >
    <CalendarContent
      :header-props="headerProps"
      :options="props"
      :class-names="classNames"
      :styles="styles"
      :header-render="headerRender"
    >
      <template v-if="$slots.header" #header="context"
        ><slot name="header" v-bind="context"
      /></template>
      <template v-if="$slots.cell" #cell="context"><slot name="cell" v-bind="context" /></template>
      <template v-if="$slots.fullCell" #fullCell="context"
        ><slot name="fullCell" v-bind="context"
      /></template>
      <template v-if="$slots.footer" #footer="context"
        ><slot name="footer" v-bind="context"
      /></template>
    </CalendarContent>
  </CalendarRoot>
</template>
