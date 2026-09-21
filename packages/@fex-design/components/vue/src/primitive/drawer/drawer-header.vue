<script setup lang="ts">
import { drawerHeaderClassName } from '@fex-design/components-styles/drawer'
import { cn } from '@fex-design/utils'
defineProps<{ class?: string }>()
</script>
<template>
  <div v-bind="$attrs" data-slot="drawer-header" :class="cn(drawerHeaderClassName, $props.class)">
    <slot />
  </div>
</template>
