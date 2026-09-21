<script setup lang="ts">
import { cardContentClassName } from '@fex-design/components-styles/card'
import { cn } from '@fex-design/utils'

defineOptions({ inheritAttrs: false })
const props = defineProps<{ class?: string | undefined }>()
</script>

<template>
  <div v-bind="$attrs" data-slot="card-content" :class="cn(cardContentClassName, props.class)">
    <slot />
  </div>
</template>
