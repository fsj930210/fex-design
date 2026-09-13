<script setup lang="ts">
import type { CheckboxValue } from '@fex-design/core/checkbox/types'
import { checkboxControlClassName } from '@fex-design/styles/checkbox'
import { cn } from '@fex/utils'
import { computed, inject, ref, useAttrs, watchEffect, type PropType } from 'vue'
import { checkboxGroupKey, checkboxRootKey } from './context'
defineOptions({ name: 'CheckboxControl', inheritAttrs: false })
const props = defineProps({
  id: String,
  value: [String, Number] as PropType<CheckboxValue>,
  checked: { type: Boolean, default: undefined },
  defaultChecked: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  indeterminate: { type: Boolean, default: false },
})
const emit = defineEmits<{ change: [event: Event] }>()
const attrs = useAttrs()
const root = inject(checkboxRootKey)
const group = inject(checkboxGroupKey, null)
const control = ref<HTMLInputElement>()
const currentValue = computed(() => props.value ?? root?.value.value)
const inGroup = computed(() => group !== null && currentValue.value !== undefined)
watchEffect(() => {
  if (control.value) control.value.indeterminate = props.indeterminate === true
})
const currentChecked = computed(() =>
  inGroup.value
    ? group!.value.value.includes(currentValue.value!)
    : (props.checked ?? props.defaultChecked),
)
const currentDisabled = computed(() =>
  Boolean(props.disabled || root?.disabled.value || group?.disabled.value),
)
function change(event: Event) {
  emit('change', event)
  if (!(event as Event).defaultPrevented && inGroup.value) group!.toggle(currentValue.value!)
}
</script>
<template>
  <input
    v-bind="attrs"
    ref="control"
    :id="props.id ?? root?.controlId"
    type="checkbox"
    :name="attrs.name as string | undefined"
    :value="currentValue"
    :checked="currentChecked"
    :disabled="currentDisabled"
    data-slot="checkbox-control"
    :class="cn(checkboxControlClassName, attrs.class as string | undefined)"
    @change="change"
  />
</template>
