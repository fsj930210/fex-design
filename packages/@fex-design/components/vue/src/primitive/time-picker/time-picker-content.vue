<script setup lang="ts">
import { useAttrs, normalizeClass } from 'vue'
import { getTimePickerDirection } from '@fex-design/core/time-picker/scroll'
import { usePopoverContext } from '../popover/context'
import { cn } from '@fex-design/utils'
import { PopoverContent } from '../popover'
defineOptions({ name: 'TimePickerContent', inheritAttrs: false })
const attrs = useAttrs()
const { triggerElement } = usePopoverContext('TimePickerContent')
</script>
<template>
  <PopoverContent
    v-bind="attrs"
    :dir="attrs.dir ?? getTimePickerDirection(triggerElement)"
    :class="cn('overflow-hidden p-0', normalizeClass(attrs.class))"
    :style="[
      {
        width: 'var(--floating-reference-width)',
        maxWidth: 'var(--floating-available-width)',
        maxHeight: 'var(--floating-available-height)',
      },
      attrs.style,
    ]"
  >
    <slot />
  </PopoverContent>
</template>
