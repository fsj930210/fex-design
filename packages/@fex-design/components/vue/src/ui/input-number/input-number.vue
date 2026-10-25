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
    controlProps?: Omit<InstanceType<typeof InputNumberControl>['$props'], 'children'> | undefined
    actionsProps?: Omit<InstanceType<typeof InputNumberActions>['$props'], 'children'> | undefined
    incrementProps?:
      | Omit<InstanceType<typeof InputNumberIncrement>['$props'], 'children'>
      | undefined
    decrementProps?:
      | Omit<InstanceType<typeof InputNumberDecrement>['$props'], 'children'>
      | undefined
    clearProps?: Omit<InstanceType<typeof InputNumberClear>['$props'], 'children'> | undefined
    prefixProps?: Omit<InstanceType<typeof InputPrefix>['$props'], 'children'> | undefined
    suffixProps?: Omit<InstanceType<typeof InputSuffix>['$props'], 'children'> | undefined
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
    :data-warning="
      typeof $attrs['data-warning'] === 'string' ? ($attrs['data-warning'] as string) : undefined
    "
    @change="(event, value) => emit('change', event, value)"
  >
    <InputPrefix
      v-if="slots.prefix"
      v-bind="prefixProps"
      :class="[props.classNames?.prefix, prefixProps?.class]"
      :style="[props.styles?.prefix, prefixProps?.style]"
      ><slot name="prefix"
    /></InputPrefix>
    <InputNumberControl
      v-bind="{ ...$attrs, ...props.controlProps, style: undefined }"
      :class="[props.classNames?.control, props.controlProps?.class]"
      :style="[props.styles?.control, props.controlProps?.style]"
    />
    <InputNumberClear
      v-bind="props.clearProps"
      v-if="props.clearable"
      :class="[props.classNames?.clear, props.clearProps?.class]"
      :style="[props.styles?.clear, props.clearProps?.style]"
    />
    <InputSuffix
      v-if="slots.suffix"
      v-bind="suffixProps"
      :class="[props.classNames?.suffix, suffixProps?.class]"
      :style="[props.styles?.suffix, suffixProps?.style]"
      ><slot name="suffix"
    /></InputSuffix>
    <InputNumberActions
      v-bind="props.actionsProps"
      v-if="props.controls"
      :class="[props.classNames?.actions, props.actionsProps?.class]"
      :style="[props.styles?.actions, props.actionsProps?.style]"
    >
      <InputNumberIncrement
        v-bind="props.incrementProps"
        v-if="slots.increment"
        :class="[props.classNames?.increment, props.incrementProps?.class]"
        :style="[props.styles?.increment, props.incrementProps?.style]"
        ><slot name="increment"
      /></InputNumberIncrement>
      <InputNumberIncrement
        v-bind="props.incrementProps"
        v-else
        :class="[props.classNames?.increment, props.incrementProps?.class]"
        :style="[props.styles?.increment, props.incrementProps?.style]"
      />
      <InputNumberDecrement
        v-bind="props.decrementProps"
        v-if="slots.decrement"
        :class="[props.classNames?.decrement, props.decrementProps?.class]"
        :style="[props.styles?.decrement, props.decrementProps?.style]"
        ><slot name="decrement"
      /></InputNumberDecrement>
      <InputNumberDecrement
        v-bind="props.decrementProps"
        v-else
        :class="[props.classNames?.decrement, props.decrementProps?.class]"
        :style="[props.styles?.decrement, props.decrementProps?.style]"
      />
    </InputNumberActions>
  </InputNumberRoot>
</template>
