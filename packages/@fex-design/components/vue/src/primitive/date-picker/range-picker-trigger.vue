<script setup lang="ts">
import { computed, normalizeClass, useSlots, watch } from 'vue'
import { usePickerAppearance } from './appearance-context'
import type { DatePickerInputProps, DatePickerEndpointProps } from './appearance.types'
import { getPickerInputProps, getPickerControlProps } from '@fex-design/core/date-picker/safe-props'
import { RenderContent } from './render-content'
import { getDatePickerInputAttributes } from '@fex-design/core/date-picker/input'

import {
  getRangePickerInputPlaceholder,
  getRangePickerSeparator,
} from '@fex-design/core/date-picker/view'
import type { InputSize, InputVariant } from '@fex-design/core/input/types'
import { useAttrs } from 'vue'
import { cn } from '@fex-design/utils'
import { CalendarIcon } from '@fex-design/vue/icons/calendar'
import { InputRoot, InputControl, InputClear, InputPrefix, InputSuffix } from '../input'
import { useRangePickerContext } from './context'
import { usePickerTrigger } from './use-picker-trigger'
import {
  datePickerAffixClassName,
  datePickerRangeFieldClassName,
  datePickerRangeTriggerClassName,
  datePickerInputPreviewClassName,
  datePickerRangeInputClassName,
  datePickerRangeInputControlClassName,
  datePickerRangeSeparatorClassName,
} from '@fex-design/components-styles/date-picker'

defineOptions({ name: 'RangePickerTrigger', inheritAttrs: false })
const props = defineProps<{
  size?: InputSize
  variant?: InputVariant
  startPlaceholder?: string
  endPlaceholder?: string
  startInputProps?: DatePickerEndpointProps
  endInputProps?: DatePickerEndpointProps
  separator?: string
  inputProps?: DatePickerInputProps
}>()
const context = useRangePickerContext('RangePickerTrigger')
const attrs = useAttrs()
const appearance = usePickerAppearance()
const input = computed(() => getPickerInputProps(props.inputProps ?? appearance().inputProps))
const start = computed(() =>
  getPickerControlProps(input.value, props.startInputProps ?? appearance().startInputProps, true),
)
const end = computed(() =>
  getPickerControlProps(input.value, props.endInputProps ?? appearance().endInputProps, true),
)
const trigger = usePickerTrigger(context, attrs)
const slots = useSlots()
// Wait for the input DOM before applying a core endpoint focus request.
watch(
  () => context.focusRequest,
  (request) => {
    if (request && context.open.value && !slots.default) trigger.focusInput(request.part)
  },
  { flush: 'post' },
)
</script>

<template>
  <slot v-if="$slots.default" :props="trigger.props.value" :ref="trigger.ref" :state="context" />
  <InputRoot
    v-else
    :size="props.size ?? input.size ?? 'md'"
    :variant="props.variant ?? input.variant ?? 'outlined'"
    :style="[input.styles?.root, input.style, attrs.style]"
    v-bind="trigger.props.value"
    :ref="trigger.ref"
    :class="
      cn(
        datePickerRangeTriggerClassName,
        input.classNames?.root,
        normalizeClass(input.class),
        normalizeClass(attrs.class),
      )
    "
    :value="''"
    :disabled="context.disabled"
    :read-only="true"
  >
    <div :class="datePickerRangeFieldClassName">
      <InputPrefix
        v-if="input.prefix != null"
        :class="input.classNames?.prefix"
        :style="input.styles?.prefix"
        ><RenderContent :value="input.prefix"
      /></InputPrefix>
      <InputRoot
        data-range-part="start"
        :value="context.startText.value"
        :disabled="context.disabled"
        :read-only="true"
        :class="datePickerRangeInputClassName"
        :data-active="
          context.open.value && context.activePart.value === 'start' ? 'true' : undefined
        "
      >
        <InputControl
          v-bind="getDatePickerInputAttributes(start)"
          :class="
            cn(
              datePickerRangeInputControlClassName,
              context.triggerView.startPreview && datePickerInputPreviewClassName,
              input.classNames?.control,
              normalizeClass(start.class),
            )
          "
          :style="[input.styles?.control, start.style]"
          :placeholder="
            getRangePickerInputPlaceholder('start', props.startPlaceholder ?? start.placeholder)
          "
          @focus="(event) => trigger.focus(event, 'start')"
        />
      </InputRoot>
    </div>
    <span
      aria-hidden="true"
      :data-default-separator="props.separator == null ? 'true' : undefined"
      :class="cn(datePickerRangeSeparatorClassName, appearance().classNames?.separator)"
      :style="appearance().styles?.separator"
      >{{ getRangePickerSeparator(props.separator) }}</span
    >
    <div :class="datePickerRangeFieldClassName">
      <InputRoot
        data-range-part="end"
        :value="context.endText.value"
        :disabled="context.disabled"
        :read-only="true"
        :class="datePickerRangeInputClassName"
        :data-active="context.open.value && context.activePart.value === 'end' ? 'true' : undefined"
      >
        <InputControl
          v-bind="getDatePickerInputAttributes(end)"
          :class="
            cn(
              datePickerRangeInputControlClassName,
              context.triggerView.endPreview && datePickerInputPreviewClassName,
              input.classNames?.control,
              normalizeClass(end.class),
            )
          "
          :style="[input.styles?.control, end.style]"
          :placeholder="
            getRangePickerInputPlaceholder('end', props.endPlaceholder ?? end.placeholder)
          "
          @focus="(event) => trigger.focus(event, 'end')"
        />
      </InputRoot>
      <div data-slot="date-picker-affix" :class="datePickerAffixClassName">
        <InputSuffix :class="input.classNames?.suffix" :style="input.styles?.suffix"
          ><slot v-if="$slots.suffix" name="suffix" /><RenderContent
            v-else-if="input.suffix != null"
            :value="input.suffix" /><CalendarIcon v-else class="size-4"
        /></InputSuffix>
        <InputClear
          :class="input.classNames?.clear"
          :style="input.styles?.clear"
          aria-label="清除日期"
          v-if="context.canClear"
          @pointerdown.stop.prevent
          @click.stop.prevent="context.clear()"
        />
      </div>
    </div>
  </InputRoot>
</template>
