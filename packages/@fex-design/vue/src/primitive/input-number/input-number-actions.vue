<script setup lang="ts">
import { inputNumberActionsClassName } from '@fex-design/styles/input-number'
import { cn } from '@fex/utils'
defineOptions({ name: 'InputNumberActions' })
const props = defineProps<{ class?: string }>()
</script>
<template>
  <span data-slot="input-number-actions" :class="cn(inputNumberActionsClassName, props.class)"
    ><slot
  /></span>
</template>
