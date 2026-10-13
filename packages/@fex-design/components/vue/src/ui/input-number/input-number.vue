<script setup lang="ts">
import type {
  InputNumberFormatter,
  InputNumberParser,
  InputNumberPart,
} from '@fex-design/core/input-number/types'
import { getCurrentInstance, type StyleValue } from 'vue'
import { InputPrefix, InputSuffix } from '@fex-design/vue/primitive/input'
import {
  InputNumberActions,
  InputNumberClear,
  InputNumberControl,
  InputNumberDecrement,
  InputNumberIncrement,
  InputNumberRoot,
} from '@fex-design/vue/primitive/input-number'
defineOptions({ name: 'InputNumber', inheritAttrs: false })
const props = withDefaults(
  defineProps<{
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
    clearable?: boolean | undefined
    controls?: boolean | undefined
    size?: 'sm' | 'md' | 'lg' | undefined
    variant?: 'outlined' | 'filled' | 'borderless' | 'underlined' | undefined
    class?: string | undefined
    classNames?: Partial<Record<InputNumberPart, string>> | undefined
    styles?: Partial<Record<InputNumberPart, StyleValue>> | undefined
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
    :style="[props.styles?.root, $attrs.style as StyleValue]"
    @change="(event, value) => emit('change', event, value)"
  >
    <InputPrefix v-if="slots.prefix" :class="props.classNames?.prefix" :style="props.styles?.prefix"
      ><slot name="prefix"
    /></InputPrefix>
    <InputNumberControl
      v-bind="{ ...$attrs, style: undefined }"
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
