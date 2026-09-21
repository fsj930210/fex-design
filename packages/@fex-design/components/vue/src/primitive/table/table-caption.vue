<script setup lang="ts">
import { tableCaptionClassName } from '@fex-design/components-styles/table'
import { cn } from '@fex-design/utils'

defineOptions({ inheritAttrs: false })
const props = defineProps<{ class?: string | undefined }>()
</script>

<template>
  <caption
    v-bind="$attrs"
    data-slot="table-caption"
    :class="cn(tableCaptionClassName, props.class)"
  >
    <slot />
  </caption>
</template>
