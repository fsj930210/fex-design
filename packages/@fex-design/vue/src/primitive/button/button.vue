<script setup lang="ts">
import { buttonClassName } from '@fex-design/styles/button'
import { cn } from '@fex/utils'
import { useAttrs, useTemplateRef } from 'vue'
import type { ButtonProps } from './button.types'

// oxlint-disable-next-line vue/no-reserved-component-names
defineOptions({ name: 'Button', inheritAttrs: false })

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
  variant: 'outlined',
})

const attrs = useAttrs()
const buttonRef = useTemplateRef<HTMLButtonElement>('button')

function getButtonAttrs() {
  return {
    ...attrs,
    class: cn(
      buttonClassName({ variant: props.variant, color: props.color }),
      attrs.class as string | undefined,
    ),
  }
}

defineExpose({
  ref: buttonRef,
})
</script>

<template>
  <button
    v-bind="getButtonAttrs()"
    ref="button"
    data-slot="button"
    :data-variant="props.variant"
    :data-color="props.color"
    :type="props.type"
  >
    <slot />
  </button>
</template>
