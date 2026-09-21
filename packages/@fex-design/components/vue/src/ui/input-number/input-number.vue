<script setup lang="ts">
import type {
  InputNumberFormatter,
  InputNumberParser,
  InputNumberPart,
} from '@fex-design/core/input-number/types'
import { getCurrentInstance, type StyleValue } from 'vue'
import { InputPrefix, InputSuffix } from '@fex-design/vue/primitive/input/input'
import {
  InputNumberActions,
  InputNumberClear,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberIncrement,
  InputNumberRoot,
} from '@fex-design/vue/primitive/input-number/input-number'
defineOptions({ name: 'InputNumber', inheritAttrs: false })
const props = withDefaults(
  defineProps<{
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
    clearable?: boolean
    controls?: boolean
    size?: 'sm' | 'md' | 'lg'
    variant?: 'outlined' | 'filled' | 'borderless' | 'underlined'
    class?: string
    classNames?: Partial<Record<InputNumberPart, string>>
    styles?: Partial<Record<InputNumberPart, StyleValue>>
  }>(),
  { step: 1, keyboard: true, clearable: false, controls: true },
)
const emit = defineEmits<{ change: [event: Event, value: number | undefined] }>()
const slots = defineSlots<{
  prefix?: () => unknown
  suffix?: () => unknown
  increment?: () => unknown
  decrement?: () => unknown
}>()
const controlled = Object.prototype.hasOwnProperty.call(
  getCurrentInstance()?.vnode.props ?? {},
  'value',
)
</script>
<template>
  <InputNumberRoot
    :controlled="controlled"
    :value="props.value"
    :default-value="props.defaultValue"
    :min="props.min"
    :max="props.max"
    :step="props.step"
    :precision="props.precision"
    :parser="props.parser"
    :formatter="props.formatter"
    :disabled="props.disabled"
    :read-only="props.readOnly"
    :keyboard="props.keyboard"
    :size="props.size"
    :variant="props.variant"
    :class="[props.classNames?.root, props.class]"
    :style="props.styles?.root"
    @change="(event, value) => emit('change', event, value)"
  >
    <InputPrefix v-if="slots.prefix" :class="props.classNames?.prefix" :style="props.styles?.prefix"
      ><slot name="prefix"
    /></InputPrefix>
    <InputNumberControl
      v-bind="$attrs"
      :class="props.classNames?.control"
      :style="props.styles?.control"
    />
    <InputNumberClear
      v-if="props.clearable"
      :class="props.classNames?.clear"
      :style="props.styles?.clear"
    />
    <InputSuffix v-if="slots.suffix" :class="props.classNames?.suffix" :style="props.styles?.suffix"
      ><slot name="suffix"
    /></InputSuffix>
    <InputNumberActions
      v-if="props.controls"
      :class="props.classNames?.actions"
      :style="props.styles?.actions"
    >
      <InputNumberIncrement
        v-if="slots.increment"
        :class="props.classNames?.increment"
        :style="props.styles?.increment"
        ><slot name="increment"
      /></InputNumberIncrement>
      <InputNumberIncrement
        v-else
        :class="props.classNames?.increment"
        :style="props.styles?.increment"
      />
      <InputNumberDecrement
        v-if="slots.decrement"
        :class="props.classNames?.decrement"
        :style="props.styles?.decrement"
        ><slot name="decrement"
      /></InputNumberDecrement>
      <InputNumberDecrement
        v-else
        :class="props.classNames?.decrement"
        :style="props.styles?.decrement"
      />
    </InputNumberActions>
  </InputNumberRoot>
</template>
