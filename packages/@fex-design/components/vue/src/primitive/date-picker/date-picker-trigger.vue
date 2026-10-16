<script setup lang="ts">
import { computed, normalizeClass } from 'vue'
import { usePickerAppearance } from './appearance-context'
import type { DatePickerInputProps } from './appearance.types'
import { getPickerInputProps, getPickerControlProps } from '@fex-design/core/date-picker/safe-props'
import { RenderContent } from './render-content'
import { getDatePickerInputAttributes } from '@fex-design/core/date-picker/input'

import type { InputSize, InputVariant } from '@fex-design/core/input/types'
import { useAttrs } from 'vue'
import { cn } from '@fex-design/utils'
import { CalendarIcon } from '@fex-design/vue/icons/calendar'
import { InputRoot, InputControl, InputClear, InputPrefix, InputSuffix } from '../input'
import { useDatePickerContext } from './context'
import { usePickerTrigger } from './use-picker-trigger'
import DatePickerTags from './date-picker-tags.vue'
import { datePickerAffixClassName, datePickerTriggerClassName, datePickerInputPreviewClassName, datePickerMultipleTagsClassName, datePickerMultipleInputClassName } from '@fex-design/components-styles/date-picker'

defineOptions({ name: 'DatePickerTrigger', inheritAttrs: false })
const props = defineProps<{
  size?: InputSize
  variant?: InputVariant
  placeholder?: string
  inputProps?: DatePickerInputProps
}>()
const context = useDatePickerContext('DatePickerTrigger')
const attrs = useAttrs()
const appearance = usePickerAppearance()
const input = computed(() => getPickerInputProps(props.inputProps ?? appearance().inputProps))
const control = computed(() => getPickerControlProps(input.value))
const trigger = usePickerTrigger(context, attrs)
</script>

<template>
  <slot v-if="$slots.default" :props="trigger.props.value" :ref="trigger.ref" :state="context" />
    <InputRoot v-else :size="props.size ?? input.size ?? 'md'" :variant="props.variant ?? input.variant ?? 'outlined'" :style="[input.styles?.root, input.style, attrs.style]" v-bind="trigger.props.value" :ref="trigger.ref" :class="cn(datePickerTriggerClassName, input.classNames?.root, normalizeClass(input.class), normalizeClass(attrs.class))" :value="context.inputValue.value" :disabled="context.disabled" :read-only="true">
      <InputPrefix v-if="$slots.prefix || input.prefix != null" :class="input.classNames?.prefix" :style="input.styles?.prefix"><slot v-if="$slots.prefix" name="prefix" /><RenderContent v-else :value="input.prefix" /></InputPrefix>
      <DatePickerTags v-if="context.triggerView.showTags" :class="datePickerMultipleTagsClassName" />
      <InputControl v-bind="getDatePickerInputAttributes(control)" :class="cn(context.triggerView.preview && datePickerInputPreviewClassName, context.triggerView.hasTags && datePickerMultipleInputClassName, input.classNames?.control)" :style="input.styles?.control" :placeholder="context.triggerView.hasTags ? '' : (props.placeholder ?? input.placeholder ?? context.format)" @focus="trigger.focus" />
      <div data-slot="date-picker-affix" :class="datePickerAffixClassName">
        <InputSuffix :class="input.classNames?.suffix" :style="input.styles?.suffix"><slot v-if="$slots.suffix" name="suffix" /><RenderContent v-else-if="input.suffix != null" :value="input.suffix" /><CalendarIcon v-else class="size-4" /></InputSuffix>
        <InputClear :class="input.classNames?.clear" :style="input.styles?.clear" aria-label="清除日期" v-if="context.canClear" @pointerdown.stop.prevent @click.stop.prevent="context.clear()" />
      </div>
    </InputRoot>
</template>
