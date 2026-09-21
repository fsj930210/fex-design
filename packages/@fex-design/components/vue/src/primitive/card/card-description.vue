<script setup lang="ts">
import { cardDescriptionClassName } from '@fex-design/components-styles/card'
import { cn } from '@fex-design/utils'

defineOptions({ inheritAttrs: false })
const props = defineProps<{ class?: string | undefined }>()
</script>

<template>
  <div
    v-bind="$attrs"
    data-slot="card-description"
    :class="cn(cardDescriptionClassName, props.class)"
  >
    <slot />
  </div>
</template>
