<script setup lang="ts">
import { getDatePickerHeaderActionLabel } from '@fex-design/core/date-picker/panel'
import { isPickerActionBlocked } from '@fex-design/core/date-picker/view'

import type { DatePickerHeaderAction } from '@fex-design/core/date-picker/types'
import { datePickerHeaderNavigationClassName } from '@fex-design/components-styles/date-picker'
import { cn } from '@fex-design/utils'
import { computed, useAttrs } from 'vue'
import { ChevronLeftIcon } from '@fex-design/vue/icons/chevron-left'
import { ChevronRightIcon } from '@fex-design/vue/icons/chevron-right'
import { ChevronsLeftIcon } from '@fex-design/vue/icons/chevrons-left'
import { ChevronsRightIcon } from '@fex-design/vue/icons/chevrons-right'
import Button from '../button/button.vue'
import { useCalendarContext } from '../calendar/context'

defineOptions({ name: 'DatePickerHeaderButton', inheritAttrs: false })
const attrs = useAttrs()
function nativeAttrs() {
  const { onClick, ...rest } = attrs
  return rest
}
function callClick(event: Event) {
  const handlers = attrs.onClick
  for (const handler of Array.isArray(handlers) ? handlers : [handlers])
    if (typeof handler === 'function') handler(event)
}
const props = defineProps<{ action: DatePickerHeaderAction; class?: string }>()
const calendar = useCalendarContext('DatePickerHeaderButton')
const isPrevious = computed(() => props.action.startsWith('previous'))
const isDouble = computed(() => props.action.includes('year') || props.action.includes('panel'))

function runAction(event: Event) {
  callClick(event)
  if (isPickerActionBlocked(event)) return
  calendar.controller.navigate(props.action)
}
</script>

<template>
  <Button
    v-bind="nativeAttrs()"
    type="button"
    data-slot="date-picker-header-button"
    :data-action="props.action"
    :aria-label="
      attrs['aria-label'] ??
      getDatePickerHeaderActionLabel(props.action, calendar.controller.getOptions().locale)
    "
    :class="cn(datePickerHeaderNavigationClassName, props.class)"
    @click="runAction"
  >
    <slot v-if="$slots.default" />
    <template v-else>
      <ChevronsLeftIcon v-if="isDouble && isPrevious" class="size-4 rtl:rotate-180" />
      <ChevronsRightIcon v-else-if="isDouble" class="size-4 rtl:rotate-180" />
      <ChevronLeftIcon v-else-if="isPrevious" class="size-4 rtl:rotate-180" />
      <ChevronRightIcon v-else class="size-4 rtl:rotate-180" />
    </template>
  </Button>
</template>
