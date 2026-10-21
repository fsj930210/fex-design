<script setup lang="ts">
import { calendarDefaultLocale } from '@fex-design/core/calendar'
import { usePickerAppearance } from './appearance-context'
import { isPickerActionBlocked } from '@fex-design/core/date-picker/view'

import { normalizeClass, useAttrs } from 'vue'
import { cn } from '@fex-design/utils'
import { datePickerTodayClassName } from '@fex-design/components-styles/date-picker'
import { Button } from '../button'
import { createDatePickerFooterActions } from './date-picker-footer-owner'
defineOptions({ name: 'DatePickerToday', inheritAttrs: false })
const owner = createDatePickerFooterActions()
const appearance = usePickerAppearance()
const attrs = useAttrs()
function nativeAttrs() {
  const { onClick, ...rest } = attrs
  return rest
}
function click(event: MouseEvent) {
  const handlers = attrs.onClick
  for (const handler of Array.isArray(handlers) ? handlers : [handlers])
    if (typeof handler === 'function') handler(event)
  if (!isPickerActionBlocked(event)) {
    owner.today()
  }
}
</script>
<template>
  <Button
    v-bind="nativeAttrs()"
    type="button"
    data-slot="date-picker-today"
    :class="cn(datePickerTodayClassName, normalizeClass(attrs.class))"
    @click="click"
    ><slot v-if="$slots.default" /><template v-else>{{
      appearance().calendarProps?.locale?.today ?? calendarDefaultLocale.today
    }}</template></Button
  >
</template>
