<script setup lang="ts">
import { computed, useAttrs, useTemplateRef } from 'vue'
import { cn } from '@fex/utils'
import { CircleXIcon } from '../../icon/circle-x'
import {
  InputAddonAfter,
  InputAddonBefore,
  InputClear,
  InputControl,
  InputGroup,
  InputPrefix,
  InputRoot,
  InputSuffix,
} from '../../primitive/input/input'
import type { InputProps } from './input.types'

defineOptions({ name: 'Input', inheritAttrs: false })
const props = withDefaults(defineProps<InputProps>(), {
  defaultValue: '',
  size: 'md',
  variant: 'outlined',
  clearable: false,
})
const emit = defineEmits<{ 'update:modelValue': [value: string]; clear: [] }>()
const attrs = useAttrs()
const control = useTemplateRef<{ focus: () => void; blur: () => void; select: () => void }>(
  'control',
)
const rootClass = computed(() => cn(props.classNames?.root, attrs.class as string | undefined))
defineExpose({
  focus: () => control.value?.focus(),
  blur: () => control.value?.blur(),
  select: () => control.value?.select(),
})
</script>

<template>
  <InputGroup v-if="$slots.addonBefore || $slots.addonAfter">
    <InputAddonBefore
      v-if="$slots.addonBefore"
      :class="classNames?.addonBefore"
      :style="styles?.addonBefore"
      ><slot name="addonBefore"
    /></InputAddonBefore>
    <InputRoot
      :value="modelValue"
      :default-value="defaultValue"
      :disabled="disabled"
      :read-only="readonly"
      :size="size"
      :variant="variant"
      :class="rootClass"
      :style="[styles?.root, attrs.style]"
      @value-change="emit('update:modelValue', $event)"
      @clear="emit('clear')"
    >
      <InputPrefix v-if="$slots.prefix" :class="classNames?.prefix" :style="styles?.prefix"
        ><slot name="prefix"
      /></InputPrefix>
      <InputControl
        v-bind="attrs"
        ref="control"
        :class="classNames?.control"
        :style="styles?.control"
      />
      <InputClear v-if="clearable" :class="classNames?.clear" :style="styles?.clear"
        ><slot name="clear"><CircleXIcon /></slot
      ></InputClear>
      <InputSuffix v-if="$slots.suffix" :class="classNames?.suffix" :style="styles?.suffix"
        ><slot name="suffix"
      /></InputSuffix>
    </InputRoot>
    <InputAddonAfter
      v-if="$slots.addonAfter"
      :class="classNames?.addonAfter"
      :style="styles?.addonAfter"
      ><slot name="addonAfter"
    /></InputAddonAfter>
  </InputGroup>
  <InputRoot
    v-else
    :value="modelValue"
    :default-value="defaultValue"
    :disabled="disabled"
    :read-only="readonly"
    :size="size"
    :variant="variant"
    :class="rootClass"
    :style="[styles?.root, attrs.style]"
    @value-change="emit('update:modelValue', $event)"
    @clear="emit('clear')"
  >
    <InputPrefix v-if="$slots.prefix" :class="classNames?.prefix" :style="styles?.prefix"
      ><slot name="prefix"
    /></InputPrefix>
    <InputControl
      v-bind="attrs"
      ref="control"
      :class="classNames?.control"
      :style="styles?.control"
    />
    <InputClear v-if="clearable" :class="classNames?.clear" :style="styles?.clear"
      ><slot name="clear"><CircleXIcon /></slot
    ></InputClear>
    <InputSuffix v-if="$slots.suffix" :class="classNames?.suffix" :style="styles?.suffix"
      ><slot name="suffix"
    /></InputSuffix>
  </InputRoot>
</template>
