<script setup lang="ts">
import { inputRootClassName } from '@fex-design/styles/input'
import type { InputSize, InputVariant } from '@fex-design/core/input/types'
import { cn } from '@fex/utils'
import { computed, provide } from 'vue'
import { useInput } from './use-input'
import { inputContextKey } from './input-context'

defineOptions({ name: 'InputRoot', inheritAttrs: false })
const props = withDefaults(
  defineProps<{
    value?: string | undefined
    defaultValue?: string | undefined
    disabled?: boolean | undefined
    readOnly?: boolean | undefined
    size?: InputSize
    variant?: InputVariant
    class?: string | undefined
  }>(),
  { defaultValue: '', disabled: false, readOnly: false, size: 'md', variant: 'outlined' },
)
const emit = defineEmits<{
  valueChange: [value: string, meta: { reason: 'input' | 'clear'; event?: Event }]
  clear: [meta: { reason: 'clear' }]
  click: [event: MouseEvent]
}>()
const input = useInput({
  value: () => props.value,
  defaultValue: () => props.defaultValue,
  disabled: () => props.disabled,
  readOnly: () => props.readOnly,
  onValueChange: (value, meta) => emit('valueChange', value, meta),
  onClear: (meta) => emit('clear', meta),
})
provide(inputContextKey, input)
const className = computed(() =>
  cn(inputRootClassName({ size: props.size, variant: props.variant }), props.class),
)
</script>
<template>
  <div
    v-bind="$attrs"
    data-slot="input-root"
    :data-disabled="input.disabled.value || undefined"
    :data-readonly="input.readOnly.value || undefined"
    :data-size="props.size"
    :data-variant="props.variant"
    :class="className"
    @click="emit('click', $event)"
  >
    <slot />
  </div>
</template>
