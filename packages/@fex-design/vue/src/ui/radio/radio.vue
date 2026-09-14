<script setup lang="ts">
import { radioItemClassName, radioLabelClassName, type RadioStyleProps } from '@fex-design/styles/radio'
import { cn } from '@fex/utils'
import { computed, useAttrs, useId, type PropType, type StyleValue } from 'vue'
import { Radio as PrimitiveRadio, type RadioValue } from '../../primitive/radio/radio'
defineOptions({ name: 'Radio', inheritAttrs: false })
const props = defineProps({
  value: { type: [String, Number] as PropType<RadioValue>, required: true },
  disabled: { type: Boolean, default: false },
  size: String as PropType<RadioStyleProps['size']>,
  classNames: Object as PropType<{ root?: string; control?: string; label?: string }>,
  styles: Object as PropType<{ root?: StyleValue; control?: StyleValue; label?: StyleValue }>,
})
const attrs = useAttrs()
const generatedId = useId()
const controlId = computed(() => (attrs.id as string | undefined) ?? generatedId)
const controlAttrs = computed(() => {
  const { class: _class, style: _style, id: _id, ...rest } = attrs
  return rest
})
</script>
<template>
  <div :class="cn(radioItemClassName, attrs.class as string | undefined, props.classNames?.root)" :style="[attrs.style as StyleValue, props.styles?.root]">
    <PrimitiveRadio v-bind="controlAttrs" :id="controlId" :value="props.value" :disabled="props.disabled" :size="props.size" :class="props.classNames?.control" :style="props.styles?.control" />
    <label v-if="$slots.default" :for="controlId" :class="cn(radioLabelClassName, props.classNames?.label)" :style="props.styles?.label"><slot /></label>
  </div>
</template>
