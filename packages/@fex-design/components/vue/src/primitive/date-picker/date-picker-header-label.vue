<script setup lang="ts">
import { isPickerActionBlocked } from '@fex-design/core/date-picker/view'

import { getDatePickerHeaderLabel } from '@fex-design/core/date-picker/panel'
import { getDatePickerHeaderLabelParts, getNextPanelByHeaderLabel } from '@fex-design/core/date-picker/panel'
import type { DatePickerHeaderLabelPart } from '@fex-design/core/date-picker/types'
import { datePickerHeaderLabelClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import { computed, ref, useAttrs } from 'vue'
import Button from '../button/button.vue'
import { useCalendarContext } from '../calendar/context'
import { useHeaderOwner } from './date-picker-header-owner'

defineOptions({ name: 'DatePickerHeaderLabel', inheritAttrs: false })
const attrs = useAttrs()
function nativeAttrs() { const { onClick, onMouseenter, onMouseleave, ...rest } = attrs; return rest }
function hover(event: MouseEvent, next: boolean) {
  hovered.value = next
  const handlers = attrs[next ? 'onMouseenter' : 'onMouseleave']
  for (const handler of Array.isArray(handlers) ? handlers : [handlers]) if (typeof handler === 'function') handler(event)
}
function callClick(event: Event) {
  const handlers = attrs.onClick
  for (const handler of Array.isArray(handlers) ? handlers : [handlers]) if (typeof handler === 'function') handler(event)
}
const props = defineProps<{ part: DatePickerHeaderLabelPart; class?: string }>()
const owner = useHeaderOwner('DatePickerHeaderLabel')
const calendar = useCalendarContext('DatePickerHeaderLabel')
const hovered = ref(false)
const visible = computed(() =>
  getDatePickerHeaderLabelParts(owner.picker, calendar.state.value.panel).includes(props.part),
)
const label = computed(() => getDatePickerHeaderLabel(calendar.state.value.viewDate, calendar.state.value.panel, props.part, calendar.controller.getOptions().locale))

function selectPanel(event: Event) {
  callClick(event)
  if (isPickerActionBlocked(event)) return
  const nextPanel = getNextPanelByHeaderLabel(props.part)
  calendar.controller.setPanel(nextPanel)
}
</script>

<template>
  <Button v-bind="nativeAttrs()" type="button"
    :hidden="!visible || attrs.hidden === '' || Boolean(attrs.hidden)"
    data-slot="date-picker-header-label"
    :data-part="props.part"
    :data-hovered="hovered ? 'true' : undefined"
    :class="cn(datePickerHeaderLabelClassName, props.class)"
    @mouseenter="event => hover(event, true)"
    @mouseleave="event => hover(event, false)"
    @click="selectPanel"
  >
    <slot v-if="$slots.default" /><template v-else>{{ label }}</template>
  </Button>
</template>
