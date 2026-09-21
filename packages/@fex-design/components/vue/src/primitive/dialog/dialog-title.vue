<script setup lang="ts">
import { dialogTitleClassName } from '@fex-design/components-styles/dialog'
import { cn } from '@fex-design/utils'
import { useDialogContext } from './context'
const props = defineProps<{ class?: string }>()
const { titleId } = useDialogContext('DialogTitle')
</script>
<template>
  <h2
    v-bind="$attrs"
    :id="titleId"
    data-slot="dialog-title"
    :class="cn(dialogTitleClassName, props.class)"
  >
    <slot />
  </h2>
</template>
