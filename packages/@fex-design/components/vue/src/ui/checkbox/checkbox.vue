<script setup lang="ts">
import type { CheckboxValue } from '@fex-design/core/checkbox/types'
import { type CheckboxStyleProps } from '@fex-design/components-styles/checkbox'
import { computed, useAttrs, type PropType, type StyleValue } from 'vue'
import {
  CheckboxControl,
  CheckboxIndicator,
  CheckboxLabel,
  CheckboxRoot,
} from '@fex-design/vue/primitive/checkbox'
defineOptions({ name: 'Checkbox', inheritAttrs: false })
const props = defineProps({
  value: [String, Number] as PropType<CheckboxValue>,
  checked: { type: Boolean, default: undefined },
  defaultChecked: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  indeterminate: { type: Boolean, default: false },
  size: String as PropType<CheckboxStyleProps['size']>,
  classNames: Object as PropType<{
    root?: string
    control?: string
    indicator?: string
    label?: string
  }>,
  styles: Object as PropType<{
    root?: StyleValue
    control?: StyleValue
    indicator?: StyleValue
    label?: StyleValue
  }>,
})
const emit = defineEmits<{ change: [event: Event] }>()
const attrs = useAttrs()
const resolvedChecked = computed(() => props.checked ?? (attrs.checked as boolean | undefined))
function change(event: Event) {
  emit('change', event)
  const handler = (attrs.onChange ?? attrs.onchange) as ((event: Event) => void) | undefined
  handler?.(event)
}
const controlAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs
  return rest
})
</script>
<template>
  <CheckboxRoot
    :value="props.value"
    :disabled="props.disabled"
    :size="props.size"
    :class="[$attrs.class, props.classNames?.root]"
    :style="[$attrs.style as StyleValue, props.styles?.root]"
  >
    <CheckboxControl
      v-bind="controlAttrs"
      :value="props.value"
      :checked="resolvedChecked"
      :default-checked="props.defaultChecked"
      :disabled="props.disabled"
      :indeterminate="props.indeterminate"
      :class="props.classNames?.control"
      :style="props.styles?.control"
      @change="change"
    />
    <CheckboxIndicator
      v-if="$slots.indicator"
      :class="props.classNames?.indicator"
      :style="props.styles?.indicator"
    >
      <slot name="indicator" />
    </CheckboxIndicator>
    <CheckboxIndicator
      v-else
      :class="props.classNames?.indicator"
      :style="props.styles?.indicator"
    />
    <CheckboxLabel
      v-if="$slots.default"
      :class="props.classNames?.label"
      :style="props.styles?.label"
    >
      <slot />
    </CheckboxLabel>
  </CheckboxRoot>
</template>
