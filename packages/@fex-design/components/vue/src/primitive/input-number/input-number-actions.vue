<script setup lang="ts">
import { inputNumberActionsClassName } from '@fex-design/components-styles/input-number'
import { cn } from '@fex-design/utils'
defineOptions({ name: 'InputNumberActions' })
const props = defineProps<{ class?: string }>()
</script>
<template>
  <span data-slot="input-number-actions" :class="cn(inputNumberActionsClassName, props.class)"
    ><slot
  /></span>
</template>
