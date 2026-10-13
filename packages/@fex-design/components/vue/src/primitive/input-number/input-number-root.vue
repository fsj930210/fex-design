<script setup lang="ts">
import { inputNumberRootClassName } from '@fex-design/components-styles/input-number'
import { cn } from '@fex-design/utils'
import type { InputNumberFormatter, InputNumberParser } from '@fex-design/core/input-number/types'
import { getCurrentInstance, provide } from 'vue'
import { InputRoot } from '../input'
import { inputNumberContextKey } from './context'
import { useInputNumber } from './use-input-number'

defineOptions({ name: 'InputNumberRoot', inheritAttrs: false })
const props = withDefaults(
  defineProps<{
    controlled?: boolean | undefined
    value?: number | undefined
    defaultValue?: number | undefined
    min?: number | undefined
    max?: number | undefined
    step?: number | undefined
    precision?: number | undefined
    parser?: InputNumberParser | undefined
    formatter?: InputNumberFormatter | undefined
    disabled?: boolean | undefined
    readOnly?: boolean | undefined
    keyboard?: boolean | undefined
    size?: 'sm' | 'md' | 'lg' | undefined
    variant?: 'outlined' | 'filled' | 'borderless' | 'underlined' | undefined
    class?: string | undefined
  }>(),
  { controlled: undefined, step: 1, keyboard: true },
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
    :class="cn(inputNumberRootClassName, props.class)"
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
