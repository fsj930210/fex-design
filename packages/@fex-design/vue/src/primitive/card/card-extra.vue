<script setup lang="ts">
import { cardExtraClassName } from '@fex-design/styles/card'
import { cn } from '@fex/utils'

defineOptions({ inheritAttrs: false })
const props = defineProps<{ class?: string | undefined }>()
</script>

<template>
  <div v-bind="$attrs" data-slot="card-extra" :class="cn(cardExtraClassName, props.class)">
    <slot />
  </div>
</template>
