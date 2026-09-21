<script setup lang="ts">
import { tableBodyClassName } from '@fex-design/components-styles/table'
import { cn } from '@fex-design/utils'

defineOptions({ inheritAttrs: false })
const props = defineProps<{ class?: string | undefined }>()
</script>

<template>
  <tbody v-bind="$attrs" data-slot="table-body" :class="cn(tableBodyClassName, props.class)">
    <slot />
  </tbody>
</template>
