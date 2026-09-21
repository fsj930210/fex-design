<script setup lang="ts">
import {
  radioIndicatorClassName,
  radioRootClassName,
  type RadioStyleProps,
} from '@fex-design/components-styles/radio'
import { cn } from '@fex-design/utils'
import { computed, useAttrs } from 'vue'
import { useRadioContext, type RadioValue } from './context'
defineOptions({ inheritAttrs: false })
const props = withDefaults(
  defineProps<{ value: RadioValue; disabled?: boolean; size?: RadioStyleProps['size'] }>(),
  { disabled: false, size: 'md' },
)
const attrs = useAttrs()
const context = useRadioContext('Radio')
const checked = computed(() => context.value() === props.value)
const currentDisabled = computed(() => context.disabled() || props.disabled)
function select(event: MouseEvent) {
  if (!event.defaultPrevented && !currentDisabled.value) context.select(props.value)
}
</script>
<template>
  <button
    v-bind="attrs"
    type="button"
    role="radio"
    :disabled="currentDisabled"
    :aria-checked="checked"
    data-slot="radio"
    :data-state="checked ? 'checked' : 'unchecked'"
    :data-disabled="currentDisabled ? 'true' : undefined"
    :data-value="props.value"
    :class="cn(radioRootClassName({ size: props.size }), attrs.class as string | undefined)"
    @click="select"
  >
    <span v-if="checked" data-slot="radio-indicator" :class="radioIndicatorClassName" /><slot />
  </button>
</template>
