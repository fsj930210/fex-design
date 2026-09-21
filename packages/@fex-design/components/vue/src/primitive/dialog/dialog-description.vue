<script setup lang="ts">
import { dialogDescriptionClassName } from '@fex-design/components-styles/dialog'
import { cn } from '@fex-design/utils'
import { useDialogContext } from './context'
const props = defineProps<{ class?: string }>()
const { descriptionId } = useDialogContext('DialogDescription')
</script>
<template>
  <p
    v-bind="$attrs"
    :id="descriptionId"
    data-slot="dialog-description"
    :class="cn(dialogDescriptionClassName, props.class)"
  >
    <slot />
  </p>
</template>
