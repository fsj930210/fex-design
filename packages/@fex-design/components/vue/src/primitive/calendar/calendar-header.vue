<script setup lang="ts">
import { filterControlledSelectProps } from '@fex-design/core/select/component-props'
import { cn } from '@fex-design/utils'
import { computed, normalizeClass, useAttrs, useTemplateRef } from 'vue'
import {
  calendarHeaderClassName,
  calendarHeaderControlsClassName,
  calendarHeaderSelectClassName,
} from '@fex-design/components-styles/calendar'
import { useCalendarContext } from './context'
import CalendarNavigationButton from './calendar-navigation-button.vue'
import { RadioGroup, RadioButton, type RadioValue } from '../radio'
import { SelectContent, SelectRoot, SelectTrigger } from '../select'
import { getCalendarHeaderState, type CalendarHeaderState } from '@fex-design/core/calendar'
defineSlots<{ default?: (state: CalendarHeaderState) => unknown }>()
const props = defineProps<{
  yearSelectRootProps?:
    | Omit<
        InstanceType<typeof SelectRoot>['$props'],
        | 'children'
        | 'options'
        | 'value'
        | 'defaultValue'
        | 'multiple'
        | 'clearable'
        | 'onChange'
        | 'onUpdate:value'
      >
    | undefined
  monthSelectRootProps?:
    | Omit<
        InstanceType<typeof SelectRoot>['$props'],
        | 'children'
        | 'options'
        | 'value'
        | 'defaultValue'
        | 'multiple'
        | 'clearable'
        | 'onChange'
        | 'onUpdate:value'
      >
    | undefined
  previousButtonProps?:
    | Omit<InstanceType<typeof CalendarNavigationButton>['$props'], 'children' | 'action'>
    | undefined
  nextButtonProps?:
    | Omit<InstanceType<typeof CalendarNavigationButton>['$props'], 'children' | 'action'>
    | undefined
  todayButtonProps?:
    | Omit<InstanceType<typeof CalendarNavigationButton>['$props'], 'children' | 'action'>
    | undefined
  modeGroupProps?:
    | Omit<
        InstanceType<typeof RadioGroup>['$props'],
        'children' | 'value' | 'defaultValue' | 'onValueChange' | 'onUpdate:value'
      >
    | undefined
  dateModeButtonProps?:
    | Omit<InstanceType<typeof RadioButton>['$props'], 'children' | 'value'>
    | undefined
  monthModeButtonProps?:
    | Omit<InstanceType<typeof RadioButton>['$props'], 'children' | 'value'>
    | undefined
  yearSelectTriggerProps?:
    | Omit<InstanceType<typeof SelectTrigger>['$props'], 'children'>
    | undefined
  yearSelectContentProps?: InstanceType<typeof SelectContent>['$props'] | undefined
  monthSelectTriggerProps?:
    | Omit<InstanceType<typeof SelectTrigger>['$props'], 'children'>
    | undefined
  monthSelectContentProps?: InstanceType<typeof SelectContent>['$props'] | undefined
}>()
const attrs = useAttrs()
defineOptions({ name: 'CalendarHeader', inheritAttrs: false })
const context = useCalendarContext('CalendarHeader')
const header = computed(() => getCalendarHeaderState(context.state.value, context.controller))
const element = useTemplateRef<HTMLDivElement>('element')
defineExpose({ element })
function year(value: string | number | readonly (string | number)[] | undefined) {
  const next = Array.isArray(value) ? value[0] : value
  if (next !== undefined) header.value.setYear(Number(next))
}
function month(value: string | number | readonly (string | number)[] | undefined) {
  const next = Array.isArray(value) ? value[0] : value
  if (next !== undefined) header.value.setMonth(Number(next))
}
function panel(value: RadioValue) {
  if (value === 'date' || value === 'month') header.value.setPanel(value)
}
</script>
<template>
  <div
    v-bind="attrs"
    ref="element"
    data-slot="calendar-header"
    :class="cn(calendarHeaderClassName, normalizeClass(attrs.class))"
  >
    <slot v-bind="header">
      <div :class="calendarHeaderControlsClassName">
        <CalendarNavigationButton
          v-bind="props.previousButtonProps"
          action="previous-panel"
          :disabled="!header.canPrevious || props.previousButtonProps?.disabled"
          :aria-label="header.locale.previous"
        />
        <CalendarNavigationButton
          v-bind="props.nextButtonProps"
          action="next-panel"
          :disabled="!header.canNext || props.nextButtonProps?.disabled"
          :aria-label="header.locale.next"
        />
        <CalendarNavigationButton v-bind="props.todayButtonProps" action="today">{{
          header.locale.today
        }}</CalendarNavigationButton>
        <SelectRoot
          v-bind="filterControlledSelectProps(props.yearSelectRootProps)"
          :multiple="false"
          :clearable="false"
          :options="header.years"
          :value="header.viewDate.year"
          @change="year"
        >
          <SelectTrigger
            v-bind="props.yearSelectTriggerProps"
            :class="
              cn(
                calendarHeaderSelectClassName,
                props.yearSelectTriggerProps?.class as string | undefined,
              )
            "
            :aria-label="header.locale.year"
          />
          <SelectContent v-bind="props.yearSelectContentProps" />
        </SelectRoot>
        <SelectRoot
          v-bind="filterControlledSelectProps(props.monthSelectRootProps)"
          :multiple="false"
          :clearable="false"
          v-if="header.panel === 'date'"
          :options="header.months"
          :value="header.viewDate.month"
          @change="month"
        >
          <SelectTrigger
            v-bind="props.monthSelectTriggerProps"
            :class="
              cn(
                calendarHeaderSelectClassName,
                props.monthSelectTriggerProps?.class as string | undefined,
              )
            "
            :aria-label="header.locale.month"
          />
          <SelectContent v-bind="props.monthSelectContentProps" />
        </SelectRoot>
        <RadioGroup
          v-bind="{
            ...props.modeGroupProps,
            onValueChange: undefined,
            'onUpdate:value': undefined,
          }"
          :class="cn('gap-0', props.modeGroupProps?.class as string | undefined)"
          :value="header.panel"
          :aria-label="`${header.locale.datePanel}/${header.locale.monthPanel}`"
          @value-change="panel"
        >
          <RadioButton v-bind="props.dateModeButtonProps" value="date">{{
            header.locale.datePanel
          }}</RadioButton>
          <RadioButton v-bind="props.monthModeButtonProps" value="month">{{
            header.locale.monthPanel
          }}</RadioButton>
        </RadioGroup>
      </div>
    </slot>
  </div>
</template>
