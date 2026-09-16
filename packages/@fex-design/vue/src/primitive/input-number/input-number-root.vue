<script setup lang="ts">
import type { InputNumberFormatter, InputNumberParser } from '@fex-design/core/input-number/types'
import { getCurrentInstance, provide } from 'vue'
import { InputRoot } from '../input/input'
import { inputNumberContextKey } from './context'
import { useInputNumber } from './use-input-number'

defineOptions({ name: 'InputNumberRoot', inheritAttrs: false })
const props = withDefaults(
  defineProps<{
    controlled?: boolean
    value?: number
    defaultValue?: number
    min?: number
    max?: number
    step?: number
    precision?: number
    parser?: InputNumberParser
    formatter?: InputNumberFormatter
    disabled?: boolean
    readOnly?: boolean
    keyboard?: boolean
    size?: 'sm' | 'md' | 'lg'
    variant?: 'outlined' | 'filled' | 'borderless' | 'underlined'
    class?: string
  }>(),
  { step: 1, keyboard: true },
)
const emit = defineEmits<{ change: [event: Event, value: number | undefined] }>()
const hasValue = Object.prototype.hasOwnProperty.call(
  getCurrentInstance()?.vnode.props ?? {},
  'value',
)
const inputNumber = useInputNumber(() => ({
  ...props,
  controlled: props.controlled ?? hasValue,
  onChange: (event, value) => emit('change', event, value),
}))
provide(inputNumberContextKey, inputNumber)
</script>

<template>
  <InputRoot
    v-bind="$attrs"
    :value="inputNumber.draft.value"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :size="props.size"
    :variant="props.variant"
    :class="props.class"
    data-slot="input-number-root"
    :data-out-of-range="inputNumber.outOfRange.value || undefined"
    @value-change="
      (text, meta) => {
        if (meta.reason === 'input') inputNumber.input(text, meta.event)
      }
    "
  >
    <slot />
  </InputRoot>
</template>
