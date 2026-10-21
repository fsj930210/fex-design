<script setup lang="ts" generic="TValue extends number | TimePeriod">
import { getNextTimeOption } from '@fex-design/core/time-picker/navigation'
import { getTimePickerScrollBehavior } from '@fex-design/core/time-picker/scroll'

import type { TimePeriod, TimePickerOption } from '@fex-design/core/time-picker/types'
import {
  timePickerColumnClassName,
  timePickerColumnItemClassName,
  timePickerColumnSpacerClassName,
  timePickerColumnViewportClassName,
} from '@fex-design/components-styles/time-picker'
import type { StyleValue } from 'vue'
import { cn } from '@fex-design/utils'
import { inject, nextTick, ref, useAttrs, watch, normalizeClass } from 'vue'
import { usePopoverContext } from '../popover/context'
import { timePickerContextKey } from './context'
import {
  ScrollbarBar,
  ScrollbarRoot,
  ScrollbarViewport,
  ScrollbarTrack,
  ScrollbarThumb,
} from '../scrollbar'

defineOptions({ name: 'TimePickerColumn', inheritAttrs: false })
const props = withDefaults(
  defineProps<{
    itemClassName?: string
    itemStyle?: StyleValue
    selectedItemClassName?: string
    selectedItemStyle?: StyleValue
    scrollbarProps?:
      | Omit<InstanceType<typeof ScrollbarRoot>['$props'], 'disabled' | 'overflow'>
      | undefined
    options: readonly TimePickerOption<TValue>[]
    selectedValue?: TValue | undefined
    disabled?: boolean | undefined
  }>(),
  { disabled: false },
)
const emit = defineEmits<{ select: [value: TValue] }>()
const context = inject(timePickerContextKey)
if (!context) throw new Error('TimePickerColumn must be used inside TimePickerRoot.')
const { snapshot: popoverSnapshot } = usePopoverContext('TimePickerColumn')
const attrs = useAttrs()
const viewport = ref<{ element: HTMLDivElement | null }>()
const itemElements = new Map<TValue, HTMLButtonElement>()
const activeValue = ref<TValue>()

function register(value: TValue, element: unknown) {
  if (element instanceof HTMLButtonElement) itemElements.set(value, element)
  else itemElements.delete(value)
}

function scrollSelected(behavior: ScrollBehavior) {
  const item = props.selectedValue === undefined ? undefined : itemElements.get(props.selectedValue)
  if (item && viewport.value?.element)
    viewport.value.element.scrollTo({
      top: item.offsetTop,
      behavior: getTimePickerScrollBehavior(behavior),
    })
}

// Scrolling is an imperative DOM boundary and runs only after Vue has committed items.
watch(
  [
    () => props.selectedValue,
    () => context.snapshot.value.scrollRequest?.id,
    () => popoverSnapshot.value.open,
  ],
  async () => {
    await nextTick()
    scrollSelected(context.snapshot.value.scrollRequest?.behavior ?? 'auto')
  },
  { immediate: true },
)

function move(direction: 1 | -1) {
  if (context.disabled.value || props.disabled || context.readOnly.value) return
  const next = getNextTimeOption(props.options, activeValue.value, props.selectedValue, direction)
  if (next === undefined) return
  activeValue.value = next
  itemElements.get(next)?.focus()
}
function keydown(event: KeyboardEvent) {
  if (event.defaultPrevented || context.disabled.value || props.disabled || context.readOnly.value)
    return
  if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
  event.preventDefault()
  move(event.key === 'ArrowDown' ? 1 : -1)
}
</script>

<template>
  <ScrollbarRoot
    v-bind="{ ...attrs, ...scrollbarProps }"
    :style="[attrs.style as StyleValue, scrollbarProps?.style]"
    :disabled="context.disabled.value || disabled"
    role="listbox"
    :tabindex="context.disabled.value || disabled ? -1 : 0"
    :aria-disabled="context.disabled.value || disabled || undefined"
    @keydown="keydown"
    data-slot="time-picker-column"
    :data-disabled="context.disabled.value || disabled ? 'true' : undefined"
    :class="
      cn(
        timePickerColumnClassName,
        normalizeClass(attrs.class),
        normalizeClass(scrollbarProps?.class),
      )
    "
  >
    <ScrollbarViewport
      ref="viewport"
      :overflow="{ x: 'hidden' }"
      :class="timePickerColumnViewportClassName"
    >
      <template v-for="item in options" :key="String(item.value)">
        <button
          :ref="(element) => register(item.value, element)"
          type="button"
          role="option"
          tabindex="-1"
          :disabled="context.disabled.value || disabled || item.disabled"
          :aria-selected="item.value === selectedValue"
          :data-selected="item.value === selectedValue ? 'true' : undefined"
          :data-active="item.value === activeValue ? 'true' : undefined"
          :data-disabled="item.disabled ? 'true' : undefined"
          :class="
            cn(
              timePickerColumnItemClassName,
              itemClassName,
              Object.is(item.value, selectedValue) && selectedItemClassName,
            )
          "
          :style="[itemStyle, Object.is(item.value, selectedValue) && selectedItemStyle]"
          @focus="activeValue = item.value"
          @click="
            () => {
              if (
                !context.disabled.value &&
                !context.readOnly.value &&
                !disabled &&
                !item.disabled
              ) {
                activeValue = item.value
                emit('select', item.value)
              }
            }
          "
        >
          <slot
            name="item"
            :item="item"
            :selected="item.value === selectedValue"
            :active="item.value === activeValue"
            >{{ item.label }}</slot
          >
        </button>
      </template>
      <div aria-hidden="true" :class="timePickerColumnSpacerClassName" />
    </ScrollbarViewport>
    <ScrollbarBar axis="y">
      <ScrollbarTrack axis="y">
        <ScrollbarThumb axis="y" />
      </ScrollbarTrack>
    </ScrollbarBar>
  </ScrollbarRoot>
</template>
