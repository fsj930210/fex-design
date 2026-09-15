<script setup lang="ts">
import type { SwitchState } from '@fex-design/core/switch/types'
import { switchContentClassName } from '@fex-design/styles/switch'
import { cn } from '@fex/utils'
import { useAttrs, useTemplateRef } from 'vue'
defineOptions({ name: 'SwitchContent', inheritAttrs: false })
const props = defineProps<{ state: SwitchState }>()
const attrs = useAttrs()
const element = useTemplateRef<HTMLSpanElement>('element')
defineExpose({ element })
</script>
<template>
  <span
    v-bind="attrs"
    ref="element"
    aria-hidden="true"
    data-slot="switch-content"
    :data-state="props.state"
    :class="cn(switchContentClassName, attrs.class as string | undefined)"
  >
    <slot />
  </span>
</template>
