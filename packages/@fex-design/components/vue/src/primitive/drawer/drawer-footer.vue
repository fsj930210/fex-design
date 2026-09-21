<script setup lang="ts">
import { drawerFooterClassName } from '@fex-design/components-styles/drawer'
import { cn } from '@fex-design/utils'
defineProps<{ class?: string }>()
</script>
<template>
  <div v-bind="$attrs" data-slot="drawer-footer" :class="cn(drawerFooterClassName, $props.class)">
    <slot />
  </div>
</template>
