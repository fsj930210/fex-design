<script setup lang="ts">
import { usePickerAppearance } from './appearance-context'
const appearance = usePickerAppearance()
import { pickerContainerKey } from './container-context'
import { inject, normalizeClass, useAttrs } from 'vue'
import { cn } from '@fex-design/utils'
import { datePickerContentClassName } from '@fex-design/components-styles/date-picker'
import { PopoverContent, PopoverPortal } from '../popover'
import { popoverKey } from '../popover/context'
defineOptions({ name: 'DatePickerContent', inheritAttrs: false })
const attrs = useAttrs()
const popover = inject(popoverKey, null)
const containerScope = inject(pickerContainerKey, null)
</script>
<template>
  <PopoverPortal v-if="popover && (!containerScope || popover !== containerScope.parentPopover)"
    ><PopoverContent
      v-bind="attrs"
      data-slot="date-picker-content"
      :class="
        cn(
          datePickerContentClassName,
          appearance().popoverProps?.classNames?.root,
          normalizeClass(attrs.class),
        )
      "
      :style="[appearance().popoverProps?.styles?.root, attrs.style]"
      ><slot /></PopoverContent
  ></PopoverPortal>
  <div
    v-else
    v-bind="attrs"
    data-slot="date-picker-content"
    :class="
      cn(
        datePickerContentClassName,
        appearance().popoverProps?.classNames?.root,
        normalizeClass(attrs.class),
      )
    "
    :style="[appearance().popoverProps?.styles?.root, attrs.style]"
  >
    <slot />
  </div>
</template>
