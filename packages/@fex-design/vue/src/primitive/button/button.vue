<script setup lang="ts">
import { buttonPrimitiveClassName } from '@fex-design/styles/button'
import { cn } from '@fex/utils'
import { useAttrs, useTemplateRef } from 'vue'
import type { ButtonProps } from './button.types'

// oxlint-disable-next-line vue/no-reserved-component-names
defineOptions({ name: 'Button', inheritAttrs: false })

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
})

const attrs = useAttrs()
const buttonRef = useTemplateRef<HTMLButtonElement>('button')

function getButtonAttrs() {
  return {
    ...attrs,
    class: cn(buttonPrimitiveClassName, attrs.class as string | undefined),
  }
}

defineExpose({
  ref: buttonRef,
})
</script>

<template>
  <button v-bind="getButtonAttrs()" ref="button" data-slot="button" :type="props.type">
    <slot />
  </button>
</template>
