<script setup lang="ts">
import { tableRowClassName } from '@fex-design/components-styles/table'
import { cn } from '@fex-design/utils'

defineOptions({ inheritAttrs: false })
const props = defineProps<{ class?: string | undefined }>()
</script>

<template>
  <tr v-bind="$attrs" data-slot="table-row" :class="cn(tableRowClassName, props.class)">
    <slot />
  </tr>
</template>
