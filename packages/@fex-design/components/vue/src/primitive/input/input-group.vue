<script setup lang="ts">
import { inputGroupClassName } from '@fex-design/components-styles/input'
import { cn } from '@fex-design/utils'
defineProps<{ class?: string }>()
</script>
<template>
  <div role="group" data-slot="input-group" :class="cn(inputGroupClassName, $props.class)">
    <slot />
  </div>
</template>
