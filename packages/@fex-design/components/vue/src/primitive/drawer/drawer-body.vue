<script setup lang="ts">
import { drawerBodyClassName } from '@fex-design/components-styles/drawer'
import { cn } from '@fex-design/utils'
defineProps<{ class?: string }>()
</script>
<template>
  <div v-bind="$attrs" data-slot="drawer-body" :class="cn(drawerBodyClassName, $props.class)">
    <slot />
  </div>
</template>
