<script setup lang="ts">
import { watch, type StyleValue } from 'vue'
import type { InputSize, InputVariant } from '@fex-design/core/input/types'
import type { TimeRangePart } from '@fex-design/core/time-picker/range-types'
import type { TimeValue, TimePickerController } from '@fex-design/core/time-picker/types'
import { format } from '@fex-design/core/date/utils'
import { filterTimePickerInputProps } from '@fex-design/core/time-picker/input-props'
import { inputControlClassName } from '@fex-design/components-styles/input'
import {
  timePickerAffixClassName,
  timeRangePickerInputClassName,
} from '@fex-design/components-styles/time-picker'
import { cn } from '@fex-design/utils'
import { ClockIcon } from '@fex-design/vue/icons/clock'
import { InputRoot, InputPrefix, InputSuffix, InputClear } from '../input'
import TimePickerTrigger from './time-picker-trigger.vue'
import type { TimePickerInputProps } from './time-picker-input-props'
import { useTimeRangePickerContext } from './time-range-picker-context'
defineOptions({ name: 'TimeRangePickerTrigger', inheritAttrs: false })
const props = defineProps<{
  class?: string
  style?: StyleValue
  size?: InputSize
  variant?: InputVariant
  dir?: 'ltr' | 'rtl' | 'auto'
  startInputProps?: TimePickerInputProps
  endInputProps?: TimePickerInputProps
  placeholder?: readonly [string, string]
  allowClear?: boolean
}>()
const { controller, snapshot, options } = useTimeRangePickerContext()
const fields: Partial<Record<TimeRangePart, HTMLInputElement>> = {}
// Synchronize the core confirmation request after the endpoint DOM updates.
watch(
  () => snapshot.value.focusRequest,
  (request) => {
    if (snapshot.value.open && request) fields[request.part]?.focus({ preventScroll: true })
  },
  { flush: 'post' },
)
const display = (value: TimeValue | null) =>
  value
    ? format(value, options.value.format ?? (options.value.use12Hours ? 'hh:mm:ss A' : 'HH:mm:ss'))
    : ''
const native = (part: TimeRangePart) =>
  filterTimePickerInputProps(part === 'start' ? props.startInputProps : props.endInputProps)
function activate(part: TimeRangePart, time: TimePickerController) {
  controller.activate(part)
  const value = controller.getSnapshot().draft[part === 'start' ? 0 : 1]
  time.setControlledValue(value)
  time.resetInput()
  time.scrollToValue('auto')
}
function open(time: TimePickerController) {
  if (!controller.getSnapshot().open) {
    const current = controller.getSnapshot()
    time.setControlledValue(current.draft[current.activePart === 'start' ? 0 : 1])
    time.resetInput()
  }
  controller.setOpen(true)
}
</script>
<template>
  <TimePickerTrigger
    ><template #default="{ props: binding, ref: register, state }">
      <InputRoot
        v-bind="{
          ...binding,
          onClick: undefined,
          onFocus: undefined,
          onBlur: undefined,
          onFocusin: undefined,
          onFocusout: undefined,
          role: undefined,
        }"
        :ref="register"
        value=""
        :disabled="options.disabled"
        :read-only="options.readOnly"
        :class="props.class"
        :style="props.style"
        :size="size"
        :variant="variant"
        :dir="dir"
        @click.stop="open(state.controller)"
      >
        <InputPrefix v-if="$slots.prefix"><slot name="prefix" /></InputPrefix>
        <input
          :ref="
            (element) => {
              fields.start = element as HTMLInputElement | undefined
            }
          "
          v-bind="native('start')"
          type="text"
          data-slot="time-range-input"
          data-range-part="start"
          :data-active="(snapshot.open && snapshot.activePart === 'start') || undefined"
          :class="
            cn(
              inputControlClassName,
              timeRangePickerInputClassName,
              native('start').class as string | undefined,
            )
          "
          :aria-label="native('start')['aria-label'] ?? '开始时间'"
          :placeholder="placeholder?.[0] ?? '开始时间'"
          :value="
            snapshot.open && snapshot.activePart === 'start'
              ? state.snapshot.value.inputValue
              : display(snapshot.draft[0])
          "
          :disabled="options.disabled"
          :readonly="options.readOnly"
          @focus="activate('start', state.controller)"
          @blur="state.controller.resetInput()"
          @input="state.controller.input(($event.target as HTMLInputElement).value)"
        />
        <span aria-hidden="true" class="shrink-0 text-muted-foreground">→</span>
        <input
          :ref="
            (element) => {
              fields.end = element as HTMLInputElement | undefined
            }
          "
          v-bind="native('end')"
          type="text"
          data-slot="time-range-input"
          data-range-part="end"
          :data-active="(snapshot.open && snapshot.activePart === 'end') || undefined"
          :class="
            cn(
              inputControlClassName,
              timeRangePickerInputClassName,
              native('end').class as string | undefined,
            )
          "
          :aria-label="native('end')['aria-label'] ?? '结束时间'"
          :placeholder="placeholder?.[1] ?? '结束时间'"
          :value="
            snapshot.open && snapshot.activePart === 'end'
              ? state.snapshot.value.inputValue
              : display(snapshot.draft[1])
          "
          :disabled="options.disabled"
          :readonly="options.readOnly"
          @focus="activate('end', state.controller)"
          @blur="state.controller.resetInput()"
          @input="state.controller.input(($event.target as HTMLInputElement).value)"
        />
        <div data-slot="time-picker-affix" :class="timePickerAffixClassName">
          <InputSuffix
            ><slot name="suffix"><ClockIcon class="size-4" /></slot
          ></InputSuffix>
          <InputClear
            v-if="
              allowClear !== false &&
              snapshot.draft.some(Boolean) &&
              !options.disabled &&
              !options.readOnly
            "
            aria-label="清除时间范围"
            @pointerdown.stop.prevent
            @click.stop.prevent="
              state.controller.clear();
              controller.clear()
            "
          />
        </div>
      </InputRoot> </template
  ></TimePickerTrigger>
</template>
