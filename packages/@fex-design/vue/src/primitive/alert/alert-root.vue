<script setup lang="ts">
import type { AlertOptions } from '@fex-design/core/alert/types'
import { alertClassName } from '@fex-design/styles/alert'
import { cn } from '@fex/utils'

defineOptions({ inheritAttrs: false })
const props = withDefaults(
  defineProps<{
    class?: string | undefined
    type?: AlertOptions['type']
    variant?: AlertOptions['variant']
  }>(),
  {
    type: 'info',
    variant: 'filled',
  },
)
</script>

<template>
  <div
    data-slot="alert"
    role="alert"
    v-bind="$attrs"
    :class="cn(alertClassName({ type: props.type, variant: props.variant }), props.class)"
  >
    <slot />
  </div>
</template>
