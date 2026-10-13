<script setup lang="ts">
import {
  getDatePickerHeaderLabelParts,
  getNextPanelByHeaderLabel,
} from '@fex-design/core/date-picker/panel'
import type { DatePickerHeaderLabelPart } from '@fex-design/core/date-picker/types'
import { datePickerHeaderLabelClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import { computed, ref } from 'vue'
import Button from '../button/button.vue'
import { useCalendarContext } from '../calendar/context'
import { useHeaderOwner } from './date-picker-header-owner'

const props = defineProps<{ part: DatePickerHeaderLabelPart; class?: string }>()
const owner = useHeaderOwner('DatePickerHeaderLabel')
const calendar = useCalendarContext('DatePickerHeaderLabel')
const hovered = ref(false)
const visible = computed(() =>
  getDatePickerHeaderLabelParts(owner.picker, calendar.state.value.panel).includes(props.part),
)
const label = computed(() => {
  if (props.part === 'month') return `${calendar.state.value.viewDate.month}月`
  const decadeStart = Math.floor(calendar.state.value.viewDate.year / 10) * 10
  return calendar.state.value.panel === 'decade'
    ? `${decadeStart}-${decadeStart + 9}年`
    : `${calendar.state.value.viewDate.year}年`
})

function selectPanel(event: Event) {
  if (event.defaultPrevented) return
  const nextPanel = getNextPanelByHeaderLabel(props.part)
  calendar.controller.setPanel(nextPanel)
}
</script>

<template>
  <Button
    v-if="visible"
    data-slot="date-picker-header-label"
    :data-part="props.part"
    :data-hovered="hovered ? 'true' : undefined"
    :class="cn(datePickerHeaderLabelClassName, props.class)"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    @click="selectPanel"
  >
    <slot>{{ label }}</slot>
  </Button>
</template>
