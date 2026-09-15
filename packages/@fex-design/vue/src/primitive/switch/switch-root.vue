<script setup lang="ts">
import type { SwitchShape, SwitchSize } from '@fex-design/core/switch/types'
import { switchClassName } from '@fex-design/styles/switch'
import { cn } from '@fex/utils'
import { computed, ref, useAttrs, useTemplateRef, type PropType } from 'vue'
defineOptions({ name: 'SwitchRoot', inheritAttrs: false })
const props = defineProps({
  checked: { type: Boolean, default: undefined },
  defaultChecked: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  size: { type: String as PropType<SwitchSize>, default: 'md' },
  shape: { type: String as PropType<SwitchShape>, default: 'rounded' },
})
const emit = defineEmits<{
  change: [checked: boolean, event: MouseEvent]
  'update:checked': [checked: boolean]
  click: [event: MouseEvent]
}>()
const attrs = useAttrs()
const element = useTemplateRef<HTMLButtonElement>('element')
defineExpose({ element })
const internalChecked = ref(props.defaultChecked)
const checked = computed(() => props.checked ?? internalChecked.value)
function handleClick(event: MouseEvent) {
  emit('click', event)
  if (event.defaultPrevented || props.disabled || props.loading) return
  const next = !checked.value
  if (props.checked === undefined) internalChecked.value = next
  emit('update:checked', next)
  emit('change', next, event)
}
</script>
<template>
  <button
    v-bind="attrs"
    ref="element"
    type="button"
    role="switch"
    :disabled="props.disabled || props.loading"
    :aria-checked="checked"
    :aria-busy="props.loading || undefined"
    data-slot="switch"
    :data-state="checked ? 'checked' : 'unchecked'"
    :data-disabled="props.disabled ? '' : undefined"
    :data-loading="props.loading ? '' : undefined"
    :data-size="props.size"
    :data-shape="props.shape"
    :class="
      cn(
        switchClassName({ size: props.size, shape: props.shape }),
        attrs.class as string | undefined,
      )
    "
    @click="handleClick"
  >
    <slot :checked="checked" :loading="props.loading" />
  </button>
</template>
