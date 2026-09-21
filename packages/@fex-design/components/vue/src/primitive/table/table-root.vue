<script setup lang="ts">
import { tableClassName, tableContainerClassName } from '@fex-design/components-styles/table'
import { cn } from '@fex-design/utils'

defineOptions({ inheritAttrs: false })
const props = defineProps<{ class?: string | undefined }>()
</script>

<template>
  <div data-slot="table-container" :class="tableContainerClassName">
    <table v-bind="$attrs" data-slot="table" :class="cn(tableClassName, props.class)">
      <slot />
    </table>
  </div>
</template>
