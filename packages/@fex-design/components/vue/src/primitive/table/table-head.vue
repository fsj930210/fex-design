<script setup lang="ts">
import { tableHeadClassName } from '@fex-design/components-styles/table'
import { cn } from '@fex-design/utils'

defineOptions({ inheritAttrs: false })
const props = defineProps<{ class?: string | undefined }>()
</script>

<template>
  <th v-bind="$attrs" data-slot="table-head" :class="cn(tableHeadClassName, props.class)">
    <slot />
  </th>
</template>
