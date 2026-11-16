<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { useDialogContext } from './context'
import { Button } from '../button'
import XIcon from '../../icons/x-icon.vue'
import { dialogIconCloseClassName } from '@fex-design/components-styles/dialog'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const slots = useSlots()
const { dialog } = useDialogContext('DialogClose')

const closeProps = computed(() => ({
  ...attrs,
  type: 'button' as const,
  'data-slot': 'dialog-close',
  onClick(event: MouseEvent) {
    dialog.close({ reason: 'manual', source: 'close-button', event })
  },
}))
</script>

<template>
  <slot v-if="$slots.button" name="button" :props="closeProps" />
  <Button v-else v-bind="closeProps" :class="slots.default ? undefined : dialogIconCloseClassName"><slot><XIcon v-if="!slots.default" aria-hidden="true" /></slot></Button>
</template>

