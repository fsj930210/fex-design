<script setup lang="ts">
import { cardClassName } from '@fex-design/components-styles/card'
import { cn } from '@fex-design/utils'

defineOptions({ inheritAttrs: false })
const props = defineProps<{ class?: string | undefined }>()
</script>

<template>
  <div v-bind="$attrs" data-slot="card" :class="cn(cardClassName, props.class)">
    <slot />
  </div>
</template>
