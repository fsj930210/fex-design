<script setup lang="ts">
import { switchThumbClassName } from '@fex-design/styles/switch'
import { cn } from '@fex/utils'
import { useAttrs, useTemplateRef } from 'vue'
defineOptions({ name: 'SwitchThumb', inheritAttrs: false })

const attrs = useAttrs()
const element = useTemplateRef<HTMLSpanElement>('element')
defineExpose({ element })
</script>
<template>
  <span
    v-bind="attrs"
    ref="element"
    aria-hidden="true"
    data-slot="switch-thumb"
    :class="cn(switchThumbClassName, attrs.class as string | undefined)"
  >
    <slot />
  </span>
</template>
