<script setup lang="ts">
import { cn } from '@fex-design/utils'
import { computed, normalizeClass, useAttrs, useTemplateRef } from 'vue'
import { calendarHeaderClassName, calendarHeaderControlsClassName, calendarHeaderSelectClassName } from '@fex-design/components-styles/calendar'
import { useCalendarContext } from './context'
import CalendarNavigationButton from './calendar-navigation-button.vue'
import { RadioGroup, RadioButton, type RadioValue } from '../radio'
import { SelectContent, SelectRoot, SelectTrigger, SelectValue } from '../select'
import { getCalendarHeaderState, type CalendarHeaderState } from '@fex-design/core/calendar'
defineSlots<{ default?: (state: CalendarHeaderState) => unknown }>()
const attrs = useAttrs()
defineOptions({ name: 'CalendarHeader', inheritAttrs: false })
const context = useCalendarContext('CalendarHeader')
const header = computed(() => getCalendarHeaderState(context.state.value, context.controller))
const element = useTemplateRef<HTMLDivElement>('element')
defineExpose({ element })
function year(value: string | number | readonly (string | number)[] | undefined) { const next = Array.isArray(value) ? value[0] : value; if (next !== undefined) header.value.setYear(Number(next)) }
function month(value: string | number | readonly (string | number)[] | undefined) { const next = Array.isArray(value) ? value[0] : value; if (next !== undefined) header.value.setMonth(Number(next)) }
function panel(value: RadioValue) { if (value === 'date' || value === 'month') header.value.setPanel(value) }
</script>
<template>
  <div v-bind="attrs" ref="element" data-slot="calendar-header" :class="cn(calendarHeaderClassName, normalizeClass(attrs.class))">
    <slot v-bind="header">
      <div :class="calendarHeaderControlsClassName">
        <CalendarNavigationButton action="previous-panel" :disabled="!header.canPrevious" :aria-label="header.locale.previous" />
        <CalendarNavigationButton action="next-panel" :disabled="!header.canNext" :aria-label="header.locale.next" />
        <CalendarNavigationButton action="today">{{ header.locale.today }}</CalendarNavigationButton>
        <SelectRoot :options="header.years" :value="header.viewDate.year" @change="year">
          <SelectTrigger :class="calendarHeaderSelectClassName" :aria-label="header.locale.year"><SelectValue /></SelectTrigger>
          <SelectContent />
        </SelectRoot>
        <SelectRoot v-if="header.panel === 'date'" :options="header.months" :value="header.viewDate.month" @change="month">
          <SelectTrigger :class="calendarHeaderSelectClassName" :aria-label="header.locale.month"><SelectValue /></SelectTrigger>
          <SelectContent />
        </SelectRoot>
        <RadioGroup class="gap-0" :value="header.panel" :aria-label="`${header.locale.datePanel}/${header.locale.monthPanel}`" @value-change="panel">
          <RadioButton value="date">{{ header.locale.datePanel }}</RadioButton>
          <RadioButton value="month">{{ header.locale.monthPanel }}</RadioButton>
        </RadioGroup>
      </div>
    </slot>
  </div>
</template>
