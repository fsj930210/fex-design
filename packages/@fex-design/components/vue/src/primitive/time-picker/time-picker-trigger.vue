<script setup lang="ts">
import { timePickerAffixClassName } from '@fex-design/components-styles/time-picker'
import { computed, inject, useAttrs, type InputHTMLAttributes } from 'vue'
import type { InputSize, InputVariant } from '@fex-design/core/input/types'
import { ClockIcon } from '@fex-design/vue/icons/clock'
import { InputClear, InputControl, InputPrefix, InputRoot, InputSuffix } from '../input'
import PopoverTrigger from '../popover/popover-trigger.vue'
import { timePickerContextKey } from './context'

defineOptions({ name: 'TimePickerTrigger', inheritAttrs: false })
const attrs = useAttrs()
const props = withDefaults(
  defineProps<{ size?: InputSize; variant?: InputVariant; allowClear?: boolean; placeholder?: string; invalid?: boolean; inputProps?: Omit<InputHTMLAttributes, 'value' | 'defaultValue'> }>(),
  { allowClear: true, invalid: false },
)
const injectedContext = inject(timePickerContextKey)
if (!injectedContext) throw new Error('TimePickerTrigger must be used inside TimePickerRoot.')
const context = injectedContext as NonNullable<typeof injectedContext>
const canClear = computed(() => props.allowClear && Boolean(context.snapshot.value.inputValue) && !context.disabled.value && !context.readOnly.value)
const input = context.controller.input
const clear = context.controller.clear
</script>
<template>
  <PopoverTrigger v-bind="attrs" v-slot="trigger">
    <slot v-if="$slots.default" :props="trigger.props" :ref="trigger.ref" :state="context" />
    <InputRoot v-else v-bind="trigger.props" :ref="trigger.ref" @focusin="trigger.props.onFocus" @focusout="trigger.props.onBlur"
        :size="size" :variant="variant"
        :value="context.snapshot.value.inputValue"
        :disabled="context.disabled.value"
        :read-only="context.readOnly.value"
        @value-change="input"
        @clear="clear"
      >
        <InputPrefix v-if="$slots.prefix"><slot name="prefix" /></InputPrefix>
        <InputControl
          aria-label="Time"
          v-bind="inputProps"
          :aria-invalid="invalid || inputProps?.['aria-invalid'] || undefined"
          :placeholder="placeholder ?? inputProps?.placeholder ?? context.format.value"
        />
        <div data-slot="time-picker-affix" :class="timePickerAffixClassName">
          <InputSuffix><slot name="suffix"><ClockIcon class="size-4" /></slot></InputSuffix>
          <InputClear v-if="canClear" @pointerdown.stop.prevent @click.stop.prevent="clear()" />
        </div>
      </InputRoot>
  </PopoverTrigger>
</template>
