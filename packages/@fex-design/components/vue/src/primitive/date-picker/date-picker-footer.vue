<script setup lang="ts">
import { usePickerAppearance } from './appearance-context'
const appearance = usePickerAppearance()
import { computed, normalizeClass, useAttrs } from 'vue'
import { cn } from '@fex-design/utils'
import { getPickerContentKind } from '@fex-design/core/date-picker/view'
import { datePickerFooterClassName } from '@fex-design/components-styles/date-picker'
import { createDatePickerFooterActions } from './date-picker-footer-owner'
import { FooterContent, type DatePickerFooterContent } from './footer-content'
import DatePickerToday from './date-picker-today.vue'
import DatePickerCancel from './date-picker-cancel.vue'
import DatePickerConfirm from './date-picker-confirm.vue'
defineOptions({ name: 'DatePickerFooter', inheritAttrs: false })
// VNodeChild includes boolean; preserve omission instead of Vue casting it to false.
const props = withDefaults(defineProps<{ content?: DatePickerFooterContent }>(), { content: undefined })
const attrs = useAttrs()
const owner = createDatePickerFooterActions()
const actions = computed(() => ({ canConfirm: owner.canConfirm.value, close: owner.close, clear: owner.clear, confirm: owner.confirm, cancel: owner.cancel, today: owner.today }))
</script>
<template>
  <div v-if="getPickerContentKind(props.content) !== 'hidden'" v-bind="attrs" data-slot="date-picker-footer" :class="cn(datePickerFooterClassName, appearance().classNames?.footer, normalizeClass(attrs.class))" :style="[appearance().styles?.footer, attrs.style]">
    <slot v-if="props.content === undefined && $slots.default" v-bind="actions" />
    <FooterContent v-else-if="getPickerContentKind(props.content) === 'custom'" :content="props.content" :actions="actions" />
    <template v-else>
      <DatePickerToday :class="appearance().classNames?.today" :style="appearance().styles?.today" />
      <DatePickerCancel :class="appearance().classNames?.cancel" :style="appearance().styles?.cancel" v-if="owner.footerView.showCancel" />
      <DatePickerConfirm :class="appearance().classNames?.confirm" :style="appearance().styles?.confirm" v-if="owner.footerView.showConfirm" />
    </template>
  </div>
</template>
