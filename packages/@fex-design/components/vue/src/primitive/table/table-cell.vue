<script setup lang="ts">
import { tableCellClassName } from '@fex-design/components-styles/table'
import { cn } from '@fex-design/utils'

defineOptions({ inheritAttrs: false })
const props = defineProps<{ class?: string | undefined }>()
</script>

<template>
  <td v-bind="$attrs" data-slot="table-cell" :class="cn(tableCellClassName, props.class)">
    <slot />
  </td>
</template>
