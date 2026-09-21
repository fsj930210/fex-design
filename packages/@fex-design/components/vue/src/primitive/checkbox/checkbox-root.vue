<script setup lang="ts">
import type { CheckboxValue } from '@fex-design/core/checkbox/types'
import { checkboxRootClassName, type CheckboxStyleProps } from '@fex-design/components-styles/checkbox'
import { cn } from '@fex-design/utils'
import { computed, provide, useAttrs, useId } from 'vue'
import { checkboxRootKey } from './context'
defineOptions({ name: 'CheckboxRoot', inheritAttrs: false })
const props = defineProps<{
  value?: CheckboxValue
  disabled?: boolean
  size?: CheckboxStyleProps['size']
}>()
const attrs = useAttrs()
const controlId = useId()
provide(checkboxRootKey, {
  controlId,
  value: computed(() => props.value),
  disabled: computed(() => props.disabled === true),
})
</script>
<template>
  <div
    v-bind="attrs"
    data-slot="checkbox-root"
    :data-size="props.size ?? 'md'"
    :class="cn(checkboxRootClassName({ size: props.size }), attrs.class as string | undefined)"
  >
    <slot />
  </div>
</template>
