<script setup lang="ts">
import { isPickerActionBlocked } from '@fex-design/core/date-picker/view'

import { normalizeClass, useAttrs } from 'vue'
import { cn } from '@fex-design/utils'
import { datePickerCancelClassName } from '@fex-design/components-styles/date-picker'
import { Button } from '../button'
import { createDatePickerFooterActions } from './date-picker-footer-owner'
defineOptions({ name: 'DatePickerCancel', inheritAttrs: false })
const owner = createDatePickerFooterActions()
const attrs = useAttrs()
function nativeAttrs() { const { onClick, ...rest } = attrs; return rest }
function click(event: MouseEvent) {
  const handlers = attrs.onClick
  for (const handler of Array.isArray(handlers) ? handlers : [handlers]) if (typeof handler === 'function') handler(event)
  if (!isPickerActionBlocked(event)) { owner.cancel() }
}
</script>
<template>
  <Button v-bind="nativeAttrs()" type="button" data-slot="date-picker-cancel" :class="cn(datePickerCancelClassName, normalizeClass(attrs.class))"  @click="click"><slot v-if="$slots.default" /><template v-else>取消</template></Button>
</template>
